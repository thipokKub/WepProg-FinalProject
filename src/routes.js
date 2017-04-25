import React, { Component, PropTypes } from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './pages/app';
import HomePage from './pages/homePage';
import CalendarPage from './pages/calendarPage';
import InvitePage from './pages/invitePage';
import ProfilePage from './pages/profilePage';

class FallbackPage extends Component {

    static contextTypes = {
        router: PropTypes.object
    }

    constructor(props) {
        super(props);
        this.state = {
            'secondsLeft': 3
        };
    }

    componentDidMount() {
        let interval = setInterval(() => {
            if(this.state.secondsLeft === 0) {
                clearInterval(interval);
                this.context.router.push('/');
            }
            else {
                this.setState({
                    ...(this.state),
                    secondsLeft: (this.state.secondsLeft - 1)
                });
            }
        }, 1000);
    }

    render() {
        return (
            <div className="main-content" style={{'paddingTop': '65px', 'display': 'flex', 'width': '100%', 'height': 'calc(100vh - 65px)', 'alignItems': 'center', 'justifyContent': 'center'}}>
                <div style={{'textAlign': 'center', 'padding': '20px', 'border': '2px solid rgba(0, 0, 0, 0.5)', 'width': '200px', 'height': '50px', 'borderRadius': '5px', 'display': 'flex', 'alignItems': 'center', 'justifyContent': 'center'}}>
                    This page does not exist. Redirect in {this.state.secondsLeft} seconds
                </div>
            </div>
        );
    }
}

export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage} />
        <Route path="calendar" component={CalendarPage} />
        <Route path="invite" component={InvitePage} />
        <Route path="profile" component={ProfilePage} />
        <Route path="*" component={FallbackPage} />
    </Route>
);
