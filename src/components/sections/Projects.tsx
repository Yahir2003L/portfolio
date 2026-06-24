"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const projects = [
  {
    id: "01",
    name: "SchoolFix",
    year: "2025",
    category: "SaaS · Full Stack",
    description:
      "Sistema de gestión de reportes para instituciones educativas. Multi-rol, tiempo real, chat por hilo y notificaciones.",
    tags: ["Astro", "Supabase", "TypeScript", "Tailwind", "Node.js"],
    images: [
      "/projects/schoolfix-1.png",
      "/projects/schoolfix-2.png",
      "/projects/schoolfix-3.png",
    ],
    url: "#",
  },
  {
    id: "02",
    name: "BootByte",
    year: "2024",
    category: "Marca · Servicios TI",
    description:
      "Marca de servicios tecnológicos — ensamble, reparación y soporte técnico de equipos de cómputo en Torreón.",
    tags: ["Hardware", "Soporte TI", "Consultoría"],
    images: [],
    url: "https://www.instagram.com/oficial.bootbyte",
  },
  {
    id: "03",
    name: "Portfolio",
    year: "2025",
    category: "Frontend · Animación",
    description:
      "Este mismo portafolio. Construido con Next.js 15, Framer Motion, GSAP y React Three Fiber.",
    tags: ["Next.js", "Framer Motion", "GSAP", "Tailwind"],
    images: [],
    url: "#",
  },
];

interface LightboxState {
  images: string[];
  index: number;
  name: string;
}

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // En móvil toggle, en desktop hover
  const handleToggle = (id: string) => {
    if (isMobile) {
      setActiveProject(activeProject === id ? null : id);
    }
  };

  const openLightbox = (images: string[], index: number, name: string) => {
    setLightbox({ images, index, name });
  };

  const closeLightbox = () => setLightbox(null);

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!lightbox) return;
    setLightbox({
      ...lightbox,
      index: (lightbox.index - 1 + lightbox.images.length) % lightbox.images.length,
    });
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!lightbox) return;
    setLightbox({
      ...lightbox,
      index: (lightbox.index + 1) % lightbox.images.length,
    });
  };

  // Swipe para lightbox en móvil
  const touchStartX = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!lightbox) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        setLightbox({ ...lightbox, index: (lightbox.index + 1) % lightbox.images.length });
      } else {
        setLightbox({ ...lightbox, index: (lightbox.index - 1 + lightbox.images.length) % lightbox.images.length });
      }
    }
  };

  return (
    <>
      <section
        id="proyectos"
        ref={ref}
        className="flex flex-col justify-center px-4 md:px-16 lg:px-24 py-16"
      >
        {/* Header */}
        <div className="flex items-center gap-4 mb-10 md:mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-mono text-xs text-black/30 tracking-widest whitespace-nowrap"
          >
            04 / PROYECTOS
          </motion.span>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "left" }}
            className="h-px bg-black/20 flex-1"
          />
        </div>

        {/* Lista */}
        <div>
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              onMouseEnter={() => !isMobile && setActiveProject(project.id)}
              onMouseLeave={() => !isMobile && setActiveProject(null)}
              onClick={() => handleToggle(project.id)}
              className="group border-t border-black/10 last:border-b cursor-pointer"
            >
              {/* Fila principal */}
              <div className="flex items-center justify-between gap-2 py-5 md:py-6" onClick={(e) => {
                if (project.url && !project.url.startsWith("#")) {
                    e.stopPropagation();
                    window.open(project.url, "_blank");
                }
              }}
              >
                <div className="flex items-center gap-3 md:gap-6 flex-1 min-w-0">
                  <span className="font-mono text-xs text-black/25 shrink-0">
                    {project.id}
                  </span>
                  <div className="flex flex-col min-w-0">
                    <h3 className="text-xl md:text-3xl font-bold tracking-tight truncate group-hover:translate-x-1 md:group-hover:translate-x-2 transition-transform duration-300">
                      {project.name}
                    </h3>
                    <span className="font-mono text-[10px] md:text-xs text-black/40 tracking-wider mt-0.5">
                      {project.category}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-mono text-xs text-black/30 hidden sm:block">
                    {project.year}
                  </span>
                  {/* En móvil muestra + / - , en desktop ↗ */}
                  <motion.span
                    animate={
                      activeProject === project.id
                        ? { opacity: 1, rotate: isMobile ? 45 : 0 }
                        : { opacity: isMobile ? 0.3 : 0 }
                    }
                    transition={{ duration: 0.2 }}
                    className="text-base md:text-lg font-light"
                  >
                    {isMobile ? "+" : "↗"}
                  </motion.span>
                </div>
              </div>

              {/* Expand */}
              <AnimatePresence>
                {activeProject === project.id && (
                  <motion.div
                    key="expand"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-6 pl-6 md:pl-12 flex flex-col gap-4 md:gap-6">

                      {/* Descripción — solo móvil */}
                      <p className="text-black/50 text-sm leading-relaxed md:hidden">
                        {project.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 border border-black/15 text-[10px] md:text-xs font-mono text-black/40"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Imágenes */}
                      {project.images.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-3">
                          {project.images.map((src, idx) => (
                            <motion.div
                              key={src}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.35, delay: idx * 0.07 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                openLightbox(project.images, idx, project.name);
                              }}
                              className="relative overflow-hidden border border-black/10 cursor-zoom-in"
                              style={{ aspectRatio: "16/9" }}
                            >
                              <Image
                                src={src}
                                alt={`${project.name} screenshot ${idx + 1}`}
                                fill
                                className="object-cover object-top hover:scale-105 transition-transform duration-500"
                              />
                              {/* Número de imagen en móvil */}
                              <div className="absolute bottom-2 right-2 bg-black/50 text-white font-mono text-[10px] px-1.5 py-0.5 md:hidden">
                                {idx + 1}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeLightbox}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 md:p-12"
          >
            {/* Imagen */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl"
              style={{ aspectRatio: "16/9" }}
            >
              <Image
                src={lightbox.images[lightbox.index]}
                alt={`${lightbox.name} ${lightbox.index + 1}`}
                fill
                className="object-contain"
              />
            </motion.div>

            {/* Flechas desktop */}
            {lightbox.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 w-10 h-10 border border-white/20 text-white/60 hover:text-white hover:border-white/60 transition-colors font-mono text-sm items-center justify-center"
                >
                  ←
                </button>
                <button
                  onClick={nextImage}
                  className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 w-10 h-10 border border-white/20 text-white/60 hover:text-white hover:border-white/60 transition-colors font-mono text-sm items-center justify-center"
                >
                  →
                </button>
              </>
            )}

            {/* Top bar */}
            <div className="absolute top-4 md:top-6 inset-x-4 flex items-center justify-between">
              <span className="font-mono text-xs text-white/40 tracking-widest">
                {lightbox.name} · {lightbox.index + 1} / {lightbox.images.length}
              </span>
              <button
                onClick={closeLightbox}
                className="font-mono text-xs text-white/40 hover:text-white transition-colors tracking-widest"
              >
                [ ESC ]
              </button>
            </div>

            {/* Dots móvil */}
            {lightbox.images.length > 1 && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 md:hidden">
                {lightbox.images.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${
                      idx === lightbox.index ? "bg-white" : "bg-white/30"
                    }`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}