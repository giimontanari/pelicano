import firebase from "../firebase.js";

export default class AppService {
  static getAvatars(index) {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await firebase
          .storage()
          .ref()
          .child("avatars");

        let image = response.child(`${index}.png`);
        image.getDownloadURL().then(url => resolve(url));
      } catch (error) {
        reject(error);
      }
    });
  }
}
