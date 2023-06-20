export const SetSize = (target, prefix, attach = false, dimension = "height") => {
  if (target) {
    const size = (dimension === "width") ? target.offsetWidth : target.offsetHeight;

    if (attach) target.style.setProperty(`--${prefix}-${dimension}`, size + "px");
    else document.documentElement.style.setProperty(`--${prefix}-${dimension}`, size + "px");

    return size;
  }

  return 0;
};


export const MediaQuery = (breakpoint) => window.matchMedia(`${breakpoint}`).matches;
