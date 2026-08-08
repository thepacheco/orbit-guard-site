'use client';

import React, { useRef, useEffect, useState } from 'react';
import * as LucideIcons from 'lucide-react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
  type: 'ring' | 'binary' | 'spark' | 'warp';
  text?: string;
  rotation: number;
  vRot: number;
}

interface Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'cable' | 'caster' | 'binary' | 'meteor';
}

export default function IntegratedSpaceGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const [hudScore, setHudScore] = useState(0);
  const [hudHighScore, setHudHighScore] = useState(0);
  const [levelName, setLevelName] = useState('LEVEL 1: DEEP SPACE');
  const [displayState, setDisplayState] = useState<'idle' | 'playing' | 'gameover'>('idle');

  // Mutable game state in ref for 60fps loop with zero freezes
  const stateRef = useRef({
    gameState: 'idle' as 'idle' | 'playing' | 'gameover',
    distance: 0,
    highScore: 0,
    level: 1,
    speed: 6,
    shakeTimer: 0,
    playerY: 220,
    playerVy: 0,
    isGrounded: true,
    playerRotation: 0,
    obstacles: [] as Obstacle[],
    particles: [] as Particle[],
    trail: [] as { x: number; y: number; alpha: number }[],
    lastObstacleX: 0,
    bgHue: 220,
  });

  // Lazy Web Audio Synthesizer
  const getAudioCtx = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  const playJumpSound = () => {
    try {
      const ctx = getAudioCtx();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      const now = ctx.currentTime;
      osc.frequency.setValueAtTime(240, now);
      osc.frequency.exponentialRampToValueAtTime(720, now + 0.14);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.14);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.14);
    } catch {}
  };

  const playExplosionSound = () => {
    try {
      const ctx = getAudioCtx();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      const now = ctx.currentTime;
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.exponentialRampToValueAtTime(30, now + 0.35);
      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.35);
    } catch {}
  };

  const playLevelUpSound = () => {
    try {
      const ctx = getAudioCtx();
      if (!ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        const now = ctx.currentTime + idx * 0.07;
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.12);
      });
    } catch {}
  };

  // Read high score from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('og_integrated_space_high');
      if (saved) {
        const val = parseInt(saved, 10);
        stateRef.current.highScore = val;
        setHudHighScore(val);
      }
    } catch {}
  }, []);

  const triggerJump = () => {
    const s = stateRef.current;
    if (s.gameState === 'idle' || s.gameState === 'gameover') {
      s.gameState = 'playing';
      s.distance = 0;
      s.level = 1;
      s.speed = 6;
      s.playerY = 220;
      s.playerVy = 0;
      s.isGrounded = true;
      s.obstacles = [];
      s.particles = [];
      s.trail = [];
      s.lastObstacleX = 0;
      setLevelName('LEVEL 1: DEEP SPACE');
      setDisplayState('playing');
      playJumpSound();
      return;
    }
    if (s.gameState === 'playing' && s.isGrounded) {
      s.playerVy = -13.5;
      s.isGrounded = false;
      playJumpSound();
      // Spark particles
      for (let i = 0; i < 8; i++) {
        s.particles.push({
          x: 110,
          y: 244,
          vx: (Math.random() - 0.5) * 5,
          vy: -Math.random() * 3 - 1,
          life: 1,
          maxLife: 20,
          size: 3 + Math.random() * 3,
          color: '#5A74FF',
          type: 'spark',
          rotation: 0,
          vRot: 0,
        });
      }
    }
  };

  const triggerExplosion = (x: number, y: number) => {
    const s = stateRef.current;
    s.shakeTimer = 24;
    playExplosionSound();
    s.particles = [];
    for (let i = 0; i < 28; i++) {
      const angle = (Math.PI * 2 * i) / 28;
      const vel = 4 + Math.random() * 8;
      s.particles.push({
        x,
        y,
        vx: Math.cos(angle) * vel,
        vy: Math.sin(angle) * vel,
        life: 1,
        maxLife: 50,
        size: 4 + Math.random() * 6,
        color: i % 2 === 0 ? '#5A74FF' : '#05CE78',
        type: 'ring',
        rotation: Math.random() * Math.PI,
        vRot: (Math.random() - 0.5) * 0.3,
      });
    }
    for (let i = 0; i < 20; i++) {
      const angle = Math.random() * Math.PI * 2;
      const vel = 3 + Math.random() * 7;
      s.particles.push({
        x,
        y,
        vx: Math.cos(angle) * vel,
        vy: Math.sin(angle) * vel - 2,
        life: 1,
        maxLife: 60,
        size: 14,
        color: Math.random() > 0.5 ? '#05CE78' : '#FFFFFF',
        type: 'binary',
        text: Math.random() > 0.5 ? '0' : '1',
        rotation: Math.random() * Math.PI,
        vRot: (Math.random() - 0.5) * 0.2,
      });
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const groundY = 244;
    const playerRadius = 24;
    const playerX = 110;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        triggerJump();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    const gameLoop = () => {
      const s = stateRef.current;

      // Dynamic Canvas Background based on Level
      ctx.fillStyle = s.level === 3 ? '#0B0D1B' : s.level === 2 ? '#110C22' : '#0B1120';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Screen Shake
      ctx.save();
      if (s.shakeTimer > 0) {
        s.shakeTimer--;
        const dx = (Math.random() - 0.5) * s.shakeTimer * 0.8;
        const dy = (Math.random() - 0.5) * s.shakeTimer * 0.8;
        ctx.translate(dx, dy);
      }

      // Background Space Grid / Star Warp Lines
      if (s.level === 3) {
        // Hyperspace speed lines
        ctx.strokeStyle = 'rgba(90, 116, 255, 0.25)';
        ctx.lineWidth = 1.5;
        for (let i = 0; i < 16; i++) {
          const y = (i * 20 + s.distance * 12) % canvas.height;
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.width, y);
          ctx.stroke();
        }
      } else {
        // Starfield Grid
        ctx.strokeStyle = s.level === 2 ? 'rgba(168, 85, 247, 0.1)' : 'rgba(255, 255, 255, 0.05)';
        ctx.lineWidth = 1;
        const step = 40;
        const offset = (s.distance * 4) % step;
        for (let x = -offset; x < canvas.width; x += step) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, canvas.height);
          ctx.stroke();
        }
      }

      // Ground Neon Line
      const groundColor = s.level === 3 ? '#A855F7' : s.level === 2 ? '#EC4899' : '#5A74FF';
      ctx.strokeStyle = groundColor;
      ctx.lineWidth = 3;
      ctx.shadowColor = groundColor;
      ctx.shadowBlur = 14;
      ctx.beginPath();
      ctx.moveTo(0, groundY);
      ctx.lineTo(canvas.width, groundY);
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Gameplay Physics Update
      if (s.gameState === 'playing') {
        s.distance += 0.25;
        const currentMeters = Math.floor(s.distance);
        setHudScore(currentMeters);

        // Level Wave Progression Check
        if (currentMeters >= 500 && s.level < 3) {
          s.level = 3;
          s.speed = 11;
          setLevelName('LEVEL 3: HYPERSPACE JUMP');
          playLevelUpSound();
        } else if (currentMeters >= 200 && s.level < 2) {
          s.level = 2;
          s.speed = 8.5;
          setLevelName('LEVEL 2: NEBULA WARP');
          playLevelUpSound();
        }

        if (currentMeters > s.highScore) {
          s.highScore = currentMeters;
          setHudHighScore(currentMeters);
          try {
            localStorage.setItem('og_integrated_space_high', currentMeters.toString());
          } catch {}
        }

        // Apply Gravity
        s.playerVy += 0.65;
        s.playerY += s.playerVy;
        s.playerRotation += s.speed * 0.07;

        if (s.playerY >= groundY - playerRadius) {
          s.playerY = groundY - playerRadius;
          s.playerVy = 0;
          s.isGrounded = true;
        }

        // Trail Record
        s.trail.unshift({ x: playerX, y: s.playerY, alpha: 0.6 });
        if (s.trail.length > 10) s.trail.pop();

        // Spawn Obstacles
        if (canvas.width - s.lastObstacleX > (200 - s.level * 20) + Math.random() * 160) {
          const types: ('cable' | 'caster' | 'binary' | 'meteor')[] = s.level === 3
            ? ['cable', 'caster', 'binary', 'meteor']
            : ['cable', 'caster', 'binary'];
          const type = types[Math.floor(Math.random() * types.length)];
          const obsH = type === 'cable' ? 34 : type === 'caster' ? 38 : type === 'meteor' ? 44 : 40;
          const obsW = type === 'binary' ? 32 : 36;
          s.obstacles.push({
            x: canvas.width + 40,
            y: groundY - obsH,
            width: obsW,
            height: obsH,
            type,
          });
          s.lastObstacleX = canvas.width + 40;
        }
        s.lastObstacleX -= s.speed;

        // Move Obstacles & Collision Test
        for (let i = s.obstacles.length - 1; i >= 0; i--) {
          const obs = s.obstacles[i];
          obs.x -= s.speed;

          const margin = 5;
          if (
            playerX + playerRadius - margin > obs.x &&
            playerX - playerRadius + margin < obs.x + obs.width &&
            s.playerY + playerRadius - margin > obs.y &&
            s.playerY - playerRadius + margin < obs.y + obs.height
          ) {
            triggerExplosion(playerX, s.playerY);
            s.gameState = 'gameover';
            setDisplayState('gameover');
          }

          if (obs.x + obs.width < -50) {
            s.obstacles.splice(i, 1);
          }
        }
      }

      // Draw Player Motion Trail
      s.trail.forEach((pt, i) => {
        pt.alpha *= 0.82;
        ctx.beginPath();
        ctx.arc(pt.x - i * 3, pt.y, playerRadius * (1 - i * 0.05), 0, Math.PI * 2);
        ctx.fillStyle = s.level === 3 ? `rgba(168, 85, 247, ${pt.alpha * 0.4})` : `rgba(90, 116, 255, ${pt.alpha * 0.4})`;
        ctx.fill();
      });

      // Draw Orbit Player Ring (if alive)
      if (s.gameState !== 'gameover') {
        ctx.save();
        ctx.translate(playerX, s.playerY);
        ctx.rotate(s.playerRotation);

        // Outer Ring
        ctx.beginPath();
        ctx.arc(0, 0, playerRadius, 0, Math.PI * 2);
        ctx.fillStyle = groundColor;
        ctx.shadowColor = groundColor;
        ctx.shadowBlur = 18;
        ctx.fill();

        // Inner Segment
        ctx.beginPath();
        ctx.arc(0, 0, playerRadius - 6, 0, Math.PI);
        ctx.fillStyle = '#05CE78';
        ctx.fill();

        // Center Hole
        ctx.beginPath();
        ctx.arc(0, 0, 8, 0, Math.PI * 2);
        ctx.fillStyle = '#0B1120';
        ctx.shadowBlur = 0;
        ctx.fill();

        ctx.restore();
      }

      // Draw Obstacles
      s.obstacles.forEach(obs => {
        ctx.save();
        if (obs.type === 'cable') {
          ctx.fillStyle = '#FF4757';
          ctx.shadowColor = '#FF4757';
          ctx.shadowBlur = 12;
          ctx.beginPath();
          ctx.moveTo(obs.x, obs.y + obs.height);
          ctx.lineTo(obs.x + obs.width / 2, obs.y);
          ctx.lineTo(obs.x + obs.width, obs.y + obs.height);
          ctx.closePath();
          ctx.fill();
        } else if (obs.type === 'caster') {
          ctx.strokeStyle = '#FFA502';
          ctx.shadowColor = '#FFA502';
          ctx.shadowBlur = 12;
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.arc(obs.x + obs.width / 2, obs.y + obs.height / 2, obs.width / 2, 0, Math.PI * 2);
          ctx.stroke();
        } else if (obs.type === 'meteor') {
          ctx.fillStyle = '#EC4899';
          ctx.shadowColor = '#EC4899';
          ctx.shadowBlur = 16;
          ctx.beginPath();
          ctx.arc(obs.x + obs.width / 2, obs.y + obs.height / 2, obs.width / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = 'rgba(5, 206, 120, 0.15)';
          ctx.strokeStyle = '#05CE78';
          ctx.shadowColor = '#05CE78';
          ctx.shadowBlur = 10;
          ctx.lineWidth = 2;
          ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
          ctx.strokeRect(obs.x, obs.y, obs.width, obs.height);
          ctx.fillStyle = '#05CE78';
          ctx.font = 'bold 15px monospace';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('01', obs.x + obs.width / 2, obs.y + obs.height / 2);
        }
        ctx.restore();
      });

      // Update & Draw Explosion Particles
      for (let i = s.particles.length - 1; i >= 0; i--) {
        const p = s.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.22;
        p.life++;
        p.rotation += p.vRot;
        const progress = p.life / p.maxLife;
        const alpha = Math.max(0, 1 - progress);

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        if (p.type === 'binary') {
          ctx.fillStyle = p.color;
          ctx.globalAlpha = alpha;
          ctx.font = '900 16px monospace';
          ctx.fillText(p.text || '0', 0, 0);
        } else if (p.type === 'ring') {
          ctx.strokeStyle = p.color;
          ctx.globalAlpha = alpha;
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 1.5);
          ctx.stroke();
        } else {
          ctx.fillStyle = p.color;
          ctx.globalAlpha = alpha;
          ctx.beginPath();
          ctx.arc(0, 0, p.size * (1 - progress), 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();

        if (p.life >= p.maxLife) {
          s.particles.splice(i, 1);
        }
      }

      ctx.restore();
      animId = requestAnimationFrame(gameLoop);
    };

    animId = requestAnimationFrame(gameLoop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 900, margin: '0 auto' }}>
      {/* Background Canvas Stage */}
      <div
        onClick={triggerJump}
        style={{
          position: 'relative',
          borderRadius: 32,
          overflow: 'hidden',
          border: '1px solid rgba(90, 116, 255, 0.25)',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.5)',
          background: '#0B1120',
          cursor: 'pointer',
        }}
      >
        <canvas
          ref={canvasRef}
          width={900}
          height={320}
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />

        {/* HUD Top Header */}
        <div
          style={{
            position: 'absolute',
            top: 20,
            left: 24,
            right: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            pointerEvents: 'none',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#05CE78', boxShadow: '0 0 10px #05CE78' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#A855F7', textTransform: 'uppercase', letterSpacing: '0.14em', fontWeight: 800 }}>
              {levelName}
            </span>
          </div>

          <div style={{ display: 'flex', gap: 24, fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 800 }}>
            <span style={{ color: '#05CE78' }}>
              DIST: {hudScore}m
            </span>
            <span style={{ color: '#5A74FF' }}>
              BEST: {hudHighScore}m
            </span>
          </div>
        </div>

        {/* Start Overlay */}
        {displayState === 'idle' && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(11, 17, 32, 0.7)',
              backdropFilter: 'blur(4px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              textAlign: 'center',
            }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#05CE78', textTransform: 'uppercase', letterSpacing: '0.18em', fontWeight: 700, marginBottom: 12 }}>
              Click or Press Space to Jump
            </div>
            <h3 style={{ fontFamily: 'var(--font-ui)', fontWeight: 900, fontSize: 32, margin: '0 0 12px', letterSpacing: '-0.02em' }}>
              SPACE RUNNER MINI-GAME
            </h3>
            <p style={{ fontSize: 15, color: '#94A3B8', margin: 0, maxWidth: 400, lineHeight: 1.5 }}>
              Dodge obstacle waves across Deep Space, Nebula Warp, and Hyperspace!
            </p>
          </div>
        )}

        {/* Game Over Overlay */}
        {displayState === 'gameover' && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(11, 17, 32, 0.88)',
              backdropFilter: 'blur(6px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              textAlign: 'center',
            }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#FF4757', textTransform: 'uppercase', letterSpacing: '0.18em', fontWeight: 700, marginBottom: 12 }}>
              COLLISION IMPACT
            </div>
            <h3 style={{ fontFamily: 'var(--font-ui)', fontWeight: 900, fontSize: 40, margin: '0 0 8px', letterSpacing: '-0.03em', color: '#FFFFFF' }}>
              ORBIT SHATTERED!
            </h3>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 18, color: '#05CE78', fontWeight: 800, marginBottom: 24 }}>
              Distance Rolled: {hudScore}m
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                triggerJump();
              }}
              style={{
                background: '#5A74FF',
                color: '#FFFFFF',
                border: 'none',
                padding: '14px 36px',
                borderRadius: 999,
                fontWeight: 800,
                fontSize: 15,
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(90, 116, 255, 0.4)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                transition: 'transform 140ms ease',
              }}
            >
              <LucideIcons.RotateCcw size={18} />
              PLAY AGAIN (SPACE)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
