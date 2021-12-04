import { ACT_USER_CHANGE } from "../actions/typesAction";

const initialState = {
  user: {},
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case ACT_USER_CHANGE:
      return Object.assign({}, state, action.props);
    default:
      return state;
  }
}
