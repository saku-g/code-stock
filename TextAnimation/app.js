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
    let insertHtml = `<span class="visuallyHidden">${text}</span>`;

    text.split('').forEach((char, index) => {
      char = char === ' ' ? '&nbsp;' : char; // 空白文字の処理
      const delay = index * 30;
      insertHtml += `<span aria-hidden="true" style="transition-delay: ${delay}ms">${char}</span>`;
    });
    el.insertAdjacentHTML('beforeend', insertHtml);
  });
};
splitFn();

// IntersectionObserver
const animationObserve = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
    }
  });
};
new SetObserver('[data-animation]', animationObserve, { rootMargin: '-20%', threshold: 0.5 });
