import { getTours } from "@/lib/db/queries";
import ToursClient from "./ToursClient";

export default async function ToursPage() {
  const tours = await getTours();
  return <ToursClient tours={tours} />;
}
