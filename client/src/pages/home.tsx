import Nav from "@/components/nav";
import Hero from "@/components/hero";
import Results from "@/components/results";
import About from "@/components/about";
import Projects from "@/components/projects";
import FeaturedRepos from "@/components/featured-repos";
import Contact from "@/components/contact";
import FloatingCta from "@/components/floating-cta";
import MobileNav from "@/components/mobile-nav";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-white selection:text-black">
      <Nav />
      <FloatingCta />
      <MobileNav />
      <main id="top">
        <Hero />
        <Results />
        <About />
        <Projects />
        <FeaturedRepos />
        <Contact />
      </main>
    </div>
  );
}
