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

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0 },
}

export default function FeaturesGrid() {
  return (
    <section
      id="features"
      className="relative z-[2] w-full overflow-hidden bg-[#050816] px-5 py-24 text-white sm:px-8 lg:px-10 lg:py-32"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:72px_72px]" />
      <div className="absolute left-[-12%] top-16 h-[520px] w-[520px] rounded-full bg-cyan-400/10 blur-[140px]" />
      <div className="absolute right-[-12%] top-[42%] h-[560px] w-[560px] rounded-full bg-violet-500/10 blur-[150px]" />

      <div className="relative mx-auto max-w-[1500px]">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.7, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.25 }}
          className="mx-auto mb-20 max-w-3xl text-center"
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
            A quick look at the workflows, tools, and AI-powered modules already
            inside the platform.
          </p>
        </motion.div>

        <div className="space-y-24 lg:space-y-36">
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
                viewport={{ once: true, amount: 0.22 }}
                className="grid items-center gap-10 lg:grid-cols-[0.68fr_1.32fr] lg:gap-20"
              >
                <div className={reverse ? 'lg:order-2' : undefined}>
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl border border-cyan-300/25 bg-cyan-300/10">
                    <Icon className="h-7 w-7 text-cyan-300" />
                  </div>

                  <div className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-cyan-300/80">
                    {section.eyebrow}
                  </div>

                  <h3 className="max-w-xl text-4xl font-black leading-tight tracking-tight sm:text-5xl">
                    {section.title}
                  </h3>

                  <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">
                    {section.description}
                  </p>

                  <div className="mt-7 inline-flex items-center gap-2 font-bold text-cyan-300">
                    Included in platform
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>

                <div className={reverse ? 'lg:order-1' : undefined}>
                  <FloatingPreview src={section.image} alt={section.title} />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function FloatingPreview({
  src,
  alt,
}: {
  src: string
  alt: string
}) {
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.015 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="group relative w-full"
    >
      <div className="absolute -inset-6 rounded-[28px] bg-cyan-400/10 opacity-80 blur-3xl transition group-hover:bg-violet-400/15" />

      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b1020] shadow-2xl shadow-black/60">
        <div className="flex h-10 items-center gap-2 border-b border-white/10 bg-white/[0.035] px-4">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
          <span className="ml-4 h-3 w-36 rounded-full bg-white/10" />
        </div>

        <Image
          src={src}
          alt={alt}
          width={1920}
          height={1080}
          sizes="(min-width: 1280px) 860px, (min-width: 1024px) 64vw, 100vw"
          className="aspect-[16/9] w-full object-cover object-top transition duration-500 group-hover:scale-[1.025]"
        />
      </div>
    </motion.div>
  )
}