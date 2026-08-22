/** Small heading flourish reused across the About page: a short rule with a diamond centre. */
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
      <line x1="0" y1="5" x2="17" y2="5" stroke="#DC4A0C" strokeWidth="1.4" />
      <rect
        x="23"
        y="1"
        width="8"
        height="8"
        rx="1.5"
        transform="rotate(45 23 5)"
        fill="none"
        stroke="#DC4A0C"
        strokeWidth="1.4"
      />
      <line x1="29" y1="5" x2="46" y2="5" stroke="#DC4A0C" strokeWidth="1.4" />
    </svg>
  );
}
