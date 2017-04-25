import * as types from '../actions/types';

const initialState = {
    modal_element: null,
    is_modal_shown: false
}

export default (state = initialState, action) => {
    switch(action.type) {
        case types.SET_MODAL:
            return ({
                ...state,
                modal_element: action.payload
            })
        case types.RESET_MODAL:
            return ({
                ...state,
                modal_element: null,
                is_modal_shown: false
            });
        case types.TOGGLE_MODAL:
            return ({
                ...state,
                is_modal_shown: !state.is_modal_shown
            });
        default:
            return state;
    }
}
