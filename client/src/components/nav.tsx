import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Github, Linkedin, Mail, Menu, X, FileText } from "lucide-react";

export default function Nav() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Work", href: "/#work" },
    { label: "Engineering", href: "/engineering" },
    { label: "Approach", href: "/#approach" },
    { label: "Experience", href: "/#experience" },
    { label: "About", href: "/#about" },
    { label: "Resume", href: "/#resume" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 border-b ${
        scrolled
          ? "bg-background/90 backdrop-blur-md border-border/70 py-4 shadow-sm"
          : "bg-background/60 backdrop-blur-sm border-border/30 py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo & Identity */}
        <Link href="/" className="group flex items-center gap-3">
          <span className="text-xl font-display font-bold tracking-tighter text-foreground group-hover:opacity-80 transition-opacity">
            LT<span className="text-muted-foreground font-mono">.</span>
          </span>
          <span className="hidden sm:inline-block text-xs font-mono tracking-widest text-muted-foreground border-l border-border/60 pl-3">
            SWE · ROBOTICS · SYSTEMS
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => {
            const isInternal = link.href.startsWith("/engineering");
            if (isInternal) {
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-xs uppercase tracking-widest transition-colors font-medium ${
                    location.startsWith("/engineering")
                      ? "text-foreground font-bold underline underline-offset-8"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              );
            }

            return (
              <a
                key={link.label}
                href={link.href}
                className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Action Icons */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://github.com/Lawal-Tani"
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors p-1.5 border border-border/60 hover:border-foreground"
            aria-label="GitHub Profile"
            title="GitHub: Lawal-Tani"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/tanitoluwa-lawal"
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors p-1.5 border border-border/60 hover:border-foreground"
            aria-label="LinkedIn Profile"
            title="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href="mailto:tanilawal44@gmail.com"
            className="text-muted-foreground hover:text-foreground transition-colors p-1.5 border border-border/60 hover:border-foreground"
            aria-label="Email Tanitoluwa Lawal"
            title="Email: tanilawal44@gmail.com"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-foreground border border-border/60 hover:bg-card"
          aria-label={mobileOpen ? "Close Menu" : "Open Menu"}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileOpen && (
        <div className="md:hidden border-b border-border/60 bg-background/98 px-6 py-6 transition-all">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => {
              const isEngineering = link.href.startsWith("/engineering");
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`text-sm uppercase tracking-widest font-medium py-2 border-b border-border/20 ${
                    isEngineering && location.startsWith("/engineering")
                      ? "text-foreground font-bold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>
          <div className="flex items-center gap-4 mt-6 pt-4 border-t border-border/40">
            <a
              href="https://github.com/Lawal-Tani"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground border border-border/60 px-3 py-2"
            >
              <Github className="w-3.5 h-3.5" /> GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/tanitoluwa-lawal"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground border border-border/60 px-3 py-2"
            >
              <Linkedin className="w-3.5 h-3.5" /> LinkedIn
            </a>
            <a
              href="mailto:tanilawal44@gmail.com"
              className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground border border-border/60 px-3 py-2"
            >
              <Mail className="w-3.5 h-3.5" /> Email
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
