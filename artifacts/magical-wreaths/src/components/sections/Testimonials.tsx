import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { testimonials } from "@/data/site";

const TESTIMONIALS = testimonials;

export function Testimonials() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 bg-primary/5" id="testimonials">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-10 md:mb-16">
          <span className="text-primary font-medium tracking-wider uppercase text-sm mb-2 block">Happy Homes</span>
          <h2 className="text-3xl sm:text-4xl font-serif text-foreground mb-4">Love Notes from the Neighborhood</h2>
          <p className="text-muted-foreground text-base max-w-xl mx-auto">From Oak Island to Wilmington, Debbie's wreaths are brightening doors all across coastal Carolina.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-border/50 relative flex flex-col h-full"
            >
              <div className="flex gap-1 mb-5 text-yellow-400">
                {[1,2,3,4,5].map(star => <Star key={star} size={16} fill="currentColor" />)}
              </div>
              <p className="text-muted-foreground italic mb-6 flex-grow leading-relaxed text-sm sm:text-base">
                "{t.text}"
              </p>
              <div className="pt-5 border-t border-border mt-auto">
                <h4 className="font-serif text-foreground font-medium">{t.name}</h4>
                <p className="text-sm text-primary">{t.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
