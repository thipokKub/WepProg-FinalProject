import React, { Component } from 'react';
import autoBind from '../hoc/autoBind';
import TopNav from '../components/topNav';
import Calendar from '../components/calendar';
//import { generateUniqueID } from '../actions/common';

class calendarPage extends Component {

    constructor(props) {
        super(props);
        this.onClickTest = this.onClickTest.bind(this);
    }

    onClickTest() {
        this.props.facebook_sign_in()
    }

    render() {
        //console.log(generateUniqueID("event=", "", 3))
        return (
            <div>
                <button className="w3-button w3-green" onClick={this.onClickTest}>Test</button>
                <TopNav page="calendar" />
                <Calendar />
            </div>
        );
    }
}

export default autoBind(calendarPage);
