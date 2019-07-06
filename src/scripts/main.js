(() => {
  const activeClass = 'open';

  const getHeight = (element) => {
    const clone = element.cloneNode(true);
    clone.setAttribute('style', 'visibility: hidden; display: block; margin: -999px 0;');
    const height = element.parentNode.appendChild(clone).clientHeight;
    const { paddingTop } = getComputedStyle(clone);
    const { paddingBottom } = getComputedStyle(clone);
    element.parentNode.removeChild(clone);
    return {
      height,
      paddingTop,
      paddingBottom,
    };
  };

  const slideDown = (element) => {
    if (element.parentNode.classList.contains(activeClass)) {
      return;
    }

    const dimensions = getHeight(element);
    const { height } = dimensions;
    const paddingT = parseInt(dimensions.paddingTop, 10);
    const paddingB = parseInt(dimensions.paddingBottom, 10);
    const time = height / 3 + 150;

    element.parentNode.classList.add(activeClass);
    element.setAttribute('style', 'overflow: hidden; display: block; padding-top: 0; padding-bottom: 0;');

    const initTime = new Date().getTime();
    const repeat = () => {
      const newTime = new Date().getTime() - initTime;
      const step = 0 + height * newTime / time;
      const stepPaddingT = 0 + (paddingT * newTime / time);
      const stepPaddingB = 0 + (paddingB * newTime / time);

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
    const height = element.clientHeight;
    const paddingT = parseInt(getComputedStyle(element).paddingTop, 10);
    const paddingB = parseInt(getComputedStyle(element).paddingBottom, 10);
    const time = height / 3 + 150;

    element.parentNode.classList.remove(activeClass);
    element.setAttribute('style', 'overflow: hidden; display: block; padding-top: 0; padding-bottom: 0;');

    const initTime = new Date().getTime();
    const repeat = () => {
      const newTime = new Date().getTime() - initTime;
      const step = height + -height * newTime / time;
      const stepPaddingT = paddingT + (-paddingT * newTime / time);
      const stepPaddingB = paddingB + (-paddingB * newTime / time);

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
      if (!toggleHead.parentNode.classList.contains(activeClass)) {
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
}).call(this);
