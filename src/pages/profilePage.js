/* eslint-disable */
import React, { Component } from 'react';
import autoBind from '../hoc/autoBind';
import TopNav from '../components/topNav';

class profilePage extends Component {

    componentWillMount() {
        if(!this.props.facebook.result) this.props.context.router.push('/');
    }

    render() {
        const fb = this.props.facebook.result.user.providerData[0];
        return (
            <div>
                <TopNav page="profile" facebook={this.props.facebook} facebookLogin={this.props.facebook_sign_in} isFacebookLogin={(this.props.facebook.result) ? true : false}/>
                <section data-role="push-up">
                    <div className="w3-panel w3-whale-blue-l2" data-role="header">
                        <p>Profile</p>
                    </div>
                    <div className="text-center" data-role="content">
                        <div className="w3-card-2 w3-white" style={{'margin': '10px', 'textAlign': 'left'}}>
                            <div className="w3-container w3-blue" style={{'position': 'relative'}}>
                                <h5>Profile</h5>
                            </div>
                            <div className="w3-container" style={{'padding': '10px 20px'}}>
                                <div style={{'width': '100%', 'textAlign': 'center'}}>
                                    <img src={fb.photoURL} height="200" width="200" />
                                </div>
                                <div>Name: {fb.displayName}</div>
                                <div>E-mail: {fb.email}</div>
                                <div>Facebook id: {fb.uid}</div>
                                <div>User id: {this.props.firebase.user.meta.uid}</div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default autoBind(profilePage);
