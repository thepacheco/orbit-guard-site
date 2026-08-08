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
  type: 'cable' | 'caster' | 'virus' | 'fireball' | 'homing' | 'pw_weapon' | 'pw_shield' | 'pw_rapid' | 'pw_blast';
  hp?: number;
  homingVy?: number;
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
      x: 680,
      y: 110,
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
      gain.gain.setValueAtTime(0.2, now);
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

  const playShieldHitSound = () => {
    try {
      const ctx = getAudioCtx();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const now = ctx.currentTime;
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.15);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.15);
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

  const playBlastSound = () => {
    try {
      const ctx = getAudioCtx();
      if (!ctx) return;
      const now = ctx.currentTime;
      [200, 300, 500].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now + i * 0.05);
        osc.frequency.exponentialRampToValueAtTime(30, now + i * 0.05 + 0.2);
        gain.gain.setValueAtTime(0.25, now + i * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.05 + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.05);
        osc.stop(now + i * 0.05 + 0.2);
      });
    } catch {}
  };

  // High score read
  useEffect(() => {
    try {
      const saved = localStorage.getItem('og_multistage_high_v2');
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
    s.stageStartDist = 0;
    s.playerX = 110;
    s.playerY = stageNum === 1 ? 216 : 150;
    s.playerVy = 0;
    s.isGrounded = true;
    s.weaponLevel = 1;
    s.hasShield = false;
    s.rapidFireEnd = 0;
    s.obstacles = [];
    s.lasers = [];
    s.particles = [];
    s.boss.active = false;
    s.obstacleCount = 0;
    setWeaponLevel(1);
    setHasShield(false);
    setRapidTimer(0);
    setDisplayState('idle');
  };

  const fireLasers = () => {
    const s = stateRef.current;
    if (s.shootCooldown > 0) return;
    playLaserSound();
    const isRapid = Date.now() < s.rapidFireEnd;
    s.shootCooldown = isRapid ? 5 : 12;

    if (s.weaponLevel === 1) {
      s.lasers.push({ x: s.playerX + 20, y: s.playerY, vx: 14, vy: 0, speed: 14 });
    } else if (s.weaponLevel === 2) {
      s.lasers.push({ x: s.playerX + 20, y: s.playerY - 8, vx: 14, vy: 0, speed: 14 });
      s.lasers.push({ x: s.playerX + 20, y: s.playerY + 8, vx: 14, vy: 0, speed: 14 });
    } else {
      s.lasers.push({ x: s.playerX + 20, y: s.playerY, vx: 14, vy: 0, speed: 14 });
      s.lasers.push({ x: s.playerX + 20, y: s.playerY - 4, vx: 14, vy: -2.5, speed: 14 });
      s.lasers.push({ x: s.playerX + 20, y: s.playerY + 4, vx: 14, vy: 2.5, speed: 14 });
    }
  };

  const handleActionInput = (e?: React.PointerEvent) => {
    const s = stateRef.current;

    if (s.gameState === 'idle' || s.gameState === 'gameover' || s.gameState === 'victory') {
      s.gameState = 'playing';
      s.distance = 0;
      s.stageStartDist = 0;
      s.weaponLevel = 1;
      s.hasShield = false;
      s.rapidFireEnd = 0;
      setWeaponLevel(1);
      setHasShield(false);
      setRapidTimer(0);
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
        x: 680,
        y: 110,
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
        if (s.isGrounded) {
          s.playerVy = -13.5;
          s.isGrounded = false;
          playJumpSound();
        } else {
          s.jumpBuffer = 10;
        }
      } else if (s.stage === 2) {
        s.playerVy = -8;
        fireLasers();
      } else {
        // Stage 3: Star Fox flight
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

  const triggerExplosion = (x: number, y: number, small?: boolean) => {
    const s = stateRef.current;
    if (!small) {
      s.shakeTimer = 24;
      playExplosionSound();
    }
    const count = small ? 10 : 30;
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count;
      const vel = (small ? 2 : 4) + Math.random() * (small ? 4 : 8);
      s.particles.push({
        x, y,
        vx: Math.cos(angle) * vel,
        vy: Math.sin(angle) * vel,
        life: 1,
        maxLife: small ? 25 : 50,
        size: (small ? 2 : 4) + Math.random() * (small ? 3 : 6),
        color: i % 2 === 0 ? '#5A74FF' : '#05CE78',
        type: 'ring',
        rotation: Math.random() * Math.PI,
        vRot: (Math.random() - 0.5) * 0.3,
      });
    }
    if (!small) {
      for (let i = 0; i < 20; i++) {
        const angle = Math.random() * Math.PI * 2;
        const vel = 3 + Math.random() * 6;
        s.particles.push({
          x, y,
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
    const groundY = 244;
    const topCeiling = 34;
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

      // Warp Flash
      if (s.warpFlash > 0) {
        s.warpFlash--;
        ctx.fillStyle = `rgba(255, 255, 255, ${s.warpFlash / 20})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.save();
      if (s.shakeTimer > 0) {
        s.shakeTimer--;
        ctx.translate(
          (Math.random() - 0.5) * s.shakeTimer * 0.8,
          (Math.random() - 0.5) * s.shakeTimer * 0.8
        );
      }

      // Ceiling hazard line
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

      // === GAMEPLAY ===
      if (s.gameState === 'playing') {
        s.distance += 0.25;
        if (s.shootCooldown > 0) s.shootCooldown--;
        const currentMeters = Math.floor(s.distance);
        setHudScore(currentMeters);

        // Rapid fire timer HUD
        const rapidRemaining = Math.max(0, Math.ceil((s.rapidFireEnd - Date.now()) / 1000));
        setRapidTimer(rapidRemaining);

        // Stage transition distance meter
        const stageDist = currentMeters - s.stageStartDist;
        if (s.stage === 1) {
          setNextStageMeter(Math.max(0, STAGE_1_DIST - stageDist));
          if (stageDist >= STAGE_1_DIST) {
            s.stage = 2;
            s.stageStartDist = currentMeters;
            s.warpFlash = 20;
            s.playerY = 150;
            s.speed = 8;
            setActiveStage(2);
          }
        } else if (s.stage === 2) {
          setNextStageMeter(Math.max(0, STAGE_2_DIST - stageDist));
          if (stageDist >= STAGE_2_DIST) {
            s.stage = 3;
            s.stageStartDist = currentMeters;
            s.warpFlash = 20;
            s.speed = 7;
            setActiveStage(3);
          }
        } else {
          setNextStageMeter(0);
        }

        // High score
        if (currentMeters > s.highScore) {
          s.highScore = currentMeters;
          setHudHighScore(currentMeters);
          try { localStorage.setItem('og_multistage_high_v2', currentMeters.toString()); } catch {}
        }

        // === PHYSICS ===
        if (s.stage === 1) {
          s.playerVy += 0.65;
          s.playerY += s.playerVy;
          s.playerRotation += s.speed * 0.07;
          if (s.playerY <= topCeiling + playerRadius) {
            s.playerY = topCeiling + playerRadius;
            s.playerVy = 1.5;
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
          // Stage 3: Star Fox flight
          s.playerY += s.playerVy * 0.5;
          s.playerVy *= 0.9;
          s.playerY = Math.max(topCeiling + playerRadius, Math.min(groundY - playerRadius, s.playerY));
        }

        // Trail
        s.trail.unshift({ x: s.playerX, y: s.playerY, alpha: 0.6 });
        if (s.trail.length > 10) s.trail.pop();

        // === LASERS ===
        for (let i = s.lasers.length - 1; i >= 0; i--) {
          const l = s.lasers[i];
          l.x += l.vx;
          l.y += l.vy;

          // Laser vs obstacles
          for (let j = s.obstacles.length - 1; j >= 0; j--) {
            const obs = s.obstacles[j];
            if (obs.type.startsWith('pw_')) continue;
            if (
              l.x > obs.x && l.x < obs.x + obs.width &&
              l.y > obs.y && l.y < obs.y + obs.height
            ) {
              s.lasers.splice(i, 1);
              s.obstacles.splice(j, 1);
              triggerExplosion(obs.x + obs.width / 2, obs.y + obs.height / 2, true);
              break;
            }
          }

          // Laser vs boss
          if (s.boss.active && s.boss.shieldTimer <= 0 &&
              l.x > s.boss.x && l.y > s.boss.y && l.y < s.boss.y + s.boss.height) {
            s.lasers.splice(i, 1);
            s.boss.hp -= 1;
            s.boss.hitsSinceShield += 1;

            // Shield activation every 10 hits
            if (s.boss.hitsSinceShield >= 10) {
              s.boss.shieldTimer = 120; // ~2 seconds at 60fps
              s.boss.hitsSinceShield = 0;
            }

            // Phase transitions
            if (s.boss.hp <= 14) {
              s.boss.phase = 3;
            } else if (s.boss.hp <= 34) {
              s.boss.phase = 2;
            }

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

        // === BOSS (Stage 3) ===
        if (s.stage === 3 && (currentMeters - s.stageStartDist) >= 60 && !s.boss.active) {
          s.boss.active = true;
          s.boss.hp = 50;
          s.boss.maxHp = 50;
          s.boss.phase = 1;
          s.boss.x = canvas.width - 160;
          s.boss.y = 80;
          s.boss.shieldTimer = 0;
          s.boss.hitsSinceShield = 0;
          s.boss.chargeTimer = 0;
          s.boss.charging = false;
        }

        if (s.boss.active) {
          if (s.boss.shieldTimer > 0) s.boss.shieldTimer--;

          const moveSpeed = s.boss.phase === 3 ? 4.5 : s.boss.phase === 2 ? 3 : 2;

          // Phase 3 Charge Attack
          if (s.boss.phase === 3) {
            s.boss.chargeTimer++;
            if (s.boss.chargeTimer > 180 && !s.boss.charging) {
              s.boss.charging = true;
              s.boss.chargeVx = -18;
            }
            if (s.boss.charging) {
              s.boss.x += s.boss.chargeVx;
              if (s.boss.x <= 100) {
                s.boss.chargeVx = 8;
              }
              if (s.boss.x >= canvas.width - 160) {
                s.boss.x = canvas.width - 160;
                s.boss.charging = false;
                s.boss.chargeTimer = 0;
              }
            }
          }

          if (!s.boss.charging) {
            s.boss.y += s.boss.direction * moveSpeed;
            if (s.boss.y <= 30 || s.boss.y >= 160) s.boss.direction *= -1;
          }

          // Boss Shooting Patterns
          s.boss.shootTimer++;
          const shootInterval = s.boss.phase === 3 ? 30 : s.boss.phase === 2 ? 40 : 55;

          if (s.boss.shootTimer > shootInterval) {
            s.boss.shootTimer = 0;
            const bossCenter = s.boss.y + s.boss.height / 2;

            if (s.boss.phase === 1) {
              // Phase 1: 3-fireball volley
              for (let f = -1; f <= 1; f++) {
                s.obstacles.push({
                  id: Math.random().toString(),
                  x: s.boss.x,
                  y: bossCenter + f * 25,
                  width: 24, height: 24,
                  type: 'fireball',
                });
              }
            } else if (s.boss.phase === 2) {
              // Phase 2: Homing fireballs
              for (let f = -1; f <= 1; f++) {
                s.obstacles.push({
                  id: Math.random().toString(),
                  x: s.boss.x,
                  y: bossCenter + f * 20,
                  width: 24, height: 24,
                  type: 'homing',
                  homingVy: 0,
                });
              }
            } else {
              // Phase 3: 5-fireball spread
              for (let f = -2; f <= 2; f++) {
                s.obstacles.push({
                  id: Math.random().toString(),
                  x: s.boss.x,
                  y: bossCenter + f * 18,
                  width: 22, height: 22,
                  type: f === 0 ? 'homing' : 'fireball',
                  homingVy: f === 0 ? 0 : undefined,
                });
              }
            }
          }
        }

        // === SPAWN OBSTACLES ===
        if (!s.boss.active && canvas.width - s.lastObstacleX > 200 + Math.random() * 160) {
          s.obstacleCount++;

          // Power-up logic: NEVER in Stage 1, ~8% in Stage 2+
          let type: Obstacle['type'];
          if (s.stage === 1) {
            type = Math.random() > 0.5 ? 'cable' : 'caster';
          } else {
            const isPowerup = s.stage >= 2 && Math.random() < 0.08;
            if (isPowerup) {
              const roll = Math.random();
              if (roll < 0.35) type = 'pw_weapon';
              else if (roll < 0.6) type = 'pw_shield';
              else if (roll < 0.85) type = 'pw_rapid';
              else type = 'pw_blast';
            } else {
              type = s.stage === 2 ? 'virus' : 'fireball';
            }
          }

          const isPU = type.startsWith('pw_');
          const obsH = isPU ? 28 : type === 'virus' ? 36 : type === 'fireball' ? 28 : 34;
          const obsW = 34;
          const obsY = isPU || s.stage >= 2 ? 60 + Math.random() * 130 : groundY - obsH;

          s.obstacles.push({
            id: Math.random().toString(),
            x: canvas.width + 40, y: obsY,
            width: obsW, height: obsH,
            type,
          });
          s.lastObstacleX = canvas.width + 40;
        }
        s.lastObstacleX -= s.speed;

        // === OBSTACLE MOVEMENT & COLLISION ===
        for (let i = s.obstacles.length - 1; i >= 0; i--) {
          const obs = s.obstacles[i];
          const moveSpeed = obs.type === 'fireball' || obs.type === 'homing' ? s.speed + 4 : s.speed;
          obs.x -= moveSpeed;

          // Homing fireball tracking
          if (obs.type === 'homing') {
            const dy = s.playerY - (obs.y + obs.height / 2);
            obs.homingVy = (obs.homingVy || 0) * 0.95 + dy * 0.025;
            obs.y += obs.homingVy || 0;
          }

          // Player collision
          const margin = 5;
          if (
            s.playerX + playerRadius - margin > obs.x &&
            s.playerX - playerRadius + margin < obs.x + obs.width &&
            s.playerY + playerRadius - margin > obs.y &&
            s.playerY - playerRadius + margin < obs.y + obs.height
          ) {
            if (obs.type.startsWith('pw_')) {
              // Power-up collected
              s.obstacles.splice(i, 1);
              playPowerupSound();
              if (obs.type === 'pw_weapon') {
                if (s.weaponLevel < 3) { s.weaponLevel += 1; setWeaponLevel(s.weaponLevel); }
              } else if (obs.type === 'pw_shield') {
                s.hasShield = true;
                setHasShield(true);
              } else if (obs.type === 'pw_rapid') {
                s.rapidFireEnd = Date.now() + 8000;
              } else if (obs.type === 'pw_blast') {
                screenBlast();
              }
            } else if (s.hasShield) {
              // Shield absorbs hit
              s.hasShield = false;
              setHasShield(false);
              s.obstacles.splice(i, 1);
              playShieldHitSound();
              s.shakeTimer = 8;
            } else {
              // Death
              triggerExplosion(s.playerX, s.playerY);
              s.gameState = 'gameover';
              setDisplayState('gameover');
            }
          }

          if (obs.x + obs.width < -80) s.obstacles.splice(i, 1);
        }
      }

      // === DRAW TRAIL ===
      s.trail.forEach((pt, i) => {
        pt.alpha *= 0.82;
        ctx.beginPath();
        ctx.arc(pt.x - i * 3, pt.y, playerRadius * (1 - i * 0.05), 0, Math.PI * 2);
        ctx.fillStyle = s.stage === 3 ? `rgba(239, 68, 68, ${pt.alpha * 0.4})` : `rgba(90, 116, 255, ${pt.alpha * 0.4})`;
        ctx.fill();
      });

      // === DRAW LASERS ===
      ctx.fillStyle = '#05CE78';
      ctx.shadowColor = '#05CE78';
      ctx.shadowBlur = 14;
      s.lasers.forEach(l => {
        ctx.fillRect(l.x, l.y - 3, 26, 6);
      });
      ctx.shadowBlur = 0;

      // === DRAW PLAYER ===
      if (s.gameState !== 'gameover') {
        ctx.save();
        ctx.translate(s.playerX, s.playerY);
        ctx.rotate(s.playerRotation);

        // Shield ring
        if (s.hasShield) {
          ctx.beginPath();
          ctx.arc(0, 0, playerRadius + 8, 0, Math.PI * 2);
          ctx.strokeStyle = '#22D3EE';
          ctx.shadowColor = '#22D3EE';
          ctx.shadowBlur = 16;
          ctx.lineWidth = 3;
          ctx.stroke();
          ctx.shadowBlur = 0;
        }

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
        } else if (obs.type === 'virus') {
          ctx.fillStyle = '#A855F7'; ctx.shadowColor = '#A855F7'; ctx.shadowBlur = 14;
          ctx.beginPath(); ctx.arc(obs.x + obs.width / 2, obs.y + obs.height / 2, obs.width / 2, 0, Math.PI * 2); ctx.fill();
        } else if (obs.type === 'fireball') {
          ctx.fillStyle = '#EF4444'; ctx.shadowColor = '#EF4444'; ctx.shadowBlur = 16;
          ctx.beginPath(); ctx.arc(obs.x + obs.width / 2, obs.y + obs.height / 2, obs.width / 2, 0, Math.PI * 2); ctx.fill();
        } else if (obs.type === 'homing') {
          ctx.fillStyle = '#FF6B35'; ctx.shadowColor = '#FF6B35'; ctx.shadowBlur = 18;
          ctx.beginPath(); ctx.arc(obs.x + obs.width / 2, obs.y + obs.height / 2, obs.width / 2, 0, Math.PI * 2); ctx.fill();
          // Homing indicator ring
          ctx.strokeStyle = '#FFCC00'; ctx.lineWidth = 2; ctx.shadowBlur = 0;
          ctx.beginPath(); ctx.arc(obs.x + obs.width / 2, obs.y + obs.height / 2, obs.width / 2 + 4, 0, Math.PI * 2); ctx.stroke();
        } else if (obs.type === 'cable') {
          ctx.fillStyle = '#FF4757'; ctx.shadowColor = '#FF4757'; ctx.shadowBlur = 12;
          ctx.beginPath();
          ctx.moveTo(obs.x, obs.y + obs.height);
          ctx.lineTo(obs.x + obs.width / 2, obs.y);
          ctx.lineTo(obs.x + obs.width, obs.y + obs.height);
          ctx.closePath(); ctx.fill();
        } else {
          ctx.strokeStyle = '#FFA502'; ctx.shadowColor = '#FFA502'; ctx.shadowBlur = 12; ctx.lineWidth = 4;
          ctx.beginPath(); ctx.arc(obs.x + obs.width / 2, obs.y + obs.height / 2, obs.width / 2, 0, Math.PI * 2); ctx.stroke();
        }
        ctx.restore();
      });

      // === DRAW BOSS ===
      if (s.boss.active) {
        ctx.save();
        ctx.translate(s.boss.x, s.boss.y);

        // Boss body
        const isShielded = s.boss.shieldTimer > 0;
        const phaseColor = s.boss.phase === 3 ? '#DC2626' : s.boss.phase === 2 ? '#F97316' : '#EF4444';
        ctx.fillStyle = isShielded && Math.floor(Date.now() / 80) % 2 === 0 ? '#FFFFFF' : phaseColor;
        ctx.shadowColor = phaseColor;
        ctx.shadowBlur = isShielded ? 30 : 24;
        ctx.fillRect(0, 0, s.boss.width, s.boss.height);

        // Phase indicator
        ctx.fillStyle = '#FFF';
        ctx.font = 'bold 14px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowBlur = 0;
        ctx.fillText(
          s.boss.phase === 3 ? 'RAGE' : s.boss.phase === 2 ? 'P2' : 'P1',
          s.boss.width / 2, s.boss.height / 2
        );

        // Boss HP bar
        const hpPercent = Math.max(0, s.boss.hp / s.boss.maxHp);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.fillRect(0, -18, s.boss.width, 10);
        const hpColor = s.boss.phase === 3 ? '#EF4444' : s.boss.phase === 2 ? '#F59E0B' : '#05CE78';
        ctx.fillStyle = hpColor;
        ctx.fillRect(0, -18, s.boss.width * hpPercent, 10);

        if (isShielded) {
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 3;
          ctx.strokeRect(-6, -6, s.boss.width + 12, s.boss.height + 12);
        }

        ctx.restore();
      }

      // === DRAW PARTICLES ===
      for (let i = s.particles.length - 1; i >= 0; i--) {
        const p = s.particles[i];
        p.x += p.vx; p.y += p.vy; p.vy += 0.2;
        p.life++; p.rotation += p.vRot;
        const progress = p.life / p.maxLife;
        const alpha = Math.max(0, 1 - progress);

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        if (p.type === 'binary') {
          ctx.fillStyle = p.color; ctx.globalAlpha = alpha;
          ctx.font = '900 16px monospace'; ctx.fillText(p.text || '0', 0, 0);
        } else if (p.type === 'ring') {
          ctx.strokeStyle = p.color; ctx.globalAlpha = alpha; ctx.lineWidth = 3;
          ctx.beginPath(); ctx.arc(0, 0, p.size, 0, Math.PI * 1.5); ctx.stroke();
        } else {
          ctx.fillStyle = p.color; ctx.globalAlpha = alpha;
          ctx.beginPath(); ctx.arc(0, 0, p.size * (1 - progress), 0, Math.PI * 2); ctx.fill();
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
          { num: 3 as const, name: 'STAGE 3: MAGMA BOSS' },
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

      {/* Canvas */}
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

        {/* HUD */}
        <div
          style={{
            position: 'absolute',
            top: 18, left: 24, right: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            pointerEvents: 'none',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#05CE78', boxShadow: '0 0 10px #05CE78' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#A855F7', textTransform: 'uppercase', letterSpacing: '0.14em', fontWeight: 800 }}>
              STAGE {activeStage}
              {weaponLevel > 1 && <span style={{ color: '#3B82F6' }}> · W{weaponLevel}</span>}
              {hasShield && <span style={{ color: '#22D3EE' }}> · SHIELD</span>}
              {rapidTimer > 0 && <span style={{ color: '#F59E0B' }}> · RAPID {rapidTimer}s</span>}
            </span>
          </div>

          <div style={{ display: 'flex', gap: 18, fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 800 }}>
            {activeStage < 3 && <span style={{ color: '#F59E0B' }}>NEXT: {nextStageMeter}m</span>}
            {activeStage === 3 && <span style={{ color: '#EF4444' }}>BOSS FIGHT</span>}
            <span style={{ color: '#05CE78' }}>{hudScore}m</span>
            <span style={{ color: '#5A74FF' }}>BEST: {hudHighScore}m</span>
          </div>
        </div>

        {/* Idle Overlay */}
        {displayState === 'idle' && (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(11, 17, 32, 0.72)', backdropFilter: 'blur(4px)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            color: '#FFFFFF', textAlign: 'center',
          }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#05CE78', textTransform: 'uppercase', letterSpacing: '0.18em', fontWeight: 700, marginBottom: 12 }}>
              {activeStage === 1 ? 'CLICK OR SPACE TO JUMP' : activeStage === 2 ? 'CLICK TO SHOOT & FLY' : 'MOVE MOUSE TO AIM · CLICK TO SHOOT'}
            </div>
            <h3 style={{ fontFamily: 'var(--font-ui)', fontWeight: 900, fontSize: 32, margin: '0 0 12px', letterSpacing: '-0.02em' }}>
              {activeStage === 1 ? 'STAGE 1: FLOOR RUNNER' : activeStage === 2 ? 'STAGE 2: SPACE LASERS' : 'STAGE 3: MAGMA BOSS'}
            </h3>
            <p style={{ fontSize: 15, color: '#94A3B8', margin: 0, maxWidth: 440, lineHeight: 1.5 }}>
              {activeStage === 1
                ? 'Dodge cables & casters — 300m to reach space!'
                : activeStage === 2
                ? 'Blast viruses, collect power-ups [W] [S] [R] [X] — 400m to the boss!'
                : 'Defeat the Magma Boss across 3 deadly phases!'}
            </p>
          </div>
        )}

        {/* Victory */}
        {displayState === 'victory' && (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(11, 17, 32, 0.88)', backdropFilter: 'blur(6px)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            color: '#FFFFFF', textAlign: 'center',
          }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#05CE78', textTransform: 'uppercase', letterSpacing: '0.18em', fontWeight: 700, marginBottom: 12 }}>
              VICTORY ACHIEVED
            </div>
            <h3 style={{ fontFamily: 'var(--font-ui)', fontWeight: 900, fontSize: 40, margin: '0 0 8px', letterSpacing: '-0.03em' }}>
              MAGMA BOSS DEFEATED!
            </h3>
            <button onClick={(e) => { e.stopPropagation(); handleActionInput(); }} style={{
              background: '#05CE78', color: '#0F172A', border: 'none',
              padding: '14px 36px', borderRadius: 999, fontWeight: 800, fontSize: 15,
              cursor: 'pointer', boxShadow: '0 8px 24px rgba(5, 206, 120, 0.4)',
              display: 'inline-flex', alignItems: 'center', gap: 8,
            }}>
              <LucideIcons.RotateCcw size={18} /> PLAY AGAIN
            </button>
          </div>
        )}

        {/* Game Over */}
        {displayState === 'gameover' && (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(11, 17, 32, 0.88)', backdropFilter: 'blur(6px)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            color: '#FFFFFF', textAlign: 'center',
          }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#FF4757', textTransform: 'uppercase', letterSpacing: '0.18em', fontWeight: 700, marginBottom: 12 }}>
              IMPACT DETECTED
            </div>
            <h3 style={{ fontFamily: 'var(--font-ui)', fontWeight: 900, fontSize: 38, margin: '0 0 8px', letterSpacing: '-0.03em' }}>
              ORBIT SHATTERED!
            </h3>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 18, color: '#05CE78', fontWeight: 800, marginBottom: 24 }}>
              Distance: {hudScore}m
            </div>
            <button onClick={(e) => { e.stopPropagation(); handleActionInput(); }} style={{
              background: '#5A74FF', color: '#FFFFFF', border: 'none',
              padding: '14px 36px', borderRadius: 999, fontWeight: 800, fontSize: 15,
              cursor: 'pointer', boxShadow: '0 8px 24px rgba(90, 116, 255, 0.4)',
              display: 'inline-flex', alignItems: 'center', gap: 8,
            }}>
              <LucideIcons.RotateCcw size={18} /> PLAY AGAIN (SPACE)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
