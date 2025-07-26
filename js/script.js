document.addEventListener('DOMContentLoaded', () => {
    const celebrateButton = document.getElementById('celebrate-button');
    const canvas = document.getElementById('chess-canvas');
    const ctx = canvas.getContext('2d');

    let particles = [];
    // Unicode characters for chess pieces
    const chessPieces = ['♔', '♕', '♖', '♗', '♘', '♙'];
    const colors = ['#D4AF37', '#FFFFFF'];

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function createParticle() {
        const x = Math.random() * canvas.width;
        const y = canvas.height + 50; // Mulai dari bawah
        const size = Math.random() * 20 + 20;
        const character = chessPieces[Math.floor(Math.random() * chessPieces.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const speedY = Math.random() * 1 + 0.5; // Kecepatan naik
        const rotation = Math.random() * 360;
        const rotationSpeed = Math.random() * 2 - 1;

        return { x, y, size, character, color, speedY, rotation, rotationSpeed };
    }

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation * Math.PI / 180);
            ctx.fillStyle = p.color;
            ctx.font = `${p.size}px Arial`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.globalAlpha = (p.y / canvas.height); // Fade out at the top
            ctx.fillText(p.character, 0, 0);
            ctx.restore();
        });
    }

    function updateParticles() {
        particles.forEach((p, index) => {
            p.y -= p.speedY; // Bergerak ke atas
            p.rotation += p.rotationSpeed;

            // Hapus partikel jika sudah keluar dari layar atas
            if (p.y < -50) {
                particles.splice(index, 1);
            }
        });
    }

    function animate() {
        updateParticles();
        drawParticles();
        requestAnimationFrame(animate);
    }

    celebrateButton.addEventListener('click', () => {
        // Buat partikel baru secara berkala
        let count = 0;
        const interval = setInterval(() => {
            if (count >= 50) {
                clearInterval(interval);
                return;
            }
            particles.push(createParticle());
            count++;
        }, 100);
    });

    // Mulai animasi
    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});
