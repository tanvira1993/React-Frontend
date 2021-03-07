import {
    ADMIN_LOGIN_START,
    ADMIN_LOGIN_SUCCESS,
    ADMIN_LOGIN_FAILURE
} from "../constants/ActionTypes";

const initialState = {
    isLoggedIn: false,
    email: '',
    authInfo:''
};
    
export default function adminLoginReducer(state = initialState, action) {

    switch(action.type){
        case ADMIN_LOGIN_START:
			return {
				...state,
				isLoggedIn: false,
                authInfo: ''
			}
		case ADMIN_LOGIN_SUCCESS:
			return {
                ...state,
                isLoggedIn: true,
                email: action.email,
                authInfo: action.token,
                error: ''
            }
		case ADMIN_LOGIN_FAILURE:
			return {
                ...state,
                isLoggedIn: false,
                email: '',
                authInfo: '',
            }
        default:
    }
    return state;
}