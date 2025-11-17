// HomePage.js - محسن
import MainLayout from "@/components/layout/MainLayout";
import HeroSection from "@/components/home/HeroSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import BestSellers from "@/components/home/BestSellers";

export default function HomePage() {
  return (
    <MainLayout>
      <HeroSection />
      {/* <CategoriesSection /> */}
      <BestSellers />
    </MainLayout>
  );
}
