"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export default function Contact() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" });
  const contentRef = useRef<HTMLDivElement>(null);
  const isContentInView = useInView(contentRef, { once: true, margin: "-80px" });
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("lopezyahir884@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contacto"
      className="flex flex-col justify-center px-6 md:px-16 lg:px-24 py-24 min-h-screen"
    >
      {/* Header */}
      <div ref={headerRef} className="flex items-center gap-6 mb-20">
        <motion.span
          initial={{ opacity: 0 }}
          animate={isHeaderInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="font-mono text-xs text-black/30 tracking-widest"
        >
          05 / CONTACTO
        </motion.span>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isHeaderInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: "left" }}
          className="h-px bg-black/20 flex-1"
        />
      </div>

      <div ref={contentRef} className="max-w-4xl">
        {/* Título grande */}
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          animate={isContentInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-[clamp(2.5rem,8vw,7rem)] font-bold leading-none tracking-tight mb-12"
        >
          Hablemos.
        </motion.h2>

        {/* Descripción */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isContentInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="text-black/50 text-lg leading-relaxed max-w-lg mb-16"
        >
          ¿Tienes un proyecto en mente o quieres trabajar juntos?
          Escríbeme, respondo rápido.
        </motion.p>

        {/* Email grande clickeable */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isContentInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <p className="font-mono text-xs text-black/30 tracking-widest mb-4 uppercase">
            Email
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            
            <a
              href="mailto:lopezyahir884@gmail.com"
              className="text-xl md:text-2xl font-light tracking-tight border-b border-black/20 hover:border-black transition-colors pb-1"
            >
              lopezyahir884@gmail.com
            </a>
            <button
              onClick={handleCopyEmail}
              className="font-mono text-xs text-black/30 hover:text-black transition-colors tracking-widest"
            >
              {copied ? "✓ COPIADO" : "[ COPIAR ]"}
            </button>
          </div>
        </motion.div>

        {/* Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isContentInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-0 border-t border-black/10"
        >
          {[
            { label: "GitHub", url: "https://github.com/" },
            { label: "LinkedIn", url: "https://linkedin.com/in/" },
            { label: "WhatsApp", url: "https://wa.me/528715767962" },
          ].map((link, i) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between px-0 sm:px-8 py-5 border-b sm:border-b-0 sm:border-r border-black/10 first:sm:pl-0 last:sm:border-r-0 flex-1 hover:bg-black/[0.02] transition-colors"
            >
              <span className="font-mono text-sm tracking-wider text-black/50 group-hover:text-black transition-colors">
                {link.label}
              </span>
              <motion.span
                initial={{ x: 0, opacity: 0.3 }}
                whileHover={{ x: 4, opacity: 1 }}
                className="text-sm"
              >
                ↗
              </motion.span>
            </a>
          ))}
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isContentInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="mt-24 flex items-center justify-between flex-wrap gap-4"
      >
        <span className="font-mono text-xs text-black/20 tracking-widest">
          © 2025 YAHIR LÓPEZ DE SANTIAGO
        </span>
        <span className="font-mono text-xs text-black/20 tracking-widest">
          TORREÓN, COAHUILA · MX
        </span>
      </motion.div>
    </section>
  );
}