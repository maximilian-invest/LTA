"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, Phone, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MAXW } from "./ui/MaxWidth";
import { scrollToId } from "@/lib/scroll";

type Link = { id?: string; href?: string; label: string };

const DEFAULT_LINKS: Link[] = [
  { href: "/", label: "Home" },
  { href: "/trainingsstaetten", label: "Trainingsstätten" },
  { href: "/galerie", label: "Galerie" },
  { href: "/faq", label: "FAQ" },
  { href: "/angebot", label: "Preise" },
  { href: "/news", label: "News" },
];

type Props = {
  active?: string;
  links?: Link[];
  homeHref?: string;
};

export function Nav({ active = "/", links = DEFAULT_LINKS, homeHref = "/" }: Props) {
  const [open, setOpen] = useState(false);

  const isActive = (l: Link) =>
    l.href ? l.href === active : l.id === active;

  const go = (l: Link) => {
    setOpen(false);
    if (l.href) window.location.href = l.href;
    else if (l.id) scrollToId(l.id);
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "rgba(11,15,10,0.90)",
        backdropFilter: "saturate(150%) blur(12px)",
        WebkitBackdropFilter: "saturate(150%) blur(12px)",
        borderBottom: "1px solid var(--color-hairline-on-dark)",
        height: 72,
      }}
    >
      <div
        style={{
          maxWidth: MAXW,
          margin: "0 auto",
          height: "100%",
          display: "flex",
          alignItems: "center",
          padding: "0 24px",
          gap: 32,
        }}
      >
        <Link
          href={homeHref}
          aria-label="LTA — Startseite"
          style={{ cursor: "pointer", display: "flex", flexShrink: 0 }}
        >
          <Image
            src="/assets/lta-logo.png"
            alt="Lindenbauer Tennis Academy"
            width={120}
            height={46}
            style={{ height: 46, width: "auto" }}
            priority
          />
        </Link>

        <nav
          aria-label="Sektionen"
          className="desk-nav"
          style={{ display: "flex", gap: 22, flex: 1, marginLeft: 8 }}
        >
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href ?? `#${l.id}`}
              onClick={(e) => {
                if (l.href) return;
                e.preventDefault();
                go(l);
              }}
              className="t-nav-link"
              style={{
                cursor: "pointer",
                color: isActive(l)
                  ? "var(--color-on-dark)"
                  : "var(--color-muted-strong)",
                borderBottom: isActive(l)
                  ? "2px solid var(--color-primary)"
                  : "2px solid transparent",
                paddingBottom: 4,
                transition: "color 150ms, border-color 150ms",
              }}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="tel:+436647500954"
          className="t-number-sm desk-phone"
          style={{
            color: "var(--color-muted-strong)",
            display: "flex",
            alignItems: "center",
            gap: 7,
            whiteSpace: "nowrap",
          }}
        >
          <Phone size={14} color="var(--color-primary)" />
          +43 664 7500 9549
        </a>

        <motion.button
          onClick={() => scrollToId("kontakt")}
          className="cta-btn"
          whileHover={{ backgroundColor: "var(--color-primary-active)" }}
          whileTap={{ scale: 0.98 }}
          style={{
            background: "var(--color-primary)",
            color: "var(--color-on-primary)",
            border: "none",
            height: 42,
            padding: "0 20px",
            borderRadius: "var(--radius-pill)",
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: 13,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            flexShrink: 0,
          }}
        >
          Probetraining
          <ArrowUpRight size={16} />
        </motion.button>

        <button
          aria-label="Menü öffnen"
          onClick={() => setOpen((o) => !o)}
          className="burger"
          style={{
            display: "none",
            background: "transparent",
            border: "1px solid var(--color-hairline-on-dark)",
            color: "var(--color-on-dark)",
            width: 42,
            height: 42,
            borderRadius: "var(--radius-md)",
            cursor: "pointer",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.2, 0, 0, 1] }}
            style={{
              borderTop: "1px solid var(--color-hairline-on-dark)",
              background: "var(--color-canvas-dark)",
              padding: "12px 24px 20px",
              overflow: "hidden",
            }}
          >
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href ?? `#${l.id}`}
                onClick={(e) => {
                  if (l.href) return;
                  e.preventDefault();
                  go(l);
                }}
                className="t-nav-link"
                style={{
                  display: "block",
                  padding: "14px 0",
                  color: isActive(l)
                    ? "var(--color-primary)"
                    : "var(--color-on-dark)",
                  borderBottom: "1px solid var(--color-hairline-on-dark)",
                }}
              >
                {l.label}
              </a>
            ))}
            <a
              href="tel:+436647500954"
              className="t-number-sm"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginTop: 16,
                color: "var(--color-on-dark)",
              }}
            >
              <Phone size={14} color="var(--color-primary)" /> +43 664 7500 9549
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        @media (max-width: 1180px) {
          :global(.desk-phone) { display: none !important; }
        }
        @media (max-width: 900px) {
          :global(.desk-nav), :global(.desk-phone) { display: none !important; }
          :global(.burger) { display: inline-flex !important; }
        }
      `}</style>
    </header>
  );
}
