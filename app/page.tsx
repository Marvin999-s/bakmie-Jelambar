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
      category: "Best Seller",
    },
    {
      id: 2,
      name: "Bakmie Bakso",
      price: 22000,
      image:
        "https://images.unsplash.com/photo-1555126634-323283e090fa?q=80&w=1200&auto=format&fit=crop",
      category: "Favorite",
    },
  ];

  const [cart, setCart] = useState<any[]>([]);
  const [started, setStarted] = useState(false);

  const addToCart = (item: any) => {
    const existing = cart.find((c) => c.id === item.id);

    if (existing) {
      setCart(
        cart.map((c) =>
          c.id === item.id
            ? { ...c, qty: c.qty + 1 }
            : c
        )
      );
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };

  const increaseQty = (id: number) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, qty: item.qty + 1 }
          : item
      )
    );
  };

  const decreaseQty = (id: number) => {
    setCart(
      cart
        .map((item) =>
          item.id === id
            ? { ...item, qty: item.qty - 1 }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  if (!started) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-5xl font-black mb-6">
            🍜 Bakmi Jelambar
          </h1>

          <button
            onClick={() => setStarted(true)}
            className="bg-white text-black px-8 py-4 rounded-3xl font-bold"
          >
            Mulai Pesan
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 pb-40">
      <div className="bg-black text-white p-6 rounded-b-[40px]">
        <h1 className="text-4xl font-black">
          🍜 Bakmi Jelambar
        </h1>

        <p className="text-gray-300 mt-2">
          Meja 4
        </p>
      </div>

      <div className="p-6 grid gap-6">
        {menu.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl shadow-xl overflow-hidden"
          >
            <img
              src={item.image}
              className="w-full h-64 object-cover"
            />

            <div className="p-6">
              <h2 className="text-3xl font-black mb-2">
                {item.name}
              </h2>

              <p className="text-xl font-bold mb-6">
                Rp {item.price.toLocaleString()}
              </p>

              <button
                onClick={() => addToCart(item)}
                className="
                  w-full
                  bg-black
                  text-white
                  py-4
                  rounded-3xl
                  text-xl
                  font-bold
                  active:scale-90
                  transition
                "
              >
                🍜 Tambah ke Pesanan
              </button>
            </div>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 w-[92%] max-w-md bg-black text-white rounded-3xl p-5 shadow-2xl">
          <div className="space-y-4 mb-5">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between"
              >
                <div>
                  <p className="font-bold">
                    {item.name}
                  </p>

                  <p className="text-gray-300">
                    Rp {(item.price * item.qty).toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="bg-white text-black w-10 h-10 rounded-full font-black"
                  >
                    −
                  </button>

                  <span className="font-bold text-lg">
                    {item.qty}
                  </span>

                  <button
                    onClick={() => increaseQty(item.id)}
                    className="bg-white text-black w-10 h-10 rounded-full font-black"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-xl">
                Total
              </p>

              <p className="text-gray-300">
                Rp {total.toLocaleString()}
              </p>
            </div>

            <button className="bg-white text-black px-6 py-3 rounded-2xl font-black">
              Checkout
            </button>
          </div>
        </div>
      )}
    </main>
  );
}