export const getElement = (templateHTML) => {
  const newScreen = document.createElement(`template`);
  newScreen.innerHTML = templateHTML;
  return newScreen.content;
};

const mainSectionNode = document.querySelector(`section.main`);

export const showScreen = (module) => {
  mainSectionNode.innerHTML = ``;
  mainSectionNode.appendChild(module);
};
