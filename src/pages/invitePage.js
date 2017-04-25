import React, { Component } from 'react';
import autoBind from '../hoc/autoBind';
import TopNav from '../components/topNav';

class invitePage extends Component {
    render() {
        return (
            <div>
                <TopNav page="invite" />
                <section data-role="push-up">
                    <div className="w3-panel w3-whale-blue-l2" data-role="header">
                        <p>Invite</p>
                    </div>
                    <div className="text-center" data-role="content">
                        <div className="w3-card-2 w3-white" style={{'margin': '10px', 'textAlign': 'left'}}>
                            <div className="w3-container w3-blue">
                                <h2>Create new event</h2>
                            </div>
                            <form className="w3-container">
                                <p>
                                    <label>Event Name</label>
                                    <input className="w3-input" type="text" />
                                </p>
                                <p>
                                    <label>Date</label>
                                    <input className="w3-input" type="text" />
                                </p>
                                <p>
                                    <label>Time</label>
                                    <input className="w3-input" type="text" />
                                </p>
                                <p>
                                    <label>Location</label>
                                    <input className="w3-input" type="text" />
                                </p>
                                <p>
                                    <label>Contact</label>
                                    <input className="w3-input" type="text" />
                                </p>
                            </form>
                        </div>
                        <div className="w3-card-2 w3-white" style={{'margin': '10px', 'textAlign': 'left'}}>
                            <div className="w3-container w3-green w3-hover-red" style={{'padding': '10px 20px', 'fontSize': '1.2em'}}>
                                <span>Okay</span>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default autoBind(invitePage);
