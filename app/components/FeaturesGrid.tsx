'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Bot,
  HeartPulse,
  Shield,
  Target,
  TrendingUp,
  Wallet,
  Calculator,
  PieChart,
  BarChart2,
  AlertTriangle,
  FileText,
  CheckCircle,
  PiggyBank,
  Flag,
  LineChart,
  CreditCard,
  GitCompare,
  Zap,
  Receipt,
  BadgePercent,
  MessageSquare,
  FileSearch,
  Landmark,
} from 'lucide-react'

const sections = [
  {
    title: 'AI Financial Dashboard',
    eyebrow: 'Financial Command Center',
    description:
      'Monitor savings, expenses, investments, alerts, and your complete financial health in one AI-powered workspace.',
    icon: Wallet,
    image: '/screens/dashboard.png',
  },
  {
    title: 'Autonomous AI Alerts',
    eyebrow: 'Always-On Risk Detection',
    description:
      'Your AI agent detects emergency fund gaps, missed SIPs, portfolio risks, and money opportunities automatically.',
    icon: Bot,
    image: '/screens/alerts.png',
  },
  {
    title: 'Financial Health Analysis',
    eyebrow: 'Score, Red Flags, Action Plan',
    description:
      'Understand strengths, red flags, action plans, and your overall money position with clear AI insights.',
    icon: HeartPulse,
    image: '/screens/financial-health.png',
  },
  {
    title: 'Investment Intelligence',
    eyebrow: 'SIP & Wealth Projection',
    description:
      'Visualize SIP projections, long-term wealth growth, and portfolio optimization insights.',
    icon: TrendingUp,
    image: '/screens/investments.png',
  },
  {
    title: 'Insurance Analysis',
    eyebrow: 'Policy & Coverage Review',
    description:
      'Analyze policy IRR, hidden charges, coverage gaps, and insurance efficiency instantly.',
    icon: Shield,
    image: '/screens/insurance.png',
  },
  {
    title: 'Goal & Retirement Planning',
    eyebrow: 'Future Planning',
    description:
      'Plan retirement, child education, wealth goals, and long-term financial freedom with clarity.',
    icon: Target,
    image: '/screens/planning.png',
  },
  {
    title: 'AI Financial Agent',
    eyebrow: 'Personal Money Assistant',
    description:
      'Ask your personal AI agent questions about savings, tax, SIPs, insurance, risks, and next actions.',
    icon: Bot,
    image: '/screens/agent.png',
  },
]

const toolCategories = [
  {
    category: 'Investments',
    description: 'Plan and analyze your investment strategies',
    color: 'cyan',
    tools: [
      { name: 'SIP Calculator', desc: 'Calculate your SIP maturity value and wealth growth', icon: Calculator, href: '/app/tools' },
      { name: 'Portfolio Analyzer', desc: 'Analyze your portfolio performance and allocation', icon: PieChart, href: '/app/tools' },
      { name: 'Return Calculator', desc: 'Calculate CAGR and annualized returns on investments', icon: BarChart2, href: '/app/tools' },
      { name: 'Risk Analysis', desc: 'Assess your portfolio risk and get rebalancing signals', icon: AlertTriangle, href: '/app/tools' },
    ],
  },
  {
    category: 'Insurance',
    description: 'Evaluate and optimize your insurance coverage',
    color: 'violet',
    tools: [
      { name: 'Policy Analyzer', desc: 'Upload any policy and get real IRR and hidden charges', icon: FileText, href: '/app/tools' },
      { name: 'IRR Calculator', desc: 'Calculate the true Internal Rate of Return on your policy', icon: Calculator, href: '/app/tools' },
      { name: 'Coverage Checker', desc: 'Check if your life and health coverage is adequate', icon: CheckCircle, href: '/app/tools' },
    ],
  },
  {
    category: 'Financial Planning',
    description: 'Build a roadmap for your financial goals',
    color: 'sky',
    tools: [
      { name: 'Retirement Planner', desc: 'Plan your retirement corpus and monthly savings needed', icon: PiggyBank, href: '/app/tools' },
      { name: 'Goal Planning', desc: 'Set financial goals and track progress with projections', icon: Flag, href: '/app/tools' },
      { name: 'Wealth Projection', desc: 'Project your net worth growth over the next 10–30 years', icon: LineChart, href: '/app/tools' },
    ],
  },
  {
    category: 'Loans',
    description: 'Manage your borrowings smartly',
    color: 'emerald',
    tools: [
      { name: 'EMI Calculator', desc: 'Calculate your monthly EMI for home, car, or personal loans', icon: CreditCard, href: '/app/tools' },
      { name: 'Loan Comparison', desc: 'Compare multiple loan offers side by side on real cost', icon: GitCompare, href: '/app/tools' },
      { name: 'Prepayment Strategy', desc: 'Find the optimal prepayment plan to save on interest', icon: Zap, href: '/app/tools' },
    ],
  },
  {
    category: 'Tax',
    description: 'Minimize your tax liability legally',
    color: 'amber',
    tools: [
      { name: 'Tax Calculator', desc: 'Compare old vs new income tax regime for your income', icon: Receipt, href: '/app/tools' },
      { name: 'Deduction Optimizer', desc: 'Find all deductions under 80C, 80D, HRA, and more', icon: BadgePercent, href: '/app/tools' },
    ],
  },
  {
    category: 'AI Tools',
    description: 'AI-powered financial intelligence',
    color: 'rose',
    tools: [
      { name: 'Financial Assistant', desc: 'Chat with AI for instant answers to financial questions', icon: MessageSquare, href: '/app/ai' },
      { name: 'Report Explainer', desc: 'Upload any financial document and get a plain-English summary', icon: FileSearch, href: '/app/tools' },
    ],
  },
]

const colorMap: Record<string, { border: string; bg: string; text: string; badge: string; badgeBg: string }> = {
  cyan:    { border: 'border-cyan-300/20',   bg: 'bg-cyan-300/8',   text: 'text-cyan-300',   badge: 'text-cyan-300',   badgeBg: 'bg-cyan-300/10 border-cyan-300/20' },
  violet:  { border: 'border-violet-300/20', bg: 'bg-violet-300/8', text: 'text-violet-300', badge: 'text-violet-300', badgeBg: 'bg-violet-300/10 border-violet-300/20' },
  sky:     { border: 'border-sky-300/20',    bg: 'bg-sky-300/8',    text: 'text-sky-300',    badge: 'text-sky-300',    badgeBg: 'bg-sky-300/10 border-sky-300/20' },
  emerald: { border: 'border-emerald-300/20',bg: 'bg-emerald-300/8',text: 'text-emerald-300',badge: 'text-emerald-300',badgeBg: 'bg-emerald-300/10 border-emerald-300/20' },
  amber:   { border: 'border-amber-300/20',  bg: 'bg-amber-300/8',  text: 'text-amber-300',  badge: 'text-amber-300',  badgeBg: 'bg-amber-300/10 border-amber-300/20' },
  rose:    { border: 'border-rose-300/20',   bg: 'bg-rose-300/8',   text: 'text-rose-300',   badge: 'text-rose-300',   badgeBg: 'bg-rose-300/10 border-rose-300/20' },
}

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0 },
}

export default function FeaturesGrid() {
  return (
    <section
      id="features"
      className="relative z-[2] w-full overflow-hidden bg-[#050816] px-5 py-24 text-white sm:px-8 lg:px-16 lg:py-32"
    >
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:72px_72px]" />
      <div className="absolute left-[-12%] top-16 h-[520px] w-[520px] rounded-full bg-cyan-400/10 blur-[140px]" />
      <div className="absolute right-[-12%] top-[42%] h-[560px] w-[560px] rounded-full bg-violet-500/10 blur-[150px]" />

      <div className="relative mx-auto max-w-[1400px]">

        {/* ── Section header ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.7, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.25 }}
          className="mb-20 text-center"
        >
          <div className="mb-5 inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-sm font-bold text-cyan-300">
            What FinHealth360 Includes
          </div>
          <h2 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Real product screens.
            <span className="block bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 bg-clip-text text-transparent">
              Real financial intelligence.
            </span>
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            A quick look at the workflows, tools, and AI-powered modules already inside the platform.
          </p>
        </motion.div>

        {/* ── Feature rows ── */}
        <div className="space-y-28 lg:space-y-40">
          {sections.map((section, index) => {
            const Icon = section.icon
            const reverse = index % 2 === 1

            return (
              <motion.div
                key={section.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 0.7, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.18 }}
                className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-16 ${
                  reverse ? 'lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1' : ''
                }`}
              >
                {/* Text column — always genuinely on its side */}
                <div className="flex flex-col items-start">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl border border-cyan-300/25 bg-cyan-300/10">
                    <Icon className="h-7 w-7 text-cyan-300" />
                  </div>
                  <div className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-cyan-300/80">
                    {section.eyebrow}
                  </div>
                  <h3 className="text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                    {section.title}
                  </h3>
                  <p className="mt-5 text-lg leading-8 text-slate-300">
                    {section.description}
                  </p>
                  <div className="mt-7 inline-flex items-center gap-2 font-bold text-cyan-300">
                    Included in platform
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>

                {/* Screen preview column */}
                <div>
                  <FloatingPreview src={section.image} alt={section.title} />
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* ── Tools Hub section ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.7, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.1 }}
          className="mt-40"
        >
          {/* Tools header */}
          <div className="mb-16 text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-300/25 bg-violet-300/10 px-4 py-2 text-sm font-bold text-violet-300">
              <Landmark className="h-4 w-4" />
              Financial Toolkit
            </div>
            <h2 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Every tool you need.
              <span className="block bg-gradient-to-r from-violet-300 via-sky-400 to-cyan-300 bg-clip-text text-transparent">
                All in one place.
              </span>
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              20+ AI-powered calculators, analyzers, and planners — organized by category, personalized to your profile.
            </p>
          </div>

          {/* Tool category grid */}
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {toolCategories.map((cat, ci) => {
              const c = colorMap[cat.color]
              return (
                <motion.div
                  key={cat.category}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 0.5, delay: ci * 0.07, ease: 'easeOut' }}
                  viewport={{ once: true, amount: 0.1 }}
                  className={`rounded-2xl border ${c.border} bg-white/[0.03] p-6 backdrop-blur-sm`}
                >
                  {/* Category header */}
                  <div className={`mb-1 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-widest ${c.badgeBg} ${c.badge}`}>
                    {cat.category}
                  </div>
                  <p className="mb-5 mt-2 text-sm text-slate-400">{cat.description}</p>

                  {/* Tools list */}
                  <div className="space-y-3">
                    {cat.tools.map((tool) => {
                      const TIcon = tool.icon
                      return (
                        <a
                          key={tool.name}
                          href={tool.href}
                          className={`group flex items-start gap-3 rounded-xl border ${c.border} bg-white/[0.025] p-3.5 transition hover:bg-white/[0.05]`}
                        >
                          <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${c.bg}`}>
                            <TIcon className={`h-4 w-4 ${c.text}`} />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-white">{tool.name}</span>
                              <ArrowRight className={`h-3 w-3 ${c.text} opacity-0 transition group-hover:opacity-100 group-hover:translate-x-0.5`} />
                            </div>
                            <p className="mt-0.5 text-xs leading-relaxed text-slate-400">{tool.desc}</p>
                          </div>
                        </a>
                      )
                    })}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

      </div>
    </section>
  )
}

function FloatingPreview({ src, alt }: { src: string; alt: string }) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.012 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="group relative w-full"
    >
      <div className="absolute -inset-6 rounded-[28px] bg-cyan-400/10 opacity-80 blur-3xl transition group-hover:bg-violet-400/15" />

      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b1020] shadow-2xl shadow-black/60">
        {/* Fake browser bar */}
        <div className="flex h-10 items-center gap-2 border-b border-white/10 bg-white/[0.035] px-4">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
          <span className="ml-4 h-3 w-36 rounded-full bg-white/10" />
        </div>

        {/* Zoom wrapper */}
        <div className="overflow-hidden">
          <Image
            src={src}
            alt={alt}
            width={1920}
            height={1080}
            sizes="(min-width: 1280px) 700px, (min-width: 1024px) 50vw, 100vw"
            className="aspect-[16/9] w-full object-cover object-top transition duration-500 group-hover:scale-[1.06] group-hover:object-center"
          />
        </div>
      </div>
    </motion.div>
  )
}
