import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const projects = [
  {
    id: 1,
    title: "Lumina Dashboard",
    description: "A comprehensive analytics platform for financial data visualization.",
    tags: ["React", "D3.js", "Tailwind"],
    image: "/images/project-1.png",
    link: "#"
  },
  {
    id: 2,
    title: "Vogue Commerce",
    description: "Minimalist e-commerce storefront with headless architecture.",
    tags: ["Next.js", "Shopify API", "Framer Motion"],
    image: "/images/project-2.png",
    link: "#"
  },
  {
    id: 3,
    title: "Zenith App",
    description: "Productivity application focused on flow state and focus.",
    tags: ["Electron", "React", "Local-First"],
    image: "/images/project-3.png",
    link: "#"
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 md:py-32 px-6 md:px-12 border-t border-border/40">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="max-w-lg">
            <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">
              02 — Selected Work
            </h2>
            <h3 className="text-3xl md:text-4xl font-display font-medium">
              Digital products built with purpose.
            </h3>
          </div>
          <Button variant="outline" className="hidden md:flex gap-2 rounded-none border-foreground hover:bg-foreground hover:text-background transition-colors">
            View All Projects
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="group bg-transparent border-none shadow-none overflow-hidden rounded-none">
                <CardContent className="p-0 relative aspect-video overflow-hidden bg-secondary mb-6">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                </CardContent>
                <CardFooter className="p-0 flex flex-col items-start gap-3">
                  <div className="flex justify-between w-full items-start">
                    <div>
                      <h4 className="text-xl font-display font-bold group-hover:text-muted-foreground transition-colors">
                        {project.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {project.description}
                      </p>
                    </div>
                    <a 
                      href={project.link}
                      className="p-2 border border-border rounded-full hover:bg-foreground hover:text-background transition-colors"
                      data-testid={`btn-visit-${project.id}`}
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-xs uppercase tracking-wider text-muted-foreground border border-border px-2 py-1">
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <div className="md:hidden mt-12">
          <Button variant="outline" className="w-full gap-2 rounded-none border-foreground hover:bg-foreground hover:text-background transition-colors">
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
}
