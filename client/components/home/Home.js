import React, { Component } from 'react';
import { Grid, Row, Col, ButtonToolbar, Button } from 'react-bootstrap';
import Map from '../map/Map.js';
import Justparked from '../justparked/justparked.js';

require('./home.scss');

class Dashboard extends Component {
    constructor(props) {
        super(props);

        props.loadData();
    }

    render() {
        const { data, location, locationLoaded, justParked } = this.props;

        return (
            <Grid className="home">
                <Row className="home-header">
                    <Col xs={6}>
                    <Justparked justParked={justParked} />
                    <Map
                        location={location}
                        locationLoaded={locationLoaded}
                    ></Map>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default Dashboard;
