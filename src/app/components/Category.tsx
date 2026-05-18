const categories = [
  {
    name: "Remote Cars",
    image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=800",
    dot: "bg-amber-500",
  },
 {
  name: "Teddy Bears",
  image:
    "https://images.pexels.com/photos/459976/pexels-photo-459976.jpeg",
  dot: "bg-rose-500",
},
  {
    name: "LEGO Sets",
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=800",
    dot: "bg-yellow-500",
  },
  {
    name: "Robots",
    image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=800",
    dot: "bg-blue-500",
  },
  {
    name: "Educational",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800",
    dot: "bg-green-500",
  },
  {
    name: "Video Games",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800",
    dot: "bg-purple-500",
  },
];

export default function Categories() {
  return (
    <div className="max-w-375 mx-auto px-6 lg:px-10 py-14">

      {/* HEADING */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-4xl font-extrabold text-gray-800">
            Shop by Category
          </h2>
          <div className="accent-line" />
        </div>
        <button className="text-amber-600 hover:text-amber-700 font-bold flex items-center gap-1 group transition-colors">
          View All
          <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
        </button>
      </div>

      {/* CATEGORY GRID — stagger-grid triggers children cascade via ScrollReveal */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 stagger-grid">
        {categories.map((category, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md hover:shadow-2xl hover-lift cursor-pointer overflow-hidden group border border-gray-100"
          >
            {/* IMAGE */}
            <div className="h-40 overflow-hidden">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
            </div>

            {/* NAME */}
            <div className="p-4 text-center flex flex-col items-center gap-1.5">
              <div className={`w-2.5 h-2.5 rounded-full ${category.dot}`} />
              <h3 className="text-sm font-bold text-gray-800">
                {category.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
