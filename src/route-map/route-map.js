import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'react-yandex-maps';

import RouteMapPlacemarks from './route-map-placemarks';
import RouteMapPolyline from './route-map-polyline';

class RouteMap extends Component {
  constructor() {
    super();
    this.state = {
      mapLoadingError: false,
    };
  }

  onPositionChanged(pointName, newCoordinates) {
    this.props.onPositionChanged(pointName, newCoordinates);
  }

  setMapInstance(mapInstance) {
    this.props.setMapInstance(mapInstance);
  }

  showError(error) {
    console.log(error);
    this.setState({mapLoadingError: true});
  }

  mapLayout() {
    const { routePoints, width, height } = this.props;
    return (
      <Map
        instanceRef={map => this.setMapInstance(map)}
        defaultOptions={{
          autoFitToViewport: 'always'
        }}
        defaultState={{ center: [55.75, 37.57], zoom: 4 }}
        width={width}
        height={height}
        onError={error => this.showError(error)}
      >
        <RouteMapPlacemarks
          routePoints={routePoints}
          onPositionChanged={
            (pointName, newCoordinates) => this.onPositionChanged(pointName, newCoordinates)
          }
        />
        <RouteMapPolyline routePoints={routePoints} />
      </Map>
    );
  }

  errorLayout() {
    return (
      <div>Error loading map, please try to use chrome.</div>
    );
  }

  render() {
    if (this.state.mapLoadingError) {
      return this.errorLayout();
    } else {
      return this.mapLayout();
    }
  }
}

RouteMap.defaultProps = {
  width: '100%',
  height: '450px'
};

RouteMap.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  routePoints: PropTypes.array.isRequired,
  onPositionChanged: PropTypes.func.isRequired,
  setMapInstance: PropTypes.func.isRequired
};

export default RouteMap;
