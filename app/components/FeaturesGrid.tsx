'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  ArrowRight, Bot, HeartPulse, Shield, Target, TrendingUp, Wallet,
  Calculator, PieChart, BarChart2, AlertTriangle, FileText, CheckCircle,
  PiggyBank, Flag, LineChart, CreditCard, GitCompare, Zap, Receipt,
  BadgePercent, MessageSquare, FileSearch, Landmark,
} from 'lucide-react'

const sections = [
  { title: 'AI Financial Dashboard',     eyebrow: 'Financial Command Center',  description: 'Monitor savings, expenses, investments, alerts, and your complete financial health in one AI-powered workspace.',       icon: Wallet,     image: '/screens/dashboard.png'        },
  { title: 'Autonomous AI Alerts',       eyebrow: 'Always-On Risk Detection',  description: 'Your AI agent detects emergency fund gaps, missed SIPs, portfolio risks, and money opportunities automatically.',      icon: Bot,        image: '/screens/alerts.png'           },
  { title: 'Financial Health Analysis',  eyebrow: 'Score, Red Flags & Action', description: 'Understand strengths, red flags, action plans, and your overall money position with clear AI insights.',               icon: HeartPulse, image: '/screens/financial-health.png' },
  { title: 'Investment Intelligence',    eyebrow: 'SIP & Wealth Projection',   description: 'Visualize SIP projections, long-term wealth growth, and portfolio optimization insights tailored to your numbers.',     icon: TrendingUp, image: '/screens/investments.png'     },
  { title: 'Insurance Analysis',         eyebrow: 'Policy & Coverage Review',  description: 'Analyze policy IRR, hidden charges, coverage gaps, and insurance efficiency instantly.',                                icon: Shield,     image: '/screens/insurance.png'       },
  { title: 'Goal & Retirement Planning', eyebrow: 'Future Planning',           description: 'Plan retirement, child education, wealth goals, and long-term financial freedom with clarity.',                         icon: Target,     image: '/screens/planning.png'        },
  { title: 'AI Financial Agent',         eyebrow: 'Personal Money Assistant',  description: 'Ask your personal AI agent questions about savings, tax, SIPs, insurance, risks, and next actions — anytime.',         icon: Bot,        image: '/screens/agent.png'           },
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
      { name: 'EMI Calculator',      desc: 'Calculate your monthly EMI for home, car, or personal loans',  icon: CreditCard    },
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

type PaletteKey = 'cyan' | 'violet' | 'sky' | 'emerald' | 'amber' | 'rose'
const palette: Record<PaletteKey, { card: string; badge: string; icon: string; row: string; glow: string; arrow: string }> = {
  cyan:    { card: 'border-cyan-400/25 hover:border-cyan-400/50 hover:shadow-cyan-500/10',           badge: 'bg-cyan-400/10 text-cyan-300 border-cyan-400/30',           icon: 'bg-cyan-400/15 text-cyan-300',    row: 'hover:bg-cyan-400/10',    glow: 'bg-cyan-400',    arrow: 'text-cyan-400'    },
  violet:  { card: 'border-violet-400/25 hover:border-violet-400/50 hover:shadow-violet-500/10',     badge: 'bg-violet-400/10 text-violet-300 border-violet-400/30',     icon: 'bg-violet-400/15 text-violet-300',  row: 'hover:bg-violet-400/10',  glow: 'bg-violet-400',  arrow: 'text-violet-400'  },
  sky:     { card: 'border-sky-400/25 hover:border-sky-400/50 hover:shadow-sky-500/10',              badge: 'bg-sky-400/10 text-sky-300 border-sky-400/30',              icon: 'bg-sky-400/15 text-sky-300',      row: 'hover:bg-sky-400/10',     glow: 'bg-sky-400',     arrow: 'text-sky-400'     },
  emerald: { card: 'border-emerald-400/25 hover:border-emerald-400/50 hover:shadow-emerald-500/10',  badge: 'bg-emerald-400/10 text-emerald-300 border-emerald-400/30',  icon: 'bg-emerald-400/15 text-emerald-300', row: 'hover:bg-emerald-400/10', glow: 'bg-emerald-400', arrow: 'text-emerald-400' },
  amber:   { card: 'border-amber-400/25 hover:border-amber-400/50 hover:shadow-amber-500/10',        badge: 'bg-amber-400/10 text-amber-300 border-amber-400/30',        icon: 'bg-amber-400/15 text-amber-300',  row: 'hover:bg-amber-400/10',   glow: 'bg-amber-400',   arrow: 'text-amber-400'   },
  rose:    { card: 'border-rose-400/25 hover:border-rose-400/50 hover:shadow-rose-500/10',           badge: 'bg-rose-400/10 text-rose-300 border-rose-400/30',           icon: 'bg-rose-400/15 text-rose-300',    row: 'hover:bg-rose-400/10',    glow: 'bg-rose-400',    arrow: 'text-rose-400'    },
}

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }

export default function FeaturesGrid() {
  return (
    <section
      id="features"
      style={{
        position: 'relative',
        zIndex: 2,
        width: '100%',
        overflow: 'hidden',
        background: '#050816',
        paddingTop: 96,
        paddingBottom: 96,
        color: '#fff',
      }}
    >
      {/* grid bg */}
      <div style={{ pointerEvents: 'none', position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)', backgroundSize: '72px 72px' }} />
      {/* ambient blobs */}
      <div style={{ pointerEvents: 'none', position: 'absolute', left: '-8%', top: '8%', width: 520, height: 520, borderRadius: '50%', background: 'rgba(47,230,255,0.07)', filter: 'blur(120px)' }} />
      <div style={{ pointerEvents: 'none', position: 'absolute', right: '-8%', top: '45%', width: 560, height: 560, borderRadius: '50%', background: 'rgba(122,60,255,0.08)', filter: 'blur(130px)' }} />

      {/* ── SINGLE CENTRED WRAPPER ── */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: 1280,
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingLeft: 'clamp(20px, 5vw, 80px)',
        paddingRight: 'clamp(20px, 5vw, 80px)',
        boxSizing: 'border-box',
      }}>

        {/* ── FEATURES HEADER ── */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible"
          transition={{ duration: 0.65 }} viewport={{ once: true, amount: 0.3 }}
          style={{ maxWidth: 680, marginLeft: 'auto', marginRight: 'auto', marginBottom: 96, textAlign: 'center' }}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', borderRadius: 999, border: '1px solid rgba(47,230,255,0.25)', background: 'rgba(47,230,255,0.08)', padding: '6px 16px', fontSize: 13, fontWeight: 700, color: '#67e8f9', marginBottom: 20 }}>
            What FinHealth360 Includes
          </span>
          <h2 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', fontWeight: 900, lineHeight: 1.08, letterSpacing: '-0.04em', margin: 0, color: '#f1f5f9' }}>
            Real product screens.
            <span style={{ display: 'block', background: 'linear-gradient(135deg,#67e8f9 0%,#38bdf8 50%,#a78bfa 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Real financial intelligence.
            </span>
          </h2>
          <p style={{ marginTop: 20, fontSize: 18, lineHeight: 1.75, color: '#94a3b8', maxWidth: 520, marginLeft: 'auto', marginRight: 'auto' }}>
            A quick look at the workflows, tools, and AI-powered modules already inside the platform.
          </p>
        </motion.div>

        {/* ── ALTERNATING FEATURE ROWS ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 120 }}>
          {sections.map((s, i) => {
            const Icon = s.icon
            const flip = i % 2 === 1
            return (
              <motion.div
                key={s.title}
                variants={fadeUp} initial="hidden" whileInView="visible"
                transition={{ duration: 0.65 }} viewport={{ once: true, amount: 0.12 }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2,1fr)',
                  gap: 64,
                  alignItems: 'center',
                }}
              >
                {/* text */}
                <div style={{ order: flip ? 2 : 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <div style={{ width: 60, height: 60, borderRadius: 16, border: '1px solid rgba(103,232,249,0.2)', background: 'rgba(103,232,249,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, boxShadow: '0 8px 24px rgba(47,230,255,0.08)' }}>
                    <Icon size={28} color="#67e8f9" />
                  </div>
                  <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(103,232,249,0.65)', marginBottom: 8, margin: '0 0 8px' }}>{s.eyebrow}</p>
                  <h3 style={{ fontSize: 'clamp(1.9rem, 3.2vw, 2.8rem)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.03em', color: '#f1f5f9', margin: 0 }}>{s.title}</h3>
                  <p style={{ marginTop: 18, fontSize: 17, lineHeight: 1.75, color: '#94a3b8', maxWidth: 400 }}>{s.description}</p>
                  <a
                    href="#"
                    style={{ marginTop: 28, display: 'inline-flex', alignItems: 'center', gap: 8, borderRadius: 999, border: '1px solid rgba(103,232,249,0.25)', background: 'rgba(103,232,249,0.08)', padding: '10px 20px', fontSize: 13, fontWeight: 700, color: '#67e8f9', textDecoration: 'none', transition: 'background 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(103,232,249,0.18)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'rgba(103,232,249,0.08)')}
                  >
                    Included in platform <ArrowRight size={14} />
                  </a>
                </div>

                {/* screen */}
                <div style={{ order: flip ? 1 : 2 }}>
                  <ScreenPreview src={s.image} alt={s.title} />
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* ══════════════════════════════════════
            TOOLS HUB
        ══════════════════════════════════════ */}
        <div style={{ marginTop: 160 }}>

          {/* tools header — CENTRED */}
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible"
            transition={{ duration: 0.65 }} viewport={{ once: true, amount: 0.2 }}
            style={{ maxWidth: 680, marginLeft: 'auto', marginRight: 'auto', marginBottom: 64, textAlign: 'center' }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, borderRadius: 999, border: '1px solid rgba(167,139,250,0.25)', background: 'rgba(167,139,250,0.08)', padding: '6px 16px', fontSize: 13, fontWeight: 700, color: '#c4b5fd', marginBottom: 20 }}>
              <Landmark size={14} /> Financial Toolkit
            </span>
            <h2 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', fontWeight: 900, lineHeight: 1.08, letterSpacing: '-0.04em', margin: 0, color: '#f1f5f9' }}>
              Every tool you need.
              <span style={{ display: 'block', background: 'linear-gradient(135deg,#c4b5fd 0%,#38bdf8 50%,#67e8f9 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                All in one place.
              </span>
            </h2>
            <p style={{ marginTop: 20, fontSize: 18, lineHeight: 1.75, color: '#94a3b8', maxWidth: 520, marginLeft: 'auto', marginRight: 'auto' }}>
              20+ AI-powered calculators, analyzers, and planners — organized by category, personalized to your profile.
            </p>
          </motion.div>

          {/* tool cards grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 20 }}>
            {toolCategories.map((cat, ci) => {
              const p = palette[cat.color as PaletteKey]
              return (
                <motion.div
                  key={cat.category}
                  variants={fadeUp} initial="hidden" whileInView="visible"
                  transition={{ duration: 0.5, delay: ci * 0.07 }} viewport={{ once: true, amount: 0.06 }}
                  className={`group relative overflow-hidden rounded-2xl border bg-white/[0.025] p-7 shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-white/[0.04] ${p.card}`}
                >
                  <div className={`pointer-events-none absolute -right-6 -top-6 h-36 w-36 rounded-full ${p.glow} opacity-0 blur-3xl transition duration-500 group-hover:opacity-[0.18]`} />

                  <span className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-widest ${p.badge}`}>
                    {cat.category}
                  </span>
                  <p style={{ marginTop: 10, marginBottom: 24, fontSize: 13, lineHeight: 1.6, color: '#64748b' }}>{cat.description}</p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {cat.tools.map((t) => {
                      const TIcon = t.icon
                      return (
                        <a
                          key={t.name}
                          href="/app/tools"
                          className={`group/row flex items-center gap-4 rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-4 transition duration-200 ${p.row}`}
                          style={{ textDecoration: 'none' }}
                        >
                          <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${p.icon}`}>
                            <TIcon size={20} />
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.3, color: '#f1f5f9', margin: 0 }}>{t.name}</p>
                            <p style={{ fontSize: 12, lineHeight: 1.55, color: '#64748b', margin: '3px 0 0' }}>{t.desc}</p>
                          </div>
                          <ArrowRight className={`h-4 w-4 shrink-0 opacity-0 transition group-hover/row:translate-x-0.5 group-hover/row:opacity-100 ${p.arrow}`} size={14} />
                        </a>
                      )
                    })}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function ScreenPreview({ src, alt }: { src: string; alt: string }) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.016 }}
      transition={{ duration: 0.32, ease: 'easeOut' }}
      style={{ position: 'relative', width: '100%' }}
      className="group"
    >
      <div style={{ position: 'absolute', inset: -16, borderRadius: 32, background: 'linear-gradient(135deg,rgba(47,230,255,0.12),transparent,rgba(122,60,255,0.08))', filter: 'blur(24px)', opacity: 0.6, pointerEvents: 'none', transition: 'opacity 0.5s' }}
        className="group-hover:opacity-100" />

      <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 18, border: '1px solid rgba(255,255,255,0.08)', background: '#080f22', boxShadow: '0 40px 100px rgba(0,0,0,0.55)' }}>
        {/* browser chrome */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, height: 40, padding: '0 16px', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)' }}>
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: 'rgba(255,95,87,0.8)', display: 'block' }} />
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: 'rgba(255,189,46,0.8)', display: 'block' }} />
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: 'rgba(40,202,66,0.8)', display: 'block' }} />
          <span style={{ marginLeft: 10, width: 160, height: 12, borderRadius: 6, background: 'rgba(255,255,255,0.06)', display: 'block' }} />
        </div>
        <div style={{ overflow: 'hidden' }}>
          <Image
            src={src}
            alt={alt}
            width={1440}
            height={900}
            quality={100}
            sizes="(min-width: 1280px) 600px, (min-width: 768px) 50vw, 100vw"
            style={{ display: 'block', width: '100%', aspectRatio: '16/10', objectFit: 'cover', objectPosition: 'top', transition: 'transform 0.7s ease, object-position 0.7s ease', willChange: 'transform' }}
            className="group-hover:scale-[1.06] group-hover:[object-position:center_20%]"
          />
        </div>
      </div>
    </motion.div>
  )
}
