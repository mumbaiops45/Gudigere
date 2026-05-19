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
    <div className="bg-[#f1f3f6] min-h-screen">

      <Navbar />
      <ScrollReveal />
      <Hero />

      <main className="max-w-375 mx-auto px-2 sm:px-3 py-3 space-y-3">

        {/* TRENDING TOYS */}
        <section className="section-card px-4 sm:px-6 lg:px-8 py-5 sm:py-7" data-reveal>
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-black text-gray-900">Trending Toys</h2>
            <button className="text-xs sm:text-sm font-semibold text-pink-600 hover:text-pink-700 transition-colors">
              See All →
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {products.map((product, index) => (
              <div key={product.id} data-reveal data-delay={String(Math.min(index + 1, 8))}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </section>

        <div data-reveal><Categories /></div>
        <div data-reveal><DealsSection /></div>
        <div data-reveal><BestSellers /></div>
        <div data-reveal><ShopByAge /></div>
        <div data-reveal><TopBrands /></div>
        <div data-reveal><Newsletter /></div>
        <div data-reveal><Reviews /></div>

      </main>

      <Footer />
    </div>
  );
}
