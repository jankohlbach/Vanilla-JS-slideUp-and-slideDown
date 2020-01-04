(() => {
  const ACTIVE_CLASS = 'open';

  const getHeight = (element) => {
    let { height, paddingTop, paddingBottom } = getComputedStyle(element);
    height = parseInt(height, 10);
    paddingTop = parseInt(paddingTop, 10);
    paddingBottom = parseInt(paddingBottom, 10);
    return { height, paddingTop, paddingBottom };
  };

  const setTime = height => height / 3 + 150;

  const slideDown = (element) => {
    element.setAttribute('style', 'display: block;');
    const { height, paddingTop, paddingBottom } = getHeight(element);
    element.setAttribute('style', 'display: none;');
    const time = setTime(height);

    element.parentNode.classList.add(ACTIVE_CLASS);
    element.setAttribute('style', 'overflow: hidden; display: block; padding-top: 0; padding-bottom: 0;');

    const initTime = new Date().getTime();
    const repeat = () => {
      const newTime = new Date().getTime() - initTime;
      const step = 0 + height * newTime / time;
      const stepPaddingT = 0 + (paddingTop * newTime / time);
      const stepPaddingB = 0 + (paddingBottom * newTime / time);

      if (newTime <= time) {
        element.setAttribute('style', `overflow: hidden; display: block; padding-top: ${stepPaddingT}px; padding-bottom: ${stepPaddingB}px; height: ${step}px`);
      } else {
        element.setAttribute('style', 'display: block');
      }

      const repeatLoop = requestAnimationFrame(repeat);

      if (Math.floor(step) > height) {
        cancelAnimationFrame(repeatLoop);
      }
    };

    repeat();
  };

  const slideUp = (element) => {
    const { height, paddingTop, paddingBottom } = getHeight(element);
    const time = setTime(height);

    element.parentNode.classList.remove(ACTIVE_CLASS);
    element.setAttribute('style', 'overflow: hidden; display: block; padding-top: 0; padding-bottom: 0;');

    const initTime = new Date().getTime();
    const repeat = () => {
      const newTime = new Date().getTime() - initTime;
      const step = height + -height * newTime / time;
      const stepPaddingT = paddingTop + (-paddingTop * newTime / time);
      const stepPaddingB = paddingBottom + (-paddingBottom * newTime / time);

      if (newTime <= time) {
        element.setAttribute('style', `overflow: hidden; display: block; padding-top: ${stepPaddingT}px; padding-bottom: ${stepPaddingB}px; height: ${step}px`);
      } else {
        element.setAttribute('style', 'display: none');
      }

      const repeatLoop = requestAnimationFrame(repeat);

      if (Math.floor(step) < 0) {
        cancelAnimationFrame(repeatLoop);
      }
    };

    repeat();
  };

  const toggleHeads = document.querySelectorAll('.toggle-head');
  toggleHeads.forEach((toggleHead) => {
    toggleHead.addEventListener('click', () => {
      if (!toggleHead.parentNode.classList.contains(ACTIVE_CLASS)) {
        slideDown(toggleHead.nextElementSibling);
      } else {
        slideUp(toggleHead.nextElementSibling);
      }
    });
  });

  const toggleFooter = document.querySelectorAll('.toggle-foot');
  toggleFooter.forEach((toggleFoot) => {
    toggleFoot.addEventListener('click', () => {
      slideUp(toggleFoot.parentNode);
    });
  });
})();
