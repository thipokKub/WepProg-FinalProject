import * as types from '../actions/types';

const initialState = {
    result: null,
    error: null,
    is_pending: false,
    is_error: false,
    is_login: false
}

export default (state = initialState, action) => {
    switch(action.type) {
        case types.FB_LOGIN_PENDING:
            return ({
                ...state,
                is_pending: true,
                is_error: false,
                is_login: false
            });
        case types.FB_LOGIN_SUCCESS:
            return ({
                ...state,
                is_pending: false,
                result: action.payload,
                is_error: false,
                is_login: true
            });
        case types.FB_LOGIN_REFRESH: {
            let newResult = { ...state.result };
            if(typeof(newResult.user) === "undefined") newResult.user = { providerData: [{}] };
            if(newResult['user']['providerData'].constructor !== Array) newResult['user']['providerData'] = [{}];
            newResult['user']['providerData'][0] = {
                ...newResult.user.providerData[0],
                ...action.payload
            }

            return ({
                ...state,
                is_pending: false,
                result: newResult,
                is_error: false,
                is_login: true
            });
        }
        case types.FB_LOGIN_FAIL:
            return ({
                ...state,
                is_pending: false,
                error: action.payload,
                is_error: true,
                is_login: false
            });
        default:
            return state;
    }
}
