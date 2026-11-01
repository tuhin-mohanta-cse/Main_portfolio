import { hero } from '../data/personal'

function Band({ items, reverse = false, tone = 'ink' }) {
  const row = [...items, ...items, ...items]
  return (
    <div className={`marquee__band marquee__band--${tone} ${reverse ? 'is-reverse' : ''}`}>
      <div className="marquee__track">
        {[0, 1].map((copy) => (
          <div className="marquee__group" key={copy}>
            {row.map((item, i) => (
              <span className="marquee__item" key={`${copy}-${i}`}>
                {item}
                <span className="marquee__sep" aria-hidden="true">
                  ✦
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

/** Two crossing tilted ticker bands — an idea carried over from the second portfolio. */
export default function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <Band items={hero.marquee} tone="lime" reverse />
      <Band items={[...hero.marquee].reverse()} tone="ink" />
    </div>
  )
}
