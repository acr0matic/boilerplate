export const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

export const StyleСlass = {
  "mobile": {
    "open": "mobile-menu--open",
  },
};

export const breakpoint = {
  'size': '(min-width: )',
};

export const modalParams = {
  awaitCloseAnimation: true,
  disableFocus: true,
  disableScroll: true,

  onShow: modal => {
    window.currentModal = modal.id;
  },

  onClose: () => {
    window.currentModal = null;
  }
};