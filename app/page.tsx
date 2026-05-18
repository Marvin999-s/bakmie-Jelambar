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
    {
      id: 3,
      name: "Es Teh Manis",
      price: 5000,
      image:
        "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=1200&auto=format&fit=crop",
      category: "Minuman",
    },
  ];

  const [cart, setCart] = useState<any[]>([]);
  const [payment, setPayment] = useState("QRIS");
  const [success, setSuccess] = useState(false);
  const [started, setStarted] = useState(false);

  const tableNumber = "Meja 4";

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

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const orderNow = () => {
    if (cart.length === 0) {
      alert("Keranjang kosong");
      return;
    }

    setSuccess(true);
  };

  if (!started) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">
        <div className="max-w-xl text-center">
          <h1 className="text-5xl font-bold mb-6">
            🍜 Bakmi Jelambar
          </h1>

          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            Selamat datang di Bakmi Jelambar.
            <br />
            Silakan scan QR dan pesan makanan favorit Anda langsung dari meja tanpa menunggu pelayan.
          </p>

          <button
            onClick={() => setStarted(true)}
            className="bg-white text-black px-8 py-4 rounded-2xl text-lg font-bold"
          >
            Mulai Pesan
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100">
      {/* HEADER */}
      <div className="bg-black text-white p-6 rounded-b-[40px] shadow-xl">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">
              🍜 Bakmi Jelambar
            </h1>

            <p className="text-gray-300 mt-2">
              {tableNumber}
            </p>
          </div>

          <div className="bg-white text-black px-5 py-3 rounded-2xl font-bold shadow-lg">
            🛒 {cart.length}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto p-6 grid lg:grid-cols-3 gap-6">

        {/* MENU */}
        <div className="lg:col-span-2 space-y-6">
          {menu.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl shadow-lg overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-60 object-cover"
              />

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-black text-white text-sm px-4 py-1 rounded-full">
                    {item.category}
                  </span>

                  <span className="text-2xl font-bold">
                    Rp {item.price.toLocaleString()}
                  </span>
                </div>

                <h2 className="text-3xl font-bold mb-4">
                  {item.name}
                </h2>

                <button
                  onClick={() => addToCart(item)}
                  className="w-full bg-black text-white py-4 rounded-2xl text-lg font-semibold"
                >
                  Tambah ke Pesanan
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CART */}
        <div className="bg-white rounded-3xl shadow-xl p-6 h-fit sticky top-6">
          <h2 className="text-3xl font-bold mb-6">
            📋 Pesanan Anda
          </h2>

          <div className="space-y-4 mb-6">
            {cart.length === 0 && (
              <p className="text-gray-500">
                Belum ada pesanan.
              </p>
            )}

            {cart.map((item, index) => (
              <div
                key={index}
                className="border rounded-2xl p-4"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold text-lg">
                      {item.name}
                    </p>

                    <p className="text-gray-500">
                      {item.qty} x Rp {item.price.toLocaleString()}
                    </p>
                  </div>

                  <p className="font-bold">
                    Rp {(item.qty * item.price).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mb-6">
            <label className="font-semibold block mb-3 text-lg">
              Metode Pembayaran
            </label>

            <select
              value={payment}
              onChange={(e) => setPayment(e.target.value)}
              className="w-full border rounded-2xl p-4"
            >
              <option>QRIS</option>
              <option>Cash</option>
              <option>BCA</option>
            </select>
          </div>

          <div className="flex justify-between items-center mb-6">
            <span className="text-2xl font-bold">
              Total
            </span>

            <span className="text-3xl font-bold">
              Rp {total.toLocaleString()}
            </span>
          </div>

          <button
            onClick={orderNow}
            className="w-full bg-black text-white py-5 rounded-2xl text-xl font-bold"
          >
            Pesan Sekarang
          </button>

          {success && (
            <div className="mt-6 bg-green-100 border border-green-300 rounded-2xl p-5 text-green-700">
              <p className="font-bold text-lg mb-2">
                ✅ Pesanan berhasil dikirim!
              </p>

              <p>
                Mohon tunggu, pesanan Anda sedang diproses.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ADMIN */}
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white rounded-3xl shadow-xl p-6">
          <h2 className="text-3xl font-bold mb-6">
            🔔 Dashboard Admin
          </h2>

          <div className="border rounded-3xl p-6 flex justify-between items-center">
            <div>
              <p className="font-bold text-xl mb-2">
                Meja 4
              </p>

              <p>2 Bakmie Ayam Special</p>
              <p>1 Es Teh Manis</p>

              <p className="text-gray-500 mt-3">
                Pembayaran: QRIS
              </p>
            </div>

            <button className="bg-black text-white px-6 py-3 rounded-2xl font-semibold">
              Sedang Dimasak
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
