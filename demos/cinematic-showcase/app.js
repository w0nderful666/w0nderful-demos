(function () {
  'use strict';

  /* ─── Content ─── */
  const CHAPTERS = [
    {
      id: 'chapter-earth',
      title: '地球',
      sub: 'Earth',
      paragraphs: [
        '四十六亿年前，一团星际尘埃和气体在引力作用下坍缩，形成了我们的太阳系。地球，作为第三颗离太阳最近的行星，在漫长的演化过程中获得了独一无二的特性——液态水覆盖了其表面百分之七十一的面积，从太空中望去，它是一颗璀璨的蓝色大理石。',
        '板块构造运动持续重塑着地球的面貌。地壳之下，炽热的地幔物质通过对流驱动着大陆漂移，创造山脉、裂谷和海沟。喜马拉雅山脉的隆起、大西洋中脊的扩张，都是这颗星球依然活跃的明证。',
        '大气层是地球的守护者，由氮气（78%）和氧气（21%）构成，这层薄薄的保护罩不仅阻挡了有害的太阳辐射，还通过温室效应将地表温度维持在适宜生命存续的范围。臭氧层则像一把无形的伞，过滤掉致命的紫外线。',
        '地球的磁场源自外核中液态铁镍合金的对流运动，这一地球发电机效应产生的磁层将太阳风偏转，使大气层免被剥离。磁极倒转在地质记录中发生过数百次，下一次或许正在悄然逼近。',
        '从微观的DNA双螺旋到宏观的生态系统，地球孕育了数百万个物种，构建了错综复杂的生物圈。每一次日出日落，潮汐涨落，都是这颗星球脉动的韵律，提醒着我们它的伟大与脆弱。'
      ],
      speed: 0.2
    },
    {
      id: 'chapter-moon',
      title: '月球',
      sub: 'Moon',
      paragraphs: [
        '月球是地球唯一的天然卫星，直径约3474公里，距离地球约38.4万公里。主流理论认为，约45亿年前，一颗火星大小的天体忒伊亚与原始地球相撞，抛射出的物质聚集形成了月球。这次撞击也使地球的自转轴倾斜，产生了四季。',
        '月球表面布满了陨石坑，记录着数十亿年来小行星和彗星的轰击历史。月海——那些暗色的玄武岩平原——实际上是古老的大型撞击盆地被岩浆填充后的遗迹。风暴洋是最大的月海，面积约400万平方公里。',
        '由于潮汐锁定，月球始终以同一面朝向地球。我们永远看不到的月球背面，有着更厚的地壳和更密集的陨石坑群。2019年，嫦娥四号实现了人类探测器首次在月球背面软着陆。',
        '月球正在以每年约3.8厘米的速度远离地球。数十亿年后，它将变得遥远而黯淡，地球上的潮汐将变得微弱，日全食也将成为历史。然而此刻，它依然在每个夜晚以皎洁的光辉陪伴着我们的星球。'
      ],
      speed: 0.3
    },
    {
      id: 'chapter-mars',
      title: '火星',
      sub: 'Mars',
      paragraphs: [
        '火星，这颗铁锈红色的行星，一直是人类太空探索中最引人遐想的目标。它的直径约为地球的一半，表面重力仅为地球的38%，但这里拥有太阳系最高的山峰——奥林帕斯火山（21.9公里）和最长的峡谷——水手号峡谷（超过4000公里）。',
        '数十亿年前，火星曾是一个温暖湿润的世界。好奇号和毅力号火星车发现的沉积岩、河床和三角洲遗迹表明，火星表面曾有过大量的液态水，甚至可能存在过一个覆盖北半球的海洋。如今，水以冰的形式存在于极冠和地下。',
        '火星的大气极其稀薄，主要是二氧化碳（95%），表面气压仅为地球的0.6%，无法保护生命免受宇宙射线和太阳辐射的侵害。沙尘暴时常席卷全球，将整个行星笼罩在橙色的尘埃之中。',
        '人类对火星的向往从未停止。从海员7号的飞掠到毅力号的采样返回计划，每一代探测器都在为人类最终踏上这颗红色星球铺路。SpaceX的星际飞船、NASA的阿尔忒弥斯计划，都预示着火星殖民不再只是科幻小说的情节。'
      ],
      speed: 0.4
    },
    {
      id: 'chapter-jupiter',
      title: '木星',
      sub: 'Jupiter',
      paragraphs: [
        '木星是太阳系中最大的行星，其质量是其他所有行星总和的2.5倍。这颗气态巨行星没有固态表面，由约90%的氢和10%的氦组成，其内部巨大的压力将氢压缩成了液态金属氢，产生了太阳系中最强的磁场。',
        '大红斑是木星最著名的特征，一个持续了至少350年的巨型反气旋风暴，其宽度超过地球直径的1.3倍。朱诺号探测器揭示了这个风暴的深度远超预期，一直延伸到云层以下数百公里。',
        '木星拥有至少95颗已确认的卫星，其中伽利略卫星最为著名。伊奥是太阳系中火山活动最活跃的天体，欧罗巴的冰壳之下可能隐藏着液态水海洋，成为寻找地外生命的热门目标，盖尼米得是最大的卫星，直径甚至超过水星。',
        '木星的环系统虽然不如土星壮观，但也由微小的尘埃粒子构成，这些粒子主要来自其内部卫星的撞击喷发物。木星的强大引力还在太阳系中扮演着清道夫的角色，捕获或偏转着大量彗星和小行星。'
      ],
      speed: 0.5
    },
    {
      id: 'chapter-saturn',
      title: '土星环',
      sub: 'Saturn Rings',
      paragraphs: [
        '土星环是太阳系中最壮观的景象之一，由数十亿个冰和岩石碎片组成，范围延伸至土星中心约28.2万公里，但厚度惊人地薄——大部分区域仅约10米。这些碎片的尺寸从微米级的尘埃到数米大的冰块不等。',
        '环系统分为七个主要环带（D、C、B、A、F、G、E），以发现顺序命名。B环最为明亮和致密，而A环和B环之间的卡西尼缝是由土卫一（Mimas）的引力共振造成的，宽度约4800公里。',
        '卡西尼号探测器在长达13年的任务中揭示了许多惊人的细节：环中的垂直结构、微小的嵌入卫星（如土卫十八Pan在恩克缝中清理轨道）、以及环物质不断坠入土星大气的现象。环的年龄可能远比想象中年轻，或许只有1-2亿年。',
        '土星本身也是一个气态巨行星，密度低于水，如果有足够大的海洋，它将能漂浮在水面上。土星的大气呈现出柔和的淡黄色条纹，风速可达每小时1800公里，是太阳系中风速最快的行星之一。'
      ],
      speed: 0.6
    },
    {
      id: 'chapter-asteroid-belt',
      title: '小行星带',
      sub: 'Asteroid Belt',
      paragraphs: [
        '小行星带位于火星和木星轨道之间，是一个聚集了数百万颗大小不等天体的区域。总质量约为月球的4%，其中约一半集中在四颗最大的小行星上：谷神星（矮行星，直径约940公里）、灶神星、智神星和健神星。',
        '小行星带并非密集到飞船无法穿越，实际上平均间隔超过100万公里。它与行星形成早期未能聚集成行星的残余物质有关，木星的强大引力阻碍了这些物质的聚集，使它们成为太阳系形成的活化石。',
        '灶神星拥有一个巨大的撞击盆地——雷亚西尔维亚盆地，直径约500公里，几乎覆盖了其南半球。地球上发现的HED陨石已被确认来自灶神星，是人类首次能够精确定位来源的地外岩石。',
        '小行星的轨道并不稳定，引力共振使它们不断碰撞和碎裂。这些碰撞产生了大量碎片，有些最终进入了地球轨道成为流星。近地小行星的监测也是行星防御的重要课题，人类正在发展偏转技术以应对潜在的撞击威胁。'
      ],
      speed: 0.7
    },
    {
      id: 'chapter-galactic-center',
      title: '银河系中心',
      sub: 'Galactic Center',
      paragraphs: [
        '银河系的中心位于人马座方向，距离地球约2.6万光年。那里隐藏着一个超大质量黑洞——人马座A*，质量约为太阳的430万倍。尽管它被密集的星际气体和尘埃云遮挡，可见光无法穿透，但射电和红外观测已经揭示了它的存在。',
        '银心区域聚集了数百亿颗恒星，密度是太阳附近的上百万倍。如果从一颗靠近银心的行星上仰望天空，夜空将比地球上明亮数千倍，星辰如密集的光瀑般倾泻而下。',
        'G2和G1等气体云正在被黑洞的引力撕裂，剧烈的潮汐力将物质加热到数百万度，产生强烈的X射线辐射。虽然目前的银心黑洞处于相对宁静的状态，但偶尔也会吞噬恒星或气体云，释放出巨大的能量。',
        '银河系的旋臂——英仙臂、船底-人马臂、矩尺臂和盾牌-半人马臂——正在以约220公里/秒的速度将我们带向银心方向，同时也在远离。银河系正与邻近的仙女座星系以每秒119公里的速度相互靠近，约40亿年后两者将发生碰撞合并。'
      ],
      speed: 0.8
    },
    {
      id: 'chapter-black-hole',
      title: '黑洞',
      sub: 'Black Hole',
      paragraphs: [
        '黑洞是时空曲率达到光都无法逃逸的天体。当一个质量足够大的恒星耗尽核燃料，其核心会在自身引力的作用下坍缩，形成一个密度无限大的奇点，周围被事件视界所包裹。穿越事件视界的那一刻，通往任何方向的路径都指向奇点。',
        '2019年，事件视界望远镜拍摄了人类历史上第一张黑洞照片——M87星系中心的黑洞，质量约为太阳的65亿倍。这张影像显示了黑暗的阴影轮廓和明亮的吸积盘，验证了广义相对论的预言。',
        '吸积盘是黑洞吞噬物质时形成的旋转盘状结构，物质在落入黑洞之前被加热到数百万度，释放出强烈的X射线和相对论性喷流。这些喷流以接近光速的速度射向宇宙空间，延伸数千光年，影响着整个星系的演化。',
        '霍金辐射是量子效应在黑洞视界附近的体现，一对虚粒子对中一个落入黑洞，另一个逃逸，导致黑洞缓慢蒸发。理论上，极小质量的黑洞会在剧烈的爆炸中终结，但大质量黑洞的蒸发时间远超宇宙的当前年龄。'
      ],
      speed: 0.9
    },
    {
      id: 'chapter-wormhole',
      title: '虫洞',
      sub: 'Wormhole',
      paragraphs: [
        '虫洞，又称爱因斯坦-罗森桥，是时空理论中连接两个遥远区域的假想隧道。1935年，爱因斯坦和纳森·罗森在研究量子纠缠时首次提出了这一概念，试图描述带电粒子的时空结构。在理论中，虫洞的两端可能位于不同的宇宙或不同的时间点。',
        '广义相对论允许虫洞的存在，但要保持其稳定开放，需要一种具有负能量的奇异物质，这种物质尚未被实验证实。卡西米尔效应展示了负能量密度在量子尺度上的可能性，但能否放大到足以支撑虫洞仍是未解之谜。',
        '如果真的存在可穿越的虫洞，它将彻底改变宇宙旅行的规则。跨越数万光年的距离可能在瞬间完成，甚至可能实现时间旅行。然而，霍金猜想任何试图使用虫洞进行时间旅行的行为都会触发量子反馈效应，摧毁虫洞。',
        '在科幻作品中，虫洞是人类跨越星际鸿沟的桥梁。《星际穿越》中描绘的虫洞和五维空间引起了公众对广义相对论的广泛兴趣。虽然目前虫洞纯属理论构想，但它激励着物理学家不断探索引力和时空的本质。'
      ],
      speed: 1.0
    },
    {
      id: 'chapter-dark-matter',
      title: '暗物质',
      sub: 'Dark Matter',
      paragraphs: [
        '暗物质是宇宙中最神秘的成分之一，它不发光、不吸收也不反射电磁辐射，只能通过引力效应被间接感知。根据目前的宇宙学模型，暗物质约占宇宙物质总质量的85%，是普通可见物质的五倍以上。',
        '暗物质存在的第一个证据来自维拉·鲁宾对螺旋星系旋转曲线的观测。她发现星系外围的恒星绕转速度远高于基于可见物质质量的预期，这意味着星系被大量不可见的物质晕所包裹。',
        '引力透镜效应进一步证实了暗物质的存在。当遥远星系的光线经过一个星系团时，大质量天体的引力会弯曲时空，扭曲后方天体的图像，而测量的总质量远大于可见物质的质量总和。子弹星系团更是展示了暗物质和普通物质在碰撞中分离的直接证据。',
        '对暗物质粒子本质的探索是当代物理学的头等大事之一。候选者包括弱相互作用大质量粒子、轴子和惰性中微子等。大型地下探测器如LZ和XENONnT正在寻找WIMP的微弱信号，而大型强子对撞机也在尝试直接产生暗物质粒子。'
      ],
      speed: 1.1
    },
    {
      id: 'chapter-exoplanet',
      title: '系外行星',
      sub: 'Exoplanet',
      paragraphs: [
        '直到1995年，人类才知道太阳系是否孤独。那一年，米歇尔·迈耶和迪迪埃·奎洛兹发现了飞马座51b——第一颗围绕类太阳恒星运行的系外行星。这颗热木星的发现开启了系外行星研究的黄金时代。',
        '开普勒太空望远镜使用凌星法发现了超过2600颗系外行星，揭示了行星系统的多样性远超想象。从轨道周期仅数小时的超短周期行星，到围绕双星运行的塔图因星球，再到流浪行星，宇宙中的行星种类令人目不暇接。',
        'TRAPPIST-1系统拥有七颗地球大小的行星，其中三颗位于宜居带内。詹姆斯·韦伯空间望远镜正在分析这些行星的大气成分，寻找水、甲烷和氧气等生物标志物的光谱特征。',
        '宜居带的概念正在不断被重新定义。系外行星的大气成分、地质活动、磁场保护、潮汐加热等因素都影响着真实的宜居性。在数十亿颗系外行星中，一颗真正拥有生命的类地行星或许就在不远处等待被发现。'
      ],
      speed: 1.2
    },
    {
      id: 'chapter-universe-edge',
      title: '宇宙边缘',
      sub: 'Edge of the Universe',
      paragraphs: [
        '宇宙的边缘不是一个有形的边界，而是时间上的极限。当我们朝远处望去，看到的其实是过去。宇宙微波背景辐射是在大爆炸后约38万年发出的第一缕光，它构成了我们可观测宇宙的最终视界。',
        '可观测宇宙的直径约为930亿光年，包含约两万亿个星系。哈勃极端深场的一张照片中，数千个星系如同宇宙岛屿散落在漆黑的背景中，最遥远的星系红移达到11以上，对应大爆炸后仅4亿年的婴儿时期。',
        '在可观测宇宙之外，宇宙可能只是刚刚开始。暴胀理论预言，我们的宇宙只是无限多重宇宙中的一个气泡。其他区域可能有着不同的物理常数、不同的维度数量，甚至完全不同的自然法则。',
        '宇宙的最终命运取决于暗能量的性质。如果暗能量持续加速宇宙膨胀，最终将导致大撕裂——星系、恒星、原子甚至时空本身都会被撕碎。相反，如果引力最终占据主导，宇宙可能重新坍缩回奇点，迎来下一次大爆炸。'
      ],
      speed: 1.3
    }
  ];

  /* ─── Font Import (not in style.css) ─── */
  function injectFonts() {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;700&family=Playfair+Display:wght@400;700&display=swap';
    document.head.appendChild(link);
  }

  /* ─── Build Chapters ─── */
  function buildChapters() {
    const sections = document.querySelectorAll('.chapter');
    if (!sections.length) return;
    sections.forEach(function (sec) {
      const id = sec.id;
      var data = CHAPTERS.find(function (c) { return c.id === id; });
      if (!data) return;

      sec.classList.add('chapter');

      // decoration layer
      var deco = document.createElement('div');
      deco.className = 'chapter-parallax-bg';
      sec.appendChild(deco);

      // unique visual per chapter
      var vis = createVisual(id, deco);
      if (vis) deco.appendChild(vis);

      // content
      var inner = document.createElement('div');
      inner.className = 'chapter-inner';
      inner.style.opacity = '0';
      inner.style.transform = 'translateY(40px)';
      inner.style.transition = 'opacity 0.8s ease, transform 0.8s ease';

      var h2 = document.createElement('h2');
      h2.className = 'chapter-title';
      h2.textContent = data.title;
      inner.appendChild(h2);

      var subP = document.createElement('p');
      subP.className = 'chapter-sub';
      subP.textContent = data.sub;
      inner.appendChild(subP);

      var divider = document.createElement('div');
      divider.className = 'chapter-divider';
      inner.appendChild(divider);

      data.paragraphs.forEach(function (text, i) {
        var p = document.createElement('p');
        p.textContent = text;
        p.style.transitionDelay = (i * 150) + 'ms';
        inner.appendChild(p);
      });

      sec.appendChild(inner);

      // set parallax speed
      sec.dataset.parallaxSpeed = String(data.speed);
    });
  }

  function createVisual(id, container) {
    var el;
    switch (id) {
      case 'chapter-earth':
        el = document.createElement('div'); el.className = 'visual-earth'; break;
      case 'chapter-moon':
        el = document.createElement('div'); el.className = 'visual-moon'; break;
      case 'chapter-mars':
        el = document.createElement('div'); el.className = 'visual-mars'; break;
      case 'chapter-jupiter':
        el = document.createElement('div'); el.className = 'visual-jupiter'; break;
      case 'chapter-saturn':
        el = document.createElement('div'); el.className = 'visual-saturn'; break;
      case 'chapter-asteroid-belt':
        el = document.createElement('div'); el.className = 'visual-asteroid';
        for (var i = 0; i < 30; i++) {
          var a = document.createElement('span');
          a.style.left = (Math.random() * 100) + '%';
          a.style.top = (Math.random() * 100) + '%';
          a.style.width = a.style.height = (2 + Math.random() * 3) + 'px';
          a.style.background = ['#9e9e9e','#bdbdbd','#e0e0e0'][Math.floor(Math.random() * 3)];
          el.appendChild(a);
        }
        break;
      case 'chapter-galactic-center':
        el = document.createElement('div'); el.className = 'visual-galactic'; break;
      case 'chapter-black-hole':
        el = document.createElement('div'); el.className = 'visual-blackhole'; break;
      case 'chapter-wormhole':
        el = document.createElement('div'); el.className = 'visual-wormhole'; break;
      case 'chapter-dark-matter':
        el = document.createElement('div'); el.className = 'visual-darkmatter';
        for (var j = 0; j < 12; j++) {
          var l = document.createElement('div'); l.className = 'dm-line';
          var x = Math.random() * 80 + 10;
          var y = Math.random() * 80 + 10;
          var w = 20 + Math.random() * 80;
          var h = 1 + Math.random() * 2;
          l.style.left = x + '%'; l.style.top = y + '%';
          l.style.width = w + 'px'; l.style.height = h + 'px';
          l.style.transform = 'rotate(' + (Math.random() * 60 - 30) + 'deg)';
          el.appendChild(l);
        }
        break;
      case 'chapter-exoplanet':
        el = document.createElement('div'); el.className = 'visual-exoplanet'; break;
      case 'chapter-universe-edge':
        el = document.createElement('div'); el.className = 'visual-universe'; break;
      default: return null;
    }
    return el;
  }

  /* ─── Navigation Dots ─── */
  function buildNav() {
    var nav = document.getElementById('chapter-nav');
    if (!nav) return;
    CHAPTERS.forEach(function (data) {
      var btn = document.createElement('button');
      btn.dataset.target = data.id;
      var tip = document.createElement('span');
      tip.className = 'dot-tooltip';
      tip.textContent = data.title;
      btn.appendChild(tip);
      btn.addEventListener('click', function () {
        var target = document.getElementById(data.id);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      });
      nav.appendChild(btn);
    });
  }

  function updateNav() {
    var btns = document.querySelectorAll('#chapter-nav button');
    var scrollY = window.scrollY + window.innerHeight / 2;
    var activeIndex = 0;
    CHAPTERS.forEach(function (data, i) {
      var sec = document.getElementById(data.id);
      if (!sec) return;
      var top = sec.offsetTop;
      var bottom = top + sec.offsetHeight;
      if (scrollY >= top && scrollY < bottom) activeIndex = i;
    });
    btns.forEach(function (btn, i) {
      btn.classList.toggle('active', i === activeIndex);
    });
  }

  /* ─── Canvas Starfield ─── */
  var stars = [];
  var canvas, ctx;
  var starCount = 250;
  var mouseX = 0, mouseY = 0;

  function initStarfield() {
    canvas = document.getElementById('starfield');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    resizeCanvas();
    generateStars();
    animateStars();
  }

  function resizeCanvas() {
    if (!canvas) return;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = window.innerWidth;
    var h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
    // re-gen if needed
    if (stars.length > 0) generateStars();
  }

  function generateStars() {
    var w = window.innerWidth;
    var h = window.innerHeight;
    stars = [];
    var count = w < 768 ? Math.floor(starCount * 0.6) : starCount;
    for (var i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.8 + 0.2,
        a: Math.random() * 0.7 + 0.3,
        twinkleSpeed: 0.002 + Math.random() * 0.008,
        twinklePhase: Math.random() * Math.PI * 2,
        layer: Math.floor(Math.random() * 3) // 0=back,1=mid,2=front
      });
    }
  }

  function animateStars() {
    if (!ctx || !canvas) return;
    var w = window.innerWidth;
    var h = window.innerHeight;
    var time = Date.now() * 0.001;

    ctx.clearRect(0, 0, w, h);

    // subtle drift based on scroll
    var scrollFactor = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) || 0;

    stars.forEach(function (star) {
      var twinkle = Math.sin(time * star.twinkleSpeed * 60 + star.twinklePhase) * 0.3 + 0.7;
      var alpha = star.a * twinkle;

      // slight drift per layer on scroll
      var driftY = (star.layer - 1) * scrollFactor * 8;

      ctx.beginPath();
      ctx.arc(star.x, star.y + driftY, star.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,' + alpha.toFixed(3) + ')';
      ctx.fill();

      // occasional larger star glow
      if (star.r > 1.2) {
        ctx.beginPath();
        ctx.arc(star.x, star.y + driftY, star.r * 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(200,220,255,' + (alpha * 0.08).toFixed(3) + ')';
        ctx.fill();
      }
    });

    // mouse-repelled star cluster (subtle)
    if (mouseX > 0 && mouseY > 0) {
      stars.forEach(function (star) {
        var dx = star.x - mouseX;
        var dy = (star.y + (star.layer - 1) * scrollFactor * 8) - mouseY;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120 && dist > 0) {
          var force = (120 - dist) / 120 * 3;
          var nx = dx / dist * force;
          var ny = dy / dist * force;
          ctx.beginPath();
          ctx.arc(star.x + nx, star.y + (star.layer - 1) * scrollFactor * 8 + ny, star.r * 0.8, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(200,230,255,' + (alpha * 0.6).toFixed(3) + ')';
          ctx.fill();
        }
      });
    }

    requestAnimationFrame(animateStars);
  }

  /* ─── Cursor Glow ─── */
  function initCursorGlow() {
    var glow = document.getElementById('cursor-glow');
    if (!glow) return;
    var targetX = -200, targetY = -200;
    var currentX = -200, currentY = -200;

    document.addEventListener('mousemove', function (e) {
      targetX = e.clientX;
      targetY = e.clientY;
      glow.style.opacity = '1';
    });

    document.addEventListener('mouseleave', function () {
      glow.style.opacity = '0';
    });

    function smoothGlow() {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      glow.style.left = currentX + 'px';
      glow.style.top = currentY + 'px';
      requestAnimationFrame(smoothGlow);
    }
    smoothGlow();
  }

  /* ─── Progress Bar ─── */
  function updateProgress() {
    var bar = document.getElementById('progress-bar');
    if (!bar) return;
    var scrollTop = window.scrollY;
    var maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    var progress = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;
    bar.style.width = progress + '%';
  }

  /* ─── Parallax ─── */
  function updateParallax() {
    var sections = document.querySelectorAll('.chapter');
    var scrollY = window.scrollY;
    var viewH = window.innerHeight;

    sections.forEach(function (sec) {
      var speed = parseFloat(sec.dataset.parallaxSpeed) || 0.5;
      var rect = sec.getBoundingClientRect();
      var centerOffset = rect.top + rect.height / 2 - viewH / 2;
      var bg = sec.querySelector('.chapter-parallax-bg');
      if (bg) {
        var offset = centerOffset * speed * 0.15;
        bg.style.transform = 'translateY(' + offset.toFixed(1) + 'px)';
      }
    });
  }

  /* ─── Scroll-Triggered Entrance ─── */
  function initScrollAnimations() {
    var sections = document.querySelectorAll('.chapter');
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var inner = entry.target.querySelector('.chapter-inner');
        if (!inner) return;
        if (entry.isIntersecting) {
          setTimeout(function () {
            inner.style.opacity = '1';
            inner.style.transform = 'translateY(0)';
          }, 100);
        } else {
          inner.style.opacity = '0';
          inner.style.transform = 'translateY(40px)';
        }
      });
    }, { threshold: 0.15 });

    sections.forEach(function (sec) { observer.observe(sec); });
  }

  /* ─── Text Fade-in (per paragraph) ─── */
  function initTextFadeIn() {
    var allParagraphs = document.querySelectorAll('.chapter p');
    var po = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.25 });

    allParagraphs.forEach(function (p) { po.observe(p); });
  }

  /* ─── Throttled Scroll Handler ─── */
  var scrollTicking = false;
  function onScroll() {
    if (!scrollTicking) {
      requestAnimationFrame(function () {
        updateProgress();
        updateParallax();
        updateNav();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }

  /* ─── Init ─── */
  function init() {
    injectFonts();
    buildChapters();
    // ensure sections have .chapter class
    document.querySelectorAll('section').forEach(function (s) { s.classList.add('chapter'); });
    buildNav();
    initStarfield();
    initCursorGlow();
    initScrollAnimations();
    initTextFadeIn();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', function () {
      resizeCanvas();
      generateStars();
    });

    // initial update
    updateProgress();
    updateParallax();
    updateNav();

    console.log('cinematic-showcase-v2 ready');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
