import { CONTENT } from "@/lib/content";
export function HeroVideo() {
  return <div className="w-full overflow-hidden relative">
      {/* Video with floating shadow */}
      <div className="relative mx-auto max-w-4xl px-4">
        <div className="relative rounded-2xl overflow-hidden" style={{
        boxShadow: "0 20px 60px -15px rgba(0, 0, 0, 0.15), 0 10px 30px -10px rgba(0, 0, 0, 0.1)"
      }}>
          <video autoPlay loop muted playsInline preload="auto" className="w-full h-[280px] sm:h-[340px] lg:h-[380px] object-cover" aria-hidden="true">
            <source src="/video/hero-video.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
      
      {/* Caption below video */}
      
    </div>;
}