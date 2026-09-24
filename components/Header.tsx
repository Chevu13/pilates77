"use client";

import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { nav, site } from "@/lib/site";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header className={`header${scrolled ? " is-scrolled" : ""}${open ? " is-open" : ""}`}>
        <div className="header__inner">
          <a href="#pocetna" className="header__logo" onClick={close}>
            <Logo />
          </a>
          <nav className="header__nav" aria-label="Glavna navigacija">
            {nav.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <a href="#zakazivanje" className="btn btn--dark btn--sm header__cta">
            Zakaži termin
          </a>
          <button
            type="button"
            className="header__burger"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Zatvori meni" : "Otvori meni"}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <div id="mobile-menu" className={`menu${open ? " is-open" : ""}`} aria-hidden={!open} inert={!open}>
        <nav className="menu__nav" aria-label="Mobilna navigacija">
          {nav.map((item, i) => (
            <a key={item.href} href={item.href} onClick={close} style={{ transitionDelay: `${120 + i * 60}ms` }}>
              <span className="menu__num">0{i + 1}</span>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="menu__foot">
          <a href="#zakazivanje" className="btn btn--dark btn--block" onClick={close}>
            Zakaži termin
          </a>
          <p>
            {site.street} · {site.city}
            <br />
            <a href={site.instagram} target="_blank" rel="noreferrer">
              {site.instagramHandle}
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
