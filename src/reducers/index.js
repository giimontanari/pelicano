import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import appReducer from "./appReducer";
import gameReducer from "./gameReducer";
import gifReducer from "./gifReducer";
import userReducer from "./userReducer";
import workplanReducer from "./workplanReducer";

const rootReducer = combineReducers({
  form: formReducer,
  app: appReducer,
  game: gameReducer,
  gif: gifReducer,
  user: userReducer,
  workplan: workplanReducer,
});

export default rootReducer;
