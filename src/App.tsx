import { lazy, Suspense, useEffect, useRef, useState, type FocusEvent, type FormEvent, type ReactNode } from 'react'
import { T, type Lang } from './translations'

const ShaderBackground = lazy(() => import('@/components/ui/shader-background'))

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

const LogoMark = ({ size = 30, light = false }: { size?: number; light?: boolean }) => {
  const ink = light ? '#F6F3EC' : '#2F5D8C'
  const node = light ? '#F6F3EC' : '#1F3A5F'
  return (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <line x1="16" y1="5" x2="26.5" y2="12.5" stroke={ink} strokeWidth="1.6" strokeOpacity="0.9"/>
    <line x1="26.5" y1="12.5" x2="22.5" y2="25" stroke={ink} strokeWidth="1.6" strokeOpacity="0.9"/>
    <line x1="22.5" y1="25" x2="9.5" y2="25" stroke={ink} strokeWidth="1.6" strokeOpacity="0.9"/>
    <line x1="9.5" y1="25" x2="5.5" y2="12.5" stroke={ink} strokeWidth="1.6" strokeOpacity="0.9"/>
    <line x1="5.5" y1="12.5" x2="16" y2="5" stroke={ink} strokeWidth="1.6" strokeOpacity="0.9"/>
    <line x1="16" y1="5" x2="22.5" y2="25" stroke="#C8A24A" strokeWidth="1" strokeOpacity="0.55"/>
    <line x1="16" y1="5" x2="9.5" y2="25" stroke="#C8A24A" strokeWidth="1" strokeOpacity="0.55"/>
    <line x1="26.5" y1="12.5" x2="9.5" y2="25" stroke="#C8A24A" strokeWidth="1" strokeOpacity="0.55"/>
    <line x1="26.5" y1="12.5" x2="5.5" y2="12.5" stroke="#C8A24A" strokeWidth="1" strokeOpacity="0.55"/>
    <line x1="22.5" y1="25" x2="5.5" y2="12.5" stroke="#C8A24A" strokeWidth="1" strokeOpacity="0.55"/>
    <circle cx="16" cy="5" r="2.5" fill={ink}/>
    <circle cx="26.5" cy="12.5" r="2.2" fill={node}/>
    <circle cx="22.5" cy="25" r="2.2" fill={node}/>
    <circle cx="9.5" cy="25" r="2.2" fill={node}/>
    <circle cx="5.5" cy="12.5" r="2.2" fill={ink}/>
    <circle cx="16" cy="16" r="1.6" fill={light ? 'rgba(246,243,236,0.55)' : 'rgba(47,93,140,0.45)'}/>
    <circle cx="22" cy="5.5" r="1.1" fill="#C8A24A"/>
    <circle cx="28.5" cy="19" r="1" fill="#C8A24A"/>
    <circle cx="7.5" cy="27.5" r="1" fill="#C8A24A"/>
  </svg>
  )
}

const LangToggle = ({ lang, onSet, label }: { lang: Lang; onSet: (next: Lang) => void; label: string }) => (
  <div
    role="group"
    aria-label={label}
    className="relative flex items-center rounded-full text-[0.72rem] font-semibold select-none"
    style={{ background: '#fff', border: `1px solid ${B.line}`, padding: '3px' }}
  >
    {(['en', 'zh'] as Lang[]).map(l => (
      <button
        key={l}
        type="button"
        aria-pressed={lang === l}
        onClick={() => onSet(l)}
        className="relative z-10 px-2.5 py-1 rounded-full border-0 cursor-pointer"
        style={{
          background: lang === l ? B.gold : 'transparent',
          color: lang === l ? B.ink : B.muted,
          fontWeight: lang === l ? 700 : 500,
          lineHeight: 1,
        }}
      >
        {l === 'en' ? 'EN' : '中文'}
      </button>
    ))}
  </div>
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

function DecorBackground() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const wide = window.matchMedia('(min-width: 768px)')
    const update = () => setShow(wide.matches)
    update()
    wide.addEventListener('change', update)
    return () => wide.removeEventListener('change', update)
  }, [])
  if (!show) return null
  return (
    <Suspense fallback={null}>
      <ShaderBackground />
    </Suspense>
  )
}

function SnapRow({ className, label, children }: { className: string; label: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [count, setCount] = useState(0)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => {
      const kids = [...el.children] as HTMLElement[]
      const box = el.getBoundingClientRect()
      let best = 0
      let bestDist = Infinity
      kids.forEach((kid, i) => {
        const dist = Math.abs(kid.getBoundingClientRect().left - box.left)
        if (dist < bestDist) {
          bestDist = dist
          best = i
        }
      })
      setCount(kids.length)
      setIndex(best)
    }
    update()
    el.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      el.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [children])

  const go = (i: number) => {
    const el = ref.current
    const kid = el?.children[i] as HTMLElement | undefined
    if (!el || !kid) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const left = el.scrollLeft + (kid.getBoundingClientRect().left - el.getBoundingClientRect().left)
    el.scrollTo({ left, behavior: reduce ? 'auto' : 'smooth' })
  }

  const onFocus = (e: FocusEvent<HTMLDivElement>) => {
    const el = ref.current
    const card = (e.target as HTMLElement).closest('article')
    if (!el || !card || !el.contains(card)) return
    const row = el.getBoundingClientRect()
    const box = card.getBoundingClientRect()
    if (box.left >= row.left - 2 && box.right <= row.right + 2) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollTo({
      left: el.scrollLeft + (box.left - row.left),
      behavior: reduce ? 'auto' : 'smooth',
    })
  }

  return (
    <div>
      <div ref={ref} className={className} aria-label={label} onFocus={onFocus}>{children}</div>
      {count > 1 && (
        <div className="swipe-dots" role="group" aria-label={label}>
          {Array.from({ length: count }, (_, i) => (
            <button
              key={i}
              type="button"
              aria-current={i === index ? 'true' : undefined}
              aria-label={`${i + 1} / ${count}`}
              onClick={() => go(i)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

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
  return (
    <div>
      <h3 className="text-base font-bold m-0 mb-3">{label}</h3>
      <div className="flex flex-col" style={{ borderTop: `1px solid ${B.line}` }}>
        {items.map((item, i) => {
          const expanded = !!open[i]
          const panelId = `faq-panel-${i}`
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
  const fieldBorder = '#7f8a9c'
  const [name, setName] = useState('')
  const [business, setBusiness] = useState('')
  const [email, setEmail] = useState('')
  const [task, setTask] = useState('')
  const [langIdx, setLangIdx] = useState(0)
  const [formError, setFormError] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [copied, setCopied] = useState(false)
  const [mail, setMail] = useState<{ href: string; text: string } | null>(null)
  const confirmRef = useRef<HTMLHeadingElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)
  const [clock, setClock] = useState(hkTime)

  useEffect(() => {
    const id = window.setInterval(() => setClock(hkTime()), 30000)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    setSubmitted(false)
  }, [interest])

  useEffect(() => {
    if (!submitted) return
    const el = confirmRef.current
    if (!el) return
    el.focus({ preventScroll: true })
    el.scrollIntoView({ block: 'start', behavior: 'auto' })
  }, [submitted])

  const invalid = {
    name: !name.trim(),
    email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()),
    task: !task.trim(),
  }
  const showError = !!formError && (invalid.name || invalid.email || invalid.task)

  const openMail = (href: string) => {
    const a = document.createElement('a')
    a.href = href
    a.rel = 'nofollow'
    document.body.appendChild(a)
    a.click()
    a.remove()
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (invalid.name || invalid.email || invalid.task) {
      setFormError(b.errors.form)
      setSubmitted(false)
      const first = invalid.task ? 'book-task' : invalid.name ? 'book-name' : 'book-email'
      document.getElementById(first)?.focus()
      return
    }
    setFormError('')
    const body = `${b.name}: ${name.trim()}\n${b.business}: ${business.trim()}\n${b.email}: ${email.trim()}\n${b.language}: ${b.langs[langIdx]}\n${b.interest}: ${b.interests[interest]}\n\n${b.task}\n${task.trim()}\n`
    const subject = `${b.subject} — ${business.trim() || name.trim()}`
    const href = `mailto:hello@apexnexus.hk?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    const text = `${b.confirmTo}: hello@apexnexus.hk\n${b.confirmSubject}: ${subject}\n\n${body}`
    setMail({ href, text })
    setCopied(false)
    openMail(href)
    setSubmitted(true)
  }

  const copyMessage = () => {
    const text = mail?.text ?? ''
    const fallback = () => {
      const el = messageRef.current
      if (!el) return
      el.focus()
      el.select()
      try {
        if (document.execCommand('copy')) setCopied(true)
      } catch {
        /* clipboard unavailable */
      }
    }
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(() => setCopied(true), fallback)
    } else {
      fallback()
    }
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
            <p className="text-sm leading-[1.65] mt-5 mb-2" style={{ color: B.ink }}>{b.contactNote}</p>
            <p className="text-sm m-0 font-semibold" style={{ color: B.muted }}>
              <time dateTime={clock}>{b.contactHours} {clock}</time>
            </p>
            {SHOW_CONTACT_CARD && (
              <div className="mt-6">
                <ContactCard note={b.contactNote} hours={b.contactHours} />
              </div>
            )}
          </div>

          <div className="flex flex-col gap-8">
            <div className="rounded-2xl p-6 md:p-7" style={{ background: B.card, border: `1px solid ${B.line}`, boxShadow: '0 10px 40px rgba(16,32,57,0.05)' }}>
              {submitted && mail ? (
                <div className="book-conf">
                  <h3
                    ref={confirmRef}
                    tabIndex={-1}
                    className="text-xl font-bold m-0 outline-none"
                  >
                    {b.confirmTitle}
                  </h3>
                  <p className="text-sm leading-[1.7] m-0" role="status" style={{ color: B.muted }}>{b.confirmNote}</p>
                  <label className="flex flex-col gap-1.5 text-sm font-medium" htmlFor="book-msg">
                    {b.confirmMessageLabel}
                    <textarea
                      id="book-msg"
                      ref={messageRef}
                      readOnly
                      rows={8}
                      value={mail.text}
                      className="book-msg rounded-lg px-3 py-2.5"
                      style={{ border: `1px solid ${fieldBorder}`, background: '#F6F3EC', color: B.ink }}
                    />
                  </label>
                  <div className="book-actions">
                    <button
                      type="button"
                      className="text-sm font-semibold px-4 rounded-lg cursor-pointer border-0"
                      style={{ background: B.gold, color: B.ink, minHeight: 44 }}
                      onClick={copyMessage}
                    >
                      {copied ? `✓ ${b.confirmCopied}` : b.confirmCopy}
                    </button>
                    <a
                      href={mail.href}
                      className="book-ghost"
                    >
                      {b.confirmOpen}
                    </a>
                    <button
                      type="button"
                      className="book-ghost"
                      onClick={() => { setSubmitted(false); setCopied(false) }}
                    >
                      {b.confirmEdit}
                    </button>
                  </div>
                  <p className="book-live" aria-live="polite">{copied ? b.confirmCopied : ''}</p>
                  <p className="text-xs m-0" style={{ color: B.muted }}>
                    {b.prefer}{' '}
                    <a href="mailto:hello@apexnexus.hk" style={{ color: B.goldInk }}>hello@apexnexus.hk</a>
                  </p>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate aria-describedby={showError ? 'book-form-err' : undefined}>
                  <h3 className="text-lg font-bold m-0 mb-4">{b.formTitle}</h3>
                  <label className="flex flex-col gap-1.5 text-sm font-medium">
                    {b.task} <span style={{ color: B.goldInk }}>*</span>
                    <textarea
                      id="book-task"
                      name="task"
                      rows={3}
                      value={task}
                      placeholder={b.taskPlaceholder}
                      onChange={e => setTask(e.target.value)}
                      aria-invalid={showError && invalid.task}
                      className="rounded-lg px-3 py-2.5 text-sm font-normal resize-y"
                      style={{ border: `1px solid ${showError && invalid.task ? '#9B2335' : fieldBorder}`, background: '#fff', color: B.ink }}
                    />
                  </label>
                  <div className="grid sm:grid-cols-2 gap-4 mt-4">
                    <label className="flex flex-col gap-1.5 text-sm font-medium">
                      {b.name} <span style={{ color: B.goldInk }}>*</span>
                      <input
                        id="book-name"
                        name="name"
                        autoComplete="name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        aria-invalid={showError && invalid.name}
                        className="rounded-lg px-3 py-2.5 text-sm font-normal"
                        style={{ border: `1px solid ${showError && invalid.name ? '#9B2335' : fieldBorder}`, background: '#fff', color: B.ink }}
                      />
                    </label>
                    <label className="flex flex-col gap-1.5 text-sm font-medium">
                      {b.email} <span style={{ color: B.goldInk }}>*</span>
                      <input
                        id="book-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        aria-invalid={showError && invalid.email}
                        className="rounded-lg px-3 py-2.5 text-sm font-normal"
                        style={{ border: `1px solid ${showError && invalid.email ? '#9B2335' : fieldBorder}`, background: '#fff', color: B.ink }}
                      />
                    </label>
                  </div>

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
                              border: `1px solid ${on ? B.gold : fieldBorder}`,
                            }}
                          >
                            {b.interests[id]}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <details className="mt-4">
                    <summary className="text-sm font-semibold cursor-pointer" style={{ color: B.goldInk }}>
                      {b.detailsToggle}
                    </summary>
                    <div className="mt-3 flex flex-col gap-4">
                      <label className="flex flex-col gap-1.5 text-sm font-medium">
                        {b.business}
                        <input
                          name="organization"
                          autoComplete="organization"
                          value={business}
                          onChange={e => setBusiness(e.target.value)}
                          className="rounded-lg px-3 py-2.5 text-sm font-normal"
                          style={{ border: `1px solid ${fieldBorder}`, background: '#fff', color: B.ink }}
                        />
                      </label>
                      <div>
                        <div className="text-sm font-medium mb-2">{b.language}</div>
                        <div className="flex flex-wrap gap-2" role="group" aria-label={b.language}>
                          {b.langs.map((label, i) => {
                            const on = langIdx === i
                            return (
                              <button
                                key={label}
                                type="button"
                                aria-pressed={on}
                                onClick={() => setLangIdx(i)}
                                className="text-xs font-semibold px-3 py-1.5 rounded-full cursor-pointer"
                                style={{
                                  background: on ? B.gold : '#fff',
                                  color: B.ink,
                                  border: `1px solid ${on ? B.gold : fieldBorder}`,
                                }}
                              >
                                {label}
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  </details>

                  {showError && (
                    <p id="book-form-err" role="alert" className="text-xs font-medium mt-4 mb-0" style={{ color: '#9B2335' }}>
                      {formError}
                    </p>
                  )}
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
  const [menuOpen, setMenuOpen] = useState(false)
  const [current, setCurrent] = useState('')
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const menuFirstLinkRef = useRef<HTMLAnchorElement>(null)
  const t = T[lang]

  const choose = (id: InterestId) => setInterest(id)
  const closeMenu = (returnFocus = false) => {
    setMenuOpen(false)
    if (returnFocus) menuButtonRef.current?.focus()
  }

  useEffect(() => {
    if (!menuOpen) return
    menuFirstLinkRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu(true)
    }
    const desktop = window.matchMedia('(min-width: 768px)')
    const onDesktop = () => { if (desktop.matches) setMenuOpen(false) }
    window.addEventListener('keydown', onKey)
    desktop.addEventListener('change', onDesktop)
    return () => {
      window.removeEventListener('keydown', onKey)
      desktop.removeEventListener('change', onDesktop)
    }
  }, [menuOpen])

  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-Hant-HK' : 'en'
    document.title = t.meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description)
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

  useEffect(() => {
    const ids = ['offerings', 'results', 'contact', 'how-it-works', 'services', 'about']
    const els = ids.map(id => document.getElementById(id)).filter((el): el is HTMLElement => !!el)
    const io = new IntersectionObserver((entries) => {
      const hit = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (hit?.target.id) setCurrent(hit.target.id)
    }, { rootMargin: '-20% 0px -55% 0px', threshold: [0.15, 0.4, 0.7] })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  const sectionLinks = [
    ['#offerings', 'offerings', t.nav.offerings],
    ['#results', 'results', t.nav.results],
    ['#how-it-works', 'how-it-works', t.nav.howItWorks],
    ['#services', 'services', t.nav.services],
    ['#about', 'about', t.nav.about],
  ] as const

  const receiptProof = `${t.results.cases[1].metric} ${t.results.cases[1].desc}`

  return (
    <div className={`min-h-screen font-sans${lang === 'zh' ? ' lang-zh' : ''}`} style={{ color: B.ink, paddingBottom: barOn ? '5.25rem' : undefined }}>
      <a href="#main" className="skip-link">{t.a11y.skip}</a>
      <DecorBackground />

      <nav className="fixed top-0 left-0 right-0 z-50 border-b"
        style={{ background: 'rgba(246,243,236,0.9)', backdropFilter: 'blur(16px)', borderColor: B.line }}>
        <div className="max-w-[1160px] mx-auto px-4 md:px-8 h-16 flex items-center justify-between gap-3">
          <a href="#top" className="flex items-center gap-2.5 no-underline min-w-0" style={{ color: B.ink }}>
            <LogoMark size={28} />
            <span className="font-bold text-[0.95rem] tracking-tight whitespace-nowrap">Apex Nexus</span>
          </a>
          <div className="flex items-center gap-2 md:gap-6">
            {sectionLinks.map(([href, id, label]) => (
              <a
                key={href}
                href={href}
                aria-current={current === id ? 'true' : undefined}
                className="hidden md:inline text-sm no-underline"
                style={{
                  color: current === id ? B.ink : B.muted,
                  fontWeight: current === id ? 700 : 500,
                  boxShadow: current === id ? 'inset 0 -2px 0 #C8A24A' : undefined,
                }}
              >
                {label}
              </a>
            ))}
            <button
              ref={menuButtonRef}
              type="button"
              className="md:hidden inline-flex items-center justify-center rounded-lg cursor-pointer bg-transparent"
              style={{ color: B.ink, border: `1px solid ${B.line}`, width: 36, height: 36 }}
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              aria-label={menuOpen ? t.nav.close : t.nav.menu}
              onClick={() => setMenuOpen(v => !v)}
            >
              <span aria-hidden="true" className="text-lg leading-none">{menuOpen ? '×' : '☰'}</span>
            </button>
            <LangToggle lang={lang} onSet={setLang} label={t.a11y.lang} />
            <a href="#contact"
              className="text-xs font-semibold px-3 md:px-4 py-2 rounded-lg no-underline whitespace-nowrap"
              style={{ background: B.gold, color: B.ink }}>
              {t.nav.bookCall}
            </a>
          </div>
        </div>
        <div
          id="site-menu"
          hidden={!menuOpen}
          className="md:hidden absolute left-0 right-0 top-16 border-b"
          style={{ background: '#F6F3EC', borderColor: B.line }}
        >
          <div className="max-w-[1160px] mx-auto px-4 py-2 flex flex-col">
            {sectionLinks.map(([href, id, label], i) => (
              <a
                key={href}
                ref={i === 0 ? menuFirstLinkRef : undefined}
                href={href}
                aria-current={current === id ? 'true' : undefined}
                className="no-underline text-base py-3"
                style={{
                  color: B.ink,
                  fontWeight: current === id ? 700 : 500,
                  borderBottom: i < 4 ? `1px solid ${B.line}` : undefined,
                  boxShadow: current === id ? 'inset 3px 0 0 #C8A24A' : undefined,
                }}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <main id="main">
        <section id="top" className="relative pt-24 pb-10 md:pt-28 md:pb-16 px-5 md:px-8 overflow-hidden">
          <div className="max-w-[1160px] mx-auto grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div className="hero-copy min-w-0">
              <div
                className="inline-flex items-center gap-2 text-[0.76rem] font-semibold px-3.5 py-1.5 rounded-full mb-5"
                style={{ background: 'rgba(200,162,74,0.12)', border: '1px solid rgba(138,100,24,0.35)', color: B.goldInk }}
              >
                <span aria-hidden="true">◆</span>
                {t.hero.badge}
              </div>
              <h1 className="hero-title">
                <span className="hero-line">{t.hero.h1a}</span>
                <span className="hero-line hero-gold">{t.hero.h1b}</span>
              </h1>
              <p className="text-[1.02rem] max-w-[34rem] leading-[1.7] mt-4 mb-0" style={{ color: B.muted }}>
                {t.hero.sub}
              </p>
              <div className="flex gap-3 flex-wrap mt-5">
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
              <SnapRow className="start-cards" label={t.nav.offerings}>
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
              </SnapRow>
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
                  <div className="mt-auto pt-4 grid grid-cols-2 gap-x-4 gap-y-3" style={{ borderTop: `1px solid ${B.line}` }}>
                    <div>
                      <div className="text-[0.68rem] font-semibold uppercase tracking-[0.08em] mb-1" style={{ color: B.goldInk }}>{t.offerings.launch}</div>
                      <div className="text-sm font-semibold">{o.launch}</div>
                    </div>
                    <div>
                      <div className="text-[0.68rem] font-semibold uppercase tracking-[0.08em] mb-1" style={{ color: B.goldInk }}>{t.offerings.bestFor}</div>
                      <div className="text-sm leading-snug" style={{ color: B.muted }}>{o.bestFor}</div>
                    </div>
                    <a
                      href="#contact"
                      onClick={() => choose(i === 0 ? 'assistant' : 'receipts')}
                      className="col-span-2 inline-flex items-center justify-center text-sm font-semibold px-4 py-2.5 rounded-lg no-underline"
                      style={{ background: B.gold, color: B.ink }}
                    >
                      {t.startHere.book}
                    </a>
                  </div>
                </article>
              ))}
            </div>
            <a href="/apex-nexus-offerings.pdf" target="_blank" rel="noopener"
              className="inline-flex items-center mt-8 text-sm font-semibold px-5 py-2.5 rounded-lg no-underline"
              style={{ background: 'rgba(200,162,74,0.12)', border: '1px solid rgba(138,100,24,0.35)', color: B.ink }}>
              {t.offerings.download}
              <span className="ml-2 text-xs font-medium">({t.a11y.newTab})</span>
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
            <SnapRow className="swipe-row swipe-3" label={t.results.label}>
              {t.results.cases.map(({ metric, desc, detail, tag }, i) => (
                <article key={metric} className="rounded-2xl p-6 flex flex-col gap-3" style={{ background: '#fff', border: `1px solid ${B.line}` }}>
                  <div className="font-mono text-[2.2rem] font-bold leading-none" style={{ color: B.goldInk }}>{metric}</div>
                  <div className="text-sm font-semibold leading-[1.45]">{desc}</div>
                  <p className="text-[0.82rem] leading-[1.7] m-0 flex-1" style={{ color: B.muted }}>{detail}</p>
                  {i === 2 && (
                    <a
                      href="#contact"
                      onClick={() => choose('unsure')}
                      className="inline-flex items-center justify-center text-sm font-semibold px-4 py-2.5 rounded-lg no-underline"
                      style={{ background: B.gold, color: B.ink }}
                    >
                      {t.hero.ctaPrimary}
                    </a>
                  )}
                  <div className="inline-flex self-start text-[0.68rem] font-semibold px-2.5 py-1 rounded-full" style={{ background: 'rgba(200,162,74,0.12)', color: B.goldInk }}>
                    {tag}
                  </div>
                </article>
              ))}
            </SnapRow>
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
            <ol className="hiw-track">
              {t.hiw.steps.map(({ num, title, desc }) => (
                <li key={num} className="hiw-step">
                  <div className="hiw-mark" aria-hidden="true">{num}</div>
                  <div>
                    <h3 className="text-[1.05rem] font-bold m-0 mb-2">{title}</h3>
                    <p className="text-sm leading-[1.75] m-0" style={{ color: B.muted }}>{desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="services" className="section-pad" style={{ background: '#FBF8F2' }}>
          <div className="max-w-[1160px] mx-auto">
            <Eyebrow>{t.services.label}</Eyebrow>
            <h2 className="text-[clamp(1.7rem,4vw,2.6rem)] font-extrabold tracking-tight leading-[1.25] m-0 mb-8 max-w-[36rem] whitespace-pre-line">
              {t.services.h2}
            </h2>
            <div className="grid md:grid-cols-2 gap-5">
              {([t.services.ceo, t.services.ops] as const).map((card, i) => (
                <article key={card.h3} className="rounded-2xl p-6 md:p-8" style={{ background: '#fff', border: `1px solid ${B.line}`, borderTop: `3px solid ${i === 0 ? B.navy : B.gold}` }}>
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
            <a
              href="#contact"
              className="inline-flex items-center mt-8 text-sm font-semibold px-5 py-3 rounded-lg no-underline"
              style={{ background: B.gold, color: B.ink }}
            >
              {t.hiw.cta}
            </a>
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
            <div className="min-w-0">
              <div className="rounded-2xl p-6 md:p-8" style={{ background: '#fff', border: `1px solid ${B.line}`, borderTop: `3px solid ${B.gold}` }}>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center" style={{ background: '#E7EEF5' }} aria-hidden="true">
                    <LogoMark size={26} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-base font-semibold">{t.about.card.name}</div>
                    <div className="text-sm" style={{ color: B.muted }}>{t.about.card.subtitle}</div>
                  </div>
                  <div className="text-[0.72rem] font-semibold px-2.5 py-1 rounded-full" style={{ background: 'rgba(200,162,74,0.12)', color: B.goldInk }}>
                    {t.about.card.available}
                  </div>
                </div>
                <div className="mt-6 rounded-xl px-4 py-4" style={{ background: '#F6F3EC', border: '1px solid rgba(138,100,24,0.35)' }}>
                  <div className="text-[0.68rem] uppercase tracking-[0.09em] mb-1.5" style={{ color: B.muted }}>{t.about.floatCard.label}</div>
                  <div className="font-mono text-[1.35rem] font-bold leading-none" style={{ color: B.goldInk }}>{t.about.floatCard.value}</div>
                  <div className="text-sm mt-1.5" style={{ color: B.muted }}>{t.about.floatCard.desc}</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer" style={{ background: '#1F3A5F', color: '#F6F3EC', borderTop: '3px solid #C8A24A' }}>
        <div className="max-w-[1160px] mx-auto px-5 md:px-8 py-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <a href="#top" className="flex items-center gap-2.5 no-underline mb-4" style={{ color: '#F6F3EC' }}>
              <LogoMark size={24} light />
              <span className="text-sm font-bold">Apex Nexus</span>
            </a>
            <p className="text-[0.8rem] leading-[1.7] m-0 whitespace-pre-line" style={{ color: '#E7EEF5' }}>{t.footer.tagline}</p>
          </div>
          <div>
            <div className="text-[0.7rem] font-bold uppercase tracking-[0.1em] mb-4" style={{ color: '#C8A24A' }}>{t.footer.services.header}</div>
            <div className="flex flex-col gap-2.5">
              {t.footer.services.links.map(item => (
                <a key={item} href="#services" className="text-[0.82rem] no-underline" style={{ color: '#F6F3EC' }}>{item}</a>
              ))}
            </div>
          </div>
          <div>
            <div className="text-[0.7rem] font-bold uppercase tracking-[0.1em] mb-4" style={{ color: '#C8A24A' }}>{t.footer.company.header}</div>
            <div className="flex flex-col gap-2.5">
              {t.footer.company.links.map((item, i) => (
                <a key={item} href={['#how-it-works', '#results', '#about', '#contact'][i]} className="text-[0.82rem] no-underline" style={{ color: '#F6F3EC' }}>{item}</a>
              ))}
            </div>
          </div>
          <div>
            <div className="text-[0.7rem] font-bold uppercase tracking-[0.1em] mb-4" style={{ color: '#C8A24A' }}>{t.footer.contact.header}</div>
            <div className="flex flex-col gap-2.5">
              <a href="mailto:hello@apexnexus.hk" className="text-[0.82rem] no-underline" style={{ color: '#F6F3EC' }}>hello@apexnexus.hk</a>
              <span className="text-[0.82rem]" style={{ color: '#E7EEF5' }}>{lang === 'zh' ? '香港特別行政區' : 'Hong Kong SAR'}</span>
              <a href="https://linkedin.com" className="text-[0.82rem] no-underline" style={{ color: '#F6F3EC' }}>LinkedIn</a>
            </div>
          </div>
        </div>
        <div className="max-w-[1160px] mx-auto px-5 md:px-8 py-5 flex items-center justify-between flex-wrap gap-4" style={{ borderTop: '1px solid rgba(246,243,236,0.22)' }}>
          <span className="text-[0.75rem]" style={{ color: '#E7EEF5' }}>{t.footer.copyright}</span>
          <div className="flex gap-6">
            <a href="#" className="text-[0.75rem] no-underline" style={{ color: '#E7EEF5' }}>{t.footer.privacy}</a>
            <a href="#" className="text-[0.75rem] no-underline" style={{ color: '#E7EEF5' }}>{t.footer.terms}</a>
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
