import ShaderBackground from '@/components/ui/shader-background'

// Brand palette — Navy / Blue / Gold (per brand guidelines)
const B = {
  gold:    '#C8A24A',
  goldHov: '#b08838',
  goldLt:  '#d4b267',
  navy:    '#1F3A5F',
  blue:    '#2F5D8C',

  gold08:  'rgba(200,162,74,0.08)',
  gold12:  'rgba(200,162,74,0.12)',
  gold20:  'rgba(200,162,74,0.20)',
  goldB20: 'rgba(200,162,74,0.20)',
  goldB35: 'rgba(200,162,74,0.35)',
  goldB50: 'rgba(200,162,74,0.50)',
  goldSh:  '0 2px 20px rgba(200,162,74,0.28)',

  blueB20: 'rgba(47,93,140,0.20)',
  blueB30: 'rgba(47,93,140,0.30)',
  blueB45: 'rgba(47,93,140,0.45)',
  blue08:  'rgba(47,93,140,0.08)',
  blue12:  'rgba(47,93,140,0.12)',
}

// Logo mark — pentagon network graph matching brand identity
const LogoMark = ({ size = 30 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    {/* Outer pentagon edges */}
    <line x1="16"   y1="5"    x2="26.5" y2="12.5" stroke="#2F5D8C" strokeWidth="1.6" strokeOpacity="0.75"/>
    <line x1="26.5" y1="12.5" x2="22.5" y2="25"   stroke="#2F5D8C" strokeWidth="1.6" strokeOpacity="0.75"/>
    <line x1="22.5" y1="25"   x2="9.5"  y2="25"   stroke="#2F5D8C" strokeWidth="1.6" strokeOpacity="0.75"/>
    <line x1="9.5"  y1="25"   x2="5.5"  y2="12.5" stroke="#2F5D8C" strokeWidth="1.6" strokeOpacity="0.75"/>
    <line x1="5.5"  y1="12.5" x2="16"   y2="5"    stroke="#2F5D8C" strokeWidth="1.6" strokeOpacity="0.75"/>
    {/* Inner star / cross edges */}
    <line x1="16"   y1="5"    x2="22.5" y2="25"   stroke="#C8A24A" strokeWidth="1"   strokeOpacity="0.40"/>
    <line x1="16"   y1="5"    x2="9.5"  y2="25"   stroke="#C8A24A" strokeWidth="1"   strokeOpacity="0.40"/>
    <line x1="26.5" y1="12.5" x2="9.5"  y2="25"   stroke="#C8A24A" strokeWidth="1"   strokeOpacity="0.40"/>
    <line x1="26.5" y1="12.5" x2="5.5"  y2="12.5" stroke="#C8A24A" strokeWidth="1"   strokeOpacity="0.40"/>
    <line x1="22.5" y1="25"   x2="5.5"  y2="12.5" stroke="#C8A24A" strokeWidth="1"   strokeOpacity="0.40"/>
    {/* Outer nodes */}
    <circle cx="16"   cy="5"    r="2.5" fill="#2F5D8C"/>
    <circle cx="26.5" cy="12.5" r="2.2" fill="#1F3A5F"/>
    <circle cx="22.5" cy="25"   r="2.2" fill="#1F3A5F"/>
    <circle cx="9.5"  cy="25"   r="2.2" fill="#1F3A5F"/>
    <circle cx="5.5"  cy="12.5" r="2.2" fill="#2F5D8C"/>
    {/* Centre node */}
    <circle cx="16"   cy="16"   r="1.6" fill="rgba(47,93,140,0.45)"/>
    {/* Gold accent dots */}
    <circle cx="22"   cy="5.5"  r="1.1" fill="#C8A24A"/>
    <circle cx="28.5" cy="19"   r="1"   fill="#C8A24A"/>
    <circle cx="7.5"  cy="27.5" r="1"   fill="#C8A24A"/>
  </svg>
)

const Divider = () => (
  <div className="max-w-[1160px] mx-auto h-px"
    style={{ background: 'linear-gradient(to right, transparent, rgba(47,93,140,0.30), transparent)' }} />
)

const GoldDivider = () => (
  <div className="max-w-[1160px] mx-auto h-px"
    style={{ background: 'linear-gradient(to right, transparent, rgba(200,162,74,0.35), transparent)' }} />
)

export default function App() {
  return (
    <div className="grain min-h-screen text-white font-sans">

      {/* ── NAV ──────────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b"
        style={{ background: 'rgba(5,9,20,0.85)', backdropFilter: 'blur(16px) saturate(1.5)', borderColor: B.blueB30 }}>
        <div className="max-w-[1160px] mx-auto px-8 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 no-underline">
            <LogoMark size={28} />
            <span className="font-bold text-[0.95rem] tracking-tight text-white">Apex Nexus</span>
          </a>
          <div className="flex items-center gap-7">
            <a href="#how-it-works" className="text-sm text-white/55 hover:text-white transition-colors duration-150 no-underline">How it works</a>
            <a href="#services"     className="text-sm text-white/55 hover:text-white transition-colors duration-150 no-underline">Services</a>
            <a href="#results"      className="text-sm text-white/55 hover:text-white transition-colors duration-150 no-underline">Results</a>
            <a href="#about"        className="text-sm text-white/55 hover:text-white transition-colors duration-150 no-underline">About</a>
            <a href="#contact"
              className="text-xs font-semibold px-4 py-2 rounded-lg no-underline transition-all duration-150"
              style={{ background: B.gold, color: '#0a0f1e', boxShadow: B.goldSh }}
              onMouseOver={e => (e.currentTarget.style.background = B.goldHov)}
              onMouseOut={e  => (e.currentTarget.style.background = B.gold)}>
              Book a call →
            </a>
          </div>
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <ShaderBackground />

      <section className="relative min-h-screen flex flex-col items-center justify-start pt-[136px] pb-24 text-center overflow-hidden">

        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 68% at 50% 44%, rgba(3,6,16,0.92) 0%, rgba(3,6,16,0.65) 45%, transparent 72%)' }} />

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none w-full h-[380px]"
          style={{ background: `radial-gradient(ellipse at center bottom, rgba(200,162,74,0.10) 0%, transparent 65%)` }} />

        <div className="relative z-10 max-w-[860px] mx-auto px-8 flex flex-col items-center gap-6">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 text-[0.76rem] font-semibold px-3.5 py-1.5 rounded-full tracking-wide"
            style={{ background: B.gold08, border: `1px solid ${B.goldB35}`, color: B.goldLt }}>
            <span style={{ color: B.gold }}>◆</span>
            AI Consulting · Hong Kong
          </div>

          {/* Headline */}
          <h1 className="text-[clamp(2.6rem,6vw,4.4rem)] font-black leading-[1.07] tracking-[-0.036em] m-0">
            Engineering high-value outcomes<br />
            <span style={{ color: B.goldLt }}>through applied AI.</span>
          </h1>

          {/* Sub */}
          <p className="text-[1.05rem] max-w-[530px] leading-[1.78] m-0" style={{ color: '#9ba8bc' }}>
            Apex Nexus bridges the gap between AI strategy and real-world execution —
            practical, outcome-driven consulting for businesses navigating AI transformation.
          </p>

          {/* CTAs */}
          <div className="flex gap-3.5 flex-wrap justify-center mt-1">
            <a href="#contact"
              className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-lg no-underline transition-all duration-150"
              style={{ background: B.gold, color: '#0a0f1e', boxShadow: B.goldSh }}
              onMouseOver={e => (e.currentTarget.style.background = B.goldHov)}
              onMouseOut={e  => (e.currentTarget.style.background = B.gold)}>
              Book a free consultation →
            </a>
            <a href="#how-it-works"
              className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-lg no-underline transition-colors duration-150"
              style={{ background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)' }}
              onMouseOver={e => { e.currentTarget.style.borderColor = B.goldB35; e.currentTarget.style.background = B.gold08 }}
              onMouseOut={e  => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}>
              See how it works
            </a>
          </div>

          {/* Stats */}
          <div className="flex gap-4 flex-wrap justify-center mt-3">
            {[
              { num: '3×',    desc: 'Average ROI\nacross engagements' },
              { num: '40+',   desc: 'AI projects\ndelivered in HK' },
              { num: '6 wks', desc: 'Average time\nto first outcome' },
            ].map(({ num, desc }) => (
              <div key={num} className="text-left px-6 py-4 rounded-xl"
                style={{ background: 'rgba(8,12,26,0.78)', border: `1px solid ${B.blueB30}`, backdropFilter: 'blur(12px)' }}>
                <div className="font-mono text-[1.85rem] font-semibold leading-none" style={{ color: B.gold }}>{num}</div>
                <div className="text-xs mt-1.5 leading-[1.5] whitespace-pre-line" style={{ color: '#8896a8' }}>{desc}</div>
              </div>
            ))}
          </div>

          {/* Trust line */}
          <div className="mt-7 w-full">
            <p className="text-[0.72rem] uppercase tracking-[0.12em] mb-4" style={{ color: '#566070' }}>
              Trusted by SMEs across Hong Kong
            </p>
            <div className="flex items-center justify-center gap-10 flex-wrap">
              {['Ascent', 'Lumina', 'Vantage', 'Meridian', 'Pinnacle'].map(name => (
                <span key={name} className="text-[0.8rem] font-bold uppercase tracking-[0.09em]"
                  style={{ color: 'rgba(255,255,255,0.15)' }}>{name}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Dashboard mockup */}
        <div className="relative z-10 w-full max-w-[960px] mx-auto mt-14 px-8">
          <div className="rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(6,10,24,0.96)',
              border: `1px solid ${B.blueB30}`,
              boxShadow: `0 0 0 1px rgba(200,162,74,0.05), 0 28px 80px rgba(0,0,0,0.75), 0 0 80px rgba(31,58,95,0.25)`,
            }}>
            <div className="flex items-center gap-2 px-5 py-2.5 border-b"
              style={{ background: 'rgba(8,10,24,0.98)', borderColor: B.blueB30 }}>
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              <span className="font-mono text-[0.72rem] ml-3" style={{ color: '#8896a8' }}>
                apex-nexus — AI Strategy Dashboard
              </span>
            </div>
            <div className="p-6" style={{ background: 'rgba(4,6,18,0.98)' }}>
              <div className="grid grid-cols-3 gap-4 mb-5">
                {[
                  { label: 'AI Readiness Score', val: '87', suffix: '/100', sub: '▲ +12 this quarter', subC: '#3dfd98' },
                  { label: 'Automation ROI',      val: '3.2×', suffix: '',    sub: '▲ On track',         subC: '#3dfd98' },
                  { label: 'Hours Saved / Week',  val: '124h', suffix: '',    sub: '▲ 4 workflows',      subC: '#3dfd98' },
                ].map(({ label, val, suffix, sub, subC }) => (
                  <div key={label} className="rounded-xl p-3.5"
                    style={{ background: 'rgba(20,28,52,0.60)', border: `1px solid ${B.blueB30}` }}>
                    <div className="text-[0.63rem] uppercase tracking-[0.09em] mb-1.5" style={{ color: '#8896a8' }}>{label}</div>
                    <div className="font-mono text-[1.55rem] font-semibold leading-none" style={{ color: B.gold }}>
                      {val}<span className="text-sm" style={{ color: '#8896a8' }}>{suffix}</span>
                    </div>
                    <div className="text-[0.63rem] mt-1" style={{ color: subC }}>{sub}</div>
                  </div>
                ))}
              </div>
              <div className="rounded-xl p-4 min-h-[110px]"
                style={{ background: 'rgba(20,28,52,0.30)', border: `1px solid ${B.blueB30}` }}>
                <div className="text-[0.63rem] uppercase tracking-[0.09em] mb-3" style={{ color: '#8896a8' }}>
                  AI Implementation Progress
                </div>
                <svg viewBox="0 0 800 90" width="100%" height="68" style={{ display: 'block', overflow: 'visible' }}>
                  <defs>
                    <linearGradient id="gGold" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#C8A24A" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#C8A24A" stopOpacity="0.2" />
                    </linearGradient>
                    <linearGradient id="gBlue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2F5D8C" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#2F5D8C" stopOpacity="0.2" />
                    </linearGradient>
                  </defs>
                  <rect x="20"  y="36" width="55" height="54" fill="url(#gGold)" rx="4" />
                  <rect x="115" y="18" width="55" height="72" fill="url(#gGold)" rx="4" />
                  <rect x="210" y="9"  width="55" height="81" fill="url(#gGold)" rx="4" />
                  <rect x="305" y="27" width="55" height="63" fill="url(#gBlue)" rx="4" />
                  <rect x="400" y="4"  width="55" height="86" fill="url(#gGold)" rx="4" />
                  <rect x="495" y="22" width="55" height="68" fill="url(#gBlue)" rx="4" />
                  <rect x="590" y="12" width="55" height="78" fill="url(#gGold)" rx="4" />
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
          <span className="block text-[0.72rem] font-bold uppercase tracking-[0.14em] mb-4" style={{ color: B.gold }}>
            How it works
          </span>
          <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
            <h2 className="text-[clamp(1.7rem,4vw,2.6rem)] font-extrabold tracking-tight leading-[1.12] m-0">
              A structured approach to AI transformation,<br />
              <span style={{ color: B.goldLt }}>built for confidence.</span>
            </h2>
            <a href="#contact"
              className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-lg no-underline transition-colors duration-150 flex-shrink-0"
              style={{ background: B.gold08, border: `1px solid ${B.goldB35}`, color: B.goldLt }}
              onMouseOver={e => (e.currentTarget.style.background = B.gold12)}
              onMouseOut={e  => (e.currentTarget.style.background = B.gold08)}>
              Start with a free assessment →
            </a>
          </div>
          <div className="grid grid-cols-3 gap-10">
            {[
              {
                num: '01', title: 'AI Readiness Assessment',
                desc: 'We evaluate your operations, identify automation opportunities, and quantify potential AI value — before a single line of code is written.',
                icon: <path d="M3 9h12M3 5h12M3 13h8" stroke={B.gold} strokeWidth="1.75" strokeLinecap="round" />,
              },
              {
                num: '02', title: 'Strategy & Roadmap',
                desc: 'We design a practical AI roadmap aligned to your business goals — prioritised by impact, feasibility, and speed to value. No buzzwords.',
                icon: <path d="M3 14l3-7 4 5 2.5-3.5 3 5.5" stroke={B.gold} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />,
              },
              {
                num: '03', title: 'Implementation & Execution',
                desc: 'We build, deploy, and optimise AI workflows alongside your team — delivering measurable outcomes and transferring knowledge so you stay in control.',
                icon: <><circle cx="9" cy="9" r="4" stroke={B.gold} strokeWidth="1.75" /><path d="M9 4V2M9 16v-2M4 9H2M16 9h-2" stroke={B.gold} strokeWidth="1.75" strokeLinecap="round" /></>,
              },
            ].map(({ num, title, desc, icon }) => (
              <div key={num} className="relative">
                <div className="font-mono text-[3.5rem] font-bold leading-none tracking-tight mb-5 select-none"
                  style={{ color: 'rgba(200,162,74,0.12)' }}>{num}</div>
                <div className="w-9 h-9 rounded-[9px] flex items-center justify-center mb-4"
                  style={{ background: B.gold08, border: `1px solid ${B.goldB35}` }}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">{icon}</svg>
                </div>
                <h3 className="text-[1.05rem] font-bold m-0 mb-2.5 tracking-tight">{title}</h3>
                <p className="text-sm leading-[1.78] m-0" style={{ color: '#8896a8' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────────────── */}
      <section id="services" className="py-24 px-8" style={{ background: '#060d1b' }}>
        <Divider />
        <div className="max-w-[1160px] mx-auto pt-24">
          <span className="block text-[0.72rem] font-bold uppercase tracking-[0.14em] mb-4" style={{ color: B.gold }}>
            Services
          </span>
          <h2 className="text-[clamp(1.7rem,4vw,2.6rem)] font-extrabold tracking-tight leading-[1.12] m-0 mb-12 max-w-[560px]">
            Two client profiles. One mission:<br />better AI decisions.
          </h2>
          <div className="grid grid-cols-2 gap-6">

            {/* CEO card */}
            <div className="rounded-2xl p-8 transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: '#0b1524', border: `1px solid ${B.blueB30}` }}
              onMouseOver={e => (e.currentTarget.style.borderColor = B.goldB35)}
              onMouseOut={e  => (e.currentTarget.style.borderColor = B.blueB30)}>
              <div className="inline-flex items-center gap-2 text-[0.75rem] font-semibold px-3 py-1 rounded-full mb-6"
                style={{ background: B.gold08, border: `1px solid ${B.goldB35}`, color: B.goldLt }}>
                ◆ For the CEO
              </div>
              <h3 className="text-[1.25rem] font-bold tracking-tight m-0 mb-3.5">Strategic clarity and ROI visibility</h3>
              <p className="text-sm leading-[1.78] m-0 mb-6" style={{ color: '#8896a8' }}>
                You need to know where AI creates value for your business — commercially, not just technically.
                We frame every recommendation in terms of revenue, cost, and competitive advantage.
              </p>
              <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
                {['AI strategy & business case development', 'Board-ready AI readiness reports', 'Vendor selection & build-vs-buy analysis'].map(item => (
                  <li key={item} className="flex items-start gap-2.5 text-sm" style={{ color: 'rgba(255,255,255,0.82)' }}>
                    <span className="font-bold mt-0.5 flex-shrink-0" style={{ color: B.gold }}>✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Ops Lead card */}
            <div className="rounded-2xl p-8 transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: '#0b1524', border: `1px solid ${B.blueB30}` }}
              onMouseOver={e => (e.currentTarget.style.borderColor = B.blueB45)}
              onMouseOut={e  => (e.currentTarget.style.borderColor = B.blueB30)}>
              <div className="inline-flex items-center gap-2 text-[0.75rem] font-semibold px-3 py-1 rounded-full mb-6"
                style={{ background: 'rgba(47,93,140,0.15)', border: `1px solid ${B.blueB45}`, color: '#7eb4e0' }}>
                ◆ For the Operations Lead
              </div>
              <h3 className="text-[1.25rem] font-bold tracking-tight m-0 mb-3.5">Workflow automation that actually works</h3>
              <p className="text-sm leading-[1.78] m-0 mb-6" style={{ color: '#8896a8' }}>
                You need AI embedded into your day-to-day operations — not a proof-of-concept on a shelf.
                We design and deploy workflows your team will actually use.
              </p>
              <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
                {['Process mapping & automation scoping', 'AI workflow design & deployment', 'Team training & knowledge transfer'].map(item => (
                  <li key={item} className="flex items-start gap-2.5 text-sm" style={{ color: 'rgba(255,255,255,0.82)' }}>
                    <span className="font-bold mt-0.5 flex-shrink-0" style={{ color: '#7eb4e0' }}>✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── RESULTS ──────────────────────────────────────────────────────── */}
      <section id="results" className="py-24 px-8" style={{ background: '#060d1b' }}>
        <GoldDivider />
        <div className="max-w-[1160px] mx-auto pt-24">
          <span className="block text-[0.72rem] font-bold uppercase tracking-[0.14em] mb-4" style={{ color: B.gold }}>
            Client results
          </span>
          <h2 className="text-[clamp(1.7rem,4vw,2.6rem)] font-extrabold tracking-tight leading-[1.12] m-0 mb-12">
            Measurable outcomes,<br />
            <span style={{ color: B.goldLt }}>every engagement.</span>
          </h2>
          <div className="grid grid-cols-3 gap-6">
            {[
              {
                metric: '−68%',
                desc: 'Reduction in manual regulatory reporting time',
                detail: 'Built an automated document-processing pipeline that eliminated 3.5 days of weekly manual work across the compliance team.',
                tag: 'Financial Services',
              },
              {
                metric: '3.1×',
                desc: 'Inventory efficiency improvement via AI demand forecasting',
                detail: 'Replaced spreadsheet-based forecasting with an ML model trained on 4 years of transaction history. Live in 8 weeks.',
                tag: 'Retail & Distribution',
              },
              {
                metric: '4 hrs',
                desc: 'Contract review time down from 4 days per deal',
                detail: 'Deployed a document-intelligence pipeline that surfaces key clauses, flags non-standard terms, and auto-drafts summaries.',
                tag: 'Professional Services',
              },
            ].map(({ metric, desc, detail, tag }) => (
              <div key={metric} className="rounded-2xl p-7 flex flex-col gap-4 hover:-translate-y-0.5 transition-transform duration-200"
                style={{ background: '#0b1524', border: `1px solid ${B.blueB30}` }}>
                <div>
                  <div className="font-mono text-[2.8rem] font-bold leading-none tracking-tight" style={{ color: B.gold }}>{metric}</div>
                  <div className="text-sm font-semibold mt-2 leading-[1.45]">{desc}</div>
                </div>
                <p className="text-[0.82rem] leading-[1.75] m-0 flex-1" style={{ color: '#8896a8' }}>{detail}</p>
                <div className="inline-flex items-center self-start text-[0.68rem] font-semibold px-2.5 py-1 rounded-full"
                  style={{ background: B.gold08, border: `1px solid ${B.goldB20}`, color: B.goldLt }}>
                  {tag}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────────────────── */}
      <section id="about" className="py-24 px-8" style={{ background: '#060d1b' }}>
        <Divider />
        <div className="max-w-[1160px] mx-auto pt-24">
          <div className="grid grid-cols-2 gap-20 items-center">
            <div>
              <span className="block text-[0.72rem] font-bold uppercase tracking-[0.14em] mb-4" style={{ color: B.gold }}>
                Why Apex Nexus
              </span>
              <h2 className="text-[clamp(1.7rem,3.5vw,2.5rem)] font-extrabold tracking-tight leading-[1.12] m-0">
                Outcome-driven,<br />not technology-driven.
              </h2>
              <p className="text-[0.925rem] leading-[1.82] mt-5 mb-0" style={{ color: '#8896a8' }}>
                Most AI consultants lead with tools and models. We lead with your business outcomes —
                revenue, efficiency, competitive advantage — and work backwards to the right solution.
              </p>
              <div className="flex flex-col gap-5 mt-8">
                {[
                  { n: '01', title: 'End-to-end delivery',     desc: 'From strategy through to execution — no hand-offs, no gaps, no surprises.' },
                  { n: '02', title: 'SME-specialist',           desc: 'Right-sized engagements without enterprise overhead or jargon.' },
                  { n: '03', title: 'Measurable deliverables',  desc: 'Every engagement has a defined scope, timeline, and success metric.' },
                ].map(({ n, title, desc }) => (
                  <div key={n} className="flex gap-4 items-start">
                    <div className="w-9 h-9 rounded-lg flex-shrink-0 flex items-center justify-center font-mono text-[0.78rem] font-semibold"
                      style={{ background: B.gold08, border: `1px solid ${B.goldB35}`, color: B.gold }}>
                      {n}
                    </div>
                    <div>
                      <strong className="text-sm font-semibold block mb-0.5">{title}</strong>
                      <span className="text-[0.83rem] leading-[1.65]" style={{ color: '#8896a8' }}>{desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative pb-6">
              <div className="rounded-2xl p-7 relative overflow-hidden"
                style={{ background: '#0b1524', border: `1px solid ${B.blueB30}` }}>
                <div className="absolute -top-14 -right-14 w-64 h-64 pointer-events-none rounded-full"
                  style={{ background: `radial-gradient(circle, rgba(200,162,74,0.07) 0%, transparent 65%)` }} />
                <div className="relative z-10">
                  <img src="https://placehold.co/440x260/0b1524/1F3A5F?text=AI+Strategy+Session"
                    alt="Apex Nexus strategy session"
                    className="w-full rounded-xl mb-5 block" />
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center"
                      style={{ background: 'linear-gradient(135deg, #1F3A5F, #2F5D8C)' }}>
                      <LogoMark size={20} />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">Apex Nexus</div>
                      <div className="text-xs" style={{ color: '#8896a8' }}>AI Strategy Consultants · Hong Kong</div>
                    </div>
                    <div className="ml-auto text-[0.68rem] font-semibold px-2.5 py-1 rounded-full"
                      style={{ background: B.gold08, border: `1px solid ${B.goldB35}`, color: B.goldLt }}>
                      ● Available
                    </div>
                  </div>
                </div>
              </div>
              {/* Floating stat */}
              <div className="absolute -bottom-0 -left-6 rounded-xl px-4 py-3.5"
                style={{ background: 'rgba(14,10,36,0.97)', border: `1px solid ${B.goldB35}`, backdropFilter: 'blur(14px)' }}>
                <div className="text-[0.63rem] uppercase tracking-[0.09em] mb-1" style={{ color: '#8896a8' }}>Latest project result</div>
                <div className="font-mono text-[1.35rem] font-bold leading-none" style={{ color: B.gold }}>−68%</div>
                <div className="text-[0.7rem] mt-0.5" style={{ color: 'rgba(255,255,255,0.7)' }}>reduction in manual reporting time</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section id="contact" className="py-28 px-8 relative overflow-hidden text-center" style={{ background: '#060d1b' }}>
        <GoldDivider />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 50% 100%, rgba(47,93,140,0.18) 0%, transparent 55%), radial-gradient(ellipse at 50% 10%, rgba(200,162,74,0.08) 0%, transparent 55%)` }} />
        <div className="relative z-10 max-w-[660px] mx-auto flex flex-col items-center gap-6 pt-20">
          <div className="inline-flex items-center gap-2 text-[0.76rem] font-semibold px-3.5 py-1.5 rounded-full"
            style={{ background: B.gold08, border: `1px solid ${B.goldB35}`, color: B.goldLt }}>
            ◆ Limited availability — Q3 2026
          </div>
          <h2 className="text-[clamp(2rem,5vw,3.25rem)] font-black tracking-tight leading-[1.08] m-0">
            Ready to transform your<br />business with AI?
          </h2>
          <p className="text-[1rem] max-w-[480px] leading-[1.78] m-0" style={{ color: '#8896a8' }}>
            Book a free 30-minute strategy call. We'll identify your top AI opportunity
            and outline a practical path forward — no obligation.
          </p>
          <div className="flex items-center gap-4 flex-wrap justify-center mt-2">
            <a href="mailto:hello@apexnexus.hk"
              className="inline-flex items-center gap-2 text-[0.95rem] font-semibold px-7 py-3.5 rounded-lg no-underline transition-colors duration-150"
              style={{ background: B.gold, color: '#0a0f1e', boxShadow: B.goldSh }}
              onMouseOver={e => (e.currentTarget.style.background = B.goldHov)}
              onMouseOut={e  => (e.currentTarget.style.background = B.gold)}>
              Book a free consultation →
            </a>
            <a href="mailto:hello@apexnexus.hk"
              className="inline-flex items-center gap-2 text-[0.95rem] font-medium px-7 py-3.5 rounded-lg no-underline transition-colors duration-150"
              style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.75)', border: '1px solid rgba(255,255,255,0.12)' }}
              onMouseOver={e => { e.currentTarget.style.borderColor = B.goldB35; e.currentTarget.style.color = 'white' }}
              onMouseOut={e  => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = 'rgba(255,255,255,0.75)' }}>
              hello@apexnexus.hk
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer style={{ background: '#04070f', borderTop: `1px solid ${B.blueB30}` }}>
        <div className="max-w-[1160px] mx-auto px-8 py-12 grid grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-1">
            <a href="#" className="flex items-center gap-2.5 no-underline mb-4">
              <LogoMark size={24} />
              <span className="text-sm font-bold text-white">Apex Nexus</span>
            </a>
            <p className="text-[0.8rem] leading-[1.7] m-0" style={{ color: '#566070' }}>
              Connecting Strategy to Execution.<br />
              AI consulting for Hong Kong SMEs.
            </p>
          </div>

          {/* Services */}
          <div>
            <div className="text-[0.7rem] font-bold uppercase tracking-[0.1em] mb-4" style={{ color: B.gold }}>Services</div>
            <div className="flex flex-col gap-2.5">
              {['AI Strategy Consulting', 'Readiness Assessments', 'Workflow Automation', 'Custom AI Development'].map(item => (
                <a key={item} href="#services" className="text-[0.82rem] no-underline hover:text-white transition-colors duration-150"
                  style={{ color: '#566070' }}>{item}</a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <div className="text-[0.7rem] font-bold uppercase tracking-[0.1em] mb-4" style={{ color: B.gold }}>Company</div>
            <div className="flex flex-col gap-2.5">
              {['How It Works', 'Client Results', 'About Us', 'Contact'].map((item, i) => (
                <a key={item} href={['#how-it-works','#results','#about','#contact'][i]}
                  className="text-[0.82rem] no-underline hover:text-white transition-colors duration-150"
                  style={{ color: '#566070' }}>{item}</a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <div className="text-[0.7rem] font-bold uppercase tracking-[0.1em] mb-4" style={{ color: B.gold }}>Contact</div>
            <div className="flex flex-col gap-2.5">
              <a href="mailto:hello@apexnexus.hk" className="text-[0.82rem] no-underline hover:text-white transition-colors duration-150"
                style={{ color: '#566070' }}>hello@apexnexus.hk</a>
              <span className="text-[0.82rem]" style={{ color: '#566070' }}>Hong Kong SAR</span>
              <a href="https://linkedin.com" className="text-[0.82rem] no-underline hover:text-white transition-colors duration-150"
                style={{ color: '#566070' }}>LinkedIn</a>
            </div>
          </div>
        </div>

        <div className="max-w-[1160px] mx-auto px-8 py-5 flex items-center justify-between flex-wrap gap-4"
          style={{ borderTop: `1px solid ${B.blueB20}` }}>
          <span className="text-[0.75rem]" style={{ color: '#3a4455' }}>© 2026 Apex Nexus. All rights reserved.</span>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service'].map(link => (
              <a key={link} href="#" className="text-[0.75rem] no-underline hover:text-white transition-colors duration-150"
                style={{ color: '#3a4455' }}>{link}</a>
            ))}
          </div>
        </div>
      </footer>

    </div>
  )
}
