import Link from "next/link";

export const metadata = {
  title: "FinHealth360 — AI-Powered Financial Health Platform for Indians",
  description: "Get your Financial Health Score in 2 minutes. AI-powered insights specific to your income, goals and investments. Free to start.",
};

export default function Home() {
  return (
    <main style={{ background: "#070A12", minHeight: "100vh", fontFamily: "'Bricolage Grotesque', sans-serif", color: "#fff" }}>
      {/* Nav */}
      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 40px", borderBottom: "1px solid rgba(255,255,255,0.06)", position: "sticky", top: 0, background: "rgba(7,10,18,0.92)", backdropFilter: "blur(12px)", zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg,#00D4FF,#7B5CF0)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>⚡</div>
          <span style={{ fontSize: 18, fontWeight: 800 }}>FinHealth<span style={{ color: "#00D4FF" }}>360</span></span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <Link href="#features" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: 14 }}>Features</Link>
          <Link href="#pricing" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: 14 }}>Pricing</Link>
          <Link href="https://financialai-frontend-lime.vercel.app/login" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: 14 }}>Login</Link>
          <Link href="https://financialai-frontend-lime.vercel.app/quick-score" style={{ padding: "10px 22px", background: "linear-gradient(90deg,#00D4FF,#7B5CF0)", borderRadius: 10, color: "#fff", textDecoration: "none", fontSize: 14, fontWeight: 700 }}>Check My Score →</Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "100px 40px 80px", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.2)", borderRadius: 100, padding: "6px 18px", marginBottom: 32, fontSize: 13, color: "#00D4FF", fontWeight: 600 }}>
          ⚡ AI Agent monitors your finances 24/7
        </div>
        <h1 style={{ fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 900, lineHeight: 1.1, marginBottom: 24, letterSpacing: "-0.02em" }}>
          You&apos;re not bad with money.<br />
          <span style={{ background: "linear-gradient(90deg,#00D4FF,#7B5CF0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>You just don&apos;t know where you stand.</span>
        </h1>
        <p style={{ fontSize: 20, color: "rgba(255,255,255,0.6)", maxWidth: 600, margin: "0 auto 48px", lineHeight: 1.7 }}>
          India&apos;s first AI Financial Agent. Get your Financial Health Score, personalised insights, and autonomous monitoring — all in 2 minutes.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="https://financialai-frontend-lime.vercel.app/quick-score" style={{ padding: "16px 36px", background: "linear-gradient(90deg,#00D4FF,#7B5CF0)", borderRadius: 14, color: "#fff", textDecoration: "none", fontSize: 16, fontWeight: 700, boxShadow: "0 8px 32px rgba(0,212,255,0.25)" }}>
            Check My Financial Health - Free →
          </Link>
          <Link href="#features" style={{ padding: "16px 36px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 14, color: "#fff", textDecoration: "none", fontSize: 16, fontWeight: 600 }}>
            See How It Works
          </Link>
        </div>
        <p style={{ marginTop: 20, fontSize: 13, color: "rgba(255,255,255,0.3)" }}>Free forever · No credit card · 2 minute setup</p>
      </section>

      {/* Stats */}
      <section style={{ borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "40px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 40, textAlign: "center" }}>
          {[
            { stat: "83%", label: "Indians have no financial plan" },
            { stat: "50yr", label: "Low in household savings rate" },
            { stat: "2 min", label: "To get your health score" },
            { stat: "₹18K", label: "Avg savings found per user/yr" },
          ].map(({ stat, label }) => (
            <div key={stat}>
              <div style={{ fontSize: 36, fontWeight: 900, background: "linear-gradient(90deg,#00D4FF,#7B5CF0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{stat}</div>
              <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", marginTop: 6 }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" style={{ maxWidth: 1100, margin: "0 auto", padding: "100px 40px" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <h2 style={{ fontSize: 42, fontWeight: 900, marginBottom: 16 }}>Everything your finances need</h2>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.5)", maxWidth: 500, margin: "0 auto" }}>One platform. AI-powered. Built for Indian investors.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 24 }}>
          {[
            { icon: "📊", title: "Financial Health Score", desc: "Get a 0-100 score across savings, investments, debt, insurance and tax. Know exactly where you stand." },
            { icon: "🤖", title: "AI Financial Agent", desc: "Autonomous agent monitors your profile 24/7, detects issues, and sends proactive alerts before problems compound." },
            { icon: "💡", title: "Personalised Insights", desc: "Not generic tips — specific actions based on your income, EMIs, SIPs, and goals. In plain Hindi/English." },
            { icon: "📈", title: "Investment Tracker", desc: "Track SIPs, mutual funds, stocks, FDs in one place. Get rebalancing signals and CAGR analysis." },
            { icon: "🧮", title: "Financial Tools", desc: "SIP calculator, EMI calculator, tax regime comparator, retirement planner — all personalised to your numbers." },
            { icon: "🔒", title: "Bank-Grade Security", desc: "Your data never leaves India. Encrypted at rest, PIN-protected access, no data selling. Ever." },
          ].map(({ icon, title, desc }) => (
            <div key={title} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "32px 28px" }}>
              <div style={{ fontSize: 36, marginBottom: 16 }}>{icon}</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{title}</h3>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, margin: 0 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" style={{ background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "100px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <h2 style={{ fontSize: 42, fontWeight: 900, marginBottom: 16 }}>Simple, honest pricing</h2>
            <p style={{ fontSize: 18, color: "rgba(255,255,255,0.5)" }}>Start free. Upgrade when you need more.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 20 }}>
            {[
              { plan: "Free", price: "₹0", period: "forever", features: ["Financial Health Score", "Basic insights", "5 tool uses/month"], highlight: false },
              { plan: "Pro", price: "₹66", period: "/month", features: ["Everything in Free", "AI Analysis", "Unlimited tools", "Score breakdown"], highlight: false },
              { plan: "Elite", price: "₹333", period: "/month", features: ["Everything in Pro", "Agent Insights Panel", "Weekly tips", "Score intelligence"], highlight: true },
              { plan: "Elite+", price: "₹666", period: "/month", features: ["Everything in Elite", "24/7 autonomous agent", "Proactive alerts", "Agent memory & roadmap"], highlight: false },
            ].map(({ plan, price, period, features, highlight }) => (
              <div key={plan} style={{ background: highlight ? "linear-gradient(135deg,rgba(0,212,255,0.08),rgba(123,92,240,0.08))" : "rgba(255,255,255,0.03)", border: highlight ? "1px solid rgba(0,212,255,0.3)" : "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "32px 24px", position: "relative" }}>
                {highlight && <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "linear-gradient(90deg,#00D4FF,#7B5CF0)", borderRadius: 100, padding: "4px 16px", fontSize: 11, fontWeight: 700, whiteSpace: "nowrap" }}>MOST POPULAR</div>}
                <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{plan}</div>
                <div style={{ fontSize: 36, fontWeight: 900, marginBottom: 4 }}>{price}<span style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", fontWeight: 400 }}>{period}</span></div>
                <div style={{ height: 1, background: "rgba(255,255,255,0.08)", margin: "20px 0" }} />
                {features.map(f => (
                  <div key={f} style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", marginBottom: 10, display: "flex", gap: 8 }}>
                    <span style={{ color: "#00D4FF" }}>✓</span> {f}
                  </div>
                ))}
                <Link href="https://financialai-frontend-lime.vercel.app/app/pricing" style={{ display: "block", marginTop: 24, padding: "12px", background: highlight ? "linear-gradient(90deg,#00D4FF,#7B5CF0)" : "rgba(255,255,255,0.06)", borderRadius: 10, color: "#fff", textDecoration: "none", fontSize: 14, fontWeight: 600, textAlign: "center" }}>
                  Get Started →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ maxWidth: 700, margin: "0 auto", padding: "100px 40px", textAlign: "center" }}>
        <h2 style={{ fontSize: 42, fontWeight: 900, marginBottom: 20 }}>Your finances deserve better than a spreadsheet.</h2>
        <p style={{ fontSize: 18, color: "rgba(255,255,255,0.5)", marginBottom: 40, lineHeight: 1.7 }}>Join thousands of Indians who know exactly where their money stands.</p>
        <Link href="https://financialai-frontend-lime.vercel.app/quick-score" style={{ display: "inline-block", padding: "18px 48px", background: "linear-gradient(90deg,#00D4FF,#7B5CF0)", borderRadius: 14, color: "#fff", textDecoration: "none", fontSize: 18, fontWeight: 700, boxShadow: "0 8px 40px rgba(0,212,255,0.3)" }}>
          Check My Score - Free →
        </Link>
        <p style={{ marginTop: 16, fontSize: 13, color: "rgba(255,255,255,0.3)" }}>No credit card. 2 minutes. Free forever.</p>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "32px 40px", textAlign: "center" }}>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", margin: 0 }}>
          © 2026 FinHealth360 · For informational purposes only. Not financial advice. ·{" "}
          <Link href="https://financialai-frontend-lime.vercel.app/privacy" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>Privacy</Link>
          {" · "}
          <Link href="https://financialai-frontend-lime.vercel.app/terms" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>Terms</Link>
        </p>
      </footer>
    </main>
  );
}
