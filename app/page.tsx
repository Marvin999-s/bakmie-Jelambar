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

  const [cart, setCart] = useState<any[]>([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [success, setSuccess] = useState(false);

  const addToCart = (item: any) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === item.id);

      if (existing) {
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

  const confirmCheckout = () => {
    setShowConfirm(true);
  };

  const yesCheckout = () => {
    setCart([]);
    setShowConfirm(false);
    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };

  return (
    <main className="min-h-screen bg-gray-100 pb-40">
      {/* HEADER */}
      <div className="bg-black text-white p-6">
        <h1 className="text-3xl font-bold">
          🍜 Bakmie Jelambar
        </h1>
        <p className="text-gray-300">Meja 1</p>
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

      {/* CART */}
      {cart.length > 0 && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[92%] max-w-md bg-black text-white rounded-2xl p-4">
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
            onClick={confirmCheckout}
            className="w-full mt-3 bg-white text-black py-3 rounded-xl font-bold"
          >
            Checkout
          </button>
        </div>
      )}

      {/* CONFIRM POPUP */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm text-center">
            <h2 className="text-xl font-bold mb-4">
              Konfirmasi Pesanan?
            </h2>

            <p className="mb-6 text-gray-600">
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
                onClick={yesCheckout}
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
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl p-6 text-center">
            <h2 className="text-2xl font-bold">
              Pesanan Berhasil 🍜
            </h2>
          </div>
        </div>
      )}
    </main>
  );
}