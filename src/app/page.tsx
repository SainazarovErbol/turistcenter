import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedPlaces from "@/components/FeaturedPlaces";
import MapWrapper from "@/components/MapWrapper";
import ToursSection from "@/components/ToursSection";
import ReviewsSection from "@/components/ReviewsSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeaturedPlaces />
        <MapWrapper />
        <ToursSection />
        <ReviewsSection />
      </main>
      <Footer />
    </>
  );
}
