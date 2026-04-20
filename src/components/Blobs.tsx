// Decorative flat SVG shapes used as background ornaments.
// No blur, no glow — just clean playful brand shapes.
type Props = { className?: string; color?: string; size?: number };

export function BlobShape({ className = "", color = "#17c590", size = 180 }: Props) {
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} className={className} aria-hidden>
      <path
        fill={color}
        d="M44.6,-66.4C56.7,-58.1,64.1,-43,69.1,-28.3C74.1,-13.7,76.6,0.5,73.3,13.6C70,26.7,60.8,38.7,49.4,48.7C38,58.7,24.4,66.7,9.1,70.4C-6.2,74.2,-23.1,73.6,-37.4,66.7C-51.7,59.8,-63.3,46.6,-69.7,31.5C-76.1,16.4,-77.3,-0.6,-72.5,-15.3C-67.7,-30.1,-56.9,-42.7,-44,-51.5C-31.1,-60.3,-15.5,-65.4,0.7,-66.4C16.9,-67.5,32.5,-74.7,44.6,-66.4Z"
        transform="translate(100 100)"
      />
    </svg>
  );
}

export function Squiggle({ className = "", color = "#f04770", size = 120 }: Props) {
  return (
    <svg viewBox="0 0 120 30" width={size} height={size * 0.25} className={className} aria-hidden>
      <path d="M2 15 Q 17 0 32 15 T 62 15 T 92 15 T 118 15" stroke={color} strokeWidth="5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function Star4({ className = "", color = "#f7df5d", size = 60 }: Props) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} aria-hidden>
      <path fill={color} d="M50 5 L60 40 L95 50 L60 60 L50 95 L40 60 L5 50 L40 40 Z" />
    </svg>
  );
}

export function Dot({ className = "", color = "#17c590", size = 24 }: Props) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden>
      <circle cx="12" cy="12" r="12" fill={color} />
    </svg>
  );
}

export function Swirl({ className = "", color = "#3056dd", size = 100 }: Props) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} aria-hidden>
      <path d="M20 50 Q 20 20 50 20 Q 80 20 80 50 Q 80 75 55 75 Q 35 75 35 55 Q 35 40 50 40 Q 62 40 62 52" stroke={color} strokeWidth="6" fill="none" strokeLinecap="round" />
    </svg>
  );
}
