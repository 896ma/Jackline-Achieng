import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import '@fortawesome/fontawesome-free/css/all.min.css'

const HERO_FOOTER_BG = `
  radial-gradient(
      ellipse 80% 60% at 70% 20%,
      rgba(88, 164, 176, 0.25),
      transparent 55%
    ),
    radial-gradient(
      ellipse 50% 40% at 10% 80%,
      rgba(216, 219, 226, 0.25),
      transparent 50%
    ),
    linear-gradient(
      130deg,
      rgba(88, 164, 176, 0.45) 0%,
      rgba(169, 188, 208, 1) 55%,
      rgba(216, 219, 226, 0.65) 120%
    )
`

const FooterSection = styled.footer`
  --footer-ink: var(--ink);
  background: ${HERO_FOOTER_BG};
  color: var(--footer-ink);
  position: relative;
  font-family: 'DM Sans', sans-serif;
  margin-top: 0;
  padding-bottom: clamp(1.35rem, 3vw, 2.35rem);

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    width: 32px;
    height: 32px;
    background: var(--nav);
    pointer-events: none;
    z-index: 1;
  }
  &::before {
    left: 0;
    border-bottom-right-radius: 32px;
  }
  &::after {
    right: 0;
    border-bottom-left-radius: 32px;
  }
`

const TopRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: start;
  padding: 3.5rem 3rem 2rem;
  border-bottom: 1px solid rgba(11, 47, 56, 0.12);
  gap: 2rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
    padding: 2.5rem 2rem 1.5rem;
  }

  @media (max-width: 580px) {
    grid-template-columns: 1fr;
    padding: 2rem 1.5rem 1.5rem;
    gap: 1.5rem;
  }
`

const BrandBlock = styled.div``

const BrandName = styled.h2`
  font-size: clamp(2rem, 3.5vw, 2.8rem);
  font-weight: 800;
  color: var(--footer-ink);
  margin: 0 0 0.4rem;
  letter-spacing: -0.5px;
  line-height: 1;
`

const BrandAddress = styled.p`
  font-size: 0.82rem;
  color: var(--footer-ink);
  margin: 0;
  letter-spacing: 0.2px;
`

const TaglineBlock = styled.div`
  display: flex;
  align-items: flex-start;
  padding-top: 0.2rem;

  @media (max-width: 580px) {
    padding-top: 0;
  }
`

const Tagline = styled.p`
  font-size: 0.95rem;
  color: var(--footer-ink);
  line-height: 1.6;
  margin: 0;
  max-width: 280px;
`

const SocialBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1rem;

  @media (max-width: 900px) {
    align-items: flex-start;
  }
`

const SocialRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: 1.35rem;

  @media (max-width: 900px) {
    justify-content: flex-start;
  }
`

const SocialLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;
  border: none;
  background: transparent;
  color: var(--footer-ink);
  font-size: 1.4rem;
  line-height: 1;
  text-decoration: none;
  opacity: 0.88;
  transition: opacity 0.2s ease, color 0.2s ease;

  &:hover {
    opacity: 1;
    color: var(--nav);
  }

  &:focus-visible {
    outline: 2px solid var(--nav);
    outline-offset: 4px;
    border-radius: 4px;
  }
`

const BottomRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: start;
  padding: 2rem 3rem 2rem;
  gap: 2rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
    padding: 1.5rem 2rem;
  }

  @media (max-width: 580px) {
    grid-template-columns: 1fr 1fr;
    padding: 1.5rem;
    gap: 1.2rem;
  }
`

const NavColumn = styled.div``

const ColLabel = styled.p`
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--footer-ink);
  margin: 0 0 0.9rem;
`

const NavList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
`

const NavItem = styled(Link)`
  font-size: 1rem;
  font-weight: 600;
  color: var(--footer-ink);
  text-decoration: none;
  transition: opacity 0.2s ease;
  line-height: 1.3;

  &:hover {
    opacity: 0.82;
    text-decoration: underline;
  }
`

const LegalText = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: var(--footer-ink);
  line-height: 1.3;
  cursor: default;
  user-select: none;
`

const CopyrightBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  height: 100%;
  padding-top: 1rem;

  @media (max-width: 900px) {
    align-items: flex-start;
    grid-column: span 2;
    padding-top: 0.5rem;
  }

  @media (max-width: 580px) {
    grid-column: span 2;
  }
`

const Copyright = styled.p`
  font-size: 0.78rem;
  color: var(--footer-ink);
  margin: 0;
  text-align: right;

  @media (max-width: 900px) {
    text-align: left;
  }
`

const WatermarkStatic = styled.div`
  overflow: hidden;
  width: 100%;
  border-top: 1px solid rgba(11, 47, 56, 0.1);
  padding-bottom: clamp(0.85rem, 2vw, 1.5rem);
`

const WatermarkText = styled.span`
  display: block;
  font-size: clamp(80px, 13vw, 180px);
  font-weight: 900;
  color: var(--footer-ink);
  white-space: nowrap;
  letter-spacing: -3px;
  line-height: 0.92;
  padding: 0.35rem 1.5rem 0.5rem;
  font-family: 'DM Sans', sans-serif;
  user-select: none;
  text-align: center;
`

const Footer = () => {
  return (
    <FooterSection>
      <TopRow>
        <BrandBlock>
          <BrandName><i>sales & marketing consultant</i></BrandName>
          <BrandAddress>Nairobi, Kenya</BrandAddress>
        </BrandBlock>

        <TaglineBlock>
          <Tagline>
            We&apos;re a cutting-edge tech lab bridging the gap between consumers and technology
            through bold, scalable solutions.
          </Tagline>
        </TaglineBlock>

        <SocialBlock>
          <ColLabel>Connect</ColLabel>
          <SocialRow>
            <SocialLink
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
            >
              <i className="fa-brands fa-x-twitter" aria-hidden="true" />
            </SocialLink>
            <SocialLink
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <i className="fa-brands fa-linkedin-in" aria-hidden="true" />
            </SocialLink>
            <SocialLink
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <i className="fa-brands fa-facebook-f" aria-hidden="true" />
            </SocialLink>
            <SocialLink
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <i className="fa-brands fa-instagram" aria-hidden="true" />
            </SocialLink>
          </SocialRow>
        </SocialBlock>
      </TopRow>

      <BottomRow>
        <NavColumn>
          <ColLabel>Pages</ColLabel>
          <NavList>
            <NavItem to="/">Home</NavItem>
            <NavItem to="/services">My Services</NavItem>
            <NavItem to="/contact">Contact</NavItem>
          </NavList>
        </NavColumn>

        <NavColumn>
          <ColLabel>Legal</ColLabel>
          <NavList>
            <LegalText>Privacy Policy.</LegalText>
            <LegalText>Terms &amp; Conditions.</LegalText>
          </NavList>
        </NavColumn>

        <CopyrightBlock>
          <Copyright>© 2026 Jackline Achieng. All rights reserved</Copyright>
        </CopyrightBlock>
      </BottomRow>

      <WatermarkStatic>
        <WatermarkText>Jackline Achieng</WatermarkText>
      </WatermarkStatic>
    </FooterSection>
  )
}

export default Footer
