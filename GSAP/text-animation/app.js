/**
 * アニメーション対象の要素内のテキストを1文字ずつ分割し、<span>で囲む関数
 */
const splitFn = () => {
  // data-animation属性に'oneChar'が含まれる要素を取得
  const targetEls = document.querySelectorAll('[data-animation*="oneChar"]');
  if (targetEls.length === 0) return;

  targetEls.forEach(el => {
    const text = el.textContent.trim();
    el.textContent = ''; // 要素の文字列を空にする

    // 挿入するHTMLを作成。visuallyHiddenクラスでアクセシビリティの対策
    let insertHtml = `<span class="sr-only">${text}</span>`;

    text.split('').forEach((char, index) => {
      char = char === ' ' ? '&nbsp;' : char; // 空白文字の処理
      const delay = index * 30;
      insertHtml += `<span aria-hidden="true">${char}</span>`;
    });
    el.insertAdjacentHTML('beforeend', insertHtml);
  });
};
splitFn();

gsap.registerPlugin(ScrollTrigger);

// fadeIn
gsap.from('[data-animation*="fadeIn"]', {
  opacity: 0,
  duration: 0.8,
  ease: 'power4.inOut',
  scrollTrigger: {
    trigger: '[data-animation*="fadeIn"]',
    start: 'top center',
    toggleActions: 'play none none reverse',
    markers: true,
  },
});

// blurIn
gsap.from('[data-animation*="blurIn"]', {
  opacity: 0,
  filter: 'blur(10px)',
  duration: 0.8,
  ease: 'power4.inOut',
  scrollTrigger: {
    trigger: '[data-animation*="blurIn"]',
    start: 'top center',
    toggleActions: 'play none none reverse',
    markers: true,
  },
});

// oneCharFadeInUp
gsap.from('[data-animation*="oneCharFadeInUp"] > span:not(.sr-only)', {
  display: 'inline-block',
  yPercent: 100,
  duration: 0.4,
  stagger: 0.1,
  ease: 'power4.inOut',
  scrollTrigger: {
    trigger: '[data-animation*="oneCharFadeInUp"]',
    start: 'top center',
    toggleActions: 'play none none reverse',
    markers: true,
  },
});

// slideInLeft
gsap.from('[data-animation*="slideInLeft"]', {
  clipPath: 'inset(0 100% 0 0)',
  duration: 0.8,
  ease: 'power4.inOut',
  scrollTrigger: {
    trigger: '[data-animation*="slideInLeft"]',
    start: 'top center',
    toggleActions: 'play none none reverse',
    markers: true,
  },
});

// slideInRight
gsap.from('[data-animation*="slideInRight"]', {
  clipPath: 'inset(0 0 0 100%)',
  duration: 0.8,
  ease: 'power4.inOut',
  scrollTrigger: {
    trigger: '[data-animation*="slideInRight"]',
    start: 'top center',
    toggleActions: 'play none none reverse',
    markers: true,
  },
});

// slideInTop
gsap.from('[data-animation*="slideInTop"]', {
  clipPath: 'inset(0 0 100% 0)',
  duration: 0.8,
  ease: 'power4.inOut',
  scrollTrigger: {
    trigger: '[data-animation*="slideInTop"]',
    start: 'top center',
    toggleActions: 'play none none reverse',
    markers: true,
  },
});

// slideInBottom
gsap.from('[data-animation*="slideInBottom"]', {
  clipPath: 'inset(100% 0 0 0)',
  duration: 0.8,
  ease: 'power4.inOut',
  scrollTrigger: {
    trigger: '[data-animation*="slideInBottom"]',
    start: 'top center',
    toggleActions: 'play none none reverse',
    markers: true,
  },
});

// smoothIn
gsap.from('[data-animation*="smoothIn"]', {
  yPercent: 100,
  skewY: 20,
  transformOrigin: 'left top',
  duration: 0.8,
  ease: 'power4.inOut',
  scrollTrigger: {
    trigger: '[data-animation*="smoothIn"]',
    start: 'top center',
    toggleActions: 'play none none reverse',
    markers: true,
  },
});

// typing
gsap.from('[data-animation*="oneCharTyping"] > span:not(.sr-only)', {
  display: 'none',
  stagger: 0.1,
  duration: 0.8,
  ease: 'power1.inOut',
  scrollTrigger: {
    trigger: '[data-animation*="oneCharTyping"]',
    start: 'top center',
    toggleActions: 'play none none reverse',
    markers: true,
  },
});

// bgSlideLeft
const bgSlideLeftTl = gsap.timeline({
  set: {
    '--pos': '-105%',
  },
  scrollTrigger: {
    trigger: '[data-animation*="bgSlideLeft"]',
    start: 'top center',
    toggleActions: 'play none none reset',
    markers: true,
  },
});

bgSlideLeftTl
  .to('[data-animation="bgSlideLeft"]', {
    keyframes: {
      '0%': {
        '--pos': '-101%',
      },
      '30%': {
        '--pos': '0',
      },
      '80%': {
        '--pos': '0',
      },
      '100%': {
        '--pos': '101%',
      },
    },
    duration: 1,
    ease: CustomEase.create('customEase', '0.8, 0, 0.170, 1'),
  })
  .to(
    '[data-animation="bgSlideLeft_text"]',
    {
      opacity: 1,
      duration: 0,
    },
    '-=0.4'
  );

// bgSlideBottom

const bgSlideBottomTl = gsap.timeline({
  scrollTrigger: {
    trigger: '[data-animation*="bgSlideBottom"]',
    start: 'top center',
    toggleActions: 'play none none reset',
    markers: true,
  },
});

bgSlideBottomTl
  .to('[data-animation="bgSlideBottom"]', {
    keyframes: {
      '0%': {
        '--pos': '101%',
      },
      '30%': {
        '--pos': '0%',
      },
      '80%': {
        '--pos': '0%',
      },
      '100%': {
        '--pos': '-100%',
      },
    },
    duration: 1,
    ease: CustomEase.create('customEase', '0.8, 0, 0.170, 1'),
  })
  .to(
    '[data-animation="bgSlideBottom_text"]',
    {
      opacity: 1,
      duration: 0,
    },
    '-=0.4'
  );

// 横スクロール
const scrollContent = document.querySelector('.js-sideScrollContent');
const cardList = document.querySelector('.js-cardList');
// console.log(cardList.clientWidth, scrollContent.clientWidth);
// console.log(cardList.clientWidth - scrollContent.clientWidth);

gsap.to(cardList, {
  x: () => -(cardList.clientWidth - scrollContent.clientWidth),
  ease: 'none',
  scrollTrigger: {
    trigger: '.js-sideScrollSection',
    start: 'top top',
    end: () => `+=${cardList.clientWidth - scrollContent.clientWidth}`,
    scrub: true,
    pin: true,
    anticipatePin: 1,
    invalidateOnRefresh: true,
    markers: true,
  },
});
