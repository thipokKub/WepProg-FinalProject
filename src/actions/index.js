/* eslint-disable */
import * as types from './types';
import Firebase from 'firebase';
import { store } from '../index';
import axios from 'axios';
import { setCookie, getCookie, clearAllCookie, generateUniqueID, addIterateObject, addIterateObjectPair } from './common';

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

export function facebook_request_friends_list(callback) {
    if(store.getState().facebook.result) {
        //If login
        axios.get(`https://graph.facebook.com/me/friends?access_token=${store.getState().facebook.result.credential.accessToken}`).then(
            (e) => {
                if(typeof(callback) === "function") {
                    callback(e);
                }
                return e;
            }
        ).catch((e) => {
            return e;
        });
    }
}

export function firebase_event_get(event_id) {
    Firebase.database().ref('events/' + event_id).on('value', (snapshot) => {
        if(snapshot.val() !== null) {
            store.dispatch({
                type: types.FiB_GET_EVENT,
                payload: snapshot.val()
            });
        } else {
            store.dispatch({
                type: types.FiB_GET_EVENT_FAIL
            });
        }
    });
    return { type: null }
}

export function firebase_event_list_get(array_eid) {
    let p = [];
    array_eid.forEach((item) => {
        p.push(
            new Promise((resolve, reject) => {
                Firebase.database().ref('events/' + item + '/meta').on('value', (snapshot) => {
                    if(snapshot.val()) {
                        resolve(snapshot.val());
                    }
                })
            })
        );
    });

    Promise.all(p).then(values => {
        store.dispatch({
            type: types.FiB_GET_EVENT_LIST,
            payload: values
        });
    })

    return { type: null };
}

export function firebase_fid_to_uid(fid, callback) {
    Firebase.database().ref('users-map/' + fid).on('value', (snapshot) => {
        callback(snapshot.val());
    });
    return {
        type: null
    }
}

export function firebase_event_post(event_info) {
    if(typeof(event_info) !== 'undefined') {
        return (dispatch) => {
            const eid = generateUniqueID("event", "", 3);

            let des = {};
            if(typeof(event_info.description) !== 'undefined' && event_info.description.constructor === Array) {
                for(let i = 0; i < event_info.description.length; i++) {
                    des[i] = {
                        content: event_info.description[i].content,
                        type: event_info.description[i].type
                    }
                }
            }

            let date = {};
            //UNIX-time in miliseconds
            if(event_info.date) {
                date = {
                    start: event_info.date.start,
                    end: event_info.date.end,
                    isInterval: ((typeof(event_info.date.end) !== 'undefined' && event_info.date.end !== null) &&  event_info.date.end - event_info.date.start > 0)
                }
            }

            //expected fid
            let mePending = [];
            let rPending = [];
            event_info.pending.forEach((item) => {
                mePending.push(new Promise((resolve, reject) => {
                    firebase_fid_to_uid(item, function(value) {
                        resolve(value);
                    });
                }))
            });

            Firebase.database().ref('users/' + Firebase.auth().currentUser.uid + '/private/eventAuthor').on('value', (snapshot) => {
                let data = snapshot.val();
                data[eid] = true;
                Firebase.database().ref('users/' + Firebase.auth().currentUser.uid + '/private/eventAuthor').set(data);
            })

            Promise.all(mePending).then(values => {
                values.forEach(item => {
                    rPending.push(item.uid);
                });
                return rPending;
            }).then((rPending) => {
                let setEvent = ({
                    'meta': {
                        'author': Firebase.auth().currentUser.uid,
                        'image': event_info['image'],
                        'date': date,
                        'location': event_info.location,
                        'name': event_info.name,
                        'time': (typeof(event_info.time) !== undefined) ? event_info.time : "unknown",
                        'tags': addIterateObject({}, event_info.tags)
                    },
                    'description': des,
                    'joined': {
                        'uid': true
                    },
                    'pending': addIterateObjectPair({}, rPending, {isSingleValue: true, singleValue: true}),
                    'rejected': {
                        'uid': true
                    },

                });

                console.log(setEvent);

                Firebase.database().ref('events/' + eid).set(setEvent);

                if(typeof(event_info.pending) !== "undefined" && event_info.pending.constructor === Array) {
                    rPending.map((item, key) => {
                        new Promise((resolve, reject) => {
                            Firebase.database().ref('users/' + item + '/public/eventRequest').on('value', (snapshot) => {
                                resolve(snapshot.val());
                            });
                        }).then((e) => {
                            let pending = {...e};
                            pending[eid] = true;
                            Firebase.database().ref('users/' + item + '/public/eventRequest').set(pending);
                        })
                    })
                }

                dispatch({ 'type': null })
            })
        }
    }

    else return { 'type': null }
}

export function firebase_user_get(fbResult) {

    firebase_event_post();

    return (dispatch) => {

        Firebase.database().ref('users/' + Firebase.auth().currentUser.uid).on('value', (snapshot) => {
            if(snapshot.val() !== null) {
                dispatch({
                    type: types.FiB_GET_USER,
                    payload: snapshot.val()
                })
            }
            else {
                const facebook_info = (fbResult) ? fbResult : (store.getState().facebook.result) ? store.getState().facebook.result.user : null;
                const me = (store.getState().facebook.result) ? facebook_info.providerData[0] : null;
                const theCallback = function (e) {
                    let friends_list = {};

                    e.data.data.map((item, key) => {
                        friends_list[item.id] = {
                            'fid': item.id,
                            'name': item.name
                        }
                        return null;
                    });

                    const Data = {
                        'meta': {
                            'uid': Firebase.auth().currentUser.uid,
                            'fid': me.uid,
                            'image': me.photoURL,
                            'username': me.displayName
                        },
                        'public': {
                            'eventRequest': {
                                'eid': true
                            }
                        },
                        'private': {
                            'eventAccept': {
                                'eid': true
                            },
                            'eventReject': {
                                'eid': true
                            },
                            'eventAuthor': {
                                'eid': true
                            },
                            'facebook': {
                                'fid': me.uid,
                                'friends_list': friends_list,
                                'image': me.photoURL,
                                'name': me.displayName,
                                'email': me.email
                            }
                        }
                    };

                    Firebase.database().ref('users/' + Firebase.auth().currentUser.uid).set(Data);

                    dispatch({
                        type: types.FiB_GET_USER,
                        payload: Data
                    });
                }
                if(me) {
                    facebook_request_friends_list(theCallback);
                }
            }
        })
    }
}

export function facebook_refresh() {

    const fb_token = getCookie('fb_token');

    if(fb_token.length > 0) {

        let facebook_info = {};

        //Basic info
        const p1 = axios.get(`https://graph.facebook.com/me?fields=name,email,friends&access_token=${fb_token}`
        ).then((e) => {
            return e.data;
        }).catch((e) => {
            return e;
        });

        //High quality picture

        const p2 = axios.get(`https://graph.facebook.com/me/picture?height=720&width=720&access_token=${fb_token}`
        ).then((e) => {
            return e.request.responseURL;
        }).catch((e) => {
            return e;
        });

        //http://graph.facebook.com/user_id/picture

        Promise.all([p1, p2]).then((values) => {
            facebook_info['uid'] = values[0].id;
            facebook_info['displayName'] = values[0].name;
            facebook_info['email'] = values[0].email;
            facebook_info['friends'] = values[0].friends.data;
            facebook_info['photoURL'] = values[1];

            return facebook_info;
        }).then((data) => {
            let facebook_info = data;
            let promiseList = [];

            for(let i = 0; i < facebook_info.friends.length; i++) {
                promiseList.push(axios.get(`http://graph.facebook.com/${facebook_info.friends[i].id}/picture?height=360&width=360`).then(x => x));
            }

            Promise.all(promiseList).then((values) => {
                for(let i = 0; i < promiseList.length; i++) {
                    facebook_info['friends'][i]['photoURL'] = values[i].request.responseURL;
                }

                store.dispatch({
                    type: types.FB_LOGIN_REFRESH,
                    payload: facebook_info
                });

            })

        });
    }
}

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

            facebook_refresh();

            dispatch({
                type: types.FB_LOGIN_SUCCESS,
                payload: result
            });

            Firebase.database().ref('users/' + Firebase.auth().currentUser.uid).on('value', (snapshot) => {
                if(snapshot.val() !== null) {
                    dispatch({
                        type: types.FiB_GET_USER,
                        payload: snapshot.val()
                    })
                }
                else {
                    const me = (result.user) ? result.user.providerData[0] : null;
                    const theCallback = function (e) {
                        let friends_list = {};

                        e.data.data.map((item, key) => {
                            friends_list[item.id] = {
                                'fid': item.id,
                                'name': item.name
                            }
                            return null;
                        });

                        const Data = {
                            'meta': {
                                'uid': Firebase.auth().currentUser.uid,
                                'fid': me.uid,
                                'image': me.photoURL,
                                'username': me.displayName
                            },
                            'public': {
                                'eventRequest': {
                                    'eid': true
                                }
                            },
                            'private': {
                                'eventAccept': {
                                    'eid': true
                                },
                                'eventReject': {
                                    'eid': true
                                },
                                'eventAuthor': {
                                    'eid': true
                                },
                                'facebook': {
                                    'fid': me.uid,
                                    'friends_list': friends_list,
                                    'image': me.photoURL,
                                    'name': me.displayName,
                                    'email': me.email
                                }
                            }
                        };

                        Firebase.database().ref('users/' + Firebase.auth().currentUser.uid).set(Data);
                        Firebase.database().ref('users-map/' + me.uid).set({
                            'fid': me.uid,
                            'uid': Firebase.auth().currentUser.uid
                        });


                        dispatch({
                            type: types.FiB_GET_USER,
                            payload: Data
                        });
                    }
                    if(me) {
                        facebook_request_friends_list(theCallback);
                    }
                }
            })

            return result;

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
