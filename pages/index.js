import { useState } from 'react'

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
  `}</style>
);

function FallingAsh({ count = 32 }) {
  const [ashes, setAshes] = useState([])

  React.useEffect(() => {
    setAshes(Array.from({ length: count }, (_, i) => ({
      key: i + '-' + Math.random(),
      left: Math.random() * 100,
      size: 3 + Math.random() * 2,
      delay: Math.random() * 6,
      duration: 4 + Math.random() * 4
    })))
  }, [count])

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
  )
}

function FallingEmbers({ count = 10 }) {
  const [embers, setEmbers] = useState([])

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
  }, [count])

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
  )
}

export default function Home() {
  const [showVideos, setShowVideos] = useState(false)
  const [showMsg, setShowMsg] = useState(false)

  return (
    <div style={{
      minHeight: '100vh',
      minWidth: '100vw',
      background: `url('/bg1.png') center center / cover no-repeat #140a04`,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'center',
      position: 'relative',
      paddingBottom: '10vh',
      overflow: 'hidden'
    }}>
      <GlobalStyle />
      <FallingAsh count={32} />
      <FallingEmbers count={12} />
      <button
        style={btnStyle}
        onClick={() => setShowVideos(v => !v)}
      >
        WATCH JASPER'S RUST VIDS
      </button>
      <button
        style={btnStyle}
        onClick={() => setShowMsg(m => !m)}
      >
        MESSAGE BOARD
      </button>
      {/* YouTube Videos Modal */}
      {showVideos && (
        <div style={modalBackdrop} onClick={() => setShowVideos(false)}>
          <div style={modalStyle} onClick={e => e.stopPropagation()}>
            <button style={closeBtnStyle} onClick={() => setShowVideos(false)}>✖</button>
            <h2 style={{ color: '#fff', fontWeight: 700, marginBottom: 16 }}>Jasper's Rust Videos</h2>
            <iframe
              width="100%"
              height="360"
              src="https://www.youtube.com/embed?listType=user_uploads&list=UCZndgFhIftlNCrTuM3S30CA"
              style={{ borderRadius: 16, border: 0 }}
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="Jasper's Rust Videos"
            ></iframe>
          </div>
        </div>
      )}
      {/* Fossil.chat Message Board Modal */}
      {showMsg && (
        <div style={modalBackdrop} onClick={() => setShowMsg(false)}>
          <div style={modalStyle} onClick={e => e.stopPropagation()}>
            <button style={closeBtnStyle} onClick={() => setShowMsg(false)}>✖</button>
            <h2 style={{ color: '#fff', fontWeight: 700, marginBottom: 12 }}>Message Board</h2>
            <iframe
              src="https://fossil.chat/room/jaspers-rust-room?embed=1"
              style={{
                width: "98%",
                height: "320px",
                border: "none",
                borderRadius: "16px",
                background: "#241203"
              }}
              allowTransparency={true}
              title="Jasper's Rust Room"
            />
          </div>
        </div>
      )}
    </div>
  )
}

const btnStyle = {
  width: '90vw',
  maxWidth: 340,
  fontSize: '1.3rem',
  fontFamily: 'Bebas Neue, Impact, sans-serif',
  background: 'linear-gradient(90deg, #ff7300, #bc3200 90%)',
  color: '#fffbe8',
  border: '2px solid #2e1800',
  borderRadius: 18,
  padding: '1.1rem 0.4rem',
  boxShadow: '0 2px 18px #2227',
  textShadow: '1px 2px 2px #5e2b10',
  marginBottom: '1.1rem',
  letterSpacing: 2,
  cursor: 'pointer',
  transition: 'transform 0.08s, box-shadow 0.14s'
}

const modalBackdrop = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(16,8,2,0.93)',
  zIndex: 1000,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}
const modalStyle = {
  background: '#251305e8',
  borderRadius: 20,
  maxWidth: '98vw',
  width: 400,
  minWidth: '92vw',
  maxHeight: '85vh',
  padding: '1rem 0.8rem 1.6rem 0.8rem',
  boxShadow: '0 8px 32px #8e3c07dd',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  overflowY: 'auto',
  position: 'relative'
}
const closeBtnStyle = {
  background: 'none',
  border: 'none',
  color: '#ff8200',
  fontSize: '2.1rem',
  fontWeight: 'bold',
  position: 'absolute',
  right: 18,
  top: 14,
  cursor: 'pointer',
  zIndex: 202,
  textShadow: '1px 2px 8px #000'
}
