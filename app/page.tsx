"use client";

import { useState } from "react";
import html2canvas from "html2canvas";

export default function Home() {
  const menu = [
    {
      id: 1,
      name: "Bakmie Ayam Special",
      price: 18000,
      image:
        "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "Bakmie Bakso",
      price: 22000,
      image:
        "https://images.unsplash.com/photo-1555126634-323283e090fa?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 3,
      name: "Es Teh Manis",
      price: 5000,
      image:
        "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  const [started, setStarted] = useState(false);
  const [cart, setCart] = useState<any[]>([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [success, setSuccess] = useState(false);
  const [receipt, setReceipt] = useState<any | null>(null);
  const [showHistory, setShowHistory] = useState(false);

  const [orders, setOrders] = useState<any[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("orders");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // CLEAN 24 JAM
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("orders");
    if (saved) {
      const parsed = JSON.parse(saved);

      const filtered = parsed.filter((order: any) => {
        return Date.now() - order.id < 24 * 60 * 60 * 1000;
      });

      localStorage.setItem("orders", JSON.stringify(filtered));
    }
  }

  const addToCart = (item: any) => {
    setCart((prev) => {
      const exist = prev.find((p) => p.id === item.id);

      if (exist) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, qty: p.qty + 1 } : p
        );
      }

      return [...prev, { ...item, qty: 1 }];
    });
  };

  const increase = (id: number) => {
    setCart((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, qty: p.qty + 1 } : p
      )
    );
  };

  const decrease = (id: number) => {
    setCart((prev) =>
      prev
        .map((p) =>
          p.id === id ? { ...p, qty: p.qty - 1 } : p
        )
        .filter((p) => p.qty > 0)
    );
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const checkout = () => setShowConfirm(true);

  const confirmYes = () => {
    const orderData = {
      id: Date.now(),
      items: cart,
      total: total,
      time: new Date().toLocaleString(),
    };

    const updated = [orderData, ...orders];
    setOrders(updated);
    localStorage.setItem("orders", JSON.stringify(updated));

    setReceipt(orderData);
    setCart([]);
    setShowConfirm(false);
    setSuccess(true);

    setTimeout(() => setSuccess(false), 2000);
  };

  if (!started) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-5xl font-black mb-6">
            🍜 Bakmi Jelambar
          </h1>

          <p className="text-gray-300 mb-8">
            Scan QR di meja untuk mulai pesan
          </p>

          <button
            onClick={() => setStarted(true)}
            className="bg-white text-black px-8 py-4 rounded-2xl font-bold text-lg"
          >
            Mulai Pesan
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 pb-40">

      {/* HEADER */}
      <div className="bg-black text-white p-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">
            🍜 Bakmi Jelambar
          </h1>
          <p className="text-gray-300">Meja 1</p>
        </div>

        <button
          onClick={() => setShowHistory(true)}
          className="bg-white text-black px-4 py-2 rounded-xl font-bold"
        >
          History
        </button>
      </div>

      {/* MENU */}
      <div className="p-6 grid gap-6">
        {menu.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow p-4"
          >
            <img
              src={item.image}
              className="w-full h-52 object-cover rounded-xl"
            />

            <h2 className="text-xl font-bold mt-3 text-black">
              {item.name}
            </h2>

            <p className="text-gray-700 font-medium">
              Rp {item.price.toLocaleString()}
            </p>

            <button
              onClick={() => addToCart(item)}
              className="w-full mt-3 bg-black text-white py-4 rounded-xl font-bold text-lg"
            >
              Tambah
            </button>
          </div>
        ))}
      </div>

      {/* CART */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[92%] max-w-md z-50 animate-slideUp">
          <div className="bg-black text-white rounded-t-3xl p-4">

            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between mb-3"
              >
                <div>
                  <p className="font-bold">{item.name}</p>
                  <p className="text-gray-300">
                    Rp {(item.price * item.qty).toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button onClick={() => decrease(item.id)}>-</button>
                  <span>{item.qty}</span>
                  <button onClick={() => increase(item.id)}>+</button>
                </div>
              </div>
            ))}

            <div className="flex justify-between border-t pt-2">
              <p className="font-bold">Total</p>
              <p className="font-bold">
                Rp {total.toLocaleString()}
              </p>
            </div>

            <button
              onClick={checkout}
              className="w-full mt-3 bg-white text-black py-3 rounded-xl font-bold text-lg"
            >
              Checkout
            </button>
          </div>
        </div>
      )}

      {/* CHECKOUT */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-[90%] max-w-sm text-center">

            <p className="text-lg font-bold mb-4">
              Yakin Checkout?
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 bg-gray-200 py-3 rounded-xl font-bold text-black"
              >
                Tidak
              </button>

              <button
                onClick={confirmYes}
                className="flex-1 bg-black text-white py-3 rounded-xl font-bold"
              >
                Ya
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUCCESS */}
      {success && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl font-bold">
            Pesanan Berhasil 🍜
          </div>
        </div>
      )}

      {/* RECEIPT */}
      {receipt && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-6 z-50">
          <div id="receipt" className="bg-white w-full max-w-sm p-6 rounded-xl">

            <h2 className="text-center font-bold text-xl mb-2">
              🧾 Struk
            </h2>

            <p className="text-center text-sm mb-3">
              {receipt.time}
            </p>

            <div className="border-t border-b py-2">
              {receipt.items.map((item: any) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.name} x{item.qty}</span>
                  <span>Rp {(item.price * item.qty).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between font-bold mt-3">
              <span>Total</span>
              <span>Rp {receipt.total.toLocaleString()}</span>
            </div>

            <button
              onClick={async () => {
                const el = document.getElementById("receipt");
                if (!el) return;

                const canvas = await html2canvas(el);
                const img = canvas.toDataURL("image/png");

                const link = document.createElement("a");
                link.href = img;
                link.download = `struk-${Date.now()}.png`;
                link.click();
              }}
              className="w-full mt-3 bg-gray-200 py-2 rounded-xl font-bold"
            >
              Download Struk
            </button>

            <button
              onClick={() => setReceipt(null)}
              className="w-full mt-2 bg-black text-white py-2 rounded-xl font-bold"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* HISTORY */}
      {showHistory && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-6 z-50">
          <div className="bg-white w-full max-w-sm p-6 rounded-xl max-h-[80vh] overflow-y-auto">

            <h2 className="text-xl font-bold mb-4">
              📦 History
            </h2>

            {orders.length === 0 ? (
              <p>Belum ada order</p>
            ) : (
              orders.map((order) => (
                <div key={order.id} className="border-b py-2">
                  <p className="text-sm">{order.time}</p>

                  {order.items.map((item: any) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.name} x{item.qty}</span>
                      <span>Rp {(item.price * item.qty).toLocaleString()}</span>
                    </div>
                  ))}

                  <p className="font-bold">
                    Total: Rp {order.total.toLocaleString()}
                  </p>
                </div>
              ))
            )}

            <button
              onClick={() => setShowHistory(false)}
              className="w-full mt-4 bg-black text-white py-2 rounded-xl"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* ANIMASI CART */}
      <style jsx>{`
        @keyframes slideUp {
          from {
            transform: translate(-50%, 100%);
            opacity: 0;
          }
          to {
            transform: translate(-50%, 0%);
            opacity: 1;
          }
        }

        .animate-slideUp {
          animation: slideUp 0.25s ease-out;
        }
      `}</style>

    </main>
  );
}