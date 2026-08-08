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
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'cable' | 'caster' | 'virus' | 'fireball' | 'powerup';
  hp?: number;
}

interface Laser {
  x: number;
  y: number;
  vx: number;
  vy: number;
  speed: number;
}

interface Boss {
  active: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
  hp: number;
  maxHp: number;
  direction: number;
  shootTimer: number;
}

export default function MultiStageOrbitGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const [activeStage, setActiveStage] = useState<1 | 2 | 3>(1);
  const [hudScore, setHudScore] = useState(0);
  const [hudHighScore, setHudHighScore] = useState(0);
  const [nextStageMeter, setNextStageMeter] = useState(150);
  const [weaponLevel, setWeaponLevel] = useState(1);
  const [displayState, setDisplayState] = useState<'idle' | 'playing' | 'gameover' | 'victory'>('idle');

  // Mutable Game Physics State in Ref
  const stateRef = useRef({
    gameState: 'idle' as 'idle' | 'playing' | 'gameover' | 'victory',
    stage: 1 as 1 | 2 | 3,
    distance: 0,
    highScore: 0,
    weaponLevel: 1,
    speed: 6,
    shakeTimer: 0,
    warpFlash: 0,
    playerX: 110,
    playerY: 216,
    playerVx: 0,
    playerVy: 0,
    isGrounded: true,
    playerRotation: 0,
    jumpBuffer: 0,
    obstacles: [] as Obstacle[],
    lasers: [] as Laser[],
    particles: [] as Particle[],
    trail: [] as { x: number; y: number; alpha: number }[],
    boss: {
      active: false,
      x: 680,
      y: 110,
      width: 100,
      height: 100,
      hp: 35,
      maxHp: 35,
      direction: 1,
      shootTimer: 0,
    } as Boss,
    lastObstacleX: 0,
  });

  // Web Audio Synthesizer
  const getAudioCtx = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) audioCtxRef.current = new AudioCtx();
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
      const now = ctx.currentTime;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.exponentialRampToValueAtTime(760, now + 0.12);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.12);
    } catch {}
  };

  const playLaserSound = () => {
    try {
      const ctx = getAudioCtx();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const now = ctx.currentTime;
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.1);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.1);
    } catch {}
  };

  const playPowerupSound = () => {
    try {
      const ctx = getAudioCtx();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const now = ctx.currentTime;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.2);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.2);
    } catch {}
  };

  const playExplosionSound = () => {
    try {
      const ctx = getAudioCtx();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const now = ctx.currentTime;
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.exponentialRampToValueAtTime(30, now + 0.35);
      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.35);
    } catch {}
  };

  // High score read
  useEffect(() => {
    try {
      const saved = localStorage.getItem('og_multistage_high');
      if (saved) {
        const val = parseInt(saved, 10);
        stateRef.current.highScore = val;
        setHudHighScore(val);
      }
    } catch {}
  }, []);

  const changeStage = (stageNum: 1 | 2 | 3) => {
    setActiveStage(stageNum);
    const s = stateRef.current;
    s.stage = stageNum;
    s.gameState = 'idle';
    s.distance = 0;
    s.playerX = 110;
    s.playerY = stageNum === 1 ? 216 : 150;
    s.playerVy = 0;
    s.isGrounded = true;
    s.obstacles = [];
    s.lasers = [];
    s.particles = [];
    s.boss.active = false;
    setDisplayState('idle');
  };

  const fireLasers = () => {
    const s = stateRef.current;
    playLaserSound();
    if (s.weaponLevel === 1) {
      // Single Laser
      s.lasers.push({ x: s.playerX + 20, y: s.playerY, vx: 14, vy: 0, speed: 14 });
    } else if (s.weaponLevel === 2) {
      // Dual Lasers
      s.lasers.push({ x: s.playerX + 20, y: s.playerY - 8, vx: 14, vy: 0, speed: 14 });
      s.lasers.push({ x: s.playerX + 20, y: s.playerY + 8, vx: 14, vy: 0, speed: 14 });
    } else {
      // Triple Spread Beam
      s.lasers.push({ x: s.playerX + 20, y: s.playerY, vx: 14, vy: 0, speed: 14 });
      s.lasers.push({ x: s.playerX + 20, y: s.playerY - 4, vx: 14, vy: -2, speed: 14 });
      s.lasers.push({ x: s.playerX + 20, y: s.playerY + 4, vx: 14, vy: 2, speed: 14 });
    }
  };

  const handleActionInput = (e?: React.PointerEvent) => {
    const s = stateRef.current;

    if (s.gameState === 'idle' || s.gameState === 'gameover' || s.gameState === 'victory') {
      s.gameState = 'playing';
      s.distance = 0;
      s.weaponLevel = 1;
      setWeaponLevel(1);
      s.speed = s.stage === 1 ? 6 : s.stage === 2 ? 8 : 7;
      s.playerX = 110;
      s.playerY = s.stage === 1 ? 216 : 150;
      s.playerVy = 0;
      s.isGrounded = true;
      s.obstacles = [];
      s.lasers = [];
      s.particles = [];
      s.boss.active = false;
      s.boss.hp = 35;
      setDisplayState('playing');
      return;
    }

    if (s.gameState === 'playing') {
      if (s.stage === 1) {
        // Stage 1: Floor Runner
        if (s.isGrounded) {
          s.playerVy = -13.5;
          s.isGrounded = false;
          playJumpSound();
        } else {
          s.jumpBuffer = 10;
        }
      } else if (s.stage === 2) {
        // Stage 2: Space Defender (Thrust & Shoot)
        s.playerVy = -8;
        fireLasers();
      } else {
        // Stage 3: Star Fox 64 360 Flight (Shoot Lasers & Move X/Y)
        if (e && canvasRef.current) {
          const rect = canvasRef.current.getBoundingClientRect();
          const clickY = e.clientY - rect.top;
          const targetY = (clickY / rect.height) * 320;
          s.playerVy = (targetY - s.playerY) * 0.15;
        }
        fireLasers();
      }
    }
  };

  const triggerExplosion = (x: number, y: number) => {
    const s = stateRef.current;
    s.shakeTimer = 24;
    playExplosionSound();
    s.particles = [];
    for (let i = 0; i < 32; i++) {
      const angle = (Math.PI * 2 * i) / 32;
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
      const vel = 3 + Math.random() * 6;
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
    const topCeiling = 34; // Top Ceiling Exploit Boundary
    const playerRadius = 24;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        handleActionInput();
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const s = stateRef.current;
      if (s.gameState === 'playing' && s.stage === 3 && canvas) {
        const rect = canvas.getBoundingClientRect();
        const targetY = ((e.clientY - rect.top) / rect.height) * 320;
        const targetX = ((e.clientX - rect.left) / rect.width) * 900;
        s.playerY += (targetY - s.playerY) * 0.12;
        s.playerX += (Math.max(60, Math.min(300, targetX)) - s.playerX) * 0.12;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousemove', handleMouseMove);

    const gameLoop = () => {
      const s = stateRef.current;

      // Environment Canvas Background
      if (s.stage === 3) {
        ctx.fillStyle = '#180A10';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(239, 68, 68, 0.15)';
        ctx.fillRect(0, groundY, canvas.width, canvas.height - groundY);
      } else if (s.stage === 2) {
        ctx.fillStyle = '#0B0D1B';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else {
        ctx.fillStyle = '#0B1120';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Warp Flash Transition Effect
      if (s.warpFlash > 0) {
        s.warpFlash--;
        ctx.fillStyle = `rgba(255, 255, 255, ${s.warpFlash / 20})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Screen Shake
      ctx.save();
      if (s.shakeTimer > 0) {
        s.shakeTimer--;
        const dx = (Math.random() - 0.5) * s.shakeTimer * 0.8;
        const dy = (Math.random() - 0.5) * s.shakeTimer * 0.8;
        ctx.translate(dx, dy);
      }

      // Top Ceiling Boundary Hazard Line (Prevent Roof Riding Exploit)
      if (s.stage !== 3) {
        ctx.strokeStyle = 'rgba(255, 71, 87, 0.4)';
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 8]);
        ctx.beginPath();
        ctx.moveTo(0, topCeiling);
        ctx.lineTo(canvas.width, topCeiling);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Ground Line
      const groundColor = s.stage === 3 ? '#EF4444' : s.stage === 2 ? '#A855F7' : '#5A74FF';
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

        // Distance Meter & Arena Warp Transformation Check (150m per stage)
        const stageMaxMeter = 150;
        const metersRemaining = Math.max(0, stageMaxMeter - (currentMeters % stageMaxMeter));
        setNextStageMeter(metersRemaining);

        if (currentMeters > 0 && currentMeters % stageMaxMeter === 0 && metersRemaining === stageMaxMeter) {
          s.warpFlash = 20;
          if (s.stage === 1) {
            s.stage = 2;
            setActiveStage(2);
          } else if (s.stage === 2) {
            s.stage = 3;
            setActiveStage(3);
          }
        }

        if (currentMeters > s.highScore) {
          s.highScore = currentMeters;
          setHudHighScore(currentMeters);
          try {
            localStorage.setItem('og_multistage_high', currentMeters.toString());
          } catch {}
        }

        // Physics per Stage
        if (s.stage === 1) {
          // Floor Runner Gravity & Ceiling Limit
          s.playerVy += 0.65;
          s.playerY += s.playerVy;
          s.playerRotation += s.speed * 0.07;

          // Top Ceiling Exploit Boundary Check
          if (s.playerY <= topCeiling + playerRadius) {
            s.playerY = topCeiling + playerRadius;
            s.playerVy = 1.5; // Bounce down from roof
          }

          if (s.playerY >= groundY - playerRadius) {
            s.playerY = groundY - playerRadius;
            s.playerVy = 0;
            s.isGrounded = true;

            if (s.jumpBuffer > 0) {
              s.jumpBuffer = 0;
              s.playerVy = -13.5;
              s.isGrounded = false;
              playJumpSound();
            }
          } else {
            if (s.jumpBuffer > 0) s.jumpBuffer--;
          }
        } else if (s.stage === 2) {
          // Stage 2: Space Defender
          s.playerVy += 0.35;
          s.playerY += s.playerVy;
          s.playerRotation = s.playerVy * 0.04;

          if (s.playerY <= topCeiling + playerRadius) {
            s.playerY = topCeiling + playerRadius;
            s.playerVy = 1.5;
          }
          if (s.playerY >= groundY - playerRadius) {
            s.playerY = groundY - playerRadius;
            s.playerVy = 0;
          }
        } else {
          // Stage 3: Star Fox 64 360 Flight Controls
          s.playerY += s.playerVy * 0.5;
          s.playerVy *= 0.9;
          s.playerY = Math.max(topCeiling + playerRadius, Math.min(groundY - playerRadius, s.playerY));
        }

        // Trail Record
        s.trail.unshift({ x: s.playerX, y: s.playerY, alpha: 0.6 });
        if (s.trail.length > 10) s.trail.pop();

        // Move Lasers
        for (let i = s.lasers.length - 1; i >= 0; i--) {
          const l = s.lasers[i];
          l.x += l.vx;
          l.y += l.vy;

          // Laser vs Obstacles
          for (let j = s.obstacles.length - 1; j >= 0; j--) {
            const obs = s.obstacles[j];
            if (
              obs.type !== 'powerup' &&
              l.x > obs.x &&
              l.x < obs.x + obs.width &&
              l.y > obs.y &&
              l.y < obs.y + obs.height
            ) {
              s.lasers.splice(i, 1);
              s.obstacles.splice(j, 1);
              playExplosionSound();
              break;
            }
          }

          // Laser vs Boss
          if (s.boss.active && l.x > s.boss.x && l.y > s.boss.y && l.y < s.boss.y + s.boss.height) {
            s.lasers.splice(i, 1);
            s.boss.hp -= 1;
            if (s.boss.hp <= 0) {
              triggerExplosion(s.boss.x + s.boss.width / 2, s.boss.y + s.boss.height / 2);
              s.boss.active = false;
              s.gameState = 'victory';
              setDisplayState('victory');
            }
          }

          if (l.x > canvas.width + 50 || l.y < 0 || l.y > canvas.height) {
            s.lasers.splice(i, 1);
          }
        }

        // Stage 3 Star Fox Boss Spawn
        if (s.stage === 3 && currentMeters >= 80 && !s.boss.active) {
          s.boss.active = true;
          s.boss.hp = 35;
          s.boss.x = canvas.width - 160;
          s.boss.y = 80;
        }

        if (s.boss.active) {
          s.boss.y += s.boss.direction * 2.2;
          if (s.boss.y <= 40 || s.boss.y >= 150) s.boss.direction *= -1;

          s.boss.shootTimer++;
          if (s.boss.shootTimer > 45) {
            s.boss.shootTimer = 0;
            s.obstacles.push({
              id: Math.random().toString(),
              x: s.boss.x,
              y: s.boss.y + s.boss.height / 2,
              width: 28,
              height: 28,
              type: 'fireball',
            });
          }
        }

        // Spawn Power-Ups [P] & Obstacles
        if (!s.boss.active && canvas.width - s.lastObstacleX > 200 + Math.random() * 160) {
          const isPowerup = Math.random() < 0.2;
          const type: 'cable' | 'caster' | 'virus' | 'fireball' | 'powerup' = isPowerup
            ? 'powerup'
            : s.stage === 2
            ? 'virus'
            : s.stage === 3
            ? 'fireball'
            : Math.random() > 0.5 ? 'cable' : 'caster';

          const obsH = type === 'powerup' ? 28 : type === 'virus' ? 36 : type === 'fireball' ? 28 : 34;
          const obsW = 34;
          const obsY = type === 'powerup' || s.stage >= 2 ? 60 + Math.random() * 130 : groundY - obsH;

          s.obstacles.push({
            id: Math.random().toString(),
            x: canvas.width + 40,
            y: obsY,
            width: obsW,
            height: obsH,
            type,
          });
          s.lastObstacleX = canvas.width + 40;
        }
        s.lastObstacleX -= s.speed;

        // Obstacle & Powerup Pickup Collision
        for (let i = s.obstacles.length - 1; i >= 0; i--) {
          const obs = s.obstacles[i];
          obs.x -= s.speed;

          const margin = 5;
          if (
            s.playerX + playerRadius - margin > obs.x &&
            s.playerX - playerRadius + margin < obs.x + obs.width &&
            s.playerY + playerRadius - margin > obs.y &&
            s.playerY - playerRadius + margin < obs.y + obs.height
          ) {
            if (obs.type === 'powerup') {
              // Power-Up Collected
              s.obstacles.splice(i, 1);
              if (s.weaponLevel < 3) {
                s.weaponLevel += 1;
                setWeaponLevel(s.weaponLevel);
              }
              playPowerupSound();
            } else {
              // Collision Impact
              triggerExplosion(s.playerX, s.playerY);
              s.gameState = 'gameover';
              setDisplayState('gameover');
            }
          }

          if (obs.x + obs.width < -50) s.obstacles.splice(i, 1);
        }
      }

      // Draw Player Trail
      s.trail.forEach((pt, i) => {
        pt.alpha *= 0.82;
        ctx.beginPath();
        ctx.arc(pt.x - i * 3, pt.y, playerRadius * (1 - i * 0.05), 0, Math.PI * 2);
        ctx.fillStyle = s.stage === 3 ? `rgba(239, 68, 68, ${pt.alpha * 0.4})` : `rgba(90, 116, 255, ${pt.alpha * 0.4})`;
        ctx.fill();
      });

      // Draw Lasers
      ctx.fillStyle = '#05CE78';
      ctx.shadowColor = '#05CE78';
      ctx.shadowBlur = 14;
      s.lasers.forEach(l => {
        ctx.fillRect(l.x, l.y - 3, 26, 6);
      });
      ctx.shadowBlur = 0;

      // Draw Player Orbit
      if (s.gameState !== 'gameover') {
        ctx.save();
        ctx.translate(s.playerX, s.playerY);
        ctx.rotate(s.playerRotation);

        ctx.beginPath();
        ctx.arc(0, 0, playerRadius, 0, Math.PI * 2);
        ctx.fillStyle = groundColor;
        ctx.shadowColor = groundColor;
        ctx.shadowBlur = 18;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(0, 0, playerRadius - 6, 0, Math.PI);
        ctx.fillStyle = '#05CE78';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(0, 0, 8, 0, Math.PI * 2);
        ctx.fillStyle = '#0B1120';
        ctx.shadowBlur = 0;
        ctx.fill();

        ctx.restore();
      }

      // Draw Obstacles & Powerups
      s.obstacles.forEach(obs => {
        ctx.save();
        if (obs.type === 'powerup') {
          // Power-Up Orb [P]
          ctx.fillStyle = '#3B82F6';
          ctx.shadowColor = '#3B82F6';
          ctx.shadowBlur = 16;
          ctx.beginPath();
          ctx.arc(obs.x + obs.width / 2, obs.y + obs.height / 2, obs.width / 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#FFFFFF';
          ctx.font = 'bold 14px monospace';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('P', obs.x + obs.width / 2, obs.y + obs.height / 2);
        } else if (obs.type === 'virus') {
          ctx.fillStyle = '#A855F7';
          ctx.shadowColor = '#A855F7';
          ctx.shadowBlur = 14;
          ctx.beginPath();
          ctx.arc(obs.x + obs.width / 2, obs.y + obs.height / 2, obs.width / 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (obs.type === 'fireball') {
          ctx.fillStyle = '#EF4444';
          ctx.shadowColor = '#EF4444';
          ctx.shadowBlur = 16;
          ctx.beginPath();
          ctx.arc(obs.x + obs.width / 2, obs.y + obs.height / 2, obs.width / 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (obs.type === 'cable') {
          ctx.fillStyle = '#FF4757';
          ctx.shadowColor = '#FF4757';
          ctx.shadowBlur = 12;
          ctx.beginPath();
          ctx.moveTo(obs.x, obs.y + obs.height);
          ctx.lineTo(obs.x + obs.width / 2, obs.y);
          ctx.lineTo(obs.x + obs.width, obs.y + obs.height);
          ctx.closePath();
          ctx.fill();
        } else {
          ctx.strokeStyle = '#FFA502';
          ctx.shadowColor = '#FFA502';
          ctx.shadowBlur = 12;
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.arc(obs.x + obs.width / 2, obs.y + obs.height / 2, obs.width / 2, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.restore();
      });

      // Draw Star Fox Magma Boss
      if (s.boss.active) {
        ctx.save();
        ctx.translate(s.boss.x, s.boss.y);
        ctx.fillStyle = '#EF4444';
        ctx.shadowColor = '#EF4444';
        ctx.shadowBlur = 24;
        ctx.fillRect(0, 0, s.boss.width, s.boss.height);

        // Boss Health Bar
        const hpPercent = Math.max(0, s.boss.hp / s.boss.maxHp);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.fillRect(0, -16, s.boss.width, 8);
        ctx.fillStyle = '#05CE78';
        ctx.fillRect(0, -16, s.boss.width * hpPercent, 8);

        ctx.restore();
      }

      // Draw Particles
      for (let i = s.particles.length - 1; i >= 0; i--) {
        const p = s.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.2;
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

        if (p.life >= p.maxLife) s.particles.splice(i, 1);
      }

      ctx.restore();
      animId = requestAnimationFrame(gameLoop);
    };

    animId = requestAnimationFrame(gameLoop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 900, margin: '0 auto' }}>
      {/* Stage Select Bar */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
        {[
          { num: 1 as const, name: 'STAGE 1: FLOOR RUNNER' },
          { num: 2 as const, name: 'STAGE 2: SPACE LASERS' },
          { num: 3 as const, name: 'STAGE 3: STAR FOX BOSS' },
        ].map((stg) => (
          <button
            key={stg.num}
            onClick={() => changeStage(stg.num)}
            style={{
              background: activeStage === stg.num ? '#5A74FF' : 'rgba(255, 255, 255, 0.06)',
              color: '#FFFFFF',
              border: activeStage === stg.num ? '2px solid #5A74FF' : '1px solid rgba(255, 255, 255, 0.15)',
              padding: '8px 18px',
              borderRadius: 999,
              fontSize: 12,
              fontWeight: 800,
              fontFamily: 'var(--font-mono)',
              cursor: 'pointer',
              boxShadow: activeStage === stg.num ? '0 4px 16px rgba(90, 116, 255, 0.4)' : 'none',
              transition: 'all 200ms ease',
            }}
          >
            {stg.name}
          </button>
        ))}
      </div>

      {/* Canvas Stage */}
      <div
        onPointerDown={handleActionInput}
        style={{
          position: 'relative',
          borderRadius: 28,
          overflow: 'hidden',
          border: '1px solid rgba(90, 116, 255, 0.3)',
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

        {/* HUD Header */}
        <div
          style={{
            position: 'absolute',
            top: 18,
            left: 24,
            right: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            pointerEvents: 'none',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#05CE78', boxShadow: '0 0 10px #05CE78' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#A855F7', textTransform: 'uppercase', letterSpacing: '0.14em', fontWeight: 800 }}>
              STAGE {activeStage} · WEAPON L{weaponLevel}
            </span>
          </div>

          <div style={{ display: 'flex', gap: 20, fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 800 }}>
            <span style={{ color: '#F59E0B' }}>NEXT STAGE IN: {nextStageMeter}m</span>
            <span style={{ color: '#05CE78' }}>DIST: {hudScore}m</span>
            <span style={{ color: '#5A74FF' }}>BEST: {hudHighScore}m</span>
          </div>
        </div>

        {/* Idle Start Overlay */}
        {displayState === 'idle' && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(11, 17, 32, 0.72)',
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
              {activeStage === 1 ? 'CLICK OR SPACE TO JUMP' : 'CLICK OR SPACE TO SHOOT & FLY'}
            </div>
            <h3 style={{ fontFamily: 'var(--font-ui)', fontWeight: 900, fontSize: 32, margin: '0 0 12px', letterSpacing: '-0.02em' }}>
              {activeStage === 1 ? 'STAGE 1: FLOOR RUNNER' : activeStage === 2 ? 'STAGE 2: SPACE LASERS' : 'STAGE 3: STAR FOX BOSS'}
            </h3>
            <p style={{ fontSize: 15, color: '#94A3B8', margin: 0, maxWidth: 420, lineHeight: 1.5 }}>
              {activeStage === 1 ? 'Dodge floor cables & casters with jump buffering!' : activeStage === 2 ? 'Shoot lasers & collect [P] weapon power-ups!' : 'Star Fox 360 flight battle against the Magma Boss!'}
            </p>
          </div>
        )}

        {/* Victory Overlay */}
        {displayState === 'victory' && (
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
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#05CE78', textTransform: 'uppercase', letterSpacing: '0.18em', fontWeight: 700, marginBottom: 12 }}>
              VICTORY ACHIEVED
            </div>
            <h3 style={{ fontFamily: 'var(--font-ui)', fontWeight: 900, fontSize: 40, margin: '0 0 8px', letterSpacing: '-0.03em', color: '#FFFFFF' }}>
              MAGMA BOSS DEFEATED!
            </h3>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleActionInput();
              }}
              style={{
                background: '#05CE78',
                color: '#0F172A',
                border: 'none',
                padding: '14px 36px',
                borderRadius: 999,
                fontWeight: 800,
                fontSize: 15,
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(5, 206, 120, 0.4)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <LucideIcons.RotateCcw size={18} />
              PLAY AGAIN
            </button>
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
              IMPACT DETECTED
            </div>
            <h3 style={{ fontFamily: 'var(--font-ui)', fontWeight: 900, fontSize: 38, margin: '0 0 8px', letterSpacing: '-0.03em', color: '#FFFFFF' }}>
              ORBIT SHATTERED!
            </h3>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 18, color: '#05CE78', fontWeight: 800, marginBottom: 24 }}>
              Distance Rolled: {hudScore}m
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleActionInput();
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
