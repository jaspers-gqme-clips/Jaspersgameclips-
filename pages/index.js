import React from 'react';

const GlobalStyle = () => (
  <style>{`
    html, body, #__next {
      height: 100%;
      margin: 0;
      padding: 0;
      background: #140a04;
      box-sizing: border-box;
      overflow-x: hidden;
    }
    body {
      font-family: 'Bebas Neue', Impact, sans-serif;
    }
    * {
      box-sizing: inherit;
    }
    @media (max-width: 520px) {
      h1 { font-size: 2.5rem !important; }
    }
  `}</style>
);

function FallingAsh({ count = 32 }) {
  const [ashes, setAshes] = React.useState([]);
  React.useEffect(() => {
    setAshes(Array.from({ length: count }, (_, i) => ({
      key: i + '-' + Math.random(),
      left: Math.random() * 100,
      size: 3 + Math.random() * 2,
      delay: Math.random() * 6,
      duration: 4 + Math.random() * 4
    })))
  }, [count]);
  return (
    <div style={{
      pointerEvents: 'none',
      position: 'fixed',
      left: 0, top: 0, width: '100vw', height: '100vh',
      zIndex: 1
    }}>
      {ashes.map(a =>
        <div key={a.key} style={{
          position: 'absolute',
          left: `${a.left}vw`,
          top: '-8px',
          width: a.size,
          height: a.size * (0.8 + Math.random() * 0.4),
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.19)',
          opacity: 0.7,
          filter: 'blur(0.7px)',
          boxShadow: `0 0 6px 1.3px #fff9, 0 0 11px 2px #e4b96e88`,
          animation: `ash-fall ${a.duration}s linear ${a.delay}s infinite`
        }} />
      )}
      <style>{`
        @keyframes ash-fall {
          0% { transform: translateY(0) scaleX(1); opacity: 0.9;}
          93% { opacity: 0.55;}
          100% { transform: translateY(98vh) scaleX(0.92); opacity: 0;}
        }
      `}</style>
    </div>
  );
}

function FallingEmbers({ count = 10 }) {
  const [embers, setEmbers] = React.useState([]);
  React.useEffect(() => {
    setEmbers(Array.from({ length: count }, (_, i) => ({
      key: i + '-' + Math.random(),
      left: 6 + Math.random() * 88,
      size: 6 + Math.random() * 8,
      color: Math.random() > 0.3 ? "#ff4500" : "#ffda5c",
      delay: Math.random() * 7,
      duration: 2.7 + Math.random() * 4,
      rotate: Math.random() * 50 - 25
    })))
  }, [count]);
  return (
    <div style={{
      pointerEvents: 'none',
      position: 'fixed',
      left: 0, top: 0, width: '100vw', height: '100vh',
      zIndex: 2
    }}>
      {embers.map(a =>
        <div key={a.key} style={{
          position: 'absolute',
          left: `${a.left}vw`,
          top: '-10px',
          width: a.size,
          height: a.size * (0.41 + Math.random() * 0.55),
          borderRadius: '50% 46% 41% 59%/52% 62% 39% 48%',
          background: `radial-gradient(ellipse at 60% 40%, ${a.color} 0%, #a72102 100%)`,
          boxShadow: `0 0 7px 2px #ff7b0bdd, 0 0 18px 7px #d42102a0`,
          opacity: 0.88,
          transform: `rotate(${a.rotate}deg)`,
          animation: `ember-fall ${a.duration}s cubic-bezier(0.7,0.09,0.8,1) ${a.delay}s infinite`
        }} />
      )}
      <style>{`
        @keyframes ember-fall {
          0% { transform: translateY(0) scaleX(1) rotate(0deg); opacity: 1;}
          80% { opacity: 0.9;}
          100% { transform: translateY(98vh) scaleX(0.98) rotate(14deg); opacity: 0;}
        }
      `}</style>
    </div>
  );
}

export default function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      minWidth: '100vw',
      background: `url('/bg1.png') center center / cover no-repeat #140a04`,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <GlobalStyle />
      <FallingAsh count={32} />
      <FallingEmbers count={12} />
      {/* Main Logo Area (just Jasper badge as background) */}
      <div style={{
        marginTop: '7vw',
        marginBottom: 12,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        {/* If you want to use a separate logo file, update src below */}
        <img
          src="/bg1.png"
          alt="Jasper Rust Badge"
          style={{
            width: 160, height: 160,
            borderRadius: 36,
            marginBottom: 12,
            boxShadow: '0 8px 40px #140a04bb'
          }}
        />
        <h1 style={{
          color: '#ff7300',
          fontSize: '3.2rem',
          letterSpacing: 3,
          fontFamily: 'Bebas Neue, Impact, sans-serif',
          textShadow: '0 4px 24px #2a1307, 1px 2px 1px #fff1',
          margin: 0
        }}>
          JASPER
        </h1>
        {/* Tagline example (optional) */}
        {/* <div style={{
          color: '#fff8',
          fontWeight: 500,
          fontSize: '1.1rem',
          marginTop: 4,
          marginBottom: 8,
          textShadow: '1px 1px 4px #000'
        }}>Rust Game Clips & Community</div> */}
      </div>
      {/* Buttons */}
      <div style={{
        marginTop: 30, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'
      }}>
        <a
          href="https://www.youtube.com/@jaspersgameclips/videos"
          target="_blank"
          rel="noopener noreferrer"
          style={bigBtnStyle}
        >
          🎥 WATCH JASPER'S RUST CLIPS
        </a>
        <a
          href="https://tlk.io/jaspersrustroom"
          target="_blank"
          rel="noopener noreferrer"
          style={{ ...bigBtnStyle, marginTop: 18 }}
        >
          💬 MESSAGE BOARD
        </a>
      </div>
    </div>
  );
}

const bigBtnStyle = {
  width: '92vw',
  maxWidth: 420,
  fontSize: '1.26rem',
  fontFamily: 'Bebas Neue, Impact, sans-serif',
  background: 'linear-gradient(90deg, #ff7300, #bc3200 90%)',
  color: '#fffbe8',
  border: '2.3px solid #2e1800',
  borderRadius: 19,
  padding: '1.25rem 0.3rem',
  boxShadow: '0 2px 18px #2227',
  textShadow: '1px 2px 2px #5e2b10',
  letterSpacing: 2,
  cursor: 'pointer',
  textDecoration: 'none',
  marginBottom: '1.05rem',
  textAlign: 'center',
  fontWeight: 600,
  transition: 'transform 0.10s, box-shadow 0.18s',
  display: 'block'
};
