import { Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Aarav Sharma",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    title: "Excellent quality, super fast delivery!",
    tag: "Remote Control Car",
    text: "My son absolutely loves it. Well packaged and super fast delivery. Totally worth every rupee — best purchase this year!",
    date: "2 days ago",
  },
  {
    id: 2,
    name: "Priya Verma",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    title: "My daughter was absolutely thrilled!",
    tag: "Teddy Bear",
    text: "The teddy bear was so soft and beautifully packed. Best toy collection online. Will definitely order again from Gudigere.",
    date: "1 week ago",
  },
  {
    id: 3,
    name: "Rohan Patel",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    rating: 4,
    title: "Great prices, awesome packaging",
    tag: "LEGO Set",
    text: "Kids loved the LEGO set. Great prices and fast shipping. One small piece was missing but customer support resolved it quickly.",
    date: "2 weeks ago",
  },
];

export default function Reviews() {
  return (
    <section className="section-card px-4 sm:px-6 lg:px-8 py-5 sm:py-7">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3">
        <h2 className="text-lg sm:text-xl font-black text-gray-900">Customer Reviews</h2>
        <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-100 px-4 py-2 rounded-full w-fit">
          <span className="text-yellow-400 text-sm">★★★★★</span>
          <span className="text-sm font-bold text-gray-700">4.9 / 5</span>
          <span className="text-xs text-gray-400 hidden sm:inline">· 12,000+ reviews</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
        {reviews.map((r) => (
          <div
            key={r.id}
            className="border border-gray-200 rounded-lg p-4 sm:p-5 flex flex-col hover:border-pink-200 hover:shadow-sm transition-all"
          >
            {/* Stars */}
            <div className="flex items-center gap-0.5 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={13}
                  fill={i < r.rating ? "#f59e0b" : "none"}
                  className={i < r.rating ? "text-amber-400" : "text-gray-200"}
                />
              ))}
              <span className="ml-1 text-[10px] text-gray-400">{r.date}</span>
            </div>

            {/* Title */}
            <h3 className="text-sm font-bold text-gray-900 mb-1.5">{r.title}</h3>

            {/* Text */}
            <p className="text-gray-500 text-xs sm:text-sm leading-relaxed flex-1">
              {r.text}
            </p>

            {/* Tag */}
            <div className="mt-3 mb-3">
              <span className="bg-gray-100 text-gray-500 text-[10px] font-semibold px-2.5 py-1 rounded-full">
                Bought: {r.tag}
              </span>
            </div>

            {/* Reviewer */}
            <div className="border-t border-gray-100 pt-3 flex items-center gap-2.5">
              <img src={r.avatar} alt={r.name} className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border border-gray-100" />
              <div>
                <p className="text-xs sm:text-sm font-bold text-gray-800">{r.name}</p>
                <p className="text-[10px] text-green-600 font-semibold">✓ Verified Purchase</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
