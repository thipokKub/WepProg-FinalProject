import React, { Component } from 'react';
import autoBind from '../hoc/autoBind';
import TopNav from '../components/topNav';

class profilePage extends Component {
    render() {
        return (
            <div>
                <TopNav page="profile" />
                <section data-role="push-up">
                    <div className="w3-panel w3-whale-blue-l2" data-role="header">
                        <p>Profile</p>
                    </div>
                    <div className="text-center" data-role="content">

                    </div>
                </section>
            </div>
        );
    }
}

export default autoBind(profilePage);
