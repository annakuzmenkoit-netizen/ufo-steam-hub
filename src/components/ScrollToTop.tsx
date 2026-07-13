import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="scroll-top"
          type="button"
          aria-label="Наверх"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="md:hidden fixed bottom-5 right-4 z-40 h-11 w-11 rounded-full bg-ufo-yellow text-primary shadow-lg border border-primary/10 flex items-center justify-center active:scale-95 transition-transform"
        >
          <ArrowUp className="h-5 w-5" strokeWidth={2.25} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
