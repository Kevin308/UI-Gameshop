import {
    USER_LOGIN_SUCCESS,
    AUTH_SYSTEM_ERROR, 
    AUTH_SYSTEM_ERROR_LOGIN,
    AUTH_SYSTEM_ERROR_REGISTER,
    LOGOUT,
    CHECK_COOKIE
} from '../actions/types';

const INITIAL_STATE = { 
    id: 0,
    username: '',
    password: '',
    email: '', 
    role: '', 
    error: '',
    errorlogin: '',
    errorregister: '',
    cookie: false};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case USER_LOGIN_SUCCESS :
            return {
                ...INITIAL_STATE,
                id: action.payload.id,
                username: action.payload.username,
                password: action.payload.password,
                email: action.payload.email,
                role: action.payload.role,
                cookie: true};
        case AUTH_SYSTEM_ERROR :
            return {...state, error: action.payload, cookie: true};
        case AUTH_SYSTEM_ERROR_LOGIN :
            return {...state, errorlogin: action.payload, cookie: true};
        case AUTH_SYSTEM_ERROR_REGISTER :
            return {...state, errorregister: action.payload, cookie: true};
        case CHECK_COOKIE :
            return {...INITIAL_STATE, cookie: true};
        case LOGOUT :
            return {...INITIAL_STATE, cookie: true};   
        default :
            return state;
    }
}