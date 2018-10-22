import React from 'react';
import RouteInput from './route-input';
import renderer from 'react-test-renderer';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

test('Input snapshot', () => {
  let items = [
    { name: 'point 1' },
    { name: 'point 2' },
    { name: 'Moscow' },
    { name: 'Izhevsk' }
  ];

  const component = renderer.create(
    <RouteInput
      routePoints={items}
      onEnter={newName => items.push({name: newName})}
    />,
  );
  
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Input should not accept new characters if max lengths have already reached', () => {
  let items = [
    { name: 'point 1' },
    { name: 'point 2' },
    { name: 'Moscow' },
    { name: 'Izhevsk' }
  ];

  const input = shallow(
    <RouteInput
      routePoints={items}
      onEnter={newName => items.push({name: newName})}
    />
  );

  const maxLength = 16;
  let expectedValue = '';
  for (let i = 0; i < maxLength; i += 1) {
    expectedValue += 'a';
  }

  let value = '';
  for (let i = 0; i < 20; i += 1) {
    value += 'a';
    input.find('TextField').simulate('change', {target:{value: value}});
  }
  
  expect(input.state('value')).toEqual(expectedValue);
});

test('Input should not call props.onEnter when \
the input value is presented in routePoints', () => {
  let items = [
    { name: 'point 1' },
    { name: 'point 2' },
    { name: 'Moscow' },
    { name: 'Izhevsk' }
  ];

  const input = shallow(
    <RouteInput
      routePoints={items}
      onEnter={newName => items.push({name: newName})}
    />
  );

  input.find('TextField').simulate('change', { target: {value: 'point 1'} });
  input.find('TextField').simulate('keydown', { keycode: 13 });
  expect(items.length).toEqual(4);
});

test('Input should call props.onEnter when \
the input value is not presented in routePoints', () => {
  let items = [
    { name: 'point 1' },
    { name: 'point 2' },
    { name: 'Moscow' },
    { name: 'Izhevsk' }
  ];

  const input = shallow(
    <RouteInput
      routePoints={items}
      onEnter={newName => items.push({name: newName})}
    />
  );

  input.find('TextField').simulate('change', { target: {value: 'some name'} });
  input.find('TextField').simulate('keydown', { keycode: 13 });
  expect(items.length).toEqual(4);
});