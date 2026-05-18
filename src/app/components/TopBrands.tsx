export default function TopBrands() {
  const brands = [
    {
      name: "LEGO",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/2/24/LEGO_logo.svg",
      bg: "bg-yellow-100",
    },

    {
      name: "Barbie",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/0/0b/Barbie_Logo.svg",
      bg: "bg-pink-100",
    },

    {
      name: "Hot Wheels",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/5/56/Hot_Wheels_logo.svg",
      bg: "bg-orange-100",
    },

    {
      name: "Nerf",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/0/0d/Nerf_logo.svg",
      bg: "bg-blue-100",
    },

    {
      name: "Funskool",
      image:
        "https://upload.wikimedia.org/wikipedia/en/6/62/Funskool_logo.png",
      bg: "bg-green-100",
    },

    {
      name: "Fisher Price",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/8/8f/Fisher-Price_logo.svg",
      bg: "bg-red-100",
    },
  ];

  return (
    <div className="max-w-[1500px] mx-auto px-6 lg:px-10 py-16">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-10">

        <div>
          <h1 className="text-4xl font-extrabold text-gray-900">
            Top Brands
          </h1>

          <p className="text-gray-500 mt-2">
            Trusted toy brands loved by kids
          </p>
        </div>

        <button className="text-amber-600 hover:text-amber-700 font-semibold transition">
          View All
        </button>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">

        {brands.map((brand, index) => (
          <div
            key={index}
            className={`${brand.bg} rounded-3xl border border-white shadow-sm hover:shadow-xl hover:-translate-y-2 transition duration-300 p-6 flex flex-col items-center justify-between`}
          >

            {/* LOGO */}
            <div className="h-[100px] w-full flex items-center justify-center overflow-hidden">

              <img
                src={brand.image}
                alt={brand.name}
                className="max-h-[80px] w-auto object-contain hover:scale-105 transition duration-300"
              />
            </div>

            {/* NAME */}
            <h2 className="mt-5 text-lg font-bold text-gray-800 text-center">
              {brand.name}
            </h2>

            {/* BUTTON */}
            <button className="mt-4 bg-white hover:bg-black hover:text-white transition px-5 py-2 rounded-full text-sm font-semibold shadow-sm">
              Explore
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}