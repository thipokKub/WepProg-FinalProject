import React, { Component } from 'react';
import autoBind from '../hoc/autoBind';
import TopNav from '../components/topNav';
import Calendar from '../components/calendar';
import axios from 'axios';
//import { generateUniqueID } from '../actions/common';

class calendarPage extends Component {

    constructor(props) {
        super(props);
        this.onClickTest = this.onClickTest.bind(this);
        this.onClickTest2 = this.onClickTest2.bind(this);
    }

    componentWillMount() {
        if(!this.props.facebook.result) {
            this.props.context.router.push('/');
        }
    }

    onClickTest() {
        if(!this.props.facebook.is_login)  this.props.facebook_sign_in();
        else axios.get(`https://graph.facebook.com/me/friends?access_token=${this.props.facebook.result.credential.accessToken}`).then((data) => {
            console.log(data.data);
        }).catch((err) => {
            console.log(err);
        });

    }

    onClickTest2() {
        this.props.firebase_user_get();
    }

    render() {
        //console.log(generateUniqueID("event=", "", 3))
        return (
            <div>
                <TopNav page="calendar" facebook={this.props.facebook} facebookLogin={this.props.facebook_sign_in} isFacebookLogin={(this.props.facebook.result) ? true : false}/>
                <Calendar onSetModal={this.props.set_modal} onToggleModal={this.props.toggle_modal} />
            </div>
        );
    }
}

export default autoBind(calendarPage);
