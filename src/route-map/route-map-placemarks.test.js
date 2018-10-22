import React from 'react';
import RouteMapPlacemarks from './route-map-placemarks';
import renderer from 'react-test-renderer';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { YMaps } from 'react-yandex-maps';

configure({ adapter: new Adapter() });
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

test('RouteMapPlacemarks snapshot', () => {
  let routePoints = [
    { name: 'point 1', coordinates: [50.0, 40.0] },
    { name: 'point 2', coordinates: [53.0, 39.0] },
    { name: 'Moscow', coordinates: [55.0, 42.0] },
    { name: 'Izhevsk', coordinates: [48.0, 36.0] },
  ];

  const onPositionChanged = (pointName, newCoordinates) => {
    const id = routePoints.findIndex(item => item.name === pointName);
    if (id !== -1) {
      routePoints[id].coordinates = newCoordinates;
    }
  };

  const component = renderer.create(
    <YMaps>
      <RouteMapPlacemarks
        routePoints={routePoints}
        onPositionChanged={onPositionChanged}
      />
    </YMaps>,
  );
  
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('RouteMapPlacemarks should call onPositionChanged', () => {
  let routePoints = [
    { name: 'point 1', coordinates: [50.0, 40.0] },
    { name: 'point 2', coordinates: [53.0, 39.0] },
    { name: 'Moscow', coordinates: [55.0, 42.0] },
    { name: 'Izhevsk', coordinates: [48.0, 36.0] },
  ];

  const onPositionChanged = (pointName, newCoordinates) => {
    const id = routePoints.findIndex(item => item.name === pointName);
    if (id !== -1) {
      routePoints[id].coordinates = newCoordinates;
    }
  };

  const component = shallow(
    <YMaps>
      <RouteMapPlacemarks
        routePoints={routePoints}
        onPositionChanged={onPositionChanged}
      />
    </YMaps>,
  );
  
  component.children().props().onPositionChanged(routePoints[0].name, [0.0, 0.0]);
  expect(routePoints[0].coordinates).toEqual([0.0, 0.0]);
});
