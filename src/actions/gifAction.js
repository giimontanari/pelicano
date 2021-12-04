import GifService from "../provider/gifService";
import { ACT_APP_CHANGE, ACT_GIF_CHANGE } from "./typesAction";

export function actGetGifsByGame(id, callback) {
  return (dispatch) => {
    dispatch({
      type: ACT_APP_CHANGE,
      props: {
        loading: true,
      },
    });
    asyncGetGifsByGame(id)
      .then((response) => {
        dispatch({
          type: ACT_GIF_CHANGE,
          props: {
            listOfGif: Object.values(response),
          },
        });
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
        callback("ERROR", error);
      });
  };
}

async function asyncGetGifsByGame(id) {
  try {
    let response = await GifService.getGifsByGame(id);
    return response;
  } catch (error) {
    return error;
  }
}

export function actGetGifs(callback) {
  return (dispatch) => {
    dispatch({
      type: ACT_APP_CHANGE,
      props: {
        loading: true,
      },
    });
    asyncGetGifs()
      .then((response) => {
        let arrResult = Object.values(response);
        dispatch({
          type: ACT_GIF_CHANGE,
          props: {
            listOfAllGifs: arrResult.map((a) => {
              return { ...a, check: false, order: 0 };
            }),
            total: arrResult.length,
          },
        });
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
        callback("ERROR", error);
      });
  };
}

async function asyncGetGifs() {
  try {
    let response = await GifService.getGifs();
    return response;
  } catch (error) {
    return error;
  }
}

export function actChangeGifCheckProps(props) {
  return (dispatch) => {
    dispatch({
      type: ACT_APP_CHANGE,
      props: props,
    });
  };
}

export function actPostGameGifs(item, callback) {
  return (dispatch) => {
    dispatch({
      type: ACT_APP_CHANGE,
      props: {
        loading: true,
      },
    });
    asyncPostGameGifs(item)
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

async function asyncPostGameGifs(item) {
  try {
    let response = await GifService.postGameGifs(item);
    return response;
  } catch (error) {
    return error;
  }
}

export function actPostInitGif(item, callback) {
  return (dispatch) => {
    dispatch({
      type: ACT_APP_CHANGE,
      props: {
        loading: true,
      },
    });
    asyncPostInitGifs(item)
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

async function asyncPostInitGifs(item) {
  try {
    let response = await GifService.postInitGifs(item);
    return response;
  } catch (error) {
    return error;
  }
}

export function actPostNewGif(item, callback) {
  return (dispatch) => {
    dispatch({
      type: ACT_APP_CHANGE,
      props: {
        loading: true,
      },
    });
    asyncPostNewGif(item)
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

async function asyncPostNewGif(item) {
  try {
    let response = await GifService.postNewGifs(item);
    return response;
  } catch (error) {
    return error;
  }
}

export function actPostNewStorageImage(file, callback) {
  return (dispatch) => {
    dispatch({
      type: ACT_APP_CHANGE,
      props: {
        loading: true,
      },
    });
    asyncPostNewStorageImage(file)
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

async function asyncPostNewStorageImage(file) {
  try {
    let response = await GifService.postNewStorageImage(file);
    return response;
  } catch (error) {
    return error;
  }
}
