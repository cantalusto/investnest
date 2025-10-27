import React, { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  originalX: number;
  originalY: number;
}

export const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Point[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initPoints();
    };

    // Initialize points
    const initPoints = () => {
      const points: Point[] = [];
      const spacing = 150;
      const cols = Math.ceil(canvas.width / spacing);
      const rows = Math.ceil(canvas.height / spacing);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * spacing + Math.random() * 50;
          const y = j * spacing + Math.random() * 50;
          points.push({
            x,
            y,
            vx: (Math.random() - 0.5) * 1.5,
            vy: (Math.random() - 0.5) * 1.5,
            originalX: x,
            originalY: y,
          });
        }
      }
      pointsRef.current = points;
    };

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#18181b';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const points = pointsRef.current;
      const mouse = mouseRef.current;

      points.forEach((point, i) => {
        point.x += point.vx;
        point.y += point.vy;

        const dx = mouse.x - point.x;
        const dy = mouse.y - point.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150;

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          point.x -= dx * force * 0.05;
          point.y -= dy * force * 0.05;
        }

        if (point.x < 0 || point.x > canvas.width) {
          point.vx *= -1;
          point.x = point.x < 0 ? 0 : canvas.width;
        }
        if (point.y < 0 || point.y > canvas.height) {
          point.vy *= -1;
          point.y = point.y < 0 ? 0 : canvas.height;
        }

        points.forEach((otherPoint, j) => {
          if (i < j) {
            const dx = point.x - otherPoint.x;
            const dy = point.y - otherPoint.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = 200;

            if (distance < maxDistance) {
              const opacity = (1 - distance / maxDistance) * 0.3;
              ctx.beginPath();
              ctx.strokeStyle = `rgba(16, 240, 128, ${opacity})`;
              ctx.lineWidth = 1;
              ctx.moveTo(point.x, point.y);
              ctx.lineTo(otherPoint.x, otherPoint.y);
              ctx.stroke();
            }
          }
        });

        ctx.beginPath();
        ctx.arc(point.x, point.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#10f080';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(point.x, point.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(16, 240, 128, 0.2)';
        ctx.fill();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{
        background: '#18181b',
        zIndex: 0,
        maxWidth: '100vw',
        maxHeight: '100vh',
        overflow: 'hidden',
      }}
    />
  );
};
