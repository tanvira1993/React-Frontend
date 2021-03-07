import { combineReducers } from "redux";
import { 
  IntlReducer as Intl, 
  // IntlProvider 
} from "react-redux-multilingual";

// Import custom reducers
import adminLoginReducer from "./login";
import productReducer from "./products";

const rootReducer = combineReducers({
  adminLogin : adminLoginReducer,
  products : productReducer,
  Intl,
});

export default rootReducer;
