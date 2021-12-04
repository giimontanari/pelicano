import WorkplanService from "../provider/workplanService";
import { ACT_APP_CHANGE, ACT_WORKPLAN_CHANGE } from "./typesAction";

export function actGetWorkplan(uid) {
  return (dispatch) => {
    dispatch({
      type: ACT_APP_CHANGE,
      props: {
        loading: true,
      },
    });
    asyncGetWorkplan(uid)
      .then((response) => {
        dispatch({
          type: ACT_WORKPLAN_CHANGE,
          props: {
            workplanList: response ? Object.entries(response) : [],
          },
        });
        dispatch({
          type: ACT_APP_CHANGE,
          props: {
            loading: false,
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

async function asyncGetWorkplan(uid) {
  try {
    let response = await WorkplanService.getWorkplan(uid);
    return response;
  } catch (error) {
    return error;
  }
}

export function actChangeWorkplanProps(props) {
  return (dispatch, getStore) => {
    dispatch({
      type: ACT_WORKPLAN_CHANGE,
      props: props,
    });
  };
}

export function actPostWorkplan(email, name, comments, items, uid, callback) {
  return (dispatch) => {
    dispatch({
      type: ACT_APP_CHANGE,
      props: {
        loading: true,
      },
    });
    asyncPostWorkplan(email, name, comments, items, uid)
      .then((response) => {
        dispatch({
          type: ACT_APP_CHANGE,
          props: {
            loading: false,
          },
        });
        callback(response);
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

async function asyncPostWorkplan(email, name, comments, items, uid) {
  try {
    let response = await WorkplanService.postWorkplan(
      email,
      name,
      comments,
      items,
      uid
    );
    return response;
  } catch (error) {
    return error;
  }
}

export function actPutWorkplan(
  email,
  name,
  comments,
  items,
  uid,
  id,
  callback
) {
  return (dispatch) => {
    dispatch({
      type: ACT_APP_CHANGE,
      props: {
        loading: true,
      },
    });
    asyncPutWorkplan(email, name, comments, items, uid, id)
      .then((response) => {
        dispatch({
          type: ACT_APP_CHANGE,
          props: {
            loading: false,
          },
        });
        callback(response);
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

async function asyncPutWorkplan(email, name, comments, items, uid, id) {
  try {
    let response = await WorkplanService.putWorkplan(
      email,
      name,
      comments,
      items,
      uid,
      id
    );
    return response;
  } catch (error) {
    return error;
  }
}

export function actPutScoreGameWorkplan(scoresGame, gamePos, id, callback) {
  return (dispatch) => {
    dispatch({
      type: ACT_APP_CHANGE,
      props: {
        loading: true,
      },
    });
    asyncPutScoreGameWorkplan(scoresGame, gamePos, id)
      .then((response) => {
        dispatch({
          type: ACT_APP_CHANGE,
          props: {
            loading: false,
          },
        });
        callback(response);
      })
      .catch((error) => {
        dispatch({
          type: ACT_APP_CHANGE,
          props: {
            loading: false,
          },
        });
        callback("ERROR", error);
      });
  };
}

async function asyncPutScoreGameWorkplan(scoresGame, gamePos, id) {
  try {
    let response = await WorkplanService.putScoreWorkplan(
      scoresGame,
      gamePos,
      id
    );
    return response;
  } catch (error) {
    return error;
  }
}
export function actRemoveWorkplan(id, callback) {
  return (dispatch) => {
    dispatch({
      type: ACT_APP_CHANGE,
      props: {
        loading: true,
      },
    });
    asyncRemoveWorkplan(id)
      .then((response) => {
        dispatch({
          type: ACT_APP_CHANGE,
          props: {
            loading: false,
          },
        });
        callback(response);
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

async function asyncRemoveWorkplan(id) {
  try {
    let response = await WorkplanService.removeWorkplan(id);
    return response;
  } catch (error) {
    return error;
  }
}

export function actGetWorkplanAssigned(email, callback) {
  return (dispatch) => {
    dispatch({
      type: ACT_APP_CHANGE,
      props: {
        loading: true,
      },
    });
    asyncGetWorkplanAssigned(email)
      .then((response) => {
        callback(Object.entries(response));
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

async function asyncGetWorkplanAssigned(email) {
  try {
    let response = await WorkplanService.getWorkplanAssigned(email);
    return response;
  } catch (error) {
    return error;
  }
}
