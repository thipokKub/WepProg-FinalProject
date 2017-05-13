/* eslint-disable */

import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import '../../node_modules/react-big-calendar/lib/css/react-big-calendar.css';
import day from '../../public/calendar-icon/day.png';
import week from '../../public/calendar-icon/week.png';
//import month from '../../public/calendar-icon/month.png';
import $ from 'jquery';
import EventModal from './eventModal';

BigCalendar.momentLocalizer(moment);

const event = [
    //yyyy, mm, dd, hh, mm, ss
    //Jan = 0, first day of month = 0
  {
    'title': 'All Day Event',
    'allDay': true,
    'start': new Date(2017, 4, 0),
    'end': new Date(2017, 4, 1)
  },
  {
    'title': 'Long Event',
    'start': new Date(2017, 4, 7),
    'end': new Date(2017, 4, 10)
  },

  {
    'title': 'DTS STARTS',
    'start': new Date(2017, 4, 13, 0, 0, 0),
    'end': new Date(2017, 4, 20, 0, 0, 0)
  },

  {
    'title': 'DTS ENDS',
    'start': new Date(2017, 4, 6, 0, 0, 0),
    'end': new Date(2017, 4, 13, 0, 0, 0)
  },

  {
    'title': 'Some Event',
    'start': new Date(2017, 4, 9, 0, 0, 0),
    'end': new Date(2017, 4, 9, 0, 0, 0)
  },
  {
    'title': 'Conference',
    'start': new Date(2017, 4, 11),
    'end': new Date(2017, 4, 13),
    desc: 'Big conference for important people'
  },
  {
    'title': 'Meeting',
    'start': new Date(2017, 4, 12, 10, 30, 0, 0),
    'end': new Date(2017, 4, 12, 12, 30, 0, 0),
    desc: 'Pre-meeting meeting, to prepare for the meeting'
  },
  {
    'title': 'Lunch',
    'start':new Date(2017, 4, 12, 12, 0, 0, 0),
    'end': new Date(2017, 4, 12, 13, 0, 0, 0),
    desc: 'Power lunch'
  },
  {
    'title': 'Meeting',
    'start':new Date(2017, 4, 12,14, 0, 0, 0),
    'end': new Date(2017, 4, 12,15, 0, 0, 0)
  },
  {
    'title': 'Happy Hour',
    'start':new Date(2017, 4, 12, 17, 0, 0, 0),
    'end': new Date(2017, 4, 12, 17, 30, 0, 0),
    desc: 'Most important meal of the day'
  },
  {
    'title': 'Dinner',
    'start':new Date(2017, 4, 12, 20, 0, 0, 0),
    'end': new Date(2017, 4, 12, 21, 0, 0, 0)
  },
  {
    'title': 'Birthday Party',
    'start':new Date(2017, 4, 13, 7, 0, 0),
    'end': new Date(2017, 4, 13, 10, 30, 0)
  }
];

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            event: event
        }
        this.onEventClick = this.onEventClick.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
    }

    onCloseModal() {
        this.props.onToggleModal();
        $('div.w3-modal').fadeToggle(200);
    }

    componentDidMount() {
        $('.rbc-btn-group').map((key, item) => {
            $(item).children().map((key2, item2) => {
                const txt = $(item2).text();
                $(item2).text("");
                switch(txt) {
                    case "today":
                        $(item2).append('<i class="fa fa-calendar-check-o"></i>');
                        break;
                    case "back":
                        $(item2).append('<i class="fa fa-arrow-left"></i>');
                        break;
                    case "next":
                        $(item2).append('<i class="fa fa-arrow-right"></i>');
                        break;
                    case "month":
                        $(item2).append('<i class="fa fa-calendar"></i>');
                        break;
                    case "week":
                        $(item2).append(`<img src=${week} style="height: 1em; position: relative; transform: scale(1.1); top: -2px;" alt="week" />`);
                        break;
                    case "day":
                        $(item2).append(`<img src=${day} style="height: 1em; position: relative; transform: scale(1.1); top: -2px;" alt="day" />`);
                        break;
                    case "agenda":
                        $(item2).append('<i class="fa fa-list-ol"></i>');
                        break;
                    default:
                }
                return null;
            })
            return null;
        })
    }

    onEventClick(event) {

        let dateStart = String(event.start).split(' ');
        let dateEnd = String(event.end).split(' ');

        let dateStartStr = dateStart[0] + " " + dateStart[2] + " " + dateStart[1] + " " + dateStart[3];
        let dateEndStr = dateEnd[0] + " " + dateEnd[2] + " " + dateEnd[1] + " " + dateEnd[3];

        this.props.onSetModal(<EventModal onCloseModal={this.onCloseModal} />);
        this.props.onToggleModal();
        $('div.w3-modal').fadeToggle(200);
        // {
        //     name: event.title,
        //     date: {
        //         isInterval: true,
        //         start: dateStartStr,
        //         end: dateEndStr
        //     },
        //     location: "location",
        //     image: "something"
        // }
    }

    onSlotClick(slotInfo) {
        console.log(slotInfo);
        console.log(`selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
        `\nend: ${slotInfo.end.toLocaleString()}`);
    }

    eventStyleGetter(event) {
        var color = 150;
        var backgroundColor = `rgb(${Math.floor(0.8*color)}, ${Math.floor(0.9*color)}, ${Math.floor(0.85*color)})`;
        var style = {
            backgroundColor: backgroundColor,
            borderRadius: '0px',
            opacity: 0.8,
            color: 'black',
            border: 'none',
            display: 'block'
        };
        return {
            style: style
        };
    }

    render() {
        return (
            <div className="calendar-contianer">
              <BigCalendar
                  selectable
                  events={this.state.event}
                  defaultView='month'
                  scrollToTime={new Date(1970, 1, 1, 6)}
                  defaultDate={new Date(Date.now())}
                  onSelectEvent={this.onEventClick}
                  onSelectSlot={this.onSlotClick}
                  eventPropGetter={(this.eventStyleGetter)}
              />
            </div>
        );
    }
}

export default Calendar;
