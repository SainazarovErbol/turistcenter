import { getPlaces } from "@/lib/db/queries";
import PlacesClient from "./PlacesClient";

export default async function PlacesPage() {
  const attractions = await getPlaces();
  return <PlacesClient attractions={attractions} />;
}
