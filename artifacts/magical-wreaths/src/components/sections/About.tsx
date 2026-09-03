import { motion } from "framer-motion";
import debbiePhoto from "@assets/IMG_5342_1780671565348.jpeg";
import ribbonsImage from "@assets/Untitled_design_-_9_1780513318375.png";

export function About() {
  return (
    <section className="py-24 px-6 bg-muted/30 relative overflow-hidden" id="about">
      <div className="container max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-2xl z-10 border-8 border-white">
              <img
                src={debbiePhoto}
                alt="Debbie Gentry at her wreath boutique"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-secondary/40 rounded-full blur-2xl -z-10"></div>
            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-primary/20 rounded-full blur-3xl -z-10"></div>

            <div className="absolute -right-6 top-12 bg-white p-4 rounded-xl shadow-xl z-20 max-w-[180px] hidden md:block">
              <p className="font-serif italic text-primary text-lg leading-tight text-center">"Every wreath tells a story."</p>
            </div>
          </motion.div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-5 text-center lg:text-left"
          >
            <span className="text-primary font-medium tracking-wider uppercase text-sm block">Meet the Maker</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-foreground leading-tight">
              The Heart & Hands Behind{" "}
              <span className="italic text-primary font-light">Magical Wreaths</span>
            </h2>

            <div className="prose prose-base sm:prose-lg text-muted-foreground prose-p:leading-relaxed">
              <p>
                I've been crafting wreaths for friends, family, and customers for years, traveling from my workshop to markets all along the Carolina coast, from Bolivia to Wilmington and everywhere in between.
              </p>
              <p>
                No two wreaths are ever exactly alike, because no two orders are.
              </p>
              <p className="font-serif text-lg sm:text-xl text-foreground italic border-l-2 border-primary pl-5 py-2 mt-6 bg-primary/5 rounded-r-lg text-left">
                When you order a magical wreath, you're not just getting any wreath or bow. You're getting a piece of handmade art crafted just for you.
              </p>
            </div>

            <div className="pt-6 flex items-center gap-4">
              <img
                src={ribbonsImage}
                alt="Debbie's handmade ribbon collection"
                className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
              />
              <span className="font-serif text-lg text-foreground">With love, Debbie</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
