import axios from 'axios';
import {
    USER_LOGIN_SUCCESS,
    AUTH_SYSTEM_ERROR,
    AUTH_SYSTEM_ERROR_LOGIN, 
    AUTH_SYSTEM_ERROR_REGISTER,
    LOGOUT,
    CHECK_COOKIE,
    SEARCH,
    DETAIL_PRODUCT,
    DETAIL_HISTORY,
    URL_API
} from './types';

export const onAppRender = () => {
    return { type : CHECK_COOKIE }
}

export const onAppRefresh = (username) => {
    return (dispatch) => {
        axios.get(URL_API + '/auth/keeplogin/' + username) 
        .then((res) => {
            console.log('masuk then')
            if(res.data.length > 0){
                console.log('masuk if')
                dispatch({ 
                    type: USER_LOGIN_SUCCESS, 
                    payload: {
                        id: res.data[0].id,
                        username: res.data[0].username,
                        password: res.data[0].password,
                        email: res.data[0].email,
                        role: res.data[0].role
                    } 
                })
            }
            else {
                console.log('tidak masuk if')
            }
        }).catch((err) => {
            console.log('gagal')
            console.log(err)
        })
    }
}

export const onUserLogout = () => {
    return { type : LOGOUT } 
}

export const DetailProductOnClick = (item) => {
    console.log(item.image)
    return {
        type : DETAIL_PRODUCT,
        payload : item
    }
}

export const SearchOnClick = (search) => {
    return {
        type : SEARCH,
        payload : search
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
                dispatch({ 
                    type: USER_LOGIN_SUCCESS, 
                    payload: {
                        id: res.data[0].id,
                        username: res.data[0].username,
                        password: res.data[0].password,
                        email: res.data[0].email,
                        role: res.data[0].role
                    } 
                })  
            }
            else {
                dispatch({ type: AUTH_SYSTEM_ERROR_LOGIN, payload: 'username or password invalid'})
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
                    dispatch({ 
                        type: USER_LOGIN_SUCCESS, 
                        payload: {
                            id: res.data[0].id,
                            username: res.data[0].username,
                            password: res.data[0].password,
                            email: res.data[0].email,
                            role: res.data[0].role
                        }  
                    })
                }
                else {
                    dispatch({ type: AUTH_SYSTEM_ERROR_REGISTER, payload: res.data.message})
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
                if(res.data) {
                    axios.delete(URL_API + '/belanja/deletecheckout/' + user)
                .then((res) => {
                    console.log(res)
                }).catch((err) => {
                    console.log('kena catchnya axios.delete');
                })
                }
            })
        }
    }
}