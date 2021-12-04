import { ACT_WORKPLAN_CHANGE } from "../actions/typesAction";

const initialState = {
  workplanList: [],
  workplanItem: null,
  workplanGames: [],
};

export default function workplanReducer(state = initialState, action) {
  switch (action.type) {
    case ACT_WORKPLAN_CHANGE:
      return Object.assign({}, state, action.props);
    default:
      return state;
  }
}
