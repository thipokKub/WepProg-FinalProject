import React, { Component } from 'react';

class EventModal extends Component {

    render() {

        window.FB.api('me', (res) => {
            console.log(res);
        });

        return (
            <div className="margin-auto w3-container">
                <div className="w3-button" onClick={this.props.onCloseModal}>Close</div>
                LOL
            </div>
        );
    }
}

export default EventModal;
