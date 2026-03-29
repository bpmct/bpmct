"use client";

import Image from "next/image";
import { useState } from "react";

interface Project {
  name: string;
  description: string;
  images: string[];
  link?: string;
}

export default function ProjectCard({ project }: { project: Project }) {
  const [index, setIndex] = useState(0);
  const total = project.images.length;

  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  const Wrapper = project.link
    ? ({ children }: { children: React.ReactNode }) => (
        <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-card-link">
          {children}
        </a>
      )
    : ({ children }: { children: React.ReactNode }) => <>{children}</>;

  return (
    <Wrapper>
    <div className="project-card">
      {total > 0 && <div className="project-carousel">
        {project.images.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={`${project.name} photo ${i + 1}`}
            width={300}
            height={300}
            priority={true}
            className={`project-img carousel-slide${i === index ? " active" : ""}`}
          />
        ))}
        {total > 1 && (
          <>
            <button className="carousel-btn carousel-prev" onClick={(e) => { e.preventDefault(); prev(); }}>
              ‹
            </button>
            <button className="carousel-btn carousel-next" onClick={(e) => { e.preventDefault(); next(); }}>
              ›
            </button>
            <div className="carousel-dots">
              {project.images.map((_, i) => (
                <span
                  key={i}
                  className={`carousel-dot${i === index ? " active" : ""}`}
                  onClick={(e) => { e.preventDefault(); setIndex(i); }}
                />
              ))}
            </div>
          </>
        )}
      </div>}
      <h3>{project.name}</h3>
      <p>{project.description}</p>
    </div>
    </Wrapper>
  );
}
