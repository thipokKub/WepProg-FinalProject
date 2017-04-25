import React, { Component } from 'react';
import autoBind from '../hoc/autoBind';
import EventCard from '../components/eventCard';
import TopNav from '../components/topNav';

class homePage extends Component {
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
                image: `something ${i}`,
                joined: {
                    total: 0,
                    who: []
                }
            }

            demo.push(<EventCard {...test} index={i} key={i} onSetModal={this.props.set_modal} onToggleModal={this.props.toggle_modal}/>);
        }

        return (
            <div>
                <TopNav page="home"/>
                <section data-role="push-up">
                    <div className="w3-panel w3-whale-blue-l2" data-role="header">
                        <p>Upcomming event</p>
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
        );
    }
}

export default autoBind(homePage);
