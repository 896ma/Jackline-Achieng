const PHRASE = 'YOUR ONE STOP FOR SALES & MARKETING CONSULTANCY'
const REPEAT = 6

function MarqueeGroup({ id }) {
  return (
    <>
      {Array.from({ length: REPEAT }, (_, i) => (
        <span key={`${id}-${i}`} className="consultancy-marquee__chunk">
          <span className="consultancy-marquee__text">{PHRASE}</span>
          <span className="consultancy-marquee__sep" aria-hidden="true">
            {' © '}
          </span>
        </span>
      ))}
    </>
  )
}

export default function ConsultancyMarquee() {
  return (
    <section className="consultancy-marquee" aria-labelledby="consultancy-marquee-heading">
      <h2 id="consultancy-marquee-heading" className="sr-only">
        {PHRASE}
      </h2>
      <div className="consultancy-marquee__viewport" aria-hidden="true">
        <div className="consultancy-marquee__track">
          <div className="consultancy-marquee__group">
            <MarqueeGroup id="a" />
          </div>
          <div className="consultancy-marquee__group consultancy-marquee__group--dup">
            <MarqueeGroup id="b" />
          </div>
        </div>
      </div>
    </section>
  )
}
