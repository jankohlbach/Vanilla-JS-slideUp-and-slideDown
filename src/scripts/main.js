const easings = {
  linear(t) {
    return t;
  },
  ease(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  },
  easeCubic(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  },
};

const getHeight = (element) => {
  let { height, paddingTop, paddingBottom } = getComputedStyle(element);
  height = parseInt(height, 10);
  paddingTop = parseInt(paddingTop, 10);
  paddingBottom = parseInt(paddingBottom, 10);
  return { height, paddingTop, paddingBottom };
};

const setTime = height => height / 3 + 250;

/**
 * @param {node} element
 * @param {string} activeClass
 * @param {number} duration [ms]
 * @param {string} timingFunction one of [linear, ease, easeCubic]
 */
const slideDown = (element, activeClass, duration, timingFunction = 'ease') => {
  // calculate height
  element.setAttribute('style', 'display: block;');
  const { height, paddingTop, paddingBottom } = getHeight(element);
  element.setAttribute('style', 'display: none;');

  // set time
  let time;
  if (duration !== undefined && typeof duration === 'number') {
    time = duration;
  } else {
    time = setTime(height);
  }

  // set activeClass
  if (activeClass !== undefined && typeof activeClass === 'string') element.parentNode.classList.add(activeClass);

  element.setAttribute('style', 'overflow: hidden; display: block; padding-top: 0; padding-bottom: 0;');

  const initTime = new Date().getTime();
  const repeat = () => {
    const newTime = new Date().getTime() - initTime;
    const timestep = newTime / time;
    const timefactor = easings[timingFunction](timestep);
    const step = 0 + height * timefactor;
    const stepPaddingT = 0 + (paddingTop * timefactor);
    const stepPaddingB = 0 + (paddingBottom * timefactor);

    if (newTime <= time && Math.ceil(step) < height) {
      element.setAttribute('style', `overflow: hidden; display: block; padding-top: ${stepPaddingT}px; padding-bottom: ${stepPaddingB}px; height: ${step}px`);
    } else {
      element.setAttribute('style', 'display: block');
    }

    const repeatLoop = requestAnimationFrame(repeat);

    if (Math.ceil(step) >= height) {
      cancelAnimationFrame(repeatLoop);
    }
  };

  repeat();
};

/**
 * @param {node} element
 * @param {string} activeClass
 * @param {number} duration [ms]
 * @param {string} timingFunction one of [linear, ease, easeCubic]
 */
const slideUp = (element, activeClass, duration, timingFunction = 'ease') => {
  // calculate height
  const { height, paddingTop, paddingBottom } = getHeight(element);

  // set time
  let time;
  if (duration !== undefined && typeof duration === 'number') {
    time = duration;
  } else {
    time = setTime(height);
  }

  // remove activeClass
  if (activeClass !== undefined && typeof activeClass === 'string') element.parentNode.classList.remove(activeClass);

  element.setAttribute('style', 'overflow: hidden; display: block; padding-top: 0; padding-bottom: 0;');

  const initTime = new Date().getTime();
  const repeat = () => {
    const newTime = new Date().getTime() - initTime;
    const timestep = newTime / time;
    const timefactor = easings[timingFunction](timestep);
    const step = height + -height * timefactor;
    const stepPaddingT = paddingTop + (-paddingTop * timefactor);
    const stepPaddingB = paddingBottom + (-paddingBottom * timefactor);

    if (newTime <= time && Math.floor(step) > 0) {
      element.setAttribute('style', `overflow: hidden; display: block; padding-top: ${stepPaddingT}px; padding-bottom: ${stepPaddingB}px; height: ${step}px`);
    } else {
      element.setAttribute('style', 'display: none');
    }

    const repeatLoop = requestAnimationFrame(repeat);

    if (Math.floor(step) <= 0) {
      cancelAnimationFrame(repeatLoop);
    }
  };

  repeat();
};

const toggleHeads = document.querySelectorAll('.toggle-head');
toggleHeads.forEach((toggleHead) => {
  toggleHead.addEventListener('click', () => {
    if (!toggleHead.parentNode.classList.contains('active')) {
      slideDown(toggleHead.nextElementSibling, 'active', '', 'ease');
    } else {
      slideUp(toggleHead.nextElementSibling, 'active');
    }
  });
});

const toggleFooter = document.querySelectorAll('.toggle-foot');
toggleFooter.forEach((toggleFoot) => {
  toggleFoot.addEventListener('click', () => {
    slideUp(toggleFoot.parentNode, 'active', 600, 'linear');
  });
});
