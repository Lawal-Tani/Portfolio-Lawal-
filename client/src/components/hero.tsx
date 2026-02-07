import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 overflow-hidden pt-20">
      {/* Abstract Background Element */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] opacity-20 -z-10 pointer-events-none mix-blend-screen">
         <img 
            src="/images/hero-abstract.png" 
            alt="Abstract" 
            className="w-full h-full object-cover grayscale contrast-125"
         />
         <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
         <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent" />
      </div>

      <div className="max-w-5xl z-10">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-muted-foreground font-medium mb-6 tracking-widest uppercase text-sm"
        >
          Portfolio 2026
        </motion.p>
        
        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-8xl font-display font-bold tracking-tighter leading-[0.9] mb-8 text-foreground"
        >
          LAWAL<br/>TANITOLUWA
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-xl"
        >
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
            Design Engineer specialized in building <span className="text-foreground font-medium">digital products</span> with a focus on typography, interaction, and system architecture.
          </p>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-12 left-6 md:left-12 flex items-center gap-4"
      >
        <div className="h-[1px] w-12 bg-border" />
        <span className="text-xs uppercase tracking-widest text-muted-foreground">Scroll to explore</span>
      </motion.div>
    </section>
  );
}
