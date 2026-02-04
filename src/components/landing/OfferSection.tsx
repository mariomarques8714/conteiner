import { CONTENT } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { Check, Package, Clock } from "lucide-react";
import { ProductCarousel } from "./ProductCarousel";

interface OfferSectionProps {
  onCtaClick: () => void;
}

export function OfferSection({ onCtaClick }: OfferSectionProps) {
  const opportunity = CONTENT.opportunity;
  const product = CONTENT.product;
  const numbers = CONTENT.numbers;
  const why = CONTENT.why;
  const howItWorks = CONTENT.howItWorks;
  const deadline = CONTENT.deadline;
  const finalCta = CONTENT.finalCta;

  return (
    <div className="space-y-6 py-8">
      {/* Section: O que é essa oportunidade */}
      <section className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-card rounded-lg shadow-sm border border-border p-6 sm:p-8">
            <div className="flex items-start gap-3 mb-5">
              <Package className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
              <h2 className="text-lg sm:text-xl font-bold text-foreground">
                {opportunity.sectionTitle}
              </h2>
            </div>
            
            <div className="space-y-3">
              <p className="text-sm sm:text-base font-medium text-foreground">
                {opportunity.introText}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {opportunity.mainText}
              </p>
            </div>

            <ul className="mt-5 grid grid-cols-2 gap-2.5">
              {opportunity.bullets.map((bullet, index) => (
                <li key={index} className="flex items-center gap-2 text-sm text-foreground">
                  <Check className="h-4 w-4 text-brand-menta shrink-0" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-sm sm:text-base font-semibold text-foreground">
              {opportunity.closingText}
            </p>
          </div>
        </div>
      </section>

      {/* Section: Produto */}
      <section className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-card rounded-lg shadow-sm border border-border p-6 sm:p-8">
            <div className="flex items-start gap-3 mb-5">
              <div className="w-5 h-5 rounded bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-xs font-bold text-primary-foreground/70">★</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-foreground">
                {product.sectionTitle}
              </h2>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm sm:text-base font-medium text-foreground">
                {product.mainText}
              </p>
              <p className="text-sm text-muted-foreground">
                {product.subText}
              </p>
            </div>

            <ul className="mt-5 grid grid-cols-2 gap-2.5">
              {product.bullets.map((bullet, index) => (
                <li key={index} className="flex items-center gap-2 text-sm text-foreground">
                  <Check className="h-4 w-4 text-brand-menta shrink-0" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-sm sm:text-base font-semibold text-foreground">
              {product.closingText}
            </p>
          </div>
        </div>
      </section>

      {/* Product Photo Carousel */}
      <ProductCarousel />

      {/* Section: Números - CRITICAL SECTION */}
      <section className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-numbers-bg rounded-lg p-6 sm:p-8 border-l-4 border-l-primary">
            <h2 className="text-lg sm:text-xl font-bold text-foreground mb-6">
              {numbers.sectionTitle}
            </h2>
            
            {/* Payment breakdown */}
            <div className="space-y-0">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                {numbers.paymentLabel}
              </p>
              
              <div className="space-y-2 pb-4 border-b border-border/50">
                <p className="text-sm sm:text-base text-foreground">{numbers.firstPayment}</p>
                <p className="text-sm sm:text-base text-foreground">{numbers.secondPayment}</p>
              </div>
              
              <div className="py-4 border-b border-border/50">
                <p className="text-xl sm:text-2xl font-extrabold text-foreground">
                  {numbers.totalCost}
                </p>
              </div>

              <div className="pt-4">
                <p className="text-xs font-medium text-muted-foreground mb-1">
                  {numbers.comparisonLabel}
                </p>
                <p className="text-lg sm:text-xl font-bold text-profit-green">
                  {numbers.comparisonValue}
                </p>
              </div>
            </div>

            <p className="mt-6 text-sm sm:text-base font-semibold text-foreground">
              {numbers.closingText}
            </p>
            
            <p className="mt-2 text-xs text-muted-foreground">
              {numbers.observation}
            </p>
          </div>
        </div>
      </section>

      {/* Emotional breathing room after financial calculation */}
      <div className="h-4 sm:h-6" aria-hidden="true" />

      {/* Section: Por que isso existe */}
      <section className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-card rounded-lg shadow-sm border border-border p-6 sm:p-8">
            <h2 className="text-lg sm:text-xl font-bold text-foreground mb-5">
              {why.sectionTitle}
            </h2>
            
            <p className="text-sm sm:text-base text-foreground leading-relaxed mb-3">
              {why.mainText}
            </p>
            
            <p className="text-sm text-muted-foreground mb-5">
              {why.subText}
            </p>
            
            <p className="text-sm font-medium text-foreground/90 bg-muted/50 rounded-md px-4 py-3">
              {why.closingText}
            </p>
          </div>
        </div>
      </section>

      {/* Section: Como funciona */}
      <section className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-card rounded-lg shadow-sm border border-border p-6 sm:p-8">
            <h2 className="text-lg sm:text-xl font-bold text-foreground mb-6">
              {howItWorks.sectionTitle}
            </h2>
            
            <div className="space-y-3">
              {howItWorks.steps.map((step, index) => (
                <div key={index} className="flex items-start gap-4 bg-muted/30 rounded-md px-4 py-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-sm text-foreground pt-0.5">
                    {step}
                  </span>
                </div>
              ))}
            </div>

            <p className="mt-6 text-sm sm:text-base font-semibold text-foreground">
              {howItWorks.closingText}
            </p>
          </div>
        </div>
      </section>

      {/* Section: Prazo */}
      <section className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-card rounded-lg shadow-sm border border-border p-6 sm:p-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-5">
              <Clock className="h-5 w-5 text-countdown" />
              <h2 className="text-lg sm:text-xl font-bold text-foreground">
                {deadline.sectionTitle}
              </h2>
            </div>
            
            {/* Subtle red line accent */}
            <div className="w-12 h-0.5 bg-countdown mx-auto mb-5" />
            
            <p className="text-sm sm:text-base text-foreground leading-relaxed mb-3 max-w-lg mx-auto">
              {deadline.mainText}
            </p>
            
            <p className="text-sm text-muted-foreground">
              {deadline.subText}
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            <Button
              onClick={onCtaClick}
              size="lg"
              className="w-full min-h-[56px] px-10 text-base sm:text-lg font-bold shadow-lg rounded-lg"
            >
              {finalCta.buttonText}
            </Button>
            
            <p className="mt-4 text-sm text-muted-foreground text-center">
              {finalCta.microcopy}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
