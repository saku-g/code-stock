class SetObserver {
  constructor(els, callback, options) {
    this.els = document.querySelectorAll(els);
    const defaultOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0,
    };
    this.callback = callback;
    this.options = Object.assign(defaultOptions, options);
    this._init();
  }

  _init() {
    this.observer = new IntersectionObserver(this.callback, this.options);

    this.els.forEach(el => this.observer.observe(el));
  }
}
