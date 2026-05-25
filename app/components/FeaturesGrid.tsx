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
  { title: 'AI Financial Dashboard',     eyebrow: 'Financial Command Center',  description: 'Monitor savings, expenses, investments, alerts, and your complete financial health in one AI-powered workspace.',               icon: Wallet,     image: '/screens/dashboard.png'       },
  { title: 'Autonomous AI Alerts',       eyebrow: 'Always-On Risk Detection',  description: 'Your AI agent detects emergency fund gaps, missed SIPs, portfolio risks, and money opportunities automatically.',                icon: Bot,        image: '/screens/alerts.png'          },
  { title: 'Financial Health Analysis',  eyebrow: 'Score, Red Flags & Action', description: 'Understand strengths, red flags, action plans, and your overall money position with clear AI insights.',                         icon: HeartPulse, image: '/screens/financial-health.png'},
  { title: 'Investment Intelligence',    eyebrow: 'SIP & Wealth Projection',   description: 'Visualize SIP projections, long-term wealth growth, and portfolio optimization insights tailored to your numbers.',               icon: TrendingUp, image: '/screens/investments.png'    },
  { title: 'Insurance Analysis',         eyebrow: 'Policy & Coverage Review',  description: 'Analyze policy IRR, hidden charges, coverage gaps, and insurance efficiency instantly.',                                          icon: Shield,     image: '/screens/insurance.png'      },
  { title: 'Goal & Retirement Planning', eyebrow: 'Future Planning',           description: 'Plan retirement, child education, wealth goals, and long-term financial freedom with clarity.',                                   icon: Target,     image: '/screens/planning.png'       },
  { title: 'AI Financial Agent',         eyebrow: 'Personal Money Assistant',  description: 'Ask your personal AI agent questions about savings, tax, SIPs, insurance, risks, and next actions — anytime.',                   icon: Bot,        image: '/screens/agent.png'          },
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

const palette: Record<string, { card: string; badge: string; icon: string; row: string; glow: string; arrow: string }> = {
  cyan:    { card: 'border-cyan-400/25 hover:border-cyan-400/45 hover:shadow-cyan-400/10',        badge: 'bg-cyan-400/10 text-cyan-300 border-cyan-400/30',        icon: 'bg-cyan-400/15 text-cyan-300',        row: 'hover:bg-cyan-400/10',    glow: 'bg-cyan-400',    arrow: 'text-cyan-400'    },
  violet:  { card: 'border-violet-400/25 hover:border-violet-400/45 hover:shadow-violet-400/10',  badge: 'bg-violet-400/10 text-violet-300 border-violet-400/30',  icon: 'bg-violet-400/15 text-violet-300',    row: 'hover:bg-violet-400/10',  glow: 'bg-violet-400',  arrow: 'text-violet-400'  },
  sky:     { card: 'border-sky-400/25 hover:border-sky-400/45 hover:shadow-sky-400/10',           badge: 'bg-sky-400/10 text-sky-300 border-sky-400/30',           icon: 'bg-sky-400/15 text-sky-300',          row: 'hover:bg-sky-400/10',     glow: 'bg-sky-400',     arrow: 'text-sky-400'     },
  emerald: { card: 'border-emerald-400/25 hover:border-emerald-400/45 hover:shadow-emerald-400/10', badge: 'bg-emerald-400/10 text-emerald-300 border-emerald-400/30', icon: 'bg-emerald-400/15 text-emerald-300', row: 'hover:bg-emerald-400/10', glow: 'bg-emerald-400', arrow: 'text-emerald-400' },
  amber:   { card: 'border-amber-400/25 hover:border-amber-400/45 hover:shadow-amber-400/10',     badge: 'bg-amber-400/10 text-amber-300 border-amber-400/30',     icon: 'bg-amber-400/15 text-amber-300',      row: 'hover:bg-amber-400/10',   glow: 'bg-amber-400',   arrow: 'text-amber-400'   },
  rose:    { card: 'border-rose-400/25 hover:border-rose-400/45 hover:shadow-rose-400/10',        badge: 'bg-rose-400/10 text-rose-300 border-rose-400/30',        icon: 'bg-rose-400/15 text-rose-300',        row: 'hover:bg-rose-400/10',    glow: 'bg-rose-400',    arrow: 'text-rose-400'    },
}

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }

export default function FeaturesGrid() {
  return (
    <section id="features" className="relative z-[2] w-full overflow-hidden bg-[#050816] py-24 text-white lg:py-36">

      {/* background */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.022)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.022)_1px,transparent_1px)] bg-[size:72px_72px]" />
      <div className="pointer-events-none absolute left-0 top-24 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 top-[50%] h-[520px] w-[520px] translate-x-1/2 rounded-full bg-violet-500/10 blur-[130px]" />

      {/* single centred wrapper */}
      <div className="relative mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">

        {/* features header */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible"
          transition={{ duration: 0.65 }} viewport={{ once: true, amount: 0.3 }}
          className="mx-auto mb-24 max-w-3xl text-center"
        >
          <span className="inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-1.5 text-sm font-bold text-cyan-300">
            What FinHealth360 Includes
          </span>
          <h2 className="mt-5 text-5xl font-black leading-[1.08] tracking-tight lg:text-6xl">
            Real product screens.
            <span className="block bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 bg-clip-text text-transparent">
              Real financial intelligence.
            </span>
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            A quick look at the workflows, tools, and AI-powered modules already inside the platform.
          </p>
        </motion.div>

        {/* alternating feature rows */}
        <div className="flex flex-col gap-32 lg:gap-44">
          {sections.map((s, i) => {
            const Icon = s.icon
            const flip = i % 2 === 1
            return (
              <motion.div
                key={s.title}
                variants={fadeUp} initial="hidden" whileInView="visible"
                transition={{ duration: 0.65 }} viewport={{ once: true, amount: 0.15 }}
                className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20"
              >
                {/* text side */}
                <div className={`flex flex-col items-start ${flip ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 shadow-lg shadow-cyan-400/10">
                    <Icon className="h-8 w-8 text-cyan-300" />
                  </div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-cyan-300/70">{s.eyebrow}</p>
                  <h3 className="text-4xl font-black leading-[1.1] tracking-tight sm:text-5xl">{s.title}</h3>
                  <p className="mt-5 max-w-sm text-lg leading-8 text-slate-300">{s.description}</p>
                  <a href="#" className="mt-8 inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-5 py-2.5 text-sm font-bold text-cyan-300 transition hover:bg-cyan-300/20">
                    Included in platform <ArrowRight className="h-4 w-4" />
                  </a>
                </div>

                {/* screen side */}
                <div className={flip ? 'lg:order-1' : 'lg:order-2'}>
                  <ScreenPreview src={s.image} alt={s.title} />
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* TOOLS HUB */}
        <div className="mt-44">

          {/* tools header */}
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible"
            transition={{ duration: 0.65 }} viewport={{ once: true, amount: 0.2 }}
            className="mx-auto mb-16 max-w-3xl text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-300/25 bg-violet-300/10 px-4 py-1.5 text-sm font-bold text-violet-300">
              <Landmark className="h-4 w-4" /> Financial Toolkit
            </span>
            <h2 className="mt-5 text-5xl font-black leading-[1.08] tracking-tight lg:text-6xl">
              Every tool you need.
              <span className="block bg-gradient-to-r from-violet-300 via-sky-400 to-cyan-300 bg-clip-text text-transparent">
                All in one place.
              </span>
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              20+ AI-powered calculators, analyzers, and planners — organized by category, personalized to your profile.
            </p>
          </motion.div>

          {/* tool cards */}
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {toolCategories.map((cat, ci) => {
              const p = palette[cat.color]
              return (
                <motion.div
                  key={cat.category}
                  variants={fadeUp} initial="hidden" whileInView="visible"
                  transition={{ duration: 0.5, delay: ci * 0.08 }} viewport={{ once: true, amount: 0.08 }}
                  className={`group relative overflow-hidden rounded-2xl border bg-white/[0.025] p-7 shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-white/[0.045] ${p.card}`}
                >
                  {/* glow blob */}
                  <div className={`pointer-events-none absolute -right-6 -top-6 h-32 w-32 rounded-full ${p.glow} opacity-0 blur-3xl transition duration-500 group-hover:opacity-20`} />

                  {/* category badge */}
                  <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-widest ${p.badge}`}>
                    {cat.category}
                  </span>
                  <p className="mb-6 mt-2.5 text-sm leading-relaxed text-slate-400">{cat.description}</p>

                  {/* tool rows */}
                  <div className="flex flex-col gap-2.5">
                    {cat.tools.map((t) => {
                      const TIcon = t.icon
                      return (
                        <a
                          key={t.name}
                          href="/app/tools"
                          className={`group/row flex items-center gap-4 rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-4 transition duration-200 ${p.row}`}
                        >
                          <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${p.icon}`}>
                            <TIcon className="h-5 w-5" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-[0.925rem] font-semibold leading-snug text-white">{t.name}</p>
                            <p className="mt-0.5 text-xs leading-relaxed text-slate-400">{t.desc}</p>
                          </div>
                          <ArrowRight className={`h-4 w-4 shrink-0 opacity-0 transition group-hover/row:translate-x-0.5 group-hover/row:opacity-100 ${p.arrow}`} />
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
      whileHover={{ y: -10, scale: 1.018 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="group relative w-full"
    >
      {/* ambient glow */}
      <div className="absolute -inset-4 rounded-[32px] bg-gradient-to-br from-cyan-400/15 via-transparent to-violet-400/10 opacity-60 blur-2xl transition duration-500 group-hover:opacity-100" />

      {/* browser chrome */}
      <div className="relative overflow-hidden rounded-[18px] border border-white/[0.09] bg-[#080f22] shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
        <div className="flex h-10 items-center gap-2 border-b border-white/[0.06] bg-white/[0.025] px-4">
          <span className="h-3 w-3 rounded-full bg-red-400/80" />
          <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
          <span className="h-3 w-3 rounded-full bg-green-400/80" />
          <span className="ml-3 h-3 w-40 rounded-full bg-white/[0.07]" />
        </div>
        <div className="overflow-hidden">
          <Image
            src={src}
            alt={alt}
            width={1440}
            height={900}
            quality={100}
            sizes="(min-width: 1280px) 650px, (min-width: 1024px) 50vw, 100vw"
            className="block aspect-[16/10] w-full object-cover object-top transition duration-700 ease-out will-change-transform group-hover:scale-[1.07] group-hover:object-[center_20%]"
          />
        </div>
      </div>
    </motion.div>
  )
}
