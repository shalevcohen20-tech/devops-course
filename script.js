// Matrix Rain Effect
function initMatrixRain() {
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const charArray = characters.split('');

    const fontSize = 16;
    const columns = Math.ceil(canvas.width / fontSize);
    
    // Create column obj
            trail: Math.random() * 30 + 20,
            chars: []
        });
        
        // Generate initial characters for each column
        for (let j = 0; j < columns_arr[i].trail; j++) {
            columns_arr[i].chars.push(charArray[Math.floor(Math.random() * charArray.length)]);
        }
    }

    function draw() {
        // Fade effect instead of clearing
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = `bold ${fontSize}px monospace`;

        for (let i = 0; i < columns_arr.length; i++) {
            const col = columns_arr[i];
            
            // Draw the trail of characters
            for (let j = 0; j < col.chars.length; j++) {
                const char = col.chars[j];
                const charY = col.y - j * fontSize;
                
                // Skip if off screen
                if (charY < 0) continue;
                
                // Head character (bright)
                if (j === 0) {
                    ctx.fillStyle = '#ffffff';
                    ctx.shadowColor = '#00ff41';
                    ctx.shadowBlur = 15;
                } else {
                    // Trail characters (fading green)

// Mouse Tracking Effect
function initMouseTracking() {
    const cursorGlow = document.getElementById('cursor-glow');
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        cursorGlow.style.display = 'block';
        cursorGlow.style.left = mouseX + 'px';
        cursorGlow.style.top = mouseY + 'px';

        // Create trail particles
        if (Math.random() > 0.8) {
            createTrail(mouseX, mouseY);
        }
    });

    document.addEventListener('mouseleave', () => {
        cursorGlow.style.display = 'none';
    });
}

function createTrail(x, y) {
    const trail = document.createElement('div');
    trail.className = 'mouse-trail';
    trail.style.left = (x + (Math.random() - 0.5) * 20) + 'px';
    trail.style.top = (y + (Math.random() - 0.5) * 20) + 'px';
    
    document.body.appendChild(trail);

    // Fade and remove trail
    let opacity = 1;
    const fadeInterval = setInterval(() => {
        opacity -= 0.1;
        trail.style.opacity = opacity;
        if (opacity <= 0) {
            clearInterval(fadeInterval);
            trail.remove();
        }
    }, 30);
}

// Initialize all effects on page load
document.addEventListener('DOMContentLoaded', () => {
    initMatrixRain();
    initMouseTracking();
});
