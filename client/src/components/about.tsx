import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 px-6 md:px-12 border-t border-border/40">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground sticky top-32">
            01 — About
          </h2>
        </div>
        
        <div className="md:col-span-8 space-y-8">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-display font-medium leading-tight"
          >
            I craft digital experiences that blend <span className="text-muted-foreground">technical precision</span> with <span className="text-muted-foreground">visual storytelling</span>.
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-muted-foreground leading-relaxed">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              With over 5 years of experience in frontend development and UI design, I help companies build scalable design systems and intuitive user interfaces. I believe that good design is invisible—it just works.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              My stack includes React, TypeScript, Tailwind CSS, and WebGL. I'm obsessed with performance, accessibility, and smooth micro-interactions that delight users without getting in their way.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-border/40"
          >
            <div>
              <h4 className="text-foreground font-medium mb-2">Design</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>UI/UX</li>
                <li>Prototyping</li>
                <li>Design Systems</li>
                <li>Motion Design</li>
              </ul>
            </div>
            <div>
              <h4 className="text-foreground font-medium mb-2">Engineering</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>React / Next.js</li>
                <li>TypeScript</li>
                <li>WebGL / Three.js</li>
                <li>Node.js</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
