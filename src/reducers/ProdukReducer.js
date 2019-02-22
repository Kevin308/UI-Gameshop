import {
    DETAIL_PRODUCT
} from '../actions/types';

const INITIAL_STATE = { 
    id: 0, 
    nama: '', 
    konsol: '',
    status: '', 
    harga: 0, 
    desc: '', 
    img: '' 
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case DETAIL_PRODUCT :
            return action.payload;
        default :
            return state;
    }
}