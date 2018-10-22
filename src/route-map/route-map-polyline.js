import React from 'react';
import PropTypes from 'prop-types';
import { Polyline } from 'react-yandex-maps';

function RouteMapPolyline(props) {
  const { routePoints } = props;
  return (
    <Polyline
      geometry={routePoints.map(point => point.coordinates)}
      options={{
        balloonCloseButton: false,
        strokeColor: '#000',
        strokeWidth: 4,
        strokeOpacity: 0.5,
      }}
    />
  );
}

RouteMapPolyline.propTypes = {
  routePoints: PropTypes.array.isRequired,
};

export default RouteMapPolyline;
