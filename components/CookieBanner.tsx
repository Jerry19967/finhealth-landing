"use client";
import { useState, useEffect } from "react";
export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem("cookie_consent")) setVisible(true);
  }, []);
  const accept = () => { localStorage.setItem("cookie_consent", "accepted"); setVisible(false); };
  const decline = () => { localStorage.setItem("cookie_consent", "declined"); setVisible(false); };
  if (!visible) return null;
  return (
    <div style={{ position:"fixed", bottom:0, left:0, right:0, zIndex:9999, background:"#0D1117", borderTop:"1px solid #1E2A3A", padding:"16px 24px", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
      <p style={{ color:"#9CA3AF", fontSize:13, margin:0, maxWidth:600 }}>
        We use cookies for analytics to improve your experience. See our <a href="/privacy" style={{ color:"#60D0FF" }}>Privacy Policy</a>.
      </p>
      <div style={{ display:"flex", gap:10 }}>
        <button onClick={decline} style={{ padding:"8px 18px", borderRadius:8, fontSize:13, background:"transparent", color:"#9CA3AF", border:"1px solid #1E2A3A", cursor:"pointer" }}>Decline</button>
        <button onClick={accept} style={{ padding:"8px 18px", borderRadius:8, fontSize:13, background:"#60D0FF", color:"#000", border:"none", cursor:"pointer", fontWeight:700 }}>Accept</button>
      </div>
    </div>
  );
}
