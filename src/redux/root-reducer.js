import { combineReducers } from "redux";

import userReducer from "./user/user.reducer";
import linkReducer from "./links/link.reducer";
import stylesReducer from "./styles/styles.reducer";

export default combineReducers({
  user: userReducer,
  links: linkReducer,
  styles: stylesReducer
});
