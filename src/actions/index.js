import axios from 'axios';
import {
    USER_LOGIN_SUCCESS,
    ADMIN_LOGIN, 
    AUTH_SYSTEM_ERROR, 
    LOGOUT,
    CHECK_COOKIE,
    DETAIL_PRODUCT,
    DETAIL_HISTORY,
    URL_API
} from './types';

export const onAppRender = () => {
    return { type : CHECK_COOKIE }
}

export const onAppRefresh = (username) => {
    // console.log(username)
    // if(username === 'kevin')
    return { type : USER_LOGIN_SUCCESS , payload: username}
}

export const onUserLogout = () => {
    return { type : LOGOUT } 
}

export const DetailProductOnClick = (item) => {
    return {
        type : DETAIL_PRODUCT,
        payload : item
    }
}

export const DetailHistoryOnClick = (kodeinvoice) => {
    return { type : DETAIL_HISTORY, payload : kodeinvoice }
}

//LOGIN ACTION START
export const onUserLogin = ({ username , password }) => {
    return (dispatch) => {
        axios.post(URL_API + '/auth/login', {
            username,
            password
        })
        .then((res) => {
            // console.log(res)
            if(res.data.length > 0) {
                if(res.data[0].role === 'admin'){
                    dispatch({ type: ADMIN_LOGIN, payload: username })
                }
                else {
                    dispatch({ type: USER_LOGIN_SUCCESS, payload: username })
                }
            }
            else {
                dispatch({ type: AUTH_SYSTEM_ERROR, payload: 'username or password invalid'})
            }
            
        }).catch((err) => {
            console.log(err)
            dispatch({ type: AUTH_SYSTEM_ERROR, payload: 'System Error' });
        })
    }
}


//REGISTER ACTION START
export const onUserRegister = ({ username,email,password}) => {
    return (dispatch) => {
        if(username === '' || email === '' ||  password === '') {
            dispatch({ type: AUTH_SYSTEM_ERROR, payload: 'Semua form diatas wajib diisi'})
        }
        else {
            axios.post(URL_API + '/auth/register', {
                username,
                password,
                email
            }).then((res) =>{
                if(res.data.length > 0) {
                    dispatch({ type: USER_LOGIN_SUCCESS, payload: username })
                }
                else {
                    dispatch({ type: AUTH_SYSTEM_ERROR, payload: res.data.message})
                }
            }).catch((err) => {
                dispatch({ type: AUTH_SYSTEM_ERROR, payload: 'System Error' });                
            })  
        }
        
    }
}

//CHECKOUT BELANJA ACTION
export const onUserOrder = ({ penerima, alamat, jasakirim, user, totalharga }) => {
    return(dispatch) => {
        if(penerima === '' || alamat === '' ||  jasakirim === '') {
            dispatch({ type: AUTH_SYSTEM_ERROR, payload: 'Semua form diatas wajib diisi'})
        }
        else {
            console.log('masuk')
            axios.post(URL_API + '/belanja/checkout', {
                penerima, alamat, jasakirim, user, totalharga
            }).then((res) => {
                axios.delete(URL_API + '/belanja/deletecheckout/' + user)
                .then((res) => {
                    window.alert('Terima kasih telah berbelanja di Gameshop');
                }).catch((err) => {
                    console.log(err);
                })
            })
        }
    }
}