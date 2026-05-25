'use client'

import { motion } from 'framer-motion'
import {
  Bot,
  TrendingUp,
  Shield,
  Target,
  Wallet,
  Calculator,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react'

const features = [
  {
    icon: TrendingUp,
    title: 'Investment Intelligence',
    description:
      'Track SIPs, portfolio growth, compounding projections and hidden investment leaks.',
    color: 'from-cyan-500/20 to-cyan-500/5',
    border: 'border-cyan-500/20',
    iconColor: 'text-cyan-400',
  },
  {
    icon: Shield,
    title: 'Insurance Analyzer',
    description:
      'Detect poor IRR policies, hidden charges and inadequate coverage instantly.',
    color: 'from-emerald-500/20 to-emerald-500/5',
    border: 'border-emerald-500/20',
    iconColor: 'text-emerald-400',
  },
  {
    icon: Wallet,
    title: 'Financial Health',
    description:
      'AI continuously monitors your savings, emergency fund and financial score.',
    color: 'from-red-500/20 to-red-500/5',
    border: 'border-red-500/20',
    iconColor: 'text-red-400',
  },
  {
    icon: Calculator,
    title: 'Tax Optimization',
    description:
      'Compare regimes, discover deductions and optimize tax savings automatically.',
    color: 'from-amber-500/20 to-amber-500/5',
    border: 'border-amber-500/20',
    iconColor: 'text-amber-400',
  },
  {
    icon: Target,
    title: 'Goal Planning',
    description:
      'Retirement, child education, wealth goals and long-term financial planning.',
    color: 'from-blue-500/20 to-blue-500/5',
    border: 'border-blue-500/20',
    iconColor: 'text-blue-400',
  },
  {
    icon: Bot,
    title: 'AI Financial Agent',
    description:
      'An AI assistant that already knows your numbers and guides your next move.',
    color: 'from-purple-500/20 to-purple-500/5',
    border: 'border-purple-500/20',
    iconColor: 'text-purple-400',
  },
]

const alerts = [
  {
    title: 'Emergency Fund Critical',
    description: 'You are ₹1,80,000 short of your emergency reserve.',
    color: 'border-red-500/20 bg-red-500/[0.04]',
    badge: 'CRITICAL',
  },
  {
    title: 'No SIP Detected',
    description:
      'Starting ₹10K/month today could grow into ₹1.6Cr over 20 years.',
    color: 'border-cyan-500/20 bg-cyan-500/[0.04]',
    badge: 'ACTION',
  },
  {
    title: 'Tax Opportunity Found',
    description: 'Additional ₹18,000 deductions available this year.',
    color: 'border-amber-500/20 bg-amber-500/[0.04]',
    badge: 'SAVE',
  },
]

export default function FeaturesGrid() {
  return (
    <section className="relative overflow-hidden bg-[#050816] py-24">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(47,230,255,0.10),transparent_35%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(122,60,255,0.10),transparent_35%)]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-400">
            ⚡ Live Product
          </div>

          <h2 className="mb-6 text-4xl font-black tracking-tight text-white md:text-6xl">
            Built Like a
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              {' '}
              Real Financial OS
            </span>
          </h2>

          <p className="text-lg leading-8 text-slate-400">
            Real dashboards. Real AI alerts. Real financial workflows.
            FinHealth360 is designed as a complete financial operating system —
            not just another calculator website.
          </p>
        </motion.div>

        {/* Real Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-20 overflow-hidden rounded-3xl border border-white/10 bg-[#09101f]/80 shadow-2xl backdrop-blur-xl"
        >
          {/* Top */}
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
            <div>
              <div className="text-xl font-bold text-white">
                FinHealth360 Dashboard
              </div>

              <div className="text-sm text-slate-500">
                Autonomous AI Financial Workspace
              </div>
            </div>

            <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-xs font-semibold text-emerald-400">
              ⚡ AI Agent Active
            </div>
          </div>

          {/* Metrics */}
          <div className="grid gap-5 p-6 md:grid-cols-4">
            {[
              ['Net Worth', '₹3,00,000', 'text-emerald-400'],
              ['Monthly Savings', '₹20,000', 'text-cyan-400'],
              ['Monthly Expenses', '₹30,000', 'text-amber-400'],
              ['Investments', '₹0', 'text-purple-400'],
            ].map(([title, value, color]) => (
              <div
                key={title}
                className="rounded-2xl border border-white/10 bg-[#0B1020]/80 p-5"
              >
                <div className="mb-2 text-xs uppercase tracking-widest text-slate-500">
                  {title}
                </div>

                <div className="mb-2 text-3xl font-black text-white">
                  {value}
                </div>

                <div className={`text-sm ${color}`}>
                  Live financial intelligence
                </div>
              </div>
            ))}
          </div>

          {/* AI Alerts */}
          <div className="p-6 pt-0">
            <div className="mb-5 flex items-center gap-2 text-sm font-semibold tracking-wide text-slate-400">
              <AlertTriangle size={16} className="text-red-400" />
              AI ALERTS
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {alerts.map((alert) => (
                <div
                  key={alert.title}
                  className={`rounded-2xl border p-5 ${alert.color}`}
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div className="text-lg font-bold text-white">
                      {alert.title}
                    </div>

                    <div className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold tracking-wider text-white">
                      {alert.badge}
                    </div>
                  </div>

                  <p className="text-sm leading-6 text-slate-300">
                    {alert.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Features */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className={`group rounded-3xl border bg-gradient-to-b ${feature.color} ${feature.border} p-7 transition-all duration-300 hover:border-cyan-500/30`}
              >
                <div
                  className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-black/20 ${feature.iconColor}`}
                >
                  <Icon size={28} />
                </div>

                <h3 className="mb-3 text-2xl font-bold text-white">
                  {feature.title}
                </h3>

                <p className="leading-7 text-slate-400">
                  {feature.description}
                </p>

                <div className="mt-5 flex items-center gap-2 text-sm font-medium text-cyan-400">
                  <CheckCircle2 size={16} />
                  Connected to your financial profile
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom Banner */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-r from-cyan-500/[0.08] to-purple-500/[0.08] p-10"
        >
          <div className="max-w-3xl">
            <div className="mb-4 text-4xl font-black text-white">
              Your finances should not depend on memory, spreadsheets or luck.
            </div>

            <p className="mb-8 text-lg leading-8 text-slate-400">
              FinHealth360 continuously monitors your financial life, detects
              risks early and helps you make smarter money decisions with AI.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-500 px-7 py-4 font-semibold text-black transition-transform hover:scale-105">
                Start Free
              </button>

              <button className="rounded-2xl border border-white/10 bg-white/5 px-7 py-4 font-semibold text-white backdrop-blur-xl transition-all hover:border-cyan-500/30">
                Explore Platform
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}