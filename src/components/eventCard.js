import React, { Component } from 'react';
// import { Link } from 'react-router';
import $ from 'jquery';
import EventModal from './eventModal';

class EventCard extends Component {

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
    }

    onClick(el) {
        this.props.onSetModal(el);
        this.props.onToggleModal();
        $('div.w3-modal').fadeToggle(200);
    }

    onCloseModal() {
        this.props.onToggleModal();
        $('div.w3-modal').fadeToggle(200);
    }

    render() {
        const { name, date, location, index } = this.props;
        const number = ((index%20) < 10) ? `0${(index%20)}.jpg` : `${(index%20)}.jpg`

        return (
            <div className="w3-card-2 w3-white event-card w3-container text-left glow-hover" onClick={() => {this.onClick(<EventModal onCloseModal={this.onCloseModal} />)}}>
                <div className="event-profile" style={{backgroundImage: `url("./images/demo/${number}")`}} />
                <div style={{'fontSize': '1.3em', 'fontWeight': '400', 'margin': '15px 0px 5px 0px'}}>{name}</div>
                <div style={{'fontSize': '1em', 'fontWeight': '200', 'margin': '5px 0px'}}><i className="fa fa-clock-o"></i> {(!date.isInterval) ? <span>{date.start}</span> : <span>{date.start} to {date.end}</span>}</div>
                <div style={{'fontSize': '1em', 'fontWeight': '200', 'margin': '5px 0px'}}><i className="fa fa-map-marker"></i> {location}</div>
            </div>
        );
    }
}

EventCard.defaultProps = {
    name: "Event Name",
    date: {
        isInterval: true,
        start: "date start",
        end: "date end"
    },
    location: "location",
    image: "something",
    joined: {
        total: 0,
        who: []
    }
}

export default EventCard;
