import React, { Component } from 'react';
import { Grid, Row, Col, ButtonToolbar, Button } from 'react-bootstrap';
import Map from '../map/Map.js';

require('./home.scss');

class Dashboard extends Component {
    constructor(props) {
        super(props);

        props.loadData();
    }

    render() {
        const { data, location, locationLoaded } = this.props;

        return (
            <Grid className="home">
                <Row className="home-header">
                    <Col xs={6} style={{width: '100%', height: '500px'}}>
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
