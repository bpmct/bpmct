import type { Metadata } from "next";
import Header from "@/components/Header";
import ProjectCard from "@/components/ProjectCard";

export const metadata: Metadata = { title: "Ben Potter | Projects" };

const projects = [
  {
    name: "Coder",
    description:
      "Self-hosted development environments. I'm a PM there, been at it for 5 years.",
    link: "https://coder.com",
    images: ["/images/projects/coder.jpg"],
  },
  {
    name: "Nook Simple Touch w/ TRMNL",
    description:
      "Convert a $20 used tablet to use TRMNL, an open ecosystem for e-ink displays.",
    link: "https://github.com/usetrmnl/trmnl-nook-simple-touch",
    images: ["/images/projects/nook-1.jpg", "/images/projects/nook-2.jpg", "/images/projects/nook-3.jpg"],
  },
  {
    name: "Tio (coming soon)",
    description:
      "Tiny thermal printer for trivia, date night suggestions, or sending notes to friends.",
    images: ["/images/projects/tio-1.jpg"],
  },
];

export default function ProjectsPage() {
  return (
    <div className="projects-page">
      <Header />
      <hr />
      <main className="projects-main">
        <h2>Projects</h2>
        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </main>
    </div>
  );
}
