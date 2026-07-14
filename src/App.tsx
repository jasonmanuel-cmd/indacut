import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    name: 'Haircut',
    price: '$30+',
    duration: '45 min',
    tag: 'Most booked' as const,
    description: 'Precision cut tailored to your style — fade, scissor, or clipper work.',
  },
  {
    name: 'Beard trim',
    price: '$20+',
    duration: '30 min',
    tag: null,
    description: 'Shape, detail, and balance that fits your face.',
  },
  {
    name: 'Hot towel shave',
    price: '$25+',
    duration: '30 min',
    tag: 'Classic' as const,
    description: 'Traditional straight-razor service with hot towel finish.',
  },
  {
    name: 'Head shave',
    price: '$20+',
    duration: '25 min',
    tag: null,
    description: 'Clean, smooth, and done with care.',
  },
  {
    name: 'Line up',
    price: '$10+',
    duration: '15 min',
    tag: 'Walk-in ready' as const,
    description: 'Quick edge-up for a sharper finish. No appointment needed.',
  },
]

const hours = [
  { day: 'Monday', time: '9 AM – 5 PM' },
  { day: 'Tuesday', time: '9 AM – 5 PM' },
  { day: 'Wednesday', time: '9 AM – 5 PM' },
  { day: 'Thursday', time: '9 AM – 5 PM' },
  { day: 'Friday', time: '9 AM – 5 PM' },
  { day: 'Saturday', time: '7 AM – 3 PM' },
  { day: 'Sunday', time: 'Closed' },
]

const reviews = [
  {
    text: 'Aaron always takes care of me. Clean fades, sharp lines, and the shop has a real neighborhood feel. Been coming here for years.',
    name: 'Marcus T.',
    source: 'Google',
  },
  {
    text: "Best barbershop in Bakersfield, hands down. Walked in for the first time and felt like I'd been coming here forever.",
    name: 'Daniel R.',
    source: 'Yelp',
  },
  {
    text: 'Quick, clean, and always on point. The hot towel shave is worth every penny. This place is the real deal.',
    name: 'Jorge L.',
    source: 'Google',
  },
]

const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=600&q=80',
    alt: 'Barber chair and mirrors inside In The Cut',
  },
  {
    src: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=600&q=80',
    alt: 'Precision fade in progress',
  },
  {
    src: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=600&q=80',
    alt: 'Classic barber tools and styling products',
  },
  {
    src: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=600&q=80',
    alt: 'Barber at work on a fresh cut',
  },
  {
    src: 'https://images.unsplash.com/photo-1585747860019-024b90225027?auto=format&fit=crop&w=600&q=80',
    alt: 'Interior of a classic barbershop',
  },
]

function App() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [introPhase, setIntroPhase] = useState<'pole' | 'opening' | 'done'>('pole')
  const sectionsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const poleTimer = setTimeout(() => setIntroPhase('opening'), 2200)
    const doorTimer = setTimeout(() => {
      setIntroPhase('done')
      document.body.style.overflow = ''
    }, 3400)
    return () => {
      clearTimeout(poleTimer)
      clearTimeout(doorTimer)
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    if (introPhase !== 'done') return

    const ctx = gsap.context(() => {
      gsap.from('.heroContent > *', {
        y: 50,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.15,
      })

      gsap.from('.heroImage img', {
        scale: 1.08,
        opacity: 0,
        duration: 1.4,
        ease: 'power3.out',
        delay: 0.3,
      })

      gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 88%',
          once: true,
          onEnter: () => {
            gsap.from(el, {
              y: 40,
              opacity: 0,
              duration: 0.8,
              ease: 'power3.out',
            })
          },
        })
      })

      gsap.utils.toArray<HTMLElement>('.stagger-reveal').forEach((container) => {
        ScrollTrigger.create({
          trigger: container,
          start: 'top 88%',
          once: true,
          onEnter: () => {
            gsap.from(container.children, {
              y: 30,
              opacity: 0,
              duration: 0.7,
              stagger: 0.08,
              ease: 'power3.out',
            })
          },
        })
      })

      gsap.utils.toArray<HTMLElement>('.galleryTrack').forEach((track) => {
        ScrollTrigger.create({
          trigger: track,
          start: 'top 90%',
          once: true,
          onEnter: () => {
            gsap.from(track.children, {
              x: 40,
              opacity: 0,
              duration: 0.7,
              stagger: 0.08,
              ease: 'power3.out',
            })
          },
        })
      })
    }, sectionsRef)

    return () => ctx.revert()
  }, [])

  return (
    <main ref={sectionsRef}>
      {/* ─── INTRO OVERLAY ─── */}
      {introPhase !== 'done' && (
        <div className={`introOverlay ${introPhase === 'opening' ? 'doorsOpen' : ''}`}>
          <div className="door doorLeft">
            <div className="doorPanel">
              <div className="doorWindow" />
              <div className="doorWindow" />
            </div>
          </div>
          <div className="door doorRight">
            <div className="doorPanel">
              <div className="doorWindow" />
              <div className="doorWindow" />
            </div>
          </div>
          <div className="introCenter">
            <div className="barberPole">
              <div className="poleStripe" />
              <div className="poleCap poleCapTop" />
              <div className="poleCap poleCapBottom" />
            </div>
            <div className="introBrand">
              <span className="introMark">ITC</span>
              <span className="introName">In The Cut</span>
              <span className="introSub">Barber Shoppe</span>
            </div>
          </div>
        </div>
      )}

      {/* ─── HEADER ─── */}
      <header className="nav">
        <a className="brand" href="#top" aria-label="In The Cut home">
          <span className="brandMark">ITC</span>
          <span className="brandWord">In The Cut</span>
        </a>

        <button
          className="hamburger"
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span className={`bar ${mobileOpen ? 'open' : ''}`} />
          <span className={`bar ${mobileOpen ? 'open' : ''}`} />
          <span className={`bar ${mobileOpen ? 'open' : ''}`} />
        </button>

        <nav className={`navLinks ${mobileOpen ? 'mobileOpen' : ''}`} aria-label="Main">
          <a href="#services" onClick={() => setMobileOpen(false)}>Services</a>
          <a href="#shop" onClick={() => setMobileOpen(false)}>Our Shop</a>
          <a href="#gallery" onClick={() => setMobileOpen(false)}>Gallery</a>
          <a href="#visit" onClick={() => setMobileOpen(false)}>Visit</a>
        </nav>
        <a className="navCta" href="https://www.fresha.com/en-US/barbershop/in-the-cut-barber-shoppe-Bakersfield-p1203816" target="_blank" rel="noopener noreferrer">Book now</a>
      </header>

      {/* ─── HERO ─── */}
      <section className="hero" id="top">
        <div className="heroImage">
          <img
            src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1400&q=85"
            alt="Inside In The Cut Barber Shoppe"
            loading="eager"
          />
          <div className="heroImageOverlay" aria-hidden="true" />
        </div>
        <div className="heroContent">
          <p className="eyebrow">Est. 2004 · Downtown Bakersfield</p>
          <h1>Sharp work.<br />No gimmicks.</h1>
          <p className="lede">
            Walk-ins welcome. Appointments on Fresha. Precision cuts, beard
            work, hot towel shaves, and the kind of shop people come back to
            for years.
          </p>
          <div className="heroActions">
            <a className="btn btnPrimary" href="https://www.fresha.com/en-US/barbershop/in-the-cut-barber-shoppe-Bakersfield-p1203816" target="_blank" rel="noopener noreferrer">Book on Fresha</a>
            <a className="btn btnGhost" href="tel:+16619005569">Call the shop</a>
          </div>
          <div className="trustStrip">
            <span>20+ years</span>
            <span className="trustDot" aria-hidden="true" />
            <span>Walk-ins welcome</span>
            <span className="trustDot" aria-hidden="true" />
            <span>Downtown Bakersfield</span>
          </div>
        </div>
      </section>

      {/* ─── GALLERY STRIP ─── */}
      <section className="gallery" id="gallery">
        <div className="galleryHeader reveal">
          <p className="eyebrow">The shop</p>
          <h2>Real cuts. Real clients. Real Bakersfield.</h2>
        </div>
        <div className="galleryTrack">
          {galleryImages.map((img) => (
            <figure key={img.src} className="galleryCard">
              <img src={img.src} alt={img.alt} loading="lazy" />
            </figure>
          ))}
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section className="services" id="services">
        <div className="servicesHeader reveal">
          <p className="eyebrow">Services</p>
          <h2>Straightforward service.<br />Clean work. Fair prices.</h2>
        </div>
        <div className="serviceGrid stagger-reveal">
          {services.map((service) => (
            <article
              key={service.name}
              className={`serviceCard ${service.tag === 'Most booked' ? 'featured' : ''}`}
            >
              <div className="serviceTop">
                <div>
                  <h3>{service.name}</h3>
                  <span className="serviceDuration">{service.duration}</span>
                </div>
                <span className="servicePrice">{service.price}</span>
              </div>
              <p>{service.description}</p>
              {service.tag && (
                <span className={`serviceTag ${service.tag === 'Most booked' ? 'tagPrimary' : ''}`}>
                  {service.tag}
                </span>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* ─── STORY ─── */}
      <section className="story" id="shop">
        <div className="storyInner">
          <div className="storyImage reveal">
            <img
              src="https://images.unsplash.com/photo-1585747860019-024b90225027?auto=format&fit=crop&w=800&q=85"
              alt="Barber at work inside In The Cut"
              loading="lazy"
            />
          </div>
          <div className="storyContent reveal">
            <p className="eyebrow">Our shop</p>
            <h2>Built in Bakersfield.<br />Cutting since 2004.</h2>
            <p>
              In The Cut was founded by Aaron Victorio in 2004 and built
              the old-fashioned way — clean work, consistency, and a shop
              people actually want to come back to.
            </p>
            <div className="storyFacts">
              <div className="fact">
                <span className="factValue">2004</span>
                <span className="factLabel">Founded</span>
              </div>
              <div className="fact">
                <span className="factValue">2101 16th St</span>
                <span className="factLabel">Downtown Bakersfield</span>
              </div>
              <div className="fact">
                <span className="factValue">Walk-in</span>
                <span className="factLabel">Always welcome</span>
              </div>
              <div className="fact">
                <span className="factValue">Fresha</span>
                <span className="factLabel">Book ahead</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── REVIEWS ─── */}
      <section className="reviews">
        <div className="reviewsHeader reveal">
          <p className="eyebrow">From the chair</p>
          <h2>What people say.</h2>
        </div>
        <div className="reviewsGrid stagger-reveal">
          {reviews.map((review) => (
            <blockquote key={review.name} className="reviewCard">
              <p className="reviewText">&ldquo;{review.text}&rdquo;</p>
              <footer className="reviewMeta">
                <span className="reviewName">{review.name}</span>
                <span className="reviewSource">{review.source}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* ─── VISIT ─── */}
      <section className="visit" id="visit">
        <div className="visitInner">
          <div className="visitInfo reveal">
            <p className="eyebrow">Visit</p>
            <h2>Drop in today.</h2>
            <div className="visitDetails">
              <div className="visitBlock">
                <span className="visitLabel">Address</span>
                <p>2101 16th Street<br />Bakersfield, CA 93301</p>
              </div>
              <div className="visitBlock">
                <span className="visitLabel">Getting here</span>
                <p>Street parking, private lot, and bike parking available. Wheelchair accessible.</p>
              </div>
              <div className="visitBlock">
                <span className="visitLabel">Contact</span>
                <p>
                  <a href="tel:+16619005569">(661) 900-5569</a>
                </p>
              </div>
            </div>
            <a
              className="mapLink"
              href="https://maps.google.com/?q=In+The+Cut+Barber+Shoppe+2101+16th+Street+Bakersfield+CA+93301"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get directions →
            </a>
          </div>
          <div className="visitHours reveal">
            <h3>Hours</h3>
            <div className="hoursList">
              {hours.map((entry) => (
                <div key={entry.day} className={`hoursRow ${entry.time === 'Closed' ? 'closed' : ''}`}>
                  <span className="hoursDay">{entry.day}</span>
                  <span className="hoursTime">{entry.time}</span>
                </div>
              ))}
            </div>
            <div className="visitCta">
              <a className="btn btnPrimary" href="https://www.fresha.com/en-US/barbershop/in-the-cut-barber-shoppe-Bakersfield-p1203816" target="_blank" rel="noopener noreferrer">Book on Fresha</a>
              <a className="btn btnGhost" href="tel:+16619005569">Call the shop</a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="finalCta reveal">
        <div className="finalCtaInner">
          <h2>Walk in or book ahead.</h2>
          <p>We'll get you in the chair.</p>
          <div className="ctaActions">
            <a className="btn btnPrimary" href="https://www.fresha.com/en-US/barbershop/in-the-cut-barber-shoppe-Bakersfield-p1203816" target="_blank" rel="noopener noreferrer">Book on Fresha</a>
            <a className="btn btnGhost" href="tel:+16619005569">(661) 900-5569</a>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="footer">
        <div className="footerInner">
          <div className="footerBrand">
            <a className="brand" href="#top" aria-label="In The Cut home">
              <span className="brandMark">ITC</span>
              <span className="brandWord">In The Cut</span>
            </a>
            <p>Family barbershop in downtown Bakersfield since 2004.</p>
          </div>
          <div className="footerRight">
            <div className="footerContact">
              <a href="tel:+16619005569">(661) 900-5569</a>
              <span className="footerSep" aria-hidden="true">·</span>
              <a href="https://maps.google.com/?q=In+The+Cut+Barber+Shoppe+2101+16th+Street+Bakersfield+CA+93301" target="_blank" rel="noopener noreferrer">2101 16th St, Bakersfield</a>
            </div>
            <div className="footerSocial">
              <a href="https://www.instagram.com/inthecutbarbershoppe/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1.5" /></svg>
              </a>
              <a href="https://www.facebook.com/aaronv18/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
              </a>
            </div>
          </div>
        </div>
        <div className="footerBottom">
          <p>&copy; {new Date().getFullYear()} In The Cut Barber Shoppe.</p>
        </div>
      </footer>

      {/* ─── MOBILE STICKY BAR ─── */}
      <div className="stickyBar" aria-label="Quick actions">
        <a className="stickyBtn stickyCall" href="tel:+16619005569">Call</a>
        <a className="stickyBtn stickyBook" href="https://www.fresha.com/en-US/barbershop/in-the-cut-barber-shoppe-Bakersfield-p1203816" target="_blank" rel="noopener noreferrer">Book</a>
      </div>
    </main>
  )
}

export default App
