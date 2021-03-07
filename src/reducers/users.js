import {
  USER_CREATE_START,
  USER_CREATE_SUCCESS,
  USER_CREATE_FAILURE,
  
} from "../constants/ActionTypes";

const userslistinitialState = {
  users: [],
  usersLoading: false,
  error: "",
  userCreate: [],
  userCreateLoading: false,
  deleteUser: [],
  deleteUserLoading: false,
  updateUser: "",
  updateUserLoading: false,
  user: [],
  userLoading: false,
};

export default function UserReducer(state = userslistinitialState, action) {
  switch (action.type) {
   
    case USER_CREATE_START:
      return {
        ...state,
        userCreateLoading: true,
      };
    case USER_CREATE_SUCCESS:
      return {
        ...state,
        userCreateLoading: false,
        userCreate: action.createUser,
      };
    case USER_CREATE_FAILURE:
      return {
        ...state,
        error: action.error,
        userCreate: [],
        userCreateLoading: false,
      };
   
    default:
  }

  return state;
}
