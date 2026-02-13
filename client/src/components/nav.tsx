import { Link } from "wouter";
import { motion } from "framer-motion";

export default function Nav() {
  const links = [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 md:px-12 backdrop-blur-md bg-background/80 border-b border-border/40"
    >
      <Link href="/">
        <a className="text-xl font-display font-bold tracking-tighter hover:opacity-70 transition-opacity">
          LT.
        </a>
      </Link>

      <div className="flex gap-8">
        {links.map((link) => (
          <a 
            key={link.name} 
            href={link.href}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {link.name}
          </a>
        ))}
      </div>
    </motion.nav>
  );
}
