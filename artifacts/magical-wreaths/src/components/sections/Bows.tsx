import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import coastalBow from "@assets/IMG_5326_1780671565348.jpeg";
import patrioticBow from "@assets/IMG_5327_1780671565348.jpeg";
import floralBow from "@assets/IMG_5330_1780671565348.jpeg";

const BOWS = [
  {
    title: "Coastal Retreat",
    desc: "Turquoise starfish ribbon, sandy stripes, and seashell fabric. Pure beach house charm.",
    image: coastalBow,
  },
  {
    title: "Americana Pride",
    desc: "Stars, stripes, and 'We the People' ribbon layered into a bold patriotic statement.",
    image: patrioticBow,
  },
  {
    title: "Floral & Denim",
    desc: "Hot pink polka dots, garden florals, and soft denim. Feminine, fun, and one of a kind.",
    image: floralBow,
  },
];

export function Bows() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 bg-muted/20" id="bows">
      <div className="container max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10 md:mb-16 max-w-3xl mx-auto"
        >
          <span className="text-primary font-medium tracking-wider uppercase text-sm mb-2 block">Trending Right Now</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-foreground mb-4">
            The Bow Collection
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            Debbie's bows are wired, layered, and built to last — perfect for mailboxes, lanterns, chairs, pew ends, or anywhere that needs a little Southern flair.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {BOWS.map((bow, index) => (
            <motion.div
              key={bow.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group"
              data-testid={`card-bow-${index}`}
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden mb-5 shadow-lg transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-1">
                <img
                  src={bow.image}
                  alt={bow.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-xl font-serif text-foreground mb-2 group-hover:text-primary transition-colors">{bow.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{bow.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-3xl p-6 sm:p-8 md:p-12 shadow-md border border-primary/10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 text-center md:text-left"
        >
          <div className="max-w-xl">
            <h3 className="text-xl sm:text-2xl font-serif text-foreground mb-3">Want a Custom Bow?</h3>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Debbie can make bows in any theme, color scheme, or size. Perfect for doors, lanterns, mailboxes, chairs, pew ends, gifts, and more. Just describe your vision and she'll bring it to life.
            </p>
          </div>
          <Button
            size="lg"
            className="rounded-full bg-primary hover:bg-primary/90 text-white px-6 sm:px-10 h-12 sm:h-14 text-sm sm:text-base shadow-lg shadow-primary/20 shrink-0 transition-transform hover:-translate-y-1 w-full sm:w-auto"
            onClick={() => document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' })}
            data-testid="button-bows-order"
          >
            Order a Custom Bow
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
