import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!dismissed) setVisible(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, [dismissed]);

  const handleOpen = () => {
    setDialogOpen(true);
  };

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setVisible(false);
    setDismissed(true);
  };

  const handleOrder = () => {
    setDialogOpen(false);
    setVisible(false);
    setDismissed(true);
    setTimeout(() => {
      document.getElementById("order")?.scrollIntoView({ behavior: "smooth" });
    }, 150);
  };

  return (
    <>
      {/* Floating wreath button */}
      <AnimatePresence>
        {visible && !dialogOpen && (
          <motion.div
            className="fixed bottom-6 right-5 z-50 flex flex-col items-end gap-2"
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 120, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            {/* Label bubble */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white text-foreground text-xs font-semibold rounded-full px-3 py-1.5 shadow-lg border border-primary/20 whitespace-nowrap"
            >
              ✨ Design your custom wreath
            </motion.div>

            <div className="relative">
              {/* Dismiss button */}
              <button
                onClick={handleDismiss}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-foreground text-white flex items-center justify-center z-10 shadow-md hover:bg-primary transition-colors"
                aria-label="Dismiss"
              >
                <X className="w-3 h-3" />
              </button>

              {/* Main wreath button */}
              <motion.button
                onClick={handleOpen}
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
                className="w-16 h-16 rounded-full bg-white shadow-xl border-2 border-primary/30 flex items-center justify-center hover:scale-110 transition-transform active:scale-95 cursor-pointer"
                aria-label="Design your custom wreath"
              >
                <svg viewBox="0 0 64 64" className="w-12 h-12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Wreath ring */}
                  <circle cx="32" cy="32" r="20" stroke="#c97a7a" strokeWidth="6" fill="none" />
                  {/* Leaves */}
                  <ellipse cx="32" cy="12" rx="4" ry="7" fill="#6aaa64" transform="rotate(0 32 12)" opacity="0.85"/>
                  <ellipse cx="44" cy="16" rx="4" ry="7" fill="#6aaa64" transform="rotate(45 44 16)" opacity="0.85"/>
                  <ellipse cx="52" cy="32" rx="4" ry="7" fill="#6aaa64" transform="rotate(90 52 32)" opacity="0.85"/>
                  <ellipse cx="44" cy="48" rx="4" ry="7" fill="#6aaa64" transform="rotate(135 44 48)" opacity="0.85"/>
                  <ellipse cx="32" cy="52" rx="4" ry="7" fill="#6aaa64" transform="rotate(180 32 52)" opacity="0.85"/>
                  <ellipse cx="20" cy="48" rx="4" ry="7" fill="#6aaa64" transform="rotate(225 20 48)" opacity="0.85"/>
                  <ellipse cx="12" cy="32" rx="4" ry="7" fill="#6aaa64" transform="rotate(270 12 32)" opacity="0.85"/>
                  <ellipse cx="20" cy="16" rx="4" ry="7" fill="#6aaa64" transform="rotate(315 20 16)" opacity="0.85"/>
                  {/* Bow at top */}
                  <path d="M26 9 C24 5 20 5 20 8 C20 11 25 12 32 9 C39 12 44 11 44 8 C44 5 40 5 38 9" stroke="#c97a7a" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                  <circle cx="32" cy="9" r="2.5" fill="#c97a7a"/>
                  {/* Small flowers */}
                  <circle cx="32" cy="12" r="2" fill="#e8a87c"/>
                  <circle cx="52" cy="32" r="2" fill="#e8a87c"/>
                  <circle cx="12" cy="32" r="2" fill="#e8a87c"/>
                  <circle cx="32" cy="52" r="2" fill="#e8a87c"/>
                </svg>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom sheet / dialog CTA */}
      <AnimatePresence>
        {dialogOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDialogOpen(false)}
            />
            {/* Sheet — slides up from bottom on mobile, centered card on desktop */}
            <motion.div
              className="fixed z-50 bottom-0 left-0 right-0 md:inset-0 md:flex md:items-center md:justify-center md:p-6 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="pointer-events-auto w-full md:max-w-md bg-white rounded-t-3xl md:rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {/* Drag handle (mobile) */}
                <div className="flex justify-center pt-3 pb-0 md:hidden">
                  <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
                </div>

                <div className="p-5 pt-4 sm:p-7 sm:pt-5 md:p-8">
                  {/* Close */}
                  <button
                    onClick={() => setDialogOpen(false)}
                    className="absolute top-5 right-5 w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
                    aria-label="Close"
                  >
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>

                  {/* Wreath icon */}
                  <div className="flex justify-center mb-5">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                      <svg viewBox="0 0 64 64" className="w-14 h-14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="32" cy="32" r="20" stroke="#c97a7a" strokeWidth="6" fill="none" />
                        <ellipse cx="32" cy="12" rx="4" ry="7" fill="#6aaa64" opacity="0.85"/>
                        <ellipse cx="44" cy="16" rx="4" ry="7" fill="#6aaa64" transform="rotate(45 44 16)" opacity="0.85"/>
                        <ellipse cx="52" cy="32" rx="4" ry="7" fill="#6aaa64" transform="rotate(90 52 32)" opacity="0.85"/>
                        <ellipse cx="44" cy="48" rx="4" ry="7" fill="#6aaa64" transform="rotate(135 44 48)" opacity="0.85"/>
                        <ellipse cx="32" cy="52" rx="4" ry="7" fill="#6aaa64" transform="rotate(180 32 52)" opacity="0.85"/>
                        <ellipse cx="20" cy="48" rx="4" ry="7" fill="#6aaa64" transform="rotate(225 20 48)" opacity="0.85"/>
                        <ellipse cx="12" cy="32" rx="4" ry="7" fill="#6aaa64" transform="rotate(270 12 32)" opacity="0.85"/>
                        <ellipse cx="20" cy="16" rx="4" ry="7" fill="#6aaa64" transform="rotate(315 20 16)" opacity="0.85"/>
                        <path d="M26 9 C24 5 20 5 20 8 C20 11 25 12 32 9 C39 12 44 11 44 8 C44 5 40 5 38 9" stroke="#c97a7a" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                        <circle cx="32" cy="9" r="2.5" fill="#c97a7a"/>
                        <circle cx="32" cy="12" r="2" fill="#e8a87c"/>
                        <circle cx="52" cy="32" r="2" fill="#e8a87c"/>
                        <circle cx="12" cy="32" r="2" fill="#e8a87c"/>
                        <circle cx="32" cy="52" r="2" fill="#e8a87c"/>
                      </svg>
                    </div>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-serif text-foreground text-center mb-2">
                    Something Beautiful, Just for You
                  </h2>
                  <p className="text-muted-foreground text-center text-sm md:text-base leading-relaxed mb-6">
                    Every wreath Debbie makes is one of a kind: your colors, your style, your story. Takes about 5 minutes to order. She'll reach out within 24–48 hrs to make it perfect.
                  </p>

                  <div className="space-y-3">
                    <Button
                      onClick={handleOrder}
                      className="w-full h-12 rounded-full bg-primary hover:bg-primary/90 text-white font-semibold text-base shadow-lg shadow-primary/25"
                    >
                      ✦ Design My Custom Wreath
                    </Button>
                    <button
                      onClick={() => setDialogOpen(false)}
                      className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
                    >
                      Maybe later
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
