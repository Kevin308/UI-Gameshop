import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import ProdukReducer from './ProdukReducer';
import HistoryReducer from './HistoryReducer';

export default combineReducers({
    auth : AuthReducer,
    produk : ProdukReducer,
    history : HistoryReducer
    
});