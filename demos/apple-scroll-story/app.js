(function () {
  'use strict';

  // ─── Injected CSS ───────────────────────────────────────────────────────────
  function injectStyles() {
    var css = document.createElement('style');
    css.textContent = [
      ':root {',
      '  --bg: #f5f5f7; --bg-alt: #e8e8ed; --fg: #1d1d1f; --fg-secondary: #86868b;',
      '  --accent: #0071e3; --accent-hover: #0077ed; --glow: rgba(0,113,227,0.15);',
      '  --nav-bg: rgba(255,255,255,0.72); --nav-border: rgba(0,0,0,0.08);',
      '  --card-bg: rgba(255,255,255,0.6); --card-border: rgba(0,0,0,0.06);',
      '  --transition-speed: 0.6s;',
      '}',
      '[data-theme="dark"] {',
      '  --bg: #000; --bg-alt: #1c1c1e; --fg: #f5f5f7; --fg-secondary: #98989d;',
      '  --accent: #2997ff; --accent-hover: #40a9ff; --glow: rgba(41,151,255,0.12);',
      '  --nav-bg: rgba(0,0,0,0.72); --nav-border: rgba(255,255,255,0.08);',
      '  --card-bg: rgba(28,28,30,0.6); --card-border: rgba(255,255,255,0.06);',
      '}',
      '*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }',
      'html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; }',
      'body {',
      '  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", sans-serif;',
      '  background: var(--bg); color: var(--fg); line-height: 1.6;',
      '  transition: background var(--transition-speed) cubic-bezier(.25,.1,.25,1),',
      '              color var(--transition-speed) cubic-bezier(.25,.1,.25,1);',
      '  overflow-x: hidden;',
      '}',
      '::selection { background: var(--accent); color: #fff; }',
      '',
      '/* ── Chapter sections ── */',
      'section {',
      '  min-height: 100vh; display: flex; align-items: center; justify-content: center;',
      '  padding: 120px 24px; position: relative; overflow: hidden;',
      '}',
      '.chapter-inner {',
      '  max-width: 780px; width: 100%; margin: 0 auto;',
      '  position: relative; z-index: 2;',
      '}',
      '.chapter-number {',
      '  font-size: 14px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase;',
      '  color: var(--accent); margin-bottom: 20px; opacity: 0;',
      '  transform: translateY(12px); transition: opacity 0.8s ease, transform 0.8s ease;',
      '}',
      '.chapter-number.revealed { opacity: 1; transform: translateY(0); }',
      '.chapter-title {',
      '  font-size: clamp(36px,6vw,64px); font-weight: 700; line-height: 1.1;',
      '  letter-spacing: -0.02em; margin-bottom: 32px; opacity: 0;',
      '  transform: translateY(24px); transition: opacity 0.8s ease 0.15s, transform 0.8s ease 0.15s;',
      '}',
      '.chapter-title.revealed { opacity: 1; transform: translateY(0); }',
      '.chapter-text {',
      '  font-size: clamp(17px,2vw,21px); line-height: 1.7; color: var(--fg-secondary);',
      '  margin-bottom: 20px; opacity: 0;',
      '  transform: translateY(16px); transition: opacity 0.8s ease, transform 0.8s ease;',
      '}',
      '.chapter-text:last-child { margin-bottom: 0; }',
      '.chapter-text.revealed { opacity: 1; transform: translateY(0); }',
      '.chapter-text:nth-child(2) { transition-delay: 0.1s; }',
      '.chapter-text:nth-child(3) { transition-delay: 0.2s; }',
      '.chapter-text:nth-child(4) { transition-delay: 0.3s; }',
      '.chapter-text:nth-child(5) { transition-delay: 0.4s; }',
      '',
      '/* ── Parallax decorative elements ── */',
      '.parallax-bg {',
      '  position: absolute; top: 0; left: 0; right: 0; bottom: 0;',
      '  pointer-events: none; overflow: hidden; z-index: 0;',
      '}',
      '.parallax-circle {',
      '  position: absolute; border-radius: 50%;',
      '  background: var(--glow); will-change: transform;',
      '}',
      '',
      '/* ── Theme toggle ── */',
      '#theme-toggle {',
      '  position: fixed; top: 20px; right: 20px; z-index: 1000;',
      '  width: 44px; height: 44px; border-radius: 50%; border: none;',
      '  background: var(--nav-bg); backdrop-filter: blur(20px);',
      '  -webkit-backdrop-filter: blur(20px);',
      '  cursor: pointer; transition: all 0.3s ease;',
      '  box-shadow: 0 1px 3px rgba(0,0,0,0.08);',
      '  display: flex; align-items: center; justify-content: center;',
      '}',
      '#theme-toggle:hover { transform: scale(1.08); box-shadow: 0 2px 8px rgba(0,0,0,0.12); }',
      '#theme-toggle svg { width: 20px; height: 20px; fill: none; stroke: var(--fg); stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; }',
      '',
      '/* ── Chapter nav ── */',
      '#chapter-nav {',
      '  position: fixed; left: 24px; top: 50%; transform: translateY(-50%);',
      '  z-index: 1000; display: flex; flex-direction: column; gap: 12px;',
      '}',
      '.nav-dot {',
      '  width: 8px; height: 8px; border-radius: 50%; border: none;',
      '  background: var(--fg-secondary); opacity: 0.3; cursor: pointer;',
      '  transition: all 0.3s ease; padding: 0;',
      '}',
      '.nav-dot:hover { opacity: 0.6; transform: scale(1.3); }',
      '.nav-dot.active { opacity: 1; background: var(--accent); transform: scale(1.3); }',
      '.nav-label {',
      '  position: absolute; left: 20px; top: 50%; transform: translateY(-50%);',
      '  font-size: 12px; font-weight: 500; white-space: nowrap;',
      '  color: var(--fg-secondary); opacity: 0; pointer-events: none;',
      '  transition: opacity 0.3s ease;',
      '}',
      '.nav-dot-wrapper { position: relative; display: flex; align-items: center; }',
      '.nav-dot-wrapper:hover .nav-label { opacity: 1; }',
      '',
      '/* ── Mouse follower ── */',
      '#cursor-glow {',
      '  position: fixed; pointer-events: none; z-index: 9999;',
      '  width: 400px; height: 400px; border-radius: 50%;',
      '  background: radial-gradient(circle, var(--glow) 0%, transparent 70%);',
      '  transform: translate(-50%,-50%);',
      '  opacity: 0; transition: opacity 0.8s ease; will-change: transform;',
      '}',
      '',
      '/* ── Hero chapter ── */',
      '#chapter-1 { min-height: 100vh; padding-top: 0; padding-bottom: 0; }',
      '#chapter-1 .chapter-inner { text-align: center; }',
      '#chapter-1 .chapter-number { display: none; }',
      '#chapter-1 .chapter-title { font-size: clamp(48px,8vw,80px); margin-bottom: 24px; }',
      '#chapter-1 .chapter-text { font-size: clamp(20px,2.5vw,28px); max-width: 640px; margin: 0 auto 16px; }',
      '',
      '/* ── Scroll indicator ── */',
      '.scroll-indicator {',
      '  position: absolute; bottom: 40px; left: 50%; transform: translateX(-50%);',
      '  display: flex; flex-direction: column; align-items: center; gap: 8px;',
      '  color: var(--fg-secondary); font-size: 12px; letter-spacing: 0.08em;',
      '  animation: scroll-bounce 2s ease-in-out infinite;',
      '}',
      '.scroll-indicator span { display: block; }',
      '.scroll-indicator .chevron {',
      '  width: 20px; height: 20px; border-right: 2px solid var(--fg-secondary);',
      '  border-bottom: 2px solid var(--fg-secondary); transform: rotate(45deg);',
      '  animation: scroll-chevron 2s ease-in-out infinite;',
      '}',
      '@keyframes scroll-bounce { 0%,100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(8px); } }',
      '@keyframes scroll-chevron { 0%,100% { opacity: 0.3; } 50% { opacity: 1; } }',
      '',
      '/* ── Separator ── */',
      '.chapter-separator {',
      '  width: 60px; height: 1px; background: var(--fg-secondary); opacity: 0.2;',
      '  margin: 0 auto 48px;',
      '}',
      '',
      '/* ── Responsive ── */',
      '@media (max-width: 768px) {',
      '  section { padding: 80px 20px; }',
      '  #chapter-nav { left: 12px; gap: 10px; }',
      '  .nav-dot { width: 6px; height: 6px; }',
      '  .nav-label { display: none; }',
      '  #cursor-glow { display: none; }',
      '  #theme-toggle { top: 12px; right: 12px; width: 40px; height: 40px; }',
      '}',
      '@media (max-width: 480px) {',
      '  section { padding: 60px 16px; }',
      '  #chapter-nav { left: 8px; gap: 8px; }',
      '  .nav-dot { width: 5px; height: 5px; }',
      '}',
      '',
      '/* ── Reduced motion ── */',
      '@media (prefers-reduced-motion: reduce) {',
      '  *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }',
      '  .chapter-number, .chapter-title, .chapter-text { opacity: 1 !important; transform: none !important; }',
      '  .parallax-circle { display: none; }',
      '}'
    ].join('\n');
    document.head.appendChild(css);
  }

  // ─── Chapter Content ────────────────────────────────────────────────────────
  var chapters = [{
    id: 'chapter-1',
    number: '',
    title: 'Ideas that change everything.',
    paragraphs: [
      'Every once in a while, a single thought arrives with the force of a revelation. It rearranges what we know, redraws the boundaries of possibility, and sets in motion a chain of creation that touches millions of lives. This is the story of such ideas — and the relentless pursuit that brings them to life.',
      'We believe in the power of human ingenuity. In the quiet moments of insight that reshape industries. In the audacity to imagine a world that doesn\'t yet exist, and the discipline to build it, piece by painstaking piece.',
      'This is not just about technology. It is about the people behind it, the craft behind it, and the profound belief that the best way to predict the future is to invent it.'
    ]
  }, {
    id: 'chapter-2',
    number: '01',
    title: 'A vision takes shape.',
    paragraphs: [
      'Every great creation begins with a spark — a moment of clarity where the fog of complexity parts to reveal a simple, powerful truth. It is rarely born fully formed. Instead, it emerges through countless iterations, each one refining the original thought into something sharper, more elegant, more true.',
      'The first sketches are rough. They capture the essence but not the detail. Yet within those crude lines lies the seed of something extraordinary — a product, an experience, a revolution waiting to unfold.',
      'Our process begins not with what is possible, but with what should be. We ask the fundamental questions: What does the user truly need? What would delight them? What would make their life not just easier, but better in ways they never imagined?',
      'The answers do not come easily. They demand empathy, foresight, and the courage to discard our own assumptions. But when the vision finally takes shape, it is unmistakable — a beacon that guides every decision that follows.'
    ]
  }, {
    id: 'chapter-3',
    number: '02',
    title: 'The architecture of ideas.',
    paragraphs: [
      'Behind every seamless experience lies an invisible architecture of astonishing complexity. We design systems that anticipate, adapt, and respond — not because they are programmed to, but because they are designed to understand.',
      'Our engineering philosophy is simple: the best technology is the technology you don\'t notice. It dissolves into the background, becoming an extension of your intent rather than an obstacle to it. This requires an almost obsessive attention to the layers beneath the surface.',
      'Hardware and software are not separate disciplines — they are two halves of a single conversation. Every chip, every line of code, every pixel is optimized to work in perfect harmony. The result is not just performance, but a feeling of effortless grace.',
      'We build for the long term. Each architectural decision is made with the understanding that it will serve as foundation for innovations yet to come. Scalability is not an afterthought; it is the first principle.'
    ]
  }, {
    id: 'chapter-4',
    number: '03',
    title: 'Crafting the unseen.',
    paragraphs: [
      'True craftsmanship reveals itself in the details most will never see. The curve of a corner, the precise resistance of a button, the subtlety of a transition measured in milliseconds — these are the signatures of a product made with care.',
      'Our design studio operates on the philosophy that everything matters. Every material is evaluated not just for its function, but for its feel. Every surface is considered for how it will age, how it will reflect light, how it will feel beneath a fingertip.',
      'We prototype relentlessly. A single component may go through dozens of iterations before it earns its place. Each version teaches us something new, bringing us fractionally closer to an ideal we may never fully reach — but must always pursue.',
      'This pursuit extends to the digital realm. Every animation is choreographed. Every interaction is designed with intent. The interface should feel alive, responsive, almost sentient in its ability to anticipate your needs.'
    ]
  }, {
    id: 'chapter-5',
    number: '04',
    title: 'The pursuit of perfection.',
    paragraphs: [
      'Perfection is not a destination — it is a direction. It is the discipline of refusing to accept good enough, of looking at a finished product and seeing not what it is, but what it could become.',
      'Our quality standards are defined by what you will never encounter: the crashes that were prevented, the edge cases that were anticipated, the failures that were caught before they could reach you. Excellence is invisible, and that is exactly how it should be.',
      'We test in ways that simulate years of use in weeks. We push our products beyond their intended limits, then push further. We chase the outliers, the statistical anomalies, the scenarios so unlikely that most would deem them not worth the effort.',
      'Because we know: the difference between a good product and a great one is measured in the thousand small decisions made when no one is watching.'
    ]
  }, {
    id: 'chapter-6',
    number: '05',
    title: 'Where art meets science.',
    paragraphs: [
      'The most profound innovations occur at the intersection of disciplines — where the precision of engineering meets the intuition of art, where data informs design and design elevates data.',
      'Our teams are composed of people who refuse to be categorized. Engineers who paint. Designers who code. Musicians who architect systems. This cross-pollination of perspectives creates solutions that no single discipline could conceive alone.',
      'We believe that beauty is a functional property. An object that is beautiful is easier to use, more likely to be cherished, and less likely to be discarded. Aesthetics and utility are not opposing forces — they are partners in creating something meaningful.',
      'The result is products that resonate on an emotional level. They are not just tools; they are companions in the creative process, extensions of human potential.'
    ]
  }, {
    id: 'chapter-7',
    number: '06',
    title: 'The silicon canvas.',
    paragraphs: [
      'At the heart of every digital experience lies silicon — the canvas upon which our ideas are painted. But we don\'t simply use chips; we imagine them. Our custom silicon is designed from the ground up to enable experiences that off-the-shelf components could never deliver.',
      'This integration of hardware and software at the deepest level allows us to do things others cannot. Neural engines that process trillions of operations per second. Graphics architectures that render worlds indistinguishable from reality. Power efficiency that pushes the boundaries of what portable devices can achieve.',
      'Each generation of silicon is a declaration of intent. It tells the world what we believe is possible. And with each iteration, we expand the definition of what a personal device can be.',
      'The architecture is optimized not for benchmarks, but for real-world use. For the photographer editing on a plane. For the student learning in a coffee shop. For the creator pushing the limits of their craft.'
    ]
  }, {
    id: 'chapter-8',
    number: '07',
    title: 'Designing for the senses.',
    paragraphs: [
      'We inhabit a world of sight and sound, touch and motion. A truly great product engages not just one sense, but many — creating a symphony of feedback that feels natural, intuitive, almost instinctive.',
      'Our approach to sensory design begins with understanding human perception. How does the eye track motion? At what latency does a touch feel instant? What frequency of haptic feedback feels most natural? These questions drive our engineering.',
      'The display is a window, not just a screen. We engineer each panel to deliver color accuracy that rivals professional reference monitors, refresh rates that eliminate perceptual lag, and brightness that adapts seamlessly to any environment.',
      'Sound is designed to be spatial and immersive. Our audio engineers tune every driver to deliver a soundstage that places you inside the experience. From the deepest bass to the most delicate treble, nothing is left to chance.'
    ]
  }, {
    id: 'chapter-9',
    number: '08',
    title: 'The ecosystem of possibility.',
    paragraphs: [
      'A single device is a tool. A connected ecosystem is a revolution. We design not just products, but relationships between products — a seamless web of devices that work together as one.',
      'Continuity is our north star. Start a task on one device and finish it on another. Answer a call from any device. Share files with a gesture. The boundaries between devices should dissolve, leaving only the flow of your work and creativity.',
      'This ecosystem extends beyond hardware. Our services, software, and developer platforms are designed to interoperate with a coherence that third-party solutions cannot match. It is a walled garden not to imprison, but to cultivate — a protected space where quality flourishes.',
      'We open this ecosystem to developers who share our values. Millions of creators build on our platforms, reaching users around the globe. Their success is our success, and their creativity pushes us to build better foundations.'
    ]
  }, {
    id: 'chapter-10',
    number: '09',
    title: 'Privacy by design.',
    paragraphs: [
      'Privacy is not a feature — it is a fundamental human right. We believe that technology should empower without compromising, that intelligence should not come at the cost of autonomy.',
      'Our approach to privacy is rooted in the principle of data minimization. We collect only what is necessary to deliver the experience, and we process as much as possible directly on your device. Your data belongs to you, not to us.',
      'On-device intelligence means that powerful features like facial recognition, language understanding, and health analysis happen without ever sending your information to the cloud. We have engineered silicon specifically to enable this local processing.',
      'Transparency is built into every interaction. When data must leave your device, we tell you why. When permissions are requested, we explain their purpose. We believe that informed users make the best decisions about their digital lives.'
    ]
  }, {
    id: 'chapter-11',
    number: '10',
    title: 'Sustainability at scale.',
    paragraphs: [
      'The most important product we build is the future. Our commitment to sustainability is not a marketing initiative — it is a fundamental rethinking of how we design, manufacture, and distribute our products.',
      'We have set ambitious goals: carbon neutrality across our entire supply chain, products made with 100% recycled and renewable materials, and a circular economy where nothing goes to waste. These are not aspirations; they are commitments with deadlines.',
      'Every material is evaluated through the lens of environmental impact. We have eliminated plastics from our packaging, pioneered recycling technologies for rare earth elements, and invested in renewable energy that powers our operations and our supply chain.',
      'But sustainability is also about durability. A product that lasts years is more sustainable than one designed for obsolescence. We build for longevity — with software updates that span generations, and hardware that improves with age.'
    ]
  }, {
    id: 'chapter-12',
    number: '11',
    title: 'The next frontier.',
    paragraphs: [
      'We stand at the threshold of a new era. Artificial intelligence is no longer science fiction — it is the most profound technology of our time, and we are just beginning to understand its potential.',
      'Our approach to AI is distinctly human-centered. We build intelligence that augments rather than replaces, that empowers rather than undermines. Machine learning models that run on your device, understanding your context while protecting your privacy.',
      'Augmented reality will transform how we interact with information. Not by replacing the real world, but by enriching it — overlaying context, connection, and creativity onto the spaces we inhabit. This is not a product category; it is a new medium.',
      'The future is not something that happens to us. It is something we build, together, with intention and purpose. And we are just getting started.'
    ]
  }, {
    id: 'chapter-13',
    number: '12',
    title: 'Human-centered future.',
    paragraphs: [
      'As technology grows more powerful, our commitment to accessibility becomes more urgent. We believe that the best innovations are those that include everyone — that remove barriers rather than creating them.',
      'Every product we ship includes assistive technologies that are not afterthoughts but integral features. Voice control for those who cannot touch. Screen readers for those who cannot see. Switch control for those who cannot gesture. These features make our products better for everyone.',
      'We work closely with the disability community to understand real needs and develop solutions that truly make a difference. Accessibility is not a checklist; it is a mindset that must infuse every stage of design and development.',
      'Health is another frontier where technology can transform lives. From heart rate monitoring to blood oxygen sensing, from fall detection to hearing health, we are building tools that empower people to take charge of their wellbeing.'
    ]
  }, {
    id: 'chapter-14',
    number: '13',
    title: 'Beyond boundaries.',
    paragraphs: [
      'The most exciting innovations often come from looking beyond our own industry, beyond our own assumptions, beyond the boundaries we have accepted as fixed. True breakthrough thinking requires the courage to question everything.',
      'We invest in fundamental research that may not yield products for years or even decades. Our teams explore quantum computing, advanced materials, machine learning architectures, and medical technologies that could redefine human potential.',
      'We partner with leading universities and research institutions around the world. Science progresses through collaboration, and some of our most important discoveries have come from the free exchange of ideas across institutional boundaries.',
      'Our patent portfolio reflects this commitment to innovation. Thousands of inventions, each representing a problem solved, a possibility explored, a future imagined. But patents are not the goal — they are milestones on a much longer journey.'
    ]
  }, {
    id: 'chapter-15',
    number: '',
    title: 'A continuing journey.',
    paragraphs: [
      'This story has no ending. Every product we create is a chapter in a narrative that began long before us and will continue long after. We are temporary stewards of a legacy built by dreamers and builders, artists and engineers, risk-takers and perfectionists.',
      'Our mission remains unchanged: to bring the best user experience to people around the world through innovative hardware, software, and services. It is a mission that inspires everything we do, from the smallest component to the grandest vision.',
      'To those who use our products, who build on our platforms, who share our belief that technology can make the world better: thank you. You are the reason we push further, reach higher, and refuse to settle for anything less than extraordinary.',
      'The next chapter is being written. And we invite you to be part of it.',
      'Stay curious. Stay bold. Keep creating.'
    ]
  }];

  // ─── State ──────────────────────────────────────────────────────────────────
  var currentTheme = 'light';
  var sections = [];
  var navDots = [];
  var observer = null;
  var isReducedMotion = false;
  var ticking = false;
  var mouseX = 0;
  var mouseY = 0;

  // ─── Theme System ───────────────────────────────────────────────────────────
  function getPreferredTheme() {
    var stored = localStorage.getItem('theme');
    if (stored === 'dark' || stored === 'light') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function setTheme(theme) {
    currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateThemeIcon(theme);
  }

  function toggleTheme() {
    setTheme(currentTheme === 'light' ? 'dark' : 'light');
  }

  function updateThemeIcon(theme) {
    var btn = document.getElementById('theme-toggle');
    if (!btn) return;
    btn.innerHTML = theme === 'light'
      ? '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      : '<svg viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }

  // ─── Render Chapters ────────────────────────────────────────────────────────
  function renderChapters() {
    chapters.forEach(function (ch) {
      var section = document.getElementById(ch.id);
      if (!section) return;
      var inner = document.createElement('div');
      inner.className = 'chapter-inner';

      if (ch.number) {
        var num = document.createElement('div');
        num.className = 'chapter-number';
        num.textContent = ch.number;
        inner.appendChild(num);
      }

      var title = document.createElement('h2');
      title.className = 'chapter-title';
      title.textContent = ch.title;
      inner.appendChild(title);

      ch.paragraphs.forEach(function (text) {
        var p = document.createElement('p');
        p.className = 'chapter-text';
        p.textContent = text;
        inner.appendChild(p);
      });

      section.appendChild(inner);

      // Parallax decorative circles
      var bg = document.createElement('div');
      bg.className = 'parallax-bg';
      for (var i = 0; i < 3; i++) {
        var circle = document.createElement('div');
        circle.className = 'parallax-circle';
        var size = 80 + Math.random() * 200;
        circle.style.width = size + 'px';
        circle.style.height = size + 'px';
        circle.style.top = (10 + Math.random() * 70) + '%';
        circle.style.left = (5 + Math.random() * 85) + '%';
        circle.style.opacity = 0.3 + Math.random() * 0.3;
        bg.appendChild(circle);
      }
      section.appendChild(bg);

      // Scroll indicator on hero
      if (ch.id === 'chapter-1') {
        var indicator = document.createElement('div');
        indicator.className = 'scroll-indicator';
        indicator.innerHTML = '<span>Scroll</span><div class="chevron"></div>';
        section.appendChild(indicator);
      }
    });
  }

  // ─── Navigation ─────────────────────────────────────────────────────────────
  function buildNav() {
    var nav = document.getElementById('chapter-nav');
    if (!nav) return;
    nav.innerHTML = '';
    chapters.forEach(function (ch, i) {
      var wrapper = document.createElement('div');
      wrapper.className = 'nav-dot-wrapper';

      var dot = document.createElement('button');
      dot.className = 'nav-dot';
      dot.setAttribute('aria-label', 'Chapter ' + (i + 1));
      dot.dataset.index = i;
      dot.addEventListener('click', function () {
        var el = document.getElementById(ch.id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      wrapper.appendChild(dot);

      var label = document.createElement('span');
      label.className = 'nav-label';
      var shortTitle = ch.title.length > 24 ? ch.title.slice(0, 24) + '…' : ch.title;
      label.textContent = shortTitle;
      wrapper.appendChild(label);

      nav.appendChild(wrapper);
      navDots.push(dot);
    });
  }

  function updateNav() {
    var scrollY = window.scrollY;
    var viewH = window.innerHeight;

    navDots.forEach(function (dot, i) {
      var section = document.getElementById(chapters[i].id);
      if (!section) return;
      var rect = section.getBoundingClientRect();
      var offset = rect.top + scrollY;
      var height = section.offsetHeight;
      var isActive = scrollY >= offset - viewH * 0.4 && scrollY < offset + height - viewH * 0.4;
      dot.classList.toggle('active', isActive);
    });
  }

  // ─── Scroll Animations ──────────────────────────────────────────────────────
  function setupScrollAnimations() {
    var items = [];
    chapters.forEach(function () {
      items.push('.chapter-number', '.chapter-title', '.chapter-text');
    });

    observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          if (isReducedMotion) {
            entry.target.classList.add('revealed');
          } else {
            var delay = parseFloat(entry.target.dataset.delay) || 0;
            setTimeout(function () {
              entry.target.classList.add('revealed');
            }, delay * 1000);
          }
          if (entry.target.classList.contains('chapter-number') ||
              entry.target.classList.contains('chapter-title') ||
              entry.target.classList.contains('chapter-text')) {
            // Don't unobserve paragraph-level items so they can re-animate if needed
          }
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.chapter-number, .chapter-title, .chapter-text').forEach(function (el) {
      observer.observe(el);
    });
  }

  // ─── Parallax ───────────────────────────────────────────────────────────────
  function updateParallax() {
    if (isReducedMotion) return;
    var scrollY = window.scrollY;
    document.querySelectorAll('.parallax-bg').forEach(function (bg) {
      var speed = 0.08;
      var yOffset = scrollY * speed;
      var circles = bg.querySelectorAll('.parallax-circle');
      circles.forEach(function (circle, i) {
        var factor = 0.5 + i * 0.3;
        var translateY = yOffset * factor;
        circle.style.transform = 'translateY(' + translateY + 'px)';
      });
    });
  }

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        updateParallax();
        updateNav();
        ticking = false;
      });
      ticking = true;
    }
  }

  // ─── Mouse Follower ─────────────────────────────────────────────────────────
  function setupMouseFollower() {
    if (isReducedMotion) return;
    var glow = document.createElement('div');
    glow.id = 'cursor-glow';
    document.body.appendChild(glow);

    var isOnPage = false;

    document.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isOnPage) {
        isOnPage = true;
        glow.style.opacity = '1';
      }
    });

    document.addEventListener('mouseleave', function () {
      isOnPage = false;
      glow.style.opacity = '0';
    });

    function updateGlow() {
      glow.style.left = mouseX + 'px';
      glow.style.top = mouseY + 'px';
      requestAnimationFrame(updateGlow);
    }
    requestAnimationFrame(updateGlow);
  }

  // ─── Performance ────────────────────────────────────────────────────────────
  function checkReducedMotion() {
    isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  // ─── Init ───────────────────────────────────────────────────────────────────
  function init() {
    checkReducedMotion();
    injectStyles();

    currentTheme = getPreferredTheme();
    setTheme(currentTheme);

    renderChapters();
    buildNav();

    // Delayed setup for animations after content renders
    requestAnimationFrame(function () {
      setupScrollAnimations();
      setupMouseFollower();
      updateNav();
    });

    // Theme toggle
    var toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) toggleBtn.addEventListener('click', toggleTheme);

    // Scroll listener
    window.addEventListener('scroll', onScroll, { passive: true });

    // Resize listener
    window.addEventListener('resize', function () {
      updateNav();
    }, { passive: true });

    // System theme change
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    });

    // Reduced motion change
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', function () {
      checkReducedMotion();
    });

    console.log('apple-scroll-story-v3 ready');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
