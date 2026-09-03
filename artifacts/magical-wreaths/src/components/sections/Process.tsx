import { motion } from "framer-motion";
import { MessageSquareHeart, Paintbrush, Gift } from "lucide-react";
import debbiePhoto from "@assets/IMG_5342_1780671565348.jpeg";
import coastalBow from "@assets/IMG_5326_1780671565348.jpeg";
import floralBow from "@assets/IMG_5330_1780671565348.jpeg";
import ladybugWreath from "@assets/IMG_5338_1780674857547.jpeg";
import booth2 from "@assets/IMG_5321_1780671565348.jpeg";
import orangeWreath from "@assets/IMG_5341_1780674836974.jpeg";

const STEPS = [
  {
    icon: <MessageSquareHeart className="w-8 h-8 text-primary" />,
    title: "1. Share Your Vision",
    desc: "Use our design form to tell Debbie about your style, colors, and the feeling you want to create."
  },
  {
    icon: <Paintbrush className="w-8 h-8 text-secondary" />,
    title: "2. Debbie Gets to Work",
    desc: "She confirms within 24–48 hours, then selects the finest ribbons and florals and pours her heart into your piece."
  },
  {
    icon: <Gift className="w-8 h-8 text-accent" />,
    title: "3. Ready in 5–7 Days",
    desc: "Your creation is carefully packaged and shipped, or delivered locally in Eastern NC for multiple orders."
  }
];

export function Process() {
  return (
    <section className="py-24 px-6 bg-secondary/10 relative overflow-hidden" id="process">
      <div className="absolute top-0 left-0 w-full h-16 bg-[#fefcf9] rounded-b-[100%] scale-x-150 -translate-y-8"></div>
      <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-primary/8 blur-[60px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-64 h-64 rounded-full bg-secondary/15 blur-[80px] pointer-events-none" />

      <div className="container max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">

          {/* Left: text + steps */}
          <div className="lg:w-1/2 space-y-10 lg:space-y-12">
            <div className="text-center lg:text-left">
              <span className="text-primary font-medium tracking-wider uppercase text-sm mb-2 block">How It Works</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-foreground mb-4">From Debbie's Hands<br/>to Your Door</h2>
              <p className="text-muted-foreground text-base sm:text-lg">
                Ordering a custom piece is simple, personal, and full of joy.
              </p>
            </div>

            {/* Desktop steps */}
            <div className="space-y-8 relative hidden md:block">
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-primary/20 to-transparent"></div>
              {STEPS.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="flex items-start gap-6 relative"
                >
                  <div className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center shrink-0 border border-border z-10">
                    {step.icon}
                  </div>
                  <div className="pt-1">
                    <h3 className="text-xl font-serif text-foreground mb-2">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Mobile steps */}
            <div className="space-y-5 md:hidden">
              {STEPS.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="bg-white p-6 rounded-2xl shadow-sm border border-border/50"
                >
                  <div className="w-12 h-12 rounded-full bg-muted/30 flex items-center justify-center mb-4">{step.icon}</div>
                  <h3 className="text-xl font-serif text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Photo collage */}
          <motion.div
            className="lg:w-1/2 w-full"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Mobile: horizontal scroll strip */}
            <div className="lg:hidden flex gap-3 overflow-x-auto pb-3 snap-x snap-mandatory -mx-6 px-6 scrollbar-hide">
              {[
                { src: debbiePhoto, alt: "Debbie at her booth", pos: "object-top" },
                { src: coastalBow, alt: "Coastal bow", pos: "object-center" },
                { src: floralBow, alt: "Floral bow", pos: "object-center" },
                { src: ladybugWreath, alt: "Ladybug wreath", pos: "object-center" },
                { src: orangeWreath, alt: "Orange citrus wreath", pos: "object-center" },
                { src: booth2, alt: "Booth", pos: "object-center" },
              ].map((img) => (
                <div
                  key={img.alt}
                  className="shrink-0 snap-start w-52 h-52 rounded-2xl overflow-hidden border-4 border-white shadow-lg"
                >
                  <img src={img.src} alt={img.alt} className={`w-full h-full object-cover ${img.pos}`} />
                </div>
              ))}
            </div>

            {/* Desktop: overlapping collage */}
            <div className="relative w-full hidden lg:block" style={{ height: "480px" }}>
              {/* Large main photo — Debbie at booth */}
              <div className="absolute top-0 left-0 w-[58%] h-[65%] rounded-2xl overflow-hidden border-4 border-white shadow-xl z-20"
                style={{ transform: "rotate(-2deg)" }}>
                <img src={debbiePhoto} alt="Debbie at her booth" className="w-full h-full object-cover object-top" />
              </div>

              {/* Top right — coastal bow */}
              <div className="absolute top-0 right-0 w-[38%] h-[42%] rounded-2xl overflow-hidden border-4 border-white shadow-lg z-10"
                style={{ transform: "rotate(2.5deg)" }}>
                <img src={coastalBow} alt="Coastal bow" className="w-full h-full object-cover" />
              </div>

              {/* Middle right — patriotic bow */}
              <div className="absolute top-[44%] right-0 w-[40%] h-[38%] rounded-2xl overflow-hidden border-4 border-white shadow-lg z-30"
                style={{ transform: "rotate(-1.5deg)" }}>
                <img src={floralBow} alt="Floral bow" className="w-full h-full object-cover" />
              </div>

              {/* Bottom left — ladybug wreath */}
              <div className="absolute bottom-0 left-0 w-[38%] h-[38%] rounded-2xl overflow-hidden border-4 border-white shadow-lg z-30"
                style={{ transform: "rotate(1.5deg)" }}>
                <img src={ladybugWreath} alt="Ladybug wreath" className="w-full h-full object-cover object-center" />
              </div>

              {/* Bottom center — orange wreath */}
              <div className="absolute bottom-0 left-[35%] w-[34%] h-[36%] rounded-2xl overflow-hidden border-4 border-white shadow-xl z-20"
                style={{ transform: "rotate(-2.5deg)" }}>
                <img src={orangeWreath} alt="Orange citrus wreath" className="w-full h-full object-cover object-center" />
              </div>

              {/* Bottom right — booth */}
              <div className="absolute bottom-[3%] right-0 w-[26%] h-[28%] rounded-xl overflow-hidden border-4 border-white shadow-md z-10"
                style={{ transform: "rotate(2deg)" }}>
                <img src={booth2} alt="Booth" className="w-full h-full object-cover" />
              </div>

              {/* Decorative blobs behind collage */}
              <div className="absolute inset-0 -z-10 rounded-3xl bg-primary/5 blur-xl scale-90"></div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
