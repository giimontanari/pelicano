import { ACT_APP_CHANGE } from "../actions/typesAction";

const initialState = {
  loading: false,
  login: false,
  name: "",
  uid: "",
  email: "",
  loadAvatar: "",
  change: 0,
};

export default function appReducer(state = initialState, action) {
  if (action.type === ACT_APP_CHANGE) {
    return Object.assign({}, state, action.props);
  }
  return state;
}
