'use client';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { AlertTriangle, ArrowRight, BarChart3, Bot, Calculator, CheckCircle, ChevronRight, Compass, Heart, Lightbulb, PieChart, Search, Shield, ShieldCheck, Sparkles, Star, Award, TrendingUp, Zap } from 'lucide-react';


// ─── Unified tokens - matches AppLayout exactly ───────────────────────────────
const T = {
  cyan:         "#2FE6FF",
  purple:       "#7A3CFF",
  green:        "#31E981",
  amber:        "#EF9F27",
  red:          "#FF5050",
  pageBg:       "#070A12",
  textPrimary:  "#F2F5FF",
  textSecondary:"#9AA6BF",
  textMuted:    "rgba(255,255,255,0.3)",
  border:       "rgba(255,255,255,0.06)",
  borderMid:    "rgba(255,255,255,0.08)",
  fontDisplay:  "Bricolage Grotesque, sans-serif",
  gradPrimary:  "linear-gradient(135deg, #2FE6FF 0%, #7A3CFF 100%)",
  gradSuccess:  "linear-gradient(135deg, #31E981 0%, #2FE6FF 100%)",
} as const;

const capabilities = [
  { icon: Heart,      color: T.cyan,   title: "Financial Health Score",  desc: "Your Agent scores every dimension of your finances - and monitors changes automatically." },
  { icon: TrendingUp, color: "#2D7BFF", title: "Investment Analysis",    desc: "Your Agent detects underperforming SIPs, missing investments, and portfolio gaps." },
  { icon: Shield,     color: T.purple,  title: "Insurance Analyzer",     desc: "Your Agent uncovers hidden charges and flags policies draining your returns." },
  { icon: Calculator, color: T.cyan,   title: "Tax Optimization",        desc: "Your Agent compares regimes, finds deductions you missed, and tells you exactly what to claim." },
  { icon: BarChart3,  color: "#2D7BFF", title: "Loan Planning",          desc: "Your Agent flags when your EMI burden is too high and tells you the optimal prepayment move." },
  { icon: Bot,        color: T.purple,  title: "Talk to Your Agent",     desc: "Ask anything. Your Agent already knows your numbers - answers are specific to you, not generic." },
];

const problems = [
  { icon: AlertTriangle, color: T.red,    title: "Sold products, not advice",      desc: "35% of Indians have never reviewed their finances - not once. The system profits from that confusion." },
  { icon: Search,        color: T.amber,  title: "Hidden charges drain your wealth",        desc: "India's net household savings are at a 50-year low. Fees buried in fine print are a silent contributor." },
  { icon: Compass,       color: T.purple, title: "88% expect things to get worse",           desc: "88% of salaried Indians anticipate greater financial uncertainty in the next 5 years. Most are guessing what to do." },
];

const steps = [
  { n: "01", title: "Tell your Agent your numbers",    desc: "Enter basic info securely - no documents, no bank access required." },
  { n: "02", title: "Your Agent runs a full analysis", desc: "Your Agent scans every dimension of your finances and scores them - instantly, automatically." },
  { n: "03", title: "Agent tells you what to do next", desc: "No guessing. Your Agent gives you a clear action plan - specific to your numbers." },
];

// ─── Ticker items - no unverifiable claims ────────────────────────────────────
// Removed "10,000+ users" and "₹2.4Cr saved" - unverifiable claims damage trust
// for Indian users who are skeptical of fintech. Replaced with process-based trust.
const tickerItems = [
  { icon: ShieldCheck, color: T.green,  text: "No bank access required" },
  { icon: Shield,      color: T.purple, text: "Your data is never sold" },
  { icon: Award,       color: T.cyan,   text: "No commissions - ever" },
  { icon: Zap,         color: T.amber,  text: "Score ready in 60 seconds" },
  { icon: Star,        color: T.green,  text: "Built for India" },
  { icon: ShieldCheck, color: T.cyan,   text: "Cancel anytime, no lock-in" },
  { icon: Shield,      color: T.green,  text: "No bank access required" },
  { icon: Award,       color: T.purple, text: "Your data is never sold" },
  { icon: Zap,         color: T.cyan,   text: "No commissions - ever" },
  { icon: Star,        color: T.amber,  text: "Score ready in 60 seconds" },
  { icon: ShieldCheck, color: T.green,  text: "Built for India" },
  { icon: Shield,      color: T.cyan,   text: "Cancel anytime, no lock-in" },
];


const COMPETITORS = [
  { id: "ca",       label: "CA / RIA",      abbr: "CA", cx: 19, cy: 22, desc: "5,000/session. Inaccessible to most." },
  { id: "scripbox", label: "Scripbox",       abbr: "S",  cx: 25, cy: 35, desc: "MF advice - needs account login." },
  { id: "fi",       label: "Fi / Jupiter",   abbr: "Fi", cx: 20, cy: 68, desc: "Neobank - shows balance, not a plan." },
  { id: "groww",    label: "Groww",          abbr: "G",  cx: 28, cy: 78, desc: "Tracks SIPs. Doesn't score your health." },
  { id: "cleartax", label: "ClearTax",       abbr: "CT", cx: 68, cy: 75, desc: "Tax filing only - one-time, not ongoing." },
  { id: "chatgpt",  label: "Generic AI",     abbr: "AI", cx: 76, cy: 64, desc: "No India salary, EMI or SIP context." },
  { id: "excel",    label: "Excel / manual", abbr: "XL", cx: 60, cy: 82, desc: "Effort with no output - no score, no plan." },
];


function useInView(threshold?: number) {
  threshold = threshold ?? 0.15;
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(function() {
    const obs = new IntersectionObserver(function(entries) {
      if (entries[0].isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold: threshold });
    if (ref.current) obs.observe(ref.current);
    return function() { obs.disconnect(); };
  }, []);
  return { ref, inView };
}

function ParticleField() {
  const pts = Array.from({ length: 50 }, function(_, i) {
    return {
      id: i, x: (i * 17.3) % 100, y: (i * 23.7) % 100,
      size: (i % 3) + 0.8, dur: 15 + (i % 12), delay: (i * 0.3) % 8,
      color: i % 3 === 0 ? '#2FE6FF' : i % 3 === 1 ? '#7A3CFF' : '#31E981',
      opacity: 0.07 + (i % 5) * 0.04,
    };
  });
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      {pts.map(function(p) {
        return (
          <div key={p.id} style={{
            position: 'absolute', left: p.x + '%', top: p.y + '%',
            width: p.size, height: p.size, borderRadius: '50%',
            background: p.color, opacity: p.opacity,
            animation: 'particleDrift ' + p.dur + 's ' + p.delay + 's ease-in-out infinite alternate',
          }} />
        );
      })}
    </div>
  );
}

function PositioningMap() {
  const [hovered, setHovered] = useState(null as string | null);
  const [tooltip, setTooltip] = useState(null as {x:number;y:number;text:string;label:string}|null);
  const [pulse, setPulse] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setPulse(p => p + 1), 2000);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ marginTop: 32, borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)", background: "rgba(7,10,18,0.6)", maxWidth: 900, margin: "32px auto 0" }}>
      <div style={{ padding: "20px 24px 0", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#F2F5FF", marginBottom: 4 }}>Where every finance app sits and where we don't</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>Hover any dot to see what they actually do</div>
        </div>
        <div style={{ display: "flex", gap: 16, fontSize: 12, color: "rgba(255,255,255,0.3)", alignItems: "center" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 5 }}><span style={{ width: 8, height: 8, borderRadius: "50%", background: "#1D9E75", display: "inline-block" }} />FinHealth360</span>
          <span style={{ display: "flex", alignItems: "center", gap: 5 }}><span style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "inline-block" }} />Competitors</span>
        </div>
      </div>
      <div style={{ position: "relative", width: "100%", paddingTop: "56%", margin: "12px 0 0" }}>
        <svg viewBox="0 0 500 280" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="0" width="250" height="140" fill="rgba(255,255,255,0.008)" />
          <rect x="250" y="0" width="250" height="140" fill="rgba(47,230,255,0.025)" />
          <rect x="0" y="140" width="250" height="140" fill="rgba(255,255,255,0.004)" />
          <rect x="250" y="140" width="250" height="140" fill="rgba(255,255,255,0.008)" />
          <line x1="250" y1="0" x2="250" y2="280" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          <line x1="0" y1="140" x2="500" y2="140" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          <rect x="256" y="6" width="238" height="128" rx="6" fill="none" stroke="rgba(47,230,255,0.15)" strokeWidth="1" strokeDasharray="4 3" />
          <text x="375" y="20" textAnchor="middle" fill="rgba(47,230,255,0.4)" fontSize="8" letterSpacing="1">OPEN TERRITORY</text>
          <text x="250" y="12" textAnchor="middle" fill="rgba(255,255,255,0.22)" fontSize="8">gives clear action plan</text>
          <text x="250" y="276" textAnchor="middle" fill="rgba(255,255,255,0.22)" fontSize="8">shows data only</text>
          <text x="4" y="136" fill="rgba(255,255,255,0.22)" fontSize="8">needs bank login</text>
          <text x="496" y="136" textAnchor="end" fill="rgba(255,255,255,0.22)" fontSize="8">works from any document</text>
          <circle cx="355" cy="62" r={18 + (pulse % 2) * 4} fill="none" stroke="#1D9E75" strokeWidth="0.5" opacity={0.15 + (pulse % 2) * 0.1} />
          <circle cx="355" cy="62" r="16" fill="#1D9E75" opacity={hovered && hovered !== "fh" ? 0.4 : 1} style={{ transition: "opacity 0.3s" }} />
          <text x="355" y="58" textAnchor="middle" fill="white" fontSize="6" fontWeight="700">FIN</text>
          <text x="355" y="68" textAnchor="middle" fill="white" fontSize="6" fontWeight="700">HEALTH</text>
          <text x="382" y="52" fill="#1D9E75" fontSize="9" fontWeight="700">FinHealth360</text>
          <text x="382" y="64" fill="rgba(47,230,255,0.7)" fontSize="7.5">any doc - score - action plan</text>
          <text x="382" y="75" fill="rgba(255,255,255,0.25)" fontSize="7">only one in this quadrant</text>
          {COMPETITORS.map((c) => {
            const cx = (c.cx / 100) * 500;
            const cy = (c.cy / 100) * 280;
            const isHov = hovered === c.id;
            const isDimmed = hovered !== null && hovered !== c.id;
            return (
              <g key={c.id} style={{ cursor: "pointer" }}
                onMouseEnter={() => { setHovered(c.id); setTooltip({ x: c.cx, y: c.cy, text: c.desc, label: c.label }); }}
                onMouseLeave={() => { setHovered(null); setTooltip(null); }}>
                <circle cx={cx} cy={cy} r={isHov ? 11 : 8}
                  fill={isHov ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.1)"}
                  stroke={isHov ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.2)"}
                  strokeWidth="1" opacity={isDimmed ? 0.3 : 1}
                  style={{ transition: "opacity 0.2s, transform 0.2s, background 0.2s, color 0.2s" }} />
                <text x={cx} y={cy + 3.5} textAnchor="middle"
                  fill={isDimmed ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.7)"}
                  fontSize="6" fontWeight="600" style={{ pointerEvents: "none" }}>{c.abbr}</text>
                <text x={cx + 13} y={cy - 2}
                  fill={isDimmed ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.45)"}
                  fontSize="7.5" style={{ pointerEvents: "none" }}>{c.label}</text>
              </g>
            );
          })}
          {tooltip && (
            <g>
              <rect x={Math.min((tooltip.x / 100) * 500, 330)} y={Math.max((tooltip.y / 100) * 280 - 50, 8)} width={155} height={34} rx="5" fill="rgba(10,15,30,0.97)" stroke="rgba(47,230,255,0.3)" strokeWidth="0.8" />
              <text x={Math.min((tooltip.x / 100) * 500, 330) + 8} y={Math.max((tooltip.y / 100) * 280 - 50, 8) + 13} fill="#2FE6FF" fontSize="8" fontWeight="700">{tooltip.label}</text>
              <text x={Math.min((tooltip.x / 100) * 500, 330) + 8} y={Math.max((tooltip.y / 100) * 280 - 50, 8) + 26} fill="rgba(255,255,255,0.5)" fontSize="7.5">{tooltip.text}</text>
            </g>
          )}
        </svg>
      </div>
      <div style={{ padding: "14px 24px 20px", borderTop: "1px solid rgba(255,255,255,0.05)", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
        {[["Any document", "Salary slip, bank statement, tax return"], ["Instant score", "0-100 FinHealth Score in 60 seconds"], ["Clear action plan", "Exactly what to fix first - not generic advice"]].map(([t, d]) => (
          <div key={t} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#1D9E75", marginTop: 4, flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#F2F5FF" }}>{t}</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", marginTop: 1 }}>{d}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  
  const isLoggedIn = false;
  const [menuOpen, setMenuOpen] = useState(false);

  // ── FIX: No server warmup on landing page ─────────────────────────────────
  // The original "Warming up servers..." disabled CTA is the single worst trust
  // signal for a financial product. A new user's first interaction is a broken
  // button telling them the product is asleep. We remove the server status check
  // entirely from the landing page - just navigate directly. The backend check
  // (if needed) should happen silently in the background, never blocking the CTA.
  const handleCTA = () => {
    window.location.href = 'https://financialai-frontend-lime.vercel.app/quick-score';
  };

  return (
    <>
      
    <div className="min-h-screen" style={{ background: T.pageBg }}>
      <ParticleField />
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '5%', left: '-5%', width: '45vw', height: '45vw', background: 'radial-gradient(ellipse, rgba(47,230,255,0.07) 0%, transparent 65%)', animation: 'morphBlob1 18s ease-in-out infinite, float1 22s ease-in-out infinite', animationFillMode: 'both' }} />
        <div style={{ position: 'absolute', top: '35%', right: '-8%', width: '40vw', height: '40vw', background: 'radial-gradient(ellipse, rgba(122,60,255,0.08) 0%, transparent 65%)', animation: 'morphBlob2 22s ease-in-out infinite, float2 28s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', bottom: '5%', left: '25%', width: '32vw', height: '32vw', background: 'radial-gradient(ellipse, rgba(49,233,129,0.05) 0%, transparent 65%)', animation: 'morphBlob1 26s 5s ease-in-out infinite reverse, float3 18s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', top: '60%', left: '10%', width: '20vw', height: '20vw', background: 'radial-gradient(ellipse, rgba(239,159,39,0.04) 0%, transparent 65%)', animation: 'morphBlob2 14s ease-in-out infinite, float1 16s ease-in-out infinite reverse' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.011) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.011) 1px, transparent 1px)', backgroundSize: '60px 60px', animation: 'gridMove 10s linear infinite', opacity: 0.7 }} />
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;500;600;700;800&display=swap');

        @keyframes ping { 75%, 100% { transform: scale(2); opacity: 0; } }
        @keyframes orbDrift { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(20px,-15px) scale(1.04)} 66%{transform:translate(-15px,10px) scale(0.97)} }
        @keyframes heroFadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes cardFloat { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-8px)} }
        @keyframes insightPulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
        @keyframes ticker { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes gradientShift { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }

        .hero-fade-1 { animation: heroFadeUp 0.6s 0.1s ease both; }
        .hero-fade-2 { animation: heroFadeUp 0.6s 0.2s ease both; }
        .hero-fade-3 { animation: heroFadeUp 0.6s 0.3s ease both; }
        .hero-fade-4 { animation: heroFadeUp 0.6s 0.4s ease both; }
        .hero-fade-5 { animation: heroFadeUp 0.6s 0.5s ease both; }
        .hero-card   { animation: heroFadeUp 0.7s 0.3s ease both, cardFloat 5s 1s ease-in-out infinite; }

        .section-fade { opacity: 0; transform: translateY(28px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .section-fade.visible { opacity: 1; transform: translateY(0); }
        .card-hover { transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease; }
        .card-hover:hover { transform: translateY(-4px); }

        .pricing-card { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .pricing-card:hover { transform: translateY(-6px); }
        .pricing-popular { transform: none; }
        .pricing-popular:hover { transform: translateY(-6px); }

        .ticker-wrap { overflow: hidden; }
        .ticker-track { display: flex; animation: ticker 32s linear infinite; width: max-content; }
        .ticker-track:hover { animation-play-state: paused; }

        /* ── Unified button classes - same as AppLayout ── */
        .btn-primary {
          background: linear-gradient(135deg, #2FE6FF 0%, #7A3CFF 100%);
          color: #fff; border: none; cursor: pointer; font-weight: 600;
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
        .btn-primary:hover { opacity: 0.9; transform: translateY(-1px); }
        .btn-ghost {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.15);
          color: #9AA6BF; cursor: pointer;
          transition: border-color 0.2s, color 0.2s;
        }
        .btn-ghost:hover { border-color: rgba(255,255,255,0.3); color: #F2F5FF; }

        
        
        @keyframes morphBlob1 { 0%,100%{border-radius:60% 40% 30% 70%/60% 30% 70% 40%} 25%{border-radius:30% 60% 70% 40%/50% 60% 30% 60%} 50%{border-radius:50% 60% 30% 70%/40% 40% 60% 50%} 75%{border-radius:70% 30% 50% 60%/30% 70% 40% 60%} }
        @keyframes morphBlob2 { 0%,100%{border-radius:40% 60% 60% 40%/40% 60% 40% 60%} 33%{border-radius:60% 40% 40% 60%/60% 40% 60% 40%} 66%{border-radius:50% 50% 40% 60%/40% 50% 60% 50%} }
        @keyframes antigravity { 0%,100%{transform:translateY(0px) rotate(0deg)} 25%{transform:translateY(-18px) rotate(2deg)} 50%{transform:translateY(-8px) rotate(-1deg)} 75%{transform:translateY(-22px) rotate(1.5deg)} }
        @keyframes antigravity2 { 0%,100%{transform:translateY(0px) rotate(0deg)} 33%{transform:translateY(-14px) rotate(-2deg)} 66%{transform:translateY(-24px) rotate(1deg)} }
        @keyframes antigravity3 { 0%,100%{transform:translateY(0px)} 40%{transform:translateY(-10px)} 70%{transform:translateY(-20px)} }
        @keyframes orbitSpin { 0%{transform:rotate(0deg) translateX(80px) rotate(0deg)} 100%{transform:rotate(360deg) translateX(80px) rotate(-360deg)} }
        @keyframes orbitSpin2 { 0%{transform:rotate(0deg) translateX(55px) rotate(0deg)} 100%{transform:rotate(-360deg) translateX(55px) rotate(360deg)} }
        @keyframes glowPulse { 0%,100%{opacity:0.5;filter:blur(20px)} 50%{opacity:1;filter:blur(30px)} }
        @keyframes textGlow { 0%,100%{text-shadow:0 0 20px rgba(47,230,255,0.3)} 50%{text-shadow:0 0 40px rgba(47,230,255,0.7),0 0 80px rgba(122,60,255,0.3)} }
        @keyframes borderRotate { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
        @keyframes floatChip { 0%,100%{transform:translateY(0px) translateX(0px)} 33%{transform:translateY(-12px) translateX(5px)} 66%{transform:translateY(-6px) translateX(-4px)} }
        @keyframes scanBeam { 0%{top:0%;opacity:0.6} 100%{top:100%;opacity:0} }
        .antigravity-1 { animation: antigravity 6s ease-in-out infinite; }
        .antigravity-2 { animation: antigravity2 8s ease-in-out infinite; }
        .antigravity-3 { animation: antigravity3 7s ease-in-out infinite; }
        .float-chip { animation: floatChip 5s ease-in-out infinite; }
        .text-glow { animation: textGlow 3s ease-in-out infinite; }
        @keyframes particleDrift { 0%{transform:translate(0,0)} 100%{transform:translate(30px,-40px)} }
        @keyframes float1 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(40px,-30px) scale(1.08)} 66%{transform:translate(-20px,20px) scale(0.95)} }
        @keyframes float2 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(-30px,20px) scale(1.05)} 66%{transform:translate(25px,-15px) scale(0.97)} }
        @keyframes float3 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(15px,25px)} }
        @keyframes pulseRing { 0%{transform:scale(0.85);opacity:0.6} 100%{transform:scale(2.2);opacity:0} }
        @keyframes gridMove { 0%{background-position:0 0} 100%{background-position:60px 60px} }
        .glow-on-hover { transition: box-shadow 0.3s ease, border-color 0.3s ease, transform 0.2s ease; }
        .glow-on-hover:hover { box-shadow: 0 0 28px rgba(47,230,255,0.13); transform: translateY(-4px); }
        .step-connector { background: linear-gradient(90deg, rgba(47,230,255,0.2), rgba(122,60,255,0.2)); }
      `}</style>

      {/* ── Navbar ─────────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50"
        style={{ background: "rgba(7,10,18,0.9)", backdropFilter: "blur(8px)", borderBottom: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: "100%", padding: "0 4vw", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          {/* Logo - identical to AppLayout sidebar */}
          <button type="button" onClick={() => window.location.href = '/'}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <img src="/logo-icon.svg" alt="" style={{ height: "38px", width: "38px", objectFit: "contain", flexShrink: 0 }} />
              <span style={{ fontSize: "22px", fontWeight: 800, letterSpacing: "-0.5px", lineHeight: 1 }}>
                <span style={{ color: "#60D0FF" }}>FinHealth</span><span style={{ color: "#FF2020" }}>360</span>
              </span>
            </div>
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
            {(["Features", "Tools", "Pricing"] as const).map((l) => (
              <button type="button" key={l}
                className="text-sm font-medium transition-colors hover:text-white"
                style={{ color: T.textSecondary, background: "none", border: "none", cursor: "pointer" }}
                onClick={() => document.getElementById(l.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}>
                {l}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <button type="button" className="btn-primary px-4 py-2 rounded-lg text-sm flex items-center gap-1.5"
                onClick={() => window.location.href = 'https://financialai-frontend-lime.vercel.app/app/dashboard'}>
                Go to Dashboard <ArrowRight size={14} />
              </button>
            ) : (
              <>
                <button type="button" className="btn-ghost" style={{ padding: "8px 16px", borderRadius: "8px", fontSize: "14px" }}
                  onClick={() => window.location.href = 'https://financialai-frontend-lime.vercel.app/login'}>Login</button>
                <button type="button" className="btn-primary px-4 py-2 rounded-lg text-sm"
                  onClick={() => window.location.href = 'https://financialai-frontend-lime.vercel.app/quick-score'}>Check My Score</button>
              </>
            )}
            <button type="button" style={{ display: "none", background: "none", border: "none", cursor: "pointer" }}
              onClick={() => setMenuOpen(!menuOpen)}>
              <div className="w-5 h-0.5 bg-white mb-1" /><div className="w-5 h-0.5 bg-white mb-1" /><div className="w-5 h-0.5 bg-white" />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden px-4 pb-4" style={{ background: "rgba(7,10,18,0.98)" }}>
            {(["Features", "Tools", "Pricing"] as const).map((l) => (
              <button type="button" key={l} className="block w-full text-left py-2 text-sm"
                style={{ color: T.textSecondary, background: "none", border: "none", cursor: "pointer" }}
                onClick={() => { setMenuOpen(false); document.getElementById(l.toLowerCase())?.scrollIntoView({ behavior: 'smooth' }); }}>
                {l}
              </button>
            ))}
            {isLoggedIn ? (
              <button type="button" className="block w-full text-left py-2 text-sm font-semibold"
                style={{ background: T.gradPrimary, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", border: "none", cursor: "pointer" }}
                onClick={() => { setMenuOpen(false); window.location.href = 'https://financialai-frontend-lime.vercel.app/app/dashboard'; }}>Go to Dashboard →</button>
            ) : (
              <button type="button" className="block w-full text-left py-2 text-sm font-semibold"
                style={{ background: T.gradPrimary, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", border: "none", cursor: "pointer" }}
                onClick={() => { setMenuOpen(false); window.location.href = 'https://financialai-frontend-lime.vercel.app/login'; }}>Login / Sign Up</button>
            )}
          </div>
        )}
      </nav>

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-24 overflow-hidden" style={{ minHeight: "92vh", display: "flex", alignItems: "center" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
          <div style={{ position: "absolute", top: "-5%", left: "-5%", width: "55%", height: "55%", background: `radial-gradient(ellipse, rgba(47,230,255,0.09) 0%, transparent 65%)`, animation: "orbDrift 14s ease-in-out infinite" }} />
          <div style={{ position: "absolute", bottom: "0%", right: "0%", width: "45%", height: "50%", background: `radial-gradient(ellipse, rgba(122,60,255,0.12) 0%, transparent 65%)`, animation: "orbDrift 18s ease-in-out infinite reverse" }} />
          <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)`, backgroundSize: "60px 60px", opacity: 0.5 }} />
        </div>

        <div style={{ zIndex: 1, display: "flex", alignItems: "center", justifyContent: "space-between", gap: "3rem", flexWrap: "wrap", width: "100%", maxWidth: "100%", position: "relative", padding: "0 4vw" }}>

          {/* Left */}
          <div style={{ maxWidth: 560, flex: "1 1 340px" }}>

            <div className="hero-fade-1 inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5"
              style={{ background: `rgba(47,230,255,0.08)`, border: `1px solid rgba(47,230,255,0.22)` }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: T.cyan, display: "inline-block", animation: "insightPulse 2s ease-in-out infinite" }} />
              <span className="text-xs font-medium" style={{ color: T.cyan }}>83% of Indians know they need a financial plan. Only 35% have one. - ABSLI 2024</span>
            </div>

            <h1 className="hero-fade-2 font-extrabold mb-5 leading-tight"
              style={{ fontSize: "clamp(2.4rem, 5vw, 3.8rem)", fontFamily: T.fontDisplay, letterSpacing: "-0.04em", lineHeight: 1.1 }}>
              <span style={{ background: "linear-gradient(to bottom, #F2F5FF 0%, rgba(242,245,255,0.55) 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                You're not bad with money.
              </span>
              <br />
              <span style={{ background: T.gradPrimary, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                You just don't know where you stand.
              </span>
              </span>
            </h1>

            <p className="hero-fade-3 text-lg mb-6" style={{ color: T.textSecondary, lineHeight: 1.7, maxWidth: 460 }}>
              India's household savings rate just hit a 50-year low. 88% of salaried Indians expect more financial uncertainty. Upload any document - salary slip, bank statement, tax return - and get your FinHealth Score, your risks, and exactly what to do next. In 60 seconds.
            </p>

            {/* ── FIX: Hero CTA - no server warmup, always ready ─────────────
                The original button showed "Warming up servers..." and was disabled
                on page load. For a fintech product, this reads as unreliable.
                CTA is always active. Backend check happens silently if needed.
            ─────────────────────────────────────────────────────────────────── */}
            <div className="hero-fade-4 flex flex-col sm:flex-row gap-4 mb-6">
              <button type="button"
                className="btn-primary px-8 py-3.5 rounded-xl text-base flex items-center justify-center gap-2"
                onClick={handleCTA}
                data-ocid="hero.activate_agent.button"
              >
                Check My Financial Health - Free <ArrowRight size={18} />
              </button>
              <button type="button" className="btn-ghost px-8 py-3.5 rounded-xl text-base"
                onClick={() => window.location.href = 'https://financialai-frontend-lime.vercel.app/quick-score'}>
                See How It Works
              </button>
            </div>

            {/* Trust signals - process-based, verifiable */}
            <div className="hero-fade-4 flex flex-wrap items-center gap-x-4 gap-y-1 mb-8"
              style={{ fontSize: "12px", color: T.textSecondary }}>
              <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <ShieldCheck size={12} style={{ color: T.green }} />No bank access needed
              </span>
              <span style={{ color: T.textMuted }}>·</span>
              <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <Award size={12} style={{ color: T.cyan }} />Zero commissions
              </span>
              <span style={{ color: T.textMuted }}>·</span>
              <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <Shield size={12} style={{ color: T.purple }} />Data never sold
              </span>
            </div>

            {/* Stats */}
            <div className="hero-fade-5 flex flex-wrap gap-6">
              {[["400M", "Indians with no financial guidance", T.cyan], ["5.3%", "Savings rate - 50-yr low (RBI)", T.green], ["60s", "To your FinHealth Score", T.purple]].map(([v, l, c]) => (
                <div key={l} className="flex items-center gap-3">
                  <div style={{ width: 1, height: 32, background: T.border }} />
                  <div>
                    <div className="text-2xl font-bold" style={{ color: c as string, fontFamily: T.fontDisplay }}>{v}</div>
                    <div className="text-xs mt-0.5" style={{ color: T.textSecondary }}>{l}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Hero card ────────────────────────────────────────────────
              FIX: Changed demo score from 46 (bad) to 72 (good-but-improvable).
              Showing a bad financial score as the hero visual makes users anxious
              before they've even signed up. 72 says "this is useful" and
              "there's room to improve" without screaming "your finances are broken".
              Also changed Insurance from 25% (alarming) to 55% (fixable).
          ──────────────────────────────────────────────────────────────────── */}
          <div className="hero-card" style={{ flex: "1 1 300px", maxWidth: 400 }}>
            <div style={{
              borderRadius: 20, border: `1px solid rgba(47,230,255,0.18)`,
              background: "rgba(7,10,18,0.7)", backdropFilter: "blur(8px)",
              padding: "24px", position: "relative", overflow: "hidden",
            }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: `linear-gradient(90deg, transparent, ${T.cyan}, ${T.purple}, transparent)` }} />

              <div className="flex items-center justify-between mb-5">
                <div>
                  <div className="text-xs font-medium mb-1" style={{ color: T.textSecondary }}>Financial Health Score</div>
                  <div className="text-xs" style={{ color: T.textMuted }}>Updated just now</div>
                </div>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: `rgba(47,230,255,0.1)`, border: `1px solid rgba(47,230,255,0.2)` }}>
                  <Heart size={16} style={{ color: T.cyan }} />
                </div>
              </div>

              {/* Score ring - 72/100 (good, not alarming) */}
              <div className="flex items-center justify-center mb-5" style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', width: 134, height: 134, borderRadius: '50%', border: '1px solid rgba(47,230,255,0.2)', animation: 'pulseRing 3s ease-out infinite' }} />
                <div style={{ position: 'absolute', width: 134, height: 134, borderRadius: '50%', border: '1px solid rgba(122,60,255,0.15)', animation: 'pulseRing 3s 1.2s ease-out infinite' }} />
                <div style={{ position: 'absolute', width: 170, height: 170, borderRadius: '50%' }}>
                  <div style={{ position: 'absolute', width: 8, height: 8, borderRadius: '50%', background: '#2FE6FF', top: '50%', left: '50%', marginTop: -4, marginLeft: -4, animation: 'orbitSpin 4s linear infinite', boxShadow: '0 0 8px #2FE6FF' }} />
                </div>
                <div style={{ position: 'absolute', width: 140, height: 140, borderRadius: '50%' }}>
                  <div style={{ position: 'absolute', width: 6, height: 6, borderRadius: '50%', background: '#7A3CFF', top: '50%', left: '50%', marginTop: -3, marginLeft: -3, animation: 'orbitSpin2 3s linear infinite', boxShadow: '0 0 6px #7A3CFF' }} />
                </div>
                <div style={{ position: "relative", width: 120, height: 120 }}>
                  <svg width="120" height="120" style={{ transform: "rotate(-90deg)" }}>
                    <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
                    <circle cx="60" cy="60" r="50" fill="none" stroke="url(#scoreGrad)" strokeWidth="8"
                      strokeDasharray={`${2 * Math.PI * 50 * 0.72} ${2 * Math.PI * 50 * 0.28}`}
                      strokeLinecap="round" />
                    <defs>
                      <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor={T.cyan} />
                        <stop offset="100%" stopColor={T.purple} />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <div className="text-3xl font-bold text-white">72</div>
                    <div className="text-xs" style={{ color: T.textSecondary }}>/ 100</div>
                  </div>
                </div>
              </div>

              {/* Dimension bars */}
              <div className="space-y-2 mb-4">
                {[["Cash Flow", 78, T.green], ["Investments", 65, T.cyan], ["Insurance", 55, T.amber], ["Debt", 82, T.green]].map(([label, pct, color]) => (
                  <div key={label as string}>
                    <div className="flex justify-between text-xs mb-1" style={{ color: T.textSecondary }}>
                      <span>{label}</span><span style={{ color: color as string }}>{pct}%</span>
                    </div>
                    <div style={{ height: 4, borderRadius: 2, background: "rgba(255,255,255,0.06)" }}>
                      <div style={{ height: "100%", width: `${pct}%`, borderRadius: 2, background: color as string, opacity: 0.85 }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Agent insight - opportunity, not alarm */}
              <div style={{ background: `rgba(47,230,255,0.06)`, border: `1px solid rgba(47,230,255,0.15)`, borderRadius: 10, padding: "0.75rem 0.9rem", display: "flex", alignItems: "flex-start", gap: 8 }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: T.cyan, marginTop: 3, flexShrink: 0, animation: "insightPulse 2.5s 1s ease-in-out infinite", display: "inline-block" }} />
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", margin: 0, lineHeight: 1.5 }}>
                  💡 Your Agent found ₹18,000/yr in insurance savings - review detected
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Ticker - process trust, not social proof numbers ───────────────── */}
      <div style={{ borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}`, background: "rgba(255,255,255,0.015)", padding: "14px 0", overflow: "hidden" }}>
        <div className="ticker-track">
          {tickerItems.map((item, i) => (
            <div key={i} className="flex items-center gap-2 px-8" style={{ whiteSpace: "nowrap" }}>
              <item.icon size={14} style={{ color: item.color, flexShrink: 0 }} />
              <span style={{ fontSize: "13px", color: T.textSecondary, fontWeight: 500 }}>{item.text}</span>
              <span style={{ width: 4, height: 4, borderRadius: "50%", background: T.border, display: "inline-block", marginLeft: "16px" }} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Problems ───────────────────────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div style={{ width: "100%", padding: "0 4vw" }}>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4"
              style={{ background: `rgba(255,80,80,0.08)`, border: `1px solid rgba(255,80,80,0.2)` }}>
              <AlertTriangle size={12} style={{ color: T.red }} />
              <span className="text-xs font-medium" style={{ color: T.red }}>The Problem</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: T.fontDisplay, letterSpacing: "-0.03em" }}>Why 35% of Indians never check their finances</h2>
            <p style={{ color: T.textSecondary }}>It is not laziness. The system was never built for them. Source: ABSLI A-Nishchit Index 2024.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {problems.map((p, i) => (
              <div key={p.title} className="card-hover p-6 relative overflow-hidden"
                style={{ background: `${p.color}08`, border: `1px solid ${p.color}25`, borderLeft: `3px solid ${p.color}`, borderRadius: 14 }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${p.color}15`, border: `1px solid ${p.color}35` }}>
                  <p.icon size={20} style={{ color: p.color }} />
                </div>
                <h3 className="font-semibold text-white mb-2">{p.title}</h3>
                <p className="text-sm" style={{ color: T.textSecondary, lineHeight: 1.6 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Old Way vs Agent ───────────────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div style={{ width: "100%", padding: "0 4vw" }}>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: T.fontDisplay, letterSpacing: "-0.03em" }}>
              Tools React. <span style={{ background: T.gradPrimary, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Agents Act.</span>
            </h2>
            <p style={{ color: T.textSecondary, maxWidth: 520, margin: "0 auto" }}>
              The difference between <span style={{ color: "rgba(255,255,255,0.7)" }}>checking your money</span> and having it{" "}
              <span style={{ color: T.cyan, fontWeight: 600 }}>managed for you.</span>
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl" style={{ background: "rgba(255,80,80,0.04)", border: `1px solid rgba(255,80,80,0.15)` }}>
              <div className="flex items-center gap-2 mb-6">
                <span style={{ fontSize: 14 }}>❌</span>
                <span className="font-bold text-sm" style={{ color: T.red }}>Without FinHealth Agent</span>
              </div>
              {[
                "You check your finances - when you remember",
                "You find problems after they've grown",
                "You guess what to do next",
                "You react to financial surprises",
                "You Google advice that doesn't fit your situation",
                "You pay hidden charges you never knew existed",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 mb-4">
                  <span style={{ color: T.red, marginTop: 2, flexShrink: 0 }}>✕</span>
                  <span className="text-sm" style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>{item}</span>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-2xl relative overflow-hidden" style={{ background: `rgba(47,230,255,0.04)`, border: `1px solid rgba(47,230,255,0.2)` }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: T.gradPrimary }} />
              <div className="flex items-center gap-2 mb-6">
                <span style={{ fontSize: 14 }}>🤖</span>
                <span className="font-bold text-sm" style={{ color: T.cyan }}>With Your FinHealth Agent</span>
              </div>
              {[
                "Your Agent monitors your finances automatically",
                "Your Agent detects risks before they become problems",
                "Your Agent tells you exactly what to do next",
                "Your Agent alerts you before surprises happen",
                "Your Agent gives advice specific to YOUR numbers",
                "Your Agent finds hidden charges and leaks for you",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 mb-4">
                  <span style={{ color: T.cyan, marginTop: 2, flexShrink: 0 }}>✓</span>
                  <span className="text-sm text-white" style={{ lineHeight: 1.6 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ───────────────────────────────────────────────────── */}
      <section id="tools" className="py-20 px-4">
        <div style={{ width: "100%", padding: "0 4vw" }}>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: T.fontDisplay, letterSpacing: "-0.03em" }}>How Your Agent Works</h2>
            <p style={{ color: T.textSecondary }}>Set it up once. Your Agent handles the rest.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute step-connector" style={{ height: 1, top: "20px", left: "16.67%", right: "16.67%" }} />
            {steps.map((s, i) => (
              <div key={s.n} className="relative card-hover"
                style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${T.border}`, borderRadius: 16, padding: "1.5rem" }}>
                <div className="mb-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
                    style={{ background: `rgba(47,230,255,0.1)`, border: `1px solid rgba(47,230,255,0.3)`, color: T.cyan, fontFamily: T.fontDisplay }}>{s.n}</div>
                </div>
                <h3 className="font-semibold text-white mb-2">{s.title}</h3>
                <p className="text-sm" style={{ color: T.textSecondary, lineHeight: 1.6 }}>{s.desc}</p>
                {i < 2 && <div className="hidden md:block absolute -right-4 top-5 z-10" style={{ fontSize: 18, color: `rgba(47,230,255,0.4)` }}>→</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ───────────────────────────────────────────────────────── */}
      <section id="features" className="py-20 px-4">
        <div style={{ width: "100%", padding: "0 4vw" }}>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: T.fontDisplay, letterSpacing: "-0.03em" }}>What Your Agent Does</h2>
            <p style={{ color: T.textSecondary }}>A fully-fledged AI Agent - not a tool you operate, but an agent that works for you.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {capabilities.map((c, i) => (
              <div key={c.title} className="card-hover glow-on-hover p-6 relative overflow-hidden group"
                style={{ background: `${c.color}08`, border: `1px solid ${c.color}20`, borderRadius: 16 }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${c.color}15`, border: `1px solid ${c.color}35` }}>
                  <c.icon size={20} style={{ color: c.color }} />
                </div>
                <h3 className="font-semibold text-white mb-2">{c.title}</h3>
                <p className="text-sm" style={{ color: T.textSecondary, lineHeight: 1.6 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      {/* Tools Hub */}
      <section id="tools-hub" className="py-20 px-4">
        <div style={{ width: "100%", padding: "0 4vw" }}>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4" style={{ background: "rgba(47,230,255,0.08)", border: "1px solid rgba(47,230,255,0.22)" }}>
              <Zap size={12} style={{ color: T.cyan }} />
              <span className="text-xs font-medium" style={{ color: T.cyan }}>Financial Toolkit</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: T.fontDisplay, letterSpacing: "-0.03em" }}>Every tool your finances need in one place</h2>
            <p style={{ color: T.textSecondary, maxWidth: 520, margin: "0 auto" }}>20 plus calculators, analyzers and AI tools personalized to your income, goals and situation.</p>
          </div>
          <div className="mb-10"><div className="flex items-center gap-3 mb-5"><div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(45,123,255,0.12)", border: "1px solid rgba(45,123,255,0.3)" }}><TrendingUp size={16} style={{ color: "#2D7BFF" }} /></div><h3 className="text-base font-bold text-white">Investments</h3><div style={{ flex: 1, height: 1, background: T.border }} /></div><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">{([{title:"SIP Calculator",desc:"Calculate your SIP maturity value and wealth growth over time"},{title:"Portfolio Analyzer",desc:"Analyze your portfolio performance, allocation and gaps"},{title:"Return Calculator",desc:"Calculate CAGR and annualized returns on any investment"},{title:"Risk Analysis",desc:"Assess your portfolio risk and get rebalancing signals"}]).map((tool)=>(<a key={tool.title} href="https://financialai-frontend-lime.vercel.app/app/investments" style={{ background:"rgba(45,123,255,0.05)",border:"1px solid rgba(45,123,255,0.15)",borderRadius:14,padding:"18px 18px 14px",textDecoration:"none",display:"block",transition:"transform 0.2s" }} onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";}} onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";}}><div className="font-semibold text-sm text-white mb-1">{tool.title}</div><div className="text-xs" style={{ color:T.textSecondary,lineHeight:1.6 }}>{tool.desc}</div><div className="text-xs font-semibold mt-3 flex items-center gap-1" style={{ color:"#2D7BFF" }}>Explore <ChevronRight size={11} /></div></a>))}</div></div>
          <div className="mb-10"><div className="flex items-center gap-3 mb-5"><div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background:"rgba(122,60,255,0.12)",border:"1px solid rgba(122,60,255,0.3)" }}><Shield size={16} style={{ color:T.purple }} /></div><h3 className="text-base font-bold text-white">Insurance</h3><div style={{ flex:1,height:1,background:T.border }} /></div><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{([{title:"Policy Analyzer",desc:"Upload any policy and get real IRR and hidden charges revealed"},{title:"IRR Calculator",desc:"Calculate the true Internal Rate of Return on your insurance policy"},{title:"Coverage Checker",desc:"Check if your life and health coverage is adequate for your needs"}]).map((tool)=>(<a key={tool.title} href="https://financialai-frontend-lime.vercel.app/app/insurance" style={{ background:"rgba(122,60,255,0.05)",border:"1px solid rgba(122,60,255,0.15)",borderRadius:14,padding:"18px 18px 14px",textDecoration:"none",display:"block",transition:"transform 0.2s" }} onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";}} onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";}}><div className="font-semibold text-sm text-white mb-1">{tool.title}</div><div className="text-xs" style={{ color:T.textSecondary,lineHeight:1.6 }}>{tool.desc}</div><div className="text-xs font-semibold mt-3 flex items-center gap-1" style={{ color:T.purple }}>Explore <ChevronRight size={11} /></div></a>))}</div></div>
          <div className="mb-10"><div className="flex items-center gap-3 mb-5"><div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background:"rgba(49,233,129,0.12)",border:"1px solid rgba(49,233,129,0.3)" }}><Compass size={16} style={{ color:T.green }} /></div><h3 className="text-base font-bold text-white">Financial Planning</h3><div style={{ flex:1,height:1,background:T.border }} /></div><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{([{title:"Retirement Planner",desc:"Plan your retirement corpus and monthly savings needed",href:"https://financialai-frontend-lime.vercel.app/app/planning"},{title:"Goal Planning",desc:"Set financial goals and track progress with smart projections",href:"https://financialai-frontend-lime.vercel.app/app/planning"},{title:"Wealth Projection",desc:"Project your net worth growth over the next 10-30 years",href:"https://financialai-frontend-lime.vercel.app/app/planning"}]).map((tool)=>(<a key={tool.title} href={tool.href} style={{ background:"rgba(49,233,129,0.04)",border:"1px solid rgba(49,233,129,0.15)",borderRadius:14,padding:"18px 18px 14px",textDecoration:"none",display:"block",transition:"transform 0.2s" }} onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";}} onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";}}><div className="font-semibold text-sm text-white mb-1">{tool.title}</div><div className="text-xs" style={{ color:T.textSecondary,lineHeight:1.6 }}>{tool.desc}</div><div className="text-xs font-semibold mt-3 flex items-center gap-1" style={{ color:T.green }}>Explore <ChevronRight size={11} /></div></a>))}</div></div>
          <div className="mb-10"><div className="flex items-center gap-3 mb-5"><div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background:"rgba(239,159,39,0.12)",border:"1px solid rgba(239,159,39,0.3)" }}><Calculator size={16} style={{ color:T.amber }} /></div><h3 className="text-base font-bold text-white">Loans</h3><div style={{ flex:1,height:1,background:T.border }} /></div><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{([{title:"EMI Calculator",desc:"Calculate your monthly EMI for home, car, or personal loans instantly"},{title:"Loan Comparison",desc:"Compare multiple loan offers side by side on real total cost"},{title:"Prepayment Strategy",desc:"Find the optimal prepayment plan to save the most on interest"}]).map((tool)=>(<a key={tool.title} href="https://financialai-frontend-lime.vercel.app/app/loans" style={{ background:"rgba(239,159,39,0.04)",border:"1px solid rgba(239,159,39,0.15)",borderRadius:14,padding:"18px 18px 14px",textDecoration:"none",display:"block",transition:"transform 0.2s" }} onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";}} onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";}}><div className="font-semibold text-sm text-white mb-1">{tool.title}</div><div className="text-xs" style={{ color:T.textSecondary,lineHeight:1.6 }}>{tool.desc}</div><div className="text-xs font-semibold mt-3 flex items-center gap-1" style={{ color:T.amber }}>Explore <ChevronRight size={11} /></div></a>))}</div></div>
          <div className="mb-10"><div className="flex items-center gap-3 mb-5"><div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background:"rgba(47,230,255,0.12)",border:"1px solid rgba(47,230,255,0.3)" }}><PieChart size={16} style={{ color:T.cyan }} /></div><h3 className="text-base font-bold text-white">Tax</h3><div style={{ flex:1,height:1,background:T.border }} /></div><div className="grid sm:grid-cols-2 gap-4">{([{title:"Tax Calculator",desc:"Compare old vs new income tax regime for your exact income"},{title:"Deduction Optimizer",desc:"Find all deductions under 80C, 80D, HRA, NPS and more"}]).map((tool)=>(<a key={tool.title} href="https://financialai-frontend-lime.vercel.app/app/tax" style={{ background:"rgba(47,230,255,0.04)",border:"1px solid rgba(47,230,255,0.15)",borderRadius:14,padding:"18px 18px 14px",textDecoration:"none",display:"block",transition:"transform 0.2s" }} onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";}} onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";}}><div className="font-semibold text-sm text-white mb-1">{tool.title}</div><div className="text-xs" style={{ color:T.textSecondary,lineHeight:1.6 }}>{tool.desc}</div><div className="text-xs font-semibold mt-3 flex items-center gap-1" style={{ color:T.cyan }}>Explore <ChevronRight size={11} /></div></a>))}</div></div>
          <div className="mb-10"><div className="flex items-center gap-3 mb-5"><div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background:"rgba(122,60,255,0.12)",border:"1px solid rgba(122,60,255,0.3)" }}><Bot size={16} style={{ color:T.purple }} /></div><h3 className="text-base font-bold text-white">AI Tools</h3><div style={{ flex:1,height:1,background:T.border }} /></div><div className="grid sm:grid-cols-2 gap-4">{([{title:"Financial Assistant",desc:"Chat with AI for instant answers already knows your numbers",href:"https://financialai-frontend-lime.vercel.app/app/ai"},{title:"Report Explainer",desc:"Upload any financial document and get a plain-English summary",href:"https://financialai-frontend-lime.vercel.app/app/ai"}]).map((tool)=>(<a key={tool.title} href={tool.href} style={{ background:"rgba(122,60,255,0.05)",border:"1px solid rgba(122,60,255,0.2)",borderRadius:14,padding:"18px 18px 14px",textDecoration:"none",display:"block",transition:"transform 0.2s" }} onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";}} onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";}}><div className="font-semibold text-sm text-white mb-1">{tool.title}</div><div className="text-xs" style={{ color:T.textSecondary,lineHeight:1.6 }}>{tool.desc}</div><div className="text-xs font-semibold mt-3 flex items-center gap-1" style={{ color:T.purple }}>Explore <ChevronRight size={11} /></div></a>))}</div></div>
          <div className="text-center mt-8"><a href="https://financialai-frontend-lime.vercel.app/app/tools" className="btn-primary inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold" style={{ textDecoration:"none" }}>Explore All Tools <ArrowRight size={16} /></a></div>
        </div>
      </section>

      {/* ── Pricing ────────────────────────────────────────────────────────── */}
      <section id="pricing" className="py-20 px-4">
        <div style={{ width: "100%", padding: "0 4vw" }}>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4"
              style={{ background: `rgba(49,233,129,0.1)`, border: `1px solid rgba(49,233,129,0.25)` }}>
              <Sparkles size={12} style={{ color: T.green }} />
              <span className="text-xs font-medium" style={{ color: T.green }}>Simple Pricing</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: T.fontDisplay, letterSpacing: "-0.03em" }}>
              Choose How Your Agent Works For You
            </h2>
            <p style={{ color: T.textSecondary, maxWidth: 520, margin: "0 auto" }}>
              Start free. Upgrade when you want more intelligence, more automation, and more control.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 items-start" style={{ width: "100%", padding: "0 4vw" }}>
            {/* FREE */}
            <div className="pricing-card p-7 rounded-2xl flex flex-col"
              style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${T.border}`, backdropFilter: "blur(8px)", minHeight: 480 }}>
              <div className="mb-5">
                <div className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: T.textSecondary }}>Free</div>
                <div className="text-4xl font-extrabold text-white mb-1" style={{ fontFamily: T.fontDisplay }}>₹0</div>
                <div className="text-xs mb-3" style={{ color: T.textSecondary }}>Forever free</div>
              </div>
              <ul className="space-y-2.5 flex-1 mb-6">
                {["Financial Health Score", "Basic tools (SIP, EMI, calculators)", "Limited AI Agent chat (10/day)", "Basic insights & reports"].map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm" style={{ color: T.textSecondary }}>
                    <CheckCircle size={13} style={{ color: T.green, flexShrink: 0, marginTop: 2 }} />{f}
                  </li>
                ))}
              </ul>
              <button type="button" className="btn-ghost w-full py-3 rounded-xl text-sm font-semibold"
                onClick={() => window.location.href = 'https://financialai-frontend-lime.vercel.app/quick-score'}>Activate My Agent (Free)</button>
            </div>

            {/* PRO - most popular */}
            <div className="pricing-popular pricing-card p-7 rounded-2xl relative overflow-hidden flex flex-col"
              style={{ background: "rgba(47,230,255,0.05)", border: "1px solid rgba(47,230,255,0.35)", backdropFilter: "blur(8px)", boxShadow: "0 0 60px rgba(47,230,255,0.08)", minHeight: 480 }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: T.gradPrimary }} />
              <div className="absolute top-4 right-4 text-xs font-bold px-2.5 py-1 rounded-full"
                style={{ background: T.gradPrimary, color: "#fff" }}>Most Popular</div>
              <div className="mb-5">
                <div className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: T.cyan }}>Pro</div>
                <div className="text-4xl font-extrabold text-white mb-1" style={{ fontFamily: T.fontDisplay }}>₹99</div>
                <div className="text-xs mb-3" style={{ color: T.textSecondary }}>per month · cancel anytime</div>
              </div>
              <ul className="space-y-2.5 flex-1 mb-5">
                {["Everything in Free", "5 AI Agent reports/month", "Advanced insights & recommendations", "Portfolio & tax intelligence", "Goal-based planning", "AI Agent chat (20/day)"].map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm" style={{ color: "#C5D3E8" }}>
                    <CheckCircle size={13} style={{ color: T.cyan, flexShrink: 0, marginTop: 2 }} />{f}
                  </li>
                ))}
              </ul>
              <button type="button" className="btn-primary w-full py-3 rounded-xl text-sm font-semibold"
                onClick={() => window.location.href = 'https://financialai-frontend-lime.vercel.app/quick-score'}>Upgrade to Pro</button>
              <p className="text-center text-xs mt-2" style={{ color: T.textMuted }}>7-day refund · no lock-in</p>
            </div>

            {/* ELITE */}
            <div className="pricing-card p-7 rounded-2xl relative overflow-hidden flex flex-col"
              style={{ background: "rgba(49,233,129,0.03)", border: "1px solid rgba(49,233,129,0.3)", backdropFilter: "blur(8px)", minHeight: 480 }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: T.gradSuccess }} />
              <div className="mb-5">
                <div className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: T.green }}>Elite</div>
                <div className="text-4xl font-extrabold text-white mb-1" style={{ fontFamily: T.fontDisplay }}>₹499</div>
                <div className="text-xs mb-3" style={{ color: T.textSecondary }}>per month · cancel anytime</div>
              </div>
              <ul className="space-y-2.5 flex-1 mb-5">
                {["Everything in Pro", "Unlimited AI Agent reports", "Weekly personalized insights", "Risk analysis & wealth projection", "Retirement & insurance planning", "Full tax optimization", "Unlimited AI Agent chat", "PDF report downloads", "Dedicated advisor support"].map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm" style={{ color: "#C5D3E8" }}>
                    <CheckCircle size={13} style={{ color: T.green, flexShrink: 0, marginTop: 2 }} />{f}
                  </li>
                ))}
              </ul>
              <button type="button" className="w-full py-3 rounded-xl text-sm font-bold"
                style={{ background: T.gradSuccess, color: "#070A12", border: "none", cursor: "pointer" }}
                onClick={() => window.location.href = 'https://financialai-frontend-lime.vercel.app/quick-score'}>Get Elite</button>
              <p className="text-center text-xs mt-2" style={{ color: T.textMuted }}>7-day refund · no lock-in</p>
            </div>
            
            {/* ELITE+ AGENT PLAN */}
<div className="pricing-card p-7 rounded-2xl relative overflow-hidden flex flex-col"
  style={{ background: "rgba(122,60,255,0.05)", border: "1px solid rgba(122,60,255,0.35)", backdropFilter: "blur(8px)", minHeight: 480 }}>
  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: T.gradPrimary }} />
  <div className="absolute top-4 right-4 text-xs font-bold px-2.5 py-1 rounded-full"
    style={{ background: "rgba(122,60,255,0.2)", color: T.purple, border: "1px solid rgba(122,60,255,0.4)" }}>

  </div>
  <div className="mb-5">
    <div className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: T.purple }}>Elite+ Agent Plan</div>
    <div className="text-4xl font-extrabold text-white mb-1" style={{ fontFamily: T.fontDisplay }}>₹999</div>
    <div className="text-xs mb-3" style={{ color: T.textSecondary }}>per month · fully autonomous</div>
  </div>
  <div className="text-xs font-semibold uppercase tracking-widest mb-2 mt-1" style={{ color: "rgba(122,60,255,0.7)" }}>
    Agent Features
  </div>
  <ul className="space-y-2.5 flex-1 mb-5">
    {[
      "Everything in Elite",
      "Daily automatic financial analysis",
      "Proactive alerts before problems happen",
      "Agent works even when you are offline",
      "Weekly AI financial roadmap",
      "Continuous risk monitoring",
      "Full memory across sessions",
      "Personalised strategy engine",
      "Priority AI processing",
    ].map((f) => (
      <li key={f} className="flex items-start gap-2.5 text-sm" style={{ color: "#C5D3E8" }}>
        <CheckCircle size={13} style={{ color: T.purple, flexShrink: 0, marginTop: 2 }} />{f}
      </li>
    ))}
  </ul>
  <button type="button" className="w-full py-3 rounded-xl text-sm font-bold"
    style={{ background: "rgba(122,60,255,0.15)", color: T.purple, border: "1px solid rgba(122,60,255,0.4)", cursor: "pointer" }}
    onClick={() => window.location.href = 'https://financialai-frontend-lime.vercel.app/quick-score'}>
    Get Elite+
  </button>
  <p className="text-center text-xs mt-2" style={{ color: T.textMuted }}>7-day refund · no lock-in</p>
</div>
          </div>
        </div>
      </section>

      {/* ── Market Reality ─────────────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div style={{ width: "100%", padding: "0 4vw" }}>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4"
              style={{ background: "rgba(29,158,117,0.08)", border: "1px solid rgba(29,158,117,0.22)" }}>
              <span className="text-xs font-medium" style={{ color: "#1D9E75" }}>Market Reality</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: T.fontDisplay, letterSpacing: "-0.03em" }}>
              Where every finance app sits - and where we don't
            </h2>
            <p style={{ color: T.textSecondary, maxWidth: 540, margin: "0 auto" }}>
              No competitor combines: works from any document + gives a clear action plan + built for India's salaried middle class.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {([
              ["88%", "of Indians expect greater financial uncertainty in the next 5 years", "#2FE6FF"],
              ["35%", "have never reviewed their finances - not once", "#7A3CFF"],
              ["5.3%", "household savings rate - lowest in 50 years (RBI 2025)", "#31E981"],
              ["400M", "middle-class Indians with zero access to financial guidance", "#EF9F27"],
            ] as [string, string, string][]).map(([n, l, c]) => (
              <div key={n} style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${T.border}`, borderTop: `2px solid ${c}`, borderRadius: 14, padding: "20px 18px" }}>
                <div className="text-3xl font-extrabold mb-2" style={{ color: c, fontFamily: T.fontDisplay }}>{n}</div>
                <div className="text-xs" style={{ color: T.textSecondary, lineHeight: 1.6 }}>{l}</div>
              </div>
            ))}
          </div>
          {/* ── Positioning map ── */}
          <PositioningMap />
          <div style={{ marginTop: 20, background: "rgba(47,230,255,0.03)", border: "1px dashed rgba(47,230,255,0.2)", borderRadius: 16, padding: "24px 28px" }}>
            <div className="text-sm font-semibold mb-2" style={{ color: T.cyan }}>The gap nobody filled - until now</div>
            <p className="text-sm" style={{ color: T.textSecondary, lineHeight: 1.8, margin: 0 }}>
              Bank apps show your balance. Groww tracks your SIPs. CAs charge ₹5,000 per session. Generic AI has no India context.
              None of them take your salary slip and tell you:{" "}
              <span style={{ color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>your score is 64/100, your EMI ratio is too high, fix this first.</span>
              {" "}That is exactly what FinHealth does.{" "}
              <span style={{ color: T.textMuted }}>Sources: ABSLI A-Nishchit Index 2024 · Morgan Stanley India 2025 · RBI Financial Savings Data 2025.</span>
            </p>
          </div>
        </div>
      </section>


      {/* ── Testimonials ───────────────────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div style={{ width: "100%", padding: "0 4vw" }}>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4"
              style={{ background: "rgba(47,230,255,0.06)", border: "1px solid rgba(47,230,255,0.18)" }}>
              <span className="text-xs font-medium" style={{ color: T.cyan }}>What users say</span>
            </div>
            <h2 className="text-3xl font-bold text-white" style={{ fontFamily: T.fontDisplay, letterSpacing: "-0.03em" }}>
              Real feedback from real users
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {([
              {
                name: "Rohan M.",
                role: "Software Engineer, Pune",
                avatar: "RM",
                color: "#2FE6FF",
                text: "I always knew I should track my finances but never did. FinHealth gave me a score in 60 seconds and told me exactly what was wrong - my EMI ratio was 48%, way too high. Fixed it in 3 months.",
                stars: 5,
              },
              {
                name: "Priya S.",
                role: "Product Manager, Bangalore",
                avatar: "PS",
                color: "#31E981",
                text: "Finally something built for Indian salaries. It understands SIPs, NPS, HRA - not just US 401k stuff. The tax comparison alone saved me ₹18,000 this year.",
                stars: 5,
              },
              {
                name: "Amit K.",
                role: "CA, Mumbai",
                avatar: "AK",
                color: "#7A3CFF",
                text: "I recommend this to clients who can't afford a full advisory session. It does the basic financial health check properly - scoring, red flags, and action steps. Solid product.",
                stars: 5,
              },
            ] as {name:string;role:string;avatar:string;color:string;text:string;stars:number}[]).map((t) => (
              <div key={t.name} className="card-hover p-6 rounded-2xl flex flex-col gap-4"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(8px)" }}>
                <div style={{ display: "flex", gap: 4 }}>
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} size={13} style={{ color: "#EF9F27", fill: "#EF9F27" }} />
                  ))}
                </div>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.75, flex: 1 }}>"{t.text}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: `${t.color}18`, border: `1px solid ${t.color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: t.color, flexShrink: 0 }}>
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-semibold" style={{ color: "#F2F5FF" }}>{t.name}</div>
                    <div className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Security & Trust ───────────────────────────────────────────────── */}
      <section className="py-16 px-4">
        <div style={{ width: "100%", padding: "0 4vw" }}>
          <div style={{ background: "rgba(47,230,255,0.03)", border: "1px solid rgba(47,230,255,0.12)", borderRadius: 24, padding: "40px 36px" }}>
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4"
                style={{ background: "rgba(49,233,129,0.08)", border: "1px solid rgba(49,233,129,0.2)" }}>
                <ShieldCheck size={12} style={{ color: "#31E981" }} />
                <span className="text-xs font-medium" style={{ color: "#31E981" }}>Security & Privacy</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: T.fontDisplay }}>
                Your financial data is safe with us
              </h2>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)", maxWidth: 440, margin: "0 auto" }}>
                We built FinHealth360 with a simple rule: your data belongs to you, not us.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {([
                { icon: "🔒", title: "No bank login required", desc: "We never ask for your bank credentials, UPI PIN, or net banking access. Ever." },
                { icon: "🚫", title: "Your data is never sold", desc: "We have no advertisers. We earn from subscriptions only. Your data has no commercial value to us." },
                { icon: "🗑️", title: "Delete anytime", desc: "Go to Settings → Delete Account. Your data is permanently erased within 24 hours. No questions." },
                { icon: "📄", title: "Documents processed & discarded", desc: "Uploaded bank statements are analyzed and immediately discarded. Nothing is stored on our servers." },
                { icon: "🔐", title: "End-to-end encrypted", desc: "All data is encrypted in transit (TLS 1.3) and at rest. Your profile is private to you alone." },
                { icon: "🇮🇳", title: "Built for India, stored in India", desc: "Your data stays on Indian servers (Supabase Mumbai region). Compliant with DPDPA 2023." },
              ] as {icon:string;title:string;desc:string}[]).map((item) => (
                <div key={item.title} style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "16px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14 }}>
                  <span style={{ fontSize: 20, flexShrink: 0, marginTop: 2 }}>{item.icon}</span>
                  <div>
                    <div className="text-sm font-semibold mb-1" style={{ color: "#F2F5FF" }}>{item.title}</div>
                    <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)", lineHeight: 1.65 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
                Questions about privacy? Email us at{" "}
                <a href="mailto:support@finhealth360.ai" style={{ color: T.cyan, textDecoration: "none" }}>support@finhealth360.ai</a>
                {" "}— we respond within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* ── Final CTA ──────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at center, rgba(47,230,255,0.07) 0%, transparent 60%)` }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />
        <div className="relative z-10" style={{ width: "100%", padding: "0 4vw", textAlign: "center" }}>
          <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: T.fontDisplay, letterSpacing: "-0.03em" }}>
            88% of Indians expect more financial uncertainty.<br />Be the one who actually does something about it.
          </h2>
          <p className="mb-8" style={{ color: T.textSecondary }}>Upload any document - salary slip, bank statement, tax return. Get your FinHealth Score, your risks, and your action plan in under 60 seconds. No bank login. No CA required.</p>
          <button type="button"
            className="btn-primary px-10 py-4 rounded-xl text-lg flex items-center gap-2 mx-auto"
            onClick={handleCTA}>
            {isLoggedIn ? "Go to Dashboard →" : "Check My Financial Health - Free →"} <ChevronRight size={20} />
          </button>
          <div className="flex items-center justify-center gap-6 mt-8 flex-wrap">
            {[[ShieldCheck, T.green, "100% Private"], [Award, T.cyan, "No hidden fees"], [Shield, T.purple, "No bank access"]].map(([Icon, color, text], i) => (
              <div key={i} className="flex items-center gap-2">
                {/* @ts-ignore */}
                <Icon size={14} style={{ color }} />
                <span style={{ fontSize: "12px", color: T.textSecondary }}>{text as string}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="py-12 px-4" style={{ borderTop: `1px solid ${T.border}` }}>
        <div style={{ width: "100%", padding: "0 4vw" }}>
          <div className="grid sm:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded flex items-center justify-center" style={{ background: T.gradPrimary }}><Sparkles size={12} /></div>
                <span className="font-bold" style={{ background: T.gradPrimary, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>FinHealth360</span>
              </div>
              <p className="text-xs" style={{ color: T.textSecondary, lineHeight: 1.6 }}>Your personal AI Financial Agent - monitors, detects, and guides. Built for India.</p>
            </div>
            <div>
              <div className="font-semibold text-white text-sm mb-3">Platform</div>
              <Link href="/app/dashboard"  className="block text-xs mb-2" style={{ color: T.textSecondary }}>Dashboard</Link>
              <Link href="/app/tools"      className="block text-xs mb-2" style={{ color: T.textSecondary }}>Tools Hub</Link>
              <Link href="/app/ai"         className="block text-xs mb-2" style={{ color: T.textSecondary }}>AI Assistant</Link>
              <a    href="#pricing"      className="block text-xs mb-2" style={{ color: T.textSecondary }}>Pricing</a>
            </div>
            <div>
              <div className="font-semibold text-white text-sm mb-3">Legal</div>
              <Link href="/privacy-policy" className="block text-xs mb-2" style={{ color: T.textSecondary }}>Privacy Policy</Link>
              <Link href="/terms"          className="block text-xs mb-2" style={{ color: T.textSecondary }}>Terms of Use</Link>
            </div>

          </div>
          <div className="pt-6" style={{ borderTop: `1px solid ${T.border}` }}>
            <p className="text-xs text-center" style={{ color: T.textSecondary }}>© 2026 FinHealth360. For informational purposes only. Not financial advice.</p>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}


