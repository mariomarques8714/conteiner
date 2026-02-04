import { Button } from "@/components/ui/button";
import { CONTENT } from "@/lib/content";

interface HeroSectionProps {
  onCtaClick: () => void;
}

export function HeroSection({ onCtaClick }: HeroSectionProps) {
  const content = CONTENT.hero;
  return (
    <section
      className="relative sm:py-16 lg:py-20 py-[15px]"
      style={{
        background:
          "linear-gradient(180deg, hsl(var(--hero-gradient-start)) 0%, hsl(var(--hero-gradient-end)) 100%)",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto text-center">
          {/* Subtle institutional badge - container concept */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-6 rounded border border-border/60 bg-secondary">
            <span className="text-[11px] sm:text-xs tracking-wide uppercase text-primary-foreground font-extrabold text-center">
              Preço de contêiner
            </span>
          </div>

          {/* Main Headline - Larger, bolder */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground mb-6 leading-[1.15]">
            {content.headline}
          </h1>

          {/* Subheadline - Constrained width */}
          <p className="text-base sm:text-lg text-foreground/90 font-medium mb-5 leading-relaxed max-w-[520px] mx-auto">
            {content.subheadline}
          </p>

          {/* Supporting Text */}
          <p className="text-sm sm:text-base text-muted-foreground mb-10 max-w-lg mx-auto leading-relaxed">
            {content.supportingText}
          </p>

          {/* Primary CTA */}
          <div className="flex flex-col items-center gap-4">
            <Button
              onClick={onCtaClick}
              size="lg"
              className="w-full sm:w-auto min-h-[56px] px-10 text-base sm:text-lg font-bold shadow-lg rounded-lg"
            >
              {content.ctaPrimary}
            </Button>

            {/* Trust Microcopy */}
            <p className="text-sm text-muted-foreground text-center">
              {content.trustMicrocopy}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}