import { useMemo, useRef, useState } from 'react'
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion'
import styled from 'styled-components'

const Section = styled.section`
  width: 100%;
  background: #000;
  padding: 0 0 140px;
  overflow: clip;
`

const Meta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 48px 14px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 20px;
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

const VIDEO_BG = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'

/** Visual size multiplier for card shells (media + label). */
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

export default function ClientsScroll() {
  const sectionRef = useRef(null)
  const [spinAngle, setSpinAngle] = useState(0)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const spinRaw = useTransform(scrollYProgress, [0, 1], [0, 378])
  const spin = useSpring(spinRaw, { stiffness: 81, damping: 24, mass: 0.55 })
  const diagonalY = useTransform(scrollYProgress, [0, 1], [-25.2, 25.2])

  useMotionValueEvent(spin, 'change', (v) => setSpinAngle(v))

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
    [spinAngle]
  )

  return (
    <Section ref={sectionRef} aria-label="Brand Partners carousel">
      <Meta>
        <MetaText>© Brand Partners パートナー</MetaText>
        <MetaText>(WDX® — 08)</MetaText>
        <MetaText>Creative Teams</MetaText>
      </Meta>

      <Stage style={{ y: diagonalY }}>
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

