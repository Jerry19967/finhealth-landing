const fs = require('fs');
let c = fs.readFileSync('app/page.tsx', 'utf8');

c = c.replace(/FinHealth AI/g, 'FinHealth360');
c = c.replace(/We built FinHealth with/g, 'We built FinHealth360 with');
c = c.replace(/support@finhealth\.ai/g, 'support@finhealth360.ai');
c = c.replace(/2026 FinHealth AI\./g, '2026 FinHealth360.');
c = c.replace("import { useState, useEffect } from 'react';", "import { useState, useEffect, useRef } from 'react';");

const anims = `
        @keyframes particleDrift { 0%{transform:translate(0,0)} 100%{transform:translate(30px,-40px)} }
        @keyframes float1 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(40px,-30px) scale(1.08)} 66%{transform:translate(-20px,20px) scale(0.95)} }
        @keyframes float2 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(-30px,20px) scale(1.05)} 66%{transform:translate(25px,-15px) scale(0.97)} }
        @keyframes float3 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(15px,25px)} }
        @keyframes pulseRing { 0%{transform:scale(0.85);opacity:0.6} 100%{transform:scale(2.2);opacity:0} }
        @keyframes gridMove { 0%{background-position:0 0} 100%{background-position:60px 60px} }
        .glow-on-hover { transition: box-shadow 0.3s ease, border-color 0.3s ease, transform 0.2s ease; }
        .glow-on-hover:hover { box-shadow: 0 0 28px rgba(47,230,255,0.13); transform: translateY(-4px); }`;

c = c.replace('.step-connector {', anims + '\n        .step-connector {');

const helpers = `
function useInView(threshold) {
  threshold = threshold || 0.15;
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

`;

c = c.replace('function PositioningMap()', helpers + 'function PositioningMap()');

const mesh = `<div className="min-h-screen" style={{ background: T.pageBg }}>
      <ParticleField />
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '10%', left: '5%', width: '40vw', height: '40vw', background: 'radial-gradient(ellipse, rgba(47,230,255,0.05) 0%, transparent 65%)', animation: 'float1 22s ease-in-out infinite', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', top: '40%', right: '5%', width: '35vw', height: '35vw', background: 'radial-gradient(ellipse, rgba(122,60,255,0.065) 0%, transparent 65%)', animation: 'float2 28s ease-in-out infinite', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: '10%', left: '30%', width: '28vw', height: '28vw', background: 'radial-gradient(ellipse, rgba(49,233,129,0.038) 0%, transparent 65%)', animation: 'float3 18s ease-in-out infinite', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.011) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.011) 1px, transparent 1px)', backgroundSize: '60px 60px', animation: 'gridMove 10s linear infinite', opacity: 0.7 }} />
      </div>`;

c = c.replace('<div className="min-h-screen" style={{ background: T.pageBg }}>', mesh);

const pulseRings = `<div className="flex items-center justify-center mb-5" style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', width: 134, height: 134, borderRadius: '50%', border: '1px solid rgba(47,230,255,0.2)', animation: 'pulseRing 3s ease-out infinite' }} />
                <div style={{ position: 'absolute', width: 134, height: 134, borderRadius: '50%', border: '1px solid rgba(122,60,255,0.15)', animation: 'pulseRing 3s 1.2s ease-out infinite' }} />`;

c = c.replace('<div className="flex items-center justify-center mb-5">', pulseRings);
c = c.replace(/className="tool-card"/g, 'className="tool-card glow-on-hover"');
c = c.replace('className="card-hover p-6 relative overflow-hidden group"', 'className="card-hover glow-on-hover p-6 relative overflow-hidden group"');

fs.writeFileSync('app/page.tsx', c, 'utf8');
console.log('SUCCESS - ' + c.split('\n').length + ' lines');
