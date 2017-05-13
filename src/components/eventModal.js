/* eslint-disable */
import React, { Component } from 'react';

class ImageCarousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'slideIndex': 1
        }
        this.plusDivs = this.plusDivs.bind(this);
        this.showDivs = this.showDivs.bind(this);
    }

    plusDivs(n) {
        this.showDivs(this.state.slideIndex += n);
    }

    showDivs(n) {
        var i;
        var x = document.getElementsByClassName("mySlides");
        var mySlideIndex = this.state.slideIndex;
        if (n > x.length) {
            mySlideIndex = 1;
        }
        if (n < 1) {
            mySlideIndex = x.length;
        }
        for (i = 0; i < x.length; i++) {
            x[i].style.display = "none";
        }
        x[mySlideIndex-1].style.display = "block";
        this.setState({
            ...(this.state),
            slideIndex: mySlideIndex
        });
    }

    componentDidMount() {
        this.showDivs(this.state.slideIndex);
    }

    render() {
        const slides = this.props.src.map((item, key) => {
            return (
                <img className="mySlides w3-card-2" key={`image-${key}`} src={item} style={{ 'width': '100%' }} />
            );
        })
        return (
            <div className="w3-content w3-display-container" style={{'margin': '30px auto 10px auto'}}>
                {slides}

                <button className="w3-button w3-green w3-display-left" onClick={() => {this.plusDivs(-1)}}>&#10094;</button>
                <button className="w3-button w3-green w3-display-right" onClick={() => {this.plusDivs(1)}}>&#10095;</button>
            </div>
        );
    }
}

class EventModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            'event_info': null
        }
    }

    getEventInfo(eventId) {

    }

    render() {
        const testDescription = {
            0: {
                content: "",
                type: "section-breaker"
            },
            1: {
                content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec neque odio, sagittis suscipit tempus a, commodo nec turpis. Maecenas urna sapien, sollicitudin eget nunc sed, porta molestie eros. Nulla facilisi. Maecenas blandit sed odio a pretium. Aenean feugiat ligula in eros euismod, quis gravida lectus tincidunt. Donec vestibulum tempor dui, vel faucibus magna tristique non. Mauris mollis velit nibh, egestas sodales lorem facilisis ullamcorper. Aenean quis malesuada tortor, eget luctus purus. Ut accumsan ligula convallis, posuere mauris a, vehicula purus.",
                type: "text"
            },
            2: {
                content: "./images/demo/05.jpg",
                type: "image"
            },
            3: {
                content: "More Info",
                type: "section-breaker"
            },
            4: {
                content: "Cras interdum purus eget est sodales tincidunt. Praesent non leo at quam tempus euismod. Nam a diam erat. Sed porta dolor maximus, luctus magna id, imperdiet mi. Integer in erat pulvinar metus feugiat aliquam. Mauris nec dolor et risus fermentum lacinia in sed libero. Proin sagittis nec leo et blandit. Vestibulum venenatis urna nec rutrum placerat. Aenean viverra mi ut pretium porttitor. Curabitur vulputate lectus ac mi consequat semper. Aliquam non efficitur felis. Fusce semper blandit tortor nec sollicitudin. Sed nec efficitur nisl. Maecenas in dapibus est, a dictum enim.",
                type: "text"
            },
            5: {
                content: "Etiam rhoncus augue id mauris viverra consequat. Praesent ac convallis orci. Ut in vulputate lectus. Ut malesuada, sapien non fringilla venenatis, nisi odio eleifend nulla, nec fringilla turpis turpis ut enim. Phasellus ut ullamcorper lectus, vel suscipit metus. Nam consectetur, sem eget congue semper, ex ante luctus ex, eu commodo urna ipsum vel quam. Cras consequat aliquet nisl sed posuere. Donec et mattis elit. Vestibulum blandit massa sit amet metus euismod tincidunt. Duis lobortis ultricies ipsum quis lobortis. Praesent ultricies et metus ac efficitur. Mauris finibus tincidunt lorem, non convallis metus finibus commodo. Aenean nec sapien at erat ornare lobortis. Nam pharetra dolor vel massa vestibulum, ut lacinia nisl dapibus.",
                type: "text"
            },
            6: {
                content: [
                    "./images/demo/05.jpg",
                    "./images/demo/06.jpg",
                    "./images/demo/07.jpg",
                    "./images/demo/08.jpg",
                    "./images/demo/10.jpg",
                ],
                type: 'image-carousel'
            },
            7: {
                content: "Video",
                type: "section-breaker"
            },
            8: {
                content: "https://www.youtube.com/embed/Pb5YR6wpg7g",
                type: "video"
            }
        };

        const description = Object.keys(testDescription).map((item) => {
            if(testDescription[item].type === "image") return <img key={item} className="w3-card-2" src={testDescription[item].content} style={{'margin': '10px 0px', 'width': '80%'}}></img>;
            else if(testDescription[item].type === "image-carousel") return (<ImageCarousel key={item} src={testDescription[item].content} />);
            else if(testDescription[item].type === "video") return (
                <div key={item} style={{'position': 'relative', 'width': '80%', 'height': '0', 'paddingBottom': '56.25%', 'margin': 'auto'}}>
                    <iframe frameBorder="0" allowFullScreen src={testDescription[item].content} style={{'position': 'absolute', 'top': '0', 'left': '0', 'width': '100%', 'height': '100%'}}></iframe>
                </div>
            );
            else if(testDescription[item].type === "section-breaker") return (
                <div key={item} style={{'textAlign': 'left'}}>
                    <h4 style={{'margin': '30px auto 0px auto'}}>{testDescription[item].content}</h4>
                    <hr style={{'marginTop': '5px'}} />
                </div>
            );
            return <p key={item} style={{'textAlign': 'left'}}><span style={{'marginLeft': '40px', 'display': 'inline-block'}}></span>{testDescription[item].content}</p>
        });

        return (
            <div className="margin-auto w3-container w3-card-4">
                <div style={{'backgroundColor': '#EEE', 'width': 'calc(100% + 2*15px)', 'height': '38.359px', 'position': 'relative', 'left': '-15px'}}>
                    <div className="w3-button w3-red w3-hover-red" style={{"right": '10px', 'position': 'absolute'}} onClick={this.props.onCloseModal}>Close</div>
                </div>
                <div className="margin-auto" style={{'padding': '5px 0px 30px 0px'}}>
                    <div style={{'width': '100%', 'padding': '0px 5px'}}>
                        <h3>Event Name</h3>
                        <div className="text-center" style={{'marginBottom': '10px'}}>
                            <img className="w3-card-2" src="./images/demo/01.jpg" style={{'width': '100%'}}></img>
                        </div>
                        <div className="w3-card-2 w3-light-gray w3-container">
                            <h4 className="display-none">Info</h4>

                            <p>
                                <table className="table-info">
                                    <tbody>
                                        <tr>
                                            <td><span className="my-label">Date</span></td>
                                            <td><i className="fa fa-calendar"></i></td>
                                            <td>9th May 2017</td>
                                        </tr>
                                        <tr>
                                            <td><span className="my-label">Time</span></td>
                                            <td><i className="fa fa-clock-o"></i></td>
                                            <td>17:00</td>
                                        </tr>
                                        <tr>
                                            <td><span className="my-label">Location</span></td>
                                            <td><i className="fa fa-map-marker"></i></td>
                                            <td>Location</td>
                                        </tr>
                                        <tr>
                                            <td><span className="my-label">Author</span></td>
                                            <td><i className="fa fa-user"></i></td>
                                            <td>Author</td>
                                        </tr>
                                        <tr>
                                            <td><span className="my-label">Total</span></td>
                                            <td><i className="fa fa-users"></i></td>
                                            <td>20 peoples</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </p>
                        </div>
                        <div className="text-center" style={{'padding': '0px 10px'}}>
                            {description}
                        </div>
                    </div>

                </div>
                <div style={{'height': '100%', 'width': '11px', 'position': 'absolute', 'top': '0px', 'right': '0px', 'backgroundColor': '#DDD'}}></div>
            </div>
        );
    }
}

export default EventModal;
