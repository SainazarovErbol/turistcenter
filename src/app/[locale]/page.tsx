import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedPlaces from "@/components/FeaturedPlaces";
import MapWrapper from "@/components/MapWrapper";
import ToursSection from "@/components/ToursSection";
import ReviewsSection from "@/components/ReviewsSection";
import Footer from "@/components/Footer";
import { getPlaces } from "@/lib/db/queries";

export default async function HomePage() {
  const places = await getPlaces();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeaturedPlaces places={places} />
        <MapWrapper places={places} />
        <ToursSection />
        <ReviewsSection />
      </main>
      <Footer />
    </>
  );
}
