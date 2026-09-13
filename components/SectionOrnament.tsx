/** Small heading flourish reused across the site: a short accent rule. */
export default function SectionOrnament({
  align = "left",
}: {
  align?: "left" | "center";
}) {
  return (
    <svg
      width="46"
      height="10"
      viewBox="0 0 46 10"
      aria-hidden="true"
      className={`mt-1.5 ${align === "center" ? "mx-auto" : ""}`}
    >
      <line x1="0" y1="5" x2="46" y2="5" stroke="#D9A24B" strokeWidth="1.4" />
    </svg>
  );
}
