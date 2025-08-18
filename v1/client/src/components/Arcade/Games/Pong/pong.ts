class Pong {
    private animationFrameId: number | null = null;
    private lastTime: number = 0;
    private accumulatedTime: number = 0;
    private readonly timeStep: number = 1000 / 60;

    private readonly paddleWidth: number = 10;
    private readonly paddleHeight: number = 100;
    private readonly ballRadius: number = 10;
    private readonly ballInitialVelocity: number = 5;
    private readonly computerInitialLevel: number = 0.1;
    private readonly ballSpeedIncrement: number = 0.1;
    private readonly roundsToIncreaseLevel: number = 5;
    private roundCounter: number = 0;

    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D | null;
    ball: {
        x: number;
        y: number;
        radius: number;
        velocityX: number;
        velocityY: number;
        color: string;
        speedIncrement: number;
    };
    player: {
        x: number;
        y: number;
        width: number;
        height: number;
        score: number;
        color: string;
    };
    computer: {
        x: number;
        y: number;
        width: number;
        height: number;
        score: number;
        color: string;
        level: number;
    };

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");

        if (this.context) {
            this.context.fillStyle = "WHITE";
            this.context.font = "30px Arial";
        }

        this.ball = {
            x: this.canvas.width / 2,
            y: this.canvas.height / 2,
            radius: this.ballRadius,
            velocityX: this.ballInitialVelocity,
            velocityY: this.ballInitialVelocity,
            color: "WHITE",
            speedIncrement: this.ballSpeedIncrement,
        };
        this.player = {
            x: 0,
            y: (this.canvas.height - 100) / 2,
            width: this.paddleWidth,
            height: this.paddleHeight,
            score: 0,
            color: "WHITE",
        };
        this.computer = {
            x: this.canvas.width - 10,
            y: (this.canvas.height - 100) / 2,
            width: this.paddleWidth,
            height: this.paddleHeight,
            score: 0,
            color: "WHITE",
            level: this.computerInitialLevel,
        };

        this.canvas.addEventListener("mousemove", (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.player.y = e.clientY - rect.top - this.player.height / 2;
        });
    }

    drawRect(x: number, y: number, width: number, height: number): void {
        if (!this.context) return;
        this.context.fillRect(x, y, width, height);
    }

    drawCircle(x: number, y: number, radius: number): void {
        if (!this.context) return;
        this.context.beginPath();
        this.context.arc(x, y, radius, 0, 2 * Math.PI);
        this.context.closePath();
        this.context.fill();
    }

    drawText(text: string, x: number, y: number): void {
        if (!this.context) return;
        this.context.fillText(text, x, y);
    }

    update(): void {
        // Computer movement
        this.computer.y +=
            (this.ball.y - (this.computer.y + this.computer.height / 2)) *
            this.computer.level;

        // Ball movement
        this.ball.x += this.ball.velocityX;
        this.ball.y += this.ball.velocityY;

        // Ball collision with top and bottom walls
        if (
            this.ball.y + this.ball.radius > this.canvas.height ||
            this.ball.y - this.ball.radius < 0
        ) {
            this.ball.velocityY = -this.ball.velocityY;
        }

        // Ball collision with paddles
        if (
            this.ball.x - this.ball.radius <
                this.player.x + this.player.width &&
            this.ball.y > this.player.y &&
            this.ball.y < this.player.y + this.player.height
        ) {
            this.ball.velocityX = -this.ball.velocityX;
            this.ball.velocityX *= 1 + this.ball.speedIncrement;
            this.ball.velocityY *= 1 + this.ball.speedIncrement;
        }

        if (
            this.ball.x + this.ball.radius > this.computer.x &&
            this.ball.y > this.computer.y &&
            this.ball.y < this.computer.y + this.computer.height
        ) {
            this.ball.velocityX = -this.ball.velocityX;
            this.ball.velocityX *= 1 + this.ball.speedIncrement;
            this.ball.velocityY *= 1 + this.ball.speedIncrement;
        }

        // Ball out of bounds
        if (this.ball.x - this.ball.radius < 0) {
            this.computer.score++;
            this.roundCounter++;
            this.resetBall();
        } else if (this.ball.x + this.ball.radius > this.canvas.width) {
            this.player.score++;
            this.roundCounter++;
            this.resetBall();
        }

        // Increase computer level after every 5 rounds
        if (this.roundCounter >= this.roundsToIncreaseLevel) {
            this.computer.level += 0.1;
            this.roundCounter = 0;
        }
    }

    render(): void {
        if (!this.context) return;

        // Clear the canvas
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw paddles
        this.drawRect(
            this.player.x,
            this.player.y,
            this.player.width,
            this.player.height
        );
        this.drawRect(
            this.computer.x,
            this.computer.y,
            this.computer.width,
            this.computer.height
        );

        // Draw ball
        this.drawCircle(this.ball.x, this.ball.y, this.ball.radius);

        // Draw scores
        this.drawText(
            this.player.score.toString(),
            this.canvas.width / 4,
            this.canvas.height / 5
        );
        this.drawText(
            this.computer.score.toString(),
            (3 * this.canvas.width) / 4,
            this.canvas.height / 5
        );
    }

    resetBall(): void {
        this.ball.x = this.canvas.width / 2;
        this.ball.y = this.canvas.height / 2;
        this.ball.velocityX =
            this.ballInitialVelocity * (Math.random() > 0.5 ? 1 : -1);
        this.ball.velocityY =
            this.ballInitialVelocity * (Math.random() > 0.5 ? 1 : -1);
    }

    gameLoop(timestamp: number): void {
        if (this.lastTime === 0) this.lastTime = timestamp;
        const deltaTime = timestamp - this.lastTime;
        this.lastTime = timestamp;
        this.accumulatedTime += deltaTime;

        while (this.accumulatedTime >= this.timeStep) {
            this.update();
            this.accumulatedTime -= this.timeStep;
        }

        this.render();
        this.animationFrameId = requestAnimationFrame(this.gameLoop.bind(this));
    }

    start(): void {
        this.lastTime = 0;
        this.accumulatedTime = 0;
        this.animationFrameId = requestAnimationFrame(this.gameLoop.bind(this));
    }

    stop(): void {
        if (this.animationFrameId !== null) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
        this.context?.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

export default Pong;
