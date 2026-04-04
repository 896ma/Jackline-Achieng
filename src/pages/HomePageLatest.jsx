import ConsultancyMarquee from '../components/ConsultancyMarquee'
import Hero from '../components/Hero'
import ClientsScroll from './ClientsScroll'
import Testimonials from './Testimonials'

export default function HomePageLatest() {
  return (
    <div className="home-page home-stack">
      <div className="home-stack__pin">
        <Hero />
      </div>

      <div className="home-stack__layers">
        <ClientsScroll />
        <ConsultancyMarquee />
        <Testimonials />
      </div>
    </div>
  )
}

