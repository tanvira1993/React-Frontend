import { combineReducers } from "redux";
import { 
  IntlReducer as Intl, 
  // IntlProvider 
} from "react-redux-multilingual";

// Import custom reducers
import usersReducer from "./users";
import adminLoginReducer from "./login";
import productReducer from "./products";

const rootReducer = combineReducers({
  users: usersReducer, 
  adminLogin : adminLoginReducer,
  products : productReducer,
  Intl,
});

export default rootReducer;
