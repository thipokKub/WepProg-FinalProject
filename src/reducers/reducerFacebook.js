import * as types from '../actions/types';

const initialState = {
    result: null,
    error: null,
    is_pending: false,
    is_error: false
}

export default (state = initialState, action) => {
    switch(action.type) {
        case types.FB_LOGIN_PENDING:
            return ({
                ...state,
                is_pending: true,
                is_error: false
            })
        case types.FB_LOGIN_SUCCESS:
            return ({
                ...state,
                is_pending: false,
                result: action.payload,
                is_error: false
            });
        case types.TOGGLE_MODAL:
            return ({
                ...state,
                is_pending: false,
                error: action.payload,
                is_error: true
            });
        default:
            return state;
    }
}
