import type { Metadata } from "next";
import Hero from "../components/Hero";

export const metadata: Metadata = {
  title: "GudiGear – India's Toy Marketplace | Shop Toys Online",
  description:
    "Discover thousands of toys for every age at GudiGear. Shop LEGO, RC cars, action figures, board games, soft toys & more. Fast delivery across India.",
};
import ScrollReveal from "../components/ScrollReveal";
import CategorySection from "@/components/CategorySection";
import FeaturedProducts from "./components/FeaturedProducts";
import DealOfTheDay from "./components/DealOfTheDay";
import ShopByAge from "./components/ShopByAge";
// import Testimonials from "./components/Testimonials";
import BrandsNewsletter from "./components/BrandsNewsletter";
import WhyChooseUs from "./components/WhyChooseUs";
import OurBrandsPage from "./components/OurBrandsPage";
export default function Home() {
  return (
    <div className="bg-white min-h-screen">

      <ScrollReveal />
      <Hero />
      <CategorySection />
      <FeaturedProducts />
      <DealOfTheDay />
      <ShopByAge />
      <OurBrandsPage />
      {/* <Testimonials /> */}
      <BrandsNewsletter />
      <WhyChooseUs />
    </div>
  );
}
