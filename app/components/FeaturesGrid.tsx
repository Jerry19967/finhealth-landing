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
} from 'lucide-react'

const sections = [
  {
    title: 'AI Financial Dashboard',
    description:
      'Monitor savings, expenses, investments and financial health in one unified workspace powered by AI.',
    icon: Wallet,
    image: '/screens/dashboard.png',
    color: 'from-cyan-500/10 to-blue-500/5',
  },
  {
    title: 'Autonomous AI Alerts',
    description:
      'Your AI agent continuously detects financial risks, missing SIPs, emergency fund gaps and opportunities.',
    icon: Bot,
    image: '/screens/alerts.png',
    color: 'from-red-500/10 to-pink-500/5',
  },
  {
    title: 'Investment Intelligence',
    description:
      'Visualize long-term wealth growth, SIP projections and portfolio optimization insights.',
    icon: TrendingUp,
    image: '/screens/investments.png',
    color: 'from-emerald-500/10 to-cyan-500/5',
  },
  {
    title: 'Insurance Analysis',
    description:
      'Analyze policy IRR, hidden charges, coverage gaps and insurance efficiency instantly.',
    icon: Shield,
    image: '/screens/insurance.png',
    color: 'from-purple-500/10 to-blue-500/5',
  },
  {
    title: 'Goal & Retirement Planning',
    description:
      'Plan retirement, child education, wealth goals and long-term financial freedom.',
    icon: Target,
    image: '/screens/planning.png',
    color: 'from-amber-500/10 to-orange-500/5',
  },
  {
    title: 'Tax Optimization',
    description:
      'Compare tax regimes, optimize deductions and improve post-tax wealth creation.',
    icon: Calculator,
    image: '/screens/tax.png',
    color: 'from-blue-500/10 to-purple-500/5',
  },
]

export default function FeaturesGrid() {
  return (
    <section className="relative overflow-hidden bg-[#050816] py-28">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(47,230,255,0.08),transparent_35%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(122,60,255,0.08),transparent_35%)]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-28 grid items-center gap-20 lg:grid-cols-2"
        >
          {/* Left */}
          <div>
            <div className="mb-6 inline-flex items-center rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-400">
              ⚡ Live AI Financial Platform
            </div>

            <h1 className="mb-8 text-5xl font-black leading-tight tracking-tight text-white md:text-7xl">
              Your AI Financial
              <span className="block bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Operating System
              </span>
            </h1>

            <p className="mb-10 max-w-xl text-xl leading-9 text-slate-400">
              Real-time financial intelligence for investments, insurance,
              taxes, retirement and wealth planning — powered by autonomous AI
              built for India.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-500 px-7 py-4 font-semibold text-black transition-transform hover:scale-105">
                Start Free
                <ArrowRight size={18} />
              </button>

              <button className="rounded-2xl border border-white/10 bg-white/5 px-7 py-4 font-semibold text-white backdrop-blur-xl transition-all hover:border-cyan-500/30">
                Explore Platform
              </button>
            </div>

            <div className="mt-8 flex flex-wrap gap-6 text-sm text-slate-500">
              <div>✔ No bank login required</div>
              <div>✔ Built for India</div>
              <div>✔ AI-powered analysis</div>
            </div>
          </div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 rounded-[32px] bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-3xl" />

            <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#0B1020]/80 shadow-2xl">
              <Image
                src="/screens/dashboard.png"
                alt="FinHealth360 Dashboard"
                width={1600}
                height={1000}
                className="h-auto w-full"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Product Sections */}
        <div className="space-y-32">
          {sections.map((section, index) => {
            const Icon = section.icon

            return (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className={`grid items-center gap-16 lg:grid-cols-2 ${
                  index % 2 !== 0 ? 'lg:[&>*:first-child]:order-2' : ''
                }`}
              >
                {/* Content */}
                <div>
                  <div
                    className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-b ${section.color}`}
                  >
                    <Icon className="h-7 w-7 text-cyan-400" />
                  </div>

                  <h2 className="mb-6 text-4xl font-black text-white md:text-5xl">
                    {section.title}
                  </h2>

                  <p className="mb-8 text-lg leading-8 text-slate-400">
                    {section.description}
                  </p>

                  <div className="flex items-center gap-2 text-cyan-400">
                    <ArrowRight size={18} />
                    <span className="font-medium">
                      Powered by AI intelligence
                    </span>
                  </div>
                </div>

                {/* Screenshot */}
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                >
                  <div className="absolute inset-0 rounded-[32px] bg-gradient-to-r from-cyan-500/10 to-purple-500/10 blur-2xl" />

                  <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#0B1020]/80 shadow-2xl">
                    <Image
                      src={section.image}
                      alt={section.title}
                      width={1600}
                      height={1000}
                      className="h-auto w-full"
                    />
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mt-36 overflow-hidden rounded-[40px] border border-cyan-500/20 bg-gradient-to-r from-cyan-500/[0.08] to-purple-500/[0.08] p-12 md:p-16"
        >
          <div className="max-w-4xl">
            <div className="mb-6 text-5xl font-black leading-tight text-white">
              Your finances should not depend on spreadsheets, memory or luck.
            </div>

            <p className="mb-10 text-xl leading-9 text-slate-400">
              FinHealth360 continuously monitors your financial life, detects
              risks early and guides your next financial move with AI.
            </p>

            <div className="flex flex-wrap gap-5">
              <button className="rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-500 px-8 py-4 font-semibold text-black transition-transform hover:scale-105">
                Start Free
              </button>

              <button className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 font-semibold text-white backdrop-blur-xl transition-all hover:border-cyan-500/30">
                View Dashboard
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}