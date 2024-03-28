/*
  Set scrollbar width
————————————————————————————————————————— */
/**
 * スクロールバー幅を設定する関数
 * カスタムプロパティ `--scrollbarWidth` にスクロールバー幅をpxで設定する
 */
const setScrollbarWidth = () => {
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  // カスタムプロパティの値を更新する
  document.documentElement.style.setProperty('--scrollbarWidth', `${scrollbarWidth}px`);
};

window.addEventListener('load', setScrollbarWidth);
window.addEventListener('resize', setScrollbarWidth);

/*
  BackgroundFixed
————————————————————————————————————————— */

/**
 *
 * @param {boolean} isFixed - 背景を固定するかどうかのフラグ
 */
const backgroundFixed = isFixed => {
  const body = document.body;

  //iOS(iPad含む)判定
  const ua = window.navigator.userAgent.toLowerCase();
  const isiOS =
    ua.indexOf('iphone') > -1 || ua.indexOf('ipad') > -1 || (ua.indexOf('macintosh') > -1 && 'ontouchend' in document);

  // スクロールバーの幅を取得
  const scrollbarWidth = getComputedStyle(body).getPropertyValue('--scrollbarWidth');

  // スクロール量を取得
  const scrollY = isFixed ? window.scrollY : parseInt(body.style.top);

  // 背景固定時の処理
  if (isFixed) {
    // iOSの場合の処理
    if (isiOS) {
      body.style.cssText = `
        position: fixed;
        top: ${scrollY * -1}px;
        left: 0;
        width: 100%;
        height: 100vh;
        padding-right: ${scrollbarWidth};
        overflow: hidden;
      `;
    }
    // iOS以外の場合の処理
    else {
      body.style.overflow = 'hidden';
    }
  }

  // 背景固定解除時の処理
  if (!isFixed) {
    body.style.cssText = '';

    if (isiOS) {
      window.scrollTo(0, scrollY * -1);
    }
  }
};

/*
  Drawer
————————————————————————————————————————— */
const hamburger = document.querySelector('.js-hamburger');
hamburger.addEventListener('click', e => {
  const isExpanded = hamburger.getAttribute('aria-expanded') === 'true'; // 現在の状態

  // aria-expanded属性に、isExpandedを反転してセット
  e.currentTarget.setAttribute('aria-expanded', !isExpanded);

  // <html>要素にクラスを追加/削除
  document.documentElement.classList.toggle('is-drawerActive');

  // isExpandedの状態に応じて背面を固定
  backgroundFixed(!isExpanded);
});

/*
  Dropdown
————————————————————————————————————————— */
// ドロップダウンメニュー関連の要素を取得
const dropdownItems = document.querySelectorAll('.js-hasDropdown');

// ドロップダウンメニューの表示/非表示を制御する関数
const toggleDropdown = (event, action) => {
  const dropdown = event.currentTarget.querySelector('.js-dropdown');
  dropdown.classList[action]('is-visible');
};

/**
 * ドロップダウンメニューを表示する関数
 * @param {Event} event - イベントオブジェクト
 */
const visibleDropdown = event => toggleDropdown(event, 'add');

/**
 * ドロップダウンメニューを非表示にする関数
 * @param {Event} event - イベントオブジェクト
 */
const hiddenDropdown = event => toggleDropdown(event, 'remove');

// 各ドロップダウンアイテムにイベントリスナーを設定
dropdownItems.forEach(item => {
  item.addEventListener('mouseenter', visibleDropdown);
  item.addEventListener('mouseleave', hiddenDropdown);
  item.addEventListener('focusin', visibleDropdown);
  item.addEventListener('focusout', hiddenDropdown);
});

/*
  Resize
————————————————————————————————————————— */
let resizeTimeoutId;
window.addEventListener('resize', () => {
  document.documentElement.classList.add('is-resize');
  clearTimeout(resizeTimeoutId);

  resizeTimeoutId = setTimeout(() => {
    document.documentElement.classList.remove('is-resize');
  }, 500);
});
