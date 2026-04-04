import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const TALL_H = 320;
const SHORT_H = 210;

const SLIDES = [
  {
    key: "poster",
    img: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=800&q=80",
    label: "Poster Design",
    bg: "#e63946",
    desc: "Bold, typographic-led poster work spanning event campaigns, cultural projects, and limited-edition print series. Each piece is built around a central tension between legibility and visual impact.",
    tags: ["Print", "Typography", "Editorial"],
    year: "2022 – Present",
  },
  {
    key: "ui",
    img: "https://images.unsplash.com/photo-1545670723-196ed0954986?auto=format&fit=crop&w=800&q=80",
    label: "UI Components",
    bg: "#4361ee",
    desc: "A living library of interaction patterns — toggles, modals, cards, and micro-animations — designed for clarity and built to be dropped into any design system without friction.",
    tags: ["Product Design", "Interaction", "Systems"],
    year: "2021 – Present",
  },
  {
    key: "portrait",
    img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80",
    label: "Photography",
    bg: "#e9c46a",
    short: true,
    desc: "Portrait work that leans into natural light, honest expression, and the quiet in-between moments. Shot primarily on location across Nairobi, Lagos, and Accra.",
    tags: ["Portrait", "Documentary", "Natural Light"],
    year: "2019 – Present",
  },
  {
    key: "print",
    img: "https://images.unsplash.com/photo-1579762593131-b8945254345c?auto=format&fit=crop&w=800&q=80",
    label: "Print Art",
    bg: "#f4a261",
    desc: "Hand-pulled screen prints and linocut editions exploring pattern, colour rhythm, and the tactile quality that digital can't replicate. Limited runs, numbered and signed.",
    tags: ["Screen Print", "Linocut", "Limited Edition"],
    year: "2020 – Present",
  },
  {
    key: "landscape",
    img: "https://images.unsplash.com/photo-1558865869-c93f6f8482af?auto=format&fit=crop&w=800&q=80",
    label: "Illustration",
    bg: "#2a9d8f",
    desc: "Narrative illustration for editorial, publishing, and brand storytelling. The work pulls from folklore, urban landscape, and the collision of the contemporary with the ancestral.",
    tags: ["Editorial", "Narrative", "Mixed Media"],
    year: "2018 – Present",
  },
  {
    key: "branding",
    img: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?auto=format&fit=crop&w=800&q=80",
    label: "Branding",
    bg: "#264653",
    short: true,
    desc: "End-to-end brand identity for startups, cultural institutions, and independent businesses. Strategy, visual identity, and guidelines that actually get used.",
    tags: ["Identity", "Strategy", "Guidelines"],
    year: "2017 – Present",
  },
  {
    key: "pet",
    img: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=800&q=80",
    label: "Animal Studies",
    bg: "#a8dadc",
    desc: "A personal series of animal character studies rendered in gouache and digital — exploring personality, posture, and the quiet dignity of non-human subjects.",
    tags: ["Character", "Gouache", "Personal Work"],
    year: "2023",
  },
  {
    key: "typography",
    img: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?auto=format&fit=crop&w=800&q=80",
    label: "Typography",
    bg: "#6a0572",
    desc: "Custom lettering and typeface experiments — from hand-drawn display scripts to variable font proofs. Typography as both structure and expression.",
    tags: ["Lettering", "Type Design", "Display"],
    year: "2020 – Present",
  },
  {
    key: "motion",
    img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
    label: "Motion",
    bg: "#ff6b35",
    short: true,
    desc: "Motion design for brand campaigns, UI transitions, and short-form content. Fast, intentional, and built to work at any frame rate.",
    tags: ["After Effects", "UI Motion", "Brand Film"],
    year: "2021 – Present",
  },
];

const CARD_WIDTH = 260;
const CARD_GAP = 18;
const SPEED = 0.75;

// Lightened tint of a hex color for popup bg
function tint(hex, amount = 0.88) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const mix = (c) => Math.round(c + (255 - c) * amount);
  return `rgb(${mix(r)}, ${mix(g)}, ${mix(b)})`;
}

function Popup({ slide, onClose }) {
  const [phase, setPhase] = useState("enter"); // enter | idle | exit

  useEffect(() => {
    // Allow browser to paint before triggering animation
    const t = setTimeout(() => setPhase("idle"), 20);
    return () => clearTimeout(t);
  }, []);

  const handleClose = () => {
    setPhase("exit");
    setTimeout(onClose, 380);
  };

  const overlayStyle = {
    opacity: phase === "idle" ? 1 : 0,
    transition: "opacity 0.35s ease",
  };

  const cardStyle = {
    transform:
      phase === "enter"
        ? "rotateY(-18deg) rotateX(6deg) scale(0.82) translateY(40px)"
        : phase === "exit"
        ? "rotateY(14deg) rotateX(-4deg) scale(0.88) translateY(-30px)"
        : "rotateY(0deg) rotateX(0deg) scale(1) translateY(0px)",
    opacity: phase === "idle" ? 1 : 0,
    transition:
      phase === "enter"
        ? "transform 0.55s cubic-bezier(0.22,1,0.36,1), opacity 0.4s ease"
        : "transform 0.38s cubic-bezier(0.55,0,1,0.45), opacity 0.3s ease",
  };

  const node = (
    <div className="sp-popup-overlay" style={overlayStyle} onClick={handleClose}>
      <div
        className="sp-popup-card"
        style={{ ...cardStyle, "--pbg": tint(slide.bg), "--accent": slide.bg }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button type="button" className="sp-popup-close" onClick={handleClose} aria-label="Close">
          ✕
        </button>

        {/* Image half */}
        <div className="sp-popup-img-wrap">
          <img src={slide.img} alt={slide.label} />
          <div
            className="sp-popup-img-overlay"
            style={{ background: `linear-gradient(to top, ${slide.bg}dd 0%, transparent 60%)` }}
          />
          <span className="sp-popup-year">{slide.year}</span>
        </div>

        {/* Content half */}
        <div className="sp-popup-body">
          <p className="sp-popup-category">{slide.label}</p>
          <h2 className="sp-popup-heading">{slide.label}</h2>
          <p className="sp-popup-desc">{slide.desc}</p>
          <div className="sp-popup-tags">
            {slide.tags.map((t) => (
              <span key={t} className="sp-popup-tag" style={{ borderColor: slide.bg, color: slide.bg }}>
                {t}
              </span>
            ))}
          </div>
          <button type="button" className="sp-popup-cta" style={{ background: slide.bg }}>
            View Full Project →
          </button>
        </div>
      </div>
    </div>
  );

  return typeof document !== "undefined" ? createPortal(node, document.body) : null;
}

export default function SneakPeakCarousel() {
  const trackRef = useRef(null);
  const xRef = useRef(0);
  const pausedRef = useRef(false);
  const rafRef = useRef(null);
  const [active, setActive] = useState(null);

  const allSlides = [...SLIDES, ...SLIDES, ...SLIDES];

  useEffect(() => {
    const totalW = SLIDES.length * (CARD_WIDTH + CARD_GAP);
    function tick() {
      if (!pausedRef.current) {
        xRef.current += SPEED;
        if (xRef.current >= totalW) xRef.current -= totalW;
        if (trackRef.current)
          trackRef.current.style.transform = `translateX(-${xRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Pause scroll when popup is open
  useEffect(() => {
    pausedRef.current = !!active;
  }, [active]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,wght@1,400;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        .sp-root {
          background: var(--main, #a9bcd0);
          padding: 56px 0 64px;
          overflow: hidden;
          font-family: 'DM Sans', sans-serif;
        }

        .sp-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          margin-bottom: 44px;
        }

        .sp-icon { font-size: 2rem; line-height: 1; filter: drop-shadow(0 2px 4px rgba(0,0,0,.12)); }

        .sp-title {
          font-family: 'Bodoni Moda', Georgia, serif;
          font-style: italic;
          font-weight: 400;
          font-size: clamp(1.4rem, 3vw, 2rem);
          color: #1a1a6e;
          letter-spacing: 0.01em;
          margin: 0;
        }

        .sp-viewport {
          overflow: hidden;
          width: 100%;
          cursor: grab;
          user-select: none;
        }
        .sp-viewport:active { cursor: grabbing; }

        .sp-track {
          display: flex;
          align-items: flex-end;
          gap: ${CARD_GAP}px;
          will-change: transform;
          padding: 24px 0 28px;
        }

        .sp-card {
          flex-shrink: 0;
          width: ${CARD_WIDTH}px;
          border-radius: 16px;
          overflow: hidden;
          position: relative;
          box-shadow: 0 6px 24px rgba(0,0,0,.10);
          cursor: pointer;
          transition: transform 0.3s cubic-bezier(.22,1,.36,1), box-shadow 0.3s ease;
        }
        .sp-card:hover {
          transform: translateY(-8px) scale(1.025);
          box-shadow: 0 18px 40px rgba(0,0,0,.20);
        }
        .sp-card img {
          width: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s ease;
        }
        .sp-card:hover img { transform: scale(1.06); }

        .sp-card__label {
          position: absolute;
          bottom: 12px;
          left: 12px;
          background: rgba(255,255,255,0.88);
          backdrop-filter: blur(6px);
          padding: 4px 11px;
          border-radius: 100px;
          font-size: 0.68rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #111;
        }

        .sp-card__overlay {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }
        .sp-card:hover .sp-card__overlay { opacity: 1; }

        .sp-card--short::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: var(--accent);
          z-index: 2;
          opacity: 0.85;
        }

        /* Click hint pulse ring on hover */
        .sp-card::after {
          content: '↗';
          position: absolute;
          top: 12px; right: 12px;
          width: 32px; height: 32px;
          background: rgba(255,255,255,0.92);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          opacity: 0;
          transform: scale(0.6);
          transition: opacity 0.25s ease, transform 0.25s cubic-bezier(.22,1,.36,1);
          line-height: 32px;
          text-align: center;
        }
        .sp-card:hover::after {
          opacity: 1;
          transform: scale(1);
        }

        .sp-fade-left, .sp-fade-right {
          position: absolute;
          top: 0; bottom: 0;
          width: 130px;
          z-index: 10;
          pointer-events: none;
        }
        .sp-fade-left  { left: 0;  background: linear-gradient(to right, var(--main, #a9bcd0), transparent); }
        .sp-fade-right { right: 0; background: linear-gradient(to left,  var(--main, #a9bcd0), transparent); }

        .sp-wrap { position: relative; }

        /* ── Popup ── */
        .sp-popup-overlay {
          position: fixed;
          inset: 0;
          background: rgba(10,10,20,0.55);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          /* Above floating chrome (300) and footer; portal escapes home-stack isolation */
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          perspective: 1200px;
        }

        .sp-popup-card {
          background: var(--pbg);
          border-radius: 24px;
          width: min(820px, 100%);
          max-height: 90vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          overflow: hidden;
          box-shadow:
            0 2px 4px rgba(0,0,0,.04),
            0 8px 32px rgba(0,0,0,.14),
            0 32px 80px rgba(0,0,0,.18);
          transform-style: preserve-3d;
          will-change: transform, opacity;
          position: relative;
        }

        @media (max-width: 600px) {
          .sp-popup-card { grid-template-columns: 1fr; max-height: 88vh; overflow-y: auto; }
        }

        .sp-popup-close {
          position: absolute;
          top: 16px; right: 16px;
          width: 34px; height: 34px;
          border-radius: 50%;
          border: none;
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(4px);
          font-size: 0.8rem;
          cursor: pointer;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #222;
          transition: background 0.2s, transform 0.2s;
        }
        .sp-popup-close:hover { background: #fff; transform: scale(1.1) rotate(90deg); }

        .sp-popup-img-wrap {
          position: relative;
          overflow: hidden;
        }
        .sp-popup-img-wrap img {
          width: 100%;
          height: 100%;
          min-height: 320px;
          object-fit: cover;
          display: block;
        }
        .sp-popup-img-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .sp-popup-year {
          position: absolute;
          bottom: 16px; left: 16px;
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.9);
        }

        .sp-popup-body {
          padding: 40px 36px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 14px;
        }

        .sp-popup-category {
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--accent);
          margin: 0;
        }

        .sp-popup-heading {
          font-family: 'Bodoni Moda', Georgia, serif;
          font-style: italic;
          font-size: clamp(1.5rem, 3vw, 2.1rem);
          font-weight: 700;
          color: #111;
          margin: 0;
          line-height: 1.15;
        }

        .sp-popup-desc {
          font-size: 0.88rem;
          line-height: 1.72;
          color: #444;
          margin: 0;
        }

        .sp-popup-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
        }

        .sp-popup-tag {
          font-size: 0.65rem;
          font-weight: 500;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          border: 1.5px solid;
          border-radius: 100px;
          padding: 3px 10px;
        }

        .sp-popup-cta {
          margin-top: 6px;
          align-self: flex-start;
          border: none;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          padding: 10px 22px;
          border-radius: 100px;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.2s;
        }
        .sp-popup-cta:hover { opacity: 0.88; transform: translateX(3px); }
      `}</style>

      <div className="sp-root">
        <header className="sp-header">
          <span className="sp-icon">🔭</span>
          <h2 className="sp-title">Sneak peak of some of my works</h2>
        </header>

        <div className="sp-wrap">
          <div className="sp-fade-left" />
          <div className="sp-fade-right" />

          <div className="sp-viewport">
            <div className="sp-track" ref={trackRef}>
              {allSlides.map((s, i) => {
                const h = s.short ? SHORT_H : TALL_H;
                return (
                  <div
                    key={`${s.key}-${i}`}
                    className={`sp-card${s.short ? " sp-card--short" : ""}`}
                    style={{ "--accent": s.bg }}
                    onClick={() => setActive(s)}
                  >
                    <img src={s.img} alt={s.label} loading="lazy" style={{ height: `${h}px` }} />
                    <div
                      className="sp-card__overlay"
                      style={{ background: `linear-gradient(160deg, ${s.bg}44 0%, ${s.bg}cc 100%)` }}
                    />
                    <span className="sp-card__label">{s.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {active && <Popup slide={active} onClose={() => setActive(null)} />}
    </>
  );
}