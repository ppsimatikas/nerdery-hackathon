import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

require('./map.scss');

const Marker = () => <svg><circle cx="100" cy="100" r="5"/></svg>;

function getLocation(locationLoaded) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        console.log(pos);
        locationLoaded(pos);
      }, function() {
      });
    }
}

const CENTER_OF_CHICAGO = {lat: 41.879558, lng: -87.630451};

class Map extends Component {
  constructor(props) {
    super(props);
    getLocation(props.locationLoaded);
  }

  render() {
    const { location } = this.props;

    return (
        <div className="map-sweep">
          <GoogleMapReact
            center={location || CENTER_OF_CHICAGO}
            zoom={15}
          >
            { location ? <Marker
              lat={location.lat}
              lng={location.lng}
            /> : null }
          </GoogleMapReact>
        </div>
    );
  }
}

// Export the component back for use in other files
export default Map;