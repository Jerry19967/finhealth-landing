'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  ArrowRight, Bot, HeartPulse, Shield, Target, TrendingUp, Wallet,
  Calculator, PieChart, BarChart2, AlertTriangle, FileText, CheckCircle,
  PiggyBank, Flag, LineChart, CreditCard, GitCompare, Zap, Receipt,
  BadgePercent, MessageSquare, FileSearch, Landmark,
} from 'lucide-react'

/* ─── data ─────────────────────────────────────────────────────────── */

const sections = [
  { title: 'AI Financial Dashboard',    eyebrow: 'Financial Command Center',   description: 'Monitor savings, expenses, investments, alerts, and your complete financial health in one AI-powered workspace.',                                  icon: Wallet,    image: '/screens/dashboard.png' },
  { title: 'Autonomous AI Alerts',      eyebrow: 'Always-On Risk Detection',   description: 'Your AI agent detects emergency fund gaps, missed SIPs, portfolio risks, and money opportunities automatically.',                                   icon: Bot,       image: '/screens/alerts.png' },
  { title: 'Financial Health Analysis', eyebrow: 'Score, Red Flags, Action',   description: 'Understand strengths, red flags, action plans, and your overall money position with clear AI insights.',                                            icon: HeartPulse,image: '/screens/financial-health.png' },
  { title: 'Investment Intelligence',   eyebrow: 'SIP & Wealth Projection',    description: 'Visualize SIP projections, long-term wealth growth, and portfolio optimization insights tailored to your numbers.',                                  icon: TrendingUp, image: '/screens/investments.png' },
  { title: 'Insurance Analysis',        eyebrow: 'Policy & Coverage Review',   description: 'Analyze policy IRR, hidden charges, coverage gaps, and insurance efficiency instantly.',                                                             icon: Shield,    image: '/screens/insurance.png' },
  { title: 'Goal & Retirement Planning',eyebrow: 'Future Planning',            description: 'Plan retirement, child education, wealth goals, and long-term financial freedom with clarity.',                                                       icon: Target,    image: '/screens/planning.png' },
  { title: 'AI Financial Agent',        eyebrow: 'Personal Money Assistant',   description: 'Ask your personal AI agent questions about savings, tax, SIPs, insurance, risks, and next actions — anytime.',                                      icon: Bot,       image: '/screens/agent.png' },
]

const toolCategories = [
  {
    category: 'Investments', description: 'Plan and analyze your investment strategies', color: 'cyan',
    tools: [
      { name: 'SIP Calculator',    desc: 'Calculate your SIP maturity value and wealth growth',          icon: Calculator  },
      { name: 'Portfolio Analyzer',desc: 'Analyze your portfolio performance and allocation',             icon: PieChart    },
      { name: 'Return Calculator', desc: 'Calculate CAGR and annualized returns on investments',          icon: BarChart2   },
      { name: 'Risk Analysis',     desc: 'Assess your portfolio risk and get rebalancing signals',        icon: AlertTriangle},
    ],
  },
  {
    category: 'Insurance', description: 'Evaluate and optimize your insurance coverage', color: 'violet',
    tools: [
      { name: 'Policy Analyzer',  desc: 'Upload any policy and get real IRR and hidden charges',         icon: FileText    },
      { name: 'IRR Calculator',   desc: 'Calculate the true Internal Rate of Return on your policy',     icon: Calculator  },
      { name: 'Coverage Checker', desc: 'Check if your life and health coverage is adequate',            icon: CheckCircle },
    ],
  },
  {
    category: 'Financial Planning', description: 'Build a roadmap for your financial goals', color: 'sky',
    tools: [
      { name: 'Retirement Planner',desc: 'Plan your retirement corpus and monthly savings needed',       icon: PiggyBank   },
      { name: 'Goal Planning',     desc: 'Set financial goals and track progress with projections',      icon: Flag        },
      { name: 'Wealth Projection', desc: 'Project your net worth growth over the next 10–30 years',     icon: LineChart   },
    ],
  },
  {
    category: 'Loans', description: 'Manage your borrowings smartly', color: 'emerald',
    tools: [
      { name: 'EMI Calculator',      desc: 'Calculate your monthly EMI for home, car, or personal loans', icon: CreditCard },
      { name: 'Loan Comparison',     desc: 'Compare multiple loan offers side by side on real cost',       icon: GitCompare },
      { name: 'Prepayment Strategy', desc: 'Find the optimal prepayment plan to save on interest',         icon: Zap        },
    ],
  },
  {
    category: 'Tax', description: 'Minimize your tax liability legally', color: 'amber',
    tools: [
      { name: 'Tax Calculator',      desc: 'Compare old vs new income tax regime for your income',         icon: Receipt     },
      { name: 'Deduction Optimizer', desc: 'Find all deductions under 80C, 80D, HRA, and more',            icon: BadgePercent},
    ],
  },
  {
    category: 'AI Tools', description: 'AI-powered financial intelligence', color: 'rose',
    tools: [
      { name: 'Financial Assistant', desc: 'Chat with AI for instant answers to financial questions',      icon: MessageSquare},
      { name: 'Report Explainer',    desc: 'Upload any financial document and get a plain-English summary', icon: FileSearch  },
    ],
  },
]

/* ─── color tokens ──────────────────────────────────────────────────── */

const C = {
  cyan:    { ring:'ring-cyan-400/30',    glow:'from-cyan-400/20',   badge:'bg-cyan-400/10 text-cyan-300 border-cyan-400/25',    icon:'bg-cyan-400/15 text-cyan-300',    row:'hover:bg-cyan-400/8 hover:border-cyan-400/25',  arrow:'text-cyan-400'   },
  violet:  { ring:'ring-violet-400/30',  glow:'from-violet-400/20', badge:'bg-violet-400/10 text-violet-300 border-violet-400/25',icon:'bg-violet-400/15 text-violet-300',row:'hover:bg-violet-400/8 hover:border-violet-400/25',arrow:'text-violet-400' },
  sky:     { ring:'ring-sky-400/30',     glow:'from-sky-400/20',    badge:'bg-sky-400/10 text-sky-300 border-sky-400/25',        icon:'bg-sky-400/15 text-sky-300',      row:'hover:bg-sky-400/8 hover:border-sky-400/25',    arrow:'text-sky-400'    },
  emerald: { ring:'ring-emerald-400/30', glow:'from-emerald-400/20',badge:'bg-emerald-400/10 text-emerald-300 border-emerald-400/25',icon:'bg-emerald-400/15 text-emerald-300',row:'hover:bg-emerald-400/8 hover:border-emerald-400/25',arrow:'text-emerald-400'},
  amber:   { ring:'ring-amber-400/30',   glow:'from-amber-400/20',  badge:'bg-amber-400/10 text-amber-300 border-amber-400/25',  icon:'bg-amber-400/15 text-amber-300',  row:'hover:bg-amber-400/8 hover:border-amber-400/25',arrow:'text-amber-400'  },
  rose:    { ring:'ring-rose-400/30',    glow:'from-rose-400/20',   badge:'bg-rose-400/10 text-rose-300 border-rose-400/25',     icon:'bg-rose-400/15 text-rose-300',    row:'hover:bg-rose-400/8 hover:border-rose-400/25',  arrow:'text-rose-400'   },
} as const
type CKey = keyof typeof C

const fadeUp = { hidden:{ opacity:0, y:40 }, visible:{ opacity:1, y:0 } }

/* ─── component ────────────────────────────────────────────────────── */

export default function FeaturesGrid() {
  return (
    <section
      id="features"
      className="relative z-[2] w-full overflow-hidden bg-[#050816] py-24 text-white lg:py-36"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.022)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.022)_1px,transparent_1px)] bg-[size:72px_72px]" />
      <div className="pointer-events-none absolute left-[-10%] top-20 h-[500px] w-[500px] rounded-full bg-cyan-400/10 blur-[130px]" />
      <div className="pointer-events-none absolute right-[-10%] top-[45%] h-[540px] w-[540px] rounded-full bg-violet-500/12 blur-[140px]" />

      {/* ── wrapper — single max-width container for EVERYTHING ── */}
      <div className="relative mx-auto w-full max-w-[1380px] px-6 sm:px-10 xl:px-14">

        {/* Section header */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible"
          transition={{ duration: 0.7, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.3 }}
          className="mb-24 text-center"
        >
          <span className="mb-5 inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-1.5 text-sm font-bold text-cyan-300">
            What FinHealth360 Includes
          </span>
          <h2 className="mt-4 text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.75rem]">
            Real product screens.
            <span className="block bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 bg-clip-text text-transparent">
              Real financial intelligence.
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            A quick look at the workflows, tools, and AI-powered modules already inside the platform.
          </p>
        </motion.div>

        {/* ── Feature alternating rows ── */}
        <div className="flex flex-col gap-32 lg:gap-44">
          {sections.map((s, i) => {
            const Icon = s.icon
            const flip = i % 2 === 1
            return (
              <motion.div
                key={s.title}
                variants={fadeUp} initial="hidden" whileInView="visible"
                transition={{ duration: 0.65, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.15 }}
                className="grid w-full grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20"
              >
                {/* Text */}
                <div className={`flex flex-col items-start ${flip ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 shadow-lg shadow-cyan-400/10">
                    <Icon className="h-8 w-8 text-cyan-300" />
                  </div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-cyan-300/70">
                    {s.eyebrow}
                  </p>
                  <h3 className="text-[2.25rem] font-black leading-[1.1] tracking-tight sm:text-5xl">
                    {s.title}
                  </h3>
                  <p className="mt-5 max-w-[420px] text-lg leading-8 text-slate-300">
                    {s.description}
                  </p>
                  <a
                    href="#"
                    className="mt-8 inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-5 py-2.5 text-sm font-bold text-cyan-300 transition hover:bg-cyan-300/20"
                  >
                    Included in platform <ArrowRight className="h-4 w-4" />
                  </a>
                </div>

                {/* Screen */}
                <div className={flip ? 'lg:order-1' : 'lg:order-2'}>
                  <ScreenPreview src={s.image} alt={s.title} />
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* ── Tools Hub ── */}
        <div className="mt-44">
          {/* Tools header */}
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible"
            transition={{ duration: 0.7, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.2 }}
            className="mb-16 text-center"
          >
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-300/25 bg-violet-300/10 px-4 py-1.5 text-sm font-bold text-violet-300">
              <Landmark className="h-4 w-4" /> Financial Toolkit
            </span>
            <h2 className="mt-4 text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.75rem]">
              Every tool you need.
              <span className="block bg-gradient-to-r from-violet-300 via-sky-400 to-cyan-300 bg-clip-text text-transparent">
                All in one place.
              </span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              20+ AI-powered calculators, analyzers, and planners — organized by category, personalized to your profile.
            </p>
          </motion.div>

          {/* Category cards */}
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {toolCategories.map((cat, ci) => {
              const c = C[cat.color as CKey]
              return (
                <motion.div
                  key={cat.category}
                  variants={fadeUp} initial="hidden" whileInView="visible"
                  transition={{ duration: 0.5, delay: ci * 0.07, ease: 'easeOut' }}
                  viewport={{ once: true, amount: 0.08 }}
                  className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] p-7 ring-1 ring-transparent transition duration-300 hover:border-white/20 hover:${c.ring} hover:bg-white/[0.04]`}
                >
                  {/* Corner glow */}
                  <div className={`pointer-events-none absolute -right-8 -top-8 h-36 w-36 rounded-full bg-gradient-to-br ${c.glow} to-transparent opacity-0 blur-2xl transition duration-500 group-hover:opacity-100`} />

                  {/* Category label */}
                  <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-widest ${c.badge}`}>
                    {cat.category}
                  </span>
                  <p className="mb-5 mt-2.5 text-sm leading-relaxed text-slate-400">{cat.description}</p>

                  {/* Tool rows */}
                  <div className="flex flex-col gap-2.5">
                    {cat.tools.map((t) => {
                      const TIcon = t.icon
                      return (
                        <a
                          key={t.name}
                          href="/app/tools"
                          className={`group/row relative flex items-center gap-4 rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-3.5 transition duration-200 ${c.row}`}
                        >
                          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${c.icon}`}>
                            <TIcon className="h-5 w-5" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-[0.9rem] font-semibold leading-tight text-white">{t.name}</p>
                            <p className="mt-0.5 text-xs leading-relaxed text-slate-400">{t.desc}</p>
                          </div>
                          <ArrowRight className={`h-4 w-4 shrink-0 ${c.arrow} opacity-0 transition group-hover/row:translate-x-0.5 group-hover/row:opacity-100`} />
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

/* ─── Screen preview ────────────────────────────────────────────────── */

function ScreenPreview({ src, alt }: { src: string; alt: string }) {
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.018 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="group relative w-full"
    >
      {/* ambient glow */}
      <div className="absolute -inset-5 rounded-[32px] bg-gradient-to-br from-cyan-400/18 via-transparent to-violet-400/12 opacity-70 blur-2xl transition duration-500 group-hover:opacity-100" />

      {/* window frame */}
      <div className="relative overflow-hidden rounded-[18px] border border-white/[0.09] bg-[#080f22] shadow-[0_40px_100px_rgba(0,0,0,0.65)]">
        {/* title bar */}
        <div className="flex h-10 items-center gap-2 border-b border-white/[0.06] bg-white/[0.025] px-4">
          <span className="h-3 w-3 rounded-full bg-red-400/80" />
          <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
          <span className="h-3 w-3 rounded-full bg-green-400/80" />
          <span className="ml-3 h-3 w-44 rounded-full bg-white/[0.07]" />
        </div>

        {/* screenshot — no blur, sharp render */}
        <div className="overflow-hidden">
          <Image
            src={src}
            alt={alt}
            width={1440}
            height={900}
            quality={100}
            priority={false}
            sizes="(min-width: 1280px) 660px, (min-width: 1024px) 50vw, 100vw"
            className="block aspect-[16/10] w-full object-cover object-top transition duration-700 ease-out will-change-transform group-hover:scale-[1.06] group-hover:object-[center_20%]"
          />
        </div>
      </div>
    </motion.div>
  )
}
