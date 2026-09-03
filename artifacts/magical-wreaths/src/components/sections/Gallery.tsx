import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { X } from "lucide-react";
import springWreath from "@assets/Untitled_design_-_3_1780513318375.png";
import coastalWreath from "@assets/Untitled_design_-_7_1780513318375.png";
import sunWreath from "@assets/Untitled_design_-_6_1780513318375.png";
import farmhouseWreath from "@assets/Untitled_design_-_10_1780513318375.png";
import tropicalWreath from "@assets/Untitled_design_-_1_1780513318375.png";
import lemonWreath from "@assets/Untitled_design_-_4_1780513318375.png";
import orangeWreath from "@assets/IMG_5341_1780674836974.jpeg";
import ladybugWreath from "@assets/IMG_5338_1780674857547.jpeg";
import floralBurstWreath from "@assets/IMG_5332_1780766927698.jpeg";
import watermelonWelcome from "@assets/IMG_5334_1780766927699.jpeg";

const CATEGORIES = [
  {
    title: "Spring Garden",
    desc: "Bursting with gerbera daisies, sunflowers, and colorful blooms for a joyful front door.",
    style: "full-floral",
    image: springWreath,
    cover: false,
  },
  {
    title: "Coastal Charm",
    desc: "Navy mesh, seashells, and a lighthouse centerpiece. Perfect for beach lovers.",
    style: "coastal",
    image: coastalWreath,
    cover: false,
  },
  {
    title: "Best is Yet to Come",
    desc: "Vibrant orange citrus wreath with a 'The Best is Yet to Come' sign and deep plum bow. Bold and joyful.",
    style: "seasonal",
    image: orangeWreath,
    cover: true,
  },
  {
    title: "Ladybug Love",
    desc: "Red polka dots, gingham ribbon, and sweet ladybug accents. Charming and one of a kind.",
    style: "full-floral",
    image: ladybugWreath,
    cover: true,
  },
  {
    title: "Summer Sunshine",
    desc: "Bright and playful with a happy sun face and cheerful ribbon accents.",
    style: "seasonal",
    image: sunWreath,
    cover: false,
  },
  {
    title: "Farmhouse Style",
    desc: "Burlap bows, gingham ribbon, and Southern charm that says 'hey y'all' to every guest.",
    style: "farmhouse",
    image: farmhouseWreath,
    cover: false,
  },
  {
    title: "Tropical Flair",
    desc: "Hot pink deco mesh, flamingo accents, and tropical flowers for a bold statement.",
    style: "seasonal",
    image: tropicalWreath,
    cover: false,
  },
  {
    title: "Lemon Grove",
    desc: "Fresh lemons, burlap base, and a striped bow. Sunshine on your door all season long.",
    style: "everyday-greenery",
    image: lemonWreath,
    cover: false,
  },
  {
    title: "Summer Floral Burst",
    desc: "An explosion of gerberas, daisies, and butterflies in every summer color — full, lush, and joyful.",
    style: "full-floral",
    image: floralBurstWreath,
    cover: true,
  },
  {
    title: "Watermelon Welcome",
    desc: "Sweet watermelon door hanger with a layered gingham bow — the perfect summer greeting.",
    style: "seasonal",
    image: watermelonWelcome,
    cover: true,
  },
];

type Category = typeof CATEGORIES[number];

const DOT_PATTERN = `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='10' cy='10' r='1.2' fill='%23c9a8a8' fill-opacity='0.18'/%3E%3C/svg%3E")`;

export function Gallery({ onOrderStyle }: { onOrderStyle?: (style: string) => void }) {
  const [selected, setSelected] = useState<Category | null>(null);

  const handleOrderThis = () => {
    setSelected(null);
    setTimeout(() => {
      document.getElementById("order")?.scrollIntoView({ behavior: "smooth" });
      if (selected && onOrderStyle) onOrderStyle(selected.style);
    }, 200);
  };

  return (
    <section
      className="py-24 px-6 relative overflow-hidden"
      id="gallery"
      style={{ backgroundImage: DOT_PATTERN, backgroundColor: "#fefcf9" }}
    >
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/5 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-secondary/10 blur-[80px] pointer-events-none" />

      <div className="container max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-center mb-16">
          <svg className="w-8 h-8 text-primary/40 mb-3" viewBox="0 0 32 32" fill="currentColor">
            <path d="M16 2 C16 2 13 8 8 10 C13 12 16 18 16 18 C16 18 19 12 24 10 C19 8 16 2 16 2Z" opacity="0.6"/>
            <path d="M16 14 C16 14 14 17 11 18 C14 19 16 22 16 22 C16 22 18 19 21 18 C18 17 16 14 16 14Z"/>
          </svg>
          <span className="text-primary font-medium tracking-wider uppercase text-sm mb-2 block">Our Collections</span>
          <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-4 text-center">A Wreath for Every Season</h2>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-16 bg-primary/30"></div>
            <svg className="w-4 h-4 text-primary/50" viewBox="0 0 16 16" fill="currentColor"><circle cx="8" cy="8" r="3"/></svg>
            <div className="h-px w-16 bg-primary/30"></div>
          </div>
          <p className="text-muted-foreground text-lg text-center max-w-2xl">
            Every piece you see here was made by Debbie's own hands: real wreaths, each one a little different, each one made with love.
          </p>
          <p className="text-sm text-primary font-medium mt-3">Tap any wreath to order that style custom-made for you.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {CATEGORIES.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.07 }}
              className="group cursor-pointer"
              onClick={() => setSelected(category)}
              data-testid={`card-gallery-${index}`}
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 shadow-md transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-1.5 bg-white border border-primary/8">
                <img
                  src={category.image}
                  alt={category.title}
                  className={`w-full h-full transition-transform duration-700 group-hover:scale-105 ${
                    category.cover
                      ? "object-cover object-center"
                      : "object-contain p-4"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                <div className="absolute bottom-0 left-0 w-full p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-white text-xs font-semibold tracking-wider uppercase">Order This Style ✦</p>
                </div>
              </div>
              <h3 className="text-base font-serif text-foreground mb-1 group-hover:text-primary transition-colors">{category.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{category.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Order This Style Dialog */}
      <Dialog open={!!selected} onOpenChange={(open) => { if (!open) setSelected(null); }}>
        <DialogContent className="w-[calc(100vw-2rem)] sm:max-w-md rounded-3xl p-0 overflow-hidden border-0 shadow-2xl max-h-[90vh] overflow-y-auto">
          {selected && (
            <>
              <div className="relative aspect-[4/3] bg-[#f9f7f5] w-full overflow-hidden">
                <img
                  src={selected.image}
                  alt={selected.title}
                  className={`w-full h-full ${selected.cover ? "object-cover object-center" : "object-contain p-6"}`}
                />
              </div>
              <div className="p-7">
                <DialogHeader className="mb-4">
                  <DialogTitle className="font-serif text-2xl text-foreground">{selected.title}</DialogTitle>
                  <DialogDescription className="text-base text-muted-foreground leading-relaxed">{selected.desc}</DialogDescription>
                </DialogHeader>
                <div className="bg-primary/5 rounded-2xl p-4 mb-6 text-sm text-foreground space-y-1.5">
                  <p><span className="font-semibold">Sizes available:</span> 16", 18", or 20" (custom event sizes available too)</p>
                  <p><span className="font-semibold">Turnaround:</span> 5–7 days after order confirmation</p>
                  <p><span className="font-semibold">Debbie confirms:</span> within 24–48 hrs by email, text, or phone</p>
                </div>
                <div className="flex gap-3">
                  <Button
                    className="flex-1 rounded-full bg-primary hover:bg-primary/90 text-white h-12 font-medium shadow-md shadow-primary/20"
                    onClick={handleOrderThis}
                    data-testid="button-dialog-order"
                  >
                    Yes, Order This Style
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-full h-12 px-5 border-border"
                    onClick={() => setSelected(null)}
                    data-testid="button-dialog-close"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
