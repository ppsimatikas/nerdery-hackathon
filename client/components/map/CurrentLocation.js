import React, { Component } from 'react';
import { maps as googleMaps } from 'googleMaps';

function getLocation(locationLoaded) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(locationLoaded, (e) => {
            console.log(e);locationLoaded();
        });
    }
}

function watchPosition(locationLoaded) {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(locationLoaded, () => locationLoaded());
    }
}

class CurrentLocation extends Component {
    constructor(props) {
        super(props);
        getLocation(props.locationLoaded);
        watchPosition(props.locationLoaded);

        this.state = {
            marker: new googleMaps.Marker({
                map: props.map,
                icon: {
                    url: '/car.png'
                }
            })
        };
    }

    componentWillReceiveProps(nextProps) {
        const { marker } = this.state;
        if (nextProps.location !== this.props.location) {
            marker.setPosition(nextProps.location);
        }
    }

    render() {
        return <noscript/>;
    }
}

export default CurrentLocation;