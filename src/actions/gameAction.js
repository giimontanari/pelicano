import GameService from "../provider/gameService";
import { ACT_APP_CHANGE, ACT_GAME_CHANGE } from "./typesAction";

export function actGetGames() {
  return (dispatch) => {
    dispatch({
      type: ACT_APP_CHANGE,
      props: {
        loading: true,
      },
    });
    asyncGetGames()
      .then((response) => {
        dispatch({
          type: ACT_GAME_CHANGE,
          props: {
            games: Object.values(response),
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

async function asyncGetGames() {
  try {
    let response = await GameService.getGames();
    return response;
  } catch (error) {
    return error;
  }
}

export function actGetMyGames(uid) {
  return (dispatch) => {
    dispatch({
      type: ACT_APP_CHANGE,
      props: {
        loading: true,
      },
    });
    asyncGetMyGames(uid)
      .then((response) => {
        dispatch({
          type: ACT_GAME_CHANGE,
          props: {
            myGames: response ? Object.values(response) : [],
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

async function asyncGetMyGames(uid) {
  try {
    let response = await GameService.getMyGames(uid);
    return response;
  } catch (error) {
    return error;
  }
}

export function actChangeGamesProps(props) {
  return (dispatch, getStore) => {
    dispatch({
      type: ACT_GAME_CHANGE,
      props: props,
    });
  };
}

export function actPostGame(
  id,
  name,
  description,
  instructions,
  category,
  user,
  uid,
  type,
  info,
  callback
) {
  return (dispatch) => {
    dispatch({
      type: ACT_APP_CHANGE,
      props: {
        loading: true,
      },
    });
    asyncPostGame(
      id,
      name,
      description,
      instructions,
      category,
      user,
      uid,
      type,
      info
    )
      .then((response) => {
        dispatch({
          type: ACT_APP_CHANGE,
          props: {
            loading: false,
          },
        });
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

async function asyncPostGame(
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
  try {
    let response = await GameService.postGame(
      id,
      name,
      description,
      instructions,
      category,
      user,
      uid,
      type,
      info
    );
    return response;
  } catch (error) {
    return error;
  }
}
