import Link from "next/link";
import { Heart } from "lucide-react";
import { NAV_LINKS, NAV_MORE_LINKS } from "@/lib/constants";

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
  </svg>
);

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.17c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.34.95.1-.74.4-1.25.72-1.53-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.16-1.18 3.16-1.18.63 1.59.24 2.76.12 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .3.21.67.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
  </svg>
);

const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/azzamabdulkhadar/", icon: LinkedinIcon },
  { label: "GitHub", href: "https://github.com/azzamabdulkhadar", icon: GithubIcon },
];

export default function Footer() {
  return (
    <footer className="night-texture text-mooncream">
      <div className="container-page py-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
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
          <div className="grid grid-cols-2 gap-8 md:contents">
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
                <li>
                  <Link href="/birthday" className="font-medium text-nightrose/90 transition-colors hover:text-nightrose">
                    Happy Birthday ♡
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-nightrose/80">
              Socials
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-mooncream/70">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 transition-colors hover:text-nightrose"
                  >
                    <s.icon className="size-4" />
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-mooncream/40">
          <p className="flex flex-wrap items-center justify-center gap-1.5">
            <span>© {new Date().getFullYear()} Her Story · Azzam Abdul Khadar</span>
            <span>crafted with <Heart className="inline size-3 fill-nightrose text-nightrose" /> one moment at a time</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
