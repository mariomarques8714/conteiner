import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { cn } from "@/lib/utils";

const PRODUCT_IMAGES = [
  { src: "/images/product/jersey-1.webp", alt: "Camisa Brasil 2026 - Detalhe frontal do escudo CBF" },
  { src: "/images/product/jersey-2.webp", alt: "Camisa Brasil 2026 - Vista frontal completa" },
  { src: "/images/product/jersey-3.webp", alt: "Camisa Brasil 2026 - Vista lateral" },
  { src: "/images/product/jersey-4.webp", alt: "Camisa Brasil 2026 - Vista traseira" },
  { src: "/images/product/jersey-5.webp", alt: "Camisa Brasil 2026 - Vista diagonal" },
  { src: "/images/product/jersey-6.webp", alt: "Camisa Brasil 2026 - Detalhe do escudo" },
  { src: "/images/product/jersey-7.webp", alt: "Camisa Brasil 2026 - Etiqueta Engineered" },
  { src: "/images/product/jersey-8.webp", alt: "Camisa Brasil 2026 - Detalhe Aero-Fit" },
];

export function ProductCarousel() {
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>(
    new Array(PRODUCT_IMAGES.length).fill(false)
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      dragFree: true,
      containScroll: false,
      skipSnaps: true,
    },
    [
      AutoScroll({
        speed: 0.8,
        startDelay: 0,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
        stopOnFocusIn: true,
      }),
    ]
  );

  const handleImageLoad = (index: number) => {
    setImagesLoaded((prev) => {
      const updated = [...prev];
      updated[index] = true;
      return updated;
    });
  };

  // Resume auto-scroll after touch/mouse interaction ends
  useEffect(() => {
    if (!emblaApi) return;

    const autoScroll = emblaApi.plugins().autoScroll;
    if (!autoScroll) return;

    const onPointerUp = () => {
      // Small delay before resuming to feel natural
      setTimeout(() => {
        autoScroll.play();
      }, 2000);
    };

    emblaApi.on("pointerUp", onPointerUp);

    return () => {
      emblaApi.off("pointerUp", onPointerUp);
    };
  }, [emblaApi]);

  return (
    <section className="w-full overflow-hidden py-6 sm:py-8">
      {/* Carousel container with edge fades */}
      <div className="relative">
        {/* Left fade gradient */}
        <div 
          className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to right, hsl(var(--background)) 0%, transparent 100%)",
          }}
        />
        
        {/* Right fade gradient */}
        <div 
          className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to left, hsl(var(--background)) 0%, transparent 100%)",
          }}
        />

        {/* Embla viewport */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex touch-pan-y" style={{ gap: "8px" }}>
            {PRODUCT_IMAGES.map((image, index) => (
              <div
                key={index}
                className="flex-shrink-0"
                style={{ 
                  width: "clamp(200px, 45vw, 280px)",
                }}
              >
                {/* Vertical aspect ratio container (1080:1500 ≈ 18:25 ≈ 0.72) */}
                <div 
                  className="relative w-full overflow-hidden rounded-lg"
                  style={{ aspectRatio: "18 / 25" }}
                >
                  {/* Skeleton placeholder */}
                  {!imagesLoaded[index] && (
                    <div className="absolute inset-0 bg-muted animate-pulse rounded-lg" />
                  )}
                  
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading={index < 3 ? "eager" : "lazy"}
                    onLoad={() => handleImageLoad(index)}
                    className={cn(
                      "absolute inset-0 w-full h-full object-cover rounded-lg transition-opacity duration-300",
                      imagesLoaded[index] ? "opacity-100" : "opacity-0"
                    )}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
