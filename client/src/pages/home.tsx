import Nav from "@/components/nav";
import Hero from "@/components/hero";
import Capabilities from "@/components/capabilities";
import Projects from "@/components/projects";
import EngineeringApproach from "@/components/engineering-approach";
import EngineeringPreview from "@/components/engineering-preview";
import Experience from "@/components/experience";
import About from "@/components/about";
import FeaturedRepos from "@/components/featured-repos";
import Contact from "@/components/contact";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-white selection:text-black">
      <Nav />
      <main id="top">
        <Hero />
        <Capabilities />
        <Projects />
        <EngineeringApproach />
        <EngineeringPreview />
        <Experience />
        <About />
        <FeaturedRepos />
        <Contact />
      </main>
    </div>
  );
}
