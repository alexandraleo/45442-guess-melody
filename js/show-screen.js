export const getElement = (templateHTML) => {
  const newScreen = document.createElement(`template`);
  newScreen.innerHTML = templateHTML;
  return newScreen.content;
};

const mainSectionNode = document.querySelector(`section.main`);

export const showScreen = (...modules) => {
  mainSectionNode.innerHTML = ``;
  for (let module of modules) {
    mainSectionNode.appendChild(module);
  }
};

