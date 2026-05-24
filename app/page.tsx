'use client';
import { useState, useEffect, useRef } from 'react';
import { AlertTriangle, ArrowRight, BarChart3, Bot, Calculator, CheckCircle, ChevronRight, Compass, Heart, Lightbulb, PieChart, Search, Shield, ShieldCheck, Sparkles, Star, Award, TrendingUp, Zap, Brain, Target, Wallet, Lock, Globe, Trash2, FileText, X } from 'lucide-react';
import { motion, useScroll, useInView, AnimatePresence } from 'framer-motion';

const T = {
  cyan:          "#2FE6FF",
  purple:        "#7A3CFF",
  green:         "#31E981",
  amber:         "#EF9F27",
  red:           "#FF5050",
  pageBg:        "#070A12",
  cardBg:        "#0D1526",
  textPrimary:   "#F2F5FF",
  textSecondary: "#9AA6BF",
  textMuted:     "rgba(255,255,255,0.3)",
  border:        "rgba(255,255,255,0.06)",
  borderMid:     "rgba(255,255,255,0.08)",
  gradPrimary:   "linear-gradient(135deg, #2FE6FF 0%, #7A3CFF 100%)",
  gradGreen:     "linear-gradient(135deg, #31E981 0%, #2FE6FF 100%)",
  fontDisplay:   "Bricolage Grotesque, sans-serif",
};

const fadeUp = { hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0, transition: { duration: 0.65 } } };
const stagger = { visible: { transition: { staggerChildren: 0.09 } } };

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

const TICKER_ITEMS = [
  "88% of Indians expect more financial uncertainty",
  "72% have never reviewed their finances — not once",
  "5.3% household savings rate — lowest in 50 years (RBI 2025)",
  "400M+ middle-class Indians with zero access to financial guidance",
];

function Ticker() {
  return (
    <div style={{ width: '100%', overflow: 'hidden', background: 'rgba(47,230,255,0.04)', borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}`, padding: '11px 0' }}>
      <motion.div animate={{ x: ['0%', '-50%'] }} transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
        style={{ display: 'flex', gap: 80, whiteSpace: 'nowrap' }}>
        {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
          <span key={i} style={{ fontSize: 12, color: T.textSecondary, display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            <span style={{ color: T.cyan, opacity: 0.5 }}>◆</span>{item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

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
          <div style={{ fontSize: 13, fontWeight: 700, color: T.textPrimary }}>Where every finance app sits — and where we don't</div>
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
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        @keyframes heroFade1 { from { opacity:0; transform:translateY(20px) } to { opacity:1; transform:translateY(0) } }
        @keyframes heroFade2 { from { opacity:0; transform:translateY(24px) } to { opacity:1; transform:translateY(0) } }
        @keyframes heroFade3 { from { opacity:0; transform:translateY(28px) } to { opacity:1; transform:translateY(0) } }
        .hero-fade-1 { animation: heroFade1 0.7s ease forwards; }
        .hero-fade-2 { animation: heroFade2 0.8s 0.15s ease both; }
        .hero-fade-3 { animation: heroFade3 0.8s 0.3s ease both; }
        .hero-fade-4 { animation: heroFade1 0.8s 0.45s ease both; opacity:0; }
        .btn-primary { background: linear-gradient(135deg, #2FE6FF 0%, #7A3CFF 100%); color:#fff; border:none; padding:13px 28px; border-radius:10px; font-size:14px; font-weight:700; cursor:pointer; display:inline-flex; align-items:center; gap:8px; transition:opacity 0.2s, transform 0.2s, box-shadow 0.2s; }
        .btn-primary:hover { opacity:0.88; transform:translateY(-2px); box-shadow: 0 0 28px rgba(47,230,255,0.3); }
        .btn-secondary { background:transparent; color:${T.textSecondary}; border:1px solid ${T.border}; padding:13px 28px; border-radius:10px; font-size:14px; font-weight:500; cursor:pointer; transition:all 0.2s; }
        .btn-secondary:hover { border-color:rgba(255,255,255,0.22); color:${T.textPrimary}; }
        .card-hover { background:${T.cardBg}; border:1px solid ${T.border}; border-radius:14px; transition:border-color 0.25s, box-shadow 0.25s, transform 0.25s; }
        .card-hover:hover { border-color:rgba(47,230,255,0.22); box-shadow:0 0 28px rgba(47,230,255,0.08); transform:translateY(-3px); }
        .tool-card { background:${T.cardBg}; border:1px solid ${T.border}; border-radius:12px; padding:16px 18px; transition:all 0.22s; text-decoration:none; display:block; }
        .tool-card:hover { border-color:rgba(47,230,255,0.28); box-shadow:0 0 20px rgba(47,230,255,0.07); transform:translateY(-3px); }
        ::-webkit-scrollbar { width:5px } ::-webkit-scrollbar-track { background:${T.pageBg} } ::-webkit-scrollbar-thumb { background:rgba(255,255,255,0.08); border-radius:3px }
      `}</style>

      <CursorGlow />
      <Background />
      <ParticleField />
      <motion.div style={{ scaleX: scrollYProgress, position: 'fixed', top: 0, left: 0, right: 0, height: 2, background: T.gradPrimary, transformOrigin: '0%', zIndex: 100 }} />

      {/* ── Navbar ── */}
      <motion.nav initial={{ y: -64 }} animate={{ y: 0 }} transition={{ duration: 0.55 }}
        style={{ position: 'fixed', top: 2, left: 0, right: 0, zIndex: 99, height: 60, padding: '0 4vw', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: scrolled ? 'rgba(7,10,18,0.88)' : 'transparent', backdropFilter: scrolled ? 'blur(18px)' : 'none', borderBottom: scrolled ? `1px solid ${T.border}` : 'none', transition: 'all 0.3s ease' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.55 }}
            style={{ width: 34, height: 34, borderRadius: 9, background: T.gradPrimary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Heart size={16} color="#fff" />
          </motion.div>
          <span style={{ fontSize: 19, fontWeight: 800, letterSpacing: '-0.4px', fontFamily: T.fontDisplay }}>
            <span style={{ color: T.cyan }}>FinHealth</span><span style={{ color: T.red }}>360</span>
          </span>
        </div>
        <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
          {['Features', 'Tools', 'Pricing', 'Security'].map(l => (
            <button key={l} onClick={() => document.getElementById(l.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
              style={{ background: 'none', border: 'none', color: T.textSecondary, cursor: 'pointer', fontSize: 13, fontWeight: 500, transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = T.textPrimary)} onMouseLeave={e => (e.currentTarget.style.color = T.textSecondary)}>{l}</button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn-secondary" style={{ padding: '7px 16px', fontSize: 13 }} onClick={() => window.location.href = 'https://financialai-frontend-lime.vercel.app/login'}>Login</button>
          <button className="btn-primary" style={{ padding: '7px 16px', fontSize: 13 }} onClick={() => window.location.href = 'https://financialai-frontend-lime.vercel.app/quick-score'}>Start Free</button>
        </div>
      </motion.nav>

      {/* ── Hero ── */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '100px 4vw 60px', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '3rem', flexWrap: 'wrap', width: '100%' }}>
          <div style={{ maxWidth: 580, flex: '1 1 340px' }}>
            <div className="hero-fade-1" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 999, background: 'rgba(47,230,255,0.08)', border: '1px solid rgba(47,230,255,0.22)', marginBottom: 22 }}>
              <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }}
                style={{ width: 6, height: 6, borderRadius: '50%', background: T.cyan, display: 'inline-block' }} />
              <span style={{ fontSize: 11, fontWeight: 600, color: T.cyan, letterSpacing: '0.04em' }}>Financial Intelligence Platform · Built for India</span>
            </div>

            <h1 className="hero-fade-2" style={{ fontFamily: T.fontDisplay, fontSize: 'clamp(2.6rem, 5vw, 4rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.07, marginBottom: 20 }}>
              <span style={{ color: T.textPrimary }}>Your Entire Financial Life.</span>
              <br />
              <span style={{ background: T.gradPrimary, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Managed Intelligently.</span>
            </h1>

            <p className="hero-fade-3" style={{ fontSize: 16, color: T.textSecondary, lineHeight: 1.75, maxWidth: 500, marginBottom: 14 }}>
              FinHealth360 continuously analyzes your finances, detects risks, optimizes decisions, and guides your next move — powered by autonomous intelligence built specifically for India.
            </p>

            <p className="hero-fade-3" style={{ fontSize: 14, color: T.textMuted, fontStyle: 'italic', marginBottom: 32 }}>
              "The wealthy have advisors. Everyone else has confusion. Until now."
            </p>

            <div className="hero-fade-4" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 28 }}>
              <button className="btn-primary" onClick={() => window.location.href = 'https://financialai-frontend-lime.vercel.app/quick-score'}>
                Analyze My Finances <ArrowRight size={15} />
              </button>
              <button className="btn-secondary" onClick={() => window.location.href = 'https://financialai-frontend-lime.vercel.app/app/dashboard'}>
                Explore Platform
              </button>
            </div>

            <div className="hero-fade-4" style={{ display: 'flex', flexWrap: 'wrap', gap: 18 }}>
              {[['✔ No bank login', T.green], ['✔ Zero commissions', T.cyan], ['✔ India-focused', T.purple], ['✔ Autonomous intelligence', T.amber]].map(([t, c]) => (
                <span key={t as string} style={{ fontSize: 12, color: c as string, fontWeight: 600 }}>{t as string}</span>
              ))}
            </div>
          </div>

          {/* Hero dashboard card */}
          <motion.div initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
            style={{ flex: '1 1 380px', maxWidth: 460, position: 'relative' }}>
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4.5, delay: 0.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ position: 'absolute', top: -18, left: -32, background: 'rgba(13,21,38,0.96)', border: `1px solid rgba(49,233,129,0.3)`, borderRadius: 11, padding: '8px 13px', backdropFilter: 'blur(12px)', zIndex: 10 }}>
              <div style={{ fontSize: 9, color: T.textSecondary }}>Net Worth</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: T.green }}>₹24.6L</div>
            </motion.div>
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 5.5, delay: 1.2, repeat: Infinity, ease: 'easeInOut' }}
              style={{ position: 'absolute', bottom: 28, right: -28, background: 'rgba(13,21,38,0.96)', border: `1px solid rgba(122,60,255,0.3)`, borderRadius: 11, padding: '8px 13px', backdropFilter: 'blur(12px)', zIndex: 10 }}>
              <div style={{ fontSize: 9, color: T.textSecondary }}>Monthly SIP</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: T.purple }}>₹0 ⚠️</div>
            </motion.div>
            <motion.div animate={{ y: [0, -7, 0] }} transition={{ duration: 3.8, delay: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              style={{ position: 'absolute', top: '38%', right: -32, background: 'rgba(13,21,38,0.96)', border: `1px solid rgba(47,230,255,0.3)`, borderRadius: 11, padding: '8px 13px', backdropFilter: 'blur(12px)', zIndex: 10 }}>
              <div style={{ fontSize: 9, color: T.textSecondary }}>Tax Saved</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: T.cyan }}>₹18K</div>
            </motion.div>
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              style={{ background: 'rgba(7,10,18,0.7)', backdropFilter: 'blur(8px)', border: `1px solid rgba(47,230,255,0.14)`, borderRadius: 18, padding: '22px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: T.gradPrimary }} />
              <motion.div animate={{ top: ['-2px', '102%'] }} transition={{ duration: 3.8, repeat: Infinity, ease: 'linear', repeatDelay: 2.5 }}
                style={{ position: 'absolute', left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, rgba(47,230,255,0.45), transparent)', zIndex: 3, pointerEvents: 'none' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
                <div>
                  <div style={{ fontSize: 11, color: T.textSecondary }}>Financial Intelligence Score</div>
                  <div style={{ fontSize: 10, color: T.textMuted }}>Live · Updated now</div>
                </div>
                <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity }}
                  style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(49,233,129,0.1)', border: '1px solid rgba(49,233,129,0.28)', borderRadius: 20, padding: '3px 9px' }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: T.green }} />
                  <span style={{ fontSize: 9, color: T.green, fontWeight: 600 }}>INTELLIGENCE ACTIVE</span>
                </motion.div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 18, position: 'relative' }}>
                <div style={{ position: 'relative', width: 110, height: 110 }}>
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                    style={{ position: 'absolute', inset: -14, borderRadius: '50%' }}>
                    <div style={{ position: 'absolute', top: 0, left: '50%', width: 7, height: 7, borderRadius: '50%', background: T.cyan, boxShadow: `0 0 8px ${T.cyan}`, marginLeft: -3.5, marginTop: -3.5 }} />
                  </motion.div>
                  <motion.div animate={{ rotate: -360 }} transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                    style={{ position: 'absolute', inset: -9, borderRadius: '50%' }}>
                    <div style={{ position: 'absolute', bottom: 0, left: '50%', width: 5, height: 5, borderRadius: '50%', background: T.purple, boxShadow: `0 0 7px ${T.purple}`, marginLeft: -2.5, marginBottom: -2.5 }} />
                  </motion.div>
                  {[0, 1].map(i => (
                    <motion.div key={i} animate={{ scale: [1, 1.65], opacity: [0.38, 0] }} transition={{ duration: 2.5, delay: i * 1.2, repeat: Infinity }}
                      style={{ position: 'absolute', inset: -7, borderRadius: '50%', border: `1px solid ${T.cyan}` }} />
                  ))}
                  <svg width="110" height="110" style={{ transform: 'rotate(-90deg)' }}>
                    <circle cx="55" cy="55" r="46" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="7" />
                    <motion.circle cx="55" cy="55" r="46" fill="none" stroke="url(#scoreG)" strokeWidth="7" strokeLinecap="round"
                      initial={{ strokeDasharray: '0 289' }} animate={{ strokeDasharray: '208 289' }} transition={{ duration: 1.4, delay: 0.5 }} />
                    <defs>
                      <linearGradient id="scoreG" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor={T.cyan} /><stop offset="100%" stopColor={T.purple} />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }} style={{ fontSize: 26, fontWeight: 800, color: '#fff', fontFamily: T.fontDisplay }}>72</motion.div>
                    <div style={{ fontSize: 10, color: T.textSecondary }}>/100</div>
                  </div>
                </div>
              </div>
              <div style={{ marginBottom: 14 }}>
                {([['Cash Flow', 78, T.green], ['Investments', 65, T.cyan], ['Insurance', 55, T.amber], ['Debt', 82, T.green]] as [string, number, string][]).map(([label, pct, color], i) => (
                  <div key={label} style={{ marginBottom: 7 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: T.textSecondary, marginBottom: 3 }}>
                      <span>{label}</span><span style={{ color }}>{pct}%</span>
                    </div>
                    <div style={{ height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.05)' }}>
                      <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 1, delay: 0.9 + i * 0.1 }}
                        style={{ height: '100%', borderRadius: 2, background: color, boxShadow: `0 0 6px ${color}` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 10, color: T.textMuted, marginBottom: 7, fontWeight: 600, letterSpacing: '0.06em' }}>LIVE INTELLIGENCE ALERTS</div>
              {[['🚨', 'No SIP detected — wealth creation at risk', T.red], ['💡', '₹18,000 deduction opportunity found', T.amber]].map(([icon, text, color], i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.3 + i * 0.18 }}
                  style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '7px 9px', background: `${color as string}08`, border: `1px solid ${color as string}20`, borderRadius: 7, marginBottom: 5 }}>
                  <span style={{ fontSize: 11 }}>{icon as string}</span>
                  <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.58)' }}>{text as string}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <div style={{ position: 'relative', zIndex: 2 }}><Ticker /></div>

      {/* ── Emotional hook ── */}
      <section style={{ padding: '80px 4vw', position: 'relative', zIndex: 2 }}>
        <Reveal>
          <motion.div variants={stagger} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
            {[
              { icon: AlertTriangle, color: T.red,    stat: '88%',  label: 'of Indians expect greater financial uncertainty in the next 5 years' },
              { icon: Search,        color: T.amber,  stat: '72%',  label: 'have never reviewed their finances — not once in their adult life' },
              { icon: BarChart3,     color: T.cyan,   stat: '5.3%', label: 'household savings rate — lowest in 50 years (RBI 2025)' },
              { icon: Lightbulb,     color: T.purple, stat: '400M', label: 'middle-class Indians with zero access to financial guidance' },
            ].map(({ icon: Icon, color, stat, label }) => (
              <motion.div key={stat} variants={fadeUp} style={{ background: T.cardBg, border: `1px solid ${T.border}`, borderTop: `2px solid ${color}`, borderRadius: 13, padding: '20px 18px' }}>
                <Icon size={18} color={color} style={{ marginBottom: 10 }} />
                <div style={{ fontSize: 28, fontWeight: 900, color, fontFamily: T.fontDisplay, marginBottom: 5 }}>{stat}</div>
                <div style={{ fontSize: 12, color: T.textSecondary, lineHeight: 1.55 }}>{label}</div>
              </motion.div>
            ))}
          </motion.div>
        </Reveal>
      </section>

      {/* ── Emotional storytelling ── */}
      <section style={{ padding: '60px 4vw', position: 'relative', zIndex: 2 }}>
        <Reveal>
          <motion.div variants={stagger} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {[
              { quote: "Most people discover financial problems years too late.", sub: "By then, the cost of inaction compounds just like interest." },
              { quote: "Your finances shouldn't depend on memory, spreadsheets, or luck.", sub: "They should run on intelligence — continuous, autonomous, personalized." },
              { quote: "Most Indians were never taught how money actually works.", sub: "FinHealth360 fills that gap — without jargon, without judgment." },
            ].map(({ quote, sub }) => (
              <motion.div key={quote} variants={fadeUp} style={{ padding: '28px 24px', background: `${T.purple}06`, border: `1px solid ${T.purple}18`, borderRadius: 14, borderLeft: `3px solid ${T.purple}` }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: T.textPrimary, lineHeight: 1.5, marginBottom: 10, fontFamily: T.fontDisplay }}>"{quote}"</div>
                <div style={{ fontSize: 13, color: T.textSecondary, lineHeight: 1.65 }}>{sub}</div>
              </motion.div>
            ))}
          </motion.div>
        </Reveal>
      </section>

      {/* ── Positioning map ── */}
      <section style={{ padding: '80px 4vw', position: 'relative', zIndex: 2 }}>
        <Reveal>
          <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 13px', borderRadius: 999, background: 'rgba(47,230,255,0.07)', border: `1px solid rgba(47,230,255,0.2)`, marginBottom: 14 }}>
              <Zap size={11} color={T.cyan} />
              <span style={{ fontSize: 11, fontWeight: 600, color: T.cyan }}>Market Reality</span>
            </div>
            <h2 style={{ fontFamily: T.fontDisplay, fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, letterSpacing: '-0.03em', color: T.textPrimary, marginBottom: 10 }}>
              The gap nobody filled — until now
            </h2>
          </motion.div>
          <motion.div variants={fadeUp}><PositioningMap /></motion.div>
        </Reveal>
      </section>

      {/* ── Why We Win ── */}
      <section style={{ padding: '80px 4vw', position: 'relative', zIndex: 2 }}>
        <Reveal>
          <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 13px', borderRadius: 999, background: `rgba(49,233,129,0.07)`, border: `1px solid rgba(49,233,129,0.22)`, marginBottom: 14 }}>
              <Award size={11} color={T.green} />
              <span style={{ fontSize: 11, fontWeight: 600, color: T.green }}>Why We Win</span>
            </div>
            <h2 style={{ fontFamily: T.fontDisplay, fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, letterSpacing: '-0.03em', color: T.textPrimary, marginBottom: 10 }}>
              Not another dashboard.
            </h2>
            <p style={{ color: T.textSecondary, fontSize: 15 }}>Traditional apps track. FinHealth360 thinks.</p>
          </motion.div>
          <motion.div variants={fadeUp} style={{ maxWidth: 760, margin: '0 auto', background: T.cardBg, border: `1px solid ${T.borderMid}`, borderRadius: 18, overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
              <div style={{ padding: '16px 24px', background: 'rgba(255,255,255,0.02)', borderBottom: `1px solid ${T.border}`, fontSize: 12, fontWeight: 700, color: T.textMuted, letterSpacing: '0.06em' }}>TRADITIONAL APPS</div>
              <div style={{ padding: '16px 24px', background: `${T.green}06`, borderBottom: `1px solid ${T.border}`, borderLeft: `1px solid ${T.border}`, fontSize: 12, fontWeight: 700, color: T.green, letterSpacing: '0.06em' }}>FINHEALTH360</div>
            </div>
            {[
              ['Show balances', 'Explain exactly what to do next'],
              ['Passive tracking', 'Active intelligence, continuous monitoring'],
              ['Generic dashboards', 'Personalized analysis for your numbers'],
              ['Require manual review', 'Autonomous — works while you sleep'],
              ['Fragmented tools', 'Unified financial operating system'],
              ['React to problems', 'Prevent problems before they compound'],
            ].map(([left, right], i) => (
              <motion.div key={left} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }} viewport={{ once: true }}
                style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: i < 5 ? `1px solid ${T.border}` : 'none' }}>
                <div style={{ padding: '14px 24px', fontSize: 13, color: T.textSecondary, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <X size={12} color={T.red} style={{ flexShrink: 0 }} />{left}
                </div>
                <div style={{ padding: '14px 24px', fontSize: 13, color: T.textPrimary, borderLeft: `1px solid ${T.border}`, background: `${T.green}03`, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <CheckCircle size={12} color={T.green} style={{ flexShrink: 0 }} />{right}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Reveal>
      </section>

      {/* ── Features ── */}
      <section id="features" style={{ padding: '80px 4vw', position: 'relative', zIndex: 2 }}>
        <Reveal>
          <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 13px', borderRadius: 999, background: 'rgba(122,60,255,0.07)', border: `1px solid rgba(122,60,255,0.22)`, marginBottom: 14 }}>
              <Sparkles size={11} color={T.purple} />
              <span style={{ fontSize: 11, fontWeight: 600, color: T.purple }}>Intelligence Modules</span>
            </div>
            <h2 style={{ fontFamily: T.fontDisplay, fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, letterSpacing: '-0.03em', color: T.textPrimary, marginBottom: 10 }}>
              Your Personal Finance Command Center
            </h2>
            <p style={{ color: T.textSecondary, maxWidth: 480, margin: '0 auto', fontSize: 15, lineHeight: 1.7 }}>
              Not a calculator collection. An autonomous intelligence layer that monitors, analyzes, and acts on your behalf — continuously.
            </p>
          </motion.div>
          <motion.div variants={stagger} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 18 }}>
            {[
              { icon: Heart,      color: T.cyan,   tag: 'Core',              title: 'Financial Health Intelligence', desc: 'Scores every dimension of your financial life — cashflow, wealth, protection, debt — and tracks changes automatically.' },
              { icon: TrendingUp, color: '#2D7BFF', tag: 'Wealth Intelligence', title: 'Investment Analysis',          desc: 'Detects underperforming SIPs, portfolio gaps, and rebalancing opportunities. Not generic — specific to your holdings.' },
              { icon: Shield,     color: T.purple, tag: 'Protection Intelligence', title: 'Insurance Analyzer',        desc: 'Uncovers hidden charges, calculates real IRR on policies, and flags instruments draining your wealth silently.' },
              { icon: PieChart,   color: T.amber,  tag: 'Tax Intelligence',   title: 'Tax Optimization Engine',       desc: 'Compares regimes, finds every deduction under 80C, 80D, HRA, NPS. Never leave money on the table again.' },
              { icon: Calculator, color: T.green,  tag: 'Debt Intelligence',  title: 'Loan Analysis',                 desc: 'Flags dangerous EMI-to-income ratios, compares real loan costs, and builds the optimal prepayment strategy.' },
              { icon: Brain,      color: T.cyan,   tag: 'Autonomous Agent',   title: 'AI Financial Copilot',          desc: 'Works 24/7. Monitors proactively, sends alerts before problems grow, guides decisions with context — not generic tips.' },
            ].map(({ icon: Icon, color, tag, title, desc }) => (
              <motion.div key={title} variants={fadeUp} className="card-hover" style={{ padding: 22 }}>
                <div style={{ width: 40, height: 40, borderRadius: 11, background: `${color}14`, border: `1px solid ${color}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                  <Icon size={20} color={color} />
                </div>
                <div style={{ fontSize: 10, color, fontWeight: 700, letterSpacing: '0.08em', marginBottom: 6 }}>{tag.toUpperCase()}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: T.textPrimary, marginBottom: 7 }}>{title}</div>
                <div style={{ fontSize: 12, color: T.textSecondary, lineHeight: 1.65 }}>{desc}</div>
              </motion.div>
            ))}
          </motion.div>
        </Reveal>
      </section>

      {/* ── Cinematic AI Agent ── */}
      <section style={{ padding: '80px 4vw', position: 'relative', zIndex: 2 }}>
        <Reveal>
          <motion.div variants={fadeUp} style={{ maxWidth: 900, margin: '0 auto', background: T.cardBg, border: `1px solid rgba(122,60,255,0.25)`, borderRadius: 24, padding: '52px 44px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: T.gradPrimary }} />
            <motion.div animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 4, repeat: Infinity }}
              style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 80% 20%, rgba(122,60,255,0.08) 0%, transparent 60%)', pointerEvents: 'none' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '3rem', flexWrap: 'wrap' }}>
              <div style={{ flex: '1 1 320px' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 13px', borderRadius: 999, background: 'rgba(122,60,255,0.1)', border: `1px solid rgba(122,60,255,0.3)`, marginBottom: 18 }}>
                  <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }} transition={{ duration: 1.5, repeat: Infinity }}
                    style={{ width: 7, height: 7, borderRadius: '50%', background: T.green, boxShadow: `0 0 8px ${T.green}` }} />
                  <span style={{ fontSize: 11, fontWeight: 600, color: T.purple }}>Autonomous Intelligence · Always Active</span>
                </div>
                <h2 style={{ fontFamily: T.fontDisplay, fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', fontWeight: 800, letterSpacing: '-0.03em', color: T.textPrimary, marginBottom: 16, lineHeight: 1.2 }}>
                  Your financial copilot<br /><span style={{ background: T.gradPrimary, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>never sleeps.</span>
                </h2>
                <p style={{ fontSize: 15, color: T.textSecondary, lineHeight: 1.75, marginBottom: 24 }}>
                  While you work, sleep, and live — your intelligence layer continuously scans your finances, detects emerging risks, and delivers precise actions. Not reminders. Decisions.
                </p>
                {[
                  ['Continuous surveillance', 'Monitoring every dimension 24/7 — not just when you log in'],
                  ['Proactive intervention', 'Alerted before problems become expensive mistakes'],
                  ['Precision guidance', 'Specific to YOUR numbers — not recycled generic advice'],
                  ['Fully autonomous', 'Operates independently — zero manual input required'],
                ].map(([t, d]) => (
                  <div key={t as string} style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
                    <div style={{ width: 20, height: 20, borderRadius: '50%', background: `${T.purple}20`, border: `1px solid ${T.purple}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                      <CheckCircle size={11} color={T.purple} />
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: T.textPrimary, marginBottom: 1 }}>{t}</div>
                      <div style={{ fontSize: 12, color: T.textSecondary }}>{d}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ flex: '1 1 300px', maxWidth: 340 }}>
                <div style={{ background: 'rgba(7,10,18,0.6)', border: `1px solid rgba(122,60,255,0.2)`, borderRadius: 16, padding: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}
                      style={{ width: 8, height: 8, borderRadius: '50%', background: T.green, boxShadow: `0 0 10px ${T.green}` }} />
                    <span style={{ fontSize: 12, fontWeight: 700, color: T.textPrimary }}>Live Intelligence Feed</span>
                  </div>
                  {[
                    { icon: '🚨', text: 'Emergency fund gap detected — 1.2 months only', color: T.red, delay: 0 },
                    { icon: '🚨', text: 'No SIP running — compound growth at risk', color: T.red, delay: 0.4 },
                    { icon: '💡', text: '₹18,000 deduction opportunity — 80D unclaimed', color: T.amber, delay: 0.8 },
                    { icon: '⚠️', text: 'EMI burden at 38% — approaching danger zone', color: T.amber, delay: 1.2 },
                    { icon: '✅', text: 'Health coverage renewed — protection adequate', color: T.green, delay: 1.6 },
                  ].map((a, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: a.delay }} viewport={{ once: true }}
                      style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '9px 11px', background: `${a.color}07`, border: `1px solid ${a.color}1A`, borderRadius: 9, marginBottom: 7 }}>
                      <span style={{ fontSize: 12, flexShrink: 0 }}>{a.icon}</span>
                      <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)', lineHeight: 1.5 }}>{a.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </Reveal>
      </section>

      {/* ── Tools as Intelligence Ecosystem ── */}
      <section id="tools" style={{ padding: '80px 4vw', position: 'relative', zIndex: 2 }}>
        <Reveal>
          <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: 52 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 13px', borderRadius: 999, background: 'rgba(47,230,255,0.07)', border: `1px solid rgba(47,230,255,0.2)`, marginBottom: 14 }}>
              <Zap size={11} color={T.cyan} />
              <span style={{ fontSize: 11, fontWeight: 600, color: T.cyan }}>Intelligence Toolkit</span>
            </div>
            <h2 style={{ fontFamily: T.fontDisplay, fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, letterSpacing: '-0.03em', color: T.textPrimary, marginBottom: 10 }}>
              20+ Intelligence Tools. One Platform.
            </h2>
            <p style={{ color: T.textSecondary, maxWidth: 460, margin: '0 auto', fontSize: 15 }}>
              Every analyzer, calculator and insight — personalized to your income, goals, and situation.
            </p>
          </motion.div>
          {[
            { cat: 'Wealth Intelligence', color: '#2D7BFF', icon: TrendingUp, tools: [['SIP Calculator','Maturity value and wealth trajectory','/app/investments'],['Portfolio Analyzer','Performance, allocation and gap analysis','/app/investments'],['Return Calculator','CAGR and annualized return calculation','/app/investments'],['Risk Analysis','Portfolio risk scoring and rebalancing signals','/app/investments']] },
            { cat: 'Tax Intelligence',    color: T.cyan,   icon: PieChart,   tools: [['Tax Calculator','Old vs new regime — find what saves more','/app/tax'],['Deduction Optimizer','80C, 80D, HRA, NPS — never miss a rupee','/app/tax']] },
            { cat: 'Protection Intelligence', color: T.purple, icon: Shield, tools: [['Policy Analyzer','Real IRR and hidden charges revealed','/app/insurance'],['IRR Calculator','True return on any insurance instrument','/app/insurance'],['Coverage Checker','Life and health adequacy assessment','/app/insurance']] },
            { cat: 'Debt Intelligence',   color: T.amber,  icon: Calculator, tools: [['EMI Calculator','Home, car or personal loan EMI','/app/loans'],['Loan Comparison','Real cost comparison across offers','/app/loans'],['Prepayment Strategy','Optimal plan to reduce interest burden','/app/loans']] },
            { cat: 'Planning Intelligence', color: T.green, icon: Compass,  tools: [['Retirement Planner','Corpus gap and monthly savings needed','/app/planning'],['Goal Planning','Goals with smart milestone projections','/app/planning'],['Wealth Projection','Net worth trajectory over 10–30 years','/app/planning']] },
            { cat: 'AI Copilot',          color: T.purple, icon: Brain,     tools: [['Financial Assistant','Chat that already knows your numbers','/app/ai'],['Report Explainer','Any document → plain-English intelligence','/app/ai']] },
          ].map(({ cat, color, icon: Icon, tools }) => (
            <motion.div key={cat} variants={fadeUp} style={{ marginBottom: 36 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <div style={{ width: 28, height: 28, borderRadius: 7, background: `${color}14`, border: `1px solid ${color}28`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={14} color={color} />
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color, letterSpacing: '0.06em' }}>{cat.toUpperCase()}</span>
                <div style={{ flex: 1, height: 1, background: T.border }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: 11 }}>
                {tools.map(([title, desc, href]) => (
                  <a key={title as string} href={`https://financialai-frontend-lime.vercel.app${href}`} className="tool-card">
                    <div style={{ fontSize: 13, fontWeight: 600, color: T.textPrimary, marginBottom: 3 }}>{title}</div>
                    <div style={{ fontSize: 11, color: T.textSecondary, marginBottom: 9 }}>{desc}</div>
                    <div style={{ fontSize: 11, color, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 3 }}>Explore <ChevronRight size={10} /></div>
                  </a>
                ))}
              </div>
            </motion.div>
          ))}
          <motion.div variants={fadeUp} style={{ textAlign: 'center', marginTop: 36 }}>
            <a href="https://financialai-frontend-lime.vercel.app/app/tools" className="btn-primary" style={{ textDecoration: 'none' }}>
              Explore All Tools <ArrowRight size={15} />
            </a>
          </motion.div>
        </Reveal>
      </section>

      {/* ── How It Works ── */}
      <section style={{ padding: '80px 4vw', position: 'relative', zIndex: 2 }}>
        <Reveal>
          <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 13px', borderRadius: 999, background: 'rgba(49,233,129,0.07)', border: `1px solid rgba(49,233,129,0.22)`, marginBottom: 14 }}>
              <Sparkles size={11} color={T.green} />
              <span style={{ fontSize: 11, fontWeight: 600, color: T.green }}>How It Works</span>
            </div>
            <h2 style={{ fontFamily: T.fontDisplay, fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, letterSpacing: '-0.03em', color: T.textPrimary }}>
              From chaos to clarity in 60 seconds
            </h2>
          </motion.div>
          <motion.div variants={stagger} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 22 }}>
            {[
              { n: '01', title: 'Upload any document', desc: 'Salary slip, bank statement, tax return, insurance policy — any PDF. No formatting, no bank login, no friction.' },
              { n: '02', title: 'Intelligence activates', desc: 'Your platform scores every dimension — cashflow, wealth, protection, debt — instantly. No setup required.' },
              { n: '03', title: 'Receive your action plan', desc: 'Not "save more." Specific, ranked actions for your exact situation. Updated automatically as you act.' },
            ].map((s, i) => (
              <motion.div key={s.n} variants={fadeUp} className="card-hover" style={{ padding: 24, position: 'relative', overflow: 'hidden' }}>
                <motion.div animate={{ opacity: [0.25, 0.55, 0.25] }} transition={{ duration: 3.5, delay: i * 0.6, repeat: Infinity }}
                  style={{ position: 'absolute', top: 0, right: 0, width: 100, height: 100, background: `radial-gradient(ellipse, ${T.cyan}0D 0%, transparent 70%)` }} />
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: `${T.cyan}12`, border: `1px solid ${T.cyan}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18, fontSize: 13, fontWeight: 800, color: T.cyan, fontFamily: T.fontDisplay }}>{s.n}</div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: T.textPrimary, marginBottom: 9 }}>{s.title}</h3>
                <p style={{ fontSize: 12, color: T.textSecondary, lineHeight: 1.65 }}>{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </Reveal>
      </section>

      {/* ── Pricing (premium) ── */}
      <section id="pricing" style={{ padding: '80px 4vw', position: 'relative', zIndex: 2 }}>
        <Reveal>
          <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: 52 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 13px', borderRadius: 999, background: 'rgba(49,233,129,0.07)', border: `1px solid rgba(49,233,129,0.22)`, marginBottom: 14 }}>
              <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }} style={{ width: 6, height: 6, borderRadius: '50%', background: T.green, display: 'inline-block' }} />
              <span style={{ fontSize: 11, fontWeight: 600, color: T.green }}>Pricing</span>
            </div>
            <h2 style={{ fontFamily: T.fontDisplay, fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, letterSpacing: '-0.03em', color: T.textPrimary, marginBottom: 10 }}>
              Start free. Scale when ready.
            </h2>
            <p style={{ color: T.textSecondary, fontSize: 14 }}>No lock-in. 7-day refund on all paid plans.</p>
          </motion.div>
          <motion.div variants={stagger} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 18, alignItems: 'start' }}>
            {[
              { name: 'Starter',    price: '₹0',   sub: 'Forever free',              color: T.textSecondary, features: ['Financial Intelligence Score', 'Basic tools (SIP, EMI)', 'AI copilot (10/day)', 'Basic insights'], cta: 'Start Free', popular: false },
              { name: 'Pro',        price: '₹99',  sub: '/month · cancel anytime',   color: T.cyan,          features: ['Everything in Starter', '5 intelligence reports/month', 'Portfolio & tax analysis', 'Goal-based planning', 'AI copilot (20/day)'], cta: 'Upgrade to Pro', popular: true },
              { name: 'Wealth',     price: '₹499', sub: '/month · cancel anytime',   color: T.green,         features: ['Everything in Pro', 'Unlimited intelligence reports', 'Weekly personalized insights', 'Full tax optimization', 'PDF exports', 'Advisor access'], cta: 'Get Wealth', popular: false },
              { name: 'Autonomous', price: '₹999', sub: '/month · fully autonomous', color: T.purple,        features: ['Everything in Wealth', 'Daily autonomous analysis', 'Proactive intelligence alerts', 'Operates while offline', 'Weekly intelligence roadmap', 'Continuous risk monitoring', 'Full memory & context'], cta: 'Go Autonomous', popular: false },
            ].map(plan => (
              <motion.div key={plan.name} variants={fadeUp} whileHover={{ y: -7 }}
                style={{ background: plan.popular ? `${T.cyan}07` : T.cardBg, border: `1px solid ${plan.popular ? T.cyan + '45' : T.border}`, borderRadius: 18, padding: 24, position: 'relative', overflow: 'hidden', boxShadow: plan.popular ? `0 0 36px ${T.cyan}12` : 'none' }}>
                {plan.popular && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: T.gradPrimary }} />}
                {plan.popular && (
                  <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}
                    style={{ position: 'absolute', top: 14, right: 14, background: T.gradPrimary, color: '#fff', fontSize: 9, fontWeight: 700, padding: '3px 9px', borderRadius: 999 }}>Most Popular</motion.div>
                )}
                <div style={{ fontSize: 10, fontWeight: 700, color: plan.color, letterSpacing: '0.08em', marginBottom: 10 }}>{plan.name.toUpperCase()}</div>
                <div style={{ fontSize: 34, fontWeight: 900, color: T.textPrimary, marginBottom: 3, fontFamily: T.fontDisplay }}>{plan.price}</div>
                <div style={{ fontSize: 11, color: T.textSecondary, marginBottom: 22 }}>{plan.sub}</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 22px', display: 'flex', flexDirection: 'column', gap: 9 }}>
                  {plan.features.map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 7, fontSize: 12, color: 'rgba(255,255,255,0.68)' }}>
                      <CheckCircle size={12} color={plan.color} style={{ flexShrink: 0, marginTop: 1 }} />{f}
                    </li>
                  ))}
                </ul>
                <motion.button whileHover={{ opacity: 0.88, scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  onClick={() => window.location.href = 'https://financialai-frontend-lime.vercel.app/quick-score'}
                  style={{ width: '100%', padding: '11px 0', borderRadius: 9, border: plan.popular ? 'none' : `1px solid ${plan.color}38`, background: plan.popular ? T.gradPrimary : 'transparent', color: plan.popular ? '#fff' : plan.color, cursor: 'pointer', fontSize: 13, fontWeight: 700 }}>
                  {plan.cta}
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </Reveal>
      </section>

      {/* ── Testimonials ── */}
      <section style={{ padding: '80px 4vw', position: 'relative', zIndex: 2 }}>
        <Reveal>
          <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: 44 }}>
            <h2 style={{ fontFamily: T.fontDisplay, fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', fontWeight: 800, letterSpacing: '-0.03em', color: T.textPrimary }}>
              Real people. Real clarity.
            </h2>
          </motion.div>
          <motion.div variants={stagger} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: 18 }}>
            {[
              { name: 'Rohan M.', role: 'Software Engineer, Pune', avatar: 'RM', color: T.cyan, stars: 5, text: 'I always knew I should track my finances but never did. FinHealth360 gave me a score in 60 seconds and told me exactly what was wrong — my EMI ratio was 48%, way too high. Fixed it in 3 months.' },
              { name: 'Priya S.', role: 'Product Manager, Bangalore', avatar: 'PS', color: T.green, stars: 5, text: 'Finally something built for Indian salaries. It understands SIPs, NPS, HRA — not just US 401k stuff. The tax analysis alone saved me ₹18,000 this year.' },
              { name: 'Amit K.', role: 'CA, Mumbai', avatar: 'AK', color: T.purple, stars: 5, text: "I recommend this to clients who can't afford a full advisory session. It does the financial health check properly — scoring, red flags, and action steps. The intelligence layer is solid." },
            ].map(r => (
              <motion.div key={r.name} variants={fadeUp} whileHover={{ y: -5, boxShadow: '0 16px 40px rgba(0,0,0,0.3)' }} className="card-hover" style={{ padding: 22 }}>
                <div style={{ display: 'flex', gap: 3, marginBottom: 14 }}>
                  {Array.from({ length: r.stars }).map((_, i) => <Star key={i} size={12} fill={T.amber} color={T.amber} />)}
                </div>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.62)', lineHeight: 1.72, marginBottom: 18 }}>"{r.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, borderTop: `1px solid ${T.border}`, paddingTop: 14 }}>
                  <div style={{ width: 34, height: 34, borderRadius: '50%', background: `${r.color}16`, border: `1px solid ${r.color}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: r.color }}>{r.avatar}</div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: T.textPrimary }}>{r.name}</div>
                    <div style={{ fontSize: 10, color: T.textSecondary }}>{r.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Reveal>
      </section>

      {/* ── Security ── */}
      <section id="security" style={{ padding: '80px 4vw', position: 'relative', zIndex: 2 }}>
        <Reveal>
          <div style={{ background: `${T.green}04`, border: `1px solid ${T.green}14`, borderRadius: 20, padding: '52px 40px' }}>
            <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: 44 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 13px', borderRadius: 999, background: 'rgba(49,233,129,0.07)', border: `1px solid rgba(49,233,129,0.22)`, marginBottom: 14 }}>
                <ShieldCheck size={11} color={T.green} />
                <span style={{ fontSize: 11, fontWeight: 600, color: T.green }}>Security & Privacy</span>
              </div>
              <h2 style={{ fontFamily: T.fontDisplay, fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', fontWeight: 800, letterSpacing: '-0.03em', color: T.textPrimary, marginBottom: 10 }}>
                Your Financial Data Stays Yours
              </h2>
              <p style={{ color: T.textSecondary, maxWidth: 400, margin: '0 auto', fontSize: 14 }}>
                We built FinHealth360 with one principle: your data belongs to you, not us.
              </p>
            </motion.div>
            <motion.div variants={stagger} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 14 }}>
              {[
                { color: T.cyan,   icon: ShieldCheck, title: 'No bank login required',         desc: 'We never ask for credentials, UPI PIN, or net banking access. Ever.' },
                { color: T.red,    icon: X,           title: 'Your data is never sold',         desc: 'No advertisers. We earn from subscriptions — full stop.' },
                { color: T.amber,  icon: Trash2,      title: 'Delete anytime, instantly',       desc: 'Permanently erased within 24 hours. No questions asked.' },
                { color: T.purple, icon: FileText,    title: 'Documents discarded after use',   desc: 'Analyzed then immediately deleted. Nothing persists.' },
                { color: T.green,  icon: Lock,        title: 'End-to-end encrypted',            desc: 'TLS 1.3 in transit, encrypted at rest. Private to you alone.' },
                { color: T.cyan,   icon: Globe,       title: 'Built for India, stored in India',desc: 'Supabase Mumbai region. DPDPA 2023 compliant.' },
              ].map(item => (
                <motion.div key={item.title} variants={fadeUp} whileHover={{ borderColor: `${item.color}38`, background: `${item.color}05` }}
                  style={{ display: 'flex', gap: 12, padding: 18, background: 'rgba(255,255,255,0.018)', border: `1px solid ${T.border}`, borderRadius: 12, transition: 'all 0.3s' }}>
                  <div style={{ width: 34, height: 34, borderRadius: 9, background: `${item.color}14`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <item.icon size={15} color={item.color} />
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: T.textPrimary, marginBottom: 3 }}>{item.title}</div>
                    <div style={{ fontSize: 11, color: T.textSecondary, lineHeight: 1.6 }}>{item.desc}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </Reveal>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" style={{ padding: '80px 4vw', position: 'relative', zIndex: 2 }}>
        <Reveal>
          <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: 52 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 13px', borderRadius: 999, background: 'rgba(122,60,255,0.09)', border: `1px solid rgba(122,60,255,0.28)`, marginBottom: 14 }}>
              <Zap size={11} color={T.purple} />
              <span style={{ fontSize: 11, fontWeight: 600, color: T.purple }}>Pricing</span>
            </div>
            <h2 style={{ fontFamily: T.fontDisplay, fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.03em', color: T.textPrimary, marginBottom: 12 }}>
              Start Free. Scale When Ready.
            </h2>
            <p style={{ color: T.textSecondary, maxWidth: 480, margin: '0 auto', fontSize: 15 }}>
              No credit card required. Cancel anytime.
            </p>
          </motion.div>
          <motion.div variants={stagger} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, maxWidth: 1100, margin: '0 auto' }}>
            {[
              {
                name: 'Starter', price: 'Free', period: '', color: T.cyan, popular: false,
                features: ['Financial Health Score', 'Basic AI Analysis', '3 document uploads/mo', 'Core calculators', 'Email support'],
                cta: 'Start Free', href: 'https://financialai-frontend-lime.vercel.app/app/dashboard',
              },
              {
                name: 'Pro', price: '₹499', period: '/mo', color: T.purple, popular: true,
                features: ['Everything in Starter', 'Unlimited documents', 'AI Financial Copilot', 'All 20 calculators', 'Tax optimization', 'Priority support'],
                cta: 'Start Pro Trial', href: 'https://financialai-frontend-lime.vercel.app/app/dashboard',
              },
              {
                name: 'Wealth', price: '₹999', period: '/mo', color: T.green, popular: false,
                features: ['Everything in Pro', 'Portfolio deep-dive', 'Investment intelligence', 'Retirement planner', 'Real-time alerts', 'Dedicated support'],
                cta: 'Go Wealth', href: 'https://financialai-frontend-lime.vercel.app/app/dashboard',
              },
              {
                name: 'Autonomous', price: '₹1,999', period: '/mo', color: T.amber, popular: false,
                features: ['Everything in Wealth', 'AI agent mode', 'Automated monitoring', 'Family accounts (4)', 'API access', 'White-glove onboarding'],
                cta: 'Go Autonomous', href: 'https://financialai-frontend-lime.vercel.app/app/dashboard',
              },
            ].map(plan => (
              <motion.div key={plan.name} variants={fadeUp}
                whileHover={{ y: -6, boxShadow: `0 0 40px ${plan.color}22` }}
                style={{ position: 'relative', background: T.cardBg, border: `1px solid ${plan.popular ? plan.color + '55' : T.border}`, borderRadius: 18, padding: '32px 26px', display: 'flex', flexDirection: 'column', gap: 20 }}>
                {plan.popular && (
                  <div style={{ position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)' }}>
                    <motion.div animate={{ boxShadow: [`0 0 0px ${T.purple}`, `0 0 16px ${T.purple}88`, `0 0 0px ${T.purple}`] }} transition={{ duration: 2, repeat: Infinity }}
                      style={{ background: T.gradPrimary, borderRadius: 999, padding: '4px 14px', fontSize: 10, fontWeight: 700, color: '#fff', whiteSpace: 'nowrap' }}>
                      MOST POPULAR
                    </motion.div>
                  </div>
                )}
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: plan.color, letterSpacing: '0.08em', marginBottom: 8 }}>{plan.name.toUpperCase()}</div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                    <span style={{ fontFamily: T.fontDisplay, fontSize: 36, fontWeight: 900, color: T.textPrimary }}>{plan.price}</span>
                    {plan.period && <span style={{ fontSize: 13, color: T.textSecondary }}>{plan.period}</span>}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
                  {plan.features.map(f => (
                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 13, color: T.textSecondary }}>
                      <CheckCircle size={13} color={plan.color} style={{ flexShrink: 0 }} />
                      {f}
                    </div>
                  ))}
                </div>
                <a href={plan.href} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'block', textAlign: 'center', padding: '12px', borderRadius: 10, fontSize: 13, fontWeight: 700, textDecoration: 'none', background: plan.popular ? T.gradPrimary : 'transparent', color: plan.popular ? '#fff' : plan.color, border: plan.popular ? 'none' : `1px solid ${plan.color}44`, transition: 'opacity 0.2s' }}>
                  {plan.cta}
                </a>
              </motion.div>
            ))}
          </motion.div>
        </Reveal>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '80px 4vw', position: 'relative', zIndex: 2 }}>
        <Reveal>
          <motion.div variants={fadeUp}
            style={{ maxWidth: 780, margin: '0 auto', textAlign: 'center', background: `linear-gradient(135deg, ${T.cyan}08, ${T.purple}08)`, border: `1px solid ${T.borderMid}`, borderRadius: 24, padding: '64px 40px', position: 'relative', overflow: 'hidden' }}>
            <motion.div animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 4, repeat: Infinity }}
              style={{ position: 'absolute', top: '-30%', right: '-10%', width: '50%', height: '140%', background: `radial-gradient(ellipse, ${T.purple}14, transparent 70%)`, pointerEvents: 'none' }} />
            <h2 style={{ fontFamily: T.fontDisplay, fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, letterSpacing: '-0.04em', color: T.textPrimary, marginBottom: 16, lineHeight: 1.1 }}>
              Your financial clarity starts today.
            </h2>
            <p style={{ color: T.textSecondary, fontSize: 16, marginBottom: 36, maxWidth: 440, margin: '0 auto 36px' }}>
              Join thousands of Indians who finally understand their money — and know exactly what to do next.
            </p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://financialai-frontend-lime.vercel.app/app/dashboard" target="_blank" rel="noopener noreferrer" className="btn-primary">
                Analyze My Finances <ArrowRight size={15} />
              </a>
              <a href="https://financialai-frontend-lime.vercel.app/app/fi" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                See Financial Health Score
              </a>
            </div>
            <p style={{ marginTop: 20, fontSize: 11, color: T.textMuted }}>Free forever plan · No credit card · No bank login</p>
          </motion.div>
        </Reveal>
      </section>

      {/* ── Footer ── */}
      <footer style={{ padding: '48px 4vw 32px', borderTop: `1px solid ${T.border}`, position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 36, marginBottom: 36 }}>
          <div>
            <div style={{ fontFamily: T.fontDisplay, fontSize: 18, fontWeight: 800, color: T.textPrimary, marginBottom: 10 }}>FinHealth360</div>
            <p style={{ fontSize: 12, color: T.textSecondary, lineHeight: 1.7, maxWidth: 220 }}>
              India's AI-powered financial intelligence platform. Understand your money. Act with confidence.
            </p>
          </div>
          {[
            { title: 'Platform', links: [['Dashboard', 'https://financialai-frontend-lime.vercel.app/app/dashboard'], ['Financial Health', 'https://financialai-frontend-lime.vercel.app/app/fi'], ['Tools', 'https://financialai-frontend-lime.vercel.app/app/tools'], ['AI Agent', 'https://financialai-frontend-lime.vercel.app/app/agent']] },
            { title: 'Tools', links: [['SIP Calculator', 'https://financialai-frontend-lime.vercel.app/app/tools'], ['Tax Optimizer', 'https://financialai-frontend-lime.vercel.app/app/tools'], ['Net Worth', 'https://financialai-frontend-lime.vercel.app/app/tools'], ['Retirement', 'https://financialai-frontend-lime.vercel.app/app/tools']] },
            { title: 'Company', links: [['About', '#'], ['Privacy', '#'], ['Terms', '#'], ['Contact', '#']] },
          ].map(col => (
            <div key={col.title}>
              <div style={{ fontSize: 11, fontWeight: 700, color: T.textPrimary, letterSpacing: '0.08em', marginBottom: 14 }}>{col.title.toUpperCase()}</div>
              {col.links.map(([l, h]) => (
                <a key={l} href={h} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'block', fontSize: 12, color: T.textSecondary, marginBottom: 8, textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = T.textPrimary)}
                  onMouseLeave={e => (e.currentTarget.style.color = T.textSecondary)}>
                  {l}
                </a>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 22, textAlign: 'center', fontSize: 11, color: T.textSecondary }}>
          © 2026 FinHealth360. Provides AI-powered financial insights and educational analysis. Not a registered investment advisor.
        </div>
      </footer>
    </div>
  );
}
