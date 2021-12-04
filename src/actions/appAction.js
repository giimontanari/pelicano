import AppService from "../provider/appService";
import { ACT_APP_CHANGE } from "./typesAction";

export function actChangeAppProps(props) {
  return (dispatch) => {
    dispatch({
      type: ACT_APP_CHANGE,
      props: props,
    });
  };
}

export function actGetAvatar(index) {
  return (dispatch) => {
    asyncGetAvatars(index)
      .then((response) => {
        dispatch({
          type: ACT_APP_CHANGE,
          props: {
            loadAvatar: response,
          },
        });
      })
      .catch((error) => {
        console.log("ERROR ", ErrorEvent);
      });
  };
}

async function asyncGetAvatars(index) {
  try {
    let response = await AppService.getAvatars(index);
    return response;
  } catch (error) {
    return error;
  }
}
