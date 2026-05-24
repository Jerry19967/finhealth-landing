'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight, Shield, Zap, TrendingUp, Bot, Calculator, PieChart, Heart, ChevronRight, Star, ShieldCheck, Award, BarChart3, Compass, Target, Wallet, AlertTriangle, CheckCircle, X, Sparkles, Lock, Globe, Trash2, FileText, Menu } from 'lucide-react';

const C = {
  bg:     "#050816",
  card:   "#0B1020",
  border: "rgba(255,255,255,0.08)",
  blue:   "#00D4FF",
  purple: "#7B61FF",
  green:  "#00E676",
  red:    "#FF4D6D",
  amber:  "#FFB547",
  text:   "#F0F4FF",
  muted:  "#8B95B0",
  grad1:  "linear-gradient(135deg, #00D4FF 0%, #7B61FF 100%)",
  grad2:  "linear-gradient(135deg, #00E676 0%, #00D4FF 100%)",
};

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };
const scaleIn = { hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } } };

function CursorGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const h = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', h);
    return () => window.removeEventListener('mousemove', h);
  }, []);
  return (
    <div style={{ position: 'fixed', left: pos.x - 200, top: pos.y - 200, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 1, transition: 'left 0.15s ease, top 0.15s ease' }} />
  );
}

function Particles() {
  const pts = Array.from({ length: 60 }, (_, i) => ({
    id: i, x: (i * 17.3) % 100, y: (i * 23.7) % 100,
    size: (i % 4) * 0.6 + 0.6,
    dur: 12 + (i % 15),
    delay: (i * 0.4) % 10,
    color: i % 3 === 0 ? C.blue : i % 3 === 1 ? C.purple : C.green,
    opacity: 0.06 + (i % 6) * 0.03,
  }));
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      {pts.map(p => (
        <motion.div key={p.id}
          style={{ position: 'absolute', left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, borderRadius: '50%', background: p.color, opacity: p.opacity }}
          animate={{ y: [0, -30, 0], x: [0, 15, 0], opacity: [p.opacity, p.opacity * 2.5, p.opacity] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

function Background() {
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
      <motion.div animate={{ borderRadius: ['60% 40% 30% 70%/60% 30% 70% 40%', '30% 60% 70% 40%/50% 60% 30% 60%', '60% 40% 30% 70%/60% 30% 70% 40%'] }} transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', top: '-10%', left: '-10%', width: '55vw', height: '55vw', background: 'radial-gradient(ellipse, rgba(0,212,255,0.07) 0%, transparent 65%)' }} />
      <motion.div animate={{ borderRadius: ['40% 60% 60% 40%/40% 60% 40% 60%', '60% 40% 40% 60%/60% 40% 60% 40%', '40% 60% 60% 40%/40% 60% 40% 60%'] }} transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', top: '30%', right: '-10%', width: '50vw', height: '50vw', background: 'radial-gradient(ellipse, rgba(123,97,255,0.08) 0%, transparent 65%)' }} />
      <motion.div animate={{ borderRadius: ['50% 50% 30% 70%/60% 40% 60% 40%', '70% 30% 60% 40%/40% 60% 40% 60%', '50% 50% 30% 70%/60% 40% 60% 40%'] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', bottom: '-5%', left: '20%', width: '40vw', height: '40vw', background: 'radial-gradient(ellipse, rgba(0,230,118,0.05) 0%, transparent 65%)' }} />
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
    </div>
  );
}

function Section({ children, id, style }: { children: React.ReactNode; id?: string; style?: React.CSSProperties }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.section id={id} ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger}
      style={{ position: 'relative', zIndex: 2, padding: '100px 4vw', ...style }}>
      {children}
    </motion.section>
  );
}

function Badge({ children, color = C.blue }: { children: React.ReactNode; color?: string }) {
  return (
    <motion.div variants={fadeUp} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 999, background: `${color}12`, border: `1px solid ${color}30`, marginBottom: 20 }}>
      <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }} style={{ width: 6, height: 6, borderRadius: '50%', background: color, display: 'inline-block' }} />
      <span style={{ fontSize: 12, fontWeight: 600, color, letterSpacing: '0.05em' }}>{children}</span>
    </motion.div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  useEffect(() => {
    const u = scrollYProgress.on('change', v => setScrolled(v > 0.01));
    return u;
  }, [scrollYProgress]);
  return (
    <>
      <motion.div style={{ scaleX: scrollYProgress, position: 'fixed', top: 0, left: 0, right: 0, height: 2, background: C.grad1, transformOrigin: '0%', zIndex: 100 }} />
      <motion.nav initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{ position: 'fixed', top: 2, left: 0, right: 0, zIndex: 99, padding: '0 4vw', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: scrolled ? 'rgba(5,8,22,0.85)' : 'transparent', backdropFilter: scrolled ? 'blur(20px)' : 'none', borderBottom: scrolled ? `1px solid ${C.border}` : 'none', transition: 'all 0.3s ease' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}
            style={{ width: 36, height: 36, borderRadius: 10, background: C.grad1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Heart size={18} color="#fff" />
          </motion.div>
          <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.5px' }}>
            <span style={{ color: C.blue }}>FinHealth</span><span style={{ color: C.red }}>360</span>
          </span>
        </div>
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          {['Features', 'Tools', 'Pricing', 'Security'].map(l => (
            <motion.button key={l} whileHover={{ color: '#fff' }} onClick={() => document.getElementById(l.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
              style={{ background: 'none', border: 'none', color: C.muted, cursor: 'pointer', fontSize: 14, fontWeight: 500 }}>{l}</motion.button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <motion.button whileHover={{ borderColor: 'rgba(255,255,255,0.3)', color: '#fff' }}
            style={{ background: 'transparent', border: `1px solid ${C.border}`, color: C.muted, padding: '8px 18px', borderRadius: 8, cursor: 'pointer', fontSize: 14, fontWeight: 500 }}
            onClick={() => window.location.href = 'https://financialai-frontend-lime.vercel.app/login'}>Login</motion.button>
          <motion.button whileHover={{ opacity: 0.9, scale: 1.02 }} whileTap={{ scale: 0.98 }}
            style={{ background: C.grad1, border: 'none', color: '#fff', padding: '8px 20px', borderRadius: 8, cursor: 'pointer', fontSize: 14, fontWeight: 600 }}
            onClick={() => window.location.href = 'https://financialai-frontend-lime.vercel.app/quick-score'}>Get Started Free</motion.button>
        </div>
      </motion.nav>
    </>
  );
}

function HeroDashboard() {
  const alerts = [
    { icon: '🚨', text: 'No SIP detected — start investing', color: C.red },
    { icon: '💡', text: '₹18,000 tax deduction available', color: C.amber },
    { icon: '⚠️', text: 'EMI burden at 38% — review loans', color: C.amber },
    { icon: '✅', text: 'Emergency fund: 4.2 months covered', color: C.green },
  ];
  return (
    <motion.div initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
      style={{ flex: '1 1 420px', maxWidth: 480, position: 'relative' }}>
      <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{ background: 'rgba(11,16,32,0.9)', border: `1px solid rgba(0,212,255,0.2)`, borderRadius: 20, padding: 24, backdropFilter: 'blur(20px)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: C.grad1 }} />
        <motion.div animate={{ top: ['-5%', '105%'] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
          style={{ position: 'absolute', left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.5), transparent)', zIndex: 3 }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 12, color: C.muted, marginBottom: 2 }}>FinHealth Score</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>Live · Updated now</div>
          </div>
          <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity }}
            style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.3)', borderRadius: 20, padding: '4px 10px' }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: C.green }} />
            <span style={{ fontSize: 10, color: C.green, fontWeight: 600 }}>AI ACTIVE</span>
          </motion.div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20, position: 'relative' }}>
          <div style={{ position: 'relative', width: 120, height: 120 }}>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              style={{ position: 'absolute', inset: -16, borderRadius: '50%' }}>
              <div style={{ position: 'absolute', top: 0, left: '50%', width: 8, height: 8, borderRadius: '50%', background: C.blue, boxShadow: `0 0 10px ${C.blue}`, marginLeft: -4, marginTop: -4 }} />
            </motion.div>
            <motion.div animate={{ rotate: -360 }} transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              style={{ position: 'absolute', inset: -10, borderRadius: '50%' }}>
              <div style={{ position: 'absolute', bottom: 0, left: '50%', width: 6, height: 6, borderRadius: '50%', background: C.purple, boxShadow: `0 0 8px ${C.purple}`, marginLeft: -3, marginBottom: -3 }} />
            </motion.div>
            {[0, 1].map(i => (
              <motion.div key={i} animate={{ scale: [1, 1.6], opacity: [0.4, 0] }} transition={{ duration: 2.5, delay: i * 1.2, repeat: Infinity }}
                style={{ position: 'absolute', inset: -8, borderRadius: '50%', border: `1px solid ${C.blue}` }} />
            ))}
            <svg width="120" height="120" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
              <motion.circle cx="60" cy="60" r="50" fill="none" stroke="url(#heroGrad)" strokeWidth="8" strokeLinecap="round"
                initial={{ strokeDasharray: '0 314' }} animate={{ strokeDasharray: `${314 * 0.72} 314` }} transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }} />
              <defs>
                <linearGradient id="heroGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={C.blue} />
                  <stop offset="100%" stopColor={C.purple} />
                </linearGradient>
              </defs>
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} style={{ fontSize: 28, fontWeight: 800, color: '#fff' }}>72</motion.div>
              <div style={{ fontSize: 11, color: C.muted }}>/100</div>
            </div>
          </div>
        </div>
        <div style={{ marginBottom: 16 }}>
          {([['Cash Flow', 78, C.green], ['Investments', 65, C.blue], ['Insurance', 55, C.amber], ['Debt', 82, C.green]] as [string, number, string][]).map(([label, pct, color], i) => (
            <div key={label} style={{ marginBottom: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: C.muted, marginBottom: 4 }}>
                <span>{label}</span><span style={{ color }}>{pct}%</span>
              </div>
              <div style={{ height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.05)' }}>
                <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 1, delay: 0.8 + i * 0.1, ease: 'easeOut' }}
                  style={{ height: '100%', borderRadius: 2, background: color, boxShadow: `0 0 8px ${color}` }} />
              </div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 11, color: C.muted, marginBottom: 8, fontWeight: 600, letterSpacing: '0.05em' }}>AI ALERTS</div>
        {alerts.slice(0, 2).map((a, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2 + i * 0.2 }}
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', background: `${a.color}08`, border: `1px solid ${a.color}20`, borderRadius: 8, marginBottom: 6 }}>
            <span style={{ fontSize: 12 }}>{a.icon}</span>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>{a.text}</span>
          </motion.div>
        ))}
      </motion.div>
      <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, delay: 1, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', top: -20, left: -40, background: 'rgba(11,16,32,0.95)', border: `1px solid rgba(0,230,118,0.3)`, borderRadius: 12, padding: '10px 14px', backdropFilter: 'blur(12px)' }}>
        <div style={{ fontSize: 10, color: C.muted }}>Net Worth</div>
        <div style={{ fontSize: 16, fontWeight: 700, color: C.green }}>₹24.6L</div>
      </motion.div>
      <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5, delay: 0.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', bottom: 20, right: -30, background: 'rgba(11,16,32,0.95)', border: `1px solid rgba(123,97,255,0.3)`, borderRadius: 12, padding: '10px 14px', backdropFilter: 'blur(12px)' }}>
        <div style={{ fontSize: 10, color: C.muted }}>Monthly SIP</div>
        <div style={{ fontSize: 16, fontWeight: 700, color: C.purple }}>₹0 ⚠️</div>
      </motion.div>
      <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3.5, delay: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', top: '40%', right: -35, background: 'rgba(11,16,32,0.95)', border: `1px solid rgba(0,212,255,0.3)`, borderRadius: 12, padding: '10px 14px', backdropFilter: 'blur(12px)' }}>
        <div style={{ fontSize: 10, color: C.muted }}>Tax Saved</div>
        <div style={{ fontSize: 16, fontWeight: 700, color: C.blue }}>₹18K</div>
      </motion.div>
    </motion.div>
  );
}

function Hero() {
  return (
    <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', zIndex: 2, padding: '100px 4vw 60px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '4rem', flexWrap: 'wrap', width: '100%' }}>
        <div style={{ flex: '1 1 480px', maxWidth: 580 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 999, background: `${C.blue}12`, border: `1px solid ${C.blue}30`, marginBottom: 24 }}>
            <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }} style={{ width: 6, height: 6, borderRadius: '50%', background: C.blue, display: 'inline-block' }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: C.blue }}>India's AI Financial Operating System</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            style={{ fontSize: 'clamp(2.8rem, 5.5vw, 4.2rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.08, marginBottom: 24 }}>
            <span style={{ color: '#F0F4FF' }}>Your Entire<br />Financial Life.</span>
            <br />
            <span style={{ background: C.grad1, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Managed by AI.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            style={{ fontSize: 17, color: C.muted, lineHeight: 1.75, maxWidth: 500, marginBottom: 36 }}>
            Track wealth, optimize taxes, analyze investments, detect risks, plan retirement — all in one AI-powered platform built for India. Get your FinHealth Score in 60 seconds.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 32 }}>
            <motion.button whileHover={{ scale: 1.03, boxShadow: `0 0 30px rgba(0,212,255,0.3)` }} whileTap={{ scale: 0.97 }}
              style={{ background: C.grad1, border: 'none', color: '#fff', padding: '14px 28px', borderRadius: 12, cursor: 'pointer', fontSize: 15, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}
              onClick={() => window.location.href = 'https://financialai-frontend-lime.vercel.app/quick-score'}>
              Start Free <ArrowRight size={16} />
            </motion.button>
            <motion.button whileHover={{ borderColor: 'rgba(255,255,255,0.3)', color: '#fff' }} whileTap={{ scale: 0.97 }}
              style={{ background: 'transparent', border: `1px solid ${C.border}`, color: C.muted, padding: '14px 28px', borderRadius: 12, cursor: 'pointer', fontSize: 15, fontWeight: 600 }}
              onClick={() => window.location.href = 'https://financialai-frontend-lime.vercel.app/app/dashboard'}>
              Explore Dashboard
            </motion.button>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
            {([['✔ No bank login', C.green], ['✔ India-focused', C.blue], ['✔ Zero commissions', C.purple], ['✔ AI-powered', C.amber]] as [string, string][]).map(([t, c]) => (
              <span key={t} style={{ fontSize: 12, color: c, fontWeight: 600 }}>{t}</span>
            ))}
          </motion.div>
        </div>
        <HeroDashboard />
      </div>
    </section>
  );
}

function useCounter(target: number, active: boolean, duration = 1800) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const prog = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - prog, 3);
      setVal(Math.floor(eased * target));
      if (prog < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return val;
}

function StatItem({ n, suffix, label, color }: { n: number; suffix: string; label: string; color: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const val = useCounter(n, inView);
  return (
    <motion.div ref={ref} variants={scaleIn} style={{ textAlign: 'center', padding: '32px 24px', background: C.card, border: `1px solid ${C.border}`, borderTop: `2px solid ${color}`, borderRadius: 16 }}>
      <div style={{ fontSize: 42, fontWeight: 900, color, fontVariantNumeric: 'tabular-nums', marginBottom: 8, textShadow: `0 0 20px ${color}50` }}>{val}{suffix}</div>
      <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.5 }}>{label}</div>
    </motion.div>
  );
}

function Stats() {
  return (
    <Section style={{ padding: '60px 4vw' }}>
      <motion.div variants={stagger} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
        <StatItem n={400} suffix="M+" label="Indians without financial guidance" color={C.blue} />
        <StatItem n={5} suffix=".3%" label="Household savings — 50-year low" color={C.green} />
        <StatItem n={88} suffix="%" label="Expect greater financial uncertainty" color={C.purple} />
        <StatItem n={60} suffix="s" label="To your FinHealth Score" color={C.amber} />
      </motion.div>
    </Section>
  );
}

const features = [
  { icon: Heart,      color: C.blue,    title: 'Financial Health Score',  desc: 'AI scores every dimension — cashflow, investments, insurance, debt — and monitors changes automatically.', tag: 'Core' },
  { icon: TrendingUp, color: '#2D7BFF', title: 'Investment Intelligence',  desc: 'Detects underperforming SIPs, missing investments, portfolio gaps, and rebalancing opportunities.', tag: 'Investments' },
  { icon: Shield,     color: C.purple,  title: 'Insurance Analyzer',      desc: 'Uncovers hidden charges, calculates real IRR on policies, and flags plans draining your returns.', tag: 'Insurance' },
  { icon: Calculator, color: C.amber,   title: 'Tax Optimization',        desc: 'Compares old vs new regime, finds every deduction under 80C, 80D, HRA, NPS, and tells you what to claim.', tag: 'Tax' },
  { icon: BarChart3,  color: C.green,   title: 'Loan Intelligence',       desc: 'Flags dangerous EMI-to-income ratios, compares loan offers, and builds the optimal prepayment strategy.', tag: 'Loans' },
  { icon: Bot,        color: C.blue,    title: 'Autonomous AI Agent',     desc: 'Works 24/7. Monitors proactively, sends alerts before problems grow, and gives personalized recommendations.', tag: 'AI' },
  { icon: Compass,    color: C.purple,  title: 'Retirement Planning',     desc: 'Calculates your retirement corpus gap, monthly savings needed, and projects wealth over 10–30 years.', tag: 'Planning' },
  { icon: Target,     color: C.amber,   title: 'Goal Planning',           desc: 'Set financial goals, track progress with smart projections, and get notified when you\'re off track.', tag: 'Planning' },
  { icon: Wallet,     color: C.green,   title: 'Cashflow Tracking',       desc: 'Tracks income vs expenses, emergency fund coverage, and flags cashflow risks before they become problems.', tag: 'Core' },
];

function FeatureCard({ f, i }: { f: typeof features[0]; i: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div variants={fadeUp} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ background: hovered ? `${f.color}08` : C.card, border: `1px solid ${hovered ? f.color + '40' : C.border}`, borderRadius: 16, padding: 24, cursor: 'default', transition: 'all 0.3s ease', boxShadow: hovered ? `0 0 30px ${f.color}15` : 'none' }}>
      <motion.div animate={{ y: hovered ? -4 : 0 }} transition={{ duration: 0.3 }}
        style={{ width: 44, height: 44, borderRadius: 12, background: `${f.color}15`, border: `1px solid ${f.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
        <f.icon size={22} color={f.color} />
      </motion.div>
      <div style={{ fontSize: 10, color: f.color, fontWeight: 700, letterSpacing: '0.08em', marginBottom: 8 }}>{f.tag}</div>
      <div style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 8 }}>{f.title}</div>
      <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.65 }}>{f.desc}</div>
    </motion.div>
  );
}

function Features() {
  return (
    <Section id="features" style={{ padding: '100px 4vw' }}>
      <div style={{ textAlign: 'center', marginBottom: 64 }}>
        <Badge>Everything In One Place</Badge>
        <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.03em', color: C.text, marginBottom: 16 }}>
          Your AI Financial<br /><span style={{ background: C.grad1, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Command Center</span>
        </motion.h2>
        <motion.p variants={fadeUp} style={{ color: C.muted, maxWidth: 520, margin: '0 auto', fontSize: 16, lineHeight: 1.7 }}>
          Not a calculator. Not a dashboard. An autonomous AI agent that monitors, detects, and acts on your behalf.
        </motion.p>
      </div>
      <motion.div variants={stagger} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
        {features.map((f, i) => <FeatureCard key={f.title} f={f} i={i} />)}
      </motion.div>
    </Section>
  );
}

const tools = [
  { cat: 'Investments', color: '#2D7BFF', items: [
    { title: 'SIP Calculator', desc: 'Maturity value and wealth growth', href: '/app/investments' },
    { title: 'Portfolio Analyzer', desc: 'Performance, allocation and gaps', href: '/app/investments' },
    { title: 'Return Calculator', desc: 'CAGR and annualized returns', href: '/app/investments' },
    { title: 'Risk Analysis', desc: 'Portfolio risk and rebalancing signals', href: '/app/investments' },
  ]},
  { cat: 'Insurance', color: '#7B61FF', items: [
    { title: 'Policy Analyzer', desc: 'Real IRR and hidden charges', href: '/app/insurance' },
    { title: 'IRR Calculator', desc: 'True return on insurance policies', href: '/app/insurance' },
    { title: 'Coverage Checker', desc: 'Life and health adequacy check', href: '/app/insurance' },
  ]},
  { cat: 'Planning', color: '#00E676', items: [
    { title: 'Retirement Planner', desc: 'Corpus and monthly savings needed', href: '/app/planning' },
    { title: 'Goal Planning', desc: 'Goals with smart projections', href: '/app/planning' },
    { title: 'Wealth Projection', desc: 'Net worth over 10–30 years', href: '/app/planning' },
  ]},
  { cat: 'Loans', color: '#FFB547', items: [
    { title: 'EMI Calculator', desc: 'Home, car or personal loan EMI', href: '/app/loans' },
    { title: 'Loan Comparison', desc: 'Real cost of multiple offers', href: '/app/loans' },
    { title: 'Prepayment Strategy', desc: 'Optimal plan to save on interest', href: '/app/loans' },
  ]},
  { cat: 'Tax', color: '#00D4FF', items: [
    { title: 'Tax Calculator', desc: 'Old vs new regime comparison', href: '/app/tax' },
    { title: 'Deduction Optimizer', desc: '80C, 80D, HRA, NPS and more', href: '/app/tax' },
  ]},
  { cat: 'AI Tools', color: '#7B61FF', items: [
    { title: 'Financial Assistant', desc: 'AI chat that knows your numbers', href: '/app/ai' },
    { title: 'Report Explainer', desc: 'Plain-English document summaries', href: '/app/ai' },
  ]},
];

function ToolsHub() {
  return (
    <Section id="tools" style={{ padding: '100px 4vw' }}>
      <div style={{ textAlign: 'center', marginBottom: 64 }}>
        <Badge color={C.purple}>Financial Toolkit</Badge>
        <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.03em', color: C.text, marginBottom: 16 }}>
          20+ Tools. One Platform.
        </motion.h2>
        <motion.p variants={fadeUp} style={{ color: C.muted, maxWidth: 480, margin: '0 auto', fontSize: 16 }}>
          Every calculator, analyzer and AI tool — personalized to your income and goals.
        </motion.p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
        {tools.map((cat) => (
          <motion.div key={cat.cat} variants={fadeUp}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: cat.color }} />
              <span style={{ fontSize: 13, fontWeight: 700, color: cat.color, letterSpacing: '0.06em' }}>{cat.cat.toUpperCase()}</span>
              <div style={{ flex: 1, height: 1, background: C.border }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
              {cat.items.map((tool) => (
                <motion.a key={tool.title} href={`https://financialai-frontend-lime.vercel.app${tool.href}`}
                  whileHover={{ y: -4, borderColor: cat.color + '50', boxShadow: `0 8px 24px ${cat.color}12` }}
                  style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: '16px 18px', textDecoration: 'none', display: 'block', transition: 'border-color 0.2s' }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 4 }}>{tool.title}</div>
                  <div style={{ fontSize: 12, color: C.muted, marginBottom: 10 }}>{tool.desc}</div>
                  <div style={{ fontSize: 11, color: cat.color, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>Explore <ChevronRight size={10} /></div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div variants={fadeUp} style={{ textAlign: 'center', marginTop: 48 }}>
        <motion.a href="https://financialai-frontend-lime.vercel.app/app/tools" whileHover={{ scale: 1.03, boxShadow: `0 0 30px rgba(0,212,255,0.25)` }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: C.grad1, color: '#fff', padding: '14px 32px', borderRadius: 12, textDecoration: 'none', fontSize: 15, fontWeight: 700 }}>
          Explore All Tools <ArrowRight size={16} />
        </motion.a>
      </motion.div>
    </Section>
  );
}

function AIAgent() {
  const alerts = [
    { icon: '🚨', text: 'Emergency fund critical — only 1.2 months covered', color: C.red, delay: 0 },
    { icon: '🚨', text: 'No SIP detected — wealth creation at risk', color: C.red, delay: 0.5 },
    { icon: '💡', text: 'Tax deduction opportunity — ₹18,000 available under 80D', color: C.amber, delay: 1 },
    { icon: '⚠️', text: 'EMI burden at 38% of income — review home loan', color: C.amber, delay: 1.5 },
    { icon: '✅', text: 'Health insurance renewed — coverage adequate', color: C.green, delay: 2 },
  ];
  return (
    <Section style={{ padding: '100px 4vw' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4rem', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 400px' }}>
          <Badge color={C.purple}>AI Agent Mode</Badge>
          <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.03em', color: C.text, marginBottom: 20 }}>
            Your AI Agent<br /><span style={{ background: C.grad1, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Never Sleeps.</span>
          </motion.h2>
          <motion.p variants={fadeUp} style={{ color: C.muted, fontSize: 16, lineHeight: 1.75, marginBottom: 32, maxWidth: 460 }}>
            While you work, sleep, and live your life — your AI agent continuously monitors your finances, detects risks before they grow, and tells you exactly what to do next.
          </motion.p>
          {([['Continuous monitoring', 'Scans your finances 24/7, not just when you log in'], ['Proactive alerts', 'Notified before problems become expensive mistakes'], ['Personalized roadmap', 'Advice specific to YOUR numbers — not generic tips'], ['Autonomous operation', 'Works even when you\'re offline or not thinking about money']] as [string, string][]).map(([t, d]) => (
            <motion.div key={t} variants={fadeUp} style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
              <div style={{ width: 20, height: 20, borderRadius: '50%', background: `${C.blue}20`, border: `1px solid ${C.blue}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                <CheckCircle size={11} color={C.blue} />
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: C.text, marginBottom: 2 }}>{t}</div>
                <div style={{ fontSize: 13, color: C.muted }}>{d}</div>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div variants={scaleIn} style={{ flex: '1 1 380px', maxWidth: 440 }}>
          <div style={{ background: C.card, border: `1px solid rgba(123,97,255,0.3)`, borderRadius: 20, padding: 24, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: C.grad1 }} />
            <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 3, repeat: Infinity }}
              style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(123,97,255,0.08) 0%, transparent 60%)', pointerEvents: 'none' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }} transition={{ duration: 2, repeat: Infinity }}
                style={{ width: 10, height: 10, borderRadius: '50%', background: C.green, boxShadow: `0 0 12px ${C.green}` }} />
              <span style={{ fontSize: 13, fontWeight: 700, color: C.text }}>AI Agent — Live Monitoring</span>
            </div>
            <div style={{ fontSize: 11, color: C.muted, marginBottom: 12, fontWeight: 600, letterSpacing: '0.05em' }}>ACTIVE ALERTS</div>
            {alerts.map((a, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: a.delay, duration: 0.5 }} viewport={{ once: true }}
                style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 12px', background: `${a.color}08`, border: `1px solid ${a.color}20`, borderRadius: 10, marginBottom: 8 }}>
                <span style={{ fontSize: 14, flexShrink: 0 }}>{a.icon}</span>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', lineHeight: 1.5 }}>{a.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

function HowItWorks() {
  const steps = [
    { n: '01', title: 'Connect your financial life', desc: 'Enter your salary, expenses, loans, investments. No bank login. No documents required. Takes 2 minutes.' },
    { n: '02', title: 'AI analyzes everything', desc: 'Your agent scores every dimension — health, investments, insurance, tax, loans — instantly.' },
    { n: '03', title: 'Get your action plan', desc: 'Not generic advice. Specific actions for YOUR numbers. Ranked by impact. Updated automatically.' },
  ];
  return (
    <Section style={{ padding: '100px 4vw' }}>
      <div style={{ textAlign: 'center', marginBottom: 64 }}>
        <Badge color={C.green}>How It Works</Badge>
        <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.03em', color: C.text }}>
          Set it up once.<br /><span style={{ background: C.grad2, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>AI handles the rest.</span>
        </motion.h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
        {steps.map((s, i) => (
          <motion.div key={s.n} variants={fadeUp}
            style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: 28, position: 'relative', overflow: 'hidden' }}>
            <motion.div animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }}
              style={{ position: 'absolute', top: 0, right: 0, width: 120, height: 120, background: `radial-gradient(ellipse, ${C.blue}10 0%, transparent 70%)` }} />
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: `${C.blue}15`, border: `1px solid ${C.blue}35`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, fontSize: 14, fontWeight: 800, color: C.blue }}>{s.n}</div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 10 }}>{s.title}</h3>
            <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.65 }}>{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function Comparison() {
  const rows = ['AI-powered analysis', 'Personalized to your numbers', 'Autonomous monitoring', 'Investment intelligence', 'Tax optimization', 'Insurance analysis', 'Retirement planning', 'Works without bank login'];
  const cols = ['FinHealth360', 'Groww', 'INDmoney', 'Excel', 'Generic AI', 'CA'];
  const data: Record<string, boolean[]> = {
    'FinHealth360': [true, true, true, true, true, true, true, true],
    'Groww':        [false, false, false, true, false, false, false, true],
    'INDmoney':     [false, false, false, true, false, false, true, false],
    'Excel':        [false, false, false, false, false, false, false, true],
    'Generic AI':   [true, false, false, false, false, false, false, true],
    'CA':           [false, true, false, true, true, true, true, false],
  };
  return (
    <Section style={{ padding: '100px 4vw' }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <Badge color={C.amber}>Market Reality</Badge>
        <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.03em', color: C.text }}>
          Why nothing else comes close
        </motion.h2>
      </div>
      <motion.div variants={fadeUp} style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '12px 16px', color: C.muted, fontWeight: 600, borderBottom: `1px solid ${C.border}` }}>Feature</th>
              {cols.map(col => (
                <th key={col} style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 700, borderBottom: `1px solid ${C.border}`, color: col === 'FinHealth360' ? C.blue : C.muted, background: col === 'FinHealth360' ? `${C.blue}08` : 'transparent', borderTop: col === 'FinHealth360' ? `2px solid ${C.blue}` : 'none', whiteSpace: 'nowrap' }}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <motion.tr key={row} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: ri * 0.06 }} viewport={{ once: true }}
                style={{ borderBottom: `1px solid ${C.border}` }}>
                <td style={{ padding: '12px 16px', color: C.muted }}>{row}</td>
                {cols.map(col => (
                  <td key={col} style={{ padding: '12px 16px', textAlign: 'center', background: col === 'FinHealth360' ? `${C.blue}05` : 'transparent' }}>
                    {data[col][ri]
                      ? <span style={{ color: col === 'FinHealth360' ? C.green : 'rgba(255,255,255,0.3)', fontSize: 16 }}>✓</span>
                      : <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: 16 }}>✗</span>}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </Section>
  );
}

function Testimonials() {
  const reviews = [
    { name: 'Rohan M.', role: 'Software Engineer, Pune', avatar: 'RM', color: C.blue, text: 'I always knew I should track my finances but never did. FinHealth360 gave me a score in 60 seconds and told me exactly what was wrong — my EMI ratio was 48%, way too high. Fixed it in 3 months.', stars: 5 },
    { name: 'Priya S.', role: 'Product Manager, Bangalore', avatar: 'PS', color: C.green, text: 'Finally something built for Indian salaries. It understands SIPs, NPS, HRA — not just US 401k stuff. The tax comparison alone saved me ₹18,000 this year.', stars: 5 },
    { name: 'Amit K.', role: 'CA, Mumbai', avatar: 'AK', color: C.purple, text: "I recommend this to clients who can't afford a full advisory session. It does the basic financial health check properly — scoring, red flags, and action steps. Solid product.", stars: 5 },
  ];
  return (
    <Section style={{ padding: '100px 4vw' }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <Badge>What Users Say</Badge>
        <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.03em', color: C.text }}>Real feedback. Real users.</motion.h2>
      </div>
      <motion.div variants={stagger} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
        {reviews.map((r) => (
          <motion.div key={r.name} variants={fadeUp} whileHover={{ y: -6, boxShadow: `0 20px 40px rgba(0,0,0,0.3)` }}
            style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: 24 }}>
            <div style={{ display: 'flex', gap: 3, marginBottom: 16 }}>
              {Array.from({ length: r.stars }).map((_, i) => <Star key={i} size={13} fill={C.amber} color={C.amber} />)}
            </div>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.75, marginBottom: 20 }}>"{r.text}"</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, borderTop: `1px solid ${C.border}`, paddingTop: 16 }}>
              <div style={{ width: 38, height: 38, borderRadius: '50%', background: `${r.color}18`, border: `1px solid ${r.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: r.color }}>{r.avatar}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{r.name}</div>
                <div style={{ fontSize: 11, color: C.muted }}>{r.role}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

function Security() {
  const items = [
    { icon: Lock,       color: C.blue,   title: 'No bank login required',        desc: 'We never ask for credentials, UPI PIN, or net banking access. Ever.' },
    { icon: X,          color: C.red,    title: 'Your data is never sold',        desc: 'No advertisers. We earn from subscriptions only.' },
    { icon: Trash2,     color: C.amber,  title: 'Delete anytime',                desc: 'Permanently erased within 24 hours. No questions asked.' },
    { icon: FileText,   color: C.purple, title: 'Documents discarded after use',  desc: 'Analyzed and immediately discarded. Nothing stored.' },
    { icon: ShieldCheck,color: C.green,  title: 'End-to-end encrypted',          desc: 'TLS 1.3 in transit, encrypted at rest. Private to you alone.' },
    { icon: Globe,      color: C.blue,   title: 'Built for India, stored in India', desc: 'Supabase Mumbai. DPDPA 2023 compliant.' },
  ];
  return (
    <Section id="security" style={{ padding: '100px 4vw' }}>
      <div style={{ background: `${C.blue}05`, border: `1px solid ${C.blue}15`, borderRadius: 24, padding: '60px 48px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <Badge color={C.green}>Security & Privacy</Badge>
          <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.03em', color: C.text, marginBottom: 16 }}>Your Financial Data Stays Yours</motion.h2>
          <motion.p variants={fadeUp} style={{ color: C.muted, maxWidth: 440, margin: '0 auto' }}>We built FinHealth360 with one rule: your data belongs to you, not us.</motion.p>
        </div>
        <motion.div variants={stagger} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
          {items.map((item) => (
            <motion.div key={item.title} variants={fadeUp} whileHover={{ borderColor: `${item.color}40`, background: `${item.color}06` }}
              style={{ display: 'flex', gap: 14, padding: 20, background: 'rgba(255,255,255,0.02)', border: `1px solid ${C.border}`, borderRadius: 14, transition: 'all 0.3s' }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: `${item.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <item.icon size={16} color={item.color} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 4 }}>{item.title}</div>
                <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}

function Pricing() {
  const plans = [
    { name: 'Free', price: '₹0', sub: 'Forever free', color: C.muted, features: ['Financial Health Score', 'Basic tools (SIP, EMI)', 'AI chat (10/day)', 'Basic insights'], cta: 'Get Started Free', popular: false },
    { name: 'Pro', price: '₹99', sub: '/month · cancel anytime', color: C.blue, features: ['Everything in Free', '5 AI reports/month', 'Portfolio & tax intelligence', 'Goal-based planning', 'AI chat (20/day)'], cta: 'Upgrade to Pro', popular: true },
    { name: 'Elite', price: '₹499', sub: '/month · cancel anytime', color: C.green, features: ['Everything in Pro', 'Unlimited AI reports', 'Weekly personalized insights', 'Full tax optimization', 'PDF downloads', 'Advisor support'], cta: 'Get Elite', popular: false },
    { name: 'Elite+ Agent', price: '₹999', sub: '/month · fully autonomous', color: C.purple, features: ['Everything in Elite', 'Daily automatic analysis', 'Proactive alerts', 'Works when offline', 'Weekly AI roadmap', 'Continuous risk monitoring', 'Full AI memory'], cta: 'Get Elite+', popular: false },
  ];
  return (
    <Section id="pricing" style={{ padding: '100px 4vw' }}>
      <div style={{ textAlign: 'center', marginBottom: 64 }}>
        <Badge color={C.green}>Pricing</Badge>
        <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.03em', color: C.text, marginBottom: 16 }}>Start free. Scale when ready.</motion.h2>
        <motion.p variants={fadeUp} style={{ color: C.muted, fontSize: 16 }}>No lock-in. 7-day refund on all paid plans.</motion.p>
      </div>
      <motion.div variants={stagger} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 20, alignItems: 'start' }}>
        {plans.map((plan) => (
          <motion.div key={plan.name} variants={scaleIn} whileHover={{ y: -8 }}
            style={{ background: plan.popular ? `${C.blue}08` : C.card, border: `1px solid ${plan.popular ? C.blue + '50' : C.border}`, borderRadius: 20, padding: 28, position: 'relative', overflow: 'hidden', boxShadow: plan.popular ? `0 0 40px ${C.blue}15` : 'none' }}>
            {plan.popular && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: C.grad1 }} />}
            {plan.popular && (
              <div style={{ position: 'absolute', top: 16, right: 16, background: C.grad1, color: '#fff', fontSize: 10, fontWeight: 700, padding: '4px 10px', borderRadius: 999 }}>Most Popular</div>
            )}
            <div style={{ fontSize: 11, fontWeight: 700, color: plan.color, letterSpacing: '0.08em', marginBottom: 12 }}>{plan.name.toUpperCase()}</div>
            <div style={{ fontSize: 36, fontWeight: 900, color: C.text, marginBottom: 4 }}>{plan.price}</div>
            <div style={{ fontSize: 12, color: C.muted, marginBottom: 24 }}>{plan.sub}</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {plan.features.map(f => (
                <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>
                  <CheckCircle size={13} color={plan.color} style={{ flexShrink: 0, marginTop: 2 }} />{f}
                </li>
              ))}
            </ul>
            <motion.button whileHover={{ opacity: 0.9, scale: 1.02 }} whileTap={{ scale: 0.97 }}
              onClick={() => window.location.href = 'https://financialai-frontend-lime.vercel.app/quick-score'}
              style={{ width: '100%', padding: '12px 0', borderRadius: 10, border: plan.popular ? 'none' : `1px solid ${plan.color}40`, background: plan.popular ? C.grad1 : 'transparent', color: plan.popular ? '#fff' : plan.color, cursor: 'pointer', fontSize: 14, fontWeight: 700 }}>
              {plan.cta}
            </motion.button>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

function FinalCTA() {
  return (
    <Section style={{ padding: '120px 4vw', textAlign: 'center', position: 'relative' }}>
      <motion.div animate={{ opacity: [0.4, 0.7, 0.4] }} transition={{ duration: 4, repeat: Infinity }}
        style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(0,212,255,0.08) 0%, transparent 60%)', pointerEvents: 'none' }} />
      <Badge>Get Started Today</Badge>
      <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontWeight: 900, letterSpacing: '-0.04em', color: C.text, marginBottom: 20, lineHeight: 1.1 }}>
        Stop guessing<br />about your money.
      </motion.h2>
      <motion.p variants={fadeUp} style={{ color: C.muted, fontSize: 17, maxWidth: 500, margin: '0 auto 40px', lineHeight: 1.7 }}>
        Your AI financial operating system is ready. Get your FinHealth Score in 60 seconds — free, no bank login required.
      </motion.p>
      <motion.div variants={fadeUp} style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
        <motion.button whileHover={{ scale: 1.04, boxShadow: `0 0 40px rgba(0,212,255,0.4)` }} whileTap={{ scale: 0.97 }}
          onClick={() => window.location.href = 'https://financialai-frontend-lime.vercel.app/quick-score'}
          style={{ background: C.grad1, border: 'none', color: '#fff', padding: '16px 36px', borderRadius: 14, cursor: 'pointer', fontSize: 16, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
          Start Free <ArrowRight size={18} />
        </motion.button>
        <motion.button whileHover={{ borderColor: 'rgba(255,255,255,0.3)', color: '#fff' }}
          onClick={() => window.location.href = 'https://financialai-frontend-lime.vercel.app/app/dashboard'}
          style={{ background: 'transparent', border: `1px solid ${C.border}`, color: C.muted, padding: '16px 36px', borderRadius: 14, cursor: 'pointer', fontSize: 16, fontWeight: 600 }}>
          View Dashboard
        </motion.button>
      </motion.div>
      <motion.div variants={fadeUp} style={{ display: 'flex', justifyContent: 'center', gap: 32, marginTop: 32, flexWrap: 'wrap' }}>
        {([[ShieldCheck, C.green, '100% Private'], [Award, C.blue, 'No hidden fees'], [Shield, C.purple, 'No bank access']] as [React.ElementType, string, string][]).map(([Icon, color, text], i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: C.muted }}>
            <Icon size={14} color={color} />{text}
          </div>
        ))}
      </motion.div>
    </Section>
  );
}

function Footer() {
  const base = 'https://financialai-frontend-lime.vercel.app';
  return (
    <footer style={{ borderTop: `1px solid ${C.border}`, padding: '60px 4vw 40px', position: 'relative', zIndex: 2 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 40, marginBottom: 48 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: C.grad1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Heart size={14} color="#fff" /></div>
            <span style={{ fontWeight: 800, fontSize: 16 }}><span style={{ color: C.blue }}>FinHealth</span><span style={{ color: C.red }}>360</span></span>
          </div>
          <p style={{ fontSize: 12, color: C.muted, lineHeight: 1.7, maxWidth: 200 }}>India's AI Financial Operating System. Built for the salaried middle class.</p>
          <div style={{ marginTop: 12, fontSize: 11, color: C.blue, fontWeight: 600 }}>🇮🇳 Built for India</div>
        </div>
        {[
          { title: 'Platform', links: [['Dashboard', `${base}/app/dashboard`], ['Financial Health', `${base}/app/financial-health`], ['Investments', `${base}/app/investments`], ['Insurance', `${base}/app/insurance`], ['Planning', `${base}/app/planning`], ['Loans', `${base}/app/loans`], ['Tax', `${base}/app/tax`], ['AI Agent', `${base}/app/ai`], ['Tools Hub', `${base}/app/tools`]] },
          { title: 'Legal', links: [['Privacy Policy', '/privacy-policy'], ['Terms of Use', '/terms']] },
        ].map(sec => (
          <div key={sec.title}>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.text, marginBottom: 16, letterSpacing: '0.06em' }}>{sec.title}</div>
            {sec.links.map(([label, href]) => (
              <a key={label} href={href} style={{ display: 'block', fontSize: 13, color: C.muted, marginBottom: 8, textDecoration: 'none' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')} onMouseLeave={e => (e.currentTarget.style.color = C.muted)}>{label}</a>
            ))}
          </div>
        ))}
      </div>
      <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 24, textAlign: 'center', fontSize: 12, color: C.muted }}>
        © 2026 FinHealth360. For informational purposes only. Not financial advice.
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: 'Inter, system-ui, sans-serif', overflowX: 'hidden', minHeight: '100vh' }}>
      <CursorGlow />
      <Background />
      <Particles />
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <ToolsHub />
      <AIAgent />
      <HowItWorks />
      <Comparison />
      <Testimonials />
      <Security />
      <Pricing />
      <FinalCTA />
      <Footer />
    </div>
  );
}
