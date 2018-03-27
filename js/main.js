// `use strict`;

let screens = document.getElementById(`templates`).content.children;
const mainSectionNode = document.querySelector(`section.main`);

// Раз вариант
let screensNodes = [];
for (let i = 0; i < screens.length; i++) {
  screensNodes.push(screens[i]);
}
// Два вариант
// screens = Array.prototype.slice.call(screens);

const showScreen = (screenNumber) => {
  mainSectionNode.appendChild(screensNodes[screenNumber]);
};
const hideScreen = (screenNumber) => {
  mainSectionNode.removeChild(screensNodes[screenNumber]);
};

showScreen(0);

let currentScreen = mainSectionNode.firstChild.className;
let index = screensNodes.findIndex((screen) => screen.className === currentScreen);

const onAltPlusArrow = (evt) => {
  switch (evt.key) {
    case evt.altKey && `ArrowRight`:
      if (index <= screensNodes.length - 2) {
        hideScreen(index);
        showScreen(index + 1);
        index++;
      } else {
        index = screensNodes.length - 1;
      }
      break;
    case evt.altKey && `ArrowLeft`:
      if (index > 0) {
        hideScreen(index);
        showScreen(index - 1);
        index--;
      } else {
        index = 0;
      }
      break;
    default:
      return;
  }
  evt.preventDefault();
};

document.addEventListener(`keydown`, onAltPlusArrow);
