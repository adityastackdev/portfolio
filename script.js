
/* ============ LOADER ============ */
window.addEventListener('load', () => {
    setTimeout(() => document.getElementById('loader').classList.add('hidden'), 1200);
});

/* ============ CUSTOM CURSOR ============ */
const dot = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px'; dot.style.top = my + 'px';
});
function animateRing() {
    rx += (mx - rx) * .20; ry += (my - ry) * .20;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(animateRing);
}
animateRing();
document.querySelectorAll('a,button,.skill-card,.project-card,.hobby-card,input,textarea').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
});

/* ============ PARTICLES ============ */
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];
function resize() { canvas.width = innerWidth; canvas.height = innerHeight; }
resize();
window.addEventListener('resize', resize);
class P {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - .5) * .5;
        this.vy = (Math.random() - .5) * .5;
        this.r = Math.random() * 2 + 1;
        this.c = ['#00f0ff', '#b026ff', '#00ffe1', '#ff2bd6'][Math.floor(Math.random() * 4)];
    }
    update() {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = this.c;
        ctx.shadowBlur = 15; ctx.shadowColor = this.c;
        ctx.fill();
    }
}
for (let i = 0; i < 70; i++)particles.push(new P());
let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    // connect lines
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < 120) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(0,240,255,${1 - d / 120})`;
                ctx.lineWidth = .5; ctx.shadowBlur = 0;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
        // mouse interaction
        const dx = particles[i].x - mouseX;
        const dy = particles[i].y - mouseY;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 150) {
            particles[i].x += dx / d * 1.5;
            particles[i].y += dy / d * 1.5;
        }
    }
    requestAnimationFrame(animate);
}
animate();

/* ============ TYPING ANIMATION ============ */
const words = ["HTML Developer", "CSS Designer", "JavaScript Creator", "I Love Coding", "Professional Artist"];
let wi = 0, ci = 0, deleting = false;
const tEl = document.getElementById('typing');
function type() {
    const w = words[wi];
    if (deleting) {
        tEl.textContent = w.substring(0, ci--);
        if (ci < 0) { deleting = false; wi = (wi + 1) % words.length; setTimeout(type, 300); }
        else setTimeout(type, 50);
    } else {
        tEl.textContent = w.substring(0, ci++);
        if (ci > w.length) { deleting = true; setTimeout(type, 1800); }
        else setTimeout(type, 100);
    }
}
type();

/* ============ NAVBAR SCROLL ============ */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', scrollY > 50);
});

/* ============ MOBILE MENU ============ */
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle.addEventListener('click', () => navLinks.classList.toggle('active'));
navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('active'));
});

/* ============ SCROLL REVEAL ============ */
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('active');
            // progress fill
            if (e.target.classList.contains('skill-card')) {
                const fill = e.target.querySelector('.progress-fill');
                const skill = e.target.dataset.skill;
                setTimeout(() => fill.style.width = skill + '%', 200);
            }
            // counter
            e.target.querySelectorAll('.num').forEach(n => {
                const target = +n.dataset.count;
                let cur = 0;
                const step = target / 40;
                const iv = setInterval(() => {
                    cur += step;
                    if (cur >= target) { cur = target; clearInterval(iv); }
                    n.textContent = Math.floor(cur);
                }, 30);
            });
        }
    });
}, { threshold: .15 });
reveals.forEach(r => observer.observe(r));

/* ============ CONTACT FORM ============ */
const form = document.getElementById('contactForm');
const toast = document.getElementById('toast');
form.addEventListener('submit', e => {
    e.preventDefault();
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
    form.reset();
});

/* ============ PARALLAX MOUSE EFFECT ============ */
document.addEventListener('mousemove', e => {
    const x = (e.clientX / innerWidth - .5) * 20;
    const y = (e.clientY / innerHeight - .5) * 20;
    document.querySelectorAll('.floating-shape').forEach((s, i) => {
        s.style.transform = `translate(${x * (i + 1) * .3}px,${y * (i + 1) * .3}px)`;
    });
});

/* ============ TILT EFFECT ON PROJECT CARDS ============ */
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        const rx = ((y / r.height) - .5) * -15;
        const ry = ((x / r.width) - .5) * 15;
        card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-10px)`;
    });
    card.addEventListener('mouseleave', () => card.style.transform = '');
});
