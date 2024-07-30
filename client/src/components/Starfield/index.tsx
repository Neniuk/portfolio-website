import React, { useEffect, useRef } from "react";

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
            const size = Math.random() * 2;
            const speed = Math.random() * 0.001 + 0.00025; // Even slower speed
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

        for (let i = 0; i < 500; i++) {
            // Increase the number of stars
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
            style={{
                display: "block",
                width: "100%",
                height: "100%",
                margin: 0,
                padding: 0,
                position: "absolute",
                top: 0,
                left: 0,
                backgroundColor: "black",
                zIndex: -1000,
            }}
        ></canvas>
    );
};

const MemoizedStarfield = React.memo(Starfield);
export default MemoizedStarfield;
