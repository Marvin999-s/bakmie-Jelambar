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
    const audio = new Audio(
      "https://www.myinstants.com/media/sounds/click.mp3"
    );

    audio.play();

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
      <main className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex items-center justify-center p-6">
        <div className="max-w-xl text-center animate-pulse">
          <h1 className="text-6xl font-black mb-6">
            🍜 Bakmi Jelambar
          </h1>

          <p className="text-gray-300 text-xl mb-10 leading-relaxed">
            Selamat datang di Bakmi Jelambar.
            <br />
            Scan QR dan pesan makanan favorit Anda langsung dari meja.
          </p>

          <button
            onClick={() => setStarted(true)}
            className="
              bg-white
              text-black
              px-10
              py-5
              rounded-3xl
              text-xl
              font-bold
              transition
              duration-200
              hover:scale-105
              active:scale-95
              shadow-2xl
            "
          >
            Mulai Pesan 🍜
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 pb-40">
      {/* HEADER */}
      <div className="bg-black text-white p-6 rounded-b-[40px] shadow-2xl sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black">
              🍜 Bakmi Jelambar
            </h1>

            <p className="text-gray-300 mt-2">
              {tableNumber}
            </p>
          </div>

          <div className="bg-white text-black px-5 py-3 rounded-2xl font-bold shadow-lg animate-pulse">
            🛒 {cart.length}
          </div>
        </div>
      </div>

      {/* MENU */}
      <div className="max-w-6xl mx-auto p-6 grid lg:grid-cols-2 gap-8">
        {menu.map((item) => (
          <div
            key={item.id}
            className="
              bg-white
              rounded-[30px]
              shadow-xl
              overflow-hidden
              transition
              duration-300
              hover:scale-[1.02]
            "
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-72 object-cover"
            />

            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="bg-black text-white text-sm px-4 py-2 rounded-full">
                  {item.category}
                </span>

                <span className="text-3xl font-black">
                  Rp {item.price.toLocaleString()}
                </span>
              </div>

              <h2 className="text-4xl font-black mb-6">
                {item.name}
              </h2>

              <button
                onClick={() => addToCart(item)}
                className="
                  w-full
                  bg-black
                  text-white
                  py-5
                  rounded-3xl
                  text-xl
                  font-bold
                  transition
                  duration-150
                  transform
                  hover:scale-[1.03]
                  active:scale-90
                  active:bg-gray-800
                  shadow-2xl
                "
              >
                🍜 Tambah ke Pesanan
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* FLOATING CART */}
      {cart.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-md z-50 animate-pulse">
          <div className="bg-black text-white rounded-[30px] shadow-2xl p-5 flex items-center justify-between">
            <div>
              <p className="font-black text-xl">
                🛒 {cart.length} Pesanan
              </p>

              <p className="text-gray-300 text-lg">
                Rp {total.toLocaleString()}
              </p>
            </div>

            <button
              onClick={orderNow}
              className="
                bg-white
                text-black
                px-7
                py-4
                rounded-2xl
                font-black
                transition
                hover:scale-105
                active:scale-95
              "
            >
              Checkout
            </button>
          </div>
        </div>
      )}

      {/* SUCCESS MODAL */}
      {success && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-[40px] p-10 max-w-md w-full text-center animate-pulse shadow-2xl">
            <h2 className="text-6xl mb-5">
              ✅
            </h2>

            <h3 className="text-3xl font-black mb-4">
              Pesanan Berhasil!
            </h3>

            <p className="text-gray-600 text-lg mb-8">
              Pesanan Anda sedang diproses oleh dapur Bakmi Jelambar 🍜
            </p>

            <button
              onClick={() => setSuccess(false)}
              className="
                bg-black
                text-white
                px-8
                py-4
                rounded-3xl
                font-black
                transition
                hover:scale-105
                active:scale-95
              "
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </main>
  );
}