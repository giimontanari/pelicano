import firebase from "../firebase.js";

export default class GifService {
  static getGifsByGame(id) {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await firebase
          .database()
          .ref("game_gif")
          .orderByChild("id_game")
          .equalTo(id)
          .once("value");

        resolve(response.val());
      } catch (error) {
        reject(error);
      }
    });
  }

  static getGifs() {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await firebase
          .database()
          .ref("gif")
          .once("value");

        resolve(response.val());
      } catch (error) {
        reject(error);
      }
    });
  }

  static postGameGifs(item) {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await firebase
          .database()
          .ref("game_gif")
          .push(item);

        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  }

  static postInitGifs(item) {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await firebase
          .database()
          .ref("gif")
          .push(item);

        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  }

  static postNewStorageImage(file) {
    return new Promise(async (resolve, reject) => {
      try {
        let timestamp = Number(new Date());
        await firebase
          .storage()
          .ref()
          .child(`games/${timestamp}${file.name}`)
          .put(file);

        let starsRef = await firebase
          .storage()
          .ref()
          .child(`games/${timestamp}${file.name}`);

        starsRef
          .getDownloadURL()
          .then(function(url) {
            resolve(url);
          })
          .catch(function(error) {
            switch (error.code) {
              case "storage/object-not-found":
                resolve(error.code);
                break;
              case "storage/unauthorized":
                resolve(error.code);
                break;
              case "storage/canceled":
                resolve(error.code);
                break;
              case "storage/unknown":
                resolve(error.code);
                break;
              default:
                reject(error);
            }
          });
      } catch (error) {
        reject(error);
      }
    });
  }

  static postNewGifs(item) {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await firebase
          .database()
          .ref("gif")
          .push(item);

        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  }
}
