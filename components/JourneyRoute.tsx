"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { Flag, MapPin } from "lucide-react";
import type { JourneyStop } from "@/lib/types";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface JourneyRouteProps {
  stops: JourneyStop[];
}

interface RoutePoint {
  x: number;
  y: number;
  side: "left" | "right" | "center";
}

const SEGMENT_HEIGHT = 128;
const TOP_PAD = 34;
const BOTTOM_PAD = 34;
const LEFT_X = 20;
const RIGHT_X = 80;

function buildPoints(stopCount: number): RoutePoint[] {
  const points: RoutePoint[] = [{ x: 50, y: TOP_PAD, side: "center" }];
  for (let i = 0; i < stopCount; i += 1) {
    points.push({
      x: i % 2 === 0 ? LEFT_X : RIGHT_X,
      y: TOP_PAD + (i + 1) * SEGMENT_HEIGHT,
      side: i % 2 === 0 ? "left" : "right",
    });
  }
  points.push({
    x: 50,
    y: TOP_PAD + (stopCount + 1) * SEGMENT_HEIGHT,
    side: "center",
  });
  return points;
}

/** Smooth S-curve through every point, like a route drawn on a map. */
function buildPath(points: RoutePoint[]): string {
  if (points.length === 0) return "";
  const [first, ...rest] = points;
  let d = `M ${first.x} ${first.y}`;
  let prev = first;
  for (const point of rest) {
    const midY = (prev.y + point.y) / 2;
    d += ` C ${prev.x} ${midY}, ${point.x} ${midY}, ${point.x} ${point.y}`;
    prev = point;
  }
  return d;
}

/**
 * The route is drawn like a live navigation map: a curved path traces the
 * stops top to bottom, drawing itself in as the section scrolls into view,
 * with a soft ambient flow animation once drawn.
 */
export default function JourneyRoute({ stops }: JourneyRouteProps) {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const routePathRef = useRef<SVGPathElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReducedMotion(true);
      setStarted(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const points = useMemo(() => buildPoints(stops.length), [stops.length]);
  const pathD = useMemo(() => buildPath(points), [points]);
  const totalHeight = points[points.length - 1].y + BOTTOM_PAD;

  // Drive a car icon along the route, following its exact curve at every
  // point — sampled off the real SVG path rather than approximated, so it
  // stays glued to the line regardless of the viewBox's non-uniform scale.
  useEffect(() => {
    if (!started || reducedMotion) return;
    const path = routePathRef.current;
    const car = carRef.current;
    const panel = ref.current;
    if (!path || !car || !panel) return;

    const total = path.getTotalLength();
    if (total === 0) return;
    const duration = Math.max(6000, stops.length * 1500);
    const fadeZone = 0.035;
    let rafId = 0;
    let startTime: number | null = null;

    const frame = (now: number) => {
      if (startTime === null) startTime = now;
      const elapsed = (now - startTime) % duration;
      const t = elapsed / duration;
      const len = t * total;
      const pt = path.getPointAtLength(len);
      const ptAhead = path.getPointAtLength(Math.min(total, len + 1));

      const width = panel.clientWidth;
      const x = (pt.x / 100) * width;
      const y = pt.y;
      const xAhead = (ptAhead.x / 100) * width;
      const yAhead = ptAhead.y;
      const angle = Math.atan2(yAhead - y, xAhead - x) * (180 / Math.PI);

      const opacity =
        t < fadeZone ? t / fadeZone : t > 1 - fadeZone ? (1 - t) / fadeZone : 1;

      car.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) rotate(${angle + 90}deg)`;
      car.style.opacity = String(opacity);

      rafId = requestAnimationFrame(frame);
    };

    rafId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafId);
  }, [started, reducedMotion, pathD, stops.length]);

  return (
    <section aria-labelledby="journey-route" className="px-4 pt-7 tab:px-8 tabLg:mx-auto tabLg:max-w-[620px] tabLg:px-0">
      <div className="flex items-baseline justify-between">
        <div>
          <h2
            id="journey-route"
            className="font-serif text-[22px] font-bold tracking-[-0.01em] text-ink tab:text-[26px]"
          >
            {t.journeyRoute.heading}
          </h2>
          <p className="mt-1 text-[12.5px] text-ink-muted tab:text-[14px]">
            {t.journeyRoute.subtitle}
          </p>
        </div>
        <span className="rounded-full border border-line bg-white px-2.5 py-1 text-[10.5px] font-bold text-ink-muted shadow-card">
          {t.journeyRoute.stopsCount(stops.length)}
        </span>
      </div>

      <div
        ref={ref}
        className="relative mt-4 overflow-hidden rounded-panel border border-line bg-[radial-gradient(circle,rgba(36,26,20,0.055)_1px,transparent_1px)] bg-[length:15px_15px] py-2 shadow-card tab:mt-6"
        style={{ backgroundColor: "#FFFDFA" }}
      >
        <svg
          viewBox={`0 0 100 ${totalHeight}`}
          width="100%"
          height={totalHeight}
          preserveAspectRatio="none"
          aria-hidden="true"
          className="absolute inset-0"
        >
          <defs>
            <linearGradient id="routeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E8C179" />
              <stop offset="100%" stopColor="#A8722C" />
            </linearGradient>
            <clipPath id="journeyReveal" clipPathUnits="userSpaceOnUse">
              <rect
                x="-20"
                y="0"
                width="140"
                height={started ? totalHeight : 0}
                style={{ transition: "height 1.6s cubic-bezier(0.22,1,0.36,1)" }}
              />
            </clipPath>
          </defs>

          {/* Base track: a faint guide, always fully visible */}
          <path
            d={pathD}
            fill="none"
            stroke="currentColor"
            className="text-line"
            strokeWidth="2.5"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />

          {/* Route line: wipes in top-to-bottom as the section scrolls into view */}
          <g clipPath="url(#journeyReveal)">
            <path
              ref={routePathRef}
              d={pathD}
              fill="none"
              stroke="url(#routeGradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </g>
        </svg>

        <div className="relative" style={{ height: totalHeight }}>
          {/* Car: continuously drives the route, sampled live off the SVG path */}
          {started && !reducedMotion && (
            <div
              ref={carRef}
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-0 z-10"
              style={{ willChange: "transform" }}
            >
              <CarIcon />
            </div>
          )}

          <RouteMarker point={points[0]} label={t.journeyRoute.start} icon="pin" delay={0} started={started} />

          {stops.map((stop, index) => (
            <StopMarker
              key={stop.order}
              stop={stop}
              point={points[index + 1]}
              delay={150 + index * 130}
              started={started}
            />
          ))}

          <RouteMarker
            point={points[points.length - 1]}
            label={t.journeyRoute.end}
            icon="flag"
            delay={200 + stops.length * 130}
            started={started}
          />
        </div>
      </div>
    </section>
  );
}

function StopMarker({
  stop,
  point,
  delay,
  started,
}: {
  stop: JourneyStop;
  point: RoutePoint;
  delay: number;
  started: boolean;
}) {
  const isLeft = point.side === "left";
  const revealStyle: React.CSSProperties = {
    opacity: started ? 1 : 0,
    transform: started ? "none" : "translateY(14px)",
    transitionDelay: `${delay}ms`,
  };

  return (
    <>
      {/* Pin: always centred exactly on the route point */}
      <div
        className="absolute"
        style={{ left: `${point.x}%`, top: point.y, transform: "translate(-50%, -50%)" }}
      >
        <div className="relative transition-all duration-700 ease-out" style={revealStyle}>
          <span className="relative flex h-[46px] w-[46px] items-center justify-center overflow-hidden rounded-full border-2 border-white bg-sand shadow-float ring-1 ring-line">
            {stop.image ? (
              <Image
                src={stop.image}
                alt=""
                width={46}
                height={46}
                aria-hidden="true"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-sand-light to-sand" />
            )}
          </span>
          <span className="absolute -left-1 -top-1 flex h-[19px] w-[19px] items-center justify-center rounded-full border-2 border-white bg-terracotta text-[9.5px] font-bold text-white shadow-card">
            {stop.order}
          </span>
        </div>
      </div>

      {/* Label: offset a fixed gap from the pin, flowing away from the route line */}
      <div
        className="absolute"
        style={
          isLeft
            ? { left: `calc(${point.x}% + 32px)`, top: point.y, transform: "translateY(-50%)" }
            : {
                left: `calc(${point.x}% - 32px)`,
                top: point.y,
                transform: "translate(-100%, -50%)",
              }
        }
      >
        <div
          className={`min-w-0 max-w-[130px] transition-all duration-700 ease-out ${isLeft ? "text-left" : "text-right"}`}
          style={revealStyle}
        >
          <p className="truncate text-[12.5px] font-bold leading-tight text-ink">
            {stop.name}
          </p>
          <span className="mt-1 inline-block whitespace-nowrap rounded-full bg-terracotta-tint px-2 py-[3px] text-[9.5px] font-semibold text-terracotta">
            {stop.duration}
          </span>
        </div>
      </div>
    </>
  );
}

function RouteMarker({
  point,
  label,
  icon,
  delay,
  started,
}: {
  point: RoutePoint;
  label: string;
  icon: "pin" | "flag";
  delay: number;
  started: boolean;
}) {
  const Icon = icon === "pin" ? MapPin : Flag;

  return (
    <div
      className="absolute flex flex-col items-center transition-all duration-700 ease-out"
      style={{
        left: `${point.x}%`,
        top: point.y,
        transform: started ? "translate(-50%, -50%)" : "translate(-50%, -50%) scale(0.7)",
        opacity: started ? 1 : 0,
        transitionDelay: `${delay}ms`,
      }}
    >
      <span className="relative flex h-8 w-8 items-center justify-center">
        {icon === "pin" && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-terracotta/50" />
        )}
        <span className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-terracotta text-white shadow-float">
          <Icon size={14} strokeWidth={2.4} aria-hidden="true" />
        </span>
      </span>
      <p className="mt-1 whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.14em] text-terracotta">
        {label}
      </p>
    </div>
  );
}

/**
 * A small shaded, top-down car marker — front (windshield + headlights)
 * faces up by default, so rotating the element aims the front along the
 * direction of travel.
 */
function CarIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <linearGradient id="carBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E8C179" />
          <stop offset="55%" stopColor="#D9A24B" />
          <stop offset="100%" stopColor="#A63505" />
        </linearGradient>
        <linearGradient id="carGlass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4A3A30" />
          <stop offset="100%" stopColor="#241A14" />
        </linearGradient>
      </defs>

      {/* Ground shadow */}
      <ellipse cx="12" cy="21" rx="6.4" ry="1.7" fill="#241A14" opacity="0.25" />

      {/* Body */}
      <rect
        x="5"
        y="2.3"
        width="14"
        height="18.6"
        rx="5.2"
        fill="url(#carBody)"
        stroke="#8A2C05"
        strokeWidth="0.35"
      />

      {/* Side mirrors */}
      <rect x="3.3" y="7.6" width="2" height="1.7" rx="0.6" fill="#A63505" />
      <rect x="18.7" y="7.6" width="2" height="1.7" rx="0.6" fill="#A63505" />

      {/* Windshield */}
      <path
        d="M7.3 9.2C7.7 6.5 9.3 4.9 12 4.9c2.7 0 4.3 1.6 4.7 4.3 -1.4 0.5-3 0.8-4.7 0.8s-3.3-0.3-4.7-0.8Z"
        fill="url(#carGlass)"
      />

      {/* Headlights */}
      <rect x="6.6" y="2.8" width="2.1" height="1" rx="0.45" fill="#FFF4E8" />
      <rect x="15.3" y="2.8" width="2.1" height="1" rx="0.45" fill="#FFF4E8" />

      {/* Roof */}
      <rect x="7.6" y="10.6" width="8.8" height="4.1" rx="1.6" fill="#A8722C" />
      <rect x="7.6" y="10.6" width="8.8" height="1.4" rx="0.7" fill="#F0946A" opacity="0.55" />

      {/* Rear window */}
      <path
        d="M7.7 15.4c1.3-0.4 2.8-0.6 4.3-0.6s3 0.2 4.3 0.6c-0.3 2-1.7 3.3-4.3 3.3s-4-1.3-4.3-3.3Z"
        fill="url(#carGlass)"
      />

      {/* Tail lights */}
      <rect x="6.7" y="18.9" width="1.9" height="1" rx="0.4" fill="#FF6B4A" />
      <rect x="15.4" y="18.9" width="1.9" height="1" rx="0.4" fill="#FF6B4A" />
    </svg>
  );
}
