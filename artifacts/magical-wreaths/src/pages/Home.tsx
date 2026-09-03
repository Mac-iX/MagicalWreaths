import { useState } from "react";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Gallery } from "@/components/sections/Gallery";
import { Bows } from "@/components/sections/Bows";
import { Boutique } from "@/components/sections/Boutique";
import { Process } from "@/components/sections/Process";
import { OrderForm } from "@/components/sections/OrderForm";
import { Testimonials } from "@/components/sections/Testimonials";
import { Footer } from "@/components/sections/Footer";
import { FloatingCTA } from "@/components/sections/FloatingCTA";
import { Menu, X } from "lucide-react";

export default function Home() {
  const [preselectedStyle, setPreselectedStyle] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleOrderStyle = (style: string) => {
    setPreselectedStyle(style);
  };

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <main className="w-full min-h-screen font-sans selection:bg-primary/30 selection:text-foreground">

      {/* Navigation */}
      <nav className="absolute top-0 left-0 w-full z-50 py-5 px-5 md:px-12 flex justify-between items-center">
        <div className="font-serif text-xl md:text-2xl font-medium tracking-tight text-foreground/90">
          Magical Wreaths
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex gap-8 text-sm font-medium uppercase tracking-wider text-foreground/80">
          <a href="#about" className="hover:text-primary transition-colors">About</a>
          <a href="#gallery" className="hover:text-primary transition-colors">Collections</a>
          <a href="#bows" className="hover:text-primary transition-colors">Bows</a>
          <a href="#process" className="hover:text-primary transition-colors">Process</a>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => scrollTo("order")}
            className="bg-foreground text-background px-5 py-2 rounded-full text-sm font-medium hover:bg-primary hover:text-white transition-colors"
            data-testid="button-nav-order"
          >
            Custom Order
          </button>
          {/* Mobile hamburger */}
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-full bg-white/70 backdrop-blur border border-border shadow-sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile slide-down menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}>
          <div
            className="absolute top-0 left-0 right-0 bg-white/95 pt-20 pb-8 px-8 shadow-xl rounded-b-3xl"
            onClick={e => e.stopPropagation()}
          >
            <ul className="space-y-5 text-base font-medium text-foreground/80">
              <li><button onClick={() => scrollTo("about")} className="hover:text-primary transition-colors w-full text-left">Meet Debbie</button></li>
              <li><button onClick={() => scrollTo("gallery")} className="hover:text-primary transition-colors w-full text-left">Collections</button></li>
              <li><button onClick={() => scrollTo("bows")} className="hover:text-primary transition-colors w-full text-left">Bows</button></li>
              <li><button onClick={() => scrollTo("process")} className="hover:text-primary transition-colors w-full text-left">How It Works</button></li>
              <li><button onClick={() => scrollTo("order")} className="w-full bg-primary text-white rounded-full py-3 font-semibold mt-2">✦ Custom Order</button></li>
            </ul>
          </div>
        </div>
      )}

      <Hero />
      <About />
      <Gallery onOrderStyle={handleOrderStyle} />
      <Bows />
      <Boutique />
      <Process />
      <OrderForm preselectedStyle={preselectedStyle} />
      <Testimonials />
      <Footer />

      {/* Floating wreath CTA */}
      <FloatingCTA />
    </main>
  );
}
