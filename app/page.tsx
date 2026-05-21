import Link from "next/link";

export const metadata = {
  title: "FinHealth360 — AI-Powered Financial Health Platform for Indians",
  description: "Get your Financial Health Score in 2 minutes. AI-powered insights, SIP calculator, tax optimizer and more. Built for Indian investors. Free to start.",
  keywords: "financial health score, SIP calculator, tax calculator, AI financial advisor India, investment tracker, EMI calculator",
  openGraph: {
    title: "FinHealth360 — Your AI Financial Agent",
    description: "Know your Financial Health Score in 2 minutes. Get AI-powered insights specific to your income, goals and investments.",
    type: "website",
    url: "https://finhealth-landing.vercel.app",
    images: [{ url: "https://financialai-frontend-lime.vercel.app/logo.png" }],
  },
  twitter: { card: "summary_large_image", title: "FinHealth360 — AI Financial Health Platform", description: "Free Financial Health Score + AI Agent for Indian investors." },
};

const APP = "https://financialai-frontend-lime.vercel.app";
const G = "linear-gradient(90deg,#00D4FF,#7B5CF0)";
const C = { teal: "#00D4FF", purple: "#7B5CF0", bg: "#070A12", card: "#0C1020", border: "rgba(255,255,255,0.08)", muted: "rgba(255,255,255,0.45)" };

export default function Home() {
  return (
    <main style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Bricolage Grotesque', sans-serif", color: "#fff" }}>
      <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..60,400;12..60,600;12..60,700;12..60,800;12..60,900&display=swap" rel="stylesheet" />

      {/* NAV */}
      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 40px", borderBottom: `1px solid ${C.border}`, position: "sticky", top: 0, background: "rgba(7,10,18,0.94)", backdropFilter: "blur(16px)", zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 9, background: G, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, fontWeight: 800 }}>F</div>
          <span style={{ fontSize: 19, fontWeight: 800, letterSpacing: "-0.02em" }}>FinHealth<span style={{ background: G, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>360</span></span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {["#features", "#tools", "#pricing"].map((href, i) => (
            <Link key={href} href={href} style={{ color: C.muted, fontSize: 14, fontWeight: 500 }}>{["Features", "Tools", "Pricing"][i]}</Link>
          ))}
          <Link href={`${APP}/login`} style={{ color: C.muted, fontSize: 14, fontWeight: 500 }}>Login</Link>
          <Link href={`${APP}/quick-score`} style={{ padding: "10px 22px", background: G, borderRadius: 10, color: "#fff", fontSize: 14, fontWeight: 700, boxShadow: "0 4px 20px rgba(0,212,255,0.2)" }}>Check My Score →</Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "88px 40px 72px", textAlign: "center" }}>
        <div className="fade-up" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.22)", borderRadius: 100, padding: "6px 18px", marginBottom: 32, fontSize: 13, color: C.teal, fontWeight: 700 }}>
          ⚡ AI Agent monitors your finances 24/7
        </div>
        <h1 className="fade-up-2" style={{ fontSize: "clamp(36px,5.5vw,68px)", fontWeight: 900, lineHeight: 1.08, marginBottom: 24, letterSpacing: "-0.03em" }}>
          You&apos;re not bad with money.<br />
          <span style={{ background: G, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>You just don&apos;t know where you stand.</span>
        </h1>
        <p className="fade-up-3" style={{ fontSize: 19, color: C.muted, maxWidth: 580, margin: "0 auto 48px", lineHeight: 1.7 }}>
          India&apos;s household savings rate just hit a 50-year low. 88% of salaried Indians expect more financial uncertainty.<br />
          Upload any document — salary slip, bank statement, tax return — and get your FinHealth Score, your risks, and exactly what to do next. In 60 seconds.
        </p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 20 }}>
          <Link href={`${APP}/quick-score`} style={{ padding: "16px 36px", background: G, borderRadius: 14, color: "#fff", fontSize: 16, fontWeight: 700, boxShadow: "0 8px 32px rgba(0,212,255,0.28)", display: "inline-flex", alignItems: "center", gap: 8 }}>
            Check My Financial Health - Free →
          </Link>
          <Link href="#features" style={{ padding: "16px 32px", background: "rgba(255,255,255,0.05)", border: `1px solid ${C.border}`, borderRadius: 14, color: "#fff", fontSize: 16, fontWeight: 600 }}>
            See How It Works
          </Link>
        </div>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.28)" }}>Free forever · No credit card · 2-minute setup</p>

        {/* Score preview card */}
        <div style={{ maxWidth: 520, margin: "64px auto 0", background: C.card, border: `1px solid ${C.border}`, borderRadius: 24, padding: "28px 32px", textAlign: "left", boxShadow: "0 24px 80px rgba(0,0,0,0.5)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
            <div>
              <div style={{ fontSize: 13, color: C.muted, marginBottom: 2 }}>Financial Health Score</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)" }}>Updated just now</div>
            </div>
            <div style={{ width: 72, height: 72, borderRadius: "50%", background: "conic-gradient(#00D4FF 264deg, rgba(255,255,255,0.06) 0deg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: C.card, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 20, fontWeight: 900, color: "#fff" }}>72</span>
                <span style={{ fontSize: 9, color: C.muted }}>/ 100</span>
              </div>
            </div>
          </div>
          {[["Cash Flow", 78, C.teal], ["Investments", 65, C.purple], ["Insurance", 55, "#f5a623"], ["Debt", 82, "#31e981"]].map(([label, val, color]) => (
            <div key={label as string} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 5 }}>
                <span style={{ color: "rgba(255,255,255,0.7)" }}>{label as string}</span>
                <span style={{ color: color as string, fontWeight: 700 }}>{val as number}%</span>
              </div>
              <div style={{ height: 5, background: "rgba(255,255,255,0.06)", borderRadius: 3 }}>
                <div style={{ height: "100%", width: `${val}%`, background: color as string, borderRadius: 3 }} />
              </div>
            </div>
          ))}
          <div style={{ marginTop: 16, padding: "10px 14px", background: "rgba(0,212,255,0.06)", border: "1px solid rgba(0,212,255,0.15)", borderRadius: 10, fontSize: 12, color: C.muted }}>
            💡 Your Agent found <span style={{ color: C.teal, fontWeight: 700 }}>₹18,000/yr</span> in insurance savings - review detected
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "44px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 32, textAlign: "center" }}>
          {[["83%", "Indians have no financial plan"], ["50yr low", "Household savings rate"], ["2 min", "To get your health score"], ["₹18K/yr", "Avg savings found per user"]].map(([stat, label]) => (
            <div key={stat}>
              <div style={{ fontSize: 34, fontWeight: 900, background: G, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: 6 }}>{stat}</div>
              <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.5 }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ maxWidth: 1100, margin: "0 auto", padding: "96px 40px" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <h2 style={{ fontSize: 40, fontWeight: 900, marginBottom: 14, letterSpacing: "-0.02em" }}>Everything your finances need</h2>
          <p style={{ fontSize: 17, color: C.muted, maxWidth: 480, margin: "0 auto" }}>One platform. AI-powered. Built for Indian investors.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 20 }}>
          {[
            { icon: "📊", title: "Financial Health Score", desc: "Get a 0-100 score across savings, investments, debt, insurance and tax. Know exactly where you stand and what to fix first.", color: C.teal },
            { icon: "🤖", title: "AI Financial Agent", desc: "Autonomous agent monitors your profile 24/7, detects issues before they compound, and sends proactive alerts — not generic tips.", color: C.purple },
            { icon: "💡", title: "Personalised Insights", desc: "Specific actions based on your income, EMIs, SIPs, and goals. Not generic advice — your numbers, your situation.", color: "#f5a623" },
            { icon: "📈", title: "Investment Tracker", desc: "Track SIPs, mutual funds, stocks, and FDs in one place. Get rebalancing signals and real CAGR analysis.", color: "#31e981" },
            { icon: "🧮", title: "Financial Tools", desc: "SIP calculator, EMI calculator, tax regime comparator, retirement planner — all personalised to your actual numbers.", color: C.teal },
            { icon: "🔒", title: "Bank-Grade Security", desc: "Your data never leaves India. Encrypted at rest, PIN-protected access, zero data selling. Ever.", color: C.purple },
          ].map(({ icon, title, desc, color }) => (
            <div key={title} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 20, padding: "28px 24px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: color }} />
              <div style={{ fontSize: 32, marginBottom: 14 }}>{icon}</div>
              <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 10, color: "#fff" }}>{title}</h3>
              <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.7, margin: 0 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TOOLS */}
      <section id="tools" style={{ background: "rgba(255,255,255,0.02)", borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "80px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontSize: 36, fontWeight: 900, marginBottom: 12 }}>Free financial tools</h2>
            <p style={{ fontSize: 16, color: C.muted }}>All personalised to your income and profile</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 14 }}>
            {[
              ["SIP Calculator", "/app/tools/sip-calculator"],
              ["EMI Calculator", "/app/tools/emi-calculator"],
              ["Tax Calculator", "/app/tools/tax-calculator"],
              ["Retirement Planner", "/app/tools/retirement-planner"],
              ["Goal Planner", "/app/tools/goal-planner"],
              ["Portfolio Analyzer", "/app/tools/portfolio-analyzer"],
              ["Coverage Checker", "/app/tools/coverage-checker"],
              ["Loan Comparison", "/app/tools/loan-comparison"],
            ].map(([name, path]) => (
              <Link key={name} href={`${APP}${path}`} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: "16px 14px", textAlign: "center", fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.75)", display: "block" }}>
                {name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ maxWidth: 1100, margin: "0 auto", padding: "96px 40px" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <h2 style={{ fontSize: 40, fontWeight: 900, marginBottom: 14 }}>Simple, honest pricing</h2>
          <p style={{ fontSize: 17, color: C.muted }}>Start free. Upgrade when you need more.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 18 }}>
          {[
            { plan: "Free", price: "₹0", period: "forever", color: C.teal, features: ["Financial Health Score", "Basic insights", "5 tool uses/month"], pop: false },
            { plan: "Pro", price: "₹66", period: "/month", color: C.purple, features: ["Everything in Free", "AI one-time analysis", "Unlimited tools", "Score breakdown"], pop: false },
            { plan: "Elite", price: "₹333", period: "/month", color: "#f5a623", features: ["Everything in Pro", "Agent Insights Panel", "Weekly tips", "Score intelligence"], pop: true },
            { plan: "Elite+", price: "₹666", period: "/month", color: "#31e981", features: ["Everything in Elite", "24/7 autonomous agent", "Proactive alerts", "Memory & roadmap"], pop: false },
          ].map(({ plan, price, period, color, features, pop }) => (
            <div key={plan} style={{ background: pop ? `linear-gradient(135deg,rgba(0,212,255,0.07),rgba(123,92,240,0.07))` : C.card, border: pop ? `1px solid rgba(0,212,255,0.3)` : `1px solid ${C.border}`, borderRadius: 20, padding: "28px 22px", position: "relative" }}>
              {pop && <div style={{ position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)", background: G, borderRadius: 100, padding: "4px 16px", fontSize: 11, fontWeight: 700, whiteSpace: "nowrap", color: "#fff" }}>MOST POPULAR</div>}
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: color }} />
                <span style={{ fontSize: 15, fontWeight: 700 }}>{plan}</span>
              </div>
              <div style={{ fontSize: 34, fontWeight: 900, marginBottom: 4 }}>{price}<span style={{ fontSize: 13, color: C.muted, fontWeight: 400 }}>{period}</span></div>
              <div style={{ height: 1, background: C.border, margin: "18px 0" }} />
              {features.map(f => (
                <div key={f} style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", marginBottom: 9, display: "flex", gap: 8, alignItems: "flex-start" }}>
                  <span style={{ color, flexShrink: 0, marginTop: 1 }}>✓</span>{f}
                </div>
              ))}
              <Link href={`${APP}/app/pricing`} style={{ display: "block", marginTop: 22, padding: "12px", background: pop ? G : "rgba(255,255,255,0.06)", borderRadius: 10, color: "#fff", fontSize: 14, fontWeight: 700, textAlign: "center" }}>
                Get Started →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* TRUST */}
      <section style={{ background: "rgba(255,255,255,0.02)", borderTop: `1px solid ${C.border}`, padding: "80px 40px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: 36, fontWeight: 900, marginBottom: 48 }}>Built for trust</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 24 }}>
            {[
              { icon: "🔒", title: "Bank-grade encryption", desc: "All data encrypted at rest and in transit" },
              { icon: "🇮🇳", title: "India-first", desc: "Servers in India, data never leaves the country" },
              { icon: "🚫", title: "Zero data selling", desc: "We never sell your financial data. Ever." },
              { icon: "📋", title: "SEBI compliant", desc: "For informational purposes, not investment advice" },
            ].map(({ icon, title, desc }) => (
              <div key={title} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: "24px 20px" }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{icon}</div>
                <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>{title}</div>
                <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.6 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ maxWidth: 680, margin: "0 auto", padding: "100px 40px", textAlign: "center" }}>
        <h2 style={{ fontSize: 40, fontWeight: 900, marginBottom: 18, letterSpacing: "-0.02em", lineHeight: 1.15 }}>Your finances deserve better than a spreadsheet.</h2>
        <p style={{ fontSize: 18, color: C.muted, marginBottom: 40, lineHeight: 1.7 }}>Join Indians who know exactly where their money stands — and what to do next.</p>
        <Link href={`${APP}/quick-score`} style={{ display: "inline-block", padding: "18px 48px", background: G, borderRadius: 14, color: "#fff", fontSize: 18, fontWeight: 700, boxShadow: "0 8px 40px rgba(0,212,255,0.3)" }}>
          Check My Score - Free →
        </Link>
        <p style={{ marginTop: 16, fontSize: 13, color: "rgba(255,255,255,0.28)" }}>No credit card. 2 minutes. Free forever.</p>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: `1px solid ${C.border}`, padding: "28px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontSize: 14, fontWeight: 700 }}>FinHealth<span style={{ background: G, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>360</span></span>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.28)", margin: 0 }}>© 2026 FinHealth360 · For informational purposes only. Not financial advice.</p>
          <div style={{ display: "flex", gap: 20 }}>
            {[["Privacy", "/privacy"], ["Terms", "/terms"], ["Contact", "/contact"]].map(([label, path]) => (
              <Link key={label} href={`${APP}${path}`} style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>{label}</Link>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
