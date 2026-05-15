import ShaderBackground from '@/components/ui/shader-background'

// Accent palette — violet/purple
const A = {
  solid:      '#8b5cf6',   // violet-500
  hover:      '#7c3aed',   // violet-600
  light:      '#a78bfa',   // violet-400
  lighter:    '#c4b5fd',   // violet-300
  bg12:       'rgba(139,92,246,0.12)',
  bg08:       'rgba(139,92,246,0.08)',
  border25:   'rgba(167,139,250,0.25)',
  border35:   'rgba(167,139,250,0.35)',
  border45:   'rgba(167,139,250,0.45)',
  shadow:     '0 2px 14px rgba(124,58,237,0.35)',
  ghost25:    'rgba(139,92,246,0.25)',
  num:        'rgba(167,139,250,0.18)',
}

const Logo = () => (
  <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
    <circle cx="14" cy="3.5" r="2.5" fill={A.light} />
    <circle cx="3.5" cy="21" r="2.5" fill="#2F5D8C" />
    <circle cx="24.5" cy="21" r="2.5" fill="#2F5D8C" />
    <circle cx="14" cy="13.5" r="1.8" fill="rgba(167,139,250,0.4)" />
    <line x1="14" y1="3.5" x2="3.5" y2="21" stroke="#2F5D8C" strokeWidth="1.5" strokeOpacity="0.55" />
    <line x1="14" y1="3.5" x2="24.5" y2="21" stroke="#2F5D8C" strokeWidth="1.5" strokeOpacity="0.55" />
    <line x1="3.5" y1="21" x2="24.5" y2="21" stroke="#2F5D8C" strokeWidth="1.5" strokeOpacity="0.55" />
    <line x1="14" y1="3.5" x2="14" y2="13.5" stroke={A.light} strokeWidth="1" strokeOpacity="0.5" />
    <line x1="3.5" y1="21" x2="14" y2="13.5" stroke={A.light} strokeWidth="1" strokeOpacity="0.5" />
    <line x1="24.5" y1="21" x2="14" y2="13.5" stroke={A.light} strokeWidth="1" strokeOpacity="0.5" />
  </svg>
)

const Divider = () => (
  <div className="max-w-[1160px] mx-auto h-px"
    style={{ background: 'linear-gradient(to right, transparent, rgba(47,93,140,0.25), transparent)' }} />
)

export default function App() {
  return (
    <div className="grain min-h-screen text-white font-sans">

      {/* ── NAV ──────────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b"
        style={{ background: 'rgba(6,13,27,0.8)', backdropFilter: 'blur(14px) saturate(1.4)', borderColor: 'rgba(47,93,140,0.25)' }}>
        <div className="max-w-[1160px] mx-auto px-8 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 no-underline">
            <Logo />
            <span className="font-extrabold text-base tracking-tight text-white">Apex Nexus</span>
          </a>
          <div className="flex items-center gap-7">
            <a href="#how-it-works" className="text-sm text-white/60 hover:text-white transition-colors no-underline">How it works</a>
            <a href="#services"     className="text-sm text-white/60 hover:text-white transition-colors no-underline">Services</a>
            <a href="#about"        className="text-sm text-white/60 hover:text-white transition-colors no-underline">About</a>
            <a href="#contact"
              className="text-xs font-semibold px-4 py-2 rounded-lg no-underline"
              style={{ background: A.solid, color: 'white', boxShadow: A.shadow }}
              onMouseOver={e => (e.currentTarget.style.background = A.hover)}
              onMouseOut={e  => (e.currentTarget.style.background = A.solid)}>
              Book a call →
            </a>
          </div>
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <ShaderBackground />

      <section className="relative min-h-screen flex flex-col items-center justify-start pt-[136px] pb-24 text-center overflow-hidden">

        {/* Dark vignette behind hero content — keeps text crisp over the animation */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 68% at 50% 44%, rgba(4,6,18,0.9) 0%, rgba(4,6,18,0.65) 45%, transparent 72%)' }} />

        {/* Subtle violet glow at hero base */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none w-full h-[400px]"
          style={{ background: `radial-gradient(ellipse at center bottom, ${A.ghost25} 0%, transparent 65%)` }} />

        <div className="relative z-10 max-w-[860px] mx-auto px-8 flex flex-col items-center gap-6">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 text-[0.78rem] font-semibold px-3.5 py-1.5 rounded-full tracking-wide"
            style={{ background: A.bg12, border: `1px solid ${A.border35}`, color: A.light }}>
            <span className="text-[0.6rem]">✦</span>
            AI Consulting for Hong Kong SMEs
          </div>

          {/* Headline */}
          <h1 className="text-[clamp(2.65rem,6vw,4.5rem)] font-black leading-[1.07] tracking-[-0.036em] m-0">
            Make better AI decisions,<br />
            <span style={{ color: A.lighter }}>for the right outcomes</span>
          </h1>

          {/* Sub */}
          <p className="text-[1.05rem] max-w-[520px] leading-[1.75] m-0" style={{ color: '#9ba8bc' }}>
            Apex Nexus bridges the gap between AI strategy and real-world execution —
            practical, outcome-driven results for businesses navigating AI transformation.
          </p>

          {/* CTAs */}
          <div className="flex gap-3.5 flex-wrap justify-center mt-1">
            <a href="#contact"
              className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-lg no-underline"
              style={{ background: A.solid, color: 'white', boxShadow: A.shadow }}
              onMouseOver={e => (e.currentTarget.style.background = A.hover)}
              onMouseOut={e  => (e.currentTarget.style.background = A.solid)}>
              Book a free consultation →
            </a>
            <a href="#how-it-works"
              className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-lg no-underline"
              style={{ background: 'rgba(255,255,255,0.06)', color: 'white', border: '1px solid rgba(255,255,255,0.14)', backdropFilter: 'blur(8px)' }}
              onMouseOver={e => { e.currentTarget.style.borderColor = A.border45; e.currentTarget.style.background = A.bg08 }}
              onMouseOut={e  => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}>
              See how it works
            </a>
          </div>

          {/* Stats */}
          <div className="flex gap-5 flex-wrap justify-center mt-3">
            {[
              { num: '3×',   desc: 'Average ROI\nacross engagements' },
              { num: '40+',  desc: 'AI projects\ndelivered in HK' },
              { num: '6 wks', desc: 'Average time\nto first outcome' },
            ].map(({ num, desc }) => (
              <div key={num} className="text-left px-7 py-4 rounded-xl"
                style={{ background: 'rgba(8,10,24,0.75)', border: `1px solid ${A.border25}`, backdropFilter: 'blur(12px)' }}>
                <div className="font-mono text-[1.9rem] font-semibold leading-none" style={{ color: A.light }}>{num}</div>
                <div className="text-xs mt-1.5 leading-[1.5] whitespace-pre-line" style={{ color: '#8896a8' }}>{desc}</div>
              </div>
            ))}
          </div>

          {/* Trusted logos */}
          <div className="mt-8 w-full">
            <p className="text-[0.72rem] uppercase tracking-[0.1em] mb-4" style={{ color: '#6b7a91' }}>
              Trusted by leading SMEs across Hong Kong
            </p>
            <div className="flex items-center justify-center gap-11 flex-wrap">
              {['Ascent', 'Lumina', 'Vantage', 'Meridian', 'Pinnacle'].map(name => (
                <span key={name} className="text-sm font-bold uppercase tracking-[0.08em]"
                  style={{ color: 'rgba(255,255,255,0.18)' }}>{name}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Dashboard mockup */}
        <div className="relative z-10 w-full max-w-[980px] mx-auto mt-12 px-8">
          <div className="rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(8,10,26,0.95)',
              border: `1px solid ${A.border25}`,
              boxShadow: `0 0 0 1px rgba(139,92,246,0.06), 0 24px 80px rgba(0,0,0,0.7), 0 0 100px ${A.bg12}`,
            }}>
            <div className="flex items-center gap-2 px-5 py-2.5 border-b"
              style={{ background: 'rgba(10,8,28,0.97)', borderColor: A.border25 }}>
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              <span className="font-mono text-[0.72rem] ml-3" style={{ color: '#8896a8' }}>
                apex-nexus — AI Strategy Dashboard
              </span>
            </div>
            <div className="p-6" style={{ background: 'rgba(5,4,18,0.97)' }}>
              <div className="grid grid-cols-3 gap-4 mb-5">
                {[
                  { label: 'AI Readiness Score', val: '87', suffix: '/100', sub: '▲ +12 this quarter' },
                  { label: 'Automation ROI',      val: '3.2×', suffix: '',    sub: '▲ On track' },
                  { label: 'Hours Saved / Week',  val: '124h', suffix: '',    sub: '▲ Across 4 workflows' },
                ].map(({ label, val, suffix, sub }) => (
                  <div key={label} className="rounded-xl p-3.5"
                    style={{ background: 'rgba(30,20,60,0.5)', border: `1px solid ${A.border25}` }}>
                    <div className="text-[0.65rem] uppercase tracking-[0.09em] mb-1.5" style={{ color: '#8896a8' }}>{label}</div>
                    <div className="font-mono text-[1.6rem] font-semibold leading-none" style={{ color: A.light }}>
                      {val}<span className="text-base" style={{ color: '#8896a8' }}>{suffix}</span>
                    </div>
                    <div className="text-[0.65rem] mt-1" style={{ color: '#3dfd98' }}>{sub}</div>
                  </div>
                ))}
              </div>
              <div className="rounded-xl p-4 min-h-[120px]"
                style={{ background: 'rgba(30,20,60,0.25)', border: `1px solid ${A.border25}` }}>
                <div className="text-[0.65rem] uppercase tracking-[0.09em] mb-3" style={{ color: '#8896a8' }}>
                  AI Implementation Progress
                </div>
                <svg viewBox="0 0 800 90" width="100%" height="72" style={{ display: 'block', overflow: 'visible' }}>
                  <defs>
                    <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.2" />
                    </linearGradient>
                    <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2F5D8C" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#2F5D8C" stopOpacity="0.2" />
                    </linearGradient>
                  </defs>
                  <rect x="20"  y="36" width="55" height="54" fill="url(#g1)" rx="4" />
                  <rect x="115" y="18" width="55" height="72" fill="url(#g1)" rx="4" />
                  <rect x="210" y="9"  width="55" height="81" fill="url(#g1)" rx="4" />
                  <rect x="305" y="27" width="55" height="63" fill="url(#g2)" rx="4" />
                  <rect x="400" y="4"  width="55" height="86" fill="url(#g1)" rx="4" />
                  <rect x="495" y="22" width="55" height="68" fill="url(#g2)" rx="4" />
                  <rect x="590" y="12" width="55" height="78" fill="url(#g1)" rx="4" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-24 px-8" style={{ background: '#060d1b' }}>
        <Divider />
        <div className="max-w-[1160px] mx-auto pt-24">
          <span className="block text-[0.72rem] font-bold uppercase tracking-[0.14em] mb-4" style={{ color: A.light }}>
            How it works
          </span>
          <h2 className="text-[clamp(1.7rem,4vw,2.65rem)] font-extrabold tracking-tight leading-[1.12] m-0">
            A 3-step approach to AI transformation,<br />
            <span style={{ color: A.lighter }}>built for confidence</span>
          </h2>
          <div className="grid grid-cols-3 gap-10 mt-14">
            {[
              {
                num: '01', title: 'AI Readiness Assessment',
                desc: 'We evaluate your current operations, identify automation opportunities, and quantify the potential value unlocked by AI — before a single line of code is written.',
                icon: <path d="M3 9h12M3 5h12M3 13h8" stroke={A.light} strokeWidth="1.75" strokeLinecap="round" />,
              },
              {
                num: '02', title: 'Strategy & Roadmap',
                desc: 'We design a practical AI roadmap aligned to your business goals — prioritised by impact, feasibility, and speed to value. No buzzwords, just decisions that move the needle.',
                icon: <path d="M3 14l3-7 4 5 2.5-3.5 3 5.5" stroke={A.light} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />,
              },
              {
                num: '03', title: 'Implementation & Execution',
                desc: 'We build, deploy, and optimise AI workflows alongside your team — delivering measurable outcomes and transferring knowledge so your business stays in control.',
                icon: <><circle cx="9" cy="9" r="4" stroke={A.light} strokeWidth="1.75" /><path d="M9 4V2M9 16v-2M4 9H2M16 9h-2" stroke={A.light} strokeWidth="1.75" strokeLinecap="round" /></>,
              },
            ].map(({ num, title, desc, icon }) => (
              <div key={num}>
                <div className="font-mono text-[3.25rem] font-bold leading-none tracking-tight mb-5"
                  style={{ color: A.num }}>{num}</div>
                <div className="w-9 h-9 rounded-[9px] flex items-center justify-center mb-3.5"
                  style={{ background: A.bg12, border: `1px solid ${A.border25}` }}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">{icon}</svg>
                </div>
                <h3 className="text-[1.05rem] font-bold m-0 mb-2.5 tracking-tight">{title}</h3>
                <p className="text-sm leading-[1.75] m-0" style={{ color: '#8896a8' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────────────── */}
      <section id="services" className="py-24 px-8" style={{ background: '#060d1b' }}>
        <Divider />
        <div className="max-w-[1160px] mx-auto pt-24">
          <span className="block text-[0.72rem] font-bold uppercase tracking-[0.14em] mb-4" style={{ color: A.light }}>
            Services
          </span>
          <h2 className="text-[clamp(1.7rem,4vw,2.65rem)] font-extrabold tracking-tight leading-[1.12] m-0 max-w-[560px]">
            Two client types. One mission:<br />better AI decisions.
          </h2>
          <div className="grid grid-cols-2 gap-6 mt-12">
            <div className="rounded-2xl p-8 transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: '#0c1628', border: '1px solid rgba(47,93,140,0.25)' }}
              onMouseOver={e => (e.currentTarget.style.borderColor = A.border45)}
              onMouseOut={e  => (e.currentTarget.style.borderColor = 'rgba(47,93,140,0.25)')}>
              <div className="inline-flex items-center gap-2 text-[0.78rem] font-semibold px-3 py-1 rounded-full mb-6"
                style={{ background: A.bg12, border: `1px solid ${A.border35}`, color: A.light }}>
                For the CEO
              </div>
              <h3 className="text-[1.3rem] font-bold tracking-tight m-0 mb-3.5">Strategic clarity and ROI visibility</h3>
              <p className="text-sm leading-[1.75] m-0 mb-6" style={{ color: '#8896a8' }}>
                You need to know where AI creates value for your business — not just technically, but commercially.
                We frame every recommendation in terms of revenue, cost, and competitive advantage.
              </p>
              <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
                {['AI strategy & business case development', 'Board-ready AI readiness reports', 'Vendor selection & build-vs-buy analysis'].map(item => (
                  <li key={item} className="flex items-start gap-2.5 text-sm" style={{ color: 'rgba(255,255,255,0.8)' }}>
                    <span className="font-bold mt-0.5 flex-shrink-0" style={{ color: A.light }}>✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl p-8 transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: '#0c1628', border: '1px solid rgba(47,93,140,0.25)' }}
              onMouseOver={e => (e.currentTarget.style.borderColor = A.border45)}
              onMouseOut={e  => (e.currentTarget.style.borderColor = 'rgba(47,93,140,0.25)')}>
              <div className="inline-flex items-center gap-2 text-[0.78rem] font-semibold px-3 py-1 rounded-full mb-6"
                style={{ background: 'rgba(47,93,140,0.15)', border: '1px solid rgba(47,93,140,0.35)', color: '#7eb4e0' }}>
                For the Operations Lead
              </div>
              <h3 className="text-[1.3rem] font-bold tracking-tight m-0 mb-3.5">Workflow automation that actually works</h3>
              <p className="text-sm leading-[1.75] m-0 mb-6" style={{ color: '#8896a8' }}>
                You need AI embedded into your day-to-day operations — not a proof-of-concept that sits on a shelf.
                We design and deploy workflows your team will actually use.
              </p>
              <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
                {['Process mapping & automation scoping', 'AI workflow design & deployment', 'Team training & knowledge transfer'].map(item => (
                  <li key={item} className="flex items-start gap-2.5 text-sm" style={{ color: 'rgba(255,255,255,0.8)' }}>
                    <span className="font-bold mt-0.5 flex-shrink-0" style={{ color: '#7eb4e0' }}>✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────────────────── */}
      <section id="about" className="py-24 px-8" style={{ background: '#060d1b' }}>
        <Divider />
        <div className="max-w-[1160px] mx-auto pt-24">
          <div className="grid grid-cols-2 gap-20 items-center">
            <div>
              <span className="block text-[0.72rem] font-bold uppercase tracking-[0.14em] mb-4" style={{ color: A.light }}>
                Why Apex Nexus
              </span>
              <h2 className="text-[clamp(1.7rem,3.5vw,2.5rem)] font-extrabold tracking-tight leading-[1.12] m-0">
                Outcome-driven,<br />not technology-driven
              </h2>
              <p className="text-[0.925rem] leading-[1.8] mt-5 mb-0" style={{ color: '#8896a8' }}>
                Most AI consultants lead with tools and models. We lead with your business outcomes —
                revenue, efficiency, competitive advantage — and work backwards to the right solution.
              </p>
              <div className="flex flex-col gap-5 mt-8">
                {[
                  { n: '01', title: 'End-to-end delivery',       desc: 'From strategy through to execution — no hand-offs, no gaps, no surprises.' },
                  { n: '02', title: 'SME-specialist',            desc: 'Right-sized engagements without enterprise overhead or jargon.' },
                  { n: '03', title: 'Measurable deliverables',   desc: 'Every engagement has a defined scope, timeline, and success metric.' },
                ].map(({ n, title, desc }) => (
                  <div key={n} className="flex gap-4 items-start">
                    <div className="w-9 h-9 rounded-lg flex-shrink-0 flex items-center justify-center font-mono text-[0.78rem]"
                      style={{ background: A.bg12, border: `1px solid ${A.border25}`, color: A.light }}>
                      {n}
                    </div>
                    <div>
                      <strong className="text-sm font-semibold block mb-0.5">{title}</strong>
                      <span className="text-[0.83rem] leading-[1.6]" style={{ color: '#8896a8' }}>{desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative pb-6">
              <div className="rounded-2xl p-7 relative overflow-hidden"
                style={{ background: '#0c1628', border: '1px solid rgba(47,93,140,0.25)' }}>
                <div className="absolute -top-12 -right-12 w-56 h-56 pointer-events-none rounded-full"
                  style={{ background: `radial-gradient(circle, ${A.bg12} 0%, transparent 65%)` }} />
                <div className="relative z-10">
                  <img src="https://placehold.co/440x270/0c1628/2F5D8C?text=AI+Strategy+Session"
                    alt="Apex Nexus strategy session"
                    className="w-full rounded-xl mb-5 block" />
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold"
                      style={{ background: 'linear-gradient(135deg, #1F3A5F, #2F5D8C)' }}>AN</div>
                    <div>
                      <div className="text-sm font-semibold">Apex Nexus</div>
                      <div className="text-xs" style={{ color: '#8896a8' }}>AI Strategy Consultants · Hong Kong</div>
                    </div>
                    <div className="ml-auto text-[0.68rem] px-2.5 py-1 rounded-full"
                      style={{ background: A.bg12, border: `1px solid ${A.border25}`, color: A.light }}>
                      ● Available
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-0 -left-6 rounded-xl px-4 py-3.5"
                style={{ background: 'rgba(20,12,50,0.97)', border: `1px solid ${A.border35}`, backdropFilter: 'blur(14px)' }}>
                <div className="text-[0.65rem] uppercase tracking-[0.09em] mb-1" style={{ color: '#8896a8' }}>Latest project result</div>
                <div className="font-mono text-[1.35rem] font-bold leading-none" style={{ color: A.light }}>−68%</div>
                <div className="text-[0.7rem] mt-0.5" style={{ color: 'rgba(255,255,255,0.7)' }}>reduction in manual reporting time</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section id="contact" className="py-24 px-8 relative overflow-hidden text-center" style={{ background: '#060d1b' }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 50% 100%, rgba(47,93,140,0.2) 0%, transparent 55%), radial-gradient(ellipse at 50% 0%, ${A.bg08} 0%, transparent 55%)` }} />
        <div className="relative z-10 max-w-[660px] mx-auto flex flex-col items-center gap-6">
          <div className="inline-flex items-center gap-2 text-[0.78rem] font-semibold px-3.5 py-1.5 rounded-full"
            style={{ background: A.bg12, border: `1px solid ${A.border35}`, color: A.light }}>
            Limited availability — Q3 2026
          </div>
          <h2 className="text-[clamp(2rem,5vw,3.25rem)] font-black tracking-tight leading-[1.1] m-0">
            Ready to transform your<br />business with AI?
          </h2>
          <p className="text-base max-w-[460px] leading-[1.75] m-0" style={{ color: '#8896a8' }}>
            Book a free 30-minute strategy call. We'll identify your top AI opportunity
            and outline a practical path forward — no obligation.
          </p>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <a href="mailto:hello@apexnexus.hk"
              className="inline-flex items-center gap-2 text-[0.95rem] font-semibold px-7 py-3.5 rounded-lg no-underline"
              style={{ background: A.solid, color: 'white', boxShadow: A.shadow }}
              onMouseOver={e => (e.currentTarget.style.background = A.hover)}
              onMouseOut={e  => (e.currentTarget.style.background = A.solid)}>
              Book a free consultation →
            </a>
            <a href="mailto:hello@apexnexus.hk"
              className="inline-flex items-center gap-2 text-[0.95rem] font-semibold px-7 py-3.5 rounded-lg no-underline"
              style={{ background: 'rgba(255,255,255,0.06)', color: 'white', border: '1px solid rgba(255,255,255,0.14)' }}
              onMouseOver={e => { e.currentTarget.style.borderColor = A.border45; e.currentTarget.style.background = A.bg08 }}
              onMouseOut={e  => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}>
              hello@apexnexus.hk
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer className="max-w-[1160px] mx-auto px-8 py-7 flex items-center justify-between flex-wrap gap-4"
        style={{ borderTop: '1px solid rgba(47,93,140,0.25)' }}>
        <div className="flex items-center gap-2.5">
          <Logo />
          <span className="text-sm font-bold">Apex Nexus</span>
        </div>
        <div className="text-[0.78rem]" style={{ color: '#8896a8' }}>
          © 2026 Apex Nexus. Connecting Strategy to Execution.
        </div>
        <div className="flex gap-6">
          {['Privacy', 'LinkedIn', 'Contact'].map(link => (
            <a key={link} href="#" className="text-[0.78rem] no-underline hover:text-white transition-colors"
              style={{ color: '#8896a8' }}>{link}</a>
          ))}
        </div>
      </footer>

    </div>
  )
}
