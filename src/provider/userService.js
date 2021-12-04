import firebase from "../firebase.js";

export default class UserService {
  static getMyUser(uid) {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await firebase
          .database()
          .ref("users")
          .orderByChild("uid")
          .equalTo(uid)
          .once("value");

        resolve(response.val());
      } catch (error) {
        reject(error);
      }
    });
  }

  static postUser(uid, name, email, password, avatar, nickname, date) {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await firebase
          .database()
          .ref("users")
          .push({
            uid: uid,
            name: name,
            email: email,
            password: password,
            avatar: avatar,
            nickname: nickname,
            date: date,
          });
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  }
}
