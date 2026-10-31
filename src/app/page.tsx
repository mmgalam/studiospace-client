import HeroSlider from "@/components/HeroSlider";
import FeaturedStudios from "@/components/FeaturedStudios";
import Categories from "@/components/Categories";
import HowBookingWorks from "@/components/HowBookingWorks";
import HostGuarantee from "@/components/HostGuarantee";

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <FeaturedStudios />
      <Categories />
      <HowBookingWorks />
      <HostGuarantee />
    </>
  );
}
