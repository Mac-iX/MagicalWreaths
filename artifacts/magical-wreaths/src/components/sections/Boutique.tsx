import { motion } from "framer-motion";
import booth1 from "@assets/IMG_5320_1780671565348.jpeg";
import booth2 from "@assets/IMG_5321_1780671565348.jpeg";

export function Boutique() {
  return (
    <section className="py-20 px-6 bg-white" id="boutique">
      <div className="container max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 max-w-2xl mx-auto"
        >
          <span className="text-primary font-medium tracking-wider uppercase text-sm mb-2 block">Find Us</span>
          <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">Debbie at the Market</h2>
          <p className="text-muted-foreground text-base leading-relaxed">
            You can find Debbie's work at local markets and craft fairs across Eastern North Carolina. Every booth is a burst of color, creativity, and Southern hospitality, just like the woman behind it.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[booth1, booth2].map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="rounded-2xl overflow-hidden shadow-lg aspect-[4/3]"
              data-testid={`img-boutique-${i}`}
            >
              <img
                src={img}
                alt={`Debbie's Magical Wreaths market booth`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
