import {
    USER_LOGIN_SUCCESS,
    ADMIN_LOGIN,
    AUTH_SYSTEM_ERROR, 
    LOGOUT,
    CHECK_COOKIE
} from '../actions/types';

const INITIAL_STATE = { username: '', role: '', error: '', cookie: false};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case USER_LOGIN_SUCCESS :
            return {...INITIAL_STATE, username: action.payload, cookie: true};
        case ADMIN_LOGIN :
            return {...INITIAL_STATE, username: action.payload};    
        case AUTH_SYSTEM_ERROR :
            return {...state, error: action.payload, cookie: true};
        case CHECK_COOKIE :
            return {...INITIAL_STATE, cookie: true};
        case LOGOUT :
            return {...INITIAL_STATE, cookie: true};   
        default :
            return state;
    }
}