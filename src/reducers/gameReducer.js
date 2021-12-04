import { ACT_GAME_CHANGE } from "../actions/typesAction";

const initialState = {
  games: [],
  myGames: [],
  gameSelect: null,
  gameIdSelect: "",
  gamePosSelect: null,
  currentLevel: 0,
  gameResult: [],
  originList: [],
  score: 0,
};

export default function gameReducer(state = initialState, action) {
  switch (action.type) {
    case ACT_GAME_CHANGE:
      return Object.assign({}, state, action.props);
    default:
      return state;
  }
}
