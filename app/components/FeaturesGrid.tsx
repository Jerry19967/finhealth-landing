'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Shield,
  TrendingUp,
  Bot,
  Target,
  Calculator,
  Wallet,
  CheckCircle2,
} from 'lucide-react'

const sections = [
  {
    title: 'AI Financial Dashboard',
    description:
      'Monitor savings, expenses, investments, and financial health in one unified AI-powered workspace.',
    icon: Wallet,
    image: '/screens/dashboard.png',
  },
  {
    title: 'Autonomous AI Alerts',
    description:
      'Your AI agent detects financial risks, missed SIPs, emergency fund gaps, and opportunities automatically.',
    icon: Bot,
    image: '/screens/alerts.png',
  },
  {
    title: 'Investment Intelligence',
    description:
      'Visualize SIP projections, long-term wealth growth, and portfolio optimization insights.',
    icon: TrendingUp,
    image: '/screens/investments.png',
  },
  {
    title: 'Insurance Analysis',
    description:
      'Analyze policy IRR, hidden charges, coverage gaps, and insurance efficiency instantly.',
    icon: Shield,
    image: '/screens/insurance.png',
  },
  {
    title: 'Goal & Retirement Planning',
    description:
      'Plan retirement, child education, wealth goals, and long-term financial freedom with clarity.',
    icon: Target,
    image: '/screens/planning.png',
  },
  {
    title: 'Tax Optimization',
    description:
      'Compare tax regimes, optimize deductions, and improve post-tax wealth creation.',
    icon: Calculator,
    image: '/screens/tax.png',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
}

export default function FeaturesGrid() {
  return (
    <section className="relative overflow-hidden bg-[#050816] py-20 text-white sm:py-24 lg:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.12),transparent_32%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(139,92,246,0.12),transparent_34%)]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.25 }}
          className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16"
        >
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-300">
              Live AI Financial Platform
            </div>

            <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Your AI Financial
              <span className="block bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 bg-clip-text text-transparent">
                Operating System
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
              Real-time financial intelligence for investments, insurance,
              taxes, retirement, and wealth planning, built for India.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan-300 to-violet-500 px-6 font-bold text-[#050816] transition hover:opacity-90">
                Start Free
                <ArrowRight className="h-4 w-4" />
              </button>

              <button className="inline-flex h-12 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] px-6 font-semibold text-white transition hover:border-cyan-300/40 hover:bg-white/[0.07]">
                Explore Platform
              </button>
            </div>

            <div className="mt-7 grid gap-3 text-sm text-slate-400 sm:grid-cols-3">
              {['No bank login required', 'Built for India', 'AI-powered analysis'].map(
                item => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-cyan-300" />
                    <span>{item}</span>
                  </div>
                )
              )}
            </div>
          </div>

          <DashboardImage
            src="/screens/dashboard.png"
            alt="FinHealth360 dashboard"
            priority
          />
        </motion.div>

        <div className="mt-24 space-y-24 lg:mt-32 lg:space-y-32">
          {sections.map((section, index) => {
            const Icon = section.icon
            const reverse = index % 2 === 1

            return (
              <motion.div
                key={section.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 0.6, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.2 }}
                className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
              >
                <div className={reverse ? 'lg:order-2' : undefined}>
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg border border-cyan-300/20 bg-cyan-300/10">
                    <Icon className="h-6 w-6 text-cyan-300" />
                  </div>

                  <h2 className="max-w-xl text-3xl font-black leading-tight tracking-tight sm:text-4xl">
                    {section.title}
                  </h2>

                  <p className="mt-5 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
                    {section.description}
                  </p>

                  <div className="mt-6 inline-flex items-center gap-2 font-semibold text-cyan-300">
                    <span>Powered by AI intelligence</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>

                <div className={reverse ? 'lg:order-1' : undefined}>
                  <DashboardImage src={section.image} alt={section.title} />
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.25 }}
          className="mt-24 rounded-xl border border-cyan-300/20 bg-gradient-to-r from-cyan-300/[0.08] to-violet-500/[0.08] p-8 sm:p-10 lg:mt-32 lg:p-12"
        >
          <div className="max-w-3xl">
            <h2 className="text-3xl font-black leading-tight tracking-tight sm:text-4xl">
              Your finances should not depend on spreadsheets, memory, or luck.
            </h2>

            <p className="mt-5 text-base leading-8 text-slate-300 sm:text-lg">
              FinHealth360 continuously monitors your financial life, detects
              risks early, and guides your next financial move with AI.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button className="inline-flex h-12 items-center justify-center rounded-lg bg-gradient-to-r from-cyan-300 to-violet-500 px-6 font-bold text-[#050816] transition hover:opacity-90">
                Start Free
              </button>

              <button className="inline-flex h-12 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] px-6 font-semibold text-white transition hover:border-cyan-300/40 hover:bg-white/[0.07]">
                View Dashboard
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function DashboardImage({
  src,
  alt,
  priority = false,
}: {
  src: string
  alt: string
  priority?: boolean
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="relative"
    >
      <div className="absolute -inset-4 rounded-2xl bg-cyan-400/10 blur-2xl" />

      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#0b1020] shadow-2xl shadow-black/40">
        <Image
          src={src}
          alt={alt}
          width={1600}
          height={1000}
          priority={priority}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="aspect-[16/10] w-full object-cover object-top"
        />
      </div>
    </motion.div>
  )
}