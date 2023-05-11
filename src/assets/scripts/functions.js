export const SetHeight = (target, prefix) => {
  if (target) {
    const height = target.offsetHeight;
    document.documentElement.style.setProperty(`--${prefix}-height`, height + "px");

    return height;
  }

  return 0;
};