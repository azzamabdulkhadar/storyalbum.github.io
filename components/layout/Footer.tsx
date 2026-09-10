import Link from "next/link";
import { Heart } from "lucide-react";
import { NAV_LINKS, NAV_MORE_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="night-texture text-mooncream">
      <div className="container-page py-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl font-semibold italic">
              Her Story
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-mooncream/60">
              A little collection of her memories, her smiles, her dreams, and
              everything that makes her... her.
            </p>
            <p className="mt-5 font-hand text-xl text-nightrose">
              to be continued... ♡
            </p>
          </div>
          <nav aria-label="Footer navigation">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-nightrose/80">
              Pages
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-mooncream/70">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="transition-colors hover:text-nightrose">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Footer more pages">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-nightrose/80">
              More
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-mooncream/70">
              {NAV_MORE_LINKS.slice(0, 5).map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="transition-colors hover:text-nightrose">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-mooncream/40 sm:flex-row">
          <p>© {new Date().getFullYear()} Her Story. Made with love.</p>
          <p className="flex items-center gap-1.5">
            crafted with <Heart className="size-3 fill-nightrose text-nightrose" /> one
            moment at a time
          </p>
        </div>
      </div>
    </footer>
  );
}
