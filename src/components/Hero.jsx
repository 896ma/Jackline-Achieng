import { Link } from 'react-router-dom'
import ClientLogoMarquee from './ClientLogoMarquee'

const IMG_PRIMARY =
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80'
const IMG_SECONDARY =
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=900&q=80'

function Hero() {
  return (
    <section className="viper-hero" aria-label="Introduction">
      <div className="viper-hero__grid">
        <div className="viper-hero__copy">
          <p className="viper-hero__year">©2026</p>

          <h1 className="viper-hero__title">
            Jackline
            <span className="viper-hero__asterisk" aria-hidden="true">
              
            </span>
          </h1>

          <p className="viper-hero__lead">
            Hi, I am Jackline — I&apos;m a digital designer and creative technologist with over a
            decade of experience shaping brands and interfaces people love.
          </p>

          <p className="viper-hero__intro-label">Hey, Just An Intro</p>

          <p className="viper-hero__body">
            A designer based in Nairobi, passionate about creating immersive visual experiences.
            From crisp layouts to motion and interaction — every detail is built to tell your
            story.
          </p>

          <Link className="viper-hero__cta" to="/contact">
            Get in touch
          </Link>
        </div>

        <div className="viper-hero__visual" aria-hidden="true">
          <div className="viper-hero__frame viper-hero__frame--back">
            <img
              src={IMG_SECONDARY}
              alt=""
              width={560}
              height={700}
              className="viper-hero__img"
            />
          </div>
          <div className="viper-hero__frame viper-hero__frame--front">
            <img
              src={IMG_PRIMARY}
              alt=""
              width={640}
              height={800}
              className="viper-hero__img"
            />
          </div>
        </div>
      </div>

      <ClientLogoMarquee />
    </section>
  )
}

export default Hero
