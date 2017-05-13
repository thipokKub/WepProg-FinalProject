import React, { Component } from 'react';
import autoBind from '../hoc/autoBind';
import $ from 'jquery';

class App extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e, targetElement) {
        if(targetElement[0] === e.target) {
            this.props.toggle_modal();
            if(this.props.page.is_modal_shown) {
                $('div.w3-modal').fadeIn(200);
            }
            else {
                $('div.w3-modal').fadeOut(200);
            }
        }
    }

    componentDidMount() {
        if(this.props.page.is_modal_shown) {
            $('div.w3-modal').fadeIn(200);
        }
        else {
            $('div.w3-modal').fadeOut(200);
        }
    }

    componentWillMount() {
    }

    render() {
        return (
            <section id="App">
                <div id="Content-body">
                    {this.props.children}
                </div>
                <div className="w3-modal" style={{'display': 'block', 'zIndex': '1500', 'width': '100%'}} onClick={(e) => { this.handleClick(e, $('div.w3-modal')); }}>
                    <div className="w3-modal-content my-modal">
                        {this.props.page.modal_element}
                    </div>
                </div>
            </section>
        );
    }
}

export default autoBind(App);
