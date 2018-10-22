import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Placemark } from 'react-yandex-maps';

class RouteMapPlacemarks extends Component {
  onPositionChanged(pointName, newCoordinates) {
    this.props.onPositionChanged(pointName, newCoordinates);
  }

  render() {
    const { routePoints } = this.props;
    return routePoints.map((point, id) => (
      <Placemark
        modules={['geoObject.addon.balloon']}
        key={`${point.name}.${id}`}
        geometry={point.coordinates}
        onDragEnd={item => this.onPositionChanged(point.name,
            item.originalEvent.target.geometry.getCoordinates())
        }
        defaultProperties={{
          iconContent: id + 1,
          balloonContent: point.name,
        }}
        options={{
          draggable: true,
        }}
      />
    ));
  }
}

RouteMapPlacemarks.propTypes = {
  routePoints: PropTypes.array.isRequired,
  onPositionChanged: PropTypes.func.isRequired,
};

export default RouteMapPlacemarks;
