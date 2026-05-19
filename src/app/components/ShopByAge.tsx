const ageGroups = [
  { age: "0–2 Yrs",  tag: "Baby",     emoji: "👶", image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=800", accent: "bg-pink-50 border-pink-200 hover:border-pink-400" },
  { age: "3–5 Yrs",  tag: "Toddler",  emoji: "🧒", image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=800", accent: "bg-amber-50 border-amber-200 hover:border-amber-400" },
  { age: "6–8 Yrs",  tag: "Junior",   emoji: "🎒", image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=800", accent: "bg-cyan-50 border-cyan-200 hover:border-cyan-400" },
  { age: "9–12 Yrs", tag: "Explorer", emoji: "🔭", image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800", accent: "bg-violet-50 border-violet-200 hover:border-violet-400" },
  { age: "Teen+",    tag: "Teen",     emoji: "🎮", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800", accent: "bg-fuchsia-50 border-fuchsia-200 hover:border-fuchsia-400" },
];

export default function ShopByAge() {
  return (
    <section className="section-card px-4 sm:px-6 lg:px-8 py-5 sm:py-7">

      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-black text-gray-900">Shop by Age</h2>
        <button className="text-xs sm:text-sm font-semibold text-pink-600 hover:text-pink-700 transition-colors">
          View all →
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {ageGroups.map((g, i) => (
          <button
            key={i}
            className={`${g.accent} border-2 rounded-lg overflow-hidden group cursor-pointer hover:shadow-md transition-all duration-300 text-left`}
          >
            <div className="h-32 sm:h-40 lg:h-44 overflow-hidden">
              <img
                src={g.image}
                alt={g.age}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-3 sm:p-3.5">
              <p className="text-[10px] text-gray-400 font-semibold">{g.tag}</p>
              <p className="text-sm sm:text-base font-black text-gray-900 leading-tight">{g.emoji} {g.age}</p>
              <p className="mt-1.5 text-[10px] sm:text-xs font-bold text-pink-600 group-hover:text-pink-700">
                Shop Now →
              </p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
