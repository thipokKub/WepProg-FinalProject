/* eslint-disable */

import React, { Component } from 'react';
import autoBind from '../hoc/autoBind';
import TopNav from '../components/topNav';
import $ from 'jquery';

class ContentDescription extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'type': 'None',
            'slideShow': {
                'array': ['']
            },
            'value': ''
        };
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onUpdateHandler = this.onUpdateHandler.bind(this);
        this.onAddInput = this.onAddInput.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onClear = this.onClear.bind(this);
        this.onUpdateValue = this.onUpdateValue.bind(this);
    }

    onUpdateValue(val) {
        this.setState({
            ...this.state,
            'value': val
        });
    }

    onChangeHandler() {
        let array = [];
        let state = {
            ...(this.state),
        };

        state.type = $('#selected-list').find(":selected").text();

        this.setState(state);
    }

    onSubmit() {
        let rObj = {...this.state};

        this.setState({
            ...(this.state),
            'type': 'None',
            'value': '',
            'slideShow': {
                'array': ['']
            }
        });

        $('#selected-list').val('None');

        if(rObj.type !== "None") this.props.onAddItem(rObj);

        return rObj;
    }

    onClear() {
        this.setState({
            ...(this.state),
            'type': 'None',
            'value': '',
            'slideShow': {
                'array': ['']
            }
        });
        $('#selected-list').val('None');
    }

    onUpdateHandler(index, value) {
        let array = this.state.slideShow.array;

        array[index] = value;

        this.setState({
            ...(this.state),
            'slideShow': {
                'array': array
            }
        });
    }

    onAddInput() {
        let array = this.state.slideShow.array;
        array.push('');

        this.setState({
            ...(this.state),
            'slideShow': {
                'array': array
            }
        });
    }

    onRemoveInput(index) {
        let array = this.state.slideShow.array;
        array.splice(index, 1);

        this.setState({
            ...(this.state),
            'slideShow': {
                'array': array
            }
        });
    }

    componentDidMount() {
        this.onChangeHandler();
    }

    componentDidUpdate() {

    }

    render() {

        let input;

        switch (this.state.type) {
            case 'Header':
            case 'Image':
            case 'Video':
                input = <input className="w3-input" type="text" onChange={event => {this.onUpdateValue(event.target.value)}}/>;
                break;
            case "Text":
                input = <textarea style={{'width': '100%'}} onChange={event => { this.onUpdateValue(event.target.value)}}></textarea>;
                break;
            case "Slide Show":
                input = (
                    <div className="array-list">
                        <div className="w3-container w3-bar w3-green w3-hover-gray text-center" style={{'padding': '10px 20px', 'width': '120px', 'display': 'inline-block'}} onClick={this.onAddInput}>
                            <span>Add Field</span>
                        </div>
                        {this.state.slideShow.array.map((item, key) => {
                            return (
                                <div key={`input-${key}`}>
                                    <input className="w3-input" type="text" onChange={event => { this.onUpdateHandler(key, event.target.value)}} style={{'width': 'calc(100% - 120px)', 'display': 'inline-block'}}/>
                                    <div className="w3-container w3-btn w3-red w3-hover-gray text-center" onClick={() => this.onRemoveInput(key)} style={{'width': '120px', 'display': 'inline-block', 'padding': '8px'}}>
                                        <span>Remove</span>
                                    </div>
                                </div>
                                );
                        })}
                    </div>
                );
                break;
            default:
                input = <div>Please select type</div>
        }


        return (
            <div className="w3-card-2 w3-white" style={{'margin': '10px', 'textAlign': 'left'}}>
                <div className="w3-container w3-blue">
                    <h4>Content</h4>
                </div>
                <div className="w3-container">
                    <p>
                        <label>Type</label>
                        <select className="w3-select" style={{'display': 'inline-block', 'width': '100px', 'marginLeft': '20px'}} id="selected-list" onChange={this.onChangeHandler}>
                            <option value="None">None</option>
                            <option value="Header">Header</option>
                            <option value="Text">Text</option>
                            <option value="Image">Image</option>
                            <option value="Slide Show">Slide Show</option>
                            <option value="Video">Video</option>
                        </select>
                    </p>
                    <p>
                        {input}
                    </p>
                </div>
                <div className="w3-container w3-bar w3-green w3-hover-gray text-center" style={{'padding': '10px 20px', 'fontSize': '1.2em', 'width': '50%', 'display': 'inline-block'}} onClick={this.onSubmit}>
                    <span>Add</span>
                </div>
                <div className="w3-container w3-bar w3-red w3-hover-gray text-center" style={{'padding': '10px 20px', 'fontSize': '1.2em', 'width': '50%', 'display': 'inline-block'}} onClick={this.onClear}>
                    <span>Clear</span>
                </div>
            </div>
        )
    }
}

class DateInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCheck: false
        };
        this.onRefChange = this.onRefChange.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
    }

    onRefChange() {
        this.setState({
            ...this.state,
            isCheck: this.refs["input-check"].checked
        })
    }

    onDateChange() {
        if(this.props.onDateChange) {
            if(this.state.isCheck) {
                this.props.onDateChange(new Date(this.refs["from"].value).getTime(), new Date(this.refs["to"].value).getTime());
            }
            else {
                this.props.onDateChange(new Date(this.refs["date"].value).getTime(), (new Date(this.refs["date"].value).getTime()) + (14*3600*1000));
            }
        }
    }

    render() {
        //revieve props onDateChange

        const Date = (this.state.isCheck) ? (
            <div>
                <label>From</label>
                <input className="w3-input" type="date" ref="from" onBlur={this.onDateChange} />
                <label>To</label>
                <input className="w3-input" type="date" ref="to" onBlur={this.onDateChange} />
            </div>
        ) : (<input className="w3-input" type="date" ref="date" onBlur={this.onDateChange} />);

        return (
            <div>
                <input ref="input-check" type="checkbox" className="w3-check" onChange={this.onRefChange}></input>
                <label>Is span over multiple date</label>
                {Date}
            </div>

        );
    }
}

class invitePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'contentDescription': [],
            'author': '',
            'name': '',
            'time': '',
            'location': '',
            'image': '',
            'invites': [],
            'date': {
                'start': 0,
                'end': 0
            }
        };
        this.onAddItem = this.onAddItem.bind(this);
        this.onRemoveItem = this.onRemoveItem.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.onClickSubmit = this.onClickSubmit.bind(this);
    }

    onDateChange(start, end) {
        this.setState({
            ...this.state,
            'date': {
                'start': start,
                'end': end
            }
        });
    }

    componentWillMount() {
        if(!this.props.facebook.result) {
            this.props.context.router.push('/');
        }
    }

    onAddItem(val) {
        this.setState({
            ...this.state,
            contentDescription: this.state.contentDescription.concat(val)
        });
    }

    onRemoveItem(index) {
        let newArray = this.state.contentDescription;
        newArray.splice(index);
        this.setState({
            ...this.state,
            contentDescription: newArray
        });
    }

    onClickSubmit() {
        let description = this.state.contentDescription.map((item, key) => {
            if(item.type !== "Slide Show") return { type: item.type, content: item.value }
            return { type: item.type, content: item.slideShow.array }
        });

        let rObj = {
            'name': this.refs['eName'].value,
            'date': this.state.date,
            'time': this.refs.time.value,
            'location': this.refs.location.value,
            'image': this.refs.image.value,
            'description': description,
            'color': null,
            'tags': [],
            'pending': ($('#friends').children().map((key, item) => {
                if($($(item).children()[0]).is(":checked")) return $(item).children()[0].value;
            })).toArray()
        };

        this.props.firebase_event_post(rObj);
        this.props.context.router.push('/');
    }

    componentDidUpdate() {

    }

    render() {
        const contentDescription = this.state.contentDescription.map((item, key) => {
            switch (item.type) {
                case "Header":
                case "Image":
                case "Video":
                case "Text":
                    return (
                        <div key={`description-${key}`} className="w3-card-2 w3-white" style={{'margin': '10px', 'textAlign': 'left'}}>
                            <div className="w3-container w3-blue" style={{'position': 'relative'}}>
                                <h5>{item.type}</h5>
                                <div className="w3-button w3-red w3-hover-gray" style={{'position': 'absolute', 'top': '0px', 'right': '0px'}} onClick={() => this.onRemoveItem(key)}>Remove</div>
                            </div>
                            <div key={`description-${key}`} className="w3-container" style={{'padding': '10px 20px'}}>
                                {item.value}
                            </div>
                        </div>
                    );
                    break;
                case "Slide Show":
                    return (
                        <div key={`description-${key}`} className="w3-card-2 w3-white" style={{'margin': '10px', 'textAlign': 'left'}}>
                            <div className="w3-container w3-blue" style={{'position': 'relative'}}>
                                <h5>{item.type}</h5>
                                <div className="w3-button w3-red w3-hover-gray" style={{'position': 'absolute', 'top': '0px', 'right': '0px'}} onClick={() => this.onRemoveItem(key)}>Remove</div>
                            </div>
                            <div key={`description-${key}`} className="w3-container" style={{'padding': '10px 20px'}}>
                                {item.slideShow.array.map((item, keys) => {
                                    return (
                                        <p key={`slide-show-${keys}`}>{item}</p>
                                    );
                                })}
                            </div>
                        </div>
                    );
                default:
                    return null;
            }
        });

        const friendList = ((this.props.facebook.result) && (this.props.facebook.result.user) && (this.props.facebook.result.user.providerData[0]) && (this.props.facebook.result.user.providerData[0].friends)) ? this.props.facebook.result.user.providerData[0].friends.map((item, key) =>
            {
            return(<div key={`facebook-${key}`} style={{'display': 'flex', 'alignItems': 'center'}}>
                <input className="w3-check" type="checkbox" value={`${item.id}`} />
                <img src={item.photoURL} style={{'width': '50px', 'height': '50px', 'borderRadius': '50%', 'marginRight': '20px'}} />
                <label>{item.name}</label>
            </div>)
            }
        ) : <div></div>;

        return (
            <div>
                <TopNav page="invite" facebook={this.props.facebook} facebookLogin={this.props.facebook_sign_in} isFacebookLogin={(this.props.facebook.result) ? true : false}/>
                <section data-role="push-up">
                    <div className="w3-panel w3-whale-blue-l2" data-role="header">
                        <p>Invite</p>
                    </div>
                    <div className="text-center" data-role="content">
                        <div className="w3-card-2 w3-white" style={{'margin': '10px', 'textAlign': 'left'}}>
                            <div className="w3-container w3-blue">
                                <h2>Create new event</h2>
                            </div>
                            <div className="w3-container">
                                <p>
                                    <label>Event Name</label>
                                    <input className="w3-input" type="text" ref="eName"/>
                                </p>
                                <p>
                                    <label>Image</label>
                                    <input className="w3-input" type="text" ref="image"/>
                                </p>
                                <p>
                                    <label>Date</label>
                                    {<DateInput onDateChange={this.onDateChange}/>}
                                </p>
                                <p>
                                    <label>Time</label>
                                    <input className="w3-input" type="text" ref="time" />
                                </p>
                                <p>
                                    <label>Location</label>
                                    <input className="w3-input" type="text" ref="location" />
                                </p>
                                <p>
                                    <label>Invites</label>
                                    <div id="friends">
                                        {friendList}
                                    </div>
                                </p>
                            </div>
                        </div>
                        <ContentDescription onAddItem={this.onAddItem} />
                        {contentDescription}
                        <div className="w3-card-2 w3-white" style={{'margin': '10px', 'textAlign': 'left'}} onClick={this.onClickSubmit}>
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
