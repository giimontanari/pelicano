import firebase from "../firebase.js";

export default class GameService {
  static getGames() {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await firebase
          .database()
          .ref("games")
          .once("value");

        resolve(response.val());
      } catch (error) {
        reject(error);
      }
    });
  }

  static getMyGames(uid) {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await firebase
          .database()
          .ref("games")
          .orderByChild("uid")
          .equalTo(uid)
          .once("value");

        resolve(response.val());
      } catch (error) {
        reject(error);
      }
    });
  }

  static postGame(
    id,
    name,
    description,
    instructions,
    category,
    user,
    uid,
    type,
    info
  ) {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await firebase
          .database()
          .ref("games")
          .push({
            id: id,
            name: name,
            description: description,
            instructions: instructions,
            category: category,
            user: user,
            uid: uid,
            type: type,
            lanes: info,
          });

        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  }
}
