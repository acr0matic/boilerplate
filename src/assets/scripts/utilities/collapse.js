/* https://itchief.ru/javascript/slidetoggle */

const toggleEvent = new Event("dropdownToggle");

export class Collapse {
  constructor(target, duration = 350) {
    this._target = target;
    this._duration = duration;

    this.init();
  }

  init() {
    if (this._target.hasAttribute('data-show')) {
      this._target.classList.add('collapse_show');
    }

    else {
      this._target.classList.add('collapse');
    }
  }

  show() {
    const el = this._target;
    if (el.classList.contains('collapsing') || el.classList.contains('collapse_show')) {
      return;
    }
    el.classList.remove('collapse');
    const height = el.offsetHeight;
    el.style.height = 0;
    el.style.overflow = 'hidden';
    el.style.transition = `all ${this._duration}ms ease`;
    el.classList.add('collapsing');
    el.offsetHeight;
    el.style.height = `${height}px`;
    window.setTimeout(() => {
      el.classList.remove('collapsing');
      el.classList.add('collapse');
      el.classList.add('collapse_show');
      el.style.height = '';
      el.style.transition = '';
      el.style.overflow = '';
      window.dispatchEvent(toggleEvent);
    }, this._duration);
  }
  hide() {
    const el = this._target;
    if (el.classList.contains('collapsing') || !el.classList.contains('collapse_show')) {
      return;
    }
    el.style.height = `${el.offsetHeight}px`;
    el.offsetHeight;
    el.style.opacity = 0;
    el.style.height = 0;
    el.style.overflow = 'hidden';
    el.style.transition = `all ${this._duration}ms ease`;
    el.classList.remove('collapse');
    el.classList.remove('collapse_show');
    el.classList.add('collapsing');
    window.setTimeout(() => {
      el.classList.remove('collapsing');
      el.classList.add('collapse');
      el.style.opacity = '';
      el.style.height = '';
      el.style.transition = '';
      el.style.overflow = '';
      window.dispatchEvent(toggleEvent);
    }, this._duration);
  }
  toggle() {
    this._target.classList.contains('collapse_show') ? this.hide() : this.show();
  }
}