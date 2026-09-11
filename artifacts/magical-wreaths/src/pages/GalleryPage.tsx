import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { collections, bows, boothPhotos } from "@/data/site";
import { Footer } from "@/components/sections/Footer";

const DOT_PATTERN = `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='10' cy='10' r='1.2' fill='%23c9a8a8' fill-opacity='0.18'/%3E%3C/svg%3E")`;

function SectionHeader({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="text-center mb-12">
      <span className="text-primary font-medium tracking-wider uppercase text-sm mb-2 block">{eyebrow}</span>
      <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-3">{title}</h2>
      {sub && <p className="text-muted-foreground text-base max-w-2xl mx-auto">{sub}</p>}
    </div>
  );
}

export default function GalleryPage() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/90 backdrop-blur border-b border-border/50">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-serif text-xl text-foreground hover:text-primary transition-colors">
            Debbie's Magical Wreaths
          </Link>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full"
            onClick={() => navigate("/")}
          >
            ← Back to Home
          </Button>
        </div>
      </header>

      <main>
        {/* Wreath Collections */}
        <section className="py-16 md:py-24 px-4 sm:px-6" style={{ backgroundImage: DOT_PATTERN, backgroundColor: "#fefcf9" }}>
          <div className="container max-w-7xl mx-auto">
            <SectionHeader
              eyebrow="Wreath Collections"
              title="A Wreath for Every Season"
              sub="Every piece made by Debbie's own hands — real wreaths, each one a little different, each one made with love."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
              {collections.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  className="group"
                >
                  <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 shadow-md bg-white border border-primary/8">
                    <img
                      src={item.image}
                      alt={item.title}
                      className={`w-full h-full ${
                        item.cover ? "object-cover object-center" : "object-contain p-4"
                      }`}
                    />
                  </div>
                  <h3 className="text-base font-serif text-foreground mb-1">{item.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Bows */}
        <section className="py-16 md:py-24 px-4 sm:px-6 bg-white">
          <div className="container max-w-6xl mx-auto">
            <SectionHeader
              eyebrow="The Bow Collection"
              title="Wired, Layered, Built to Last"
              sub="Bows for mailboxes, lanterns, chairs, pew ends, gifts, and more."
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {bows.map((bow, index) => (
                <motion.div
                  key={bow.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.12 }}
                  className="group"
                >
                  <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 shadow-lg bg-white">
                    <img
                      src={bow.image}
                      alt={bow.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-lg font-serif text-foreground mb-1">{bow.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{bow.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* At the Market */}
        <section className="py-16 md:py-24 px-4 sm:px-6 bg-muted/20">
          <div className="container max-w-6xl mx-auto">
            <SectionHeader
              eyebrow="At the Market"
              title="Find Debbie's Booth"
              sub="Local markets and craft fairs across Eastern North Carolina."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {boothPhotos.map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.97 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="rounded-2xl overflow-hidden shadow-lg aspect-[4/3]"
                >
                  <img
                    src={img}
                    alt={`Debbie's Magical Wreaths market booth`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-6 text-center bg-white">
          <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-3">Seen something you love?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Every piece can be made custom for you — your colors, your theme, your size.
          </p>
          <a
            href="/#order"
            className="inline-flex items-center justify-center rounded-full bg-primary hover:bg-primary/90 text-white px-8 h-12 text-sm font-medium shadow-lg shadow-primary/20 transition-transform hover:-translate-y-1"
          >
            Design Your Custom Wreath
          </a>
        </section>
      </main>

      <Footer />
    </div>
  );
}
