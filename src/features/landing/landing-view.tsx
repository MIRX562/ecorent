import Header from "./landing-header";
import Footer from "./landing-footer";
import HeroSection from "./landing-hero";
import FeaturesSection from "./landing-features";
import HowitworksSection from "./landing-howitworks";
import TestimonialsSection from "./landing-testimonials";
import CtaSection from "./landing-cta";
import FAQ from "./landing-faq";

export default function LandingPageView() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 w-full">
        <HeroSection />
        <FeaturesSection />
        <HowitworksSection />
        <TestimonialsSection />
        <CtaSection />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
