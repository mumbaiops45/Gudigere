export default function Newsletter() {
  return (
    <div className="max-w-375 mx-auto px-6 lg:px-10 py-16">

      {/* MAIN CONTAINER */}
      <div className="relative overflow-hidden rounded-[40px] bg-linear-to-r from-pink-500 via-purple-500 to-indigo-500 shadow-2xl">

        {/* BACKGROUND CIRCLES */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl -translate-x-20 -translate-y-20" />

        <div className="absolute bottom-0 right-0 w-72 h-72 bg-yellow-300/20 rounded-full blur-3xl translate-x-20 translate-y-20" />

        {/* CONTENT */}
        <div className="relative z-10 px-8 py-16 lg:px-20 flex flex-col lg:flex-row items-center justify-between gap-10">

          {/* LEFT CONTENT */}
          <div className="max-w-2xl text-white">

            <p className="uppercase tracking-[4px] text-pink-200 font-semibold">
              Stay Updated
            </p>

            <h1 className="text-5xl font-extrabold mt-4 leading-tight">
              Get Amazing Toy Deals & Offers
            </h1>

            <p className="mt-6 text-lg text-gray-200 leading-relaxed">
              Subscribe to our newsletter and receive
              exclusive discounts, latest toy launches,
              festival sales, and special offers directly
              in your inbox.
            </p>
          </div>

          {/* RIGHT FORM */}
          <div className="w-full max-w-xl">

            <div className="bg-white rounded-3xl p-4 shadow-2xl">

              {/* INPUT */}
              <div className="flex flex-col sm:flex-row gap-4">

                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 border border-gray-200 rounded-full px-6 py-4 outline-none focus:border-pink-500 text-gray-700"
                />

                <button className="bg-yellow-400 hover:bg-yellow-500 transition px-8 py-4 rounded-full font-bold text-black shadow-lg">
                  Subscribe
                </button>
              </div>

              {/* SMALL TEXT */}
              <p className="text-gray-500 text-sm mt-4 text-center">
                No spam. Only exciting toy deals &
                updates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}