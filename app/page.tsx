"use client";

import { useState } from "react";

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
  const [orders, setOrders] = useState<any[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  // ADD TO CART
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

  // CHECKOUT
  const checkout = () => setShowConfirm(true);

  const confirmYes = () => {
    const orderData = {
      id: Date.now(),
      items: cart,
      total: total,
      time: new Date().toLocaleString(),
    };

    setOrders((prev) => [orderData, ...prev]);
    setReceipt(orderData);

    setCart([]);
    setShowConfirm(false);
    setSuccess(true);

    setTimeout(() => setSuccess(false), 2000);
  };

  // ===== WELCOME =====
  if (!started) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">
        <div className="text-center animate-pulse">
          <h1 className="text-5xl font-black mb-6">
            🍜 Bakmie Jelambar
          </h1>

          <p className="text-gray-300 text-lg mb-8">
            Selamat datang di Bakmie Jelambar <br />
            Scan QR di meja untuk mulai pesan
          </p>

          <button
            onClick={() => setStarted(true)}
            className="bg-white text-black px-8 py-4 rounded-2xl font-bold active:scale-95"
          >
            Mulai Pesan
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 pb-40">
      {/* HEADER + HISTORY BUTTON */}
      <div className="bg-black text-white p-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">
            🍜 Bakmie Jelambar
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

            <h2 className="text-xl font-bold mt-3">
              {item.name}
            </h2>

            <p className="text-gray-600">
              Rp {item.price.toLocaleString()}
            </p>

            <button
              onClick={() => addToCart(item)}
              className="w-full mt-3 bg-black text-white py-3 rounded-xl active:scale-95"
            >
              Tambah
            </button>
          </div>
        ))}
      </div>

      {/* CART SLIDE UP */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[92%] max-w-md z-50 animate-slideUp">
          <div className="bg-black text-white rounded-t-3xl p-4 shadow-2xl">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center mb-3"
              >
                <div>
                  <p className="font-bold">{item.name}</p>
                  <p className="text-gray-300">
                    Rp {(item.price * item.qty).toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decrease(item.id)}
                    className="w-8 h-8 bg-white text-black rounded-full font-bold"
                  >
                    -
                  </button>

                  <span>{item.qty}</span>

                  <button
                    onClick={() => increase(item.id)}
                    className="w-8 h-8 bg-white text-black rounded-full font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}

            <div className="flex justify-between border-t border-gray-600 pt-3">
              <p className="font-bold">Total</p>
              <p className="font-bold">
                Rp {total.toLocaleString()}
              </p>
            </div>

            <button
              onClick={checkout}
              className="w-full mt-3 bg-white text-black py-3 rounded-xl font-bold"
            >
              Checkout
            </button>
          </div>
        </div>
      )}

      {/* CHECKOUT CONFIRM */}
      {showConfirm && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center p-6"
          onClick={() => setShowConfirm(false)}
        >
          <div
            className="bg-white p-6 rounded-2xl text-center w-full max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-2">
              Yakin Checkout?
            </h2>

            <p className="text-gray-500 mb-4">
              Total Rp {total.toLocaleString()}
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 bg-gray-200 py-3 rounded-xl font-bold"
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
          <div className="bg-white p-6 rounded-2xl text-center">
            <h2 className="text-2xl font-bold">
              Pesanan Berhasil 🍜
            </h2>
          </div>
        </div>
      )}

      {/* RECEIPT */}
      {receipt && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-6 z-50">
          <div className="bg-white w-full max-w-sm rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-center mb-2">
              🧾 Struk Pesanan
            </h2>

            <p className="text-center text-gray-500 text-sm mb-4">
              {receipt.time}
            </p>

            <div className="border-t border-b py-3 mb-4">
              {receipt.items.map((item: any) => (
                <div
                  key={item.id}
                  className="flex justify-between text-sm mb-2"
                >
                  <span>
                    {item.name} x{item.qty}
                  </span>
                  <span>
                    Rp {(item.price * item.qty).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-between font-bold text-lg mb-4">
              <span>Total</span>
              <span>Rp {receipt.total.toLocaleString()}</span>
            </div>

            <button
              onClick={() => setReceipt(null)}
              className="w-full bg-black text-white py-3 rounded-xl font-bold"
            >
              Tutup Struk
            </button>
          </div>
        </div>
      )}

      {/* HISTORY */}
      {showHistory && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center p-6 z-50"
          onClick={() => setShowHistory(false)}
        >
          <div
            className="bg-white w-full max-w-sm rounded-2xl p-6 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4 text-center">
              📦 Order History
            </h2>

            {orders.length === 0 ? (
              <p className="text-center text-gray-500">
                Belum ada pesanan
              </p>
            ) : (
              orders.map((order) => (
                <div
                  key={order.id}
                  className="border-b py-3 mb-3"
                >
                  <p className="text-sm text-gray-500">
                    {order.time}
                  </p>

                  {order.items.map((item: any) => (
                    <div
                      key={item.id}
                      className="flex justify-between text-sm"
                    >
                      <span>
                        {item.name} x{item.qty}
                      </span>
                      <span>
                        Rp {(item.price * item.qty).toLocaleString()}
                      </span>
                    </div>
                  ))}

                  <p className="font-bold mt-2">
                    Total: Rp {order.total.toLocaleString()}
                  </p>
                </div>
              ))
            )}

            <button
              onClick={() => setShowHistory(false)}
              className="w-full mt-4 bg-black text-white py-3 rounded-xl font-bold"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* ANIMATION */}
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