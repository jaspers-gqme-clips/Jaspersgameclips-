import { useState, useEffect, useRef } from 'react'

// Simple falling ash effect using absolutely positioned divs
function FallingAsh({ count = 32 }) {
  const [ashes, setAshes] = useState([])

  useEffect(() => {
    // Generate random ash particles
    setAshes(Array.from({ length: count }, (_, i) => ({
      key: i + '-' + Math.random(),
      left: Math.random() * 100,    // percent across the screen
      size: 3 + Math.random() * 2,  // px
      delay: Math.random() * 6,     // seconds
      duration: 4 + Math.random() * 4 // seconds
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
          background: 'rgba(255,255,255,0.27)',
          opacity: 0.65,
          filter: 'blur(0.6px)',
          boxShadow: `0 0 6px 1.7px #fff7, 0 0 14px 2px #f79542aa`,
          animation: `ash-fall ${a.duration}s linear ${a.delay}s infinite`
        }} />
      )}
      {/* Inline keyframes for mobile Next.js simplicity */}
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

export default function Home() {
  const [videos, setVideos] = useState([])
  const [showVideos, setShowVideos] = useState(false)
  const [showMsg, setShowMsg] = useState(false)
  const [currentVid, setCurrentVid] = useState(null)
  const [loading, setLoading] = useState(false)

  // YouTube channel info
  const CHANNEL_ID = 'UUZndgFhIftlNCrTuM3S30CA'
  const API_KEY = 'AIzaSyCLzWim4RLvw9FBTyRv6Rv1eaRi4CMIUIw'
  const MAX_RESULTS = 8

  useEffect(() => {
    async function fetchVideos() {
      setLoading(true)
      try {
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${MAX_RESULTS}`
        )
        const data = await res.json()
        if (data.items) {
          const vids = data.items
            .filter(item => item.id.kind === "youtube#video")
            .map(item => ({
              id: item.id.videoId,
              title: item.snippet.title,
              thumb: item.snippet.thumbnails.medium.url
            }))
          setVideos(vids)
        }
      } catch (e) {
        setVideos([])
      }
      setLoading(false)
    }
    if (showVideos && videos.length === 0) fetchVideos()
  }, [showVideos])

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      background: `url('/bg1.png') center center / cover no-repeat`,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'center',
      position: 'relative',
      paddingBottom: '10vh',
      overflow: 'hidden'
    }}>
      {/* Falling ash effect */}
      <FallingAsh count={32} />
      {/* --- Logo block REMOVED --- */}
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
      {/* YouTube Video Modal */}
      {showVideos && (
        <div style={modalBackdrop} onClick={() => { setShowVideos(false); setCurrentVid(null) }}>
          <div style={modalStyle} onClick={e => e.stopPropagation()}>
            <button style={closeBtnStyle} onClick={() => { setShowVideos(false); setCurrentVid(null) }}>✖</button>
            <h2 style={{ color: '#fff', fontWeight: 700, marginBottom: 16 }}>Jasper's Rust Videos</h2>
            {loading && <div style={{ color: "#fff" }}>Loading…</div>}
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr',
              gap: '1.1rem 0.7rem', width: '100%', margin: '1.2rem 0'
            }}>
              {videos.map(v => (
                <div key={v.id}
                  style={{
                    background: '#1d1107c2', borderRadius: 14, boxShadow: '0 2px 8px #2b1307c8',
                    cursor: 'pointer', overflow: 'hidden', border: '2px solid #ff730088',
                    display: 'flex', flexDirection: 'column', alignItems: 'center'
                  }}
                  onClick={() => setCurrentVid(v.id)}
                >
                  <img src={v.thumb} alt={v.title} style={{ width: '100%', borderRadius: '12px 12px 0 0' }} />
                  <div style={{
                    fontSize: '0.98rem', color: '#fff5e1', fontFamily: 'Bebas Neue, Impact, sans-serif',
                    padding: '0.44rem 0.28rem 0.22rem 0.28rem', textAlign: 'center', minHeight: 38
                  }}>{v.title}</div>
                </div>
              ))}
            </div>
            {/* Player Modal */}
            {currentVid && (
              <div style={playerModalBackdrop} onClick={() => setCurrentVid(null)}>
                <div style={playerModalStyle} onClick={e => e.stopPropagation()}>
                  <iframe
                    width="100%"
                    height="220"
                    src={`https://www.youtube.com/embed/${currentVid}?autoplay=1`}
                    title="Rust Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ borderRadius: '18px' }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Message Board Modal */}
      {showMsg && (
        <div style={modalBackdrop} onClick={() => setShowMsg(false)}>
          <div style={modalStyle} onClick={e => e.stopPropagation()}>
            <button style={closeBtnStyle} onClick={() => setShowMsg(false)}>✖</button>
            <h2 style={{ color: '#fff', fontWeight: 700, marginBottom: 12 }}>Message Board</h2>
            <iframe
              src="https://minnit.chat/JasperRustRoom?embed&&nickname="
              style={{
                border: '1px solid #6e3207',
                width: '98%',
                height: '320px',
                borderRadius: '16px',
                margin: '8px 0'
              }}
              allowTransparency={true}
              title="Jasper's Rust Message Board"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  )
}

// Button style
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

// Modal/backdrop styles
const modalBackdrop = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(16,8,2,0.93)',
  zIndex: 100,
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
const playerModalBackdrop = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(24,10,2,0.85)',
  zIndex: 300,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}
const playerModalStyle = {
  background: '#241203',
  borderRadius: 18,
  padding: '1.1rem 0.5rem',
  boxShadow: '0 6px 28px #9e4509e2',
  maxWidth: '97vw',
  minWidth: '83vw'
              }
