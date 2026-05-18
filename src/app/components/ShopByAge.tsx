export default function ShopByAge() {
  const ageGroups = [
    {
      age: "0 - 2 Years",
      image:
        "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=1200",
      color:
        "from-pink-400 to-rose-500",
    },

    {
      age: "3 - 5 Years",
      image:
        "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1200",
      color:
        "from-yellow-400 to-orange-500",
    },

    {
      age: "6 - 8 Years",
      image:
        "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=1200",
      color:
        "from-cyan-400 to-blue-500",
    },

    {
      age: "9 - 12 Years",
      image:
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1200",
      color:
        "from-purple-400 to-indigo-500",
    },

    {
      age: "Teen Collection",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200",
      color:
        "from-green-400 to-emerald-500",
    },
  ];

  return (
    <div className="max-w-375 mx-auto px-6 lg:px-10 py-14">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-10">

        <div>
          <h1 className="text-4xl font-extrabold text-gray-800">
            Shop by Age
          </h1>

          <p className="text-gray-500 mt-2">
            Find the perfect toys for every age
          </p>
        </div>

        <button className="text-cyan-700 hover:underline font-semibold">
          View All
        </button>
      </div>

      {/* AGE GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">

        {ageGroups.map((group, index) => (
          <div
            key={index}
            className={`relative rounded-3xl overflow-hidden shadow-xl hover:-translate-y-3 hover:shadow-2xl transition duration-300 cursor-pointer bg-linear-to-br ${group.color}`}
          >

            {/* IMAGE */}
            <div className="h-105 overflow-hidden">

              <img
                src={group.image}
                alt={group.age}
                className="w-full h-full object-cover hover:scale-110 transition duration-700"
              />
            </div>

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-black/30" />

            {/* CONTENT */}
            <div className="absolute bottom-0 left-0 w-full p-6 text-white">

              <h2 className="text-3xl font-extrabold leading-tight">
                {group.age}
              </h2>

              <p className="mt-3 text-sm text-gray-200">
                Explore fun & learning toys
              </p>

              <button className="mt-5 bg-white text-black hover:bg-yellow-400 transition px-6 py-3 rounded-full font-bold shadow-lg">
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}