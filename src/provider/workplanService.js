import firebase from "../firebase.js";

export default class WorkplanService {
  static getWorkplan(uid) {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await firebase
          .database()
          .ref("workplan")
          .orderByChild("uid")
          .equalTo(uid)
          .once("value");

        resolve(response.val());
      } catch (error) {
        reject("ERROR", error);
      }
    });
  }

  static postWorkplan(email, name, comments, items, uid) {
    return new Promise(async (resolve, reject) => {
      try {
        await firebase
          .database()
          .ref("workplan")
          .push({
            email: email,
            name: name,
            comments: comments,
            games: items,
            uid: uid,
          })
          .on(
            "value",
            (snap) => resolve("SUCCESS", snap.val()),
            (error) => reject("ERROR", error)
          );
      } catch (error) {
        reject("ERROR", error);
      }
    });
  }

  static putWorkplan(email, name, comments, items, uid, id) {
    return new Promise(async (resolve, reject) => {
      try {
        await firebase
          .database()
          .ref("workplan")
          .child(id)
          .update(
            {
              email: email,
              name: name,
              comments: comments,
              games: items,
              uid: uid,
            },
            (error) => {
              if (error) {
                reject("ERROR", error);
              } else {
                resolve("SUCCESS");
              }
            }
          );
      } catch (error) {
        reject("ERROR", error);
      }
    });
  }

  static putScoreWorkplan(scoresGame, gamePos, id) {
    return new Promise(async (resolve, reject) => {
      try {
        await firebase
          .database()
          .ref("workplan")
          .child(id)
          .child("games")
          .child(gamePos)
          .update(
            {
              scores: scoresGame,
            },
            (error) => {
              if (error) {
                reject("ERROR", error);
              } else {
                resolve("SUCCESS");
              }
            }
          );
      } catch (error) {
        reject("ERROR", error);
      }
    });
  }

  static removeWorkplan(id) {
    return new Promise(async (resolve, reject) => {
      try {
        await firebase
          .database()
          .ref("workplan")
          .child(id)
          .remove();

        resolve("SUCCESS");
      } catch (error) {
        reject("ERROR", error);
      }
    });
  }

  static getWorkplanAssigned(email) {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await firebase
          .database()
          .ref("workplan")
          .orderByChild("email")
          .equalTo(email)
          .once("value");

        resolve(response.val());
      } catch (error) {
        reject(error);
      }
    });
  }
}
