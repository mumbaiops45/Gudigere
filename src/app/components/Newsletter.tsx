export default function Newsletter() {
  return (
    <section className="section-card px-4 sm:px-6 lg:px-8 py-5 sm:py-7">

      <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-12">

        {/* LEFT */}
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 bg-pink-50 text-pink-600 text-[10px] font-black px-3 py-1 rounded-full mb-3 tracking-widest uppercase">
            ✉️ Newsletter
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">
            Exclusive Toy Deals<br />
            <span className="text-pink-600">Every Week</span>
          </h2>
          <p className="mt-3 text-gray-500 text-sm leading-relaxed max-w-sm mx-auto lg:mx-0">
            Join 10,000+ parents getting the best toy deals and new arrivals straight to their inbox.
          </p>
          <div className="flex flex-wrap gap-2 mt-4 justify-center lg:justify-start">
            {["Weekly Deals", "Festival Offers", "New Arrivals", "No Spam"].map((t) => (
              <span key={t} className="text-[11px] font-semibold bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                ✓ {t}
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="w-full max-w-sm sm:max-w-md lg:shrink-0">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 sm:p-6">
            <h3 className="text-base font-black text-gray-900 mb-0.5">Subscribe Free 🎁</h3>
            <p className="text-xs text-gray-400 mb-4">Get 10% off your first order</p>

            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Your name"
                className="w-full border border-gray-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 rounded px-4 py-2.5 text-sm text-gray-700 outline-none transition-all bg-white"
              />
              <input
                type="email"
                placeholder="Your email address"
                className="w-full border border-gray-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 rounded px-4 py-2.5 text-sm text-gray-700 outline-none transition-all bg-white"
              />
              <button className="btn-shine w-full bg-pink-600 hover:bg-black text-white py-2.5 sm:py-3 rounded font-bold text-sm transition-colors">
                Subscribe & Get 10% Off →
              </button>
            </div>

            <p className="text-center text-xs text-gray-400 mt-3">No spam ever. Unsubscribe anytime.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
