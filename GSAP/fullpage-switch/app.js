const sections = document.querySelectorAll('.js-fullScreen');

gsap.set(sections, {
  opacity: 0,
  zIndex: 0,
});

gsap.set(sections[0], {
  opacity: 1,
  zIndex: 1,
});

let activeIndex = 0;

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

const handleScroll = event => {
  const beforeIndex = activeIndex;

  // スクロール方向に応じてactiveIndexを更新
  if (event.deltaY > 0 && activeIndex < sections.length - 1) {
    activeIndex++;
  } else if (event.deltaY < 0 && activeIndex > 0) {
    activeIndex--;
  } else {
    return; // 範囲外の場合、何もしない
  }

  if (beforeIndex !== activeIndex) {
    // 前のセクションを非表示
    gsap.to(sections[beforeIndex], {
      opacity: 0,
      zIndex: 0,
      duration: 0.3,
    });

    // 次のセクションを表示
    gsap.to(sections[activeIndex], {
      opacity: 1,
      zIndex: 1,
      duration: 0.3,
    });

    const contentInner = sections[activeIndex].querySelector('.js-fullScreenInner');

    console.log(sections[activeIndex].clientHeight, contentInner.clientHeight);

    if (contentInner.clientHeight > sections[activeIndex].clientHeight) {
      // sections[activeIndex].style.overflowY = 'auto';
      console.log(contentInner.scrollHeight, contentInner.clientHeight, contentInner.offsetHeight);
    }
  }
};

// デバウンスを適用したスクロールイベントリスナー
window.addEventListener('wheel', debounce(handleScroll, 200));
