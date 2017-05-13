import { combineReducers } from 'redux';
import pagesReducer from './reducerPage';
import facebookReducer from './reducerFacebook';
import firebaseReducer from './reducerFirebase';

const rootReducer = combineReducers({
    page: pagesReducer,
    facebook: facebookReducer,
    firebase: firebaseReducer
});

export default rootReducer;
