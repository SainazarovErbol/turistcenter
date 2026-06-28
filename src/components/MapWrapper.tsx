"use client";

import dynamic from "next/dynamic";

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

export default function MapWrapper() {
  return <InteractiveMap />;
}
