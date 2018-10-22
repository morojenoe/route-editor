import React from 'react';
import RouteMapPolyline from './route-map-polyline';
import renderer from 'react-test-renderer';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { YMaps } from 'react-yandex-maps';

configure({ adapter: new Adapter() });
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

test('RouteMapPolyline snapshot', () => {
  let routePoints = [
    { name: 'point 1', coordinates: [50.0, 40.0] },
    { name: 'point 2', coordinates: [53.0, 39.0] },
    { name: 'Moscow', coordinates: [55.0, 42.0] },
    { name: 'Izhevsk', coordinates: [48.0, 36.0] },
  ];

  const component = renderer.create(
    <YMaps>
      <RouteMapPolyline
        routePoints={routePoints}
      />
    </YMaps>
    ,
  );
  
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
