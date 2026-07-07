"use client";

import dynamic from "next/dynamic";
import type { Attraction } from "@/data/attractions";

const InteractiveMap = dynamic(() => import("@/components/InteractiveMap"), {
  ssr: false,
  loading: () => (
    <section id="map" className="py-20 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="h-[480px] rounded-xl bg-muted animate-pulse" />
      </div>
    </section>
  ),
});

interface Props {
  places: Attraction[];
}

export default function MapWrapper({ places }: Props) {
  return <InteractiveMap places={places} />;
}
