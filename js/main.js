let screens = document.getElementById(`templates`).content.children;
const mainSectionNode = document.querySelector(`section.main`);

let screensNodes = Array.from(screens);

const showScreen = (screenNumber) => {
  mainSectionNode.appendChild(screensNodes[screenNumber]);
};
const hideScreen = (screenNumber) => {
  mainSectionNode.removeChild(screensNodes[screenNumber]);
};

let index = 0;
showScreen(index);

document.addEventListener(`keydown`, (evt) => {
  if (evt.altKey && evt.key === `ArrowRight`) {
    if (index < screensNodes.length - 1) {
      hideScreen(index);
      showScreen(index + 1);
      index++;
    } else {
      index = screensNodes.length - 1;
    }
  }
  if (evt.altKey && evt.key === `ArrowLeft`) {
    if (index > 0) {
      hideScreen(index);
      showScreen(index - 1);
      index--;
    } else {
      index = 0;
    }
  }

  //Подождать озарения
  // const getNextScreenNumber = (count, current) => {
  //   const next = current % count;
  //   return next + (next < 0 ? count : 0);
  // };
});
