import { useState } from 'react'
import { Link } from 'react-router-dom'
import styled, { keyframes, css } from 'styled-components'

/* ── ANIMATIONS ── */
const spinIn = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(135deg); }
`
const spinOut = keyframes`
  from { transform: rotate(135deg); }
  to   { transform: rotate(0deg); }
`
const slideDown = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to   { opacity: 1; transform: translateY(0); }
`

/* ── MISSION ── */
const MissionSection = styled.section`
  padding: 4rem 2rem 2rem;
  @media (max-width: 480px) { padding: 3rem 1rem 1.5rem; }
`

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
`

const MissionBox = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 20px;
  padding: 4rem;
  text-align: center;
  background: #007ea7;
  @media (max-width: 768px) { padding: 3rem 2rem; }
  @media (max-width: 480px) { padding: 2rem 1.5rem; }
`

const MissionLabel = styled.div`
  color: rgba(255, 255, 255, 0.72);
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 3px;
  margin-bottom: 1.5rem;
  font-family: 'DM Sans', sans-serif;
`

const MissionText = styled.h2`
  font-family: 'DM Serif Display', Georgia, serif;
  font-size: clamp(1.6rem, 3.5vw, 2.8rem);
  color: #ffffff;
  font-weight: 400;
  line-height: 1.45;
  margin: 0;
  font-style: italic;
`

/* ── ACCORDION ── */
const AccordionSection = styled.section`
  padding: 2rem 2rem 4rem;
  @media (max-width: 480px) { padding: 1.5rem 1rem 3rem; }
`

const AccordionCard = styled.div`
  max-width: 1320px;
  margin: 0 auto;
  background: #007ea7;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 20px;
  padding: 2rem 2.5rem 1.5rem;
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.2);
`

const AccordionHeader = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 1.2rem;
`

const AccordionLabel = styled.span`
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.55);
  font-family: 'DM Sans', sans-serif;
`

const AccordionCount = styled.span`
  font-family: 'DM Sans', sans-serif;
  font-size: 0.72rem;
  letter-spacing: 2px;
  color: rgba(255, 255, 255, 0.45);
`

const AccordionList = styled.div``

const AccordionItem = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  &:last-child { border-bottom: 1px solid rgba(255, 255, 255, 0.12); }
`

const AccordionTrigger = styled.button`
  width: 100%;
  background: none;
  border: none;
  padding: 0.9rem 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
`

const AccordionThumb = styled.div`
  position: absolute;
  left: 0;
  top: 50%;
  width: 80px;
  height: 50px;
  border-radius: 10px;
  overflow: hidden;
  flex-shrink: 0;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: ${({ $visible }) =>
    $visible ? 'translateY(-50%) translateX(0)' : 'translateY(-50%) translateX(-16px)'};
  transition: opacity 0.35s ease, transform 0.45s cubic-bezier(0.34, 1.1, 0.64, 1);
  pointer-events: none;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  @media (max-width: 600px) {
    width: 64px;
    height: 40px;
    border-radius: 7px;
  }
`

const AccordionTitleWrap = styled.div`
  flex: 1;
  text-align: left;
  transition: transform 0.45s cubic-bezier(0.34, 1.1, 0.64, 1);
  transform: ${({ $thumbVisible }) => ($thumbVisible ? 'translateX(100px)' : 'translateX(0)')};

  @media (max-width: 600px) {
    transform: ${({ $thumbVisible }) =>
      $thumbVisible ? 'translateX(84px)' : 'translateX(0)'};
  }
`

const AccordionTitle = styled.h3`
  font-family: 'DM Sans', sans-serif;
  font-size: clamp(1.4rem, 3vw, 2rem);
  font-weight: 700;
  color: #ffffff;
  letter-spacing: -0.3px;
  margin: 0;
  line-height: 1.1;

  @media (max-width: 600px) { font-size: 1.3rem; }
`

const AccordionNum = styled.span`
  font-family: 'DM Sans', sans-serif;
  font-size: clamp(1rem, 2vw, 1.4rem);
  color: ${({ $active }) => ($active ? '#ffffff' : 'rgba(255,255,255,0.4)')};
  transition: color 0.35s ease;
  margin-left: auto;
  flex-shrink: 0;
  padding-left: 2rem;
  min-width: 2.5rem;
  text-align: right;
`

const RotateIcon = styled.span`
  font-size: 1.5rem;
  font-weight: 300;
  color: #ffffff;
  display: inline-block;
  line-height: 1;
  ${({ $active }) =>
    $active
      ? css`animation: ${spinIn} 0.45s cubic-bezier(0.34, 1.2, 0.64, 1) forwards;`
      : css`animation: ${spinOut} 0.38s cubic-bezier(0.4, 0, 0.6, 1) forwards;`}
`

const AccordionBody = styled.div`
  overflow: hidden;
  max-height: ${({ $open }) => ($open ? '300px' : '0')};
  transition: max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1);
`

const AccordionInner = styled.div`
  padding: 0.4rem 0 1.6rem 0;
  display: flex;
  align-items: flex-start;
  gap: 3rem;
  @media (max-width: 768px) { flex-direction: column; gap: 1rem; }
`

const AccordionDesc = styled.p`
  font-size: 0.88rem;
  font-family: 'DM Sans', sans-serif;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.75;
  max-width: 480px;
  margin: 0;
  animation: ${slideDown} 0.38s ease forwards;
`

const AccordionTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-left: auto;
  animation: ${slideDown} 0.42s ease forwards;
  @media (max-width: 768px) { margin-left: 0; }
`

const Tag = styled.span`
  border: 1px solid rgba(255, 255, 255, 0.28);
  border-radius: 40px;
  padding: 0.3rem 0.9rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: #ffffff;
  background: rgba(255, 255, 255, 0.08);
  white-space: nowrap;
  font-family: 'DM Sans', sans-serif;
`

const PricingBtn = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1.5rem 0 0 0;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 40px;
  padding: 0.55rem 1.3rem;
  font-size: 0.82rem;
  font-weight: 600;
  color: #ffffff;
  background: rgba(255, 255, 255, 0.08);
  text-decoration: none;
  transition: background 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
  font-family: 'DM Sans', sans-serif;
  &:hover {
    background: rgba(255, 255, 255, 0.16);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
`

/* ── DATA ── */
const SERVICES = [
  {
    title: 'Brand Identity',
    img: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&q=80&fit=crop',
    description:
      'We craft logo systems, naming direction, and visual language that positions your brand for market authority — built to scale from day one and resonate with the clients that matter most.',
    tags: ['Logo Design', 'Brand Voice', 'Visual Systems', 'Naming'],
  },
  {
    title: 'Digital Presence',
    img: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&q=80&fit=crop',
    description:
      'Portfolio and business websites engineered for clarity and conversion. Every page is a sales asset — structured to communicate your value proposition and turn visitors into qualified leads.',
    tags: ['Web Design', 'Conversion', 'CMS', 'SEO-Ready'],
  },
  {
    title: 'Creative Strategy',
    img: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&q=80&fit=crop',
    description:
      'From positioning to campaign architecture, we build the strategic roadmap that aligns your creative output with revenue goals — so every touchpoint moves prospects further down the funnel.',
    tags: ['Positioning', 'Go-to-Market', 'Campaign Planning', 'Growth'],
  },
  {
    title: 'UI Optimisation',
    img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=80&fit=crop',
    description:
      'Targeted interface improvements that remove friction, reduce churn, and accelerate user decisions. We audit, redesign, and validate — delivering measurable uplift in engagement and sales outcomes.',
    tags: ['UX Audit', 'Prototyping', 'A/B Testing', 'Figma'],
  },
]

/* ── COMPONENT ── */
function ServicesPage() {
  const [openIndex, setOpenIndex] = useState(null)
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const toggle = (i) => setOpenIndex((prev) => (prev === i ? null : i))

  return (
    <>
      <MissionSection>
        <Container>
          <MissionBox>
            <MissionLabel>My Services</MissionLabel>
            <MissionText>
              Built with precision, delivered with simplicity — results that close.
            </MissionText>
          </MissionBox>
        </Container>
      </MissionSection>

      <AccordionSection>
        <AccordionCard>
          <AccordionHeader>
            <AccordionLabel>/ Services</AccordionLabel>
            <AccordionCount>({String(SERVICES.length).padStart(2, '0')})</AccordionCount>
          </AccordionHeader>

          <AccordionList>
            {SERVICES.map((svc, i) => {
              const isOpen = openIndex === i
              const thumbVisible = hoveredIndex === i || isOpen

              return (
                <AccordionItem key={i}>
                  <AccordionTrigger
                    onClick={() => toggle(i)}
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    aria-expanded={isOpen}
                  >
                    <AccordionThumb $visible={thumbVisible}>
                      <img src={svc.img} alt={svc.title} />
                    </AccordionThumb>

                    <AccordionTitleWrap $thumbVisible={thumbVisible}>
                      <AccordionTitle>{svc.title}</AccordionTitle>
                    </AccordionTitleWrap>

                    <AccordionNum $active={isOpen}>
                      {isOpen ? (
                        <RotateIcon $active={true}>×</RotateIcon>
                      ) : (
                        String(i + 1)
                      )}
                    </AccordionNum>
                  </AccordionTrigger>

                  <AccordionBody $open={isOpen} aria-hidden={!isOpen}>
                    {isOpen && (
                      <AccordionInner>
                        <AccordionDesc>{svc.description}</AccordionDesc>
                        <AccordionTags>
                          {svc.tags.map((t, j) => (
                            <Tag key={j}>{t}</Tag>
                          ))}
                        </AccordionTags>
                      </AccordionInner>
                    )}
                  </AccordionBody>
                </AccordionItem>
              )
            })}
          </AccordionList>

          <PricingBtn to="/contact">Discuss Your Project +</PricingBtn>
        </AccordionCard>
      </AccordionSection>
    </>
  )
}

export default ServicesPage