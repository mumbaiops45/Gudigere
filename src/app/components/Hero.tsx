export default function Hero() {
  return (
    <div className="relative bg-[#fffbf4]">

      {/* HERO BANNER */}
      <div
        className="relative h-135 bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?q=80&w=2070')",
        }}
      >
        {/* Dark gradient overlay — left-heavy so text is readable */}
        <div className="absolute inset-0 bg-linear-to-r from-black/65 via-black/35 to-transparent" />

        {/* Bottom fade into page background */}
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-[#fffbf4]" />

        {/* Floating decorative blobs */}
        <div className="absolute top-16 right-28 w-28 h-28 rounded-full bg-amber-400/20 blur-3xl deco-float pointer-events-none" />
        <div className="absolute top-44 right-56 w-18 h-18 rounded-full bg-pink-400/25 blur-2xl deco-float-2 pointer-events-none" />
        <div className="absolute bottom-32 right-80 w-24 h-24 rounded-full bg-purple-400/20 blur-3xl deco-float-3 pointer-events-none" />

        {/* HERO TEXT */}
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-375 w-full mx-auto px-6 lg:px-10">
            <div className="max-w-xl">

              {/* Promo badge */}
              <div className="enter-left-1 inline-flex items-center gap-2 toy-badge text-black px-5 py-2 rounded-full text-sm font-extrabold mb-5 cursor-pointer">
                🎉 Up to 50% OFF Today!
              </div>

              {/* Main heading */}
              <h1 className="enter-1 text-5xl lg:text-6xl font-extrabold text-white leading-tight drop-shadow-2xl">
                Toys for Every
                <span className="block text-gradient-warm">
                  Adventure!
                </span>
              </h1>

              {/* Subtitle */}
              <p className="enter-2 mt-4 text-white/80 text-lg leading-relaxed max-w-sm">
                Magical toys for boys &amp; girls, aged 0–16.
                <br />Free delivery across India!
              </p>

              {/* CTA buttons */}
              <div className="enter-3 flex flex-wrap gap-4 mt-8">
                <button className="btn-shine bg-amber-400 hover:bg-amber-500 text-black px-8 py-4 rounded-full font-extrabold text-lg transition-all shadow-2xl hover:shadow-amber-500/40 hover:scale-105 active:scale-95">
                  Shop Now
                </button>
                <button className="bg-white/15 hover:bg-white/28 backdrop-blur-md text-white px-8 py-4 rounded-full font-bold text-lg transition-all border border-white/40 hover:border-white/70 hover:scale-105 active:scale-95">
                  View Deals
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* CATEGORY QUICK-ACCESS CARDS */}
      <div className="relative -mt-16 z-10">
        <div className="max-w-375 mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* RC TOYS */}
            <div className="enter-1 bg-white p-5 shadow-xl rounded-2xl hover-lift border border-amber-100 group">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-amber-500 shadow" />
                <h2 className="text-lg font-extrabold text-gray-800">Remote Control Toys</h2>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <img src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=800"
                  className="h-28 w-full object-cover rounded-xl hover:scale-105 transition duration-300" alt="RC Car" />
                <img src="https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?q=80&w=800"
                  className="h-28 w-full object-cover rounded-xl hover:scale-105 transition duration-300" alt="RC Toy" />
                <img src="https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?q=80&w=800"
                  className="h-28 w-full object-cover rounded-xl hover:scale-105 transition duration-300" alt="RC Drone" />
                <img src="https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=800"
                  className="h-28 w-full object-cover rounded-xl hover:scale-105 transition duration-300" alt="RC Plane" />
              </div>
              <button className="text-amber-600 hover:text-amber-700 mt-4 text-sm font-bold flex items-center gap-1 group/btn">
                Explore More
                <span className="group-hover/btn:translate-x-1 transition-transform inline-block">→</span>
              </button>
            </div>

            {/* SOFT TOYS */}
            <div className="enter-2 bg-white p-5 shadow-xl rounded-2xl hover-lift border border-pink-100 group">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-pink-500 shadow" />
                <h2 className="text-lg font-extrabold text-gray-800">Teddy Bears &amp; Dolls</h2>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <img
                  src="https://images.pexels.com/photos/207891/pexels-photo-207891.jpeg"
                  className="h-28 w-full object-cover rounded-xl hover:scale-105 transition duration-300"
                  alt="Teddy Bear"
                />
                <img src="https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=800"
                  className="h-28 w-full object-cover rounded-xl hover:scale-105 transition duration-300" alt="Doll" />
                <img
                  src="https://images.pexels.com/photos/459957/pexels-photo-459957.jpeg"
                  className="h-28 w-full object-cover rounded-xl hover:scale-105 transition duration-300"
                  alt="Stuffed Toy"
                />
                <img src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?q=80&w=800"
                  className="h-28 w-full object-cover rounded-xl hover:scale-105 transition duration-300" alt="Bear" />
              </div>
              <button className="text-pink-600 hover:text-pink-700 mt-4 text-sm font-bold flex items-center gap-1 group/btn">
                Shop Cute Toys
                <span className="group-hover/btn:translate-x-1 transition-transform inline-block">→</span>
              </button>
            </div>

            {/* LEGO */}
            <div className="enter-3 bg-white p-5 shadow-xl rounded-2xl hover-lift border border-blue-100 group">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-blue-500 shadow" />
                <h2 className="text-lg font-extrabold text-gray-800">LEGO &amp; Building Sets</h2>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <img src="https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=800"
                  className="h-28 w-full object-cover rounded-xl hover:scale-105 transition duration-300" alt="LEGO" />
                <img src="https://images.unsplash.com/photo-1572981779307-38b8cabb2407?q=80&w=800"
                  className="h-28 w-full object-cover rounded-xl hover:scale-105 transition duration-300" alt="Blocks" />
                <img src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=800"
                  className="h-28 w-full object-cover rounded-xl hover:scale-105 transition duration-300" alt="Set" />
                <img src="https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800"
                  className="h-28 w-full object-cover rounded-xl hover:scale-105 transition duration-300" alt="Build" />
              </div>
              <button className="text-blue-600 hover:text-blue-700 mt-4 text-sm font-bold flex items-center gap-1 group/btn">
                Build &amp; Play
                <span className="group-hover/btn:translate-x-1 transition-transform inline-block">→</span>
              </button>
            </div>

            {/* EDUCATIONAL */}
            <div className="enter-4 bg-white p-5 shadow-xl rounded-2xl hover-lift border border-green-100 group">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-green-500 shadow" />
                <h2 className="text-lg font-extrabold text-gray-800">Educational Toys</h2>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <img src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=800"
                  className="h-28 w-full object-cover rounded-xl hover:scale-105 transition duration-300" alt="Edu 1" />
                <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800"
                  className="h-28 w-full object-cover rounded-xl hover:scale-105 transition duration-300" alt="Edu 2" />
                <img src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=800"
                  className="h-28 w-full object-cover rounded-xl hover:scale-105 transition duration-300" alt="Edu 3" />
                <img src="https://images.unsplash.com/photo-1516117172878-fd2c41f4a759?q=80&w=800"
                  className="h-28 w-full object-cover rounded-xl hover:scale-105 transition duration-300" alt="Edu 4" />
              </div>
              <button className="text-green-600 hover:text-green-700 mt-4 text-sm font-bold flex items-center gap-1 group/btn">
                Learn &amp; Fun
                <span className="group-hover/btn:translate-x-1 transition-transform inline-block">→</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
