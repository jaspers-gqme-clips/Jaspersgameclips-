import React, { useState } from 'react'

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
          left: `${a.left
