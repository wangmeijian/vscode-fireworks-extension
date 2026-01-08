import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    console.log('VSCode Fireworks extension is now active!');

    let disposable = vscode.commands.registerCommand('vscode-fireworks.celebrate', () => {
        // 保存当前编辑器状态
        const activeEditor = vscode.window.activeTextEditor;

        // 创建一个全新的 Webview 面板，占据整个窗口
        const panel = vscode.window.createWebviewPanel(
            'fireworks',
            '🎆 烟花',
            vscode.ViewColumn.Active, // 在当前活动列显示
            {
                enableScripts: true,
                retainContextWhenHidden: false
            }
        );

        // 设置 HTML 内容
        panel.webview.html = getWebviewContent();

        // 5秒后自动关闭并恢复编辑器
        setTimeout(() => {
            panel.dispose();
            // 尝试恢复焦点到原编辑器
            if (activeEditor) {
                vscode.window.showTextDocument(activeEditor.document, activeEditor.viewColumn);
            }
        }, 5000);
    });

    context.subscriptions.push(disposable);
}

function getWebviewContent(): string {
    return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>烟花</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            margin: 0;
            padding: 0;
            overflow: hidden;
            background: rgba(0, 0, 0, 0.3);
            height: 100vh;
            width: 100vw;
            position: fixed;
            top: 0;
            left: 0;
        }
        canvas {
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
        .message {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #FFD700;
            font-size: 72px;
            font-weight: bold;
            text-shadow:
                0 0 30px rgba(255, 215, 0, 1),
                0 0 60px rgba(255, 215, 0, 0.8),
                0 0 90px rgba(255, 215, 0, 0.6),
                0 0 120px rgba(255, 215, 0, 0.4);
            z-index: 10;
            animation: fadeInOut 5s ease-in-out;
            pointer-events: none;
            user-select: none;
        }
        @keyframes fadeInOut {
            0% {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.3) rotate(-5deg);
            }
            15% {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1.2) rotate(2deg);
            }
            25% {
                transform: translate(-50%, -50%) scale(1) rotate(0deg);
            }
            85% {
                opacity: 1;
            }
            100% {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.5) rotate(5deg);
            }
        }
    </style>
</head>
<body>
    <div class="message">🎉 恭喜! 🎉</div>
    <canvas id="canvas"></canvas>
    <script>
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const fireworks = [];
        const particles = [];

        class Firework {
            constructor(x, targetY) {
                this.x = x;
                this.y = canvas.height;
                this.targetY = targetY;
                this.speed = 3;
                this.acceleration = 1.05;
                this.exploded = false;
                this.hue = Math.random() * 360;
            }

            update() {
                if (!this.exploded) {
                    this.speed *= this.acceleration;
                    this.y -= this.speed;

                    if (this.y <= this.targetY) {
                        this.explode();
                        this.exploded = true;
                    }
                }
            }

            explode() {
                const particleCount = 100;
                for (let i = 0; i < particleCount; i++) {
                    particles.push(new Particle(this.x, this.y, this.hue));
                }
            }

            draw() {
                if (!this.exploded) {
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, 4, 0, Math.PI * 2);
                    ctx.fillStyle = \`hsl(\${this.hue}, 100%, 60%)\`;
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = \`hsl(\${this.hue}, 100%, 60%)\`;
                    ctx.fill();
                    ctx.shadowBlur = 0;
                }
            }
        }

        class Particle {
            constructor(x, y, hue) {
                this.x = x;
                this.y = y;
                this.hue = hue + Math.random() * 30 - 15;
                this.brightness = Math.random() * 30 + 50;
                this.alpha = 1;

                const angle = Math.random() * Math.PI * 2;
                const speed = Math.random() * 6 + 2;
                this.vx = Math.cos(angle) * speed;
                this.vy = Math.sin(angle) * speed;

                this.gravity = 0.05;
                this.friction = 0.98;
                this.decay = Math.random() * 0.03 + 0.01;
            }

            update() {
                this.vx *= this.friction;
                this.vy *= this.friction;
                this.vy += this.gravity;

                this.x += this.vx;
                this.y += this.vy;

                this.alpha -= this.decay;
            }

            draw() {
                ctx.save();
                ctx.globalAlpha = this.alpha;

                // 发光效果
                ctx.shadowBlur = 15;
                ctx.shadowColor = \`hsl(\${this.hue}, 100%, \${this.brightness}%)\`;

                ctx.beginPath();
                ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
                ctx.fillStyle = \`hsl(\${this.hue}, 100%, \${this.brightness}%)\`;
                ctx.fill();
                ctx.restore();
            }
        }

        function createFirework() {
            const x = Math.random() * canvas.width;
            const targetY = Math.random() * canvas.height * 0.5 + canvas.height * 0.1;
            fireworks.push(new Firework(x, targetY));
        }

        function animate() {
            // 使用更透明的黑色创建拖尾效果
            ctx.fillStyle = 'rgba(0, 0, 0, 0.12)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // 增加烟花发射频率
            if (Math.random() < 0.25) {
                createFirework();
            }

            for (let i = fireworks.length - 1; i >= 0; i--) {
                fireworks[i].update();
                fireworks[i].draw();

                if (fireworks[i].exploded) {
                    fireworks.splice(i, 1);
                }
            }

            for (let i = particles.length - 1; i >= 0; i--) {
                particles[i].update();
                particles[i].draw();

                if (particles[i].alpha <= 0) {
                    particles.splice(i, 1);
                }
            }

            requestAnimationFrame(animate);
        }

        animate();

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    </script>
</body>
</html>`;
}

export function deactivate() {}
