import UserService from "../provider/userService";
import { ACT_APP_CHANGE, ACT_USER_CHANGE } from "./typesAction";

export function actGetMyUser(uid) {
  return (dispatch) => {
    dispatch({
      type: ACT_APP_CHANGE,
      props: {
        loading: true,
      },
    });
    asyncGetMyUser(uid)
      .then((response) => {
        dispatch({
          type: ACT_USER_CHANGE,
          props: {
            user:
              Object.values(response).length > 0
                ? Object.values(response)[0]
                : {},
          },
        });
        localStorage.setItem("login", true);
        localStorage.setItem("uid", uid);
        localStorage.setItem("avatar", Object.values(response)[0].avatar);
        localStorage.setItem("email", Object.values(response)[0].email);
        localStorage.setItem("type", Object.values(response)[0].type);
        localStorage.setItem("nickname", Object.values(response)[0].nickname);
        dispatch({
          type: ACT_APP_CHANGE,
          props: {
            loading: false,
            login: true,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: ACT_APP_CHANGE,
          props: {
            loading: false,
          },
        });
      });
  };
}

async function asyncGetMyUser(uid) {
  try {
    let response = await UserService.getMyUser(uid);
    return response;
  } catch (error) {
    return error;
  }
}

export function actChangeGamesProps(props) {
  return (dispatch, getStore) => {
    dispatch({
      type: ACT_USER_CHANGE,
      props: props,
    });
  };
}

export function actPostUser(
  uid,
  name,
  email,
  password,
  avatar,
  nickname,
  date,
  type,
  callback
) {
  return (dispatch) => {
    dispatch({
      type: ACT_APP_CHANGE,
      props: {
        loading: true,
      },
    });
    asyncPostUser(uid, name, email, password, avatar, nickname, date, type)
      .then((response) => {
        dispatch({
          type: ACT_APP_CHANGE,
          props: {
            loading: false,
            login: true,
          },
        });
        localStorage.setItem("login", true);
        localStorage.setItem("uid", uid);
        localStorage.setItem("avatar", avatar);
        localStorage.setItem("email", email);
        localStorage.setItem("nickname", nickname);
        localStorage.setItem("type", type);
        callback("SUCCESS");
      })
      .catch((error) => {
        dispatch({
          type: ACT_APP_CHANGE,
          props: {
            loading: false,
          },
        });
        callback("ERROR");
      });
  };
}

async function asyncPostUser(
  uid,
  name,
  email,
  password,
  avatar,
  nickname,
  date
) {
  try {
    let response = await UserService.postUser(
      uid,
      name,
      email,
      password,
      avatar,
      nickname,
      date
    );
    return response;
  } catch (error) {
    return error;
  }
}
