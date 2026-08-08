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
  type: 'ring' | 'binary' | 'spark';
  text?: string;
  rotation: number;
  vRot: number;
}

interface Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'cable' | 'caster' | 'binary';
  passed?: boolean;
}

export default function OrbitRunnerGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover'>('idle');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  // Read high score from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('og_runner_highscore');
      if (saved) setHighScore(parseInt(saved, 10));
    } catch {}
  }, []);

  const scoreRef = useRef(0);
  const highScoreRef = useRef(highScore);
  highScoreRef.current = highScore;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let distance = 0;
    let speed = 6;
    let shakeTimer = 0;

    // Player state
    const groundY = 280;
    const playerRadius = 24;
    let playerY = groundY - playerRadius;
    let playerVy = 0;
    let isGrounded = true;
    let playerRotation = 0;
    const playerX = 110;

    // Trail history
    const trail: { x: number; y: number; alpha: number }[] = [];

    // Obstacles & Particles
    let obstacles: Obstacle[] = [];
    let particles: Particle[] = [];
    let lastObstacleX = 0;

    const resetGame = () => {
      distance = 0;
      speed = 6;
      playerY = groundY - playerRadius;
      playerVy = 0;
      isGrounded = true;
      playerRotation = 0;
      obstacles = [];
      particles = [];
      trail.length = 0;
      shakeTimer = 0;
      setScore(0);
    };

    const triggerJump = () => {
      if (isGrounded) {
        playerVy = -13.5;
        isGrounded = false;
        // Jump dust particles
        for (let i = 0; i < 8; i++) {
          particles.push({
            x: playerX,
            y: groundY,
            vx: (Math.random() - 0.5) * 4,
            vy: -Math.random() * 3 - 1,
            life: 1,
            maxLife: 20 + Math.random() * 10,
            size: 3 + Math.random() * 3,
            color: 'rgba(90, 116, 255, 0.6)',
            type: 'spark',
            rotation: 0,
            vRot: 0,
          });
        }
      }
    };

    const createExplosion = (x: number, y: number) => {
      shakeTimer = 24; // Trigger screen shake
      particles = [];
      // Ring fragments
      for (let i = 0; i < 20; i++) {
        const angle = (Math.PI * 2 * i) / 20;
        const vel = 4 + Math.random() * 8;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * vel,
          vy: Math.sin(angle) * vel,
          life: 1,
          maxLife: 40 + Math.random() * 20,
          size: 4 + Math.random() * 6,
          color: i % 2 === 0 ? '#5A74FF' : '#05CE78',
          type: 'ring',
          rotation: Math.random() * Math.PI,
          vRot: (Math.random() - 0.5) * 0.3,
        });
      }
      // Binary text bursts
      for (let i = 0; i < 16; i++) {
        const angle = Math.random() * Math.PI * 2;
        const vel = 3 + Math.random() * 6;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * vel,
          vy: Math.sin(angle) * vel - 2,
          life: 1,
          maxLife: 50 + Math.random() * 20,
          size: 14,
          color: Math.random() > 0.5 ? '#05CE78' : '#FFFFFF',
          type: 'binary',
          text: Math.random() > 0.5 ? '0' : '1',
          rotation: Math.random() * Math.PI,
          vRot: (Math.random() - 0.5) * 0.2,
        });
      }
    };

    // Keyboard controls
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        setGameState(prev => {
          if (prev === 'idle' || prev === 'gameover') {
            resetGame();
            return 'playing';
          }
          if (prev === 'playing') {
            triggerJump();
          }
          return prev;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Main Game Loop
    const loop = () => {
      // Clear canvas
      ctx.fillStyle = '#0F172A';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Screen Shake offset
      ctx.save();
      if (shakeTimer > 0) {
        shakeTimer--;
        const dx = (Math.random() - 0.5) * shakeTimer * 0.8;
        const dy = (Math.random() - 0.5) * shakeTimer * 0.8;
        ctx.translate(dx, dy);
      }

      // Draw Grid / Road lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
      ctx.lineWidth = 1;
      for (let x = ( -distance * 2) % 40; x < canvas.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, groundY);
        ctx.lineTo(x - 60, canvas.height);
        ctx.stroke();
      }

      // Ground Line
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, groundY);
      ctx.lineTo(canvas.width, groundY);
      ctx.stroke();

      // Ambient Ground Glow Line
      ctx.strokeStyle = 'rgba(90, 116, 255, 0.4)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, groundY + 1);
      ctx.lineTo(canvas.width, groundY + 1);
      ctx.stroke();

      // State check
      setGameState((currentState) => {
        if (currentState === 'playing') {
          distance += 0.2;
          speed = 6 + Math.floor(distance / 50) * 0.4;
          const currentMeters = Math.floor(distance);
          setScore(currentMeters);
          if (currentMeters > highScoreRef.current) {
            setHighScore(currentMeters);
            try {
              localStorage.setItem('og_runner_highscore', currentMeters.toString());
            } catch {}
          }

          // Apply Gravity
          playerVy += 0.65;
          playerY += playerVy;
          playerRotation += speed * 0.06;

          if (playerY >= groundY - playerRadius) {
            playerY = groundY - playerRadius;
            playerVy = 0;
            isGrounded = true;
          }

          // Record Trail
          trail.unshift({ x: playerX, y: playerY, alpha: 0.6 });
          if (trail.length > 10) trail.pop();

          // Spawn Obstacles
          if (canvas.width - lastObstacleX > 240 + Math.random() * 180) {
            const types: ('cable' | 'caster' | 'binary')[] = ['cable', 'caster', 'binary'];
            const type = types[Math.floor(Math.random() * types.length)];
            const obsH = type === 'cable' ? 32 : type === 'caster' ? 38 : 42;
            const obsW = type === 'binary' ? 30 : 34;
            obstacles.push({
              x: canvas.width + 40,
              y: groundY - obsH,
              width: obsW,
              height: obsH,
              type,
            });
            lastObstacleX = canvas.width + 40;
          }
          lastObstacleX -= speed;

          // Move Obstacles & Collision Check
          for (let i = obstacles.length - 1; i >= 0; i--) {
            const obs = obstacles[i];
            obs.x -= speed;

            // Collision Box Test
            const margin = 6;
            if (
              playerX + playerRadius - margin > obs.x &&
              playerX - playerRadius + margin < obs.x + obs.width &&
              playerY + playerRadius - margin > obs.y &&
              playerY - playerRadius + margin < obs.y + obs.height
            ) {
              createExplosion(playerX, playerY);
              return 'gameover';
            }

            if (obs.x + obs.width < -50) {
              obstacles.splice(i, 1);
            }
          }
        }

        return currentState;
      });

      // Draw Player Trail
      trail.forEach((pt, i) => {
        pt.alpha *= 0.82;
        ctx.beginPath();
        ctx.arc(pt.x - i * 3, pt.y, playerRadius * (1 - i * 0.05), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(90, 116, 255, ${pt.alpha * 0.4})`;
        ctx.fill();
      });

      // Draw Orbit Player Ring (if not gameover)
      if (gameState !== 'gameover') {
        ctx.save();
        ctx.translate(playerX, playerY);
        ctx.rotate(playerRotation);

        // Outer Ring Body
        ctx.beginPath();
        ctx.arc(0, 0, playerRadius, 0, Math.PI * 2);
        ctx.fillStyle = '#5A74FF';
        ctx.shadowColor = '#5A74FF';
        ctx.shadowBlur = 16;
        ctx.fill();

        // Inner Segment Dual Tone Accent
        ctx.beginPath();
        ctx.arc(0, 0, playerRadius - 6, 0, Math.PI);
        ctx.fillStyle = '#05CE78';
        ctx.fill();

        // Center Hole
        ctx.beginPath();
        ctx.arc(0, 0, 8, 0, Math.PI * 2);
        ctx.fillStyle = '#0F172A';
        ctx.shadowBlur = 0;
        ctx.fill();

        ctx.restore();
      }

      // Draw Obstacles
      obstacles.forEach(obs => {
        ctx.save();
        if (obs.type === 'cable') {
          // Cable Spike / Wave
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
          // Double Caster Wheel
          ctx.strokeStyle = '#FFA502';
          ctx.shadowColor = '#FFA502';
          ctx.shadowBlur = 12;
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.arc(obs.x + obs.width / 2, obs.y + obs.height / 2, obs.width / 2, 0, Math.PI * 2);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(obs.x + obs.width / 2, obs.y + obs.height / 2, 5, 0, Math.PI * 2);
          ctx.fillStyle = '#FFA502';
          ctx.fill();
        } else {
          // Binary Block (01)
          ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
          ctx.strokeStyle = '#05CE78';
          ctx.shadowColor = '#05CE78';
          ctx.shadowBlur = 10;
          ctx.lineWidth = 2;
          ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
          ctx.strokeRect(obs.x, obs.y, obs.width, obs.height);
          ctx.fillStyle = '#05CE78';
          ctx.font = 'bold 16px monospace';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('01', obs.x + obs.width / 2, obs.y + obs.height / 2);
        }
        ctx.restore();
      });

      // Update & Draw Explosion Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.25; // gravity on particles
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
          particles.splice(i, 1);
        }
      }

      ctx.restore(); // Restore screen shake offset
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 800, margin: '0 auto' }}>
      {/* Canvas Arcade Stage */}
      <div
        onClick={() => {
          setGameState(prev => {
            if (prev === 'idle' || prev === 'gameover') {
              return 'playing';
            }
            return prev;
          });
        }}
        style={{
          position: 'relative',
          borderRadius: 24,
          overflow: 'hidden',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4)',
          background: '#0F172A',
          cursor: 'pointer',
        }}
      >
        <canvas
          ref={canvasRef}
          width={800}
          height={360}
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />

        {/* HUD Top Overlay */}
        <div
          style={{
            position: 'absolute',
            top: 16,
            left: 20,
            right: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            pointerEvents: 'none',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#05CE78', boxShadow: '0 0 10px #05CE78' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.14em', fontWeight: 700 }}>
              404 ORBIT RUNNER
            </span>
          </div>

          <div style={{ display: 'flex', gap: 20, fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 800 }}>
            <span style={{ color: '#05CE78' }}>
              DIST: {score}m
            </span>
            <span style={{ color: '#5A74FF' }}>
              BEST: {highScore}m
            </span>
          </div>
        </div>

        {/* Idle Start Overlay */}
        {gameState === 'idle' && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(15, 23, 42, 0.75)',
              backdropFilter: 'blur(4px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              textAlign: 'center',
            }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#05CE78', textTransform: 'uppercase', letterSpacing: '0.16em', fontWeight: 700, marginBottom: 12 }}>
              Interactive 404 Mini-Game
            </div>
            <h3 style={{ fontFamily: 'var(--font-ui)', fontWeight: 900, fontSize: 32, margin: '0 0 12px', letterSpacing: '-0.02em' }}>
              PRESS SPACE OR TAP TO JUMP
            </h3>
            <p style={{ fontSize: 15, color: '#94A3B8', margin: 0, maxWidth: 360, lineHeight: 1.5 }}>
              Dodge trailing cables, caster wheels, and binary walls as long as you can!
            </p>
          </div>
        )}

        {/* Game Over Explosion Overlay */}
        {gameState === 'gameover' && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(15, 23, 42, 0.85)',
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
              SYSTEM COLLISION DETECTED
            </div>
            <h3 style={{ fontFamily: 'var(--font-ui)', fontWeight: 900, fontSize: 40, margin: '0 0 8px', letterSpacing: '-0.03em', color: '#FFFFFF' }}>
              ORBIT SHATTERED!
            </h3>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 18, color: '#05CE78', fontWeight: 800, marginBottom: 24 }}>
              Distance Rolled: {score}m
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setGameState('playing');
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

      {/* Control Hint Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, padding: '0 8px', fontFamily: 'var(--font-mono)', fontSize: 11, color: '#64748B' }}>
        <span>CONTROLS: [SPACEBAR] / [UP ARROW] / TAP SCREEN</span>
        <span>ZERO EMOJIS &middot; HTML5 CANVAS PHYSICS</span>
      </div>
    </div>
  );
}
