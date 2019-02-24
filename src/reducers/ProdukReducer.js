import {
    DETAIL_PRODUCT,
    SEARCH
} from '../actions/types';

const INITIAL_STATE = { 
    id: 0, 
    nama: '', 
    konsol: '',
    status: '', 
    harga: 0, 
    desc: '', 
    image: '',
    search: '' 
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case DETAIL_PRODUCT :
            return action.payload;
        case SEARCH :
            return { ...INITIAL_STATE, search : action.payload };
        default :
            return state;
    }
}