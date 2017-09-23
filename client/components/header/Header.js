import React, { Component } from 'react';
require('./header.scss');

class Header extends Component {
    render() {
        return (
            <header className="ui-header">
                <img src="/static/SweepAlert.png"/>
                <h1 className="welcome">Sweep Alert Chicago</h1>
            </header>
        );
    }
}

export default Header;
