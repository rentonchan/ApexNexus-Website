import { useEffect, useId, useState, type FormEvent, type ReactNode } from 'react'
import ShaderBackground from '@/components/ui/shader-background'
import { T, type Lang } from './translations'

const B = {
  gold: '#C8A24A',
  goldInk: '#8A6418',
  ink: '#102039',
  muted: '#3E4C63',
  line: 'rgba(16,32,57,0.12)',
  card: '#FFFcf8',
  navy: '#1F3A5F',
  blue: '#2F5D8C',
}

/**
 * TODO: put the real contact name and title here, then set this to true.
 * The round-1 card used bracket placeholders; those must not ship.
 */
const SHOW_CONTACT_CARD = false
const CONTACT_NAME = ''
const CONTACT_TITLE = ''

type InterestId = 'assistant' | 'receipts' | 'unsure'

const LogoMark = ({ size = 30 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <line x1="16" y1="5" x2="26.5" y2="12.5" stroke="#2F5D8C" strokeWidth="1.6" strokeOpacity="0.75"/>
    <line x1="26.5" y1="12.5" x2="22.5" y2="25" stroke="#2F5D8C" strokeWidth="1.6" strokeOpacity="0.75"/>
    <line x1="22.5" y1="25" x2="9.5" y2="25" stroke="#2F5D8C" strokeWidth="1.6" strokeOpacity="0.75"/>
    <line x1="9.5" y1="25" x2="5.5" y2="12.5" stroke="#2F5D8C" strokeWidth="1.6" strokeOpacity="0.75"/>
    <line x1="5.5" y1="12.5" x2="16" y2="5" stroke="#2F5D8C" strokeWidth="1.6" strokeOpacity="0.75"/>
    <line x1="16" y1="5" x2="22.5" y2="25" stroke="#C8A24A" strokeWidth="1" strokeOpacity="0.55"/>
    <line x1="16" y1="5" x2="9.5" y2="25" stroke="#C8A24A" strokeWidth="1" strokeOpacity="0.55"/>
    <line x1="26.5" y1="12.5" x2="9.5" y2="25" stroke="#C8A24A" strokeWidth="1" strokeOpacity="0.55"/>
    <line x1="26.5" y1="12.5" x2="5.5" y2="12.5" stroke="#C8A24A" strokeWidth="1" strokeOpacity="0.55"/>
    <line x1="22.5" y1="25" x2="5.5" y2="12.5" stroke="#C8A24A" strokeWidth="1" strokeOpacity="0.55"/>
    <circle cx="16" cy="5" r="2.5" fill="#2F5D8C"/>
    <circle cx="26.5" cy="12.5" r="2.2" fill="#1F3A5F"/>
    <circle cx="22.5" cy="25" r="2.2" fill="#1F3A5F"/>
    <circle cx="9.5" cy="25" r="2.2" fill="#1F3A5F"/>
    <circle cx="5.5" cy="12.5" r="2.2" fill="#2F5D8C"/>
    <circle cx="16" cy="16" r="1.6" fill="rgba(47,93,140,0.45)"/>
    <circle cx="22" cy="5.5" r="1.1" fill="#C8A24A"/>
    <circle cx="28.5" cy="19" r="1" fill="#C8A24A"/>
    <circle cx="7.5" cy="27.5" r="1" fill="#C8A24A"/>
  </svg>
)

const LangToggle = ({ lang, onToggle, label }: { lang: Lang; onToggle: () => void; label: string }) => (
  <button
    type="button"
    onClick={onToggle}
    className="relative flex items-center rounded-full text-[0.72rem] font-semibold cursor-pointer select-none"
    style={{ background: '#fff', border: `1px solid ${B.line}`, padding: '3px' }}
    aria-label={label}
  >
    {(['en', 'zh'] as Lang[]).map(l => (
      <span
        key={l}
        className="relative z-10 px-2.5 py-1 rounded-full transition-colors duration-200"
        style={{
          background: lang === l ? B.gold : 'transparent',
          color: lang === l ? B.ink : B.muted,
          fontWeight: lang === l ? 700 : 500,
          lineHeight: 1,
        }}
      >
        {l === 'en' ? 'EN' : '中文'}
      </span>
    ))}
  </button>
)

const Eyebrow = ({ children }: { children: ReactNode }) => (
  <span className="block text-[0.72rem] font-bold uppercase tracking-[0.14em] mb-3" style={{ color: B.goldInk }}>
    {children}
  </span>
)

const PrimaryLink = ({ href, children, onClick }: { href: string; children: ReactNode; onClick?: () => void }) => (
  <a
    href={href}
    onClick={onClick}
    className="inline-flex items-center justify-center text-sm font-semibold px-5 py-3 rounded-lg no-underline transition-colors duration-150"
    style={{ background: B.gold, color: B.ink }}
  >
    {children}
  </a>
)

const GhostLink = ({ href, children }: { href: string; children: ReactNode }) => (
  <a
    href={href}
    className="inline-flex items-center justify-center text-sm font-semibold px-5 py-3 rounded-lg no-underline transition-colors duration-150"
    style={{ background: '#fff', color: B.ink, border: `1px solid ${B.line}` }}
  >
    {children}
  </a>
)

const hkTime = () =>
  new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Hong_Kong',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date())

function ContactCard({ note, hours }: { note: string; hours: string }) {
  const who = [CONTACT_NAME, CONTACT_TITLE].filter(Boolean).join(' · ')
  return (
    <div className="rounded-2xl p-4 flex gap-3 items-start" style={{ background: B.card, border: `1px solid ${B.line}` }}>
      <div
        className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 font-semibold"
        style={{ background: '#E7EEF5', color: B.navy }}
        aria-hidden="true"
      >
        ?
      </div>
      <div className="min-w-0">
        {who && <div className="text-sm font-semibold">{who}</div>}
        <div className="text-xs mt-0.5" style={{ color: B.muted }}>{hours} {hkTime()}</div>
        <div className="text-xs mt-1" style={{ color: B.muted }}>{note}</div>
      </div>
    </div>
  )
}

function FaqList({ items, label }: { label: string; items: readonly { q: string; a: string }[] }) {
  const [open, setOpen] = useState<Record<number, boolean>>({})
  const base = useId()
  return (
    <div>
      <h3 className="text-base font-bold m-0 mb-3">{label}</h3>
      <div className="flex flex-col" style={{ borderTop: `1px solid ${B.line}` }}>
        {items.map((item, i) => {
          const expanded = !!open[i]
          const panelId = `${base}-faq-${i}`
          return (
            <div key={item.q} style={{ borderBottom: `1px solid ${B.line}` }}>
              <button
                type="button"
                className="w-full text-left bg-transparent border-0 cursor-pointer flex items-start justify-between gap-4 py-3.5 px-0"
                style={{ color: B.ink, font: 'inherit' }}
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpen(s => ({ ...s, [i]: !s[i] }))}
              >
                <span className="text-sm font-semibold leading-snug">{item.q}</span>
                <span aria-hidden="true" className="font-mono text-lg leading-none" style={{ color: B.goldInk }}>
                  {expanded ? '–' : '+'}
                </span>
              </button>
              <div id={panelId} role="region" hidden={!expanded}>
                <p className="text-sm leading-[1.7] m-0 pb-3.5" style={{ color: B.muted }}>{item.a}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function Booking({
  t,
  interest,
  setInterest,
}: {
  t: (typeof T)[Lang]
  interest: InterestId
  setInterest: (id: InterestId) => void
}) {
  const b = t.booking
  const [name, setName] = useState('')
  const [business, setBusiness] = useState('')
  const [email, setEmail] = useState('')
  const [task, setTask] = useState('')
  const [callLang, setCallLang] = useState('')
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [errors, setErrors] = useState<{ name?: string; email?: string; task?: string }>({})
  const [submitted, setSubmitted] = useState(false)
  const detailsId = useId()

  useEffect(() => {
    setSubmitted(false)
  }, [interest])

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const next: typeof errors = {}
    if (!name.trim()) next.name = b.errors.name
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = b.errors.email
    if (!task.trim()) next.task = b.errors.task
    setErrors(next)
    if (Object.keys(next).length) {
      const first = next.name ? 'book-name' : next.email ? 'book-email' : 'book-task'
      document.getElementById(first)?.focus()
      return
    }
    const lines = [
      `${b.name}: ${name.trim()}`,
      business.trim() ? `${b.business}: ${business.trim()}` : '',
      `${b.email}: ${email.trim()}`,
      `${b.task}: ${task.trim()}`,
      callLang ? `${b.language}: ${callLang}` : '',
      `${b.interest}: ${b.interests[interest]}`,
    ].filter(Boolean)
    const href = `mailto:hello@apexnexus.hk?subject=${encodeURIComponent(b.subject)}&body=${encodeURIComponent(lines.join('\n'))}`
    const a = document.createElement('a')
    a.href = href
    a.rel = 'nofollow'
    document.body.appendChild(a)
    a.click()
    a.remove()
    setSubmitted(true)
  }

  return (
    <section id="contact" className="section-pad" style={{ background: '#F3EFE6' }}>
      <div className="max-w-[1160px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          <div>
            <div
              className="inline-flex items-center text-[0.76rem] font-semibold px-3.5 py-1.5 rounded-full mb-4"
              style={{ background: 'rgba(200,162,74,0.12)', border: '1px solid rgba(138,100,24,0.35)', color: B.goldInk }}
            >
              {t.cta.badge}
            </div>
            <h2 className="text-[clamp(1.8rem,4vw,2.7rem)] font-extrabold tracking-tight leading-[1.12] m-0">
              {b.h2}
            </h2>
            <p className="text-[0.98rem] leading-[1.75] mt-4 mb-6" style={{ color: B.muted }}>{b.intro}</p>
            <div className="text-[0.72rem] font-bold uppercase tracking-[0.14em] mb-3" style={{ color: B.goldInk }}>
              {b.nextLabel}
            </div>
            <ol className="list-none p-0 m-0 flex flex-col gap-4">
              {b.steps.map((step, i) => (
                <li key={step.title} className="flex gap-3">
                  <span className="font-mono text-sm font-semibold mt-0.5" style={{ color: B.goldInk }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <div className="text-sm font-semibold">{step.title}</div>
                    <p className="text-sm leading-[1.65] m-0 mt-0.5" style={{ color: B.muted }}>{step.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
            {SHOW_CONTACT_CARD && (
              <div className="mt-6">
                <ContactCard note={b.contactNote} hours={b.contactHours} />
              </div>
            )}
          </div>

          <div className="flex flex-col gap-8">
            <div className="rounded-2xl p-6 md:p-7" style={{ background: B.card, border: `1px solid ${B.line}`, boxShadow: '0 10px 40px rgba(16,32,57,0.05)' }}>
              {submitted ? (
                <div role="status" aria-live="polite">
                  <h3 className="text-xl font-bold m-0 mb-3">{b.confirmTitle}</h3>
                  <p className="text-sm leading-[1.7] m-0" style={{ color: B.muted }}>{b.confirmBody}</p>
                  <p className="text-sm mt-3 mb-5">
                    <a href="mailto:hello@apexnexus.hk" style={{ color: B.goldInk }}>hello@apexnexus.hk</a>
                  </p>
                  <button
                    type="button"
                    className="text-sm font-semibold px-5 py-3 rounded-lg cursor-pointer border-0"
                    style={{ background: B.gold, color: B.ink }}
                    onClick={() => setSubmitted(false)}
                  >
                    {b.confirmBack}
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate>
                  <h3 className="text-lg font-bold m-0 mb-4">{b.formTitle}</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <label className="flex flex-col gap-1.5 text-sm font-medium">
                      {b.name} <span style={{ color: B.goldInk }}>*</span>
                      <input
                        id="book-name"
                        name="name"
                        autoComplete="name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? 'book-name-err' : undefined}
                        className="rounded-lg px-3 py-2.5 text-sm font-normal"
                        style={{ border: `1px solid ${errors.name ? '#9B2335' : B.line}`, background: '#fff', color: B.ink }}
                      />
                      {errors.name && <span id="book-name-err" className="text-xs font-normal" style={{ color: '#9B2335' }}>{errors.name}</span>}
                    </label>
                    <label className="flex flex-col gap-1.5 text-sm font-medium sm:col-span-1">
                      {b.email} <span style={{ color: B.goldInk }}>*</span>
                      <input
                        id="book-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'book-email-err' : undefined}
                        className="rounded-lg px-3 py-2.5 text-sm font-normal"
                        style={{ border: `1px solid ${errors.email ? '#9B2335' : B.line}`, background: '#fff', color: B.ink }}
                      />
                      {errors.email && <span id="book-email-err" className="text-xs font-normal" style={{ color: '#9B2335' }}>{errors.email}</span>}
                    </label>
                  </div>
                  <label className="flex flex-col gap-1.5 text-sm font-medium mt-4">
                    {b.task} <span style={{ color: B.goldInk }}>*</span>
                    <textarea
                      id="book-task"
                      name="task"
                      rows={3}
                      value={task}
                      placeholder={b.taskPlaceholder}
                      onChange={e => setTask(e.target.value)}
                      aria-invalid={!!errors.task}
                      aria-describedby={errors.task ? 'book-task-err' : undefined}
                      className="rounded-lg px-3 py-2.5 text-sm font-normal resize-y"
                      style={{ border: `1px solid ${errors.task ? '#9B2335' : B.line}`, background: '#fff', color: B.ink }}
                    />
                    {errors.task && <span id="book-task-err" className="text-xs font-normal" style={{ color: '#9B2335' }}>{errors.task}</span>}
                  </label>

                  <div className="mt-4">
                    <div className="text-sm font-medium mb-2">{b.interest}</div>
                    <div className="flex flex-wrap gap-2" role="group" aria-label={b.interest}>
                      {(Object.keys(b.interests) as InterestId[]).map(id => {
                        const on = interest === id
                        return (
                          <button
                            key={id}
                            type="button"
                            aria-pressed={on}
                            onClick={() => setInterest(id)}
                            className="text-xs font-semibold px-3 py-1.5 rounded-full cursor-pointer"
                            style={{
                              background: on ? B.gold : '#fff',
                              color: B.ink,
                              border: `1px solid ${on ? B.gold : B.line}`,
                            }}
                          >
                            {b.interests[id]}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="text-sm font-semibold bg-transparent border-0 cursor-pointer p-0"
                      style={{ color: B.goldInk }}
                      aria-expanded={detailsOpen}
                      aria-controls={detailsId}
                      onClick={() => setDetailsOpen(v => !v)}
                    >
                      {b.detailsToggle} {detailsOpen ? '–' : '+'}
                    </button>
                    <div id={detailsId} hidden={!detailsOpen} className="mt-3 flex flex-col gap-4">
                      <label className="flex flex-col gap-1.5 text-sm font-medium">
                        {b.business}
                        <input
                          name="organization"
                          autoComplete="organization"
                          value={business}
                          onChange={e => setBusiness(e.target.value)}
                          className="rounded-lg px-3 py-2.5 text-sm font-normal"
                          style={{ border: `1px solid ${B.line}`, background: '#fff', color: B.ink }}
                        />
                      </label>
                      <div>
                        <div className="text-sm font-medium mb-2">{b.language}</div>
                        <div className="flex flex-wrap gap-2" role="group" aria-label={b.language}>
                          {b.langs.map(label => {
                            const on = callLang === label
                            return (
                              <button
                                key={label}
                                type="button"
                                aria-pressed={on}
                                onClick={() => setCallLang(on ? '' : label)}
                                className="text-xs font-semibold px-3 py-1.5 rounded-full cursor-pointer"
                                style={{
                                  background: on ? B.gold : '#fff',
                                  color: B.ink,
                                  border: `1px solid ${on ? B.gold : B.line}`,
                                }}
                              >
                                {label}
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="mt-5 w-full text-sm font-semibold px-5 py-3 rounded-lg cursor-pointer border-0"
                    style={{ background: B.gold, color: B.ink }}
                  >
                    {b.submit}
                  </button>
                  <p className="text-xs leading-[1.6] mt-3 mb-1" style={{ color: B.muted }}>{b.hint}</p>
                  <p className="text-xs m-0" style={{ color: B.muted }}>
                    {b.prefer}{' '}
                    <a href="mailto:hello@apexnexus.hk" style={{ color: B.goldInk }}>hello@apexnexus.hk</a>
                  </p>
                </form>
              )}
            </div>
            <FaqList label={t.faq.label} items={t.faq.items} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default function App() {
  const [lang, setLang] = useState<Lang>('en')
  const [interest, setInterest] = useState<InterestId>('unsure')
  const [barOn, setBarOn] = useState(false)
  const t = T[lang]

  const toggleLang = () => setLang(l => l === 'en' ? 'zh' : 'en')
  const choose = (id: InterestId) => setInterest(id)

  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-Hant' : 'en'
    const existing = document.getElementById('faq-jsonld')
    const data = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: t.faq.items.map(item => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    }
    const script = existing ?? document.createElement('script')
    script.id = 'faq-jsonld'
    script.setAttribute('type', 'application/ld+json')
    script.textContent = JSON.stringify(data)
    if (!existing) document.head.appendChild(script)
  }, [lang, t.faq.items])

  useEffect(() => {
    const hero = document.getElementById('top')
    const contact = document.getElementById('contact')
    if (!hero || !contact) return
    const update = () => {
      const mobile = window.matchMedia('(max-width: 767px)').matches
      const heroBottom = hero.getBoundingClientRect().bottom
      const contactRect = contact.getBoundingClientRect()
      const pastHero = heroBottom < 160
      const contactInView = contactRect.top < window.innerHeight * 0.55 && contactRect.bottom > 80
      setBarOn(mobile && pastHero && !contactInView)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  const receiptProof = `${t.results.cases[1].metric} ${t.results.cases[1].desc}`

  return (
    <div className="min-h-screen font-sans" style={{ color: B.ink, paddingBottom: barOn ? '5.25rem' : undefined }}>
      <a href="#main" className="skip-link">{t.a11y.skip}</a>
      <ShaderBackground />

      <nav className="fixed top-0 left-0 right-0 z-50 border-b"
        style={{ background: 'rgba(246,243,236,0.9)', backdropFilter: 'blur(16px)', borderColor: B.line }}>
        <div className="max-w-[1160px] mx-auto px-4 md:px-8 h-16 flex items-center justify-between gap-3">
          <a href="#top" className="flex items-center gap-2.5 no-underline min-w-0" style={{ color: B.ink }}>
            <LogoMark size={28} />
            <span className="font-bold text-[0.95rem] tracking-tight">Apex Nexus</span>
          </a>
          <div className="flex items-center gap-3 md:gap-6">
            <a href="#offerings" className="hidden md:inline text-sm no-underline" style={{ color: B.muted }}>{t.nav.offerings}</a>
            <a href="#results" className="hidden md:inline text-sm no-underline" style={{ color: B.muted }}>{t.nav.results}</a>
            <a href="#how-it-works" className="hidden md:inline text-sm no-underline" style={{ color: B.muted }}>{t.nav.howItWorks}</a>
            <a href="#services" className="hidden md:inline text-sm no-underline" style={{ color: B.muted }}>{t.nav.services}</a>
            <a href="#about" className="hidden md:inline text-sm no-underline" style={{ color: B.muted }}>{t.nav.about}</a>
            <LangToggle lang={lang} onToggle={toggleLang} label={t.a11y.lang} />
            <a href="#contact"
              className="text-xs font-semibold px-3 md:px-4 py-2 rounded-lg no-underline whitespace-nowrap"
              style={{ background: B.gold, color: B.ink }}>
              {t.nav.bookCall}
            </a>
          </div>
        </div>
      </nav>

      <main id="main">
        <section id="top" className="relative pt-24 pb-10 md:pt-28 md:pb-16 px-5 md:px-8 overflow-hidden">
          <div className="max-w-[1160px] mx-auto grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div className="min-w-0">
              <div
                className="inline-flex items-center gap-2 text-[0.76rem] font-semibold px-3.5 py-1.5 rounded-full mb-5"
                style={{ background: 'rgba(200,162,74,0.12)', border: '1px solid rgba(138,100,24,0.35)', color: B.goldInk }}
              >
                <span aria-hidden="true">◆</span>
                {t.hero.badge}
              </div>
              <h1 className="text-[clamp(2.3rem,5.2vw,4rem)] font-black leading-[1.05] tracking-[-0.03em] m-0" style={{ color: B.ink }}>
                {t.hero.h1a}<br />
                <span style={{ color: B.goldInk }}>{t.hero.h1b}</span>
              </h1>
              <p className="text-[1.02rem] max-w-[34rem] leading-[1.75] mt-5 mb-0" style={{ color: B.muted }}>
                {t.hero.sub}
              </p>
              <div className="flex gap-3 flex-wrap mt-6">
                <PrimaryLink href="#contact">{t.hero.ctaPrimary}</PrimaryLink>
                <GhostLink href="#how-it-works">{t.hero.ctaSecondary}</GhostLink>
              </div>
              <div className="grid grid-cols-3 gap-2.5 sm:gap-3 mt-7">
                {t.hero.stats.map(({ num, desc }) => (
                  <div key={num} className="rounded-xl px-3 py-3 sm:px-4" style={{ background: '#fff', border: `1px solid ${B.line}` }}>
                    <div className="font-mono text-[1.35rem] sm:text-[1.6rem] font-semibold leading-none" style={{ color: B.goldInk }}>{num}</div>
                    <div className="text-[0.68rem] sm:text-xs mt-1.5 leading-[1.4] whitespace-pre-line" style={{ color: B.muted }}>{desc}</div>
                  </div>
                ))}
              </div>
              <p className="text-[0.72rem] uppercase tracking-[0.12em] mt-6 mb-0" style={{ color: B.muted }}>
                {t.hero.trustLine}
              </p>
            </div>

            <div className="min-w-0">
              <div className="flex items-baseline gap-3 mb-3">
                <span className="text-[0.72rem] font-bold uppercase tracking-[0.14em]" style={{ color: B.goldInk }}>{t.startHere.kicker}</span>
                <span className="text-sm font-semibold">{t.startHere.heading}</span>
              </div>
              <div className="start-cards" aria-label={t.nav.offerings}>
                {t.offerings.items.map((o, i) => {
                  const id: InterestId = i === 0 ? 'assistant' : 'receipts'
                  const accent = i === 0 ? B.blue : B.gold
                  return (
                    <article
                      key={o.h3}
                      className="rounded-2xl p-5 flex flex-col"
                      style={{ background: '#fff', border: `1px solid ${B.line}`, borderTop: `3px solid ${accent}` }}
                    >
                      <span className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] mb-2" style={{ color: B.goldInk, fontFamily: 'Roboto Mono, monospace' }}>{o.tag}</span>
                      <h2 className="text-[1.15rem] font-bold tracking-tight m-0 mb-2">{o.h3}</h2>
                      <p className="text-sm leading-[1.65] m-0 mb-4" style={{ color: B.muted }}>{o.desc}</p>
                      <div className="grid grid-cols-2 gap-3 mb-3 text-xs">
                        <div>
                          <div className="uppercase tracking-[0.08em] font-semibold mb-1" style={{ color: B.goldInk }}>{t.offerings.launch}</div>
                          <div className="font-semibold">{o.launch}</div>
                        </div>
                        <div>
                          <div className="uppercase tracking-[0.08em] font-semibold mb-1" style={{ color: B.goldInk }}>{t.offerings.bestFor}</div>
                          <div style={{ color: B.muted }}>{o.bestFor}</div>
                        </div>
                      </div>
                      <p className="text-xs leading-[1.55] m-0 mb-4" style={{ color: B.ink }}>
                        <strong>{i === 0 ? t.startHere.assistantProof : receiptProof}</strong>
                      </p>
                      <div className="mt-auto flex flex-wrap items-center gap-3">
                        <a
                          href="#contact"
                          onClick={() => choose(id)}
                          className="text-xs font-semibold px-3.5 py-2 rounded-lg no-underline"
                          style={{ background: 'rgba(200,162,74,0.16)', color: B.ink, border: '1px solid rgba(138,100,24,0.35)' }}
                        >
                          {t.startHere.book}
                        </a>
                        <a href="#offerings" className="text-xs font-semibold no-underline" style={{ color: B.goldInk }}>
                          {t.startHere.details}
                        </a>
                      </div>
                    </article>
                  )
                })}
              </div>
              <p className="text-sm mt-4 mb-0" style={{ color: B.muted }}>
                {t.startHere.unsureBefore}
                <a href="#contact" onClick={() => choose('unsure')} className="font-semibold no-underline" style={{ color: B.goldInk }}>
                  {t.startHere.unsureLink}
                </a>
                {t.startHere.unsureAfter}
              </p>
            </div>
          </div>
        </section>

        <section id="offerings" className="section-pad" style={{ background: '#F6F3EC' }}>
          <div className="max-w-[1160px] mx-auto">
            <Eyebrow>{t.offerings.label}</Eyebrow>
            <h2 className="text-[clamp(1.7rem,4vw,2.6rem)] font-extrabold tracking-tight leading-[1.15] m-0 mb-3">
              {t.offerings.h2a}<br />
              <span style={{ color: B.goldInk }}>{t.offerings.h2b}</span>
            </h2>
            <p className="text-base m-0 mb-8 max-w-[36rem]" style={{ color: B.muted }}>{t.offerings.sub}</p>
            <div className="grid md:grid-cols-2 gap-5">
              {t.offerings.items.map((o, i) => (
                <article key={o.h3} className="rounded-2xl p-6 md:p-8 flex flex-col" style={{ background: '#fff', border: `1px solid ${B.line}`, borderTop: `3px solid ${i === 0 ? B.blue : B.gold}` }}>
                  <span className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] mb-3" style={{ color: B.goldInk, fontFamily: 'Roboto Mono, monospace' }}>{o.tag}</span>
                  <h3 className="text-[1.3rem] font-bold tracking-tight m-0 mb-3">{o.h3}</h3>
                  <p className="text-sm leading-[1.75] m-0 mb-5" style={{ color: B.muted }}>{o.desc}</p>
                  <ul className="list-none p-0 m-0 flex flex-col gap-2.5 mb-5">
                    {o.points.map(pt => (
                      <li key={pt} className="flex items-start gap-2.5 text-sm">
                        <span className="font-bold mt-0.5 flex-shrink-0" style={{ color: B.goldInk }}>✓</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                  {o.proof && (
                    <p className="text-[0.82rem] leading-[1.65] m-0 mb-5 rounded-lg px-4 py-3" style={{ background: 'rgba(200,162,74,0.10)', borderLeft: `3px solid ${B.gold}`, color: B.ink }}>
                      {o.proof}
                    </p>
                  )}
                  <div className="mt-auto text-[0.8rem] leading-relaxed" style={{ color: B.muted }}>
                    <div><b style={{ color: B.ink }}>{t.offerings.bestFor}:</b> {o.bestFor}</div>
                    <div><b style={{ color: B.ink }}>{t.offerings.launch}:</b> {o.launch}</div>
                  </div>
                </article>
              ))}
            </div>
            <a href="/apex-nexus-offerings.pdf" target="_blank" rel="noopener"
              className="inline-flex items-center mt-8 text-sm font-semibold px-5 py-2.5 rounded-lg no-underline"
              style={{ background: 'rgba(200,162,74,0.12)', border: '1px solid rgba(138,100,24,0.35)', color: B.ink }}>
              {t.offerings.download}
            </a>
          </div>
        </section>

        <section id="results" className="section-pad" style={{ background: '#FBF8F2' }}>
          <div className="max-w-[1160px] mx-auto">
            <Eyebrow>{t.results.label}</Eyebrow>
            <h2 className="text-[clamp(1.7rem,4vw,2.6rem)] font-extrabold tracking-tight leading-[1.12] m-0 mb-8">
              {t.results.h2a}<br />
              <span style={{ color: B.goldInk }}>{t.results.h2b}</span>
            </h2>
            <div className="swipe-row swipe-3">
              {t.results.cases.map(({ metric, desc, detail, tag }) => (
                <article key={metric} className="rounded-2xl p-6 flex flex-col gap-3" style={{ background: '#fff', border: `1px solid ${B.line}` }}>
                  <div className="font-mono text-[2.2rem] font-bold leading-none" style={{ color: B.goldInk }}>{metric}</div>
                  <div className="text-sm font-semibold leading-[1.45]">{desc}</div>
                  <p className="text-[0.82rem] leading-[1.7] m-0 flex-1" style={{ color: B.muted }}>{detail}</p>
                  <div className="inline-flex self-start text-[0.68rem] font-semibold px-2.5 py-1 rounded-full" style={{ background: 'rgba(200,162,74,0.12)', color: B.goldInk }}>
                    {tag}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <Booking t={t} interest={interest} setInterest={setInterest} />

        <section id="how-it-works" className="section-pad" style={{ background: '#F6F3EC' }}>
          <div className="max-w-[1160px] mx-auto">
            <div className="flex items-end justify-between flex-wrap gap-6 mb-8">
              <div>
                <Eyebrow>{t.hiw.label}</Eyebrow>
                <h2 className="text-[clamp(1.7rem,4vw,2.6rem)] font-extrabold tracking-tight leading-[1.12] m-0">
                  {t.hiw.h2a}<br />
                  <span style={{ color: B.goldInk }}>{t.hiw.h2b}</span>
                </h2>
              </div>
              <a href="#contact" className="text-sm font-semibold px-5 py-2.5 rounded-lg no-underline" style={{ background: 'rgba(200,162,74,0.12)', border: '1px solid rgba(138,100,24,0.35)', color: B.ink }}>
                {t.hiw.cta}
              </a>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {t.hiw.steps.map(({ num, title, desc }) => (
                <div key={num}>
                  <div className="font-mono text-[2.4rem] font-bold leading-none mb-3" style={{ color: 'rgba(138,100,24,0.35)' }}>{num}</div>
                  <h3 className="text-[1.05rem] font-bold m-0 mb-2">{title}</h3>
                  <p className="text-sm leading-[1.75] m-0" style={{ color: B.muted }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="section-pad" style={{ background: '#FBF8F2' }}>
          <div className="max-w-[1160px] mx-auto">
            <Eyebrow>{t.services.label}</Eyebrow>
            <h2 className="text-[clamp(1.7rem,4vw,2.6rem)] font-extrabold tracking-tight leading-[1.25] m-0 mb-8 max-w-[36rem] whitespace-pre-line">
              {t.services.h2}
            </h2>
            <div className="grid md:grid-cols-2 gap-5">
              {([t.services.ceo, t.services.ops] as const).map(card => (
                <article key={card.h3} className="rounded-2xl p-6 md:p-8" style={{ background: '#fff', border: `1px solid ${B.line}` }}>
                  <div className="inline-flex text-[0.75rem] font-semibold px-3 py-1 rounded-full mb-5" style={{ background: 'rgba(200,162,74,0.12)', color: B.goldInk }}>
                    {card.badge}
                  </div>
                  <h3 className="text-[1.2rem] font-bold tracking-tight m-0 mb-3">{card.h3}</h3>
                  <p className="text-sm leading-[1.75] m-0 mb-5" style={{ color: B.muted }}>{card.desc}</p>
                  <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
                    {card.items.map(item => (
                      <li key={item} className="flex items-start gap-2.5 text-sm">
                        <span className="font-bold flex-shrink-0" style={{ color: B.goldInk }}>✓</span> {item}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="section-pad" style={{ background: '#F6F3EC' }}>
          <div className="max-w-[1160px] mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Eyebrow>{t.about.label}</Eyebrow>
              <h2 className="text-[clamp(1.7rem,3.5vw,2.5rem)] font-extrabold tracking-tight leading-[1.12] m-0">
                {t.about.h2a}<br />{t.about.h2b}
              </h2>
              <p className="text-[0.95rem] leading-[1.8] mt-4 mb-0" style={{ color: B.muted }}>{t.about.desc}</p>
              <div className="flex flex-col gap-5 mt-7">
                {t.about.pillars.map(({ n, title, desc }) => (
                  <div key={n} className="flex gap-4 items-start">
                    <div className="w-9 h-9 rounded-lg flex-shrink-0 flex items-center justify-center font-mono text-[0.78rem] font-semibold" style={{ background: 'rgba(200,162,74,0.12)', color: B.goldInk }}>
                      {n}
                    </div>
                    <div>
                      <strong className="text-sm font-semibold block mb-0.5">{title}</strong>
                      <span className="text-[0.83rem] leading-[1.65]" style={{ color: B.muted }}>{desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative pb-8 min-w-0">
              <div className="rounded-2xl p-6" style={{ background: '#fff', border: `1px solid ${B.line}` }}>
                <img
                  src="https://placehold.co/440x260/F4EFE4/1F3A5F?text=AI+Strategy+Session"
                  alt={t.about.card.imgAlt}
                  className="w-full rounded-xl mb-5 block"
                />
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center" style={{ background: '#E7EEF5' }}>
                    <LogoMark size={20} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold">{t.about.card.name}</div>
                    <div className="text-xs" style={{ color: B.muted }}>{t.about.card.subtitle}</div>
                  </div>
                  <div className="ml-auto text-[0.68rem] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap" style={{ background: 'rgba(200,162,74,0.12)', color: B.goldInk }}>
                    {t.about.card.available}
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 left-4 rounded-xl px-4 py-3" style={{ background: '#fff', border: `1px solid rgba(138,100,24,0.35)` }}>
                <div className="text-[0.63rem] uppercase tracking-[0.09em] mb-1" style={{ color: B.muted }}>{t.about.floatCard.label}</div>
                <div className="font-mono text-[1.2rem] font-bold leading-none" style={{ color: B.goldInk }}>{t.about.floatCard.value}</div>
                <div className="text-[0.7rem] mt-0.5" style={{ color: B.muted }}>{t.about.floatCard.desc}</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer style={{ background: '#EFEAE0', borderTop: `1px solid ${B.line}` }}>
        <div className="max-w-[1160px] mx-auto px-5 md:px-8 py-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <a href="#top" className="flex items-center gap-2.5 no-underline mb-4" style={{ color: B.ink }}>
              <LogoMark size={24} />
              <span className="text-sm font-bold">Apex Nexus</span>
            </a>
            <p className="text-[0.8rem] leading-[1.7] m-0 whitespace-pre-line" style={{ color: B.muted }}>{t.footer.tagline}</p>
          </div>
          <div>
            <div className="text-[0.7rem] font-bold uppercase tracking-[0.1em] mb-4" style={{ color: B.goldInk }}>{t.footer.services.header}</div>
            <div className="flex flex-col gap-2.5">
              {t.footer.services.links.map(item => (
                <a key={item} href="#services" className="text-[0.82rem] no-underline" style={{ color: B.muted }}>{item}</a>
              ))}
            </div>
          </div>
          <div>
            <div className="text-[0.7rem] font-bold uppercase tracking-[0.1em] mb-4" style={{ color: B.goldInk }}>{t.footer.company.header}</div>
            <div className="flex flex-col gap-2.5">
              {t.footer.company.links.map((item, i) => (
                <a key={item} href={['#how-it-works', '#results', '#about', '#contact'][i]} className="text-[0.82rem] no-underline" style={{ color: B.muted }}>{item}</a>
              ))}
            </div>
          </div>
          <div>
            <div className="text-[0.7rem] font-bold uppercase tracking-[0.1em] mb-4" style={{ color: B.goldInk }}>{t.footer.contact.header}</div>
            <div className="flex flex-col gap-2.5">
              <a href="mailto:hello@apexnexus.hk" className="text-[0.82rem] no-underline" style={{ color: B.muted }}>hello@apexnexus.hk</a>
              <span className="text-[0.82rem]" style={{ color: B.muted }}>{lang === 'zh' ? '香港特別行政區' : 'Hong Kong SAR'}</span>
              <a href="https://linkedin.com" className="text-[0.82rem] no-underline" style={{ color: B.muted }}>LinkedIn</a>
            </div>
          </div>
        </div>
        <div className="max-w-[1160px] mx-auto px-5 md:px-8 py-5 flex items-center justify-between flex-wrap gap-4" style={{ borderTop: `1px solid ${B.line}` }}>
          <span className="text-[0.75rem]" style={{ color: B.muted }}>{t.footer.copyright}</span>
          <div className="flex gap-6">
            <a href="#" className="text-[0.75rem] no-underline" style={{ color: B.muted }}>{t.footer.privacy}</a>
            <a href="#" className="text-[0.75rem] no-underline" style={{ color: B.muted }}>{t.footer.terms}</a>
          </div>
        </div>
      </footer>

      {barOn && (
        <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden px-3 py-2.5" style={{ background: 'rgba(246,243,236,0.96)', borderTop: `1px solid ${B.line}`, backdropFilter: 'blur(12px)' }}>
          <div className="flex items-center gap-3">
            <div className="min-w-0 flex-1">
              <div className="text-sm font-semibold leading-tight truncate">{t.sticky.title}</div>
              <div className="text-[0.7rem] truncate" style={{ color: B.muted }}>{t.sticky.sub}</div>
            </div>
            <a href="#contact" className="text-sm font-semibold px-4 py-2.5 rounded-lg no-underline flex-shrink-0" style={{ background: B.gold, color: B.ink }}>
              {t.sticky.cta}
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
