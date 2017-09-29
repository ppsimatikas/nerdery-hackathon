import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Map from '../map/Map.js';
import Justparked from '../justparked/justparked.js';

require('./home.scss');

class Dashboard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { location, locationLoaded, justParked } = this.props;

        return (
            <Grid className="home">
                <Row className="home-header">
                    <Col xs={12}>
                    <Justparked
                        location={location}
                        justParked={justParked} />
                    <Map
                        location={location}
                        locationLoaded={locationLoaded}
                    />
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default Dashboard;
