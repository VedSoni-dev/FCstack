// ============================================================
// YCstack — Terminal Demo + Interactions
// ============================================================

// Copy install command
function copyInstall(el) {
  const code = el.querySelector('code').textContent;
  navigator.clipboard.writeText(code).then(() => {
    el.classList.add('copied');
    setTimeout(() => el.classList.remove('copied'), 2000);
  });
}

// ============================================================
// TERMINAL DEMO — Typewriter + Output
// ============================================================

const demos = [
  {
    cmd: '/yc review',
    lines: [
      { text: '', delay: 200 },
      { text: '<span class="out-label">STARTUP REVIEW</span> — SaaSmetrics', delay: 0 },
      { text: '', delay: 100 },
      { text: '<span class="out-dim">Reading codebase... 14 routes, 6 models, Stripe integrated</span>', delay: 400 },
      { text: '', delay: 200 },
      { text: 'Idea         <span class="out-score">7/10</span>  Real problem, clear insight', delay: 0 },
      { text: 'Market       <span class="out-score">6/10</span>  $4B TAM but crowded space', delay: 80 },
      { text: 'Product      <span class="out-score">8/10</span>  Solid MVP, clean architecture', delay: 80 },
      { text: 'Business     <span class="out-score">5/10</span>  Pricing too low — charge 3x', delay: 80 },
      { text: 'Moat         <span class="out-score">4/10</span>  No defensibility yet', delay: 80 },
      { text: 'Growth       <span class="out-score">3/10</span>  No analytics. No acquisition loop.', delay: 80 },
      { text: 'Team         <span class="out-score">7/10</span>  Strong technical, need BD', delay: 80 },
      { text: '', delay: 200 },
      { text: '<span class="out-yellow">Verdict: MODERATE</span> — strong build, weak distribution', delay: 0 },
      { text: '', delay: 100 },
      { text: '<span class="out-label">Do this TODAY:</span> Email 10 potential customers.', delay: 0 },
      { text: '<span class="out-dim">PG\'s "Do Things That Don\'t Scale" (2013)</span>', delay: 0 },
    ]
  },
  {
    cmd: '/yc roast',
    lines: [
      { text: '', delay: 200 },
      { text: '<span class="out-label">ROAST</span>', delay: 0 },
      { text: '', delay: 100 },
      { text: 'What you\'re actually building:', delay: 0 },
      { text: 'A dashboard for metrics that nobody is tracking', delay: 0 },
      { text: 'because you have <span class="out-yellow">12 users</span> and <span class="out-yellow">43 features</span>.', delay: 0 },
      { text: '', delay: 200 },
      { text: 'The hard truth:', delay: 0 },
      { text: 'Your git history shows 6 landing page rewrites', delay: 0 },
      { text: 'and 0 user interviews. You\'re building because', delay: 0 },
      { text: 'building feels like progress. It\'s not.', delay: 0 },
      { text: '', delay: 200 },
      { text: '<span class="out-label">What PG would say:</span>', delay: 0 },
      { text: '<span class="out-dim">"The most common mistake is to solve a problem</span>', delay: 0 },
      { text: '<span class="out-dim"> no one has." — paulgraham.com/startupideas.html</span>', delay: 0 },
      { text: '', delay: 100 },
      { text: '<span class="out-label">Today:</span> Close your laptop. Call 3 customers.', delay: 0 },
    ]
  },
  {
    cmd: '/yc interview',
    lines: [
      { text: '', delay: 200 },
      { text: '<span class="out-label">YC MOCK INTERVIEW</span>', delay: 0 },
      { text: '<span class="out-dim">Michael and Dalton walk in. 10 minutes.</span>', delay: 300 },
      { text: '', delay: 200 },
      { text: '<span class="out-label">Michael:</span> "What does SaaSmetrics do?"', delay: 0 },
      { text: '', delay: 400 },
      { text: '<span class="out-dim">  A) "We help SaaS companies track metrics..."</span>', delay: 0 },
      { text: '<span class="out-green">  B) "We show founders if they\'re default alive"</span>', delay: 0 },
      { text: '<span class="out-dim">  C) "It\'s an AI-powered analytics platform..."</span>', delay: 0 },
      { text: '', delay: 500 },
      { text: '<span class="out-label">Michael:</span> "OK, option B is interesting.', delay: 0 },
      { text: '  How many founders are using it right now?"', delay: 0 },
      { text: '', delay: 200 },
      { text: '<span class="out-yellow">Dalton:</span> "And how much are they paying?"', delay: 0 },
    ]
  },
  {
    cmd: '/yc speed-run',
    lines: [
      { text: '', delay: 200 },
      { text: '<span class="out-label">YC READINESS REPORT</span>', delay: 0 },
      { text: '', delay: 100 },
      { text: 'Idea Clarity        <span class="out-score">7/10</span>', delay: 60 },
      { text: 'Market Size         <span class="out-score">6/10</span>', delay: 60 },
      { text: 'Product Maturity    <span class="out-score">8/10</span>', delay: 60 },
      { text: 'Traction            <span class="out-score">3/10</span>  <span class="out-yellow">WEAK</span>', delay: 60 },
      { text: 'Growth Rate         <span class="out-score">2/10</span>  <span class="out-yellow">WEAK</span>', delay: 60 },
      { text: 'Moat                <span class="out-score">4/10</span>', delay: 60 },
      { text: 'Team                <span class="out-score">7/10</span>', delay: 60 },
      { text: 'Metrics             <span class="out-score">2/10</span>  <span class="out-yellow">WEAK</span>', delay: 60 },
      { text: 'Technical           <span class="out-score">8/10</span>', delay: 60 },
      { text: '', delay: 200 },
      { text: '<span class="out-yellow">READINESS: 52/100 — NOT READY</span>', delay: 0 },
      { text: '', delay: 100 },
      { text: '<span class="out-label">Priority:</span> Get 50 users before applying.', delay: 0 },
      { text: '<span class="out-dim">Run /yc → "growth" for acquisition tactics.</span>', delay: 0 },
    ]
  }
];

let currentDemo = 0;
const typewriterEl = document.getElementById('typewriter');
const outputEl = document.getElementById('term-output');

function typeCommand(cmd) {
  return new Promise(resolve => {
    let i = 0;
    typewriterEl.textContent = '';
    function type() {
      if (i < cmd.length) {
        typewriterEl.textContent += cmd[i];
        i++;
        setTimeout(type, 40 + Math.random() * 40);
      } else {
        setTimeout(resolve, 300);
      }
    }
    type();
  });
}

function showLines(lines) {
  return new Promise(resolve => {
    outputEl.innerHTML = '';
    outputEl.classList.add('visible');
    let html = '';
    let i = 0;

    function addLine() {
      if (i < lines.length) {
        const line = lines[i];
        html += '<div>' + (line.text || '&nbsp;') + '</div>';
        outputEl.innerHTML = html;
        i++;
        setTimeout(addLine, line.delay || 50);
      } else {
        resolve();
      }
    }
    addLine();
  });
}

async function runDemoLoop() {
  while (true) {
    const demo = demos[currentDemo];
    outputEl.classList.remove('visible');
    outputEl.innerHTML = '';

    await typeCommand(demo.cmd);
    await showLines(demo.lines);
    await sleep(5000);

    // Fade out
    outputEl.classList.remove('visible');
    await sleep(400);

    currentDemo = (currentDemo + 1) % demos.length;
  }
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

// Start demo
setTimeout(runDemoLoop, 600);

// ============================================================
// SCROLL REVEAL
// ============================================================

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ============================================================
// SMOOTH SCROLL
// ============================================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
