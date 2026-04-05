import { useCallback, useRef, useState } from 'react'

const FEEDBACK = [
  {
    id: 1,
    name: 'Nia Okonkwo',
    role: 'Founder, Meridian Studio',
    quote:
      'Jackline translated a vague brief into a brand system we still use every day. Clear process, sharp eye, and she never missed a deadline.',
    img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    name: 'Jonas Meier',
    role: 'Product Lead, Northline Apps',
    quote:
      'The UI work felt intentional — motion, spacing, and tone all aligned. Our retention numbers moved within a month of the redesign.',
    img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    name: 'Priya Nair',
    role: 'Marketing Director, Kito Foods',
    quote:
      'She listens more than she talks, then delivers visuals that actually match what we meant. Rare combination.',
    img: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    name: 'Elena Vasquez',
    role: 'Curator, Lumen Gallery',
    quote:
      'Campaign assets for our opening season looked editorial and cohesive across print and social. Visitors noticed.',
    img: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 5,
    name: 'Thabo Molefe',
    role: 'CEO, Riverstone Logistics',
    quote:
      'Professional, fast iterations, and zero drama. The deck and site she built helped us close our Series A conversations.',
    img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80',
  },
]

const VISIBLE = 3

export default function Feedback() {
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState(null)
  const [animating, setAnimating] = useState(false)
  const touchStartX = useRef(null)
  const touchStartY = useRef(null)

  const go = useCallback(
    (dir) => {
      if (animating) return
      setDirection(dir)
      setAnimating(true)
      setTimeout(() => {
        setActive((prev) =>
          dir === 'next' ? (prev + 1) % FEEDBACK.length : (prev - 1 + FEEDBACK.length) % FEEDBACK.length,
        )
        setAnimating(false)
        setDirection(null)
      }, 420)
    },
    [animating],
  )

  const goToIndex = useCallback(
    (index) => {
      if (index === active || animating) return
      setActive(index)
    },
    [active, animating],
  )

  const deck = Array.from({ length: VISIBLE + 1 }, (_, i) => {
    const idx = (active + i) % FEEDBACK.length
    return { ...FEEDBACK[idx], deckPos: i }
  }).reverse()

  const handleTouchStart = (e) => {
    if (!e.touches?.length) return
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e) => {
    if (touchStartX.current == null) return
    const touch = e.changedTouches?.[0]
    if (!touch) return
    const dx = touch.clientX - touchStartX.current
    const dy = touch.clientY - touchStartY.current
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      go(dx < 0 ? 'next' : 'prev')
    }
    touchStartX.current = null
    touchStartY.current = null
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Serif+Display:ital@0;1&display=swap');

        .fb-section {
          position: relative;
          margin-left: -2rem;
          margin-right: -2rem;
          width: calc(100% + 4rem);
          background:
            radial-gradient(ellipse 80% 60% at 70% 20%, rgba(88, 164, 176, 0.22), transparent 55%),
            radial-gradient(ellipse 50% 40% at 10% 80%, rgba(216, 219, 226, 0.28), transparent 50%),
            linear-gradient(
              130deg,
              rgba(88, 164, 176, 0.42) 0%,
              rgba(169, 188, 208, 1) 55%,
              rgba(216, 219, 226, 0.72) 120%
            );
          font-family: 'DM Sans', system-ui, sans-serif;
          overflow: hidden;
          min-height: min(74.52vh, 729px);
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding-top: clamp(36px, 5vh, 56px);
          padding-bottom: clamp(36px, 5vh, 56px);
          box-sizing: border-box;
          color: var(--ink, #0b2f38);
        }

        .fb-meta {
          position: absolute;
          z-index: 2;
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(11, 47, 56, 0.35);
          font-family: 'DM Sans', system-ui, sans-serif;
          pointer-events: none;
          user-select: none;
          white-space: nowrap;
        }
        .fb-meta--tl {
          top: clamp(18px, 3.5vw, 36px);
          left: clamp(16px, 4vw, 48px);
        }
        .fb-meta--br {
          bottom: clamp(18px, 3.5vw, 36px);
          right: clamp(16px, 4vw, 48px);
          text-align: right;
        }

        .fb-watermark {
          position: absolute;
          top: clamp(48px, 8vw, 76px);
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          z-index: 0;
          line-height: 0.82;
          user-select: none;
        }
        .fb-watermark span {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(72px, 14vw, 200px);
          color: rgba(11, 47, 56, 0.055);
          letter-spacing: 2px;
          white-space: nowrap;
        }

        .fb-inner {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 1400px;
          padding: clamp(28px, 5vw, 48px) 8% clamp(40px, 7vw, 72px);
          display: flex;
          align-items: flex-start;
          justify-content: center;
          gap: 0;
        }

        .fb-arrow {
          position: absolute;
          top: clamp(162px, 25.92vh, 275px);
          transform: translateY(-50%);
          width: 52px;
          height: 52px;
          border-radius: 50%;
          border: 1px solid rgba(11, 47, 56, 0.1);
          background: rgba(255, 255, 255, 0.55);
          backdrop-filter: blur(8px);
          box-shadow: 0 4px 24px rgba(11, 47, 56, 0.1);
          color: rgba(11, 47, 56, 0.5);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
          z-index: 10;
        }
        .fb-arrow:hover {
          background: rgba(255, 255, 255, 0.92);
          color: var(--ink, #0b2f38);
          box-shadow: 0 8px 32px rgba(11, 47, 56, 0.12);
          transform: translateY(-50%) scale(1.05);
        }
        .fb-arrow-prev { left: 2%; }
        .fb-arrow-next { right: 2%; }

        .fb-stack {
          position: relative;
          width: 380px;
          height: 520px;
          flex-shrink: 0;
          margin: 8px 40px 48px 0;
          transform: translateY(-36px);
        }

        .fb-card {
          position: absolute;
          inset: 0;
          border-radius: 24px;
          overflow: hidden;
          will-change: transform, opacity;
          transform-origin: bottom center;
          cursor: pointer;
        }

        .fb-card[data-pos='0'] {
          transform: translateY(0) translateX(0) scale(1) rotate(0deg);
          box-shadow: 0 40px 100px rgba(11, 47, 56, 0.22), 0 10px 30px rgba(11, 47, 56, 0.12);
          z-index: 4;
          opacity: 1;
        }
        .fb-card[data-pos='1'] {
          transform: translateY(-28px) translateX(14px) scale(0.94) rotate(-5deg);
          box-shadow: 0 16px 48px rgba(11, 47, 56, 0.12);
          z-index: 3;
          opacity: 0.88;
        }
        .fb-card[data-pos='2'] {
          transform: translateY(-52px) translateX(-12px) scale(0.885) rotate(6deg);
          box-shadow: 0 10px 28px rgba(11, 47, 56, 0.1);
          z-index: 2;
          opacity: 0.68;
        }
        .fb-card[data-pos='3'] {
          transform: translateY(-72px) translateX(8px) scale(0.835) rotate(-4deg);
          box-shadow: 0 6px 18px rgba(11, 47, 56, 0.08);
          z-index: 1;
          opacity: 0.44;
        }

        .fb-card {
          transition:
            transform 0.45s cubic-bezier(0.34, 1.1, 0.64, 1),
            opacity 0.35s ease,
            box-shadow 0.35s ease;
        }

        .fb-card--exit-next {
          transform: translateX(120%) rotate(12deg) !important;
          opacity: 0 !important;
          transition:
            transform 0.38s cubic-bezier(0.4, 0, 1, 1),
            opacity 0.3s ease !important;
        }
        .fb-card--exit-prev {
          transform: translateX(-120%) rotate(-12deg) !important;
          opacity: 0 !important;
          transition:
            transform 0.38s cubic-bezier(0.4, 0, 1, 1),
            opacity 0.3s ease !important;
        }

        .fb-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          pointer-events: none;
        }

        .fb-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            transparent 40%,
            rgba(11, 47, 56, 0.45) 75%,
            rgba(11, 47, 56, 0.78) 100%
          );
        }

        .fb-card-info {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 28px 28px 24px;
        }
        .fb-card-name {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: 26px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.96);
          margin: 0 0 5px;
          line-height: 1.1;
        }
        .fb-card-role {
          font-size: 12px;
          font-weight: 600;
          color: rgba(216, 219, 226, 0.75);
          letter-spacing: 0.04em;
          margin: 0;
        }

        .fb-card-plus {
          position: absolute;
          top: 18px;
          right: 18px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.92);
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 2px 12px rgba(11, 47, 56, 0.12);
          transition: background 0.2s ease, transform 0.2s ease;
          z-index: 5;
        }
        .fb-card-plus:hover {
          background: #fff;
          transform: scale(1.08);
        }

        .fb-info-panel {
          padding-left: 72px;
          padding-top: clamp(8px, 1.5vw, 20px);
          max-width: 520px;
          flex: 1;
        }
        .fb-info-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(11, 47, 56, 0.55);
          margin-bottom: 16px;
        }
        .fb-info-eyebrow-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--nav, #58a4b0);
        }

        .fb-info-h3 {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: clamp(1.35rem, 2.8vw, 1.85rem);
          font-weight: 500;
          font-style: italic;
          color: var(--ink, #0b2f38);
          line-height: 1.35;
          margin: 0 0 28px;
          max-width: 420px;
        }

        .fb-info-quote {
          font-size: 15px;
          color: rgba(11, 47, 56, 0.68);
          line-height: 1.75;
          margin: 0 0 36px;
          max-width: 400px;
          min-height: 52px;
          transition: opacity 0.3s ease;
        }

        .fb-dots {
          display: flex;
          gap: 8px;
          align-items: center;
          margin-bottom: 28px;
        }
        .fb-dot {
          height: 3px;
          border-radius: 2px;
          background: rgba(11, 47, 56, 0.14);
          cursor: pointer;
          border: none;
          padding: 0;
          transition: all 0.35s ease;
        }
        .fb-dot--active {
          width: 28px;
          background: var(--nav, #58a4b0);
        }
        .fb-dot:not(.fb-dot--active) { width: 10px; }

        .fb-counter {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 15px;
          letter-spacing: 2px;
          color: rgba(11, 47, 56, 0.32);
        }
        .fb-counter strong {
          color: var(--ink, #0b2f38);
          font-size: 20px;
        }

        @media (max-width: 860px) {
          .fb-section {
            margin-left: -1rem;
            margin-right: -1rem;
            width: calc(100% + 2rem);
            min-height: auto;
            padding-bottom: 2rem;
          }
          .fb-meta {
            white-space: normal;
            max-width: min(160px, 42vw);
            line-height: 1.35;
            text-align: right;
          }
          .fb-meta--tl {
            text-align: left;
            max-width: min(160px, 42vw);
          }
          .fb-inner {
            flex-direction: column;
            align-items: center;
            gap: 28px;
          }
          .fb-info-panel {
            padding-left: 0;
            padding-top: 0;
            text-align: center;
            max-width: 100%;
          }
          .fb-info-h3,
          .fb-info-quote {
            margin-left: auto;
            margin-right: auto;
          }
          .fb-dots { justify-content: center; }
          .fb-arrow { display: none; }
          .fb-stack {
            width: 320px;
            height: 440px;
            margin: 12px 0 0;
            transform: translateY(-20px);
          }
        }
      `}</style>

      <section className="fb-section" aria-labelledby="feedback-heading">
        <span className="fb-meta fb-meta--tl" aria-hidden="true">
          © Brand Partners パートナー
        </span>
        <span className="fb-meta fb-meta--br" aria-hidden="true">
          © Brand Partners パートナー
        </span>

        <div className="fb-watermark" aria-hidden="true">
          <span>CLIENT</span>
          <span>FEEDBACK</span>
        </div>

        <button type="button" className="fb-arrow fb-arrow-prev" onClick={() => go('prev')} aria-label="Previous testimonial">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M10 3L5 8L10 13"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="fb-inner">
          <div className="fb-stack" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
            {deck.map(({ id, name, role, img, deckPos }) => {
              const isActive = deckPos === 0
              const isExiting = animating && isActive
              const exitClass =
                isExiting && direction === 'next'
                  ? 'fb-card--exit-next'
                  : isExiting && direction === 'prev'
                    ? 'fb-card--exit-prev'
                    : ''

              return (
                <div key={`${id}-${deckPos}`} className={`fb-card ${exitClass}`} data-pos={deckPos}>
                  <img src={img} alt="" className="fb-card-img" draggable={false} />
                  <div className="fb-card-overlay" aria-hidden="true" />

                  {isActive && (
                    <>
                      <div className="fb-card-info">
                        <p className="fb-card-name">{name}</p>
                        <p className="fb-card-role">{role}</p>
                      </div>
                      <button type="button" className="fb-card-plus" aria-label="Expand testimonial" tabIndex={-1}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                          <path
                            d="M8 3v10M3 8h10"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                          />
                        </svg>
                      </button>
                    </>
                  )}
                </div>
              )
            })}
          </div>

          <div className="fb-info-panel">
            <div className="fb-info-eyebrow">
              <span className="fb-info-eyebrow-dot" />
              Client feedback
            </div>

            <h3 id="feedback-heading" className="fb-info-h3">
              What my clients say about me
            </h3>

            <p className="fb-info-quote" key={active}>
              {FEEDBACK[active].quote}
            </p>

            <div className="fb-dots" role="tablist" aria-label="Choose testimonial">
              {FEEDBACK.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  className={`fb-dot${i === active ? ' fb-dot--active' : ''}`}
                  onClick={() => goToIndex(i)}
                  aria-label={`Show testimonial from ${item.name}`}
                />
              ))}
            </div>

            <div className="fb-counter" aria-live="polite">
              <strong>{String(active + 1).padStart(2, '0')}</strong>
              &nbsp;/&nbsp;{String(FEEDBACK.length).padStart(2, '0')}
            </div>
          </div>
        </div>

        <button type="button" className="fb-arrow fb-arrow-next" onClick={() => go('next')} aria-label="Next testimonial">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M6 3L11 8L6 13"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </section>
    </>
  )
}
