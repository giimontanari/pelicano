import { ACT_GIF_CHANGE } from "../actions/typesAction";

const initialState = {
  listOfGif: [],
  listOfSearchGif: [],
  listOfAllGifs: [],
  total: 0,
};

export default function gifReducer(state = initialState, action) {
  switch (action.type) {
    case ACT_GIF_CHANGE:
      return Object.assign({}, state, action.props);
    default:
      return state;
  }
}
