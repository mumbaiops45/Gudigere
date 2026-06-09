import Hero from "../components/Hero";
import ScrollReveal from "../components/ScrollReveal";
import CategorySection from "@/components/CategorySection";
import FeaturedProducts from "./components/FeaturedProducts";
import DealOfTheDay from "./components/DealOfTheDay";
import ShopByAge from "./components/ShopByAge";
import Testimonials from "./components/Testimonials";
import BrandsNewsletter from "./components/BrandsNewsletter";
import WhyChooseUs from "./components/WhyChooseUs";
export default function Home() {
  return (
    <div className="bg-white min-h-screen">

      <ScrollReveal />
      <Hero />
      <CategorySection />
      <FeaturedProducts />
      <DealOfTheDay />
      <ShopByAge />
      <Testimonials />
      <BrandsNewsletter />
      <WhyChooseUs />
    </div>
  );
}
