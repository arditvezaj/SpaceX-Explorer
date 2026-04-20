"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ImageOff } from "lucide-react";

interface ImageGalleryProps {
  images: string[];
  missionName: string;
}

export const ImageGallery = ({ images, missionName }: ImageGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = useCallback(
    () => setActiveIndex((i) => (i === 0 ? images.length - 1 : i - 1)),
    [images.length],
  );

  const next = useCallback(
    () => setActiveIndex((i) => (i === images.length - 1 ? 0 : i + 1)),
    [images.length],
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  };

  if (images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-space-blue/30 bg-space-dark py-16 text-space-muted">
        <ImageOff className="h-10 w-10" aria-hidden="true" />
        <p className="text-sm">No images available for this mission.</p>
      </div>
    );
  }

  return (
    <div
      role="region"
      aria-label="Mission image gallery — use arrow keys to navigate"
      className="flex flex-col gap-3"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-space-dark">
        <Image
          src={images[activeIndex]}
          alt={`${missionName} — image ${activeIndex + 1} of ${images.length}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 800px"
          priority={activeIndex === 0}
        />

        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-space-black/70 p-2 text-white transition-colors hover:bg-space-black"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              onClick={next}
              aria-label="Next image"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-space-black/70 p-2 text-white transition-colors hover:bg-space-black"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
            <span className="absolute bottom-2 right-3 rounded bg-space-black/70 px-2 py-0.5 text-xs text-space-silver">
              {activeIndex + 1} / {images.length}
            </span>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1" aria-label="Image thumbnails">
          {images.map((src, i) => (
            <button
              key={src}
              onClick={() => setActiveIndex(i)}
              aria-label={`View image ${i + 1}`}
              aria-pressed={i === activeIndex}
              className={`relative h-16 w-24 shrink-0 overflow-hidden rounded border-2 transition-colors ${
                i === activeIndex
                  ? "border-space-accent"
                  : "border-space-blue/30 hover:border-space-blue"
              }`}
            >
              <Image src={src} alt="" fill className="object-cover" sizes="96px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
