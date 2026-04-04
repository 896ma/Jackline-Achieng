const LOGOS = [
  {
    key: 'theo',
    className: 'client-logo-marquee__item client-logo-marquee__item--theo',
    node: <span className="client-logo-marquee__theo">theo</span>,
  },
  {
    key: 'amsterdam',
    className: 'client-logo-marquee__item client-logo-marquee__item--amsterdam',
    node: (
      <>
        <svg
          className="client-logo-marquee__ams-icon"
          width="22"
          height="10"
          viewBox="0 0 22 10"
          aria-hidden="true"
        >
          <rect
            x="1"
            y="1"
            width="20"
            height="8"
            rx="4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.35"
          />
        </svg>
        <span className="client-logo-marquee__ams-text">Amsterdam</span>
      </>
    ),
  },
  {
    key: 'milano',
    className: 'client-logo-marquee__item client-logo-marquee__item--milano',
    node: (
      <>
        <span className="client-logo-marquee__milano-mark" aria-hidden="true">
          M
        </span>
        <span className="client-logo-marquee__milano-word">MILANO</span>
      </>
    ),
  },
  {
    key: 'venice',
    className: 'client-logo-marquee__item client-logo-marquee__item--venice',
    node: <span className="client-logo-marquee__venice">venice.</span>,
  },
]

const COPIES = 4

function LogoRow({ prefix }) {
  return (
    <>
      {Array.from({ length: COPIES }, (_, cycle) =>
        LOGOS.map((logo) => (
          <span key={`${prefix}-${cycle}-${logo.key}`} className={logo.className}>
            {logo.node}
          </span>
        )),
      ).flat()}
    </>
  )
}

export default function ClientLogoMarquee() {
  return (
    <div className="client-logo-marquee" aria-labelledby="client-logo-marquee-heading">
      <p id="client-logo-marquee-heading" className="sr-only">
        Selected clients and partners
      </p>
      <div className="client-logo-marquee__shell">
        <div className="client-logo-marquee__viewport" aria-hidden="true">
          <div className="client-logo-marquee__track">
            <div className="client-logo-marquee__group">
              <LogoRow prefix="a" />
            </div>
            <div className="client-logo-marquee__group client-logo-marquee__group--dup">
              <LogoRow prefix="b" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
