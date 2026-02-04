import { useEffect, useState } from "react";
import { StockBanner } from "@/components/landing/StockBanner";
import { HeroVideo } from "@/components/landing/HeroVideo";
import { HeroSection } from "@/components/landing/HeroSection";
import { OfferSection } from "@/components/landing/OfferSection";
import { Footer } from "@/components/landing/Footer";
import { PurchaseModal } from "@/components/purchase/PurchaseModal";
import { CONTENT } from "@/lib/content";

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Update document title
  useEffect(() => {
    document.title = CONTENT.global.browserTitle;
  }, []);

  const handleCtaClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background pt-12">
      <StockBanner />
      {/* Hero Video */}
      <HeroVideo />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection onCtaClick={handleCtaClick} />

        {/* Offer Information Section */}
        <OfferSection onCtaClick={handleCtaClick} />
      </main>

      {/* Footer */}
      <Footer />
      <PurchaseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Index;
