import * as types from '../actions/types';

const initialState = {
    user: null,
    event: {
        info: null,
        is_fail: false
    },
    events: [],
    event_list: {
        pending: [],
        joined: [],
        rejected: [],
        author: [],
        isFetch: false,
        isLoading: false,
        isError: false
    }
}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.FiB_GET_USER:
            return ({
                ...state,
                user: action.payload
            });
        case types.FiB_GET_EVENT:
            return ({
                ...state,
                event: {
                    info: action.payload,
                    is_fail: false
                }
            });
        case types.FiB_GET_ALL_LIST_EVENT_SUCCESS:
            return ({
                ...state,
                event_list: {
                    pending: action.payload.pending,
                    joined: action.payload.joined,
                    rejected: action.payload.rejected,
                    author: action.payload.author,
                    isFetch: true,
                    isLoading: false,
                    isError: false
                }
            });
        case types.FiB_GET_ALL_LIST_EVENT_FAIL:
            return ({
                ...state,
                event_list: {
                    pending: [],
                    joined: [],
                    rejected: [],
                    author: [],
                    isFetch: true,
                    isLoading: false,
                    isError: true
                }
            });
        case types.FiB_GET_ALL_LIST_EVENT_PENDING:
            return ({
                ...state,
                event_list: {
                    pending: state.event_list.pending,
                    joined: state.event_list.joined,
                    rejected: state.event_list.rejected,
                    author: state.event_list.author,
                    isFetch: false,
                    isLoading: true,
                    isError: false
                }
            });
        case types.FiB_GET_EVENT_LIST:
            return ({
                ...state,
                events: action.payload
            });
        case types.FiB_GET_EVENT_FAIL:
            return ({
                ...state,
                event: {
                    info: null,
                    is_fail: true
                }
            });
        default:
            return state;
    }
}
