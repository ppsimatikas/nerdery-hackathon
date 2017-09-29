require('./justparked.scss');
import React, { Component } from 'react';
import { Grid, Row, Col, FormControl } from 'react-bootstrap';

class Justparked extends Component {

    constructor(props) {
        super(props);
        this.state = {phone: localStorage.phone, email: localStorage.email};
    }

    handleChangePhone = (event) => {
        this.setState({phone: event.target.value});
    }

    handleChangeEmail = (event) => {
        this.setState({email: event.target.value});
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.props.justParked(this.state, this.props.location);
    }

    render() {
        return (
            <Row className="park">
                <Col xs={12}>
                    <h4>Enter your email / mobile number to get notifications</h4>
                    <form onSubmit={this.handleSubmit}>
                        <FormControl
                            className="input-item"
                            type="text"
                            value={this.state.email}
                            placeholder="Enter email"
                            onChange={this.handleChangeEmail}
                        />
                        <FormControl
                            className="input-item"
                            type="text"
                            value={this.state.phone}
                            placeholder="Enter phone"
                            onChange={this.handleChangePhone}
                        />
                        <input type="submit" value="JUST PARKED" className="submit btn btn-warning"/>
                    </form>
                </Col>
            </Row>
        );
    }
}

export default Justparked;
