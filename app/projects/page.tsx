import type { Metadata } from "next";
import Header from "@/components/Header";
import ProjectCard from "@/components/ProjectCard";

export const metadata: Metadata = { title: "Ben Potter | Projects" };

const projects = [
  {
    name: "Home Lab",
    description:
      "Self-hosted services running on a mini PC cluster — Plex, Home Assistant, and more.",
    images: [],
  },
  {
    name: "TRMNL for Nook Simple Touch",
    description:
      "Convert a $20 used tablet to use TRMNL, an open ecosystem for e-ink displays.",
    link: "https://github.com/usetrmnl/trmnl-nook-simple-touch",
    images: ["/images/projects/nook-1.jpg", "/images/projects/nook-2.jpg", "/images/projects/nook-3.jpg"],
  },
];

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <hr />
      <main>
        <h2>Projects</h2>
        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </main>
    </>
  );
}
