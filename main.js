/**
 * Web Component: Lotto Ball
 */
class LottoBall extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['number'];
  }

  attributeChangedCallback() {
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  getBallClass(n) {
    if (n <= 10) return 'ball-1';
    if (n <= 20) return 'ball-11';
    if (n <= 30) return 'ball-21';
    if (n <= 40) return 'ball-31';
    return 'ball-41';
  }

  render() {
    const number = this.getAttribute('number') || '0';
    const n = parseInt(number);
    const ballClass = this.getBallClass(n);

    this.shadowRoot.innerHTML = `
      <style>
        .lotto-ball {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 0.95rem;
          box-shadow: inset -2px -2px 4px rgba(0,0,0,0.25);
          text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
          user-select: none;
        }
        .ball-1 { background: radial-gradient(circle at 30% 30%, #facc15, #ca8a04); }
        .ball-11 { background: radial-gradient(circle at 30% 30%, #60a5fa, #2563eb); }
        .ball-21 { background: radial-gradient(circle at 30% 30%, #f87171, #dc2626); }
        .ball-31 { background: radial-gradient(circle at 30% 30%, #94a3b8, #475569); }
        .ball-41 { background: radial-gradient(circle at 30% 30%, #4ade80, #16a34a); }
      </style>
      <div class="lotto-ball ${ballClass}">${number}</div>
    `;
  }
}
customElements.define('lotto-ball', LottoBall);

/**
 * App Logic & Initialization
 */
const winFrequency = { 1: 28, 2: 24, 3: 31, 4: 22, 5: 25, 6: 29, 7: 33, 8: 27, 9: 21, 10: 26, 11: 30, 12: 34, 13: 29, 14: 32, 15: 35, 16: 28, 17: 29, 18: 24, 19: 30, 20: 27, 21: 26, 22: 25, 23: 31, 24: 29, 25: 32, 26: 28, 27: 34, 28: 30, 29: 27, 30: 29, 31: 33, 32: 26, 33: 35, 34: 28, 35: 31, 36: 27, 37: 29, 38: 32, 39: 25, 40: 30, 41: 28, 42: 29, 43: 24, 44: 26, 45: 31 };

function getWeightedNumbers() {
  const pool = [];
  for (let num = 1; num <= 45; num++) {
    const weight = winFrequency[num] || 25;
    for (let i = 0; i < weight; i++) pool.push(num);
  }
  const selected = new Set();
  while (selected.size < 7) {
    selected.add(pool[Math.floor(Math.random() * pool.length)]);
  }
  const resultArr = Array.from(selected);
  const main = resultArr.slice(0, 6).sort((a, b) => a - b);
  const bonus = resultArr[6];
  
  const scoreSum = [...main, bonus].reduce((sum, n) => sum + winFrequency[n], 0);
  const maxPossible = 35 * 7;
  const minPossible = 21 * 7;
  let rawPercent = ((scoreSum - minPossible) / (maxPossible - minPossible)) * 100;
  const finalPercent = (85 + (rawPercent * 0.14)).toFixed(1);
  
  return { main, bonus, finalPercent };
}

window.startAnalysis = async function() {
  const loader = document.getElementById('loader');
  const btn = document.getElementById('generate-btn');
  const resultContainer = document.getElementById('result-container');

  loader.classList.remove('hidden');
  btn.disabled = true;

  // Simulate analysis time
  await new Promise(resolve => setTimeout(resolve, 2000));

  const { main, bonus, finalPercent } = getWeightedNumbers();

  resultContainer.innerHTML = `
    <div class="space-y-6" style="animation: fadeIn 0.5s ease-out">
      <div class="text-center">
        <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">Recommended Set</span>
        <div class="flex justify-center gap-2 mt-3">
          ${main.map(n => `<lotto-ball number="${n}"></lotto-ball>`).join('')}
          <div class="flex items-center mx-1 text-slate-300">+</div>
          <lotto-ball number="${bonus}"></lotto-ball>
        </div>
      </div>
      
      <div class="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 border border-slate-100 dark:border-slate-700">
        <div class="flex justify-between items-center">
          <div>
            <p class="text-[10px] font-bold text-slate-400 uppercase">AI Confidence Score</p>
            <p class="text-2xl font-black text-blue-600 dark:text-blue-400">${finalPercent}%</p>
          </div>
          <div class="text-right">
            <p class="text-[10px] font-bold text-slate-400 uppercase">Analysis ID</p>
            <p class="text-xs font-mono text-slate-500">#${Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
          </div>
        </div>
      </div>
    </div>
  `;

  loader.classList.add('hidden');
  btn.disabled = false;
};

window.toggleTheme = function() {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
};

// Initialize theme
if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.body.classList.add('dark');
}

// Contact form handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    const originalText = btn.innerText;
    
    btn.disabled = true;
    btn.innerText = 'Sending...';

    try {
      const response = await fetch(e.target.action, {
        method: 'POST',
        body: new FormData(e.target),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        document.getElementById('form-status').classList.remove('hidden');
        contactForm.classList.add('hidden');
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (err) {
      alert('An error occurred. Please try again.');
    } finally {
      btn.disabled = false;
      btn.innerText = originalText;
    }
  });
}

window.resetForm = function() {
  document.getElementById('form-status').classList.add('hidden');
  const form = document.getElementById('contact-form');
  form.classList.remove('hidden');
  form.reset();
};
