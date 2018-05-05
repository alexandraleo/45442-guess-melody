const SERVER = `https://es.dump.academy/guess-melody`;

const DEFAULT_PLAYER = `player1`;
const APP_ID = `05052018`;

const checkStatus = (response) => {
  if (response.ok) {
    return response;
  } else {
    throw new Error(`${response.status} ${response.statusText}`);
  }
};

const toJSON = (resp) => resp.json();

export default class Loader {
  static loadQuestions() {
    return fetch(`${SERVER}/questions`).then(checkStatus).then(toJSON);
  }

  static loadResults(data, name = DEFAULT_PLAYER) {
    return fetch(`${SERVER}/stats/${APP_ID}-${name}`).then(checkStatus).then(toJSON);
  }

  static saveREsults(data, name = DEFAULT_PLAYER) {
    const requestSettings = {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    return fetch(`${SERVER}/stats/${APP_ID}-${name}`, requestSettings).then(checkStatus);
  }
}
