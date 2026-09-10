/** Decorative SVG doodles — hearts, flowers, sparkles. Subtle by design. */

export function HeartDoodle({
  className = "",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={className}
      style={style}
    >
      <path
        d="M12 20s-7.5-4.6-9.3-9.2C1.4 7.4 3.4 4.5 6.4 4.5c2 0 3.6 1.1 4.4 2.7l1.2 2.4 1.2-2.4c.8-1.6 2.4-2.7 4.4-2.7 3 0 5 2.9 3.7 6.3C19.5 15.4 12 20 12 20Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function FlowerDoodle({
  className = "",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden className={className} style={style}>
      <g stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <ellipse
            key={a}
            cx="24"
            cy="13"
            rx="4.5"
            ry="8"
            transform={`rotate(${a} 24 24)`}
          />
        ))}
        <circle cx="24" cy="24" r="3" fill="currentColor" stroke="none" opacity="0.5" />
      </g>
    </svg>
  );
}

export function SparkleDoodle({
  className = "",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className} style={style}>
      <path
        d="M12 2c.6 5.4 4.6 9.4 10 10-5.4.6-9.4 4.6-10 10-.6-5.4-4.6-9.4-10-10 5.4-.6 9.4-4.6 10-10Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Twinkling stars for night sections */
export function StarField({ count = 40 }: { count?: number }) {
  const stars = Array.from({ length: count }, (_, i) => {
    // deterministic pseudo-random placement
    const seed = (i * 137.508) % 100;
    const x = seed;
    const y = ((i * 61.803) % 100 + 100) % 100;
    const size = 1 + ((i * 7) % 3);
    const delay = (i % 10) * 0.4;
    return { x, y, size, delay, key: i };
  });
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {stars.map((s) => (
        <span
          key={s.key}
          className="absolute animate-twinkle rounded-full bg-mooncream"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
