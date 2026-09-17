import {
  Component,
  ElementRef,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewInit,
  NgZone,
  ChangeDetectionStrategy
} from '@angular/core';

interface LightOrb {
  baseX: number; // percentage (0..1)
  baseY: number; // percentage (0..1)
  radius: number;
  speedX: number;
  speedY: number;
  phase: number;
  colorType: 'primary' | 'secondary';
}

@Component({
  selector: 'app-particle-canvas',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<canvas #canvasEl style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: -1;"></canvas>`,
  styles: [`
    :host {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      overflow: hidden;
      pointer-events: none;
    }
  `]
})
export class ParticleCanvasComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('canvasEl', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  
  private ctx!: CanvasRenderingContext2D;
  private animationFrameId!: number;
  private active = false;
  private cleanups: (() => void)[] = [];
  private time = 0;

  // Damped cursor tracking for soft ambient spotlight
  private mouse = {
    x: -9999,
    y: -9999,
    targetX: -9999,
    targetY: -9999,
    active: false,
    radius: 160
  };

  // Subtle ambient light orbs (breathing gently in the background)
  private readonly orbs: LightOrb[] = [
    { baseX: 0.18, baseY: 0.15, radius: 420, speedX: 0.0004, speedY: 0.0003, phase: 0.0, colorType: 'primary' },
    { baseX: 0.82, baseY: 0.35, radius: 480, speedX: 0.0003, speedY: 0.0005, phase: 2.2, colorType: 'secondary' },
    { baseX: 0.45, baseY: 0.75, radius: 440, speedX: 0.0005, speedY: 0.0004, phase: 4.1, colorType: 'primary' }
  ];

  constructor(private ngZone: NgZone) {}

  ngOnInit() {
    this.active = true;
  }

  ngAfterViewInit() {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    this.ctx = ctx;
    this.resizeCanvas();

    const prefersReduced =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.ngZone.runOutsideAngular(() => {
      this.attachListeners();

      if (prefersReduced) {
        this.renderStatic();
      } else {
        this.loop();
      }
    });
  }

  ngOnDestroy() {
    this.active = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    this.cleanups.forEach(fn => fn());
    this.cleanups = [];
  }

  private attachListeners() {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    const onResize = () => {
      this.resizeCanvas();
    };

    const onMouseMove = (event: MouseEvent) => {
      this.mouse.targetX = event.clientX;
      this.mouse.targetY = event.clientY;
      this.mouse.active = true;
    };

    const onMouseLeave = () => {
      this.mouse.active = false;
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        this.active = false;
        if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
      } else {
        this.active = true;
        this.loop();
      }
    };

    window.addEventListener('resize', onResize, { passive: true });
    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave, { passive: true });
    document.addEventListener('visibilitychange', onVisibilityChange, { passive: true });

    this.cleanups.push(() => window.removeEventListener('resize', onResize));
    this.cleanups.push(() => document.removeEventListener('mousemove', onMouseMove));
    this.cleanups.push(() => document.removeEventListener('mouseleave', onMouseLeave));
    this.cleanups.push(() => document.removeEventListener('visibilitychange', onVisibilityChange));
  }

  private resizeCanvas() {
    const canvas = this.canvasRef.nativeElement;
    const rect = canvas.parentElement?.getBoundingClientRect() || {
      width: window.innerWidth,
      height: window.innerHeight
    };
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(rect.width * dpr);
    canvas.height = Math.floor(rect.height * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  private loop() {
    if (!this.active) return;
    this.time += 1;

    // Smooth cursor interpolation (lerp)
    if (this.mouse.active) {
      if (this.mouse.x === -9999) {
        this.mouse.x = this.mouse.targetX;
        this.mouse.y = this.mouse.targetY;
      } else {
        this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.08;
        this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.08;
      }
    } else {
      this.mouse.x += (-9999 - this.mouse.x) * 0.05;
      this.mouse.y += (-9999 - this.mouse.y) * 0.05;
    }

    this.render();
    this.animationFrameId = requestAnimationFrame(() => this.loop());
  }

  private renderStatic() {
    this.time = 50;
    this.render();
  }

  private render() {
    const canvas = this.canvasRef.nativeElement;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = canvas.width / dpr;
    const height = canvas.height / dpr;

    this.ctx.clearRect(0, 0, width, height);

    const isLight = typeof document !== 'undefined' && document.documentElement.classList.contains('light-theme');
    const primaryRgb = isLight ? '207, 110, 72' : '240, 180, 155';
    const secondaryRgb = isLight ? '180, 85, 50' : '224, 111, 36';

    // 1. Subtle ambient breathing light orbs (deep, quiet depth)
    for (const orb of this.orbs) {
      const offsetX = Math.sin(this.time * orb.speedX + orb.phase) * (width * 0.05);
      const offsetY = Math.cos(this.time * orb.speedY + orb.phase) * (height * 0.04);
      const ox = width * orb.baseX + offsetX;
      const oy = height * orb.baseY + offsetY;
      const color = orb.colorType === 'primary' ? primaryRgb : secondaryRgb;

      const grad = this.ctx.createRadialGradient(ox, oy, 0, ox, oy, orb.radius);
      const maxAlpha = isLight ? 0.035 : 0.055;
      grad.addColorStop(0, `rgba(${color}, ${maxAlpha})`);
      grad.addColorStop(0.6, `rgba(${color}, ${maxAlpha * 0.3})`);
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      this.ctx.fillStyle = grad;
      this.ctx.fillRect(0, 0, width, height);
    }

    // 2. Quiet interactive spotlight following cursor
    if (this.mouse.active && this.mouse.x > -1000) {
      const glowGrad = this.ctx.createRadialGradient(
        this.mouse.x, this.mouse.y, 0,
        this.mouse.x, this.mouse.y, 280
      );
      const spotlightAlpha = isLight ? 0.05 : 0.065;
      glowGrad.addColorStop(0, `rgba(${primaryRgb}, ${spotlightAlpha})`);
      glowGrad.addColorStop(0.5, `rgba(${primaryRgb}, ${spotlightAlpha * 0.3})`);
      glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      this.ctx.fillStyle = glowGrad;
      this.ctx.fillRect(0, 0, width, height);
    }

    // 3. Minimalist, ultra-clean precision dot matrix
    const gridSize = 54;
    const dotRadius = 0.85;
    const cols = Math.ceil(width / gridSize);
    const rows = Math.ceil(height / gridSize);

    for (let c = 0; c <= cols; c++) {
      for (let r = 0; r <= rows; r++) {
        const gx = c * gridSize;
        const gy = r * gridSize;

        let alpha = isLight ? 0.03 : 0.02;

        if (this.mouse.active && this.mouse.x > -1000) {
          const dx = this.mouse.x - gx;
          const dy = this.mouse.y - gy;
          const distSq = dx * dx + dy * dy;
          if (distSq < 25600) { // 160px radius
            const dist = Math.sqrt(distSq);
            const factor = (1 - dist / 160);
            alpha += factor * (isLight ? 0.12 : 0.14);
          }
        }

        this.ctx.beginPath();
        this.ctx.arc(gx, gy, dotRadius, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(${primaryRgb}, ${alpha})`;
        this.ctx.fill();
      }
    }
  }
}
