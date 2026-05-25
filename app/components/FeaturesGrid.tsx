'use client'

import { motion } from 'framer-motion'
import {
  Bot,
  TrendingUp,
  Shield,
  BarChart3,
  Zap,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react'

const metrics = [
  {
    label: 'NET WORTH',
    value: '₹3,00,000',
    sub: '▲ 6.3% vs last month',
    color: 'text-emerald-400',
  },
  {
    label: 'MONTHLY SAVINGS',
    value: '₹20,000',
    sub: '▲ 40% of income',
    color: 'text-cyan-400',
  },
  {
    label: 'MONTHLY EXPENSES',
    value: '₹30,000',
    sub: '▲ vs last month',
    color: 'text-amber-400',
  },
  {
    label: 'INVESTMENTS',
    value: '₹0',
    sub: 'No SIP detected',
    color: 'text-purple-400',
  },
]

const alerts = [
  {
    icon: '🚨',
    title: 'Emergency Fund Critical',
    tag: 'CRITICAL',
    desc: 'You are ₹1,80,000 short of a healthy emergency fund.',
    color: 'border-red-500/20 bg-red-500/5 text-red-400',
  },
  {
    icon: '⚡',
    title: 'No SIP Detected',
    tag: 'ACTION',
    desc: 'Starting ₹10K/mo today could grow into ₹1.6Cr in 20 years.',
    color: 'border-cyan-500/20 bg-cyan-500/5 text-cyan-400',
  },
  {
    icon: '💡',
    title: 'Tax Opportunity Found',
    tag: 'SAVE',
    desc: 'You may still claim ₹18,000 additional deductions.',
    color: 'border-amber-500/20 bg-amber-500/5 text-amber-400',
  },
]

const features = [
  {
    icon: TrendingUp,
    title: 'Investment Intelligence',
    desc: 'Detect underperforming SIPs, portfolio gaps, and hidden costs.',
    color: 'text-cyan-400',
  },
  {
    icon: Shield,
    title: 'Insurance Analyzer',
    desc: 'Calculate real IRR and uncover hidden insurance charges.',
    color: 'text-emerald-400',
  },
  {
    icon: BarChart3,
    title: 'Wealth Projection',
    desc: 'Visualize your wealth growth over 10–30 years.',
    color: 'text-purple-400',
  },
  {
    icon: Bot,
    title: 'AI Financial Agent',
    desc: 'Your autonomous AI advisor monitoring finances 24/7.',
    color: 'text-pink-400',
  },
]

export default function FeaturesGrid() {
  return (
    <section className="relative overflow-hidden py-28 px-6 bg-[#050816]">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(47,230,255,0.12),transparent_35%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(122,60,255,0.12),transparent_35%)]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mx-auto mb-20 max-w-3xl text-center"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-400">
            <Zap size={14} />
            Live Platform
          </div>

          <h2 className="mb-6 text-4xl font-black tracking-tight text-white md:text-6xl">
            Your AI Financial
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              {' '}
              Command Center
            </span>
          </h2>

          <p className="text-lg leading-8 text-slate-400">
            Real-time financial intelligence powered by autonomous AI —
            monitoring risks, taxes, investments, insurance and wealth growth
            continuously.
          </p>
        </motion.div>

        {/* Dashboard */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-24 overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-purple-500 font-black text-black">
                F
              </div>

              <div>
                <div className="font-bold text-white">FinHealth360</div>
                <div className="text-xs text-slate-500">
                  AI Financial Operating System
                </div>
              </div>
            </div>

            <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-xs font-semibold text-emerald-400">
              ⚡ AI Agent Active
            </div>
          </div>

          {/* Metrics */}
          <div className="grid gap-5 p-6 md:grid-cols-4">
            {metrics.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/10 bg-[#0B1020]/80 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/20"
              >
                <div className="mb-3 text-xs font-semibold tracking-widest text-slate-500">
                  {item.label}
                </div>

                <div className="mb-2 text-3xl font-black text-white">
                  {item.value}
                </div>

                <div className={`text-sm ${item.color}`}>{item.sub}</div>
              </div>
            ))}
          </div>

          {/* Alerts */}
          <div className="p-6 pt-0">
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold tracking-wide text-slate-400">
              <AlertTriangle size={16} className="text-red-400" />
              AI ALERTS
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {alerts.map((alert) => (
                <motion.div
                  whileHover={{ y: -4 }}
                  key={alert.title}
                  className={`rounded-2xl border p-5 transition-all duration-300 ${alert.color}`}
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div className="text-xl">{alert.icon}</div>

                    <div className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold tracking-wider">
                      {alert.tag}
                    </div>
                  </div>

                  <h3 className="mb-2 text-lg font-bold text-white">
                    {alert.title}
                  </h3>

                  <p className="text-sm leading-6 text-slate-300">
                    {alert.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {features.map((feature, index) => {
            const Icon = feature.icon

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="group rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/20 hover:bg-white/[0.05]"
              >
                <div
                  className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 ${feature.color}`}
                >
                  <Icon size={28} />
                </div>

                <h3 className="mb-4 text-2xl font-bold text-white">
                  {feature.title}
                </h3>

                <p className="leading-7 text-slate-400">{feature.desc}</p>

                <div className="mt-6 flex items-center gap-2 text-sm font-medium text-cyan-400">
                  <CheckCircle size={16} />
                  Powered by AI intelligence
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}