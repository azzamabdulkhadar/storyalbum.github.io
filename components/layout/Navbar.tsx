"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Heart, Menu, Search, X } from "lucide-react";
import { NAV_LINKS, NAV_MORE_LINKS } from "@/lib/constants";
import AccountButton from "@/components/layout/AccountButton";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const moreRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMoreOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // Prevent body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-ivory/90 backdrop-blur-md shadow-[0_8px_30px_-15px_rgba(107,48,58,0.25)]"
            : "bg-transparent"
        }`}
      >
        <nav
          aria-label="Main navigation"
          className="container-page flex h-16 items-center justify-between gap-4"
        >
          <Link
            href="/"
            className="font-display text-xl font-semibold text-burgundy italic"
          >
            Her Story
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`relative rounded-full px-3.5 py-2 text-sm transition-colors ${
                    isActive(l.href)
                      ? "text-burgundy font-semibold"
                      : "text-muted hover:text-burgundy"
                  }`}
                >
                  {l.label}
                  {isActive(l.href) && (
                    <span className="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-dusty" />
                  )}
                </Link>
              </li>
            ))}
            <li className="relative" ref={moreRef}>
              <button
                onClick={() => setMoreOpen((v) => !v)}
                aria-expanded={moreOpen}
                aria-haspopup="menu"
                className={`flex items-center gap-1 rounded-full px-3.5 py-2 text-sm transition-colors ${
                  NAV_MORE_LINKS.some((l) => isActive(l.href))
                    ? "text-burgundy font-semibold"
                    : "text-muted hover:text-burgundy"
                }`}
              >
                More
                <ChevronDown
                  className={`size-3.5 transition-transform ${moreOpen ? "rotate-180" : ""}`}
                />
              </button>
              <div
                role="menu"
                className={`absolute right-0 top-full mt-2 w-60 origin-top-right overflow-hidden rounded-2xl border border-blush bg-white/95 p-1.5 shadow-[var(--shadow-soft)] backdrop-blur transition-all duration-200 ${
                  moreOpen
                    ? "pointer-events-auto scale-100 opacity-100"
                    : "pointer-events-none scale-95 opacity-0"
                }`}
              >
                {NAV_MORE_LINKS.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    role="menuitem"
                    className={`block rounded-xl px-4 py-2.5 text-sm transition-colors ${
                      isActive(l.href)
                        ? "bg-blush/50 font-semibold text-burgundy"
                        : "text-ink hover:bg-cream"
                    }`}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </li>
          </ul>

          <div className="flex items-center gap-1.5">
            <AccountButton />
            <Link
              href="/shayari"
              aria-label="Search quotes"
              className="rounded-full p-2 text-burgundy/70 transition-colors hover:bg-blush/40 hover:text-burgundy"
            >
              <Search className="size-[18px]" />
            </Link>
            <Link
              href="/why-special"
              aria-label="Why she is special"
              className="rounded-full p-2 text-dusty transition-colors hover:bg-blush/40 hover:text-burgundy"
            >
              <Heart className="size-[18px] fill-current" />
            </Link>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="rounded-full p-2 text-burgundy transition-colors hover:bg-blush/40 lg:hidden"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={`fixed inset-0 z-[60] flex flex-col night-texture transition-all duration-500 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="container-page flex h-16 items-center justify-between">
          <span className="font-display text-xl font-semibold italic text-mooncream">
            Her Story
          </span>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="rounded-full p-2 text-mooncream/80 hover:bg-white/10"
          >
            <X className="size-6" />
          </button>
        </div>
        <nav
          aria-label="Mobile navigation"
          className="container-page flex flex-1 flex-col justify-center gap-1 overflow-y-auto pb-16"
        >
          {[...NAV_LINKS, ...NAV_MORE_LINKS].map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              style={{ transitionDelay: open ? `${80 + i * 40}ms` : "0ms" }}
              className={`font-display text-2xl py-2.5 transition-all duration-500 ${
                open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              } ${
                isActive(l.href)
                  ? "text-nightrose italic"
                  : "text-mooncream/85 hover:text-nightrose"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <p className="container-page pb-8 font-hand text-lg text-nightrose/70">
          every page, a memory ♡
        </p>
      </div>
    </>
  );
}
