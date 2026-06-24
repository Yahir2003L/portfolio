"use client";

import { useEffect, useRef } from "react";
import { motion, Variants } from "framer-motion";
import gsap from "gsap";

const roles = ["Full Stack Developer", "Front-End Engineer", "Systems Engineer"];

export default function Hero() {
  const lineRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLSpanElement>(null);
  let currentRole = 0;

  useEffect(() => {
    // Línea animada con GSAP
    gsap.fromTo(
      lineRef.current,
      { scaleX: 0, transformOrigin: "left" },
      { scaleX: 1, duration: 1.2, ease: "power4.out", delay: 1.4 }
    );

    // Ciclo de roles
    const interval = setInterval(() => {
      if (!roleRef.current) return;
      gsap.to(roleRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.3,
        onComplete: () => {
          currentRole = (currentRole + 1) % roles.length;
          if (roleRef.current) {
            roleRef.current.textContent = roles[currentRole];
            gsap.to(roleRef.current, { opacity: 1, y: 0, duration: 0.3 });
          }
        },
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12, delayChildren: 0.3 },
    },
  };

  const wordVariants: Variants = {
    hidden: { y: 80, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const name = "Yahir López";

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24">
      <div className="max-w-5xl">
        {/* Saludo */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-mono text-sm tracking-[0.3em] text-black/50 mb-6 uppercase"
        >
          Hola, soy
        </motion.p>

        {/* Nombre con stagger por palabra */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-[clamp(3rem,10vw,9rem)] font-bold leading-none tracking-tight overflow-hidden"
        >
          {name.split(" ").map((word, i) => (
            <span key={i} className="inline-block overflow-hidden mr-[0.2em]">
              <motion.span className="inline-block" variants={wordVariants}>
                {word}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        {/* Línea separadora */}
        <div
          ref={lineRef}
          className="h-px bg-black my-6 scale-x-0"
          style={{ transformOrigin: "left" }}
        />

        {/* Role rotante */}
        <div className="flex items-center gap-3 overflow-hidden">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.5 }}
            ref={roleRef}
            className="text-[clamp(1rem,3vw,1.75rem)] font-light tracking-wide"
          >
            {roles[0]}
          </motion.span>
        </div>

        {/* Descripción */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="mt-8 max-w-xl text-black/60 text-base leading-relaxed"
        >
          Ingeniero en Sistemas especializado en Full Stack y Front-End.
          Construyo sistemas web modernos, rápidos y bien hechos.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.6 }}
          className="mt-10 flex gap-4 flex-wrap"
        >
          
          <a
            href="#proyectos"
            className="px-6 py-3 bg-black text-white text-sm font-mono tracking-wider hover:bg-black/80 transition-colors"
          >
            Ver proyectos →
          </a>
          
          <a
            href="#contacto"
            className="px-6 py-3 border border-black text-sm font-mono tracking-wider hover:bg-black hover:text-white transition-colors"
          >
            Contacto
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-xs text-black/30 tracking-widest">SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-px h-8 bg-black/20"
        />
      </motion.div>
    </section>
  );
}