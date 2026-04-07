import { useMemo, useRef, useState, useEffect } from 'react'
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion'
import styled from 'styled-components'

const Section = styled.section`
  width: 100%;
  background: #000;
  padding: 0 0 140px;
  overflow: clip;
  position: relative;
`

const Meta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 48px 14px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 20px;
  position: relative;
  z-index: 2;
`

const MetaText = styled.span`
  font-size: 10px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.35);
  font-family: 'DM Sans', system-ui, sans-serif;
`

const Stage = styled(motion.div)`
  position: sticky;
  top: 20px;
  width: min(1800px, calc(100% - 32px));
  margin: 0 auto;
  height: 640px;
  perspective: 1900px;
  perspective-origin: 50% 50%;
  overflow: visible;
  z-index: 1;
`

const Track = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  pointer-events: none;
`

const Card = styled(motion.article)`
  position: absolute;
  left: 50%;
  top: 50%;
  border-radius: 18px;
  overflow: hidden;
  will-change: transform, opacity;
  transform-style: preserve-3d;
  transform-origin: center center;
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.38);

  video,
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    pointer-events: none;
  }
`

const CardLabel = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 24px;
  font-weight: 400;
  color: #fff;
  letter-spacing: 0.06em;
  text-shadow: 0 1px 12px rgba(0, 0, 0, 0.4);
  pointer-events: none;
`

/* Canvas sits behind everything, covers the whole section */
const StarCanvas = styled.canvas`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
`

const VIDEO_BG = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'
const CARD_SIZE_MULT = 1.1

const CARDS = [
  { key: 'c1', type: 'video', width: 380, height: 250, label: 'Cairo.' },
  { key: 'c2', type: 'photo', width: 340, height: 420, label: 'Manila.', img: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80' },
  { key: 'c3', type: 'photo', width: 420, height: 280, label: 'Them.', img: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80' },
  { key: 'c4', type: 'video', width: 360, height: 240, label: 'Oslo.' },
  { key: 'c5', type: 'photo', width: 360, height: 320, label: 'Chain.', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80' },
  {
    key: 'c6',
    type: 'photo',
    width: 320,
    height: 260,
    label: 'Oleo.',
    img: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?fm=jpg&auto=format&fit=crop&w=900&q=80',
  },
]

/* ── Star field config ───────────────────────────────── */
const STAR_COUNT = 340

function buildStars(w, h) {
  return Array.from({ length: STAR_COUNT }, () => {
    // Gaussian-ish concentration toward centre using Box-Muller
    const u = 1 - Math.random()
    const v = 1 - Math.random()
    const mag = Math.sqrt(-2 * Math.log(u))
    const angle = 2 * Math.PI * v
    // σ tuned so most stars sit within ~35% of canvas width from centre
    const σx = w * 0.28
    const σy = h * 0.38
    const cx = w / 2 + mag * Math.cos(angle) * σx
    const cy = h / 2 + mag * Math.sin(angle) * σy

    return {
      x: Math.max(0, Math.min(w, cx)),
      y: Math.max(0, Math.min(h, cy)),
      baseRadius: 0.4 + Math.random() * 1.1,
      // phase offset so twinkles are not synchronised
      phase: Math.random() * Math.PI * 2,
      // twinkle speed — mix of slow and fast
      speed: 0.4 + Math.random() * 1.6,
      // base opacity weighted toward centre (already handled by distribution)
      baseOpacity: 0.35 + Math.random() * 0.55,
      // occasional "spike" star
      spike: Math.random() < 0.12,
    }
  })
}

function drawStar(ctx, x, y, r, opacity, spike) {
  if (spike) {
    // Four-pointed cross — Rolls-Royce headliner style
    ctx.save()
    ctx.globalAlpha = opacity
    ctx.strokeStyle = '#ffffff'
    const arm = r * 4.5
    const thin = r * 0.18

    ctx.beginPath()
    ctx.moveTo(x, y - arm)
    ctx.lineTo(x + thin, y - thin)
    ctx.lineTo(x + arm, y)
    ctx.lineTo(x + thin, y + thin)
    ctx.lineTo(x, y + arm)
    ctx.lineTo(x - thin, y + thin)
    ctx.lineTo(x - arm, y)
    ctx.lineTo(x - thin, y - thin)
    ctx.closePath()
    ctx.lineWidth = 0
    ctx.fillStyle = '#ffffff'
    ctx.fill()

    // soft glow behind spike
    const glow = ctx.createRadialGradient(x, y, 0, x, y, arm * 1.1)
    glow.addColorStop(0, `rgba(220,230,255,${opacity * 0.5})`)
    glow.addColorStop(1, 'rgba(220,230,255,0)')
    ctx.fillStyle = glow
    ctx.beginPath()
    ctx.arc(x, y, arm * 1.1, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  } else {
    // plain dot with a tiny glow
    ctx.save()
    ctx.globalAlpha = opacity
    const grad = ctx.createRadialGradient(x, y, 0, x, y, r * 2.8)
    grad.addColorStop(0, 'rgba(255,255,255,1)')
    grad.addColorStop(0.4, 'rgba(200,215,255,0.6)')
    grad.addColorStop(1, 'rgba(200,215,255,0)')
    ctx.fillStyle = grad
    ctx.beginPath()
    ctx.arc(x, y, r * 2.8, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }
}

/* ── StarField component ─────────────────────────────── */
function StarField({ spinSpeed }) {
  const canvasRef = useRef(null)
  const starsRef = useRef([])
  const rafRef = useRef(null)
  const tRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resize = () => {
      const section = canvas.parentElement
      canvas.width = section.offsetWidth
      canvas.height = section.offsetHeight
      starsRef.current = buildStars(canvas.width, canvas.height)
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas.parentElement)

    const ctx = canvas.getContext('2d')

    const tick = (ts) => {
      tRef.current = ts / 1000
      const t = tRef.current
      const speed = spinSpeed.current ?? 0

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      starsRef.current.forEach((star) => {
        // Twinkle — sine wave modulated by carousel motion speed
        const motion = Math.min(1, Math.abs(speed) / 2.5)
        const twinkleAmp = 0.18 + motion * 0.42
        const twinkle = Math.sin(t * star.speed + star.phase)
        const opacity = Math.max(0, star.baseOpacity + twinkle * twinkleAmp)
        // Radius pulses slightly with motion
        const r = star.baseRadius * (1 + motion * 0.35 * ((twinkle + 1) / 2))
        drawStar(ctx, star.x, star.y, r, opacity, star.spike)
      })

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
    }
  }, [spinSpeed])

  return <StarCanvas ref={canvasRef} aria-hidden="true" />
}

/* ── Main component ──────────────────────────────────── */
export default function ClientsScroll() {
  const sectionRef = useRef(null)
  const [spinAngle, setSpinAngle] = useState(0)
  const spinSpeedRef = useRef(0)
  const prevSpinRef = useRef(0)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const scrollEase = (p) => Math.pow(Math.min(1, Math.max(0, p)), 1.22)

  const spinRaw = useTransform(scrollYProgress, (p) => 378 * scrollEase(p))
  const spin = useSpring(spinRaw, { stiffness: 46, damping: 30, mass: 0.95 })
  const diagonalY = useTransform(scrollYProgress, (p) => -25.2 + scrollEase(p) * 50.4)
  const diagonalYSpring = useSpring(diagonalY, { stiffness: 46, damping: 30, mass: 0.95 })

  useMotionValueEvent(spin, 'change', (v) => {
    // track velocity for star twinkle modulation
    spinSpeedRef.current = v - prevSpinRef.current
    prevSpinRef.current = v
    setSpinAngle(v)
  })

  const STEP = 360 / CARDS.length
  const RADIUS = 616
  const ROT_MAX = 28
  const SCALE_EDGE = 0.72
  const DIAGONAL = 0.18

  const modeledCards = useMemo(
    () =>
      CARDS.map((card, index) => {
        const theta = STEP * index + spinAngle
        const rad = (theta * Math.PI) / 180
        const x = Math.sin(rad) * RADIUS
        const depth = Math.max(0, Math.cos(rad))
        const scale = SCALE_EDGE + (1 - SCALE_EDGE) * depth
        const opacity = 0.4 + 0.6 * depth
        const rotY = -Math.sin(rad) * ROT_MAX
        const y = x * DIAGONAL
        const z = 60 * depth

        return {
          ...card,
          transform: `translate(-50%, -50%) translate3d(${x}px, ${y}px, ${z}px) rotateY(${rotY}deg) scale(${scale})`,
          opacity,
        }
      }),
    [STEP, spinAngle]
  )

  return (
    <Section ref={sectionRef} aria-label="Brand Partners carousel">
      {/* Star field — purely decorative, z-index 0 */}
      <StarField spinSpeed={spinSpeedRef} />

      <Meta>
        <MetaText>© Brand Partners パートナー</MetaText>
        <MetaText>(WDX® — 08)</MetaText>
        <MetaText>Creative Teams</MetaText>
      </Meta>

      <Stage style={{ y: diagonalYSpring }}>
        <Track>
          {modeledCards.map((card) => (
            <Card
              key={card.key}
              style={{
                width: card.width * CARD_SIZE_MULT,
                height: card.height * CARD_SIZE_MULT,
                transform: card.transform,
                opacity: card.opacity,
              }}
            >
              {card.type === 'video' ? (
                <video src={VIDEO_BG} autoPlay muted loop playsInline />
              ) : (
                <img src={card.img} alt="" loading="lazy" />
              )}
              <CardLabel>{card.label}</CardLabel>
            </Card>
          ))}
        </Track>
      </Stage>
    </Section>
  )
}