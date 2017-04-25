import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions';

export default function(ComposedComponent) {

    class binding extends Component {

        static contextTypes = {
            router: PropTypes.object
        }

        render() {
            return (
                <ComposedComponent {...this.props} context={this.context}>
                    {this.props.children}
                </ComposedComponent>
            );
        }

    };

    function mapStateToProps(state) {
        return {...state};
    }

    function mapDispatchToProps(dispatch) {
        return bindActionCreators({...actions}, dispatch);
    }

    return connect(mapStateToProps, mapDispatchToProps)(binding);
}
