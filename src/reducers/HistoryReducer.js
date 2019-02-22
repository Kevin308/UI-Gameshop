import {
    DETAIL_HISTORY
} from '../actions/types';

const INITIAL_STATE = { 
    kodeinvoice: ''
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case DETAIL_HISTORY :
            return { ...INITIAL_STATE, kodeinvoice: action.payload};
        default :
            return state;
    }
}