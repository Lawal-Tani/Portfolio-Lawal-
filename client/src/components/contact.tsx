import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32 px-6 md:px-12 border-t border-border/40 bg-card">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="max-w-2xl">
          <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">
            03 — Contact
          </h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-8"
          >
            Let's work<br />together.
          </motion.h3>
          <p className="text-xl text-muted-foreground mb-8 max-w-lg">
            I'm currently available for freelance projects and open to full-time opportunities. If you have a project in mind, get in touch.
          </p>
          <Button size="lg" className="rounded-none text-lg px-8 py-6 bg-foreground text-background hover:bg-muted-foreground transition-colors">
            hello@tanitoluwa.design
          </Button>
        </div>

        <div className="space-y-8 md:text-right self-end md:self-start mt-8 md:mt-24">
          <div>
            <h4 className="font-bold text-foreground mb-2">Socials</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Twitter / X</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">GitHub</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Instagram</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-foreground mb-2">Location</h4>
            <p className="text-muted-foreground">Lagos, Nigeria<br/>Remote Friendly</p>
          </div>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto mt-24 pt-8 border-t border-border/20 flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground">
        <p>&copy; 2026 Lawal Tanitoluwa. All rights reserved.</p>
        <p>Built with React & Tailwind.</p>
      </div>
    </section>
  );
}
