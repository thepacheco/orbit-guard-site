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
  type: 'ring' | 'binary' | 'spark' | 'warp' | 'confetti';
  text?: string;
  rotation: number;
  vRot: number;
  width?: number;
  height?: number;
}

interface Obstacle {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'cable' | 'caster' | 'virus' | 'fireball' | 'homing'
    | 'pw_weapon' | 'pw_shield' | 'pw_rapid' | 'pw_blast'
    | 'pw_explosive' | 'pw_drones';
  hp?: number;
  homingVy?: number;
}

interface Laser {
  x: number;
  y: number;
  vx: number;
  vy: number;
  speed: number;
  explosive?: boolean;
}

interface Drone {
  offsetY: number;
  shootTimer: number;
}

interface Boss {
  active: boolean;
  exploding: boolean;
  explodeTimer: number;
  x: number;
  y: number;
  width: number;
  height: number;
  hp: number;
  maxHp: number;
  direction: number;
  shootTimer: number;
  phase: 1 | 2 | 3;
  shieldTimer: number;
  hitsSinceShield: number;
  chargeTimer: number;
  charging: boolean;
  chargeVx: number;
}

export default function MultiStageOrbitGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const [activeStage, setActiveStage] = useState<1 | 2 | 3>(1);
  const [hudScore, setHudScore] = useState(0);
  const [hudHighScore, setHudHighScore] = useState(0);
  const [nextStageMeter, setNextStageMeter] = useState(300);
  const [weaponLevel, setWeaponLevel] = useState(1);
  const [hasShield, setHasShield] = useState(false);
  const [rapidTimer, setRapidTimer] = useState(0);
  const [hasExplosive, setHasExplosive] = useState(false);
  const [droneTimer, setDroneTimer] = useState(0);
  const [godMode, setGodMode] = useState(false);
  const [displayState, setDisplayState] = useState<'idle' | 'playing' | 'gameover' | 'victory'>('idle');

  const STAGE_1_DIST = 300;
  const STAGE_2_DIST = 400;

  // Mutable Game State
  const stateRef = useRef({
    gameState: 'idle' as 'idle' | 'playing' | 'gameover' | 'victory',
    stage: 1 as 1 | 2 | 3,
    distance: 0,
    stageStartDist: 0,
    highScore: 0,
    weaponLevel: 1,
    hasShield: false,
    rapidFireEnd: 0,
    explosiveEnd: 0,
    droneEnd: 0,
    drones: [] as Drone[],
    godMode: false,
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
    shootCooldown: 0,
    obstacles: [] as Obstacle[],
    lasers: [] as Laser[],
    particles: [] as Particle[],
    trail: [] as { x: number; y: number; alpha: number }[],
    boss: {
      active: false,
      exploding: false,
      explodeTimer: 0,
      x: 680,
      y: 60,
      width: 100,
      height: 100,
      hp: 50,
      maxHp: 50,
      direction: 1,
      shootTimer: 0,
      phase: 1 as 1 | 2 | 3,
      shieldTimer: 0,
      hitsSinceShield: 0,
      chargeTimer: 0,
      charging: false,
      chargeVx: 0,
    } as Boss,
    lastObstacleX: 0,
    obstacleCount: 0,
  });

  // === Web Audio ===
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
      const ctx = getAudioCtx(); if (!ctx) return;
      const osc = ctx.createOscillator(); const gain = ctx.createGain(); const now = ctx.currentTime;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(260, now); osc.frequency.exponentialRampToValueAtTime(760, now + 0.12);
      gain.gain.setValueAtTime(0.25, now); gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
      osc.connect(gain); gain.connect(ctx.destination); osc.start(now); osc.stop(now + 0.12);
    } catch {}
  };

  const playLaserSound = () => {
    try {
      const ctx = getAudioCtx(); if (!ctx) return;
      const osc = ctx.createOscillator(); const gain = ctx.createGain(); const now = ctx.currentTime;
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(880, now); osc.frequency.exponentialRampToValueAtTime(180, now + 0.1);
      gain.gain.setValueAtTime(0.2, now); gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
      osc.connect(gain); gain.connect(ctx.destination); osc.start(now); osc.stop(now + 0.1);
    } catch {}
  };

  const playPowerupSound = () => {
    try {
      const ctx = getAudioCtx(); if (!ctx) return;
      const osc = ctx.createOscillator(); const gain = ctx.createGain(); const now = ctx.currentTime;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now); osc.frequency.exponentialRampToValueAtTime(1200, now + 0.2);
      gain.gain.setValueAtTime(0.3, now); gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
      osc.connect(gain); gain.connect(ctx.destination); osc.start(now); osc.stop(now + 0.2);
    } catch {}
  };

  const playShieldHitSound = () => {
    try {
      const ctx = getAudioCtx(); if (!ctx) return;
      const osc = ctx.createOscillator(); const gain = ctx.createGain(); const now = ctx.currentTime;
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600, now); osc.frequency.exponentialRampToValueAtTime(200, now + 0.15);
      gain.gain.setValueAtTime(0.3, now); gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
      osc.connect(gain); gain.connect(ctx.destination); osc.start(now); osc.stop(now + 0.15);
    } catch {}
  };

  const playExplosionSound = () => {
    try {
      const ctx = getAudioCtx(); if (!ctx) return;
      const osc = ctx.createOscillator(); const gain = ctx.createGain(); const now = ctx.currentTime;
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(160, now); osc.frequency.exponentialRampToValueAtTime(30, now + 0.35);
      gain.gain.setValueAtTime(0.35, now); gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
      osc.connect(gain); gain.connect(ctx.destination); osc.start(now); osc.stop(now + 0.35);
    } catch {}
  };

  const playVictoryFanfare = () => {
    try {
      const ctx = getAudioCtx(); if (!ctx) return;
      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C E G C
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator(); const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.12);
        gain.gain.setValueAtTime(0.3, now + i * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.12 + 0.6);
        osc.connect(gain); gain.connect(ctx.destination);
        osc.start(now + i * 0.12); osc.stop(now + i * 0.12 + 0.6);
      });
    } catch {}
  };

  const playBlastSound = () => {
    try {
      const ctx = getAudioCtx(); if (!ctx) return;
      const now = ctx.currentTime;
      [200, 300, 500].forEach((freq, i) => {
        const osc = ctx.createOscillator(); const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now + i * 0.05); osc.frequency.exponentialRampToValueAtTime(30, now + i * 0.05 + 0.2);
        gain.gain.setValueAtTime(0.25, now + i * 0.05); gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.05 + 0.2);
        osc.connect(gain); gain.connect(ctx.destination); osc.start(now + i * 0.05); osc.stop(now + i * 0.05 + 0.2);
      });
    } catch {}
  };

  // High score read
  useEffect(() => {
    try {
      const saved = localStorage.getItem('og_multistage_high_v2');
      if (saved) { const val = parseInt(saved, 10); stateRef.current.highScore = val; setHudHighScore(val); }
    } catch {}
  }, []);

  const toggleGodMode = () => {
    const next = !godMode;
    setGodMode(next);
    const s = stateRef.current;
    s.godMode = next;
    if (next) {
      s.weaponLevel = 3;
      s.hasShield = true;
      s.rapidFireEnd = Date.now() + 999999000;
      s.explosiveEnd = Date.now() + 999999000;
      s.droneEnd = Date.now() + 999999000;
      s.drones = [{ offsetY: -35, shootTimer: 0 }, { offsetY: 35, shootTimer: 0 }];
      setWeaponLevel(3);
      setHasShield(true);
      setRapidTimer(99);
      setHasExplosive(true);
      setDroneTimer(99);
    }
  };

  const changeStage = (stageNum: 1 | 2 | 3) => {
    setActiveStage(stageNum);
    const s = stateRef.current;
    s.stage = stageNum;
    s.gameState = 'idle';
    s.distance = 0;
    s.stageStartDist = 0;
    s.playerX = 110;
    s.playerY = stageNum === 1 ? 216 : 150;
    s.playerVy = 0;
    s.isGrounded = true;
    s.weaponLevel = s.godMode ? 3 : 1;
    s.hasShield = s.godMode;
    s.rapidFireEnd = s.godMode ? Date.now() + 999999000 : 0;
    s.explosiveEnd = s.godMode ? Date.now() + 999999000 : 0;
    s.droneEnd = s.godMode ? Date.now() + 999999000 : 0;
    s.drones = s.godMode ? [{ offsetY: -35, shootTimer: 0 }, { offsetY: 35, shootTimer: 0 }] : [];
    s.obstacles = [];
    s.lasers = [];
    s.particles = [];
    s.boss.active = false;
    s.boss.exploding = false;
    s.obstacleCount = 0;
    setWeaponLevel(s.godMode ? 3 : 1);
    setHasShield(s.godMode);
    setRapidTimer(s.godMode ? 99 : 0);
    setHasExplosive(s.godMode);
    setDroneTimer(s.godMode ? 99 : 0);
    setDisplayState('idle');
  };

  const fireLasers = () => {
    const s = stateRef.current;
    if (s.shootCooldown > 0) return;
    playLaserSound();
    const isRapid = Date.now() < s.rapidFireEnd;
    s.shootCooldown = isRapid ? 5 : 12;
    const isExplosive = Date.now() < s.explosiveEnd;

    if (s.weaponLevel === 1) {
      s.lasers.push({ x: s.playerX + 20, y: s.playerY, vx: 14, vy: 0, speed: 14, explosive: isExplosive });
    } else if (s.weaponLevel === 2) {
      s.lasers.push({ x: s.playerX + 20, y: s.playerY - 8, vx: 14, vy: 0, speed: 14, explosive: isExplosive });
      s.lasers.push({ x: s.playerX + 20, y: s.playerY + 8, vx: 14, vy: 0, speed: 14, explosive: isExplosive });
    } else {
      s.lasers.push({ x: s.playerX + 20, y: s.playerY, vx: 14, vy: 0, speed: 14, explosive: isExplosive });
      s.lasers.push({ x: s.playerX + 20, y: s.playerY - 4, vx: 14, vy: -2.5, speed: 14, explosive: isExplosive });
      s.lasers.push({ x: s.playerX + 20, y: s.playerY + 4, vx: 14, vy: 2.5, speed: 14, explosive: isExplosive });
    }
  };

  const fireDroneLaser = (dx: number, dy: number) => {
    const s = stateRef.current;
    const isExplosive = Date.now() < s.explosiveEnd;
    s.lasers.push({ x: dx + 16, y: dy, vx: 14, vy: 0, speed: 14, explosive: isExplosive });
  };

  const handleActionInput = (e?: React.PointerEvent) => {
    const s = stateRef.current;

    if (s.gameState === 'idle' || s.gameState === 'gameover' || s.gameState === 'victory') {
      s.gameState = 'playing';
      s.distance = 0;
      s.stageStartDist = 0;
      s.weaponLevel = s.godMode ? 3 : 1;
      s.hasShield = s.godMode;
      s.rapidFireEnd = s.godMode ? Date.now() + 999999000 : 0;
      s.explosiveEnd = s.godMode ? Date.now() + 999999000 : 0;
      s.droneEnd = s.godMode ? Date.now() + 999999000 : 0;
      s.drones = s.godMode ? [{ offsetY: -35, shootTimer: 0 }, { offsetY: 35, shootTimer: 0 }] : [];
      setWeaponLevel(s.godMode ? 3 : 1);
      setHasShield(s.godMode);
      setRapidTimer(s.godMode ? 99 : 0);
      setHasExplosive(s.godMode);
      setDroneTimer(s.godMode ? 99 : 0);
      s.speed = s.stage === 1 ? 6 : s.stage === 2 ? 8 : 7;
      s.playerX = 110;
      s.playerY = s.stage === 1 ? 216 : 150;
      s.playerVy = 0;
      s.isGrounded = true;
      s.obstacles = [];
      s.lasers = [];
      s.particles = [];
      s.obstacleCount = 0;
      s.boss = {
        active: false,
        exploding: false,
        explodeTimer: 0,
        x: 680,
        y: 60,
        width: 100,
        height: 100,
        hp: 50,
        maxHp: 50,
        direction: 1,
        shootTimer: 0,
        phase: 1,
        shieldTimer: 0,
        hitsSinceShield: 0,
        chargeTimer: 0,
        charging: false,
        chargeVx: 0,
      };
      setDisplayState('playing');
      return;
    }

    if (s.gameState === 'playing') {
      if (s.stage === 1) {
        if (s.isGrounded) { s.playerVy = -13.5; s.isGrounded = false; playJumpSound(); }
        else { s.jumpBuffer = 10; }
      } else if (s.stage === 2) {
        s.playerVy = -8;
        fireLasers();
      } else {
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

  const isMobileRef = useRef(false);
  useEffect(() => {
    isMobileRef.current = window.innerWidth < 768;
    const onResize = () => { isMobileRef.current = window.innerWidth < 768; };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const triggerExplosion = (x: number, y: number, small?: boolean) => {
    const s = stateRef.current;
    if (!small) { s.shakeTimer = 24; playExplosionSound(); }
    const isMobile = isMobileRef.current;
    const count = small ? (isMobile ? 5 : 10) : (isMobile ? 14 : 30);
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count;
      const vel = (small ? 2 : 4) + Math.random() * (small ? 4 : 8);
      s.particles.push({
        x, y, vx: Math.cos(angle) * vel, vy: Math.sin(angle) * vel,
        life: 1, maxLife: small ? 25 : 50, size: (small ? 2 : 4) + Math.random() * (small ? 3 : 6),
        color: i % 2 === 0 ? '#5A74FF' : '#05CE78', type: 'ring',
        rotation: Math.random() * Math.PI, vRot: (Math.random() - 0.5) * 0.3,
      });
    }
    if (!small) {
      const binCount = isMobile ? 8 : 20;
      for (let i = 0; i < binCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const vel = 3 + Math.random() * 6;
        s.particles.push({
          x, y, vx: Math.cos(angle) * vel, vy: Math.sin(angle) * vel - 2,
          life: 1, maxLife: 60, size: 14,
          color: Math.random() > 0.5 ? '#05CE78' : '#FFFFFF', type: 'binary',
          text: Math.random() > 0.5 ? '0' : '1',
          rotation: Math.random() * Math.PI, vRot: (Math.random() - 0.5) * 0.2,
        });
      }
    }
  };

  const spawnConfetti = (count: number = 30) => {
    const s = stateRef.current;
    const colors = ['#05CE78', '#5A74FF', '#F59E0B', '#EF4444', '#8B5CF6', '#22D3EE', '#EC4899'];
    for (let i = 0; i < count; i++) {
      s.particles.push({
        x: Math.random() * 900,
        y: -10 - Math.random() * 40,
        vx: (Math.random() - 0.5) * 3,
        vy: 2 + Math.random() * 4,
        life: 1,
        maxLife: 180,
        size: 6 + Math.random() * 6,
        width: 8 + Math.random() * 6,
        height: 6 + Math.random() * 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        type: 'confetti',
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.15,
      });
    }
  };

  const explosiveShrapnel = (cx: number, cy: number) => {
    const s = stateRef.current;
    const blastRadius = 90;
    playBlastSound();
    s.shakeTimer = 12;
    for (let i = 0; i < 18; i++) {
      const angle = (Math.PI * 2 * i) / 18;
      const vel = 3 + Math.random() * 5;
      s.particles.push({
        x: cx, y: cy, vx: Math.cos(angle) * vel, vy: Math.sin(angle) * vel,
        life: 1, maxLife: 30, size: 3 + Math.random() * 4,
        color: i % 3 === 0 ? '#EF4444' : i % 3 === 1 ? '#F59E0B' : '#FF6B35',
        type: 'spark', rotation: 0, vRot: 0,
      });
    }
    for (let j = s.obstacles.length - 1; j >= 0; j--) {
      const obs = s.obstacles[j];
      if (obs.type.startsWith('pw_')) continue;
      const dx = (obs.x + obs.width / 2) - cx;
      const dy = (obs.y + obs.height / 2) - cy;
      if (Math.sqrt(dx * dx + dy * dy) < blastRadius) {
        triggerExplosion(obs.x + obs.width / 2, obs.y + obs.height / 2, true);
        s.obstacles.splice(j, 1);
      }
    }
  };

  const screenBlast = () => {
    const s = stateRef.current;
    playBlastSound();
    s.shakeTimer = 18;
    for (let i = s.obstacles.length - 1; i >= 0; i--) {
      const obs = s.obstacles[i];
      if (!obs.type.startsWith('pw_')) {
        triggerExplosion(obs.x + obs.width / 2, obs.y + obs.height / 2, true);
        s.obstacles.splice(i, 1);
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let lastFrameTime = performance.now();
    const groundY = 244;
    const topCeiling = 34;
    const playerRadius = 24;

    const getSpeedScale = () => {
      const renderedWidth = canvas.getBoundingClientRect().width;
      return Math.max(1, 900 / renderedWidth);
    };

    const preventScroll = (e: TouchEvent) => {
      if (stateRef.current.gameState === 'playing') e.preventDefault();
    };
    canvas.addEventListener('touchmove', preventScroll, { passive: false });

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

    const gameLoop = (now: number) => {
      const rawDt = now - lastFrameTime;
      lastFrameTime = now;
      const dt = Math.min(rawDt, 33.33) / 16.667;
      const vScale = getSpeedScale();

      const s = stateRef.current;

      // Background
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

      if (s.warpFlash > 0) {
        s.warpFlash--;
        ctx.fillStyle = `rgba(255, 255, 255, ${s.warpFlash / 20})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.save();
      if (s.shakeTimer > 0) {
        s.shakeTimer--;
        ctx.translate((Math.random() - 0.5) * s.shakeTimer * 0.8, (Math.random() - 0.5) * s.shakeTimer * 0.8);
      }

      // Ceiling hazard
      if (s.stage !== 3) {
        ctx.strokeStyle = 'rgba(255, 71, 87, 0.4)'; ctx.lineWidth = 2;
        ctx.setLineDash([6, 8]); ctx.beginPath(); ctx.moveTo(0, topCeiling); ctx.lineTo(canvas.width, topCeiling); ctx.stroke();
        ctx.setLineDash([]);
      }

      // Ground
      const groundColor = s.stage === 3 ? '#EF4444' : s.stage === 2 ? '#A855F7' : '#5A74FF';
      ctx.strokeStyle = groundColor; ctx.lineWidth = 3; ctx.shadowColor = groundColor; ctx.shadowBlur = 14;
      ctx.beginPath(); ctx.moveTo(0, groundY); ctx.lineTo(canvas.width, groundY); ctx.stroke(); ctx.shadowBlur = 0;

      // === GAMEPLAY ===
      if (s.gameState === 'playing') {
        // Continuous confetti during victory/cutscene
        if (s.boss.exploding) {
          s.boss.explodeTimer -= dt;
          s.shakeTimer = 20;

          // Staggered explosions across boss body
          if (Math.random() < 0.6) {
            const expX = s.boss.x + Math.random() * s.boss.width;
            const expY = s.boss.y + Math.random() * s.boss.height;
            triggerExplosion(expX, expY, Math.random() > 0.4);
            playExplosionSound();
          }

          // Rain confetti
          if (Math.random() < 0.5) spawnConfetti(4);

          // End of cutscene -> victory
          if (s.boss.explodeTimer <= 0) {
            s.boss.exploding = false;
            s.boss.active = false;
            s.gameState = 'victory';
            setDisplayState('victory');
            playVictoryFanfare();
            spawnConfetti(60);
          }
        } else {
          s.distance += 0.25 * dt;
        }

        if (s.shootCooldown > 0) s.shootCooldown -= dt;
        const currentMeters = Math.floor(s.distance);
        setHudScore(currentMeters);

        const rapidRemaining = Math.max(0, Math.ceil((s.rapidFireEnd - Date.now()) / 1000));
        setRapidTimer(rapidRemaining);
        setHasExplosive(Date.now() < s.explosiveEnd);
        const droneRemaining = Math.max(0, Math.ceil((s.droneEnd - Date.now()) / 1000));
        setDroneTimer(droneRemaining);

        if (Date.now() >= s.droneEnd) s.drones = [];

        // Stage transitions
        const stageDist = currentMeters - s.stageStartDist;
        if (s.stage === 1) {
          setNextStageMeter(Math.max(0, STAGE_1_DIST - stageDist));
          if (stageDist >= STAGE_1_DIST) {
            s.stage = 2; s.stageStartDist = currentMeters; s.warpFlash = 20; s.playerY = 150; s.speed = 8;
            setActiveStage(2);
          }
        } else if (s.stage === 2) {
          setNextStageMeter(Math.max(0, STAGE_2_DIST - stageDist));
          if (stageDist >= STAGE_2_DIST) {
            s.stage = 3; s.stageStartDist = currentMeters; s.warpFlash = 20; s.speed = 7;
            setActiveStage(3);
          }
        } else {
          setNextStageMeter(0);
        }

        if (currentMeters > s.highScore) {
          s.highScore = currentMeters; setHudHighScore(currentMeters);
          try { localStorage.setItem('og_multistage_high_v2', currentMeters.toString()); } catch {}
        }

        // === PHYSICS ===
        if (s.stage === 1) {
          s.playerVy += 0.65 * dt; s.playerY += s.playerVy * dt; s.playerRotation += s.speed * 0.07 * dt;
          if (s.playerY <= topCeiling + playerRadius) { s.playerY = topCeiling + playerRadius; s.playerVy = 1.5; }
          if (s.playerY >= groundY - playerRadius) {
            s.playerY = groundY - playerRadius; s.playerVy = 0; s.isGrounded = true;
            if (s.jumpBuffer > 0) { s.jumpBuffer = 0; s.playerVy = -13.5; s.isGrounded = false; playJumpSound(); }
          } else { if (s.jumpBuffer > 0) s.jumpBuffer -= dt; }
        } else if (s.stage === 2) {
          s.playerVy += 0.35 * dt; s.playerY += s.playerVy * dt; s.playerRotation = s.playerVy * 0.04;
          if (s.playerY <= topCeiling + playerRadius) { s.playerY = topCeiling + playerRadius; s.playerVy = 1.5; }
          if (s.playerY >= groundY - playerRadius) { s.playerY = groundY - playerRadius; s.playerVy = 0; }
        } else {
          s.playerY += s.playerVy * 0.5 * dt; s.playerVy *= Math.pow(0.9, dt);
          s.playerY = Math.max(topCeiling + playerRadius, Math.min(groundY - playerRadius, s.playerY));
        }

        // Trail
        s.trail.unshift({ x: s.playerX, y: s.playerY, alpha: 0.6 });
        if (s.trail.length > 10) s.trail.pop();

        // === DRONES ===
        s.drones.forEach(drone => {
          drone.shootTimer++;
          if (drone.shootTimer >= 18) {
            drone.shootTimer = 0;
            fireDroneLaser(s.playerX, s.playerY + drone.offsetY);
          }
        });

        // === LASERS ===
        for (let i = s.lasers.length - 1; i >= 0; i--) {
          const l = s.lasers[i];
          l.x += l.vx * dt * vScale; l.y += l.vy * dt;

          for (let j = s.obstacles.length - 1; j >= 0; j--) {
            const obs = s.obstacles[j];
            if (obs.type.startsWith('pw_')) continue;
            if (l.x > obs.x && l.x < obs.x + obs.width && l.y > obs.y && l.y < obs.y + obs.height) {
              s.lasers.splice(i, 1);
              s.obstacles.splice(j, 1);
              if (l.explosive) {
                explosiveShrapnel(obs.x + obs.width / 2, obs.y + obs.height / 2);
              } else {
                triggerExplosion(obs.x + obs.width / 2, obs.y + obs.height / 2, true);
              }
              break;
            }
          }

          // Laser vs boss
          if (s.boss.active && !s.boss.exploding && s.boss.shieldTimer <= 0 &&
            l.x > s.boss.x && l.y > s.boss.y && l.y < s.boss.y + s.boss.height) {
            s.lasers.splice(i, 1);
            s.boss.hp -= 1; s.boss.hitsSinceShield += 1;
            if (s.boss.hitsSinceShield >= 10) { s.boss.shieldTimer = 120; s.boss.hitsSinceShield = 0; }
            if (s.boss.hp <= 14) s.boss.phase = 3;
            else if (s.boss.hp <= 34) s.boss.phase = 2;

            // Trigger Boss Explosion Cutscene!
            if (s.boss.hp <= 0) {
              s.boss.exploding = true;
              s.boss.explodeTimer = 120; // 2 seconds cutscene
              s.obstacles = []; // clear remaining fireballs
            }
          }

          if (l.x > canvas.width + 50 || l.y < 0 || l.y > canvas.height) s.lasers.splice(i, 1);
        }

        // === BOSS (Stage 3) ===
        if (s.stage === 3 && (currentMeters - s.stageStartDist) >= 40 && !s.boss.active && !s.boss.exploding) {
          s.boss.active = true; s.boss.hp = 50; s.boss.maxHp = 50; s.boss.phase = 1;
          s.boss.x = canvas.width - 160; s.boss.y = 50;
          s.boss.shieldTimer = 0; s.boss.hitsSinceShield = 0; s.boss.chargeTimer = 0; s.boss.charging = false;
        }

        if (s.boss.active && !s.boss.exploding) {
          if (s.boss.shieldTimer > 0) s.boss.shieldTimer--;
          const moveSpeed = (s.boss.phase === 3 ? 4.5 : s.boss.phase === 2 ? 3 : 2) * dt;

          if (s.boss.phase === 3) {
            s.boss.chargeTimer++;
            if (s.boss.chargeTimer > 180 && !s.boss.charging) { s.boss.charging = true; s.boss.chargeVx = -18; }
            if (s.boss.charging) {
              s.boss.x += s.boss.chargeVx * dt;
              if (s.boss.x <= 100) s.boss.chargeVx = 8;
              if (s.boss.x >= canvas.width - 160) { s.boss.x = canvas.width - 160; s.boss.charging = false; s.boss.chargeTimer = 0; }
            }
          }

          // Strict vertical range clamp (Y between 35 and 110 so bottom edge NEVER touches groundY 244)
          if (!s.boss.charging) {
            s.boss.y += s.boss.direction * moveSpeed;
            if (s.boss.y <= 35) { s.boss.y = 35; s.boss.direction = 1; }
            if (s.boss.y >= 110) { s.boss.y = 110; s.boss.direction = -1; }
          }

          s.boss.shootTimer += dt;
          const shootInterval = s.boss.phase === 3 ? 30 : s.boss.phase === 2 ? 40 : 55;
          if (s.boss.shootTimer > shootInterval) {
            s.boss.shootTimer = 0;
            const bossCenter = s.boss.y + s.boss.height / 2;
            if (s.boss.phase === 1) {
              for (let f = -1; f <= 1; f++) s.obstacles.push({ id: Math.random().toString(), x: s.boss.x, y: bossCenter + f * 25, width: 24, height: 24, type: 'fireball' });
            } else if (s.boss.phase === 2) {
              for (let f = -1; f <= 1; f++) s.obstacles.push({ id: Math.random().toString(), x: s.boss.x, y: bossCenter + f * 20, width: 24, height: 24, type: 'homing', homingVy: 0 });
            } else {
              for (let f = -2; f <= 2; f++) s.obstacles.push({ id: Math.random().toString(), x: s.boss.x, y: bossCenter + f * 18, width: 22, height: 22, type: f === 0 ? 'homing' : 'fireball', homingVy: f === 0 ? 0 : undefined });
            }
          }
        }

        // === SPAWN OBSTACLES ===
        if (!s.boss.active && !s.boss.exploding && canvas.width - s.lastObstacleX > 200 + Math.random() * 160) {
          s.obstacleCount++;
          let type: Obstacle['type'];
          if (s.stage === 1) {
            type = Math.random() > 0.5 ? 'cable' : 'caster';
          } else {
            const isPowerup = s.stage >= 2 && Math.random() < 0.08;
            if (isPowerup) {
              const roll = Math.random();
              if (roll < 0.25) type = 'pw_weapon';
              else if (roll < 0.42) type = 'pw_shield';
              else if (roll < 0.58) type = 'pw_rapid';
              else if (roll < 0.72) type = 'pw_blast';
              else if (roll < 0.86) type = 'pw_explosive';
              else type = 'pw_drones';
            } else {
              type = s.stage === 2 ? 'virus' : 'fireball';
            }
          }
          const isPU = type.startsWith('pw_');
          const obsH = isPU ? 28 : type === 'virus' ? 36 : type === 'fireball' ? 28 : 34;
          const obsW = 34;
          const obsY = isPU || s.stage >= 2 ? 60 + Math.random() * 130 : groundY - obsH;
          s.obstacles.push({ id: Math.random().toString(), x: canvas.width + 40, y: obsY, width: obsW, height: obsH, type });
          s.lastObstacleX = canvas.width + 40;
        }
        s.lastObstacleX -= s.speed * dt;

        // === OBSTACLE COLLISION ===
        for (let i = s.obstacles.length - 1; i >= 0; i--) {
          const obs = s.obstacles[i];
          const moveSpeed = ((obs.type === 'fireball' || obs.type === 'homing' ? s.speed + 4 : s.speed) * dt * vScale);
          obs.x -= moveSpeed;
          if (obs.type === 'homing') {
            const dy = s.playerY - (obs.y + obs.height / 2);
            obs.homingVy = (obs.homingVy || 0) * 0.95 + dy * 0.025;
            obs.y += obs.homingVy || 0;
          }
          const margin = 5;
          if (
            s.playerX + playerRadius - margin > obs.x &&
            s.playerX - playerRadius + margin < obs.x + obs.width &&
            s.playerY + playerRadius - margin > obs.y &&
            s.playerY - playerRadius + margin < obs.y + obs.height
          ) {
            if (obs.type.startsWith('pw_')) {
              s.obstacles.splice(i, 1);
              playPowerupSound();
              if (obs.type === 'pw_weapon') { if (s.weaponLevel < 3) { s.weaponLevel += 1; setWeaponLevel(s.weaponLevel); } }
              else if (obs.type === 'pw_shield') { s.hasShield = true; setHasShield(true); }
              else if (obs.type === 'pw_rapid') { s.rapidFireEnd = Date.now() + 8000; }
              else if (obs.type === 'pw_blast') { screenBlast(); }
              else if (obs.type === 'pw_explosive') { s.explosiveEnd = Date.now() + 10000; setHasExplosive(true); }
              else if (obs.type === 'pw_drones') {
                s.droneEnd = Date.now() + 10000;
                s.drones = [{ offsetY: -35, shootTimer: 0 }, { offsetY: 35, shootTimer: 0 }];
                setDroneTimer(10);
              }
            } else if (s.godMode) {
              s.obstacles.splice(i, 1);
              triggerExplosion(obs.x + obs.width / 2, obs.y + obs.height / 2, true);
            } else if (s.hasShield) {
              s.hasShield = false; setHasShield(false); s.obstacles.splice(i, 1);
              playShieldHitSound(); s.shakeTimer = 8;
            } else {
              triggerExplosion(s.playerX, s.playerY); s.gameState = 'gameover'; setDisplayState('gameover');
            }
          }
          if (obs.x + obs.width < -80) s.obstacles.splice(i, 1);
        }
      }

      // Continuous victory confetti animation
      if (s.gameState === 'victory') {
        if (Math.random() < 0.3) spawnConfetti(2);
      }

      // === DRAW TRAIL ===
      s.trail.forEach((pt, i) => {
        pt.alpha *= 0.82;
        ctx.beginPath(); ctx.arc(pt.x - i * 3, pt.y, playerRadius * (1 - i * 0.05), 0, Math.PI * 2);
        ctx.fillStyle = s.stage === 3 ? `rgba(239, 68, 68, ${pt.alpha * 0.4})` : `rgba(90, 116, 255, ${pt.alpha * 0.4})`;
        ctx.fill();
      });

      // === DRAW LASERS ===
      s.lasers.forEach(l => {
        ctx.fillStyle = l.explosive ? '#EF4444' : '#05CE78';
        ctx.shadowColor = l.explosive ? '#EF4444' : '#05CE78';
        ctx.shadowBlur = 14;
        ctx.fillRect(l.x, l.y - 3, l.explosive ? 30 : 26, 6);
        ctx.shadowBlur = 0;
      });

      // === DRAW DRONES ===
      if (s.drones.length > 0 && s.gameState !== 'gameover') {
        s.drones.forEach(drone => {
          const dx = s.playerX;
          const dy = s.playerY + drone.offsetY;
          ctx.save();
          ctx.translate(dx, dy);
          ctx.beginPath(); ctx.arc(0, 0, 12, 0, Math.PI * 2);
          ctx.fillStyle = '#3B82F6'; ctx.shadowColor = '#3B82F6'; ctx.shadowBlur = 12; ctx.fill();
          ctx.beginPath(); ctx.arc(0, 0, 5, 0, Math.PI * 2);
          ctx.fillStyle = '#0B1120'; ctx.shadowBlur = 0; ctx.fill();
          ctx.restore();
        });
      }

      // === DRAW PLAYER ===
      if (s.gameState !== 'gameover') {
        ctx.save();
        ctx.translate(s.playerX, s.playerY);
        ctx.rotate(s.playerRotation);

        if (s.hasShield) {
          ctx.beginPath(); ctx.arc(0, 0, playerRadius + 8, 0, Math.PI * 2);
          ctx.strokeStyle = '#22D3EE'; ctx.shadowColor = '#22D3EE'; ctx.shadowBlur = 16; ctx.lineWidth = 3; ctx.stroke(); ctx.shadowBlur = 0;
        }

        ctx.beginPath(); ctx.arc(0, 0, playerRadius, 0, Math.PI * 2);
        ctx.fillStyle = groundColor; ctx.shadowColor = groundColor; ctx.shadowBlur = 18; ctx.fill();

        ctx.beginPath(); ctx.arc(0, 0, playerRadius - 6, 0, Math.PI);
        ctx.fillStyle = '#05CE78'; ctx.fill();

        ctx.beginPath(); ctx.arc(0, 0, 8, 0, Math.PI * 2);
        ctx.fillStyle = '#0B1120'; ctx.shadowBlur = 0; ctx.fill();

        if (s.godMode) {
          ctx.beginPath(); ctx.arc(0, 0, playerRadius + 14, 0, Math.PI * 2);
          ctx.strokeStyle = '#F59E0B'; ctx.shadowColor = '#F59E0B'; ctx.shadowBlur = 20; ctx.lineWidth = 2;
          ctx.setLineDash([4, 6]); ctx.stroke(); ctx.setLineDash([]); ctx.shadowBlur = 0;
        }

        ctx.restore();
      }

      // === DRAW OBSTACLES ===
      s.obstacles.forEach(obs => {
        ctx.save();
        if (obs.type === 'pw_weapon') {
          ctx.fillStyle = '#3B82F6'; ctx.shadowColor = '#3B82F6'; ctx.shadowBlur = 16;
          ctx.beginPath(); ctx.arc(obs.x + obs.width / 2, obs.y + obs.height / 2, obs.width / 2, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = '#FFF'; ctx.font = 'bold 14px monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
          ctx.fillText('W', obs.x + obs.width / 2, obs.y + obs.height / 2);
        } else if (obs.type === 'pw_shield') {
          ctx.fillStyle = '#22D3EE'; ctx.shadowColor = '#22D3EE'; ctx.shadowBlur = 16;
          ctx.beginPath(); ctx.arc(obs.x + obs.width / 2, obs.y + obs.height / 2, obs.width / 2, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = '#FFF'; ctx.font = 'bold 14px monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
          ctx.fillText('S', obs.x + obs.width / 2, obs.y + obs.height / 2);
        } else if (obs.type === 'pw_rapid') {
          ctx.fillStyle = '#F59E0B'; ctx.shadowColor = '#F59E0B'; ctx.shadowBlur = 16;
          ctx.beginPath(); ctx.arc(obs.x + obs.width / 2, obs.y + obs.height / 2, obs.width / 2, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = '#FFF'; ctx.font = 'bold 14px monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
          ctx.fillText('R', obs.x + obs.width / 2, obs.y + obs.height / 2);
        } else if (obs.type === 'pw_blast') {
          ctx.fillStyle = '#EF4444'; ctx.shadowColor = '#EF4444'; ctx.shadowBlur = 16;
          ctx.beginPath(); ctx.arc(obs.x + obs.width / 2, obs.y + obs.height / 2, obs.width / 2, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = '#FFF'; ctx.font = 'bold 14px monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
          ctx.fillText('X', obs.x + obs.width / 2, obs.y + obs.height / 2);
        } else if (obs.type === 'pw_explosive') {
          ctx.fillStyle = '#DC2626'; ctx.shadowColor = '#DC2626'; ctx.shadowBlur = 18;
          ctx.beginPath(); ctx.arc(obs.x + obs.width / 2, obs.y + obs.height / 2, obs.width / 2, 0, Math.PI * 2); ctx.fill();
          ctx.strokeStyle = '#F59E0B'; ctx.lineWidth = 2; ctx.shadowBlur = 0;
          ctx.beginPath(); ctx.arc(obs.x + obs.width / 2, obs.y + obs.height / 2, obs.width / 2 + 4, 0, Math.PI * 2); ctx.stroke();
          ctx.fillStyle = '#FFF'; ctx.font = 'bold 14px monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
          ctx.fillText('E', obs.x + obs.width / 2, obs.y + obs.height / 2);
        } else if (obs.type === 'pw_drones') {
          ctx.fillStyle = '#8B5CF6'; ctx.shadowColor = '#8B5CF6'; ctx.shadowBlur = 18;
          ctx.beginPath(); ctx.arc(obs.x + obs.width / 2, obs.y + obs.height / 2, obs.width / 2, 0, Math.PI * 2); ctx.fill();
          ctx.strokeStyle = '#C4B5FD'; ctx.lineWidth = 2; ctx.shadowBlur = 0;
          ctx.beginPath(); ctx.arc(obs.x + obs.width / 2, obs.y + obs.height / 2, obs.width / 2 + 4, 0, Math.PI * 2); ctx.stroke();
          ctx.fillStyle = '#FFF'; ctx.font = 'bold 14px monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
          ctx.fillText('D', obs.x + obs.width / 2, obs.y + obs.height / 2);
        } else if (obs.type === 'virus') {
          ctx.fillStyle = '#A855F7'; ctx.shadowColor = '#A855F7'; ctx.shadowBlur = 14;
          ctx.beginPath(); ctx.arc(obs.x + obs.width / 2, obs.y + obs.height / 2, obs.width / 2, 0, Math.PI * 2); ctx.fill();
        } else if (obs.type === 'fireball') {
          ctx.fillStyle = '#EF4444'; ctx.shadowColor = '#EF4444'; ctx.shadowBlur = 16;
          ctx.beginPath(); ctx.arc(obs.x + obs.width / 2, obs.y + obs.height / 2, obs.width / 2, 0, Math.PI * 2); ctx.fill();
        } else if (obs.type === 'homing') {
          ctx.fillStyle = '#FF6B35'; ctx.shadowColor = '#FF6B35'; ctx.shadowBlur = 18;
          ctx.beginPath(); ctx.arc(obs.x + obs.width / 2, obs.y + obs.height / 2, obs.width / 2, 0, Math.PI * 2); ctx.fill();
          ctx.strokeStyle = '#FFCC00'; ctx.lineWidth = 2; ctx.shadowBlur = 0;
          ctx.beginPath(); ctx.arc(obs.x + obs.width / 2, obs.y + obs.height / 2, obs.width / 2 + 4, 0, Math.PI * 2); ctx.stroke();
        } else if (obs.type === 'cable') {
          ctx.fillStyle = '#FF4757'; ctx.shadowColor = '#FF4757'; ctx.shadowBlur = 12;
          ctx.beginPath(); ctx.moveTo(obs.x, obs.y + obs.height); ctx.lineTo(obs.x + obs.width / 2, obs.y); ctx.lineTo(obs.x + obs.width, obs.y + obs.height);
          ctx.closePath(); ctx.fill();
        } else {
          ctx.strokeStyle = '#FFA502'; ctx.shadowColor = '#FFA502'; ctx.shadowBlur = 12; ctx.lineWidth = 4;
          ctx.beginPath(); ctx.arc(obs.x + obs.width / 2, obs.y + obs.height / 2, obs.width / 2, 0, Math.PI * 2); ctx.stroke();
        }
        ctx.restore();
      });

      // === DRAW BOSS ===
      if (s.boss.active) {
        ctx.save(); ctx.translate(s.boss.x, s.boss.y);
        const isShielded = s.boss.shieldTimer > 0;
        const phaseColor = s.boss.phase === 3 ? '#DC2626' : s.boss.phase === 2 ? '#F97316' : '#EF4444';

        // Exploding flickering flash effect during boss death cutscene
        if (s.boss.exploding) {
          ctx.fillStyle = Math.floor(Date.now() / 40) % 2 === 0 ? '#FFFFFF' : '#EF4444';
          ctx.shadowColor = '#EF4444'; ctx.shadowBlur = 40;
        } else {
          ctx.fillStyle = isShielded && Math.floor(Date.now() / 80) % 2 === 0 ? '#FFFFFF' : phaseColor;
          ctx.shadowColor = phaseColor; ctx.shadowBlur = isShielded ? 30 : 24;
        }

        ctx.fillRect(0, 0, s.boss.width, s.boss.height);
        ctx.fillStyle = '#FFF'; ctx.font = 'bold 14px monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.shadowBlur = 0;
        ctx.fillText(
          s.boss.exploding ? 'CRITICAL' : s.boss.phase === 3 ? 'RAGE' : s.boss.phase === 2 ? 'P2' : 'P1',
          s.boss.width / 2, s.boss.height / 2
        );

        if (!s.boss.exploding) {
          const hpPercent = Math.max(0, s.boss.hp / s.boss.maxHp);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.2)'; ctx.fillRect(0, -18, s.boss.width, 10);
          const hpColor = s.boss.phase === 3 ? '#EF4444' : s.boss.phase === 2 ? '#F59E0B' : '#05CE78';
          ctx.fillStyle = hpColor; ctx.fillRect(0, -18, s.boss.width * hpPercent, 10);
          if (isShielded) { ctx.strokeStyle = '#FFFFFF'; ctx.lineWidth = 3; ctx.strokeRect(-6, -6, s.boss.width + 12, s.boss.height + 12); }
        }
        ctx.restore();
      }

      // === DRAW PARTICLES & CONFETTI ===
      for (let i = s.particles.length - 1; i >= 0; i--) {
        const p = s.particles[i];
        p.life++; p.rotation += p.vRot;

        if (p.type === 'confetti') {
          p.x += p.vx; p.y += p.vy;
          p.vx *= 0.98;
          const progress = p.life / p.maxLife;
          const alpha = Math.max(0, 1 - progress);
          ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rotation);
          ctx.fillStyle = p.color; ctx.globalAlpha = alpha;
          ctx.fillRect(-p.size / 2, -(p.height || p.size) / 2, p.size, p.height || p.size);
          ctx.restore();
        } else {
          p.x += p.vx; p.y += p.vy; p.vy += 0.2;
          const progress = p.life / p.maxLife;
          const alpha = Math.max(0, 1 - progress);
          ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rotation);
          if (p.type === 'binary') { ctx.fillStyle = p.color; ctx.globalAlpha = alpha; ctx.font = '900 16px monospace'; ctx.fillText(p.text || '0', 0, 0); }
          else if (p.type === 'ring') { ctx.strokeStyle = p.color; ctx.globalAlpha = alpha; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(0, 0, p.size, 0, Math.PI * 1.5); ctx.stroke(); }
          else { ctx.fillStyle = p.color; ctx.globalAlpha = alpha; ctx.beginPath(); ctx.arc(0, 0, p.size * (1 - progress), 0, Math.PI * 2); ctx.fill(); }
          ctx.restore();
        }
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
      canvas.removeEventListener('touchmove', preventScroll);
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 900, margin: '0 auto' }}>
      {/* Stage Select Bar */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
        {[
          { num: 1 as const, name: 'STAGE 1: FLOOR RUNNER' },
          { num: 2 as const, name: 'STAGE 2: SPACE LASERS' },
          { num: 3 as const, name: 'STAGE 3: MAGMA BOSS' },
        ].map((stg) => (
          <button key={stg.num} onClick={() => changeStage(stg.num)} style={{
            background: activeStage === stg.num ? '#5A74FF' : 'rgba(255, 255, 255, 0.06)',
            color: '#FFFFFF',
            border: activeStage === stg.num ? '2px solid #5A74FF' : '1px solid rgba(255, 255, 255, 0.15)',
            padding: '6px 14px', borderRadius: 999, fontSize: 11, fontWeight: 800,
            fontFamily: 'var(--font-mono)', cursor: 'pointer',
            boxShadow: activeStage === stg.num ? '0 4px 16px rgba(90, 116, 255, 0.4)' : 'none',
            transition: 'all 200ms ease',
          }}>{stg.name}</button>
        ))}
      </div>

      {/* Canvas */}
      <div onPointerDown={handleActionInput} style={{
        position: 'relative', borderRadius: 28, overflow: 'hidden',
        border: '1px solid rgba(90, 116, 255, 0.3)',
        boxShadow: '0 24px 60px rgba(0, 0, 0, 0.5)', background: '#0B1120', cursor: 'pointer',
      }}>
        <canvas ref={canvasRef} width={900} height={320} style={{ width: '100%', height: 'auto', display: 'block' }} />

        {/* HUD */}
        <div style={{ position: 'absolute', top: 18, left: 24, right: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', pointerEvents: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#05CE78', boxShadow: '0 0 10px #05CE78' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#A855F7', textTransform: 'uppercase', letterSpacing: '0.14em', fontWeight: 800 }}>
              STG {activeStage}
              {weaponLevel > 1 && <span style={{ color: '#3B82F6' }}> W{weaponLevel}</span>}
              {hasShield && <span style={{ color: '#22D3EE' }}> SHD</span>}
              {rapidTimer > 0 && <span style={{ color: '#F59E0B' }}> RPD{rapidTimer}s</span>}
              {hasExplosive && <span style={{ color: '#EF4444' }}> EXP</span>}
              {droneTimer > 0 && <span style={{ color: '#8B5CF6' }}> DRN{droneTimer}s</span>}
              {godMode && <span style={{ color: '#F59E0B' }}> GOD</span>}
            </span>
          </div>
          <div style={{ display: 'flex', gap: 18, fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 800 }}>
            {activeStage < 3 && <span style={{ color: '#F59E0B' }}>NEXT: {nextStageMeter}m</span>}
            {activeStage === 3 && <span style={{ color: '#EF4444' }}>BOSS FIGHT</span>}
            <span style={{ color: '#05CE78' }}>{hudScore}m</span>
            <span style={{ color: '#5A74FF' }}>BEST: {hudHighScore}m</span>
          </div>
        </div>

        {/* Visual Symbol Guide on Idle Overlay */}
        {displayState === 'idle' && (
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(11, 17, 32, 0.88)', backdropFilter: 'blur(6px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', textAlign: 'center', padding: '16px 24px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#05CE78', textTransform: 'uppercase', letterSpacing: '0.18em', fontWeight: 800, marginBottom: 6 }}>
              {activeStage === 1 ? 'TAP / CLICK / SPACE TO JUMP' : activeStage === 2 ? 'CLICK TO SHOOT & FLY' : 'MOVE MOUSE TO AIM · CLICK TO SHOOT'}
            </div>
            <h3 style={{ fontFamily: 'var(--font-ui)', fontWeight: 900, fontSize: 26, margin: '0 0 12px', letterSpacing: '-0.02em' }}>
              {activeStage === 1 ? 'STAGE 1: FLOOR RUNNER' : activeStage === 2 ? 'STAGE 2: SPACE LASERS' : 'STAGE 3: MAGMA BOSS'}
            </h3>

            {/* Visual Symbol Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px 14px', maxWidth: 640, marginBottom: 14, textTransform: 'none' }}>
              {[
                { badge: 'W', color: '#3B82F6', title: 'WEAPON TIER', desc: 'Single → Dual → Triple Spread' },
                { badge: 'S', color: '#22D3EE', title: 'ENERGY SHIELD', desc: 'Absorbs 1 Lethal Impact' },
                { badge: 'R', color: '#F59E0B', title: 'RAPID FIRE', desc: '2× Laser Fire Rate' },
                { badge: 'X', color: '#EF4444', title: 'SCREEN BLAST', desc: 'Clears All On-Screen Enemies' },
                { badge: 'E', color: '#DC2626', title: 'EXPLOSIVE LASER', desc: 'Shrapnel Chain Explosions' },
                { badge: 'D', color: '#8B5CF6', title: 'DRONE WINGMEN', desc: '2 Auto-Firing CPU Orbits' },
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255, 255, 255, 0.05)', padding: '6px 10px', borderRadius: 10, border: '1px solid rgba(255, 255, 255, 0.08)', textAlign: 'left' }}>
                  <span style={{ display: 'grid', placeItems: 'center', width: 22, height: 22, borderRadius: '50%', background: item.color, color: '#FFF', fontWeight: 900, fontFamily: 'var(--font-mono)', fontSize: 11, flexShrink: 0 }}>
                    {item.badge}
                  </span>
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 800, color: '#F1F5F9', lineHeight: 1.1 }}>{item.title}</div>
                    <div style={{ fontSize: 9, color: '#94A3B8', lineHeight: 1.1 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ fontSize: 12, color: '#94A3B8', fontWeight: 600 }}>
              {activeStage === 1 ? 'Dodge obstacles — reach 300m to warp to space!' : activeStage === 2 ? 'Collect power-ups & reach 400m to confront the Magma Boss!' : 'Defeat the 50 HP Magma Boss across 3 intense phases!'}
            </div>
          </div>
        )}

        {/* Epic Victory Cutscene Overlay */}
        {displayState === 'victory' && (
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(11, 17, 32, 0.88)', backdropFilter: 'blur(8px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-mono)', fontSize: 12, color: '#05CE78', textTransform: 'uppercase', letterSpacing: '0.22em', fontWeight: 800, marginBottom: 12 }}>
              <LucideIcons.Trophy size={18} /> VICTORY ACHIEVED
            </div>
            <h3 style={{ fontFamily: 'var(--font-ui)', fontWeight: 900, fontSize: 42, margin: '0 0 10px', letterSpacing: '-0.03em', background: 'linear-gradient(135deg, #FFF 30%, #05CE78 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              MAGMA BOSS DEFEATED!
            </h3>
            <p style={{ fontSize: 15, color: '#94A3B8', margin: '0 0 20px', maxWidth: 420 }}>
              Sensors clear. You have conquered all 3 stages and defended the Orbit core!
            </p>
            <button onClick={(e) => { e.stopPropagation(); handleActionInput(); }} style={{ background: '#05CE78', color: '#0F172A', border: 'none', padding: '14px 38px', borderRadius: 999, fontWeight: 800, fontSize: 15, cursor: 'pointer', boxShadow: '0 8px 28px rgba(5, 206, 120, 0.5)', display: 'inline-flex', alignItems: 'center', gap: 10, transition: 'all 200ms ease' }}>
              <LucideIcons.RotateCcw size={18} /> PLAY AGAIN
            </button>
          </div>
        )}

        {/* Game Over */}
        {displayState === 'gameover' && (
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(11, 17, 32, 0.88)', backdropFilter: 'blur(6px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#FF4757', textTransform: 'uppercase', letterSpacing: '0.18em', fontWeight: 700, marginBottom: 12 }}>IMPACT DETECTED</div>
            <h3 style={{ fontFamily: 'var(--font-ui)', fontWeight: 900, fontSize: 38, margin: '0 0 8px', letterSpacing: '-0.03em' }}>ORBIT SHATTERED!</h3>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 18, color: '#05CE78', fontWeight: 800, marginBottom: 24 }}>Distance: {hudScore}m</div>
            <button onClick={(e) => { e.stopPropagation(); handleActionInput(); }} style={{ background: '#5A74FF', color: '#FFFFFF', border: 'none', padding: '14px 36px', borderRadius: 999, fontWeight: 800, fontSize: 15, cursor: 'pointer', boxShadow: '0 8px 24px rgba(90, 116, 255, 0.4)', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <LucideIcons.RotateCcw size={18} /> PLAY AGAIN (SPACE)
            </button>
          </div>
        )}
      </div>

      {/* Dev God Mode Button */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
        <button
          onClick={toggleGodMode}
          style={{
            background: godMode ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255, 255, 255, 0.04)',
            color: godMode ? '#F59E0B' : 'rgba(255, 255, 255, 0.15)',
            border: `1px solid ${godMode ? 'rgba(245, 158, 11, 0.4)' : 'rgba(255, 255, 255, 0.06)'}`,
            padding: '4px 10px',
            borderRadius: 6,
            fontSize: 9,
            fontWeight: 700,
            fontFamily: 'var(--font-mono)',
            cursor: 'pointer',
            letterSpacing: '0.1em',
            transition: 'all 200ms ease',
          }}
        >
          {godMode ? 'GOD MODE ON' : '///'}
        </button>
      </div>
    </div>
  );
}
