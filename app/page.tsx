'use client';
import { useState, useEffect, useRef } from 'react';
import { AlertTriangle, ArrowRight, BarChart3, Bot, Calculator, CheckCircle, ChevronRight, Compass, Heart, Search, Shield, ShieldCheck, Sparkles, Star, Award, TrendingUp, Zap, Lock, Globe, Trash2, FileText, X } from 'lucide-react';
import { motion, useScroll, useInView, AnimatePresence } from 'framer-motion';
import FeaturesGrid from './components/FeaturesGrid';

const T = {
  cyan:          '#2FE6FF',
  purple:        '#7A3CFF',
  green:         '#31E981',
  amber:         '#EF9F27',
  red:           '#FF5050',
  pageBg:        '#070A12',
  cardBg:        '#0D1526',
  textPrimary:   '#F2F5FF',
  textSecondary: '#9AA6BF',
  textMuted:     'rgba(255,255,255,0.3)',
  border:        'rgba(255,255,255,0.06)',
  borderMid:     'rgba(255,255,255,0.08)',
  gradPrimary:   'linear-gradient(135deg, #2FE6FF 0%, #7A3CFF 100%)',
  gradGreen:     'linear-gradient(135deg, #31E981 0%, #2FE6FF 100%)',
  fontDisplay:   'Bricolage Grotesque, sans-serif',
};

const fadeUp = { hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0, transition: { duration: 0.65 } } };
const stagger = { visible: { transition: { staggerChildren: 0.09 } } };

// ── Animation helpers ──────────────────────────────────────────────────────────
function CursorGlow() {
  const [pos, setPos] = useState({ x: -400, y: -400 });
  useEffect(() => {
    const h = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', h);
    return () => window.removeEventListener('mousemove', h);
  }, []);
  return (
    <div style={{ position: 'fixed', pointerEvents: 'none', zIndex: 1, left: pos.x - 200, top: pos.y - 200, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(47,230,255,0.055) 0%, transparent 70%)', transition: 'left 0.12s ease, top 0.12s ease' }} />
  );
}

function ParticleField() {
  const pts = Array.from({ length: 55 }, (_, i) => ({
    id: i, x: (i * 17.3) % 100, y: (i * 23.7) % 100,
    size: (i % 3) * 0.7 + 0.7, dur: 14 + (i % 13), delay: (i * 0.35) % 9,
    color: i % 3 === 0 ? T.cyan : i % 3 === 1 ? T.purple : T.green,
    opacity: 0.055 + (i % 6) * 0.025,
  }));
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      {pts.map(p => (
        <motion.div key={p.id} style={{ position: 'absolute', left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, borderRadius: '50%', background: p.color, opacity: p.opacity }}
          animate={{ y: [0, -28, 0], x: [0, 12, 0], opacity: [p.opacity, p.opacity * 2.8, p.opacity] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }} />
      ))}
    </div>
  );
}

function Background() {
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
      <motion.div animate={{ borderRadius: ['60% 40% 30% 70%/60% 30% 70% 40%', '30% 60% 70% 40%/50% 60% 30% 60%', '60% 40% 30% 70%/60% 30% 70% 40%'] }} transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', top: '-8%', left: '-8%', width: '50vw', height: '50vw', background: 'radial-gradient(ellipse, rgba(47,230,255,0.065) 0%, transparent 65%)' }} />
      <motion.div animate={{ borderRadius: ['40% 60% 60% 40%/40% 60% 40% 60%', '60% 40% 40% 60%/60% 40% 60% 40%', '40% 60% 60% 40%/40% 60% 40% 60%'] }} transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', top: '35%', right: '-8%', width: '44vw', height: '44vw', background: 'radial-gradient(ellipse, rgba(122,60,255,0.075) 0%, transparent 65%)' }} />
      <motion.div animate={{ borderRadius: ['50% 50% 30% 70%/60% 40% 60% 40%', '70% 30% 60% 40%/40% 60% 40% 60%', '50% 50% 30% 70%/60% 40% 60% 40%'] }} transition={{ duration: 19, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', bottom: '-5%', left: '22%', width: '36vw', height: '36vw', background: 'radial-gradient(ellipse, rgba(49,233,129,0.042) 0%, transparent 65%)' }} />
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
    </div>
  );
}

function Reveal({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={stagger} style={style}>
      {children}
    </motion.div>
  );
}

// ── Content from uploaded file ─────────────────────────────────────────────────
const capabilities = [
  { icon: Heart,      color: T.cyan,    title: 'Financial Health Score',  desc: 'Your Agent scores every dimension of your finances - and monitors changes automatically.' },
  { icon: TrendingUp, color: '#2D7BFF', title: 'Investment Analysis',     desc: 'Your Agent detects underperforming SIPs, missing investments, and portfolio gaps.' },
  { icon: Shield,     color: T.purple,  title: 'Insurance Analyzer',      desc: 'Your Agent uncovers hidden charges and flags policies draining your returns.' },
  { icon: Calculator, color: T.cyan,    title: 'Tax Optimization',        desc: 'Your Agent compares regimes, finds deductions you missed, and tells you exactly what to claim.' },
  { icon: BarChart3,  color: '#2D7BFF', title: 'Loan Planning',           desc: 'Your Agent flags when your EMI burden is too high and tells you the optimal prepayment move.' },
  { icon: Bot,        color: T.purple,  title: 'Talk to Your Agent',      desc: 'Ask anything. Your Agent already knows your numbers - answers are specific to you, not generic.' },
];

const problems = [
  { icon: AlertTriangle, color: T.red,    title: 'Sold products, not advice',       desc: "35% of Indians have never reviewed their finances - not once. The system profits from that confusion." },
  { icon: Search,        color: T.amber,  title: 'Hidden charges drain your wealth', desc: "India's net household savings are at a 50-year low. Fees buried in fine print are a silent contributor." },
  { icon: Compass,       color: T.purple, title: '88% expect things to get worse',  desc: '88% of salaried Indians anticipate greater financial uncertainty in the next 5 years. Most are guessing what to do.' },
];

const steps = [
  { n: '01', title: 'Tell your Agent your numbers',    desc: 'Enter basic info securely - no documents, no bank access required.' },
  { n: '02', title: 'Your Agent runs a full analysis', desc: 'Your Agent scans every dimension of your finances and scores them - instantly, automatically.' },
  { n: '03', title: 'Agent tells you what to do next', desc: 'No guessing. Your Agent gives you a clear action plan - specific to your numbers.' },
];

const tickerItems = [
  { icon: ShieldCheck, color: T.green,  text: 'No bank access required' },
  { icon: Shield,      color: T.purple, text: 'Your data is never sold' },
  { icon: Award,       color: T.cyan,   text: 'No commissions - ever' },
  { icon: Zap,         color: T.amber,  text: 'Score ready in 60 seconds' },
  { icon: Star,        color: T.green,  text: 'Built for India' },
  { icon: ShieldCheck, color: T.cyan,   text: 'Cancel anytime, no lock-in' },
  { icon: Shield,      color: T.green,  text: 'No bank access required' },
  { icon: Award,       color: T.purple, text: 'Your data is never sold' },
  { icon: Zap,         color: T.cyan,   text: 'No commissions - ever' },
  { icon: Star,        color: T.amber,  text: 'Score ready in 60 seconds' },
  { icon: ShieldCheck, color: T.green,  text: 'Built for India' },
  { icon: Shield,      color: T.cyan,   text: 'Cancel anytime, no lock-in' },
];

function PositioningMap() {
  const [hovered, setHovered] = useState<string | null>(null);
  const competitors = [
    { id: 'FIN', label: 'FinHealth360',   x: 80, y: 20, color: T.green,         size: 54, desc: 'Any doc · intelligence · action plan', hero: true },
    { id: 'CA',  label: 'CA / RIA',       x: 26, y: 29, color: T.textSecondary, size: 36, desc: 'Personalized but needs meeting' },
    { id: 'S',   label: 'Scripbox',       x: 32, y: 42, color: T.textSecondary, size: 32, desc: 'Needs bank/demat login' },
    { id: 'FI',  label: 'Fi / Jupiter',   x: 28, y: 64, color: T.textSecondary, size: 32, desc: 'Shows data, no action plan' },
    { id: 'G',   label: 'Groww',          x: 36, y: 72, color: T.textSecondary, size: 32, desc: 'Investing only, no health score' },
    { id: 'AI',  label: 'Generic AI',     x: 74, y: 60, color: T.textSecondary, size: 32, desc: 'No doc context, generic advice' },
    { id: 'CT',  label: 'ClearTax',       x: 68, y: 69, color: T.textSecondary, size: 32, desc: 'Tax filing only' },
    { id: 'XL',  label: 'Excel / manual', x: 60, y: 76, color: T.textSecondary, size: 32, desc: 'Manual, no intelligence, no alerts' },
  ];
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 760, margin: '0 auto', background: T.cardBg, border: `1px solid ${T.borderMid}`, borderRadius: 18, overflow: 'hidden' }}>
      <motion.div animate={{ opacity: [0.4, 0.75, 0.4] }} transition={{ duration: 4, repeat: Infinity }}
        style={{ position: 'absolute', top: '5%', right: '12%', width: '38%', height: '50%', background: `radial-gradient(ellipse, ${T.green}12 0%, transparent 70%)`, pointerEvents: 'none' }} />
      <div style={{ padding: '18px 22px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: T.textPrimary }}>Where every finance app sits — and where we don\'t</div>
          <div style={{ fontSize: 11, color: T.textSecondary, marginTop: 2 }}>Hover any dot to see what they actually do</div>
        </div>
        <div style={{ display: 'flex', gap: 14, fontSize: 11 }}>
          {[[T.green, 'FinHealth360'], [T.textSecondary, 'Competitors']].map(([c, l]) => (
            <div key={l as string} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: c as string }} />
              <span style={{ color: T.textSecondary }}>{l}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ position: 'relative', height: 420, margin: '12px 0 0' }}>
        <div style={{ position: 'absolute', top: '7%', left: '50%', transform: 'translateX(-50%)', fontSize: 10, color: T.textSecondary, fontWeight: 600, letterSpacing: '0.07em' }}>gives clear action plan</div>
        <div style={{ position: 'absolute', bottom: '5%', left: '50%', transform: 'translateX(-50%)', fontSize: 10, color: T.textSecondary, fontWeight: 600, letterSpacing: '0.07em' }}>shows data only</div>
        <div style={{ position: 'absolute', left: '2%', top: '50%', transform: 'translateY(-50%) rotate(-90deg)', fontSize: 10, color: T.textSecondary, fontWeight: 600, letterSpacing: '0.07em', whiteSpace: 'nowrap' }}>needs bank login</div>
        <div style={{ position: 'absolute', right: '1%', top: '50%', transform: 'translateY(-50%) rotate(90deg)', fontSize: 10, color: T.textSecondary, fontWeight: 600, letterSpacing: '0.07em', whiteSpace: 'nowrap' }}>works from any document</div>
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: 1, background: T.border }} />
        <div style={{ position: 'absolute', left: 0, right: 0, top: '50%', height: 1, background: T.border }} />
        <div style={{ position: 'absolute', top: '13%', left: '51%', right: '2%', bottom: '52%', border: `1px dashed rgba(47,230,255,0.22)`, borderRadius: 8, background: 'rgba(47,230,255,0.025)' }}>
          <div style={{ position: 'absolute', top: 7, left: 10, fontSize: 9, fontWeight: 700, color: T.cyan, letterSpacing: '0.1em' }}>OPEN TERRITORY</div>
        </div>
        {competitors.map(c => (
          <div key={c.id} style={{ position: 'absolute', left: `${c.x}%`, top: `${c.y}%`, transform: 'translate(-50%,-50%)', zIndex: c.hero ? 10 : 5 }}
            onMouseEnter={() => setHovered(c.id)} onMouseLeave={() => setHovered(null)}>
            <motion.div whileHover={{ scale: 1.18 }}
              animate={c.hero ? { boxShadow: [`0 0 0px ${T.green}`, `0 0 22px ${T.green}70`, `0 0 0px ${T.green}`] } : {}}
              transition={c.hero ? { duration: 2.5, repeat: Infinity } : {}}
              style={{ width: c.size, height: c.size, borderRadius: '50%', background: c.hero ? `radial-gradient(135deg, ${T.green} 0%, ${T.cyan} 100%)` : 'rgba(255,255,255,0.07)', border: `2px solid ${c.hero ? T.green : 'rgba(255,255,255,0.14)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <span style={{ fontSize: c.hero ? 8 : 9, fontWeight: 800, color: '#fff', textAlign: 'center', lineHeight: 1.2 }}>{c.id}</span>
            </motion.div>
            <AnimatePresence>
              {hovered === c.id && (
                <motion.div initial={{ opacity: 0, y: -6, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.18 }}
                  style={{ position: 'absolute', bottom: '115%', left: '50%', transform: 'translateX(-50%)', background: 'rgba(7,10,18,0.97)', border: `1px solid ${c.hero ? T.green : T.border}`, borderRadius: 10, padding: '9px 13px', whiteSpace: 'nowrap', zIndex: 20 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: c.hero ? T.green : T.textPrimary, marginBottom: 2 }}>{c.label}</div>
                  <div style={{ fontSize: 11, color: T.textSecondary }}>{c.desc}</div>
                  {c.hero && <div style={{ fontSize: 10, color: T.green, marginTop: 3, fontWeight: 600 }}>only one in this quadrant</div>}
                </motion.div>
              )}
            </AnimatePresence>
            {!c.hero && <div style={{ position: 'absolute', top: '108%', left: '50%', transform: 'translateX(-50%)', fontSize: 9, color: T.textSecondary, whiteSpace: 'nowrap', marginTop: 2 }}>{c.label}</div>}
            {c.hero && (
              <div style={{ position: 'absolute', top: '108%', left: '50%', transform: 'translateX(-50%)', marginTop: 4, textAlign: 'center' }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: T.green, whiteSpace: 'nowrap' }}>FinHealth360</div>
                <div style={{ fontSize: 9, color: T.textSecondary, whiteSpace: 'nowrap' }}>intelligence · action · clarity</div>
                <div style={{ fontSize: 9, color: T.green, fontWeight: 600 }}>only one in this quadrant</div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 28, padding: '14px 28px 22px', borderTop: `1px solid ${T.border}`, flexWrap: 'wrap' }}>
        {[['Any document', 'Salary slip, bank statement, tax return'], ['Instant intelligence', '0–100 score in 60 seconds'], ['Clear action plan', 'Exactly what to fix — not generic advice']].map(([t, s]) => (
          <div key={t as string}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 600, color: T.textPrimary, marginBottom: 2 }}>
              <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }} style={{ width: 6, height: 6, borderRadius: '50%', background: T.green }} />
              {t}
            </div>
            <div style={{ fontSize: 11, color: T.textSecondary }}>{s}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────────
export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const u = scrollYProgress.on('change', v => setScrolled(v > 0.01));
    return u;
  }, [scrollYProgress]);

  return (
    <div style={{ background: T.pageBg, color: T.textPrimary, fontFamily: 'Inter, system-ui, sans-serif', overflowX: 'hidden', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;500;600;700;800&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        @keyframes insightPulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes pulseRing { 0%{transform:scale(0.85);opacity:0.6} 100%{transform:scale(2.2);opacity:0} }
        @keyframes orbitSpin { 0%{transform:rotate(0deg) translateX(80px) rotate(0deg)} 100%{transform:rotate(360deg) translateX(80px) rotate(-360deg)} }
        @keyframes orbitSpin2 { 0%{transform:rotate(0deg) translateX(55px) rotate(0deg)} 100%{transform:rotate(-360deg) translateX(55px) rotate(360deg)} }
        @keyframes floatChip { 0%,100%{transform:translateY(0px) translateX(0px)} 33%{transform:translateY(-12px) translateX(5px)} 66%{transform:translateY(-6px) translateX(-4px)} }
        @keyframes scanBeam { 0%{top:0%;opacity:0.6} 100%{top:100%;opacity:0} }
        .float-chip { animation: floatChip 5s ease-in-out infinite; }
        .btn-primary { background: linear-gradient(135deg, #2FE6FF 0%, #7A3CFF 100%); color:#fff; border:none; padding:14px 30px; border-radius:12px; font-size:15px; font-weight:700; cursor:pointer; display:inline-flex; align-items:center; gap:8px; transition:opacity 0.2s, transform 0.2s, box-shadow 0.2s; }
        .btn-primary:hover { opacity:0.88; transform:translateY(-2px); box-shadow: 0 0 28px rgba(47,230,255,0.3); }
        .btn-secondary { background:transparent; color:${T.textSecondary}; border:1px solid ${T.border}; padding:14px 30px; border-radius:12px; font-size:15px; font-weight:500; cursor:pointer; transition:all 0.2s; }
        .btn-secondary:hover { border-color:rgba(255,255,255,0.22); color:${T.textPrimary}; }
        .card-hover { transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease; }
        .card-hover:hover { transform: translateY(-4px); }
        ::-webkit-scrollbar { width:5px } ::-webkit-scrollbar-track { background:${T.pageBg} } ::-webkit-scrollbar-thumb { background:rgba(255,255,255,0.08); border-radius:3px }
      `}</style>

      <CursorGlow />
      <Background />
      <ParticleField />
      <motion.div style={{ scaleX: scrollYProgress, position: 'fixed', top: 0, left: 0, right: 0, height: 2, background: T.gradPrimary, transformOrigin: '0%', zIndex: 100 }} />

      {/* ── Navbar ── */}
      <motion.nav initial={{ y: -64 }} animate={{ y: 0 }} transition={{ duration: 0.55 }}
        style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 99, height: 64, padding: '0 4vw', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: scrolled ? 'rgba(7,10,18,0.92)' : 'transparent', backdropFilter: scrolled ? 'blur(18px)' : 'none', borderBottom: scrolled ? `1px solid ${T.border}` : 'none', transition: 'all 0.3s ease' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.55 }}
            style={{ width: 34, height: 34, borderRadius: 9, background: T.gradPrimary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sparkles size={16} color="#fff" />
          </motion.div>
          <span style={{ fontFamily: T.fontDisplay, fontSize: 20, fontWeight: 800, letterSpacing: '-0.5px' }}>
            <span style={{ color: '#60D0FF' }}>FinHealth</span><span style={{ color: T.red }}>360</span>
          </span>
        </div>
        <div style={{ display: 'flex', gap: 32 }}>
          {['Features', 'Tools', 'Pricing'].map(l => (
            <button key={l} onClick={() => document.getElementById(l.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 500, color: T.textSecondary, transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = T.textPrimary)}
              onMouseLeave={e => (e.currentTarget.style.color = T.textSecondary)}>{l}</button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <a href="https://financialai-frontend-lime.vercel.app/login" className="btn-secondary" style={{ padding: '9px 20px', fontSize: 13 }}>Login</a>
          <a href="https://financialai-frontend-lime.vercel.app/signup" className="btn-primary" style={{ padding: '9px 20px', fontSize: 13 }}>Check My Score</a>
        </div>
      </motion.nav>

      {/* ── Hero ── */}
      <section style={{ minHeight: '92vh', display: 'flex', alignItems: 'center', padding: '100px 4vw 60px', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '3rem', flexWrap: 'wrap', width: '100%' }}>

          {/* Left */}
          <div style={{ maxWidth: 560, flex: '1 1 340px' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 999, background: 'rgba(47,230,255,0.08)', border: `1px solid rgba(47,230,255,0.22)`, marginBottom: 20 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: T.cyan, animation: 'insightPulse 2s ease-in-out infinite' }} />
              <span style={{ fontSize: 12, fontWeight: 500, color: T.cyan }}>83% of Indians know they need a financial plan. Only 35% have one. — ABSLI 2024</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              style={{ fontFamily: T.fontDisplay, fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: 20 }}>
              <span style={{ background: 'linear-gradient(to bottom, #F2F5FF 0%, rgba(242,245,255,0.55) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                You're not bad with money.
              </span>
              <br />
              <span style={{ background: T.gradPrimary, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                You just don't know where you stand.
              </span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              style={{ fontSize: 17, color: T.textSecondary, lineHeight: 1.7, marginBottom: 28, maxWidth: 460 }}>
              India's household savings rate just hit a 50-year low. 88% of salaried Indians expect more financial uncertainty. Upload any document — salary slip, bank statement, tax return — and get your FinHealth Score, your risks, and exactly what to do next. In 60 seconds.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
              style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 24 }}>
              <a href="https://financialai-frontend-lime.vercel.app/quick-score" className="btn-primary">
                Check My Financial Health — Free <ArrowRight size={18} />
              </a>
              <a href="https://financialai-frontend-lime.vercel.app/app/dashboard" className="btn-secondary">
                See How It Works
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }}
              style={{ display: 'flex', flexWrap: 'wrap', gap: 16, fontSize: 12, color: T.textSecondary, marginBottom: 32 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><ShieldCheck size={12} color={T.green} />No bank access needed</span>
              <span style={{ color: T.textMuted }}>·</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><Award size={12} color={T.cyan} />Zero commissions</span>
              <span style={{ color: T.textMuted }}>·</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><Shield size={12} color={T.purple} />Data never sold</span>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.6 }}
              style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
              {[['400M', "Indians with no financial guidance", T.cyan], ['5.3%', 'Savings rate — 50-yr low (RBI)', T.green], ['60s', 'To your FinHealth Score', T.purple]].map(([v, l, c]) => (
                <div key={String(l)} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 1, height: 32, background: T.border }} />
                  <div>
                    <div style={{ fontFamily: T.fontDisplay, fontSize: 24, fontWeight: 800, color: String(c) }}>{v}</div>
                    <div style={{ fontSize: 11, color: T.textSecondary, marginTop: 2 }}>{l}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Hero card (advanced) */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
            style={{ flex: '1 1 300px', maxWidth: 440, position: 'relative' }}>

            {/* Floating Net Worth chip */}
            <div className="float-chip" style={{ position: 'absolute', top: -18, left: -14, zIndex: 10, background: T.cardBg, border: `1px solid rgba(47,230,255,0.25)`, borderRadius: 12, padding: '8px 14px', boxShadow: '0 4px 24px rgba(0,0,0,0.5)' }}>
              <div style={{ fontSize: 10, color: T.textSecondary, fontWeight: 600, marginBottom: 2 }}>Net Worth</div>
              <div style={{ fontFamily: T.fontDisplay, fontSize: 17, fontWeight: 800, color: T.green }}>₹24.6L</div>
            </div>

            {/* Floating Tax Saved chip */}
            <div className="float-chip" style={{ position: 'absolute', top: 190, right: -18, zIndex: 10, background: T.cardBg, border: `1px solid rgba(122,60,255,0.3)`, borderRadius: 12, padding: '8px 14px', boxShadow: '0 4px 24px rgba(0,0,0,0.5)', animationDelay: '1.6s' }}>
              <div style={{ fontSize: 10, color: T.textSecondary, fontWeight: 600, marginBottom: 2 }}>Tax Saved</div>
              <div style={{ fontFamily: T.fontDisplay, fontSize: 17, fontWeight: 800, color: T.purple }}>₹18K</div>
            </div>

            {/* Floating Monthly SIP chip */}
            <div className="float-chip" style={{ position: 'absolute', bottom: 72, right: -18, zIndex: 10, background: T.cardBg, border: `1px solid rgba(239,159,39,0.3)`, borderRadius: 12, padding: '8px 14px', boxShadow: '0 4px 24px rgba(0,0,0,0.5)', animationDelay: '0.8s' }}>
              <div style={{ fontSize: 10, color: T.textSecondary, fontWeight: 600, marginBottom: 2 }}>Monthly SIP</div>
              <div style={{ fontFamily: T.fontDisplay, fontSize: 15, fontWeight: 800, color: T.amber, display: 'flex', alignItems: 'center', gap: 5 }}>₹0 <span>⚠️</span></div>
            </div>

            {/* Main card */}
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}>
              <div style={{ borderRadius: 20, border: `1px solid rgba(47,230,255,0.18)`, background: 'rgba(7,10,18,0.85)', backdropFilter: 'blur(12px)', padding: 24, position: 'relative', overflow: 'hidden' }}>

                {/* Top gradient line */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${T.cyan}, ${T.purple})` }} />

                {/* Scan beam */}
                <div style={{ position: 'absolute', left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, rgba(47,230,255,0.18), transparent)', animation: 'scanBeam 3s linear infinite', pointerEvents: 'none' }} />

                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 18 }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: T.textPrimary, marginBottom: 3 }}>Financial Intelligence Score</div>
                    <div style={{ fontSize: 11, color: T.textMuted }}>Live · Updated now</div>
                  </div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 11px', borderRadius: 999, background: 'rgba(49,233,129,0.1)', border: `1px solid rgba(49,233,129,0.3)` }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: T.green, animation: 'insightPulse 1.5s ease-in-out infinite' }} />
                    <span style={{ fontSize: 10, fontWeight: 700, color: T.green, letterSpacing: '0.06em' }}>INTELLIGENCE ACTIVE</span>
                  </div>
                </div>

                {/* Score gauge — exact from commit 366d115 */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                  <div style={{ position: 'relative', width: 134, height: 134, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {/* Pulse rings */}
                    <div style={{ position: 'absolute', width: 134, height: 134, borderRadius: '50%', border: '1px solid rgba(47,230,255,0.2)', animation: 'pulseRing 3s ease-out infinite' }} />
                    <div style={{ position: 'absolute', width: 134, height: 134, borderRadius: '50%', border: '1px solid rgba(122,60,255,0.15)', animation: 'pulseRing 3s 1.2s ease-out infinite' }} />
                    {/* Orbit container 1 — cyan dot */}
                    <div style={{ position: 'absolute', width: 134, height: 134, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ position: 'absolute', width: 8, height: 8, borderRadius: '50%', background: '#2FE6FF', top: '50%', left: '50%', marginTop: -4, marginLeft: -4, animation: 'orbitSpin 4s linear infinite', boxShadow: '0 0 8px #2FE6FF' }} />
                    </div>
                    {/* Orbit container 2 — purple dot */}
                    <div style={{ position: 'absolute', width: 134, height: 134, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ position: 'absolute', width: 6, height: 6, borderRadius: '50%', background: '#7A3CFF', top: '50%', left: '50%', marginTop: -3, marginLeft: -3, animation: 'orbitSpin2 3s linear infinite', boxShadow: '0 0 6px #7A3CFF' }} />
                    </div>
                    {/* SVG arc */}
                    <svg width="120" height="120" style={{ transform: 'rotate(-90deg)', position: 'absolute' }}>
                      <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
                      <circle cx="60" cy="60" r="50" fill="none" stroke="url(#scoreGrad)" strokeWidth="8"
                        strokeDasharray={`${2 * Math.PI * 50 * 0.72} ${2 * Math.PI * 50 * 0.28}`} strokeLinecap="round" />
                      <defs>
                        <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor={T.cyan} />
                          <stop offset="100%" stopColor={T.purple} />
                        </linearGradient>
                      </defs>
                    </svg>
                    {/* Score number */}
                    <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{ fontFamily: T.fontDisplay, fontSize: 34, fontWeight: 900, color: T.textPrimary, lineHeight: 1 }}>72</div>
                      <div style={{ fontSize: 11, color: T.textSecondary, marginTop: 3 }}>/100</div>
                    </div>
                  </div>
                </div>

                {/* Progress bars */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 18 }}>
                  {[['Cash Flow', 78, T.green], ['Investments', 65, T.cyan], ['Insurance', 55, T.amber], ['Debt', 82, T.green]].map(([label, pct, color]) => (
                    <div key={String(label)}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: T.textSecondary, marginBottom: 4 }}>
                        <span>{label}</span><span style={{ color: String(color), fontWeight: 600 }}>{pct}%</span>
                      </div>
                      <div style={{ height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.06)' }}>
                        <div style={{ height: '100%', width: `${pct}%`, borderRadius: 3, background: String(color), opacity: 0.9, boxShadow: `0 0 6px ${String(color)}66` }} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Live Intelligence Alerts */}
                <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 14 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: T.textSecondary, marginBottom: 10 }}>LIVE INTELLIGENCE ALERTS</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 10, background: 'rgba(255,80,80,0.06)', border: `1px solid rgba(255,80,80,0.2)` }}>
                      <span style={{ fontSize: 14 }}>🚨</span>
                      <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>No SIP detected — wealth creation at risk</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 10, background: 'rgba(239,159,39,0.06)', border: `1px solid rgba(239,159,39,0.2)` }}>
                      <span style={{ fontSize: 14 }}>💡</span>
                      <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>₹18,000 deduction opportunity found</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Ticker ── */}
      <div style={{ borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}`, background: 'rgba(255,255,255,0.015)', padding: '14px 0', overflow: 'hidden', position: 'relative', zIndex: 2 }}>
        <motion.div animate={{ x: ['0%', '-50%'] }} transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
          style={{ display: 'flex', gap: 0, whiteSpace: 'nowrap' }}>
          {tickerItems.map((item, i) => (
            <div key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '0 32px', whiteSpace: 'nowrap' }}>
              <item.icon size={14} color={item.color} style={{ flexShrink: 0 }} />
              <span style={{ fontSize: 13, color: T.textSecondary, fontWeight: 500 }}>{item.text}</span>
              <span style={{ width: 4, height: 4, borderRadius: '50%', background: T.border, display: 'inline-block', marginLeft: 16 }} />
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Problems ── */}
      <section style={{ padding: '80px 4vw', position: 'relative', zIndex: 2 }}>
        <Reveal>
          <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: 52 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 13px', borderRadius: 999, background: 'rgba(255,80,80,0.08)', border: `1px solid rgba(255,80,80,0.2)`, marginBottom: 14 }}>
              <AlertTriangle size={11} color={T.red} />
              <span style={{ fontSize: 11, fontWeight: 600, color: T.red }}>The Problem</span>
            </div>
            <h2 style={{ fontFamily: T.fontDisplay, fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, letterSpacing: '-0.03em', color: T.textPrimary, marginBottom: 10 }}>
              Why 35% of Indians never check their finances
            </h2>
            <p style={{ color: T.textSecondary, fontSize: 15 }}>It is not laziness. The system was never built for them. Source: ABSLI A-Nishchit Index 2024.</p>
          </motion.div>
          <motion.div variants={stagger} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, maxWidth: 1000, margin: '0 auto' }}>
            {problems.map(p => (
              <motion.div key={p.title} variants={fadeUp} className="card-hover"
                style={{ background: `${p.color}08`, border: `1px solid ${p.color}25`, borderLeft: `3px solid ${p.color}`, borderRadius: 14, padding: 24 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: `${p.color}15`, border: `1px solid ${p.color}35`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <p.icon size={20} color={p.color} />
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: T.textPrimary, marginBottom: 8 }}>{p.title}</h3>
                <p style={{ fontSize: 13, color: T.textSecondary, lineHeight: 1.6 }}>{p.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </Reveal>
      </section>

      {/* ── Tools React. Agents Act. ── */}
      <section style={{ padding: '80px 4vw', position: 'relative', zIndex: 2 }}>
        <Reveal>
          <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontFamily: T.fontDisplay, fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, letterSpacing: '-0.03em', color: T.textPrimary, marginBottom: 12 }}>
              Tools React.{' '}
              <span style={{ background: T.gradPrimary, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Agents Act.</span>
            </h2>
            <p style={{ color: T.textSecondary, maxWidth: 520, margin: '0 auto', fontSize: 15 }}>
              The difference between <span style={{ color: 'rgba(255,255,255,0.7)' }}>checking your money</span> and having it{' '}
              <span style={{ color: T.cyan, fontWeight: 600 }}>managed for you.</span>
            </p>
          </motion.div>
          <motion.div variants={stagger} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20, maxWidth: 900, margin: '0 auto' }}>
            {/* Without */}
            <motion.div variants={fadeUp} style={{ padding: 28, borderRadius: 18, background: 'rgba(255,80,80,0.04)', border: `1px solid rgba(255,80,80,0.15)` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
                <span style={{ fontSize: 14 }}>❌</span>
                <span style={{ fontWeight: 700, fontSize: 13, color: T.red }}>Without FinHealth Agent</span>
              </div>
              {['You check your finances — when you remember', 'You find problems after they\'ve grown', 'You guess what to do next', 'You react to financial surprises', "You Google advice that doesn't fit your situation", 'You pay hidden charges you never knew existed'].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 14 }}>
                  <span style={{ color: T.red, marginTop: 2, flexShrink: 0 }}>✕</span>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>{item}</span>
                </div>
              ))}
            </motion.div>
            {/* With */}
            <motion.div variants={fadeUp} style={{ padding: 28, borderRadius: 18, background: 'rgba(47,230,255,0.04)', border: `1px solid rgba(47,230,255,0.2)`, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: T.gradPrimary }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
                <span style={{ fontSize: 14 }}>🤖</span>
                <span style={{ fontWeight: 700, fontSize: 13, color: T.cyan }}>With Your FinHealth Agent</span>
              </div>
              {['Your Agent monitors your finances automatically', 'Your Agent detects risks before they become problems', 'Your Agent tells you exactly what to do next', 'Your Agent alerts you before surprises happen', 'Your Agent gives advice specific to YOUR numbers', 'Your Agent finds hidden charges and leaks for you'].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 14 }}>
                  <span style={{ color: T.cyan, marginTop: 2, flexShrink: 0 }}>✓</span>
                  <span style={{ fontSize: 13, color: T.textPrimary, lineHeight: 1.6 }}>{item}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </Reveal>
      </section>

      {/* ── How It Works ── */}
      <section id="tools" style={{ padding: '80px 4vw', position: 'relative', zIndex: 2 }}>
        <Reveal>
          <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: 52 }}>
            <h2 style={{ fontFamily: T.fontDisplay, fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, letterSpacing: '-0.03em', color: T.textPrimary, marginBottom: 10 }}>
              How Your Agent Works
            </h2>
            <p style={{ color: T.textSecondary, fontSize: 15 }}>Set it up once. Your Agent handles the rest.</p>
          </motion.div>
          <motion.div variants={stagger} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24, maxWidth: 900, margin: '0 auto' }}>
            {steps.map((s, i) => (
              <motion.div key={s.n} variants={fadeUp} className="card-hover"
                style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${T.border}`, borderRadius: 16, padding: 24, position: 'relative' }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(47,230,255,0.1)', border: `1px solid rgba(47,230,255,0.3)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: T.fontDisplay, fontWeight: 700, color: T.cyan, marginBottom: 16 }}>{s.n}</div>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: T.textPrimary, marginBottom: 8 }}>{s.title}</h3>
                <p style={{ fontSize: 13, color: T.textSecondary, lineHeight: 1.6 }}>{s.desc}</p>
                {i < 2 && <div style={{ display: 'none' }} />}
              </motion.div>
            ))}
          </motion.div>
        </Reveal>
      </section>

      {/* ── Platform Features ── */}
      <FeaturesGrid />

                  {/* Mini bar preview */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, background: 'rgba(0,0,0,0.2)', borderRadius: 12, padding: '12px 14px' }}>
                    {m.preview.map(([label, pct, color]) => (
                      <div key={String(label)}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: T.textMuted, marginBottom: 3 }}>
                          <span>{label}</span><span style={{ color: String(color) }}>{pct}%</span>
                        </div>
                        <div style={{ height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.05)' }}>
                          <div style={{ height: '100%', width: `${pct}%`, borderRadius: 2, background: String(color), opacity: 0.8 }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Feature list with links */}
                  <div style={{ borderTop: `1px solid ${m.color}15`, paddingTop: 14 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: m.color, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>What’s included</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                      {m.features.map((f, i) => (
                        <a key={i} href={f.href} target="_blank" rel="noopener noreferrer"
                          style={{ textDecoration: 'none', display: 'flex', alignItems: 'flex-start', gap: 10, padding: '8px 0', borderBottom: i < m.features.length - 1 ? `1px solid rgba(255,255,255,0.04)` : 'none' }}>
                          <div style={{ width: 5, height: 5, borderRadius: '50%', background: m.color, flexShrink: 0, marginTop: 6 }} />
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 12, fontWeight: 700, color: T.textPrimary, marginBottom: 1 }}>{f.label}</div>
                            <div style={{ fontSize: 11, color: T.textMuted, lineHeight: 1.4 }}>{f.desc}</div>
                          </div>
                          <ChevronRight size={11} color={m.color} style={{ flexShrink: 0, marginTop: 4, opacity: 0.6 }} />
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* CTA row */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 5, fontSize: 12, fontWeight: 700, color: m.color, marginTop: 'auto' }}>
                    Get Access <ChevronRight size={14} />
                  </div>
                </motion.div>
              </a>
            </motion.div>
          ))}
        </motion.div>

        {/* Dashboard CTA banner */}
        <Reveal>
          <motion.div variants={fadeUp}>
            <a href="https://financialai-frontend-lime.vercel.app/app/dashboard" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block', maxWidth: 1100, margin: '0 auto' }}>
              <motion.div whileHover={{ y: -3, boxShadow: '0 20px 60px rgba(47,230,255,0.12)' }}
                style={{ background: 'linear-gradient(135deg, rgba(47,230,255,0.08) 0%, rgba(122,60,255,0.1) 100%)', border: `1px solid rgba(47,230,255,0.28)`, borderRadius: 20, padding: '24px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: T.gradPrimary }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}
                    style={{ width: 48, height: 48, borderRadius: 14, background: T.gradPrimary, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Sparkles size={22} color="#fff" />
                  </motion.div>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 800, color: T.textPrimary, marginBottom: 4, fontFamily: T.fontDisplay }}>See Your Full Dashboard</div>
                    <div style={{ fontSize: 13, color: T.textSecondary }}>Net worth · Agent alerts · All modules · Weekly intelligence — in one view</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <a href="https://financialai-frontend-lime.vercel.app/signup" className="btn-primary" style={{ fontSize: 13, padding: '11px 22px' }}>
                    Start Free <ChevronRight size={15} />
                  </a>
                </div>
              </motion.div>
            </a>
          </motion.div>
        </Reveal>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" style={{ padding: '80px 4vw', position: 'relative', zIndex: 2 }}>
        <Reveal>
          <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: 52 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 13px', borderRadius: 999, background: 'rgba(49,233,129,0.1)', border: `1px solid rgba(49,233,129,0.25)`, marginBottom: 14 }}>
              <Sparkles size={11} color={T.green} />
              <span style={{ fontSize: 11, fontWeight: 600, color: T.green }}>Simple Pricing</span>
            </div>
            <h2 style={{ fontFamily: T.fontDisplay, fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, letterSpacing: '-0.03em', color: T.textPrimary, marginBottom: 12 }}>
              Choose How Your Agent Works For You
            </h2>
            <p style={{ color: T.textSecondary, maxWidth: 520, margin: '0 auto', fontSize: 15 }}>
              Start free. Upgrade when you want more intelligence, more automation, and more control.
            </p>
          </motion.div>
          <motion.div variants={stagger} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, maxWidth: 1100, margin: '0 auto', alignItems: 'start' }}>
            {/* FREE */}
            <motion.div variants={fadeUp} whileHover={{ y: -6 }}
              style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${T.border}`, borderRadius: 20, padding: 28, display: 'flex', flexDirection: 'column', minHeight: 480 }}>
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: T.textSecondary, marginBottom: 8 }}>FREE</div>
                <div style={{ fontFamily: T.fontDisplay, fontSize: 38, fontWeight: 900, color: T.textPrimary, marginBottom: 4 }}>₹0</div>
                <div style={{ fontSize: 12, color: T.textSecondary }}>Forever free</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1, marginBottom: 24 }}>
                {['Financial Health Score', 'Basic tools (SIP, EMI, calculators)', 'Limited AI Agent chat (10/day)', 'Basic insights & reports'].map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 9, fontSize: 13, color: T.textSecondary }}>
                    <CheckCircle size={13} color={T.green} style={{ flexShrink: 0, marginTop: 2 }} />{f}
                  </div>
                ))}
              </div>
              <a href="https://financialai-frontend-lime.vercel.app/signup" style={{ display: 'block', textAlign: 'center', padding: '12px', borderRadius: 10, fontSize: 13, fontWeight: 700, textDecoration: 'none', background: 'transparent', color: T.textSecondary, border: `1px solid ${T.border}`, transition: 'all 0.2s' }}>
                Activate My Agent (Free)
              </a>
            </motion.div>

            {/* PRO */}
            <motion.div variants={fadeUp} whileHover={{ y: -6 }}
              style={{ position: 'relative', background: 'rgba(47,230,255,0.05)', border: '1px solid rgba(47,230,255,0.35)', borderRadius: 20, padding: 28, display: 'flex', flexDirection: 'column', minHeight: 480, boxShadow: '0 0 60px rgba(47,230,255,0.08)' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: T.gradPrimary, borderRadius: '20px 20px 0 0' }} />
              <div style={{ position: 'absolute', top: 16, right: 16 }}>
                <motion.div animate={{ boxShadow: [`0 0 0px ${T.cyan}`, `0 0 14px ${T.cyan}88`, `0 0 0px ${T.cyan}`] }} transition={{ duration: 2, repeat: Infinity }}
                  style={{ background: T.gradPrimary, borderRadius: 999, padding: '3px 10px', fontSize: 10, fontWeight: 700, color: '#fff' }}>Most Popular</motion.div>
              </div>
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: T.cyan, marginBottom: 8 }}>PRO</div>
                <div style={{ fontFamily: T.fontDisplay, fontSize: 38, fontWeight: 900, color: T.textPrimary, marginBottom: 4 }}>₹99</div>
                <div style={{ fontSize: 12, color: T.textSecondary }}>per month · cancel anytime</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1, marginBottom: 20 }}>
                {['Everything in Free', '5 AI Agent reports/month', 'Advanced insights & recommendations', 'Portfolio & tax intelligence', 'Goal-based planning', 'AI Agent chat (20/day)'].map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 9, fontSize: 13, color: '#C5D3E8' }}>
                    <CheckCircle size={13} color={T.cyan} style={{ flexShrink: 0, marginTop: 2 }} />{f}
                  </div>
                ))}
              </div>
              <a href="https://financialai-frontend-lime.vercel.app/signup" className="btn-primary" style={{ display: 'block', textAlign: 'center', padding: '12px', fontSize: 13, fontWeight: 700, textDecoration: 'none', borderRadius: 10 }}>
                Upgrade to Pro
              </a>
              <p style={{ textAlign: 'center', fontSize: 11, marginTop: 8, color: T.textMuted }}>7-day refund · no lock-in</p>
            </motion.div>

            {/* ELITE */}
            <motion.div variants={fadeUp} whileHover={{ y: -6 }}
              style={{ position: 'relative', background: 'rgba(49,233,129,0.03)', border: '1px solid rgba(49,233,129,0.3)', borderRadius: 20, padding: 28, display: 'flex', flexDirection: 'column', minHeight: 480 }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: T.gradGreen, borderRadius: '20px 20px 0 0' }} />
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: T.green, marginBottom: 8 }}>ELITE</div>
                <div style={{ fontFamily: T.fontDisplay, fontSize: 38, fontWeight: 900, color: T.textPrimary, marginBottom: 4 }}>₹499</div>
                <div style={{ fontSize: 12, color: T.textSecondary }}>per month · cancel anytime</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1, marginBottom: 20 }}>
                {['Everything in Pro', 'Unlimited AI Agent reports', 'Weekly personalized insights', 'Risk analysis & wealth projection', 'Retirement & insurance planning', 'Full tax optimization', 'Unlimited AI Agent chat', 'PDF report downloads', 'Dedicated advisor support'].map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 9, fontSize: 13, color: '#C5D3E8' }}>
                    <CheckCircle size={13} color={T.green} style={{ flexShrink: 0, marginTop: 2 }} />{f}
                  </div>
                ))}
              </div>
              <a href="https://financialai-frontend-lime.vercel.app/signup" style={{ display: 'block', textAlign: 'center', padding: '12px', borderRadius: 10, fontSize: 13, fontWeight: 700, textDecoration: 'none', background: T.gradGreen, color: '#070A12' }}>
                Get Elite
              </a>
              <p style={{ textAlign: 'center', fontSize: 11, marginTop: 8, color: T.textMuted }}>7-day refund · no lock-in</p>
            </motion.div>

            {/* ELITE+ */}
            <motion.div variants={fadeUp} whileHover={{ y: -6 }}
              style={{ position: 'relative', background: 'rgba(122,60,255,0.05)', border: '1px solid rgba(122,60,255,0.35)', borderRadius: 20, padding: 28, display: 'flex', flexDirection: 'column', minHeight: 480 }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: T.gradPrimary, borderRadius: '20px 20px 0 0' }} />
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: T.purple, marginBottom: 8 }}>ELITE+ AGENT PLAN</div>
                <div style={{ fontFamily: T.fontDisplay, fontSize: 38, fontWeight: 900, color: T.textPrimary, marginBottom: 4 }}>₹999</div>
                <div style={{ fontSize: 12, color: T.textSecondary }}>per month · fully autonomous</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1, marginBottom: 20 }}>
                {['Everything in Elite', 'Daily automatic financial analysis', 'Proactive alerts before problems happen', 'Agent works even when you are offline', 'Weekly AI financial roadmap', 'Continuous risk monitoring', 'Full memory across sessions', 'Personalised strategy engine', 'Priority AI processing'].map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 9, fontSize: 13, color: '#C5D3E8' }}>
                    <CheckCircle size={13} color={T.purple} style={{ flexShrink: 0, marginTop: 2 }} />{f}
                  </div>
                ))}
              </div>
              <a href="https://financialai-frontend-lime.vercel.app/signup" style={{ display: 'block', textAlign: 'center', padding: '12px', borderRadius: 10, fontSize: 13, fontWeight: 700, textDecoration: 'none', background: 'rgba(122,60,255,0.15)', color: T.purple, border: '1px solid rgba(122,60,255,0.4)' }}>
                Get Elite+
              </a>
              <p style={{ textAlign: 'center', fontSize: 11, marginTop: 8, color: T.textMuted }}>7-day refund · no lock-in</p>
            </motion.div>
          </motion.div>
        </Reveal>
      </section>

      {/* ── Market Reality ── */}
      <section style={{ padding: '80px 4vw', position: 'relative', zIndex: 2 }}>
        <Reveal>
          <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 13px', borderRadius: 999, background: 'rgba(29,158,117,0.08)', border: '1px solid rgba(29,158,117,0.22)', marginBottom: 14 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: T.green }}>Market Reality</span>
            </div>
            <h2 style={{ fontFamily: T.fontDisplay, fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, letterSpacing: '-0.03em', color: T.textPrimary, marginBottom: 12 }}>
              Where every finance app sits — and where we don't
            </h2>
            <p style={{ color: T.textSecondary, maxWidth: 540, margin: '0 auto', fontSize: 15 }}>
              No competitor combines: works from any document + gives a clear action plan + built for India's salaried middle class.
            </p>
          </motion.div>
          <motion.div variants={stagger} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, maxWidth: 1000, margin: '0 auto 32px' }}>
            {([['88%', 'of Indians expect greater financial uncertainty in the next 5 years', T.cyan], ['35%', 'have never reviewed their finances — not once', T.purple], ['5.3%', 'household savings rate — lowest in 50 years (RBI 2025)', T.green], ['400M', 'middle-class Indians with zero access to financial guidance', T.amber]] as [string,string,string][]).map(([n, l, c]) => (
              <motion.div key={n} variants={fadeUp}
                style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${T.border}`, borderTop: `2px solid ${c}`, borderRadius: 14, padding: '20px 18px' }}>
                <div style={{ fontFamily: T.fontDisplay, fontSize: 32, fontWeight: 900, color: c, marginBottom: 8 }}>{n}</div>
                <div style={{ fontSize: 12, color: T.textSecondary, lineHeight: 1.6 }}>{l}</div>
              </motion.div>
            ))}
          </motion.div>
          <PositioningMap />
          <motion.div variants={fadeUp} style={{ marginTop: 20, background: 'rgba(47,230,255,0.03)', border: '1px dashed rgba(47,230,255,0.2)', borderRadius: 16, padding: '24px 28px', maxWidth: 900, margin: '20px auto 0' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: T.cyan, marginBottom: 8 }}>The gap nobody filled — until now</div>
            <p style={{ fontSize: 13, color: T.textSecondary, lineHeight: 1.8, margin: 0 }}>
              Bank apps show your balance. Groww tracks your SIPs. CAs charge ₹5,000 per session. Generic AI has no India context. None of them take your salary slip and tell you:{' '}
              <span style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>your score is 64/100, your EMI ratio is too high, fix this first.</span>
              {' '}That is exactly what FinHealth does.{' '}
              <span style={{ color: T.textMuted }}>Sources: ABSLI A-Nishchit Index 2024 · Morgan Stanley India 2025 · RBI Financial Savings Data 2025.</span>
            </p>
          </motion.div>
        </Reveal>
      </section>

      {/* ── Testimonials ── */}
      <section style={{ padding: '80px 4vw', position: 'relative', zIndex: 2 }}>
        <Reveal>
          <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: 52 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 13px', borderRadius: 999, background: 'rgba(47,230,255,0.06)', border: `1px solid rgba(47,230,255,0.18)`, marginBottom: 14 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: T.cyan }}>What users say</span>
            </div>
            <h2 style={{ fontFamily: T.fontDisplay, fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', fontWeight: 800, letterSpacing: '-0.03em', color: T.textPrimary }}>
              Real feedback from real users
            </h2>
          </motion.div>
          <motion.div variants={stagger} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, maxWidth: 1000, margin: '0 auto' }}>
            {[
              { name: 'Rohan M.', role: 'Software Engineer, Pune', avatar: 'RM', color: T.cyan, text: 'I always knew I should track my finances but never did. FinHealth gave me a score in 60 seconds and told me exactly what was wrong — my EMI ratio was 48%, way too high. Fixed it in 3 months.', stars: 5 },
              { name: 'Priya S.', role: 'Product Manager, Bangalore', avatar: 'PS', color: T.green, text: 'Finally something built for Indian salaries. It understands SIPs, NPS, HRA — not just US 401k stuff. The tax comparison alone saved me ₹18,000 this year.', stars: 5 },
              { name: 'Amit K.', role: 'CA, Mumbai', avatar: 'AK', color: T.purple, text: 'I recommend this to clients who can\'t afford a full advisory session. It does the basic financial health check properly — scoring, red flags, and action steps. Solid product.', stars: 5 },
            ].map(t => (
              <motion.div key={t.name} variants={fadeUp} className="card-hover"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 18, padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'flex', gap: 3 }}>
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} size={13} color={T.amber} fill={T.amber} />
                  ))}
                </div>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.75, flex: 1 }}>"{t.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 12, borderTop: `1px solid ${T.border}` }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: `${t.color}18`, border: `1px solid ${t.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: t.color, flexShrink: 0 }}>{t.avatar}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: T.textPrimary }}>{t.name}</div>
                    <div style={{ fontSize: 11, color: T.textMuted }}>{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Reveal>
      </section>

      {/* ── Security ── */}
      <section style={{ padding: '80px 4vw', position: 'relative', zIndex: 2 }}>
        <Reveal>
          <div style={{ background: 'rgba(47,230,255,0.03)', border: '1px solid rgba(47,230,255,0.12)', borderRadius: 24, padding: '48px 40px', maxWidth: 900, margin: '0 auto' }}>
            <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: 40 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 13px', borderRadius: 999, background: 'rgba(49,233,129,0.08)', border: `1px solid rgba(49,233,129,0.2)`, marginBottom: 14 }}>
                <ShieldCheck size={11} color={T.green} />
                <span style={{ fontSize: 11, fontWeight: 600, color: T.green }}>Security & Privacy</span>
              </div>
              <h2 style={{ fontFamily: T.fontDisplay, fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, color: T.textPrimary, marginBottom: 10 }}>
                Your financial data is safe with us
              </h2>
              <p style={{ color: T.textSecondary, maxWidth: 440, margin: '0 auto', fontSize: 14 }}>
                We built FinHealth with a simple rule: your data belongs to you, not us.
              </p>
            </motion.div>
            <motion.div variants={stagger} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 14 }}>
              {[
                { icon: '🔒', title: 'No bank login required',           desc: 'We never ask for your bank credentials, UPI PIN, or net banking access. Ever.' },
                { icon: '🚫', title: 'Your data is never sold',           desc: 'We have no advertisers. We earn from subscriptions only. Your data has no commercial value to us.' },
                { icon: '🗑️', title: 'Delete anytime',                   desc: 'Go to Settings → Delete Account. Your data is permanently erased within 24 hours. No questions.' },
                { icon: '📄', title: 'Documents processed & discarded',  desc: 'Uploaded bank statements are analyzed and immediately discarded. Nothing is stored on our servers.' },
                { icon: '🔐', title: 'End-to-end encrypted',             desc: 'All data is encrypted in transit (TLS 1.3) and at rest. Your profile is private to you alone.' },
                { icon: '🇮🇳', title: 'Built for India, stored in India', desc: 'Your data stays on Indian servers (Supabase Mumbai region). Compliant with DPDPA 2023.' },
              ].map(item => (
                <motion.div key={item.title} variants={fadeUp}
                  style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: 16, background: 'rgba(255,255,255,0.02)', border: `1px solid ${T.border}`, borderRadius: 14 }}>
                  <span style={{ fontSize: 20, flexShrink: 0, marginTop: 2 }}>{item.icon}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: T.textPrimary, marginBottom: 4 }}>{item.title}</div>
                    <div style={{ fontSize: 12, color: T.textSecondary, lineHeight: 1.65 }}>{item.desc}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            <div style={{ textAlign: 'center', marginTop: 28 }}>
              <p style={{ fontSize: 12, color: T.textMuted }}>
                Questions about privacy? Email us at{' '}
                <a href="mailto:support@finhealth.ai" style={{ color: T.cyan, textDecoration: 'none' }}>support@finhealth.ai</a>
                {' '}— we respond within 24 hours.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── Final CTA ── */}
      <section style={{ padding: '80px 4vw', position: 'relative', zIndex: 2, textAlign: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at center, rgba(47,230,255,0.07) 0%, transparent 60%)` }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
        <Reveal style={{ position: 'relative', zIndex: 1 }}>
          <motion.div variants={fadeUp} style={{ maxWidth: 700, margin: '0 auto' }}>
            <h2 style={{ fontFamily: T.fontDisplay, fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 900, letterSpacing: '-0.04em', color: T.textPrimary, marginBottom: 16, lineHeight: 1.1 }}>
              88% of Indians expect more financial uncertainty.<br />Be the one who actually does something about it.
            </h2>
            <p style={{ color: T.textSecondary, fontSize: 16, marginBottom: 36, maxWidth: 540, margin: '0 auto 36px' }}>
              Upload any document — salary slip, bank statement, tax return. Get your FinHealth Score, your risks, and your action plan in under 60 seconds. No bank login. No CA required.
            </p>
            <a href="https://financialai-frontend-lime.vercel.app/quick-score" className="btn-primary" style={{ fontSize: 16, padding: '16px 36px', margin: '0 auto' }}>
              Check My Financial Health — Free <ChevronRight size={20} />
            </a>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, marginTop: 24, flexWrap: 'wrap' }}>
              {[[ShieldCheck, T.green, '100% Private'], [Award, T.cyan, 'No hidden fees'], [Shield, T.purple, 'No bank access']].map(([Icon, color, text], i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  {/* @ts-ignore */}
                  <Icon size={14} color={color} />
                  <span style={{ fontSize: 12, color: T.textSecondary }}>{text as string}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </Reveal>
      </section>

      {/* ── Footer ── */}
      <footer style={{ padding: '48px 4vw 32px', borderTop: `1px solid ${T.border}`, position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 36, maxWidth: 1100, margin: '0 auto 36px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <div style={{ width: 24, height: 24, borderRadius: 6, background: T.gradPrimary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Sparkles size={12} color="#fff" /></div>
              <span style={{ fontWeight: 700, background: T.gradPrimary, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>FinHealth AI</span>
            </div>
            <p style={{ fontSize: 12, color: T.textSecondary, lineHeight: 1.6, maxWidth: 220 }}>Your personal AI Financial Agent — monitors, detects, and guides. Built for India.</p>
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: T.textPrimary, letterSpacing: '0.08em', marginBottom: 14 }}>PLATFORM</div>
            {[['Dashboard', 'https://financialai-frontend-lime.vercel.app/app/dashboard'], ['Tools Hub', 'https://financialai-frontend-lime.vercel.app/app/tools'], ['AI Assistant', 'https://financialai-frontend-lime.vercel.app/app/ai'], ['Pricing', '#pricing']].map(([l, h]) => (
              <a key={l} href={h} style={{ display: 'block', fontSize: 12, color: T.textSecondary, marginBottom: 8, textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = T.textPrimary)}
                onMouseLeave={e => (e.currentTarget.style.color = T.textSecondary)}>{l}</a>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: T.textPrimary, letterSpacing: '0.08em', marginBottom: 14 }}>LEGAL</div>
            {[['Privacy Policy', '#'], ['Terms of Use', '#']].map(([l, h]) => (
              <a key={l} href={h} style={{ display: 'block', fontSize: 12, color: T.textSecondary, marginBottom: 8, textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = T.textPrimary)}
                onMouseLeave={e => (e.currentTarget.style.color = T.textSecondary)}>{l}</a>
            ))}
          </div>
        </div>
        <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 22, textAlign: 'center', fontSize: 11, color: T.textSecondary, maxWidth: 1100, margin: '0 auto' }}>
          © 2026 FinHealth AI. For informational purposes only. Not financial advice.
        </div>
      </footer>
    </div>
  );
}
