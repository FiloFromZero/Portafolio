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

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  alpha: number;
  pulse: number;
  pulseSpeed: number;
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
  private particles: Particle[] = [];
  private animationFrameId!: number;
  private mouse = { x: -9999, y: -9999, radius: 220 };
  private active = false;
  private cleanups: (() => void)[] = [];
  private lastTime = 0;

  // Presencia: número mayor de partículas y tamaño base superior
  private readonly density: number = 0.000045;
  private readonly maxParticles = 120;
  private readonly minRadius = 1.2;
  private readonly maxRadius = 2.6;
  private readonly linkDistance = 130;
  private readonly linkDistanceSq = 130 * 130;

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

    // Run particle logic, drawing loop and all event listeners entirely outside Angular zone
    this.ngZone.runOutsideAngular(() => {
      this.initParticles();
      this.attachListeners();

      if (prefersReduced) {
        this.draw();
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
      this.initParticles();
    };

    const onMouseMove = (event: MouseEvent) => {
      this.mouse.x = event.clientX;
      this.mouse.y = event.clientY;
    };

    const onMouseLeave = () => {
      this.mouse.x = -9999;
      this.mouse.y = -9999;
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
    canvas.width = rect.width;
    canvas.height = rect.height;
  }

  private initParticles() {
    const canvas = this.canvasRef.nativeElement;
    const totalParticles = Math.min(
      Math.floor(canvas.width * canvas.height * this.density),
      this.maxParticles
    );

    this.particles = [];
    for (let i = 0; i < totalParticles; i++) {
      const radius = this.minRadius + Math.random() * (this.maxRadius - this.minRadius);
      this.particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius,
        baseRadius: radius,
        alpha: Math.random() * 0.5 + 0.3,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.5 + Math.random() * 1.2
      });
    }
  }

  private loop(now = 0) {
    if (!this.active) return;
    const dt = this.lastTime ? (now - this.lastTime) / 16.667 : 1;
    this.lastTime = now;
    this.draw(dt);
    this.animationFrameId = requestAnimationFrame((t) => this.loop(t));
  }

  private draw(dt = 1) {
    const canvas = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    const isLight = typeof document !== 'undefined' && document.documentElement.classList.contains('light-theme');
    const particleRgb = isLight ? '207, 110, 72' : '240, 180, 155';
    const lineRgb = isLight ? '185, 93, 56' : '248, 204, 186';

    const pLen = this.particles.length;
    const mouseActive = this.mouse.x !== -9999;

    for (let i = 0; i < pLen; i++) {
      const p = this.particles[i];
      p.x += p.vx * dt;
      p.y += p.vy * dt;

      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      // Animación de pulso suave para dar más vida y presencia
      p.pulse += p.pulseSpeed * 0.02 * dt;
      p.radius = p.baseRadius + Math.sin(p.pulse) * 0.35;

      if (mouseActive) {
        const dx = this.mouse.x - p.x;
        const dy = this.mouse.y - p.y;
        const distSq = dx * dx + dy * dy;
        const radiusSq = this.mouse.radius * this.mouse.radius;

        if (distSq < radiusSq) {
          const dist = Math.sqrt(distSq) || 1;
          const force = (this.mouse.radius - dist) / this.mouse.radius;
          p.x -= dx * force * 0.04 * dt;
          p.y -= dy * force * 0.04 * dt;
        }
      }
    }

    // Dibujar enlaces entre partículas cercanas (más visibles)
    for (let i = 0; i < pLen; i++) {
      const p1 = this.particles[i];
      for (let j = i + 1; j < pLen; j++) {
        const p2 = this.particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < this.linkDistanceSq) {
          const dist = Math.sqrt(distSq);
          const base = (this.linkDistance - dist) / this.linkDistance;
          const alpha = (base * (isLight ? 0.28 : 0.22)) * p1.alpha;
          this.ctx.beginPath();
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.strokeStyle = `rgba(${lineRgb}, ${alpha})`;
          this.ctx.lineWidth = 0.8;
          this.ctx.stroke();
        }
      }
    }

    // Dibujar partículas en la parte superior (encima de los enlaces)
    for (let i = 0; i < pLen; i++) {
      const p = this.particles[i];
      const alpha = p.alpha * (isLight ? 0.85 : 1);
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(${particleRgb}, ${alpha})`;
      this.ctx.fill();
    }
  }
}
