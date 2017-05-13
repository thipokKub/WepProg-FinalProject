import React, { Component } from 'react';
import autoBind from '../hoc/autoBind';
import EventCard from '../components/eventCard';
import TopNav from '../components/topNav';

class homePage extends Component {
    componentWillMount() {
        this.props.firebase_event_get('eventy001v17KU2TsB3R');
        this.props.firebase_event_list_get(['eventy001v17KU2TsB3R', 'eventroI52nN001PewmH']);
    }

    render() {
        const max = 20;
        const demo = [];

        for(var i = 0; i < max; i++) {
            const test = {
                name: `Event Name ${i}`,
                date: {
                    isInterval: (i%2 === 0),
                    start: `date start ${i}`,
                    end: `date end ${i}`
                },
                location: `location ${i}`,
                image: `something ${i}`
            }

            demo.push(<EventCard {...test} index={i} key={i} onSetModal={this.props.set_modal} onToggleModal={this.props.toggle_modal} />);
        }



        const content = (this.props.facebook.result) ? (
            <div>
                <section data-role="push-up">
                    <div className="w3-panel w3-whale-blue-l2" data-role="header">
                        <p>Upcoming event</p>
                    </div>
                    <div className="text-center" data-role="content">
                        {demo.map((item) => item)}
                    </div>
                </section>
                <section data-role="push-up">
                    <div className="w3-panel w3-whale-blue-l2 margin-header" data-role="header">
                        <p>Something</p>
                    </div>
                    <div className="text-center" data-role="content">
                        {demo.map((item) => item)}
                    </div>
                </section>
            </div>
        ) : (
            <div style={{'width': '100%', 'height': '100vh', 'display': 'flex', 'alignItems': 'center', 'justifyContent': 'center'}}>
                <div className="w3-card-2" style={{'width': '400px', 'height': '300px', 'backgroundColor': '#FFF', 'display': 'flex', 'alignItems': 'center', 'justifyContent': 'center'}}>
                    <div style={{'textAlign': 'center', 'position': 'relative', 'top': '-10px'}}>
                        <p style={{'fontSize': '1.5em'}}>
                            Please Login before using
                        </p>
                        <span>
                            The login button is in the right hand corner
                        </span>
                    </div>
                </div>
            </div>
        );

        return (
            <div>
                <TopNav page="home" facebook={this.props.facebook} facebookLogin={this.props.facebook_sign_in} isFacebookLogin={(this.props.facebook.result) ? true : false} />
                {content}
            </div>
        );
    }
}

export default autoBind(homePage);
