// ===== CUSTOM CURSOR =====
const dot = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; dot.style.left = mx+'px'; dot.style.top = my+'px'; });
function animateRing() { rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12; ring.style.left = rx+'px'; ring.style.top = ry+'px'; requestAnimationFrame(animateRing); }
animateRing();
document.querySelectorAll('a,button,.skill-card,.project-card,.social-icon').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

// ===== SCROLL PROGRESS =====
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  document.getElementById('progress-bar').style.width = (scrollTop / docHeight * 100) + '%';
});

// ===== THEME TOGGLE =====
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light');
document.documentElement.setAttribute('data-theme', savedTheme);
document.getElementById('themeBtn').textContent = savedTheme === 'dark' ? '🌙' : '☀️';

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  document.getElementById('themeBtn').textContent = next === 'dark' ? '🌙' : '☀️';
}

// ===== LANGUAGE TOGGLE =====
let currentLang = 'EN';
function toggleLang() {
  currentLang = currentLang === 'EN' ? 'ID' : 'EN';
  document.querySelector('.lang-btn').textContent = currentLang;
}

// ===== MOBILE MENU =====
function toggleMobileMenu() { document.getElementById('mobileMenu').classList.toggle('open'); }
function closeMobileMenu() { document.getElementById('mobileMenu').classList.remove('open'); }

// ===== TYPING ANIMATION =====
const phrases = ['Fullstack Developer', 'Back-End Engineer', 'Problem Solver', 'Clean Code Advocate'];
let pi = 0, ci = 0, deleting = false;
const typingEl = document.getElementById('typing-text');
function typeLoop() {
  const phrase = phrases[pi];
  if (!deleting) {
    typingEl.textContent = phrase.slice(0, ci + 1);
    ci++;
    if (ci === phrase.length) { deleting = true; setTimeout(typeLoop, 1600); return; }
  } else {
    typingEl.textContent = phrase.slice(0, ci - 1);
    ci--;
    if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
  }
  setTimeout(typeLoop, deleting ? 60 : 100);
}
typeLoop();

// ===== PARTICLES =====
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
function resizeCanvas() { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; }
resizeCanvas(); window.addEventListener('resize', resizeCanvas);
function getAccentColor() {
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'rgba(0,173,181,' : 'rgba(27,38,44,';
}
for (let i = 0; i < 70; i++) {
  particles.push({ x:Math.random()*canvas.width, y:Math.random()*canvas.height, r:Math.random()*2+0.5, vx:(Math.random()-0.5)*0.4, vy:(Math.random()-0.5)*0.4, a:Math.random()*0.5+0.1 });
}
function drawParticles() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  const base = getAccentColor();
  particles.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0) p.x = canvas.width;
    if (p.x > canvas.width) p.x = 0;
    if (p.y < 0) p.y = canvas.height;
    if (p.y > canvas.height) p.y = 0;
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle = base + p.a + ')';
    ctx.fill();
  });
  requestAnimationFrame(drawParticles);
}
drawParticles();

// ===== SKILLS DATA =====
const skills = [
  {icon:'🌐', name:'HTML5', cat:'web', catLabel:'WEB'},
  {icon:'🎨', name:'CSS3', cat:'web', catLabel:'WEB'},
  {icon:'⚡', name:'JavaScript', cat:'web', catLabel:'WEB'},
  {icon:'🔷', name:'TypeScript', cat:'web', catLabel:'WEB'},
  {icon:'🐘', name:'PHP', cat:'back-end', catLabel:'BACK-END'},
  {icon:'🔴', name:'Laravel', cat:'back-end', catLabel:'BACK-END'},
  {icon:'💚', name:'Node.js', cat:'back-end', catLabel:'BACK-END'},
  {icon:'🐬', name:'MySQL', cat:'database', catLabel:'DATABASE'},
  {icon:'🍃', name:'MongoDB', cat:'database', catLabel:'DATABASE'},
  {icon:'⚡', name:'Supabase', cat:'database', catLabel:'DATABASE'},
  {icon:'⚛️', name:'React', cat:'front-end', catLabel:'FRONT-END'},
  {icon:'▲', name:'Next.js', cat:'front-end', catLabel:'FRONT-END'},
  {icon:'🌊', name:'Tailwind', cat:'front-end', catLabel:'FRONT-END'},
  {icon:'💙', name:'Flutter', cat:'mobile', catLabel:'MOBILE'},
  {icon:'🎯', name:'Dart', cat:'mobile', catLabel:'MOBILE'},
  {icon:'🐱', name:'Git', cat:'tools', catLabel:'TOOLS'},
  {icon:'📮', name:'Postman', cat:'tools', catLabel:'TOOLS'},
  {icon:'💻', name:'VS Code', cat:'tools', catLabel:'TOOLS'},
];
const grid = document.getElementById('skills-grid');
skills.forEach((s,i) => {
  const el = document.createElement('div');
  el.className = 'skill-card';
  el.dataset.cat = s.cat;
  el.style.transitionDelay = (i * 0.04) + 's';
  el.innerHTML = `<div class="skill-icon">${s.icon}</div><div><div class="skill-name">${s.name}</div><div class="skill-cat">${s.catLabel}</div></div>`;
  grid.appendChild(el);
});
document.querySelectorAll('.filter-pill').forEach(pill => {
  pill.addEventListener('click', function() {
    document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
    this.classList.add('active');
    const filter = this.dataset.filter;
    document.querySelectorAll('.skill-card').forEach(card => {
      if (filter === 'all' || card.dataset.cat === filter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ===== GITHUB HEATMAP =====
const months = ['Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan'];
const monthsEl = document.getElementById('heatmap-months');
months.forEach(m => {
  const span = document.createElement('span');
  span.className = 'heatmap-month';
  span.textContent = m;
  monthsEl.appendChild(span);
});
const heatmapEl = document.getElementById('heatmap-grid');
const levels = [0,1,2,3,4];
// Simulate realistic contribution data
const contributions = Array.from({length:364}, (_, i) => {
  const r = Math.random();
  if (r < 0.55) return 0;
  if (r < 0.70) return 1;
  if (r < 0.82) return 2;
  if (r < 0.92) return 3;
  return 4;
});
contributions.forEach(level => {
  const cell = document.createElement('div');
  cell.className = 'heatmap-cell' + (level > 0 ? ' l'+level : '');
  heatmapEl.appendChild(cell);
});

// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => observer.observe(el));

// ===== COUNTER ANIMATION =====
const counters = document.querySelectorAll('.stat-num');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.counted) {
      entry.target.dataset.counted = '1';
      const target = parseInt(entry.target.dataset.target);
      const suffix = entry.target.dataset.suffix || '+';
      let current = 0;
      const step = Math.ceil(target / 40);
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        entry.target.textContent = current + suffix;
        if (current >= target) clearInterval(timer);
      }, 35);
    }
  });
}, { threshold: 0.5 });
counters.forEach(c => counterObserver.observe(c));

// ===== CONTACT FORM =====
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  let valid = true;
  const fields = [
    { id:'fname', errId:'fname-err', msg:'Name is required' },
    { id:'femail', errId:'femail-err', msg:'Valid email required', isEmail:true },
    { id:'fsubject', errId:'fsubject-err', msg:'Subject is required' },
    { id:'fmessage', errId:'fmessage-err', msg:'Message is required' },
  ];
  fields.forEach(f => {
    const el = document.getElementById(f.id);
    const errEl = document.getElementById(f.errId);
    const val = el.value.trim();
    if (!val || (f.isEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val))) {
      el.classList.add('error');
      errEl.textContent = f.msg;
      valid = false;
    } else {
      el.classList.remove('error');
      errEl.textContent = '';
    }
  });
  if (!valid) return;
  const btn = document.getElementById('sendBtn');
  btn.classList.add('loading');
  btn.innerHTML = '<div class="loader"></div> Sending...';
  setTimeout(() => {
    document.getElementById('contactForm').style.display = 'none';
    document.getElementById('formSuccess').style.display = 'block';
  }, 1800);
});

// ===== NAVBAR SCROLL BEHAVIOR =====
const navbar = document.getElementById('navbar');
let lastScrollY = 0;
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  if (scrollY > 60) {
    navbar.classList.add('nav-scrolled');
  } else {
    navbar.classList.remove('nav-scrolled');
  }
  lastScrollY = scrollY;
});

// ===== ACTIVE NAV HIGHLIGHTING =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function highlightNav() {
  const scrollPos = window.scrollY + 200;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    if (scrollPos >= top && scrollPos < top + height) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + id) {
          link.classList.add('active');
        }
      });
    }
  });
}
window.addEventListener('scroll', highlightNav);
highlightNav();

// ===== MAGNETIC BUTTON EFFECT =====
document.querySelectorAll('.btn-primary, .btn-outline, .btn-send, .btn-github').forEach(btn => {
  btn.addEventListener('mousemove', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    this.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  });
  btn.addEventListener('mouseleave', function() {
    this.style.transform = '';
  });
});

// ===== PARALLAX TILT ON PROJECT CARDS =====
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', function(e) {
    const rect = this.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    this.style.transform = `translateY(-6px) perspective(600px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
  });
  card.addEventListener('mouseleave', function() {
    this.style.transform = '';
  });
});

// ===== BACK TO TOP BUTTON =====
const backToTopBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
});
backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});