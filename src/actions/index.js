import * as types from './types';
import Firebase from 'firebase';
import { store } from '../index';
import { setCookie, getCookie, clearAllCookie } from './common';

const fb_config = {
    "apiKey": "AIzaSyA7EHt0f2ynaCTw_-A7hKsQPB7JFMlTz5c",
    "authDomain": "final-project-47729.firebaseapp.com",
    "databaseURL": "https://final-project-47729.firebaseio.com",
    "projectId": "final-project-47729",
    "storageBucket": "final-project-47729.appspot.com",
    "messagingSenderId": "662887124338"
}

Firebase.initializeApp(fb_config);

let FacebookProvider = new Firebase.auth.FacebookAuthProvider();
['public_profile', 'user_friends', 'email'].map((item, key) => {
    FacebookProvider.addScope(item);
    return null;
});

//const fb = new Firebase('');

export function facebook_sign_in() {
    store.dispatch({
        type: types.FB_LOGIN_PENDING,
    });

    return ((dispatch) => {
        Firebase.auth().signInWithPopup(FacebookProvider).then(function(result) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;
            // // The signed-in user info.
            // var user = result.user;

            setCookie("fb_token", token, 6*60*60);

            dispatch({
                type: types.FB_LOGIN_SUCCESS,
                payload: result
            })

            // ...
        }).catch(function(error) {
            // Handle Errors here.
            // var errorCode = error.code;
            // var errorMessage = error.message;
            // // The email of the user's account used.
            // var email = error.email;
            // // The firebase.auth.AuthCredential type that was used.
            // var credential = error.credential;
            // ...
            //console.log(errorCode, errorMessage, email, credential);

            dispatch({
                type: types.FB_LOGIN_FAIL,
                payload: error
            })
        });
    });
}

export function set_modal(modal) {
    return ({
        type: types.SET_MODAL,
        payload: modal
    })
}

export function reset_modal() {
    return ({
        type: types.RESET_MODAL
    });
}

export function toggle_modal() {
    return ({
        type: types.TOGGLE_MODAL
    });
}
