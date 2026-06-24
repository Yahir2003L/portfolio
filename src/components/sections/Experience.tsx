"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const experiences = [
  {
    id: "01",
    role: "Desarrollador Full Stack",
    company: "Universidad Autónoma de la Laguna",
    period: "Enero 2025 — Junio 2025",
    location: "Torreón, Coahuila",
    description:
      "Desarrollo de un sistema interno para la gestión de reportes de la universidad. Implementación con tecnologías web modernas incluyendo Astro, Node.js, TypeScript, Tailwind y Supabase.",
    tags: ["Astro", "Node.js", "TypeScript", "Supabase", "Tailwind"],
  },
  {
    id: "02",
    role: "Soporte Técnico & Sistemas",
    company: "Universidad Autónoma de la Laguna",
    period: "Enero 2024 — Mayo 2024",
    location: "Torreón, Coahuila",
    description:
      "Mantenimiento y soporte técnico a equipos de cómputo y red. Atención y resolución de reportes de incidencias tecnológicas. Diagnóstico y reparación de fallas de hardware y software.",
    tags: ["Hardware", "Redes", "Soporte TI"],
  },
];

function ExperienceItem({ exp, index }: { exp: typeof experiences[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="group relative grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 py-10 border-t border-black/10 last:border-b hover:border-black/30 transition-colors"
    >
      {/* Left */}
      <div>
        <span className="font-mono text-xs text-black/30 tracking-widest">{exp.id}</span>
        <p className="font-mono text-xs text-black/40 mt-2">{exp.period}</p>
        <p className="font-mono text-xs text-black/30 mt-1">{exp.location}</p>
      </div>

      {/* Right */}
      <div>
        <h3 className="text-xl font-bold mb-1">{exp.role}</h3>
        <p className="text-black/50 text-sm font-mono mb-4">{exp.company}</p>
        <p className="text-black/60 leading-relaxed text-sm mb-6">{exp.description}</p>
        <div className="flex flex-wrap gap-2">
          {exp.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 border border-black/15 text-xs font-mono text-black/50 group-hover:border-black/30 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section
      id="experiencia"
      className="flex flex-col justify-center px-6 md:px-16 lg:px-24 py-16"
    >
      {/* Header */}
      <div ref={headerRef} className="flex items-center gap-6 mb-16">
        <motion.span
          initial={{ opacity: 0 }}
          animate={isHeaderInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="font-mono text-xs text-black/30 tracking-widest"
        >
          03 / EXPERIENCIA
        </motion.span>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isHeaderInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: "left" }}
          className="h-px bg-black/20 flex-1"
        />
      </div>

      {/* Items */}
      <div className="max-w-4xl">
        {experiences.map((exp, i) => (
          <ExperienceItem key={exp.id} exp={exp} index={i} />
        ))}
      </div>
    </section>
  );
}