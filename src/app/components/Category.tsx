const categories = [
  { name: "Remote Cars",  image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=600" },
  { name: "Teddy Bears",  image: "https://images.pexels.com/photos/459976/pexels-photo-459976.jpeg" },
  { name: "LEGO Sets",    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=600" },
  { name: "Robots",       image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=600" },
  { name: "Educational",  image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600" },
  { name: "Video Games",  image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=600" },
];

export default function Categories() {
  return (
    <section className="section-card px-4 sm:px-6 lg:px-8 py-5 sm:py-7">

      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-black text-gray-900">Shop by Category</h2>
        <button className="text-xs sm:text-sm font-semibold text-pink-600 hover:text-pink-700 transition-colors">
          View all →
        </button>
      </div>

      <div className="grid grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-5">
        {categories.map((cat, i) => (
          <button
            key={i}
            className="flex flex-col items-center gap-2 group"
          >
            <div className="w-full aspect-square rounded-full overflow-hidden border-2 border-gray-100 group-hover:border-pink-400 transition-all shadow-sm">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <p className="text-[11px] sm:text-xs font-semibold text-gray-700 group-hover:text-pink-600 transition-colors text-center leading-tight">
              {cat.name}
            </p>
          </button>
        ))}
      </div>
    </section>
  );
}
