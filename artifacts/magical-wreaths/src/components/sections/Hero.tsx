import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import springWreath from "@assets/Untitled_design_-_3_1780513318375.png";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-background">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={springWreath}
          alt="Beautiful handcrafted spring wreath by Debbie"
          className="w-full h-full object-contain object-center opacity-20 scale-110"
          style={{ filter: "blur(2px)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background"></div>
      </div>

      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-10">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[100px]"></div>
        <div className="absolute bottom-[10%] -right-[10%] w-[40%] h-[60%] rounded-full bg-secondary/20 blur-[120px]"></div>
      </div>

      {/* Content */}
      <div className="container relative z-20 px-4 sm:px-6 mx-auto text-center pt-24 sm:pt-28 md:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl mx-auto"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-white/50 backdrop-blur-sm border border-white/40 text-primary font-medium tracking-widest uppercase text-xs mb-5 shadow-sm">
            Handcrafted with Southern Charm
          </span>

          <h1 className="text-[2rem] leading-[1.15] sm:text-5xl md:text-7xl lg:text-8xl font-serif text-foreground mb-5 md:mb-6 md:leading-[1.1]">
            Welcome Home to{" "}
            <span className="text-primary italic font-light">Debbie's Magical Wreaths</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed">
            Hand-crafted wreaths by a Southern grandmother who pours her heart into every bow, wreath, and decoration.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Button
              size="lg"
              className="rounded-full bg-primary hover:bg-primary/90 text-white px-6 sm:px-8 h-12 sm:h-14 text-sm sm:text-base shadow-lg shadow-primary/20 w-full sm:w-auto transition-transform hover:-translate-y-1"
              onClick={() => document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' })}
              data-testid="button-hero-order"
            >
              Design a Custom Wreath
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-6 sm:px-8 h-12 sm:h-14 text-sm sm:text-base bg-white/50 backdrop-blur-md border-white/60 hover:bg-white w-full sm:w-auto transition-transform hover:-translate-y-1"
              onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
              data-testid="button-hero-gallery"
            >
              View the Gallery
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
