import React, { Component } from 'react';
import { Grid, Row, Col, ButtonToolbar, Button } from 'react-bootstrap';
require('./home.scss');
import Justparked from '../justparked/justparked.js';

class Dashboard extends Component {
    constructor(props) {
        super(props);

        props.loadData();
    }

    render() {
        const { data, justParked } = this.props;

        return (
            <Grid className="home">
                <Row className="home-header">
                    <Col xs={6}>
                        <Justparked justParked={justParked} />
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default Dashboard;
