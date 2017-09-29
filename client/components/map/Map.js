import React, { Component } from 'react';
import { maps as googleMaps } from 'googleMaps';
import CurrentLocation from './CurrentLocation';

require('./map.scss');

function renderMarker(map, props) {
    if (map) {
        return <CurrentLocation map={map} {...props} />;
    }
}

const CENTER_OF_CHICAGO = { lat: 41.879558, lng: -87.630451 };

function createMap(element, center, zoom) {
    return new googleMaps.Map(element, {
        center: center || CENTER_OF_CHICAGO,
        zoom: zoom
    });
}

class Map extends Component {
    constructor(props) {
        super(props);

        this.state = {
            map: null
        };
    }

    componentDidMount () {
        this.setState({
            map: createMap(document.getElementById('sweep-alert-map'), 0, 15)
        });
    }

    componentWillReceiveProps(nextProps) {
        const { map } = this.state;
        if (map && nextProps.location !== this.props.location) {
            map.setCenter(nextProps.location);
        }
    }

    render() {
        const { map } = this.state;

        return (
            <div id="sweep-alert-map" className="map-sweep">
                {renderMarker(map, this.props)}
            </div>
        );
    }
}

export default Map;