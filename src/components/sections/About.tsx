"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const skills = {
  "Front-End": ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Astro", "Tailwind"],
  "Back-End": ["Node.js", "TypeScript", "Supabase"],
  "Bases de datos": ["MySQL", "MariaDB", "Supabase"],
  "Herramientas": ["Git", "GitHub", "VS Code", "Linux"],
  "Hardware": ["Ensamble", "Diagnóstico", "Reparación"],
};

function SkillCategory({ category, items, index }: { category: string; items: string[]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="mb-6"
    >
      <p className="font-mono text-xs text-black/40 tracking-widest uppercase mb-3">
        {category}
      </p>
      <div className="flex flex-wrap gap-2">
        {items.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1 border border-black/20 text-sm text-black/70 hover:border-black hover:text-black transition-colors cursor-default"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function About() {
  const headerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" });
  const isTextInView = useInView(textRef, { once: true, margin: "-80px" });

  return (
    <section
      id="sobre-mi"
      className="min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 py-24"
    >
      {/* Header */}
      <div ref={headerRef} className="flex items-center gap-6 mb-16">
        <motion.span
          initial={{ opacity: 0 }}
          animate={isHeaderInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="font-mono text-xs text-black/30 tracking-widest"
        >
          02 / SOBRE MÍ
        </motion.span>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isHeaderInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: "left" }}
          className="h-px bg-black/20 flex-1"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-5xl">
        {/* Texto */}
        <motion.div
          ref={textRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isTextInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Construyo cosas<br />para la web.
          </h2>
          <p className="text-black/60 leading-relaxed mb-4">
            Soy Yahir López, Ingeniero en Sistemas Computacionales de Torreón, Coahuila.
            Me especializo en desarrollo Full Stack con enfoque en Front-End — construyo
            interfaces rápidas, accesibles y bien hechas.
          </p>
          <p className="text-black/60 leading-relaxed mb-4">
            Además del software, tengo experiencia en soporte técnico, ensamble y
            reparación de equipos a través de mi marca <span className="text-black font-medium">BootByte</span>.
          </p>
          <p className="text-black/60 leading-relaxed">
            Actualmente explorando el mundo de la ciberseguridad, con miras a
            certificaciones eJPT y OSCP.
          </p>
        </motion.div>

        {/* Skills */}
        <div>
          {Object.entries(skills).map(([category, items], i) => (
            <SkillCategory key={category} category={category} items={items} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}