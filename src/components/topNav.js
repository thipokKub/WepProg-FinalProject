/* eslint-disable */
import React, { Component } from 'react';
import logo from'../../public/images/logo4.png';
import { Link } from 'react-router';
import $ from 'jquery';

class TopNav extends Component {

    constructor(props) {
        super(props);
        this.state = {
            'isFire': false
        }

        $(window).bind('scroll resize', (e) => {
            var distanceY = window.pageYOffset || document.documentElement.scrollTop;
            var shrinkOn = 125;
            var offSet = 25;
            var navHeight = $('nav[data-role="top-nav"]').outerHeight(true);

            if(navHeight < 120) {
                $('section[data-role="push-up"] > div[data-role="header"]').css('top', '79px');
            } else {
                $('section[data-role="push-up"] > div[data-role="header"]').css('top', '119px');
            }

            if (distanceY > (shrinkOn+offSet)) {
                if(!this.state.isFire) {
                    if(!$('nav[data-role="top-nav"]').hasClass("small")) {
                        $('nav[data-role="top-nav"]').addClass("small");
                    }
                    this.setState({
                        ...(this.state),
                        'isFire': true
                    });
                }
            } else if(distanceY < (shrinkOn-offSet)) {
                if(this.state.isFire) {
                    if ($('nav[data-role="top-nav"]').hasClass("small")) {
                        $('nav[data-role="top-nav"]').removeClass("small");
                    }
                    this.setState({
                        ...(this.state),
                        'isFire': false
                    });
                }
            }
        })
    }

    componentDidMount() {
        var navHeight = $('nav[data-role="top-nav"]').outerHeight(true);
        if(navHeight < 120) {
            $('section[data-role="push-up"] > div[data-role="header"]').css('top', '79px');
        } else {
            $('section[data-role="push-up"] > div[data-role="header"]').css('top', '119px');
        }
    }

    componentWillUnmount() {
        $(window).unbind('scroll resize');
    }

    onToggleProfile() {
        if($('.profile-menu-active').length === 0) {
            $('.profile-menu-inactive').removeClass('profile-menu-inactive').addClass('profile-menu-active');
        } else {
            $('.profile-menu-active').removeClass('profile-menu-active').addClass('profile-menu-inactive');
        }
    }

    render() {
        const facebook = this.props.facebook;

        if($('.tags-menu-active').length !== 0 || $('.profile-menu-active').length !== 0) {
            $('.profile-menu-active').removeClass('profile-menu-active').addClass('profile-menu-inactive');
        }

        const renderedList = [
            <Link to="/" className="w3-bar-item w3-button" key="home"><i className="fa fa-home toggle-enlarge"></i><span className="toggle"> Home</span></Link>,
            <Link to="calendar" className="w3-bar-item w3-button" key="calendar"><i className="fa fa-calendar toggle-enlarge"></i><span className="toggle"> Calendar</span></Link>,
            <Link to="invite" className="w3-bar-item w3-button" key="invite"><i className="fa fa-user-plus toggle-enlarge"></i><span className="toggle"> Invite</span></Link>,
            <div className="w3-bar-item w3-button" key="profile" onClick={this.onToggleProfile}>
                <i className="fa fa-user toggle-enlarge"></i>
            </div>
        ];
        switch(this.props.page) {
            case "home": {
                renderedList[0] = (
                    <Link to="/" className="w3-bar-item w3-button w3-button-action" key="home">
                        <i className="fa fa-home toggle-enlarge"></i>
                        <span className="toggle"> Home</span>
                    </Link>
                );
                break;
            }
            case "calendar": {
                renderedList[1] = (
                    <Link to="calendar" className="w3-bar-item w3-button w3-button-action" key="calendar">
                        <i className="fa fa-calendar toggle-enlarge"></i>
                        <span className="toggle"> Calendar</span>
                    </Link>
                );
                break;
            }
            case "invite": {
                renderedList[2] = (
                    <Link to="invite" className="w3-bar-item w3-button w3-button-action" key="invite">
                        <i className="fa fa-user-plus toggle-enlarge"></i>
                        <span className="toggle"> Invite</span>
                    </Link>
                );
                break;
            }
            case "profile": {
                renderedList[3] = (
                    <div className="w3-bar-item w3-button w3-button-action" key="profile" onClick={this.onToggleProfile}>
                        <i className="fa fa-user toggle-enlarge"></i>
                    </div>
                );
                break;
            }
            default: {
                renderedList[0] = (
                    <Link to="/" className="w3-bar-item w3-button w3-button-action" key="home">
                        <i className="fa fa-home toggle-enlarge"></i>
                        <span className="toggle"> Home</span>
                    </Link>
                );
            }
        }

        if(!this.props.isFacebookLogin) renderedList.splice(1, 2);

        const profile = (!this.props.isFacebookLogin) ? (
            <div>
                <img src="http://www.rayennersawardwinners.com/images/gallery/dummy_profpic.jpg" alt="profile-img" />
                <p>
                    <button alt="fb-login" onClick={this.props.facebookLogin}>
                        <div alt="fb-icon-container">
                            <img src="../../images/fb_icon.svg" alt="fb-icon" />
                        </div>
                        <div>
                            Connect
                        </div>
                    </button>
                </p>
            </div>
        ) : (
            <div>
                <img src={this.props.facebook.result.user.providerData[0].photoURL} alt="profile-img" />
                <p>
                    {this.props.facebook.result.user.providerData[0].displayName}
                </p>
            </div>
        );

        return (
            <nav data-role="top-nav" className="w3-whale-blue">
                <Link to="/">
                    <img src={logo} alt="logo" />
                </Link>
                <div data-role="name">
                    <span>MEET</span>
                    <span>WHALE</span>
                </div>
                <div data-role="right-menu">
                    <div className="w3-bar w3-whale-blue">
                        {renderedList.map((item) => item)}
                    </div>
                </div>
                <div className="profile-menu-inactive" style={{'height': (!this.props.facebookLogin) ? '160px' : 'initial' }}>
                    <div className="w3-container profile-modal">
                        {profile}
                        {(this.props.isFacebookLogin) ?
                            (<Link to="profile" style={{'position': 'relative', 'top': '-10px'}}>
                                View Profile
                            </Link>) : null
                        }
                    </div>
                </div>
            </nav>
        );
    }
}

TopNav.defaultProps = {
    page: "home"
}

export default TopNav;
