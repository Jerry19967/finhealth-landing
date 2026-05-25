'use client'

import Image from 'next/image'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useRef } from 'react'
import {
  ArrowRight, Bot, HeartPulse, Shield, Target, TrendingUp, Wallet,
  Calculator, PieChart, BarChart2, AlertTriangle, FileText, CheckCircle,
  PiggyBank, Flag, LineChart, CreditCard, GitCompare, Zap, Receipt,
  BadgePercent, MessageSquare, FileSearch, Landmark, Activity, Sparkles,
} from 'lucide-react'

/* ─────────────────────── DATA (unchanged) ─────────────────────── */

const SIGNUP = 'https://financialai-frontend-lime.vercel.app/signup'

const sections = [
  { title: 'AI Financial Dashboard',     eyebrow: 'Financial Command Center',  description: 'Monitor savings, expenses, investments, alerts, and your complete financial health in one AI-powered workspace.',           icon: Wallet,     image: '/screens/dashboard.png',       accent: '#22d3ee' },
  { title: 'Autonomous AI Alerts',       eyebrow: 'Always-On Risk Detection',  description: 'Your AI agent detects emergency fund gaps, missed SIPs, portfolio risks, and money opportunities automatically.',          icon: Bot,        image: '/screens/alerts.png',          accent: '#a78bfa' },
  { title: 'Financial Health Analysis',  eyebrow: 'Score, Red Flags & Action', description: 'Understand strengths, red flags, action plans, and your overall money position with clear AI insights.',                   icon: HeartPulse, image: '/screens/financial-health.png',accent: '#f472b6' },
  { title: 'Investment Intelligence',    eyebrow: 'SIP & Wealth Projection',   description: 'Visualize SIP projections, long-term wealth growth, and portfolio optimization insights tailored to your numbers.',         icon: TrendingUp, image: '/screens/investments.png',     accent: '#34d399' },
  { title: 'Insurance Analysis',         eyebrow: 'Policy & Coverage Review',  description: 'Analyze policy IRR, hidden charges, coverage gaps, and insurance efficiency instantly.',                                    icon: Shield,     image: '/screens/insurance.png',       accent: '#60a5fa' },
  { title: 'Goal & Retirement Planning', eyebrow: 'Future Planning',           description: 'Plan retirement, child education, wealth goals, and long-term financial freedom with clarity.',                             icon: Target,     image: '/screens/planning.png',        accent: '#fb923c' },
  { title: 'AI Financial Agent',         eyebrow: 'Personal Money Assistant',  description: 'Ask your personal AI agent questions about savings, tax, SIPs, insurance, risks, and next actions — anytime.',             icon: Bot,        image: '/screens/agent.png',           accent: '#22d3ee' },
]

const toolCategories = [
  {
    category: 'Investments', color: 'cyan', description: 'Plan and analyze your investment strategies',
    tools: [
      { name: 'SIP Calculator',      desc: 'Calculate your SIP maturity value and wealth growth',          icon: Calculator    },
      { name: 'Portfolio Analyzer',  desc: 'Analyze your portfolio performance and allocation',             icon: PieChart      },
      { name: 'Return Calculator',   desc: 'Calculate CAGR and annualized returns on investments',          icon: BarChart2     },
      { name: 'Risk Analysis',       desc: 'Assess your portfolio risk and get rebalancing signals',        icon: AlertTriangle },
    ],
  },
  {
    category: 'Insurance', color: 'violet', description: 'Evaluate and optimize your insurance coverage',
    tools: [
      { name: 'Policy Analyzer',     desc: 'Upload any policy and get real IRR and hidden charges',         icon: FileText      },
      { name: 'IRR Calculator',      desc: 'Calculate the true Internal Rate of Return on your policy',    icon: Calculator    },
      { name: 'Coverage Checker',    desc: 'Check if your life and health coverage is adequate',            icon: CheckCircle   },
    ],
  },
  {
    category: 'Financial Planning', color: 'sky', description: 'Build a roadmap for your financial goals',
    tools: [
      { name: 'Retirement Planner',  desc: 'Plan your retirement corpus and monthly savings needed',        icon: PiggyBank     },
      { name: 'Goal Planning',       desc: 'Set financial goals and track progress with projections',       icon: Flag          },
      { name: 'Wealth Projection',   desc: 'Project your net worth growth over the next 10–30 years',      icon: LineChart     },
    ],
  },
  {
    category: 'Loans', color: 'emerald', description: 'Manage your borrowings smartly',
    tools: [
      { name: 'EMI Calculator',      desc: 'Calculate monthly EMI for home, car, or personal loans',        icon: CreditCard    },
      { name: 'Loan Comparison',     desc: 'Compare multiple loan offers side by side on real cost',        icon: GitCompare    },
      { name: 'Prepayment Strategy', desc: 'Find the optimal prepayment plan to save on interest',          icon: Zap           },
    ],
  },
  {
    category: 'Tax', color: 'amber', description: 'Minimize your tax liability legally',
    tools: [
      { name: 'Tax Calculator',      desc: 'Compare old vs new income tax regime for your income',          icon: Receipt       },
      { name: 'Deduction Optimizer', desc: 'Find all deductions under 80C, 80D, HRA, and more',             icon: BadgePercent  },
    ],
  },
  {
    category: 'AI Tools', color: 'rose', description: 'AI-powered financial intelligence',
    tools: [
      { name: 'Financial Assistant', desc: 'Chat with AI for instant answers to financial questions',       icon: MessageSquare },
      { name: 'Report Explainer',    desc: 'Upload any financial document and get a plain-English summary', icon: FileSearch    },
    ],
  },
]

/* ─────────────────────── PALETTE ─────────────────────── */

type PaletteKey = 'cyan' | 'violet' | 'sky' | 'emerald' | 'amber' | 'rose'

const palette: Record<PaletteKey, {
  border: string; badgeBg: string; badgeText: string; badgeBorder: string;
  iconBg: string; iconText: string; rowHover: string; glowBg: string;
  arrowText: string; gradFrom: string; gradTo: string; hex: string;
}> = {
  cyan:    { border:'rgba(34,211,238,0.2)',  badgeBg:'rgba(34,211,238,0.08)',  badgeText:'#67e8f9', badgeBorder:'rgba(34,211,238,0.25)',  iconBg:'rgba(34,211,238,0.12)',  iconText:'#22d3ee', rowHover:'rgba(34,211,238,0.07)',   glowBg:'#22d3ee', arrowText:'#22d3ee', gradFrom:'rgba(34,211,238,0.15)',  gradTo:'rgba(34,211,238,0)',   hex:'#22d3ee' },
  violet:  { border:'rgba(167,139,250,0.2)', badgeBg:'rgba(167,139,250,0.08)', badgeText:'#c4b5fd', badgeBorder:'rgba(167,139,250,0.25)', iconBg:'rgba(167,139,250,0.12)', iconText:'#a78bfa', rowHover:'rgba(167,139,250,0.07)',  glowBg:'#a78bfa', arrowText:'#a78bfa', gradFrom:'rgba(167,139,250,0.15)', gradTo:'rgba(167,139,250,0)', hex:'#a78bfa' },
  sky:     { border:'rgba(56,189,248,0.2)',  badgeBg:'rgba(56,189,248,0.08)',  badgeText:'#7dd3fc', badgeBorder:'rgba(56,189,248,0.25)',  iconBg:'rgba(56,189,248,0.12)',  iconText:'#38bdf8', rowHover:'rgba(56,189,248,0.07)',   glowBg:'#38bdf8', arrowText:'#38bdf8', gradFrom:'rgba(56,189,248,0.15)',  gradTo:'rgba(56,189,248,0)',   hex:'#38bdf8' },
  emerald: { border:'rgba(52,211,153,0.2)',  badgeBg:'rgba(52,211,153,0.08)',  badgeText:'#6ee7b7', badgeBorder:'rgba(52,211,153,0.25)',  iconBg:'rgba(52,211,153,0.12)',  iconText:'#34d399', rowHover:'rgba(52,211,153,0.07)',   glowBg:'#34d399', arrowText:'#34d399', gradFrom:'rgba(52,211,153,0.15)',  gradTo:'rgba(52,211,153,0)',   hex:'#34d399' },
  amber:   { border:'rgba(251,191,36,0.2)',  badgeBg:'rgba(251,191,36,0.08)',  badgeText:'#fcd34d', badgeBorder:'rgba(251,191,36,0.25)',  iconBg:'rgba(251,191,36,0.12)',  iconText:'#fbbf24', rowHover:'rgba(251,191,36,0.07)',   glowBg:'#fbbf24', arrowText:'#fbbf24', gradFrom:'rgba(251,191,36,0.15)',  gradTo:'rgba(251,191,36,0)',   hex:'#fbbf24' },
  rose:    { border:'rgba(251,113,133,0.2)', badgeBg:'rgba(251,113,133,0.08)', badgeText:'#fda4af', badgeBorder:'rgba(251,113,133,0.25)', iconBg:'rgba(251,113,133,0.12)', iconText:'#fb7185', rowHover:'rgba(251,113,133,0.07)',  glowBg:'#fb7185', arrowText:'#fb7185', gradFrom:'rgba(251,113,133,0.15)', gradTo:'rgba(251,113,133,0)', hex:'#fb7185' },
}

/* ─────────────────────── ANIMATION VARIANTS ─────────────────────── */

const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08 } },
}

/* ─────────────────────── MAIN COMPONENT ─────────────────────── */

export default function FeaturesGrid() {
  return (
    <section
      id="features"
      style={{
        position: 'relative',
        zIndex: 2,
        width: '100%',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #04071a 0%, #060d24 40%, #050816 100%)',
        paddingTop: 140,
        paddingBottom: 160,
        color: '#fff',
      }}
    >
      {/* ── BACKGROUND LAYER ── */}
      <div aria-hidden style={{
        pointerEvents: 'none', position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)',
        backgroundSize: '64px 64px',
        maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)',
      }} />

      {/* ambient orbs */}
      <div aria-hidden style={{ pointerEvents:'none', position:'absolute', left:'-12%',  top:'4%',    width:700, height:700, borderRadius:'50%', background:'radial-gradient(circle, rgba(34,211,238,0.09) 0%, transparent 70%)',  filter:'blur(60px)' }} />
      <div aria-hidden style={{ pointerEvents:'none', position:'absolute', right:'-10%', top:'38%',   width:750, height:750, borderRadius:'50%', background:'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)',   filter:'blur(60px)' }} />
      <div aria-hidden style={{ pointerEvents:'none', position:'absolute', left:'15%',   bottom:'5%', width:600, height:600, borderRadius:'50%', background:'radial-gradient(circle, rgba(56,189,248,0.06) 0%, transparent 70%)',  filter:'blur(60px)' }} />
      <div aria-hidden style={{ pointerEvents:'none', position:'absolute', right:'25%',  top:'20%',   width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle, rgba(251,113,133,0.05) 0%, transparent 70%)', filter:'blur(60px)' }} />

      {/* ── WRAPPER ── */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: 1360,
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingLeft:  'clamp(24px, 5vw, 80px)',
        paddingRight: 'clamp(24px, 5vw, 80px)',
        boxSizing: 'border-box',
      }}>

        {/* ════════════════════════════════
            SECTION 1 — FEATURES HEADER
        ════════════════════════════════ */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible"
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, amount: 0.3 }}
          style={{ maxWidth: 700, marginLeft: 'auto', marginRight: 'auto', marginBottom: 120, textAlign: 'center' }}
        >
          {/* live badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 28 }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              borderRadius: 999, border: '1px solid rgba(34,211,238,0.3)',
              background: 'rgba(34,211,238,0.07)',
              padding: '6px 14px 6px 10px', fontSize: 12, fontWeight: 700,
              letterSpacing: '0.08em', textTransform: 'uppercase', color: '#67e8f9',
            }}>
              <span style={{
                width: 7, height: 7, borderRadius: '50%', background: '#22d3ee',
                boxShadow: '0 0 8px #22d3ee', display: 'block', flexShrink: 0,
                animation: 'pulse 2s infinite',
              }} />
              Live Platform
            </span>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              borderRadius: 999, border: '1px solid rgba(167,139,250,0.25)',
              background: 'rgba(167,139,250,0.07)',
              padding: '6px 14px', fontSize: 12, fontWeight: 700,
              letterSpacing: '0.07em', textTransform: 'uppercase', color: '#c4b5fd',
            }}>
              <Sparkles size={12} /> AI-Powered
            </span>
          </div>

          <h2 style={{
            fontSize: 'clamp(2.8rem, 6vw, 4.5rem)',
            fontWeight: 900, lineHeight: 1.04,
            letterSpacing: '-0.05em', margin: '0 0 8px',
            color: '#f8fafc',
          }}>
            Real product screens.
          </h2>
          <h2 style={{
            fontSize: 'clamp(2.8rem, 6vw, 4.5rem)',
            fontWeight: 900, lineHeight: 1.04,
            letterSpacing: '-0.05em', margin: '0 0 28px',
            background: 'linear-gradient(135deg, #67e8f9 0%, #38bdf8 40%, #a78bfa 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            Real intelligence.
          </h2>
          <p style={{
            fontSize: 'clamp(16px, 2vw, 19px)', lineHeight: 1.75,
            color: '#64748b', maxWidth: 500, marginLeft: 'auto', marginRight: 'auto',
          }}>
            A live look at every AI-powered module, dashboard, and workflow already running inside the platform.
          </p>
        </motion.div>

        {/* ════════════════════════════════
            SECTION 2 — ALTERNATING ROWS
        ════════════════════════════════ */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(80px, 12vw, 160px)' }}>
          {sections.map((s, i) => {
            const Icon = s.icon
            const flip = i % 2 === 1
            return (
              <motion.div
                key={s.title}
                variants={fadeUp} initial="hidden" whileInView="visible"
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true, amount: 0.07 }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(0, 5fr) minmax(0, 8fr)',
                  gap: 'clamp(32px, 5vw, 72px)',
                  alignItems: 'center',
                  direction: flip ? 'rtl' : 'ltr',
                }}
              >
                {/* ── TEXT SIDE ── */}
                <div style={{ direction: 'ltr', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  {/* icon */}
                  <div style={{
                    width: 56, height: 56, borderRadius: 16, marginBottom: 24,
                    border: `1px solid ${s.accent}33`,
                    background: `${s.accent}12`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: `0 0 32px ${s.accent}20, 0 8px 24px rgba(0,0,0,0.3)`,
                  }}>
                    <Icon size={26} color={s.accent} />
                  </div>

                  {/* eyebrow */}
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    marginBottom: 14, fontSize: 11, fontWeight: 800,
                    letterSpacing: '0.18em', textTransform: 'uppercase',
                    color: s.accent, opacity: 0.85,
                  }}>
                    <Activity size={10} />
                    {s.eyebrow}
                  </div>

                  {/* title */}
                  <h3 style={{
                    fontSize: 'clamp(2rem, 3.2vw, 3rem)',
                    fontWeight: 900, lineHeight: 1.08,
                    letterSpacing: '-0.04em', color: '#f1f5f9',
                    margin: '0 0 18px',
                  }}>
                    {s.title}
                  </h3>

                  {/* description */}
                  <p style={{
                    fontSize: 'clamp(15px, 1.6vw, 17px)',
                    lineHeight: 1.8, color: '#64748b',
                    maxWidth: 400, margin: '0 0 32px',
                  }}>
                    {s.description}
                  </p>

                  {/* capability chips */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
                    {['AI-Powered', 'Real-time', 'Personalized'].map(chip => (
                      <span key={chip} style={{
                        fontSize: 11, fontWeight: 600, letterSpacing: '0.05em',
                        padding: '4px 12px', borderRadius: 999,
                        border: `1px solid ${s.accent}22`,
                        background: `${s.accent}09`, color: s.accent,
                      }}>
                        {chip}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <a
                    href={SIGNUP}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 8,
                      borderRadius: 999,
                      border: `1px solid ${s.accent}35`,
                      background: `${s.accent}10`,
                      padding: '11px 22px', fontSize: 13.5, fontWeight: 700,
                      color: s.accent, textDecoration: 'none',
                      transition: 'all 0.2s ease',
                      boxShadow: `0 0 20px ${s.accent}15`,
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = `${s.accent}20`
                      e.currentTarget.style.transform = 'translateY(-2px)'
                      e.currentTarget.style.boxShadow = `0 8px 32px ${s.accent}25`
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = `${s.accent}10`
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = `0 0 20px ${s.accent}15`
                    }}
                  >
                    Explore in platform <ArrowRight size={14} />
                  </a>
                </div>

                {/* ── SCREEN SIDE ── */}
                <div style={{ direction: 'ltr', minWidth: 0 }}>
                  <ScreenPreview src={s.image} alt={s.title} accent={s.accent} />
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* ════════════════════════════════
            SECTION 3 — TOOLS HUB
        ════════════════════════════════ */}
        <div style={{ marginTop: 'clamp(100px, 16vw, 200px)' }}>

          {/* tools header */}
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible"
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, amount: 0.2 }}
            style={{ maxWidth: 700, marginLeft: 'auto', marginRight: 'auto', marginBottom: 80, textAlign: 'center' }}
          >
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 28,
              borderRadius: 999, border: '1px solid rgba(167,139,250,0.3)',
              background: 'rgba(167,139,250,0.08)', padding: '6px 18px',
              fontSize: 12, fontWeight: 700, letterSpacing: '0.08em',
              textTransform: 'uppercase', color: '#c4b5fd',
            }}>
              <Landmark size={13} /> Financial Toolkit · 20+ Tools
            </span>
            <h2 style={{
              fontSize: 'clamp(2.8rem, 6vw, 4.5rem)',
              fontWeight: 900, lineHeight: 1.04,
              letterSpacing: '-0.05em', margin: '0 0 8px', color: '#f8fafc',
            }}>
              Every tool you need.
            </h2>
            <h2 style={{
              fontSize: 'clamp(2.8rem, 6vw, 4.5rem)',
              fontWeight: 900, lineHeight: 1.04,
              letterSpacing: '-0.05em', margin: '0 0 24px',
              background: 'linear-gradient(135deg, #c4b5fd 0%, #38bdf8 50%, #67e8f9 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              All in one place.
            </h2>
            <p style={{
              fontSize: 'clamp(16px, 2vw, 18px)', lineHeight: 1.75,
              color: '#64748b', maxWidth: 480, marginLeft: 'auto', marginRight: 'auto',
            }}>
              AI-powered calculators, analyzers, and planners — organized by category, personalized to your profile.
            </p>
          </motion.div>

          {/* ── TOOL CARDS GRID ── */}
          <motion.div
            variants={stagger} initial="hidden" whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
              gap: 'clamp(16px, 2vw, 24px)',
              width: '100%',
              alignItems: 'start',
            }}
          >
            {toolCategories.map((cat) => {
              const p = palette[cat.color as PaletteKey]
              return (
                <motion.div
                  key={cat.category}
                  variants={fadeUp}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: 20,
                    border: `1px solid ${p.border}`,
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.035) 0%, rgba(255,255,255,0.01) 100%)',
                    backdropFilter: 'blur(12px)',
                    padding: 'clamp(20px, 3vw, 28px)',
                    boxShadow: '0 4px 32px rgba(0,0,0,0.35), 0 1px 0 rgba(255,255,255,0.06) inset',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
                    cursor: 'default',
                  }}
                  whileHover={{
                    y: -4,
                    boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${p.hex}18, 0 1px 0 rgba(255,255,255,0.08) inset`,
                  }}
                >
                  {/* corner glow */}
                  <div style={{
                    pointerEvents: 'none', position: 'absolute',
                    top: -40, right: -40, width: 180, height: 180,
                    borderRadius: '50%', background: p.glowBg,
                    opacity: 0.07, filter: 'blur(40px)',
                    transition: 'opacity 0.4s',
                  }} />

                  {/* top gradient line */}
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                    background: `linear-gradient(90deg, transparent, ${p.hex}60, transparent)`,
                  }} />

                  {/* header */}
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                      {/* category icon dot */}
                      <div style={{
                        width: 8, height: 8, borderRadius: '50%',
                        background: p.hex, flexShrink: 0,
                        boxShadow: `0 0 10px ${p.hex}`,
                      }} />
                      <span style={{
                        fontSize: 11, fontWeight: 800, letterSpacing: '0.14em',
                        textTransform: 'uppercase', color: p.badgeText,
                        border: `1px solid ${p.badgeBorder}`,
                        background: p.badgeBg, borderRadius: 999,
                        padding: '3px 10px',
                      }}>
                        {cat.category}
                      </span>
                    </div>
                    <p style={{ fontSize: 12.5, lineHeight: 1.6, color: '#475569', margin: 0, paddingLeft: 18 }}>
                      {cat.description}
                    </p>
                  </div>

                  {/* divider */}
                  <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', marginBottom: 16 }} />

                  {/* tool rows */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {cat.tools.map((t) => {
                      const TIcon = t.icon
                      return (
                        <a
                          key={t.name}
                          href={SIGNUP}
                          style={{
                            display: 'flex', alignItems: 'center', gap: 14,
                            borderRadius: 14,
                            border: '1px solid rgba(255,255,255,0.05)',
                            background: 'rgba(255,255,255,0.025)',
                            padding: '13px 14px',
                            textDecoration: 'none',
                            transition: 'all 0.18s ease',
                            position: 'relative',
                            overflow: 'hidden',
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.background = p.rowHover
                            e.currentTarget.style.borderColor = `${p.hex}30`
                            e.currentTarget.style.transform = 'translateX(3px)'
                            const arrow = e.currentTarget.querySelector('.tool-arrow') as HTMLElement
                            if (arrow) { arrow.style.opacity = '1'; arrow.style.transform = 'translateX(2px)' }
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.background = 'rgba(255,255,255,0.025)'
                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'
                            e.currentTarget.style.transform = 'translateX(0)'
                            const arrow = e.currentTarget.querySelector('.tool-arrow') as HTMLElement
                            if (arrow) { arrow.style.opacity = '0'; arrow.style.transform = 'translateX(0)' }
                          }}
                        >
                          {/* icon */}
                          <div style={{
                            width: 42, height: 42, flexShrink: 0, borderRadius: 12,
                            background: p.iconBg,
                            border: `1px solid ${p.hex}22`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: p.iconText,
                            boxShadow: `0 4px 12px ${p.hex}15`,
                          }}>
                            <TIcon size={18} />
                          </div>

                          {/* text */}
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{ fontSize: 13.5, fontWeight: 700, color: '#e2e8f0', margin: 0, lineHeight: 1.3 }}>
                              {t.name}
                            </p>
                            <p style={{ fontSize: 11.5, color: '#475569', margin: '3px 0 0', lineHeight: 1.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {t.desc}
                            </p>
                          </div>

                          {/* arrow */}
                          <ArrowRight
                            className="tool-arrow"
                            size={14}
                            style={{
                              flexShrink: 0, opacity: 0,
                              color: p.arrowText,
                              transition: 'opacity 0.18s ease, transform 0.18s ease',
                            }}
                          />
                        </a>
                      )
                    })}
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* ── BOTTOM CTA ── */}
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible"
            transition={{ duration: 0.7, delay: 0.2 }} viewport={{ once: true }}
            style={{ marginTop: 64, textAlign: 'center' }}
          >
            <a
              href={SIGNUP}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                borderRadius: 999,
                background: 'linear-gradient(135deg, #22d3ee, #38bdf8, #818cf8)',
                padding: '14px 32px', fontSize: 15, fontWeight: 700,
                color: '#04071a', textDecoration: 'none',
                boxShadow: '0 8px 40px rgba(34,211,238,0.3), 0 2px 0 rgba(255,255,255,0.2) inset',
                transition: 'all 0.2s ease',
                letterSpacing: '-0.01em',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)'
                e.currentTarget.style.boxShadow = '0 16px 56px rgba(34,211,238,0.4), 0 2px 0 rgba(255,255,255,0.2) inset'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)'
                e.currentTarget.style.boxShadow = '0 8px 40px rgba(34,211,238,0.3), 0 2px 0 rgba(255,255,255,0.2) inset'
              }}
            >
              <Sparkles size={16} />
              Get free access to all tools
              <ArrowRight size={16} />
            </a>
            <p style={{ marginTop: 14, fontSize: 13, color: '#334155' }}>
              No credit card required · Set up in 2 minutes
            </p>
          </motion.div>
        </div>
      </div>

      {/* pulse animation keyframe */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(0.85); }
        }
      `}</style>
    </section>
  )
}

/* ─────────────────────── SCREEN PREVIEW ─────────────────────── */

function ScreenPreview({ src, alt, accent }: { src: string; alt: string; accent: string }) {
  const ref = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-1, 1], [4, -4]), { stiffness: 200, damping: 30 })
  const rotateY = useSpring(useTransform(mouseX, [-1, 1], [-5, 5]), { stiffness: 200, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set(((e.clientX - rect.left) / rect.width) * 2 - 1)
    mouseY.set(((e.clientY - rect.top) / rect.height) * 2 - 1)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative', width: '100%', minWidth: 0,
        perspective: 1200,
        rotateX, rotateY,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      {/* outer glow halo */}
      <div style={{
        position: 'absolute', inset: -24, borderRadius: 40, pointerEvents: 'none',
        background: `radial-gradient(ellipse at 50% 50%, ${accent}22 0%, transparent 70%)`,
        filter: 'blur(20px)',
        transition: 'opacity 0.4s',
      }} />

      {/* secondary glow */}
      <div style={{
        position: 'absolute', bottom: -30, left: '10%', right: '10%',
        height: 60, borderRadius: '50%', pointerEvents: 'none',
        background: `${accent}25`, filter: 'blur(30px)',
      }} />

      {/* browser shell */}
      <div style={{
        position: 'relative', overflow: 'hidden', borderRadius: 20,
        border: '1px solid rgba(255,255,255,0.1)',
        background: 'linear-gradient(180deg, #0d1530 0%, #080f22 100%)',
        boxShadow: [
          '0 0 0 1px rgba(255,255,255,0.05) inset',
          '0 60px 120px rgba(0,0,0,0.7)',
          '0 24px 48px rgba(0,0,0,0.5)',
          `0 0 80px ${accent}12`,
        ].join(', '),
        transformStyle: 'preserve-3d',
      }}>

        {/* browser chrome */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          height: 44, padding: '0 16px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 100%)',
          flexShrink: 0,
        }}>
          {/* traffic lights */}
          <div style={{ display: 'flex', gap: 7, flexShrink: 0 }}>
            {['rgba(255,95,87,0.9)', 'rgba(255,189,46,0.9)', 'rgba(40,202,66,0.9)'].map((bg, j) => (
              <span key={j} style={{ width: 12, height: 12, borderRadius: '50%', background: bg, display: 'block', boxShadow: `0 1px 3px ${bg}` }} />
            ))}
          </div>

          {/* fake URL bar */}
          <div style={{
            flex: 1, height: 24, borderRadius: 6, marginLeft: 10,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.07)',
            display: 'flex', alignItems: 'center', paddingLeft: 10, gap: 6,
          }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: `${accent}80`, flexShrink: 0 }} />
            <div style={{ height: 7, width: 120, borderRadius: 4, background: 'rgba(255,255,255,0.08)' }} />
          </div>

          {/* "LIVE" badge in chrome */}
          <span style={{
            fontSize: 9, fontWeight: 800, letterSpacing: '0.1em',
            textTransform: 'uppercase', color: accent,
            border: `1px solid ${accent}40`, background: `${accent}10`,
            borderRadius: 4, padding: '2px 7px', flexShrink: 0,
          }}>
            LIVE
          </span>
        </div>

        {/* screenshot */}
        <div style={{ lineHeight: 0, overflow: 'hidden', position: 'relative' }}>
          <Image
            src={src}
            alt={alt}
            width={1440}
            height={900}
            quality={100}
            priority={false}
            sizes="(min-width: 1360px) 820px, (min-width: 768px) 60vw, 100vw"
            style={{
              display: 'block',
              width: '100%',
              height: 'auto',
              transition: 'transform 0.8s cubic-bezier(0.16,1,0.3,1)',
              willChange: 'transform',
            }}
            className="group-hover:scale-[1.03]"
          />

          {/* subtle bottom gradient overlay */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '25%',
            background: 'linear-gradient(to top, rgba(8,15,34,0.6) 0%, transparent 100%)',
            pointerEvents: 'none',
          }} />
        </div>
      </div>
    </motion.div>
  )
}
