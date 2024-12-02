import React, { useEffect, useRef } from "react";

// Controls the density of the starfield
const STAR_COUNT = 1000;
const STAR_SIZE_MAX = 2;
const STAR_SPEED_MIN = 0.00025;
const STAR_SPEED_RANGE = 0.001;

const Starfield: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const stars: {
            angle: number;
            radius: number;
            size: number;
            speed: number;
        }[] = [];

        const createStar = () => {
            const angle = Math.random() * 2 * Math.PI;
            const radius = Math.random() * canvas.width;
            const size = Math.random() * STAR_SIZE_MAX;
            const speed = Math.random() * STAR_SPEED_RANGE + STAR_SPEED_MIN;
            stars.push({ angle, radius, size, speed });
        };

        const drawStar = (star: { x: number; y: number; size: number }) => {
            ctx.fillStyle = "white";
            ctx.fillRect(star.x, star.y, star.size, star.size);
        };

        const animateStars = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            for (const element of stars) {
                const star = element;
                star.angle += star.speed;
                const x = centerX + star.radius * Math.cos(star.angle);
                const y = centerY + star.radius * Math.sin(star.angle);
                drawStar({ x, y, size: star.size });
            }
            requestAnimationFrame(animateStars);
        };

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        for (let i = 0; i < STAR_COUNT; i++) {
            createStar();
        }

        animateStars();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="z-bottom fixed left-0 top-0 m-0 block h-full w-full bg-black p-0"
        ></canvas>
    );
};

export default Starfield;
