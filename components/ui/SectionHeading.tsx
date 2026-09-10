import type { ReactNode } from "react";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  dark = false,
  align = "center",
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  dark?: boolean;
  align?: "center" | "left";
}) {
  const alignCls = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={`max-w-2xl ${alignCls} reveal`}>
      {eyebrow && (
        <p className="font-hand text-xl text-dusty md:text-2xl">{eyebrow}</p>
      )}
      <h2
        className={`mt-2 font-display text-3xl font-semibold leading-tight md:text-5xl ${
          dark ? "text-mooncream" : "text-burgundy"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-sm leading-relaxed md:text-base ${
            dark ? "text-mooncream/60" : "text-muted"
          }`}
        >
          {subtitle}
        </p>
      )}
      <div
        aria-hidden
        className={`mt-5 flex items-center gap-2 ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        <span className="h-px w-8 bg-dusty/50" />
        <span className="size-1.5 rotate-45 bg-dusty" />
        <span className="h-px w-8 bg-dusty/50" />
      </div>
    </div>
  );
}
