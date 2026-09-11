import { motion } from "framer-motion";
import { MapPin, Clock } from "lucide-react";
import { boothPhotos, events } from "@/data/site";

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

        {events.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 max-w-4xl mx-auto">
            {events.map((ev, i) => (
              <motion.div
                key={`${ev.title}-${i}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl border border-primary/15 bg-primary/5 p-5"
              >
                <h3 className="font-serif text-lg text-foreground mb-2">{ev.title}</h3>
                <p className="text-sm text-foreground flex items-start gap-2 mb-1">
                  <CalendarIcon className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                  <span>
                    <span className="font-medium">{ev.date}</span>
                    {ev.time && <span className="text-muted-foreground"> · {ev.time}</span>}
                  </span>
                </p>
                <p className="text-sm text-muted-foreground flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                  <span>{ev.location}</span>
                </p>
                {ev.note && <p className="text-sm text-primary mt-2">{ev.note}</p>}
              </motion.div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {boothPhotos.map((img, i) => (
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

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}
