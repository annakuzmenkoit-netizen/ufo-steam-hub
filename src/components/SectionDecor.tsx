import { BlobShape, Dot, Squiggle, Star4 } from "@/components/Blobs";

type Props = {
  tone?: "mint" | "blue" | "rose" | "sun";
  side?: "left" | "right";
};

const colors = { mint: "#17c590", blue: "#3056dd", rose: "#f04770", sun: "#f7df5d" };

/** Quiet echoes of the hero artwork, kept behind content and outside hit targets. */
export function SectionDecor({ tone = "mint", side = "right" }: Props) {
  return (
    <div className={`section-decor section-decor--${side}`} aria-hidden="true">
      <BlobShape className="section-decor__blob" color={colors[tone]} size={260} />
      <svg className="section-decor__ring" viewBox="0 0 120 120" fill="none" focusable="false">
        <circle cx="60" cy="60" r="54" stroke={colors[tone]} strokeWidth="2" strokeDasharray="5 9" strokeLinecap="round" />
      </svg>
      <Star4 className="section-decor__star" color={tone === "sun" ? "#17c590" : "#f7df5d"} size={34} />
      <Squiggle className="section-decor__line" color={colors[tone]} size={90} />
      <Dot className="section-decor__dot" color={colors[tone]} size={10} />
    </div>
  );
}
