import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductCard from "./components/ProductCard";
import Footer from "./components/Footer";
import ScrollReveal from "./components/ScrollReveal";

import products from "./data/products";
import Categories from "./components/Category";
import DealsSection from "./components/DealsSection";
import BestSellers from "./components/BestSellers";
import ShopByAge from "./components/ShopByAge";
import TopBrands from "./components/TopBrands";
import Newsletter from "./components/Newsletter";
import Reviews from "./components/Reviews";

export default function Home() {
  return (
    <div className="bg-[#fffbf4] min-h-screen">

      {/* NAVBAR */}
      <Navbar />

      {/* Activates scroll-reveal for [data-reveal] and .stagger-grid */}
      <ScrollReveal />

      {/* HERO */}
      <Hero />

      {/* PRODUCTS SECTION */}
      <div className="max-w-375 mx-auto px-6 lg:px-10 pt-20 pb-16">

        {/* SECTION HEADER */}
        <div className="flex items-center justify-between mb-10" data-reveal>
          <div>
            <h2 className="text-4xl font-extrabold text-gray-800">
              Trending Toys
            </h2>
            <div className="accent-line" />
          </div>
          <button className="text-amber-600 hover:text-amber-700 font-bold flex items-center gap-1 group transition-colors">
            See All Deals
            <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
          </button>
        </div>

        {/* PRODUCTS GRID — each card revealed with staggered delay */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              data-reveal
              data-delay={String(Math.min(index + 1, 8))}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* CATEGORIES */}
        <div data-reveal>
          <Categories />
        </div>

        {/* DEALS */}
        <div data-reveal>
          <DealsSection />
        </div>

        {/* BEST SELLERS */}
        <div data-reveal>
          <BestSellers />
        </div>

        {/* SHOP BY AGE */}
        <div data-reveal>
          <ShopByAge />
        </div>

        {/* TOP BRANDS */}
        <div data-reveal>
          <TopBrands />
        </div>

        {/* NEWSLETTER */}
        <div data-reveal>
          <Newsletter />
        </div>

        {/* REVIEWS */}
        <div data-reveal>
          <Reviews />
        </div>

      </div>

      {/* FOOTER */}
      <Footer />

    </div>
  );
}
