export type Lang = 'en' | 'zh'

export const T = {
  en: {
    nav: {
      howItWorks: 'How it works',
      services:   'Services',
      results:    'Results',
      about:      'About',
      bookCall:   'Book a call →',
    },
    hero: {
      badge:    'AI Consulting · Hong Kong',
      h1a:      'Engineering high-value outcomes',
      h1b:      'through applied AI.',
      sub:      'Apex Nexus bridges the gap between AI strategy and real-world execution — practical, outcome-driven consulting for businesses navigating AI transformation.',
      ctaPrimary:   'Book a free consultation →',
      ctaSecondary: 'See how it works',
      stats: [
        { num: '3×',    desc: 'Average ROI\nacross engagements' },
        { num: '40+',   desc: 'AI projects\ndelivered in HK' },
        { num: '6 wks', desc: 'Average time\nto first outcome' },
      ],
      trustLine: 'Trusted by SMEs across Hong Kong',
      dashboard: {
        title: 'apex-nexus — AI Strategy Dashboard',
        metrics: [
          { label: 'AI Readiness Score', val: '87',   suffix: '/100', sub: '▲ +12 this quarter' },
          { label: 'Automation ROI',     val: '3.2×', suffix: '',     sub: '▲ On track' },
          { label: 'Hours Saved / Week', val: '124h', suffix: '',     sub: '▲ 4 workflows' },
        ],
        chartLabel: 'AI Implementation Progress',
      },
    },
    hiw: {
      label:   'How it works',
      h2a:     'A structured approach to AI transformation,',
      h2b:     'built for confidence.',
      cta:     'Start with a free assessment →',
      steps: [
        {
          num: '01', title: 'AI Readiness Assessment',
          desc: 'We evaluate your operations, identify automation opportunities, and quantify potential AI value — before a single line of code is written.',
        },
        {
          num: '02', title: 'Strategy & Roadmap',
          desc: 'We design a practical AI roadmap aligned to your business goals — prioritised by impact, feasibility, and speed to value. No buzzwords.',
        },
        {
          num: '03', title: 'Implementation & Execution',
          desc: 'We build, deploy, and optimise AI workflows alongside your team — delivering measurable outcomes and transferring knowledge so you stay in control.',
        },
      ],
    },
    services: {
      label: 'Services',
      h2:    'Two client profiles. One mission:\nbetter AI decisions.',
      ceo: {
        badge: '◆ For the CEO',
        h3:   'Strategic clarity and ROI visibility',
        desc: 'You need to know where AI creates value for your business — commercially, not just technically. We frame every recommendation in terms of revenue, cost, and competitive advantage.',
        items: ['AI strategy & business case development', 'Board-ready AI readiness reports', 'Vendor selection & build-vs-buy analysis'],
      },
      ops: {
        badge: '◆ For the Operations Lead',
        h3:   'Workflow automation that actually works',
        desc: 'You need AI embedded into your day-to-day operations — not a proof-of-concept on a shelf. We design and deploy workflows your team will actually use.',
        items: ['Process mapping & automation scoping', 'AI workflow design & deployment', 'Team training & knowledge transfer'],
      },
    },
    results: {
      label: 'Client results',
      h2a:   'Measurable outcomes,',
      h2b:   'every engagement.',
      cases: [
        {
          metric: '−68%',
          desc:   'Reduction in manual regulatory reporting time',
          detail: 'Built an automated document-processing pipeline that eliminated 3.5 days of weekly manual work across the compliance team.',
          tag:    'Financial Services',
        },
        {
          metric: '3.1×',
          desc:   'Inventory efficiency improvement via AI demand forecasting',
          detail: 'Replaced spreadsheet-based forecasting with an ML model trained on 4 years of transaction history. Live in 8 weeks.',
          tag:    'Retail & Distribution',
        },
        {
          metric: '4 hrs',
          desc:   'Contract review time down from 4 days per deal',
          detail: 'Deployed a document-intelligence pipeline that surfaces key clauses, flags non-standard terms, and auto-drafts summaries.',
          tag:    'Professional Services',
        },
      ],
    },
    about: {
      label: 'Why Apex Nexus',
      h2a:   'Outcome-driven,',
      h2b:   'not technology-driven.',
      desc:  'Most AI consultants lead with tools and models. We lead with your business outcomes — revenue, efficiency, competitive advantage — and work backwards to the right solution.',
      pillars: [
        { n: '01', title: 'End-to-end delivery',    desc: 'From strategy through to execution — no hand-offs, no gaps, no surprises.' },
        { n: '02', title: 'SME-specialist',          desc: 'Right-sized engagements without enterprise overhead or jargon.' },
        { n: '03', title: 'Measurable deliverables', desc: 'Every engagement has a defined scope, timeline, and success metric.' },
      ],
      card: {
        imgAlt:   'Apex Nexus strategy session',
        name:     'Apex Nexus',
        subtitle: 'AI Strategy Consultants · Hong Kong',
        available:'● Available',
      },
      floatCard: {
        label: 'Latest project result',
        value: '−68%',
        desc:  'reduction in manual reporting time',
      },
    },
    cta: {
      badge:  '◆ Limited availability — Q3 2026',
      h2a:    'Ready to transform your',
      h2b:    'business with AI?',
      desc:   'Book a free 30-minute strategy call. We\'ll identify your top AI opportunity and outline a practical path forward — no obligation.',
      primary:   'Book a free consultation →',
      secondary: 'hello@apexnexus.hk',
    },
    footer: {
      tagline: 'Connecting Strategy to Execution.\nAI consulting for Hong Kong SMEs.',
      services: { header: 'Services', links: ['AI Strategy Consulting', 'Readiness Assessments', 'Workflow Automation', 'Custom AI Development'] },
      company:  { header: 'Company',  links: ['How It Works', 'Client Results', 'About Us', 'Contact'] },
      contact:  { header: 'Contact' },
      copyright: '© 2026 Apex Nexus. All rights reserved.',
      privacy: 'Privacy Policy',
      terms:   'Terms of Service',
    },
  },

  zh: {
    nav: {
      howItWorks: '運作方式',
      services:   '服務',
      results:    '成效',
      about:      '關於我們',
      bookCall:   '預約通話 →',
    },
    hero: {
      badge:    'AI顧問服務・香港',
      h1a:      '以AI創造',
      h1b:      '高價值業務成果。',
      sub:      'Apex Nexus彌合AI策略與實際執行之間的落差——為香港中小企業提供切實可行、以成果為本的AI轉型顧問服務。',
      ctaPrimary:   '預約免費諮詢 →',
      ctaSecondary: '了解運作方式',
      stats: [
        { num: '3×',   desc: '各項目平均\n投資回報率' },
        { num: '40+',  desc: '在港完成\nAI項目' },
        { num: '6週',  desc: '達成首個成果\n的平均時間' },
      ],
      trustLine: '受香港各行業中小企業信任',
      dashboard: {
        title: 'apex-nexus — AI策略儀表板',
        metrics: [
          { label: 'AI準備指數',   val: '87',   suffix: '/100', sub: '▲ 本季升12分' },
          { label: '自動化回報率', val: '3.2×', suffix: '',     sub: '▲ 進展順利' },
          { label: '每週節省工時', val: '124小時', suffix: '',   sub: '▲ 跨4個工作流程' },
        ],
        chartLabel: 'AI實施進度',
      },
    },
    hiw: {
      label:   '運作方式',
      h2a:     '有系統的AI轉型方法，',
      h2b:     '讓您決策更具信心。',
      cta:     '立即預約免費評估 →',
      steps: [
        {
          num: '01', title: 'AI準備評估',
          desc: '我們全面評估您的業務運作，識別自動化機會，並量化AI帶來的潛在價值——在動一行代碼之前。',
        },
        {
          num: '02', title: '策略與路線圖',
          desc: '我們設計切實可行的AI路線圖，按影響力、可行性及見效速度排列優先順序。不說廢話，只談推動成果的決策。',
        },
        {
          num: '03', title: '落地實施與執行',
          desc: '我們與您的團隊並肩建構、部署及優化AI工作流程，交付可量化的成果，並轉移知識，確保您的業務持續掌控主動權。',
        },
      ],
    },
    services: {
      label: '服務',
      h2:    '兩類客戶，同一使命：\n做出更明智的AI決策。',
      ceo: {
        badge: '◆ 給行政總裁',
        h3:   '策略清晰度與投資回報可視性',
        desc: '您需要知道AI為業務創造哪些商業價值——不只是技術層面。我們以收入、成本及競爭優勢角度呈現每一項建議。',
        items: ['AI策略與商業案例制定', '適合董事會呈閱的AI準備報告', '供應商篩選及自建／外購分析'],
      },
      ops: {
        badge: '◆ 給營運主管',
        h3:   '真正落地的工作流程自動化',
        desc: '您需要AI融入日常運作——而非一個束之高閣的概念驗證項目。我們設計並部署您的團隊真正會使用的工作流程。',
        items: ['流程梳理及自動化範圍界定', 'AI工作流程設計與部署', '團隊培訓及知識轉移'],
      },
    },
    results: {
      label: '客戶成效',
      h2a:   '每次合作，',
      h2b:   '成效皆可量化。',
      cases: [
        {
          metric: '−68%',
          desc:   '減少人工合規報告處理時間',
          detail: '構建自動化文件處理流程，消除合規團隊每週3.5天的人工作業。',
          tag:    '金融服務',
        },
        {
          metric: '3.1×',
          desc:   'AI需求預測帶來的存貨效率提升',
          detail: '以機器學習模型取代電子表格預測，基於4年交易歷史訓練。8週內上線。',
          tag:    '零售及分銷',
        },
        {
          metric: '4小時',
          desc:   '合約審閱時間由4天縮短至4小時',
          detail: '部署文件智能流程，自動提取關鍵條款、標記非標準條款並生成摘要草稿。',
          tag:    '專業服務',
        },
      ],
    },
    about: {
      label: '為何選擇 Apex Nexus',
      h2a:   '以成果為本，',
      h2b:   '而非技術為本。',
      desc:  '大多數AI顧問以工具和模型為出發點。我們以您的業務成果為出發點——收入、效率、競爭優勢——再反向推導出最合適的解決方案。',
      pillars: [
        { n: '01', title: '端到端交付',   desc: '從策略到執行，一手包辦——無縫接棒，無空白地帶，無意外驚喜。' },
        { n: '02', title: '中小企專家',   desc: '量身定制的合作規模，無大型企業的繁文縟節。' },
        { n: '03', title: '可量化的交付物', desc: '每個項目均有明確的範圍、時間表及成功指標。' },
      ],
      card: {
        imgAlt:   'Apex Nexus策略會議',
        name:     'Apex Nexus',
        subtitle: 'AI策略顧問・香港',
        available:'● 現正接受項目',
      },
      floatCard: {
        label: '最新項目成果',
        value: '−68%',
        desc:  '減少人工報告時間',
      },
    },
    cta: {
      badge:  '◆ 名額有限——2026年第三季',
      h2a:    '準備好以AI',
      h2b:    '轉型您的業務？',
      desc:   '預約免費30分鐘策略通話。我們將識別您最優先的AI機會，並提供切實可行的前進方向——毫無義務。',
      primary:   '預約免費諮詢 →',
      secondary: 'hello@apexnexus.hk',
    },
    footer: {
      tagline: '連結策略與執行。\n為香港中小企業提供AI顧問服務。',
      services: { header: '服務', links: ['AI策略顧問', 'AI準備評估', '工作流程自動化', '定制AI開發'] },
      company:  { header: '公司',  links: ['運作方式', '客戶成效', '關於我們', '聯絡我們'] },
      contact:  { header: '聯絡' },
      copyright: '© 2026 Apex Nexus. 版權所有。',
      privacy: '私隱政策',
      terms:   '服務條款',
    },
  },
} as const
