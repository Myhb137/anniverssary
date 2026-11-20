import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Heart } from 'lucide-react'

function Flame({ lit, smoke, delay = 0 }: { lit: boolean; smoke: boolean; delay?: number }) {
  return (
    <div className="flame-anchor" style={{ '--delay': `${delay}s` } as React.CSSProperties}>
      <AnimatePresence>
        {lit && (
          <motion.div
            className="flame"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: [1, 1.15, 0], y: -5, filter: 'blur(4px)' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <span />
          </motion.div>
        )}
      </AnimatePresence>
      {smoke && (
        <div className="smoke" aria-hidden="true">
          <i /><i /><i /><i />
        </div>
      )}
    </div>
  )
}

function StarField() {
  return (
    <div className="star-field" aria-hidden="true">
      {Array.from({ length: 38 }, (_, index) => (
        <i
          key={index}
          style={{
            '--x': `${(index * 37) % 101}%`,
            '--y': `${(index * 61) % 97}%`,
            '--s': `${index % 5 === 0 ? 2 : 1}px`,
            '--d': `${2.8 + (index % 7) * 0.45}s`,
            '--o': `${0.15 + (index % 4) * 0.1}`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  )
}

function MagicParticles({ active }: { active: boolean }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div className="magic-particles" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          {Array.from({ length: 24 }, (_, index) => (
            <i
              key={index}
              style={{
                '--angle': `${index * 15}deg`,
                '--distance': `${90 + (index % 5) * 28}px`,
                '--delay': `${(index % 6) * 0.06}s`,
              } as React.CSSProperties}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function FloatingHearts() {
  return (
    <div className="floating-hearts" aria-hidden="true">
      {Array.from({ length: 8 }, (_, index) => (
        <Heart
          key={index}
          size={index % 3 === 0 ? 10 : 7}
          fill="currentColor"
          style={{
            '--heart-x': `${8 + ((index * 29) % 84)}%`,
            '--heart-delay': `${index * 1.7}s`,
            '--heart-duration': `${11 + (index % 4) * 2}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  )
}

export default function App() {
  const [candlesLit, setCandlesLit] = useState(false)
  const [wished, setWished] = useState(false)
  const [messageVisible, setMessageVisible] = useState(false)
  const [finalVisible, setFinalVisible] = useState(false)
  const finalSection = useRef<HTMLElement | null>(null)

  const lightCandles = () => {
    if (candlesLit || wished) return
    setCandlesLit(true)
  }

  const makeWish = () => {
    if (!candlesLit || wished) return
    setCandlesLit(false)
    setWished(true)
    window.setTimeout(() => setMessageVisible(true), 2800)
    window.setTimeout(() => setFinalVisible(true), 4300)
  }

  return (
    <main>
      <section className={`hero ${wished ? 'wish-made' : ''}`}>
        <StarField />
        <FloatingHearts />
        <div className="ambient-orb" aria-hidden="true" />
        <nav className="topbar">
          <a className="monogram" href="#beginning" aria-label="Mohamed and Aya home">M<span>×</span>A</a>
          <div className="identity">
            <span>Mohamed Yahia &amp; Aya</span>
            <i />
            <span>21 · 11 · 2024</span>
          </div>
        </nav>

        <div className="hero-copy">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }} className="eyebrow">
            Our second chapter
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
          >
            Two years. Countless memories.<br /><em>One story.</em>
          </motion.h1>
          <div className="date-ribbon" aria-label="Since November 21, 2024">
            <span>Since</span>
            <b>21 · 11 · 2024</b>
          </div>
        </div>

        <motion.button
          className="cake-stage"
          onClick={candlesLit ? makeWish : lightCandles}
          disabled={wished}
          aria-label={wished ? 'The candles are extinguished' : candlesLit ? 'Make a wish and blow out the candles' : 'Light the candles first'}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, delay: 0.35 }}
        >
          <div className="cake-orbit" aria-hidden="true">
            <i /><i /><i />
          </div>
          <div className="cake-halo" />
          <img src="public/assets/anniversary-cake.png" alt="An elegant ivory anniversary cake with two candles" />
          <div className="flame-position flame-left"><Flame lit={candlesLit} smoke={wished} /></div>
          <div className="flame-position flame-right"><Flame lit={candlesLit} smoke={wished} delay={0.3} /></div>
          <MagicParticles active={wished && !messageVisible} />
          <AnimatePresence>
            {!candlesLit && !wished && (
              <motion.span
                className="light-tag"
                initial={{ opacity: 0, x: 12, rotate: -2 }}
                animate={{ opacity: 1, x: 0, rotate: -2 }}
                exit={{ opacity: 0, y: -8 }}
                onClick={(event) => {
                  event.stopPropagation()
                  lightCandles()
                }}
              >
                <i aria-hidden="true" />
                <b>First, light the candles</b>
                <small>Tap to begin our moment</small>
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        <div className="lower-copy">
          <AnimatePresence mode="wait">
            {!messageVisible ? (
              <motion.div key="initial" exit={{ opacity: 0, y: 8, filter: 'blur(4px)' }} transition={{ duration: 0.7 }}>
                <p className="anniversary-line">Happy 2nd Anniversary, Mohamed &amp; Aya <Heart size={14} fill="currentColor" /></p>
                <button className="wish-button" onClick={candlesLit ? makeWish : lightCandles} disabled={wished}>
                  <span>{wished ? 'Your wish is on its way' : candlesLit ? 'Make a wish' : 'Light the candles'}</span>
                </button>
                <small>{wished ? 'A little magic takes time...' : candlesLit ? 'Make a wish... then blow out the candles.' : 'Every story deserves a little light.'}</small>
              </motion.div>
            ) : (
              <motion.div
                key="message"
                className="reveal-message"
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
              >
                <h2>Two years down, <em>forever to go.</em></h2>
                <p>And if I had to choose again, I’d still choose you.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {finalVisible && (
            <motion.button
              className="continue-button"
              onClick={() => finalSection.current?.scrollIntoView({ behavior: 'smooth' })}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <span>Continue our story</span><ChevronDown size={16} />
            </motion.button>
          )}
        </AnimatePresence>
      </section>

      <AnimatePresence>
        {finalVisible && (
          <motion.section
            id="beginning"
            ref={finalSection}
            className="forever-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            <StarField />
            <div className="forever-card">
              <p className="eyebrow">The day our story began</p>
              <h2>21.11.2024 <span>—</span> <b>∞</b></h2>
              <div className="gold-thread"><i /></div>
              <blockquote>
                “Some things don’t need a logical explanation.<br />
                Some things are simply meant to be lived.”
              </blockquote>
              <p className="signature">Where <em>Logic</em> Meets <em>Life.</em></p>
              <p className="couple-signature">Mohamed Yahia <span>&amp;</span> Aya</p>
              <div className="closing-mark">
                <Heart size={12} fill="currentColor" />
                <span>Two years, and every tomorrow</span>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  )
}
