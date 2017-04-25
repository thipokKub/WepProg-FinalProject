import { combineReducers } from 'redux';
import pagesReducer from './reducerPage';
import facebookReducer from './reducerFacebook';

const rootReducer = combineReducers({
    page: pagesReducer,
    facebook: facebookReducer
});

export default rootReducer;
