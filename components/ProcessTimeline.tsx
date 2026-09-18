"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Step = { title: string; description: string };

const TRACK = {
  /** x-position of the rail inside the component */
  left: 8,
  lineWidth: 2,
  dot: 12,
  travel: 14,
} as const;

const EASE_TRAVEL = "cubic-bezier(0.76, 0, 0.24, 1)";
const PAUSE_MS = 1000;
const TRAVEL_MS = 1000;

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * Vertical process timeline with a "running point": once the block scrolls
 * into view the rail draws in, the step markers pop in one after another and
 * a glowing dot travels from step to step in a loop. Users with
 * prefers-reduced-motion get the finished state without the loop.
 */
const TONES = {
  light: {
    rail: "bg-[#0d4f4f]/15",
    railFill: "bg-[#0d4f4f]/45",
    marker: "#ffffff",
    markerRing: "rgba(13,79,79,0.3)",
    separator: "after:bg-[#0d4f4f]/10",
    num: "text-[#0d4f4f]/60",
    title: "text-[#0d4f4f]",
    body: "text-[#555]",
  },
  dark: {
    rail: "bg-white/15",
    railFill: "bg-[#f2a93b]/70",
    marker: "#0a3d3d",
    markerRing: "rgba(242,169,59,0.45)",
    separator: "after:bg-white/10",
    num: "text-[#f2a93b]/70",
    title: "text-[#f4fbf9]",
    body: "text-[#cfe4e0]",
  },
} as const;

const PROCESS_STEPS: Step[] = [
  {
    title: "Anfrage & Termin",
    description:
      "Sie nennen mir Adresse, Wunschtermin und ob 60 oder 90 Minuten. Ich bestätige Termin und Preis verbindlich.",
  },
  {
    title: "Ankunft & Aufbau",
    description:
      "Ich komme pünktlich, Sie zeigen mir den Platz. Die Liege steht in wenigen Minuten – leise und ohne Umräumen.",
  },
  {
    title: "Die Behandlung",
    description:
      "Ein kurzes Gespräch über Beschwerden und Druck, danach 60 oder 90 Minuten konzentrierte Arbeit dort, wo Sie sie brauchen.",
  },
  {
    title: "Nachklingen lassen",
    description:
      "Nach der Behandlung baue ich die Liege ab und verabschiede mich. Sie müssen nirgendwohin – Sie bleiben, wo Sie sind, und lassen die Wirkung nachklingen.",
  },
];

export function ProcessTimeline({
  tone = "light",
}: {
  tone?: keyof typeof TONES;
}) {
  const t = TONES[tone];
  const containerRef = useRef<HTMLDivElement>(null);
  const markerRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const travelerRef = useRef<HTMLSpanElement>(null);
  const [positions, setPositions] = useState<number[]>([]);
  // Sichtbar per Default (SSR, Crawler, kein JS). Erst nach dem Mount wird der
  // Block ausgeblendet, wenn er unterhalb des Viewports liegt, und beim
  // Einscrollen wieder eingeblendet.
  const [inView, setInView] = useState(true);
  // inView schaltet einmalig die Einblendung frei; onScreen verfolgt laufend,
  // ob der Block sichtbar ist, damit die Laufpunkt-Schleife nicht endlos
  // weiterrendert, wenn längst weitergescrollt wurde.
  const [onScreen, setOnScreen] = useState(true);
  const [active, setActive] = useState(-1);
  const [reduceMotion, setReduceMotion] = useState(false);

  // offsetTop statt getBoundingClientRect: unabhängig von der Einblend-
  // Transformation der Schritte (translateY), sonst landen Schiene und
  // laufender Punkt um genau diesen Versatz zu tief.
  const measure = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    setPositions(
      markerRefs.current.map((el) => {
        if (!el) return 0;
        let y = el.offsetTop + el.offsetHeight / 2;
        let node = el.offsetParent as HTMLElement | null;
        while (node && node !== container) {
          y += node.offsetTop;
          node = node.offsetParent as HTMLElement | null;
        }
        return y;
      }),
    );
  }, []);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (el.getBoundingClientRect().top <= window.innerHeight) return;
    setInView(false);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "-80px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setOnScreen(entry.isIntersecting),
      { rootMargin: "200px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // The running point: pause at a step, glide to the next, loop.
  useEffect(() => {
    if (!inView || !onScreen || positions.length < 2) return;
    if (reduceMotion) {
      setActive(positions.length - 1);
      return;
    }
    const traveler = travelerRef.current;
    if (!traveler) return;

    let alive = true;
    let current: Animation | null = null;
    const offset = TRACK.travel / 2;

    const run = async () => {
      await wait(400);
      while (alive) {
        traveler.style.transform = `translateY(${positions[0] - offset}px)`;
        setActive(0);
        for (let i = 0; i < positions.length && alive; i++) {
          await wait(PAUSE_MS);
          if (!alive || i === positions.length - 1) break;
          current = traveler.animate(
            [
              { transform: `translateY(${positions[i] - offset}px)` },
              { transform: `translateY(${positions[i + 1] - offset}px)` },
            ],
            { duration: TRAVEL_MS, easing: EASE_TRAVEL, fill: "forwards" },
          );
          const midpoint = setTimeout(() => setActive(i + 1), TRAVEL_MS / 2);
          try {
            await current.finished;
          } catch {
            clearTimeout(midpoint);
            return;
          }
          current.commitStyles();
          current.cancel();
        }
        if (alive) await wait(300);
      }
    };
    run();

    return () => {
      alive = false;
      current?.cancel();
    };
  }, [inView, onScreen, positions, reduceMotion]);

  const first = positions[0] ?? 0;
  const last = positions[positions.length - 1] ?? 0;

  return (
    // Wrapper statt <ol> als Positionskontext: Schiene und Laufpunkt sind keine
    // Listeneinträge und würden die Listensemantik für Screenreader stören.
    <div ref={containerRef} className="relative">
      {/* Rail */}
      <div
        aria-hidden
        className="absolute"
        style={{
          left: TRACK.left,
          top: first,
          width: TRACK.lineWidth,
          height: Math.max(last - first, 0),
        }}
      >
        <div className={`absolute inset-0 ${t.rail}`} />
        <div
          className={`absolute inset-x-0 top-0 origin-top ${t.railFill} transition-[height] duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)]`}
          style={{ height: inView ? "100%" : "0%" }}
        />
      </div>

      {/* Running point */}
      <span
        ref={travelerRef}
        aria-hidden
        className="pointer-events-none absolute top-0 rounded-full bg-gradient-to-br from-[#e8654a] to-[#f2a93b] shadow-[0_0_0_4px_rgba(242,169,59,0.25),0_0_18px_rgba(242,169,59,0.55)] transition-opacity duration-500"
        style={{
          left: TRACK.left + TRACK.lineWidth / 2 - TRACK.travel / 2,
          width: TRACK.travel,
          height: TRACK.travel,
          opacity: inView && !reduceMotion && positions.length > 1 ? 1 : 0,
        }}
      />

      <ol>
        {PROCESS_STEPS.map((step, i) => {
          const isActive = active === i;
          return (
            <li
              key={step.title}
              className={`relative grid gap-1 py-7 pl-9 transition-all duration-500 after:absolute after:bottom-0 after:left-9 after:right-0 after:h-px ${t.separator} last:after:hidden md:grid-cols-[180px_1fr] md:items-baseline md:gap-8 md:py-9`}
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(20px)",
                transitionDelay: `${i * 120}ms`,
              }}
            >
              <span
                ref={(el) => {
                  markerRefs.current[i] = el;
                }}
                aria-hidden
                className="absolute top-[2.35rem] rounded-full border-2 transition-colors duration-300 md:top-[2.85rem]"
                style={{
                  left: TRACK.left + TRACK.lineWidth / 2 - TRACK.dot / 2,
                  width: TRACK.dot,
                  height: TRACK.dot,
                  backgroundColor: t.marker,
                  borderColor: isActive ? "#e8654a" : t.markerRing,
                  transform: inView ? "scale(1)" : "scale(0)",
                  transition: `transform 400ms cubic-bezier(0.22,1,0.36,1) ${i * 150 + 300}ms, border-color 300ms`,
                }}
              />

              <div className="flex items-baseline gap-3 md:block">
                <span
                  className={`text-sm font-extrabold tabular-nums tracking-[0.06em] transition-colors duration-300 ${
                    isActive ? "text-[#e8654a]" : t.num
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3
                  className={`text-lg font-bold md:mt-1 md:text-xl ${t.title}`}
                >
                  {i === 0 ? (
                    <span data-edit-id="mm-process-1-title">Anfrage & Termin</span>
                  ) : i === 1 ? (
                    <span data-edit-id="mm-process-2-title">Ankunft & Aufbau</span>
                  ) : i === 2 ? (
                    <span data-edit-id="mm-process-3-title">Die Behandlung</span>
                  ) : (
                    <span data-edit-id="mm-process-4-title">Nachklingen lassen</span>
                  )}
                </h3>
              </div>
              <p className={`max-w-xl text-base leading-relaxed ${t.body}`}>
                {i === 0 ? (
                  <span data-edit-id="mm-process-1-text">Sie nennen mir Adresse, Wunschtermin und ob 60 oder 90 Minuten. Ich bestätige Termin und Preis verbindlich.</span>
                ) : i === 1 ? (
                  <span data-edit-id="mm-process-2-text">Ich komme pünktlich, Sie zeigen mir den Platz. Die Liege steht in wenigen Minuten – leise und ohne Umräumen.</span>
                ) : i === 2 ? (
                  <span data-edit-id="mm-process-3-text">Ein kurzes Gespräch über Beschwerden und Druck, danach 60 oder 90 Minuten konzentrierte Arbeit dort, wo Sie sie brauchen.</span>
                ) : (
                  <span data-edit-id="mm-process-4-text">Nach der Behandlung baue ich die Liege ab und verabschiede mich. Sie müssen nirgendwohin – Sie bleiben, wo Sie sind, und lassen die Wirkung nachklingen.</span>
                )}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
