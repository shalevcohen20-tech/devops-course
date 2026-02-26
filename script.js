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
    
    // Create column objects with more properties
    const columns_arr = [];
    for (let i = 0; i < columns; i++) {
        columns_arr.push({
            x: i * fontSize,
            y: Math.random() * canvas.height,
            speed: Math.random() * 2 + 1,
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
                    const alpha = (1 - j / col.trail) * 0.8;
                    ctx.fillStyle = `rgba(0, 255, 65, ${alpha})`;
                    ctx.shadowColor = 'rgba(0, 255, 65, 0.5)';
                    ctx.shadowBlur = 10;
                }
                
                ctx.fillText(char, col.x, charY);
            }
            
            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;

            // Move column down
            col.y += col.speed;

            // Random character at top
            if (Math.random() > 0.95) {
                col.chars.unshift(charArray[Math.floor(Math.random() * charArray.length)]);
            } else if (Math.random() > 0.98) {
                col.chars[0] = charArray[Math.floor(Math.random() * charArray.length)];
            }

            // Remove characters from trail
            if (col.chars.length > col.trail) {
                col.chars.pop();
            }

            // Reset column when it goes off screen
            if (col.y > canvas.height) {
                col.y = 0;
                col.speed = Math.random() * 2 + 1;
                col.chars = [];
                for (let j = 0; j < col.trail; j++) {
                    col.chars.push(charArray[Math.floor(Math.random() * charArray.length)]);
                }
            }
        }
    }

    function animate() {
        draw();
        requestAnimationFrame(animate);
    }

    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

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
