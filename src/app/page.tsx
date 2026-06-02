import Hero from "../components/Hero";
import ScrollReveal from "../components/ScrollReveal";
import CategorySection from "@/components/CategorySection";
import FeaturedProducts from "./components/FeaturedProducts";
import DealOfTheDay from "./components/DealOfTheDay";
import ShopByAge from "./components/ShopByAge";
import Testimonials from "./components/Testimonials";
import BrandsNewsletter from "./components/BrandsNewsletter";
import WhyChooseUs from "./components/WhyChooseUs";
import { getCategories } from "@/services/categoryService";

export default async function Home() {
  // Fetch on the server — no client waterfall, no loading spinner
  const categories = await getCategories().catch(() => []);

  return (
    <div className="bg-white min-h-screen">

      <ScrollReveal />
      <Hero />
      <CategorySection categories={categories} />
      <FeaturedProducts />
      <DealOfTheDay />
      <ShopByAge />
      <Testimonials />
      <BrandsNewsletter />
      <WhyChooseUs />
    </div>
  );
}
