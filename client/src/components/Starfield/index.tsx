import React, { useEffect, useRef } from "react";

class Star {
    x: number;
    y: number;
    z: number;
    radius: number;
    color: string;
    constructor(
        x: number,
        y: number,
        z: number,
        radius: number,
        color: string
    ) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.radius = radius;
        this.color = color;
    }
}

class StarfieldProps {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    width: number;
    height: number;
    stars: Star[];
    starCount: number;
    constructor(
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
        width: number,
        height: number,
        starCount: number
    ) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.stars = [];
        this.starCount = starCount;
    }

    init() {
        this.canvas.width = this.width;
        this.canvas.height = this.height;

        for (let i = 0; i < this.starCount; i++) {
            const x = Math.random() * this.width;
            const y = Math.random() * this.height;
            const z = Math.random() * this.width;
            const radius = Math.random() * 1.5;
            const color = `rgba(255, 255, 255, ${Math.random()})`;

            this.stars.push(new Star(x, y, z, radius, color));
        }

        this.animate();
    }

    animate() {
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.width, this.height);

        this.stars.forEach((star) => {
            this.ctx.beginPath();
            this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = star.color;
            this.ctx.fill();

            star.z -= 1;

            if (star.z <= 0) {
                star.z = this.width;
            }
        });

        requestAnimationFrame(() => this.animate());
    }
}

const Starfield: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;

        if (canvas) {
            const ctx = canvas.getContext("2d");

            if (ctx) {
                const width = window.innerWidth;
                const height = window.innerHeight;
                const starCount = 1000;

                const starfield = new StarfieldProps(
                    canvas,
                    ctx,
                    width,
                    height,
                    starCount
                );

                starfield.init();
            }
        }
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="z-bottom absolute inset-0 left-0 top-0 h-full w-full"
            style={{ zIndex: -1 }}
        ></canvas>
    );
};

const MemoizedStarfield = React.memo(Starfield);
export default MemoizedStarfield;
