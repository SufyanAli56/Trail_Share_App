import React, { useMemo, useState } from "react";

const EXPERIENCES = [
  {
    title: "Hunza Valley Adventure",
    description: "A beautiful trip to the mountains of Hunza.",
    price: 250,
    location: "Hunza, Pakistan",
    latitude: 36.3167,
    longitude: 74.65,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/4/4f/Rakaposhi%2C_Nagar_GB_%28Pakistan%29.jpg",
    rating: 4.9,
  },
  {
    title: "Fairy Meadows Trek",
    description:
      "Experience breathtaking views of Nanga Parbat from Fairy Meadows.",
    price: 300,
    location: "Fairy Meadows, Pakistan",
    latitude: 35.3783,
    longitude: 74.589,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/c/cd/Nanga_Parbat_and_Fairy_Meadows.jpg",
    rating: 4.8,
  },
  {
    title: "Skardu Adventure",
    description: "Discover crystal-clear lakes and rugged mountains in Skardu.",
    price: 280,
    location: "Skardu, Pakistan",
    latitude: 35.3318,
    longitude: 75.549,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/4/49/Upper_Kachura_Lake_Skardu.jpg",
    rating: 4.7,
  },
  {
    title: "Khunjerab Pass Journey",
    description:
      "Visit the highest paved international border crossing in the world.",
    price: 350,
    location: "Khunjerab Pass, Pakistan",
    latitude: 36.85,
    longitude: 75.42,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/6/64/Khunjerab_Pass_Border_Gate.jpg",
    rating: 4.6,
  },
  {
    title: "Neelum Valley Escape",
    description: "Lush green landscapes and serene rivers in Neelum Valley.",
    price: 270,
    location: "Neelum Valley, Pakistan",
    latitude: 34.5883,
    longitude: 73.9089,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/1/17/Neelum_Valley_View_AJK.jpg",
    rating: 4.7,
  },
  {
    title: "Malam Jabba Ski Trip",
    description: "Enjoy skiing and winter sports at Malam Jabba resort.",
    price: 220,
    location: "Malam Jabba, Pakistan",
    latitude: 35.2022,
    longitude: 72.5714,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/f/fd/Malam_Jabba_Ski_Resort_Swat.jpg",
    rating: 4.5,
  },
];

const priceFmt = (n) =>
  new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);

const stars = (rating) => {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const arr = Array.from({ length: 5 }, (_, i) => {
    if (i < full) return "full";
    if (i === full && half) return "half";
    return "empty";
  });
  return (
    <div className="flex items-center gap-1" aria-label={`${rating} out of 5`}>
      {arr.map((t, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="h-4 w-4 text-red-500"
          fill={t === "full" ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );
};

export default function Experiences() {
  const [query, setQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState();
  const [sort, setSort] = useState("popular");

  const filtered = useMemo(() => {
    let out = EXPERIENCES.filter((e) =>
      `${e.title} ${e.location} ${e.description}`
        .toLowerCase()
        .includes(query.toLowerCase())
    );
    if (maxPrice) out = out.filter((e) => e.price <= maxPrice);
    if (sort === "price-asc") out.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") out.sort((a, b) => b.price - a.price);
    if (sort === "rating") out.sort((a, b) => b.rating - a.rating);
    return out;
  }, [query, maxPrice, sort]);

  return (
    <div className="min-h-screen w-full bg-gray-100 text-gray-900">
      {/* Hero */}
      <section className="relative h-[48vh] w-full">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/4/4f/Rakaposhi%2C_Nagar_GB_%28Pakistan%29.jpg"
          alt="Hunza mountains"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent" />
        <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-end px-4 pb-10">
          <h1 className="text-4xl font-bold text-white">
            Find your next adventure
          </h1>
          <p className="text-white/80 max-w-lg">
            Explore the most breathtaking locations in Pakistan.
          </p>
        </div>
      </section>

      {/* Controls */}
      <div className="mx-auto max-w-6xl grid gap-3 px-4 py-6 sm:grid-cols-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search destinations"
          className="h-12 rounded-xl border border-gray-300 px-4"
        />
        <input
          type="number"
          placeholder="Max price (USD)"
          value={maxPrice ?? ""}
          onChange={(e) =>
            setMaxPrice(e.target.value ? parseInt(e.target.value, 10) : undefined)
          }
          className="h-12 rounded-xl border border-gray-300 px-4"
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="h-12 rounded-xl border border-gray-300 px-4"
        >
          <option value="popular">Sort: Popular</option>
          <option value="rating">Sort: Rating</option>
          <option value="price-asc">Sort: Price (Low → High)</option>
          <option value="price-desc">Sort: Price (High → Low)</option>
        </select>
      </div>

      {/* Cards */}
      <section className="mx-auto max-w-6xl grid gap-6 px-4 pb-10 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((e) => (
          <article
            key={e.title}
            className="overflow-hidden rounded-2xl bg-white shadow-lg transition hover:shadow-xl"
          >
            <div className="relative h-48">
              <img
                src={e.image}
                alt={e.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute left-3 top-3 rounded-full bg-black/60 px-2 py-1 text-xs text-white">
                {e.location}
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between">
                <h3 className="text-lg font-semibold">{e.title}</h3>
                <span className="text-red-500 font-bold">{priceFmt(e.price)}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{e.description}</p>
              <div className="mt-2 flex justify-between items-center">
                {stars(e.rating)}
                <a
                  href={`https://www.google.com/maps?q=${e.latitude},${e.longitude}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-blue-600 hover:underline"
                >
                  View on Maps
                </a>
              </div>
              <button className="mt-4 w-full h-10 rounded-xl bg-gradient-to-l from-red-600 to-red-400 text-white font-semibold hover:from-red-700 hover:to-red-500 transition">
                Book now
              </button>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
