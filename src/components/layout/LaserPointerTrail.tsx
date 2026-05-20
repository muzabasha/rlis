import React, { useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    alpha: number;
    size: number;
    color: string;
}

interface Ripple {
    x: number;
    y: number;
    radius: number;
    maxRadius: number;
    alpha: number;
    color: string;
}

export default function LaserPointerTrail() {
    const { laserPointerEnabled, washoutProtection } = useApp();
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const mouseRef = useRef({ x: -100, y: -100, active: false });
    const particlesRef = useRef<Particle[]>([]);
    const ripplesRef = useRef<Ripple[]>([]);
    const animationFrameId = useRef<number | null>(null);

    useEffect(() => {
        if (!laserPointerEnabled) {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
                animationFrameId.current = null;
            }
            // Clear canvas when disabled
            const canvas = canvasRef.current;
            if (canvas) {
                const ctx = canvas.getContext('2d');
                ctx?.clearRect(0, 0, canvas.width, canvas.height);
            }
            return;
        }

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current.x = e.clientX;
            mouseRef.current.y = e.clientY;
            mouseRef.current.active = true;

            // Generate tail particles
            const laserColor = washoutProtection ? '#00ffff' : '#ff0055';
            for (let i = 0; i < 2; i++) {
                particlesRef.current.push({
                    x: e.clientX,
                    y: e.clientY,
                    vx: (Math.random() - 0.5) * 1.2,
                    vy: (Math.random() - 0.5) * 1.2,
                    alpha: 0.9,
                    size: Math.random() * 3 + 2,
                    color: laserColor,
                });
            }
        };

        const handleMouseLeave = () => {
            mouseRef.current.active = false;
        };

        const handleMouseDown = (e: MouseEvent) => {
            if (!laserPointerEnabled) return;
            const rippleColor = washoutProtection ? 'rgba(0, 255, 255, 0.85)' : 'rgba(255, 0, 85, 0.85)';
            ripplesRef.current.push({
                x: e.clientX,
                y: e.clientY,
                radius: 4,
                maxRadius: 75,
                alpha: 1.0,
                color: rippleColor,
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);
        window.addEventListener('mousedown', handleMouseDown);

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const laserColor = washoutProtection ? '#00ffff' : '#ff0055';
            const glowColor = washoutProtection ? 'rgba(0, 255, 255, 0.35)' : 'rgba(255, 0, 85, 0.35)';

            // 1. Draw connecting trail path
            if (particlesRef.current.length > 1) {
                ctx.beginPath();
                ctx.moveTo(particlesRef.current[0].x, particlesRef.current[0].y);
                for (let i = 1; i < particlesRef.current.length; i++) {
                    const p = particlesRef.current[i];
                    ctx.lineTo(p.x, p.y);
                }
                ctx.strokeStyle = laserColor;
                ctx.lineWidth = 2.5;
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';
                ctx.shadowBlur = 6;
                ctx.shadowColor = laserColor;
                ctx.stroke();
                ctx.shadowBlur = 0; // reset
            }

            // 2. Draw Particles
            particlesRef.current.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;
                p.alpha -= 0.035;
                p.size = Math.max(0.1, p.size - 0.06);

                ctx.save();
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = Math.max(0, p.alpha);
                ctx.shadowBlur = 8;
                ctx.shadowColor = p.color;
                ctx.fill();
                ctx.restore();
            });

            // Filter out faded particles
            particlesRef.current = particlesRef.current.filter(p => p.alpha > 0 && p.size > 0.1);

            // 3. Draw Ripples (click markers)
            ripplesRef.current.forEach((r) => {
                r.radius += 2.2;
                r.alpha -= 0.022;

                ctx.save();
                ctx.beginPath();
                ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
                ctx.strokeStyle = r.color;
                ctx.lineWidth = 3.5;
                ctx.globalAlpha = Math.max(0, r.alpha);
                ctx.shadowBlur = 10;
                ctx.shadowColor = r.color;
                ctx.stroke();
                ctx.restore();
            });

            // Filter out finished ripples
            ripplesRef.current = ripplesRef.current.filter(r => r.alpha > 0 && r.radius < r.maxRadius);

            // 4. Draw Core Laser Pointer Node at mouse location
            if (mouseRef.current.active) {
                const { x, y } = mouseRef.current;
                ctx.save();

                // Outer soft glowing aura
                ctx.beginPath();
                ctx.arc(x, y, 14, 0, Math.PI * 2);
                ctx.fillStyle = glowColor;
                ctx.fill();

                // Inner bright beam core
                ctx.beginPath();
                ctx.arc(x, y, 5.5, 0, Math.PI * 2);
                ctx.fillStyle = '#ffffff';
                ctx.shadowBlur = 12;
                ctx.shadowColor = laserColor;
                ctx.fill();

                // Core outline
                ctx.beginPath();
                ctx.arc(x, y, 6, 0, Math.PI * 2);
                ctx.strokeStyle = laserColor;
                ctx.lineWidth = 1.5;
                ctx.stroke();

                ctx.restore();
            }

            animationFrameId.current = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
            window.removeEventListener('mousedown', handleMouseDown);
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, [laserPointerEnabled, washoutProtection]);

    if (!laserPointerEnabled) return null;

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-[9999] pointer-events-none"
            style={{ mixBlendMode: 'screen' }}
        />
    );
}
