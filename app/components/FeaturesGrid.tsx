'use client';
import { motion } from 'framer-motion';
import {
  Heart, TrendingUp, Shield, FileText,
  BarChart3, Calculator, Bot, Zap, ChevronRight,
} from 'lucide-react';

// ── Design tokens — exact match to page.tsx ───────────────────────────────────
const T = {
  cyan:          '#2FE6FF',
  purple:        '#7A3CFF',
  green:         '#31E981',
  amber:         '#EF9F27',
  blue:          '#2D7BFF',
  pageBg:        '#070A12',
  cardBg:        '#0D1526',
  textPrimary:   '#F2F5FF',
  textSecondary: '#8A96B0',
  textMuted:     'rgba(255,255,255,0.28)',
  gradPrimary:   'linear-gradient(135deg, #2FE6FF 0%, #7A3CFF 100%)',
  fontDisplay:   'Bricolage Grotesque, sans-serif',
};

const fadeUp  = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } } };
const stagger = { visible: { transition: { staggerChildren: 0.07 } } };
const SIGNUP  = 'https://financialai-frontend-lime.vercel.app/signup';

// ── All modules — single source of truth ─────────────────────────────────────
const MODULES = [
  {
    icon: Heart, color: T.cyan, label: 'Financial Health', slug: 'financial-health',
    tagline: 'Your 0–100 score across every financial dimension',
    stat: { value: '72', label: 'avg score' },
    tools: [
      { name: 'Financial Health Score',   desc: 'Instant 0–100 score across savings, investments, debt, insurance & goals' },
      { name: 'Cash Flow Analysis',       desc: 'Track income, expenses and monthly surplus in real time' },
      { name: 'Net Worth Tracker',        desc: 'Total assets minus liabilities — updated automatically' },
      { name: 'Risk Flags',               desc: 'AI surfaces the exact gaps dragging your score down' },
      { name: 'Action Plan',              desc: 'Step-by-step priorities ranked by financial impact' },
    ],
  },
  {
    icon: TrendingUp, color: T.blue, label: 'Investments', slug: 'investments',
    tagline: 'Detect SIP gaps, analyse portfolio, plan long-term growth',
    stat: { value: '4', label: 'tools' },
    tools: [
      { name: 'SIP Calculator',           desc: 'Calculate SIP maturity value and projected wealth growth' },
      { name: 'Portfolio Analyzer',       desc: 'Performance, allocation breakdown and rebalancing signals' },
      { name: 'Return Calculator (CAGR)', desc: 'Annualised returns on any investment over any period' },
      { name: 'Risk Analysis',            desc: 'Portfolio risk score with actionable rebalancing recommendations' },
    ],
  },
  {
    icon: Shield, color: T.purple, label: 'Insurance', slug: 'insurance',
    tagline: 'Upload any policy — get real IRR and hidden charges exposed',
    stat: { value: '₹18K', label: 'avg savings found' },
    tools: [
      { name: 'Policy Analyzer',          desc: 'Upload any policy document — get real IRR and all hidden charges' },
      { name: 'IRR Calculator',           desc: 'True Internal Rate of Return on your insurance policy' },
      { name: 'Coverage Checker',         desc: 'Is your life and health cover actually adequate for your family?' },
    ],
  },
  {
    icon: FileText, color: T.green, label: 'Financial Planning', slug: 'planning',
    tagline: 'Retirement, goals and wealth projection in one place',
    stat: { value: '30yr', label: 'projection horizon' },
    tools: [
      { name: 'Retirement Planner',       desc: 'Corpus required and monthly savings needed to retire comfortably' },
      { name: 'Goal Planning',            desc: 'Set goals — house, education, travel — and track progress' },
      { name: 'Wealth Projection',        desc: 'Project your net worth growth over the next 10–30 years' },
      { name: 'Emergency Fund Planner',   desc: 'Build a 6-month safety net with a clear step-by-step plan' },
    ],
  },
  {
    icon: BarChart3, color: T.amber, label: 'Loans', slug: 'loans',
    tagline: 'Manage EMIs, compare loans, prepay smarter',
    stat: { value: '3', label: 'loan tools' },
    tools: [
      { name: 'EMI Calculator',           desc: 'Monthly EMI for home, car or personal loans with amortisation table' },
      { name: 'Loan Comparison',          desc: 'Compare multiple loan offers side by side on real total cost' },
      { name: 'Prepayment Strategy',      desc: 'Optimal prepayment plan to save maximum interest over the tenure' },
    ],
  },
  {
    icon: Calculator, color: T.cyan, label: 'Tax Optimisation', slug: 'tax',
    tagline: 'Old vs new regime compared — every deduction found for you',
    stat: { value: '₹46K', label: 'avg tax saved' },
    tools: [
      { name: 'Tax Calculator',           desc: 'Compare old vs new income tax regime for your exact income' },
      { name: 'Deduction Optimizer',      desc: 'Every deduction you qualify for — 80C, 80D, HRA, NPS and more' },
      { name: 'Regime Recommender',       desc: 'AI tells you exactly which regime saves you more money this year' },
    ],
  },
  {
    icon: Bot, color: T.purple, label: 'AI Agent', slug: 'ai',
    tagline: 'Ask anything — it already knows your numbers',
    stat: { value: '24/7', label: 'monitoring' },
    tools: [
      { name: 'Financial Assistant',      desc: 'Chat with AI for instant answers using your actual financial data' },
      { name: 'Document Explainer',       desc: 'Upload any financial document — get a plain-English summary' },
      { name: 'Proactive Alerts',         desc: 'Agent monitors SIPs, goals and debts and notifies you automatically' },
      { name: 'Autonomous Agent Mode',    desc: '24/7 continuous monitoring — surfaces insights before you ask' },
    ],
  },
  {
    icon: Zap, color: T.green, label: 'Tools Hub', slug: 'tools',
    tagline: '20+ tools in one place — all personalised to your profile',
    stat: { value: '20+', label: 'tools' },
    tools: [
      { name: 'Personalised Action Items',  desc: 'Your top priorities based on your actual numbers — updated daily' },
      { name: 'SIP Calculator',             desc: 'Calculate SIP maturity value and wealth growth' },
      { name: 'Portfolio Analyzer',         desc: 'Analyze portfolio performance and allocation' },
      { name: 'Return Calculator',          desc: 'Calculate CAGR and annualized returns on investments' },
      { name: 'Risk Analysis',              desc: 'Assess portfolio risk and get rebalancing signals' },
      { name: 'Policy Analyzer',            desc: 'Upload any policy and get real IRR and hidden charges' },
      { name: 'IRR Calculator',             desc: 'Calculate the true Internal Rate of Return on your policy' },
      { name: 'Coverage Checker',           desc: 'Check if your life and health coverage is adequate' },
      { name: 'Retirement Planner',         desc: 'Plan your retirement corpus and monthly savings needed' },
      { name: 'Goal Planning',              desc: 'Set financial goals and track progress with projections' },
      { name: 'Wealth Projection',          desc: 'Project your net worth growth over the next 10–30 years' },
      { name: 'EMI Calculator',             desc: 'Calculate your monthly EMI for home, car, or personal loans' },
      { name: 'Loan Comparison',            desc: 'Compare multiple loan offers side by side on real cost' },
      { name: 'Prepayment Strategy',        desc: 'Find the optimal prepayment plan to save on interest' },
      { name: 'Tax Calculator',             desc: 'Compare old vs new income tax regime for your income' },
      { name: 'Deduction Optimizer',        desc: 'Find all deductions under 80C, 80D, HRA, and more' },
      { name: 'Financial Assistant',        desc: 'Chat with AI for instant answers to financial questions' },
      { name: 'Report Explainer',           desc: 'Upload any financial document and get a plain-English summary' },
    ],
  },
] as const;

// ── Card component ─────────────────────────────────────────────────────────────
function ModuleCard({ mod }: { mod: typeof MODULES[number] }) {
  const Icon = mod.icon;
  const isHub = mod.slug === 'tools';

  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -5 }}
      style={{
        background: T.cardBg,
        border: `1px solid ${mod.color}35`,
        borderRadius: 20,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        gridColumn: isHub ? '1 / -1' : undefined,
        transition: 'border-color 0.25s, box-shadow 0.25s',
      }}
    >
      {/* Colored top bar */}
      <div style={{ height: 3, flexShrink: 0, background: `linear-gradient(90deg, ${mod.color} 0%, ${mod.color}30 70%, transparent 100%)` }} />

      {/* Header — colored wash */}
      <div style={{
        padding: '20px 22px 18px',
        background: `linear-gradient(160deg, ${mod.color}18 0%, ${mod.color}06 50%, transparent 100%)`,
        borderBottom: `1px solid ${mod.color}20`,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 12,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Icon box */}
          <div style={{
            width: 44, height: 44, borderRadius: 13, flexShrink: 0,
            background: `${mod.color}20`,
            border: `1px solid ${mod.color}50`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon size={20} color={mod.color} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 4 }}>
              <h2 style={{
                margin: 0, fontSize: 15, fontWeight: 800,
                color: T.textPrimary, fontFamily: T.fontDisplay,
                letterSpacing: '-0.02em',
              }}>
                {mod.label}
              </h2>
              {/* Live badge */}
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2.2, repeat: Infinity }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 4,
                  fontSize: 9, fontWeight: 700, color: T.green,
                  background: 'rgba(49,233,129,0.12)',
                  border: '1px solid rgba(49,233,129,0.35)',
                  borderRadius: 999, padding: '2px 7px',
                }}
              >
                <span style={{ width: 4, height: 4, borderRadius: '50%', background: T.green, display: 'inline-block' }} />
                LIVE
              </motion.span>
            </div>
            <p style={{ margin: 0, fontSize: 12, color: T.textSecondary, lineHeight: 1.4 }}>
              {mod.tagline}
            </p>
          </div>
        </div>

        {/* Stat */}
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{
            fontFamily: T.fontDisplay, fontSize: 22, fontWeight: 900, lineHeight: 1,
            color: mod.color,
            textShadow: `0 0 18px ${mod.color}70`,
            letterSpacing: '-0.03em',
          }}>
            {mod.stat.value}
          </div>
          <div style={{ fontSize: 10, color: T.textMuted, marginTop: 2, whiteSpace: 'nowrap' }}>
            {mod.stat.label}
          </div>
        </div>
      </div>

      {/* Tool list */}
      <div style={{ padding: '14px 22px 0', flex: 1 }}>
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
          textTransform: 'uppercase', color: mod.color,
          marginBottom: 8,
        }}>
          What's included
        </div>
        <ul
          style={{
            margin: 0, padding: 0, listStyle: 'none',
            display: isHub ? 'grid' : 'flex',
            gridTemplateColumns: isHub ? 'repeat(auto-fill, minmax(260px, 1fr))' : undefined,
            flexDirection: isHub ? undefined : 'column',
            columnGap: 28,
          }}
          aria-label={`${mod.label} features`}
        >
          {mod.tools.map((tool, i) => {
            const isLast = i === mod.tools.length - 1;
            return (
              <li key={tool.name} style={{ listStyle: 'none' }}>
                <a
                  href={SIGNUP}
                  style={{
                    display: 'flex', alignItems: 'flex-start', gap: 10,
                    padding: '9px 0',
                    borderBottom: isLast ? 'none' : `1px solid rgba(255,255,255,0.06)`,
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  <span style={{
                    width: 5, height: 5, borderRadius: '50%',
                    background: mod.color, flexShrink: 0, marginTop: 6,
                    boxShadow: `0 0 5px ${mod.color}`,
                  }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span style={{
                      display: 'block', fontSize: 13, fontWeight: 700,
                      color: T.textPrimary, marginBottom: 1,
                      lineHeight: 1.3,
                    }}>
                      {tool.name}
                    </span>
                    <span style={{
                      display: 'block', fontSize: 11.5,
                      color: T.textSecondary, lineHeight: 1.45,
                    }}>
                      {tool.desc}
                    </span>
                  </div>
                  <ChevronRight size={11} color={mod.color} style={{ flexShrink: 0, marginTop: 5, opacity: 0.5 }} />
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      {/* CTA */}
      <div style={{ padding: '12px 22px 18px' }}>
        <a
          href={SIGNUP}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 5,
            fontSize: 12.5, fontWeight: 700, color: mod.color,
            textDecoration: 'none',
            paddingTop: 12,
            borderTop: `1px solid ${mod.color}25`,
          }}
        >
          Get Access <ChevronRight size={13} />
        </a>
      </div>
    </motion.article>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function FeaturesGrid() {
  return (
    <section
      id="features"
      aria-label="FinHealth360 platform features"
      style={{ padding: '88px 4vw', position: 'relative', zIndex: 2 }}
    >
      {/* Section heading */}
      <motion.div
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
        variants={fadeUp}
        style={{ textAlign: 'center', marginBottom: 64 }}
      >
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 7,
          padding: '5px 14px', borderRadius: 999,
          background: 'rgba(47,230,255,0.10)', border: '1px solid rgba(47,230,255,0.35)',
          marginBottom: 18,
        }}>
          <Zap size={11} color={T.cyan} />
          <span style={{ fontSize: 11, fontWeight: 700, color: T.cyan, letterSpacing: '0.06em' }}>
            EVERYTHING IN ONE PLATFORM
          </span>
        </div>

        <h2 style={{
          fontFamily: T.fontDisplay, fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 900, letterSpacing: '-0.04em', color: T.textPrimary,
          margin: '0 0 14px', lineHeight: 1.08,
        }}>
          One platform.{' '}
          <span style={{ background: T.gradPrimary, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Every financial need covered.
          </span>
        </h2>

        <p style={{ color: T.textSecondary, fontSize: 15.5, lineHeight: 1.65, maxWidth: 640, margin: '0 auto 22px' }}>
          Financial Health Score, SIP Calculator, Tax Optimizer, Insurance Analyzer,
          Retirement Planner, EMI Calculator, Loan Comparison and an AI Agent —
          all connected, all personalised. Built for India.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 10 }}>
          {[
            { label: '8 Modules',     color: T.cyan   },
            { label: '20+ Tools',     color: T.green  },
            { label: 'AI Agent 24/7', color: T.purple },
            { label: 'Free to Start', color: T.amber  },
          ].map(({ label, color }) => (
            <span key={label} style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              fontSize: 12, fontWeight: 600, color: T.textSecondary,
              background: `${color}12`, border: `1px solid ${color}40`,
              borderRadius: 999, padding: '5px 14px',
            }}>
              <span style={{ color, fontSize: 11 }}>✓</span>
              {label}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Module grid */}
      <motion.div
        initial="hidden" whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        variants={stagger}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: 20,
          maxWidth: 1140, margin: '0 auto',
        }}
      >
        {MODULES.map(mod => (
          <ModuleCard key={mod.slug} mod={mod} />
        ))}
      </motion.div>

      {/* Dashboard CTA banner */}
      <motion.div
        initial="hidden" whileInView="visible" viewport={{ once: true }}
        variants={fadeUp}
        style={{ maxWidth: 1140, margin: '24px auto 0' }}
      >
        <a href={SIGNUP} style={{ textDecoration: 'none', display: 'block' }}>
          <motion.div
            whileHover={{ y: -3, boxShadow: '0 20px 60px rgba(47,230,255,0.12)' }}
            style={{
              background: 'linear-gradient(135deg, rgba(47,230,255,0.10) 0%, rgba(122,60,255,0.12) 100%)',
              border: '1px solid rgba(47,230,255,0.35)',
              borderRadius: 20, padding: '24px 32px',
              display: 'flex', alignItems: 'center',
              justifyContent: 'space-between', flexWrap: 'wrap', gap: 16,
              position: 'relative', overflow: 'hidden',
            }}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: T.gradPrimary }} />
            <div>
              <div style={{ fontSize: 17, fontWeight: 800, color: T.textPrimary, fontFamily: T.fontDisplay, marginBottom: 5 }}>
                See your full financial picture — free
              </div>
              <div style={{ fontSize: 13, color: T.textSecondary }}>
                Net worth · AI agent alerts · All 8 modules · Weekly intelligence report
              </div>
            </div>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              background: T.gradPrimary, color: '#fff',
              fontWeight: 700, fontSize: 13.5,
              padding: '11px 24px', borderRadius: 12,
              whiteSpace: 'nowrap',
            }}>
              Get Started Free <ChevronRight size={15} />
            </span>
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
}
