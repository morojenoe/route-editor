import React from 'react';
import RouteList from './route-list';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('List drag&drop', () => {
  let items = [
    { name: 'point 1' },
    { name: 'point 2' },
    { name: 'Moscow' },
    { name: 'Izhevsk' }
  ];
  const component = shallow(
    <RouteList
      routePoints={items}
      onRemoveItem={name => items.splice(items.findIndex(item => item.name === name), 1)}
      onListChange={newList => items = newList}
    />,
  );
  
  component.props().onMoveEnd(['a', 'b', 'c']);
  expect(items.length).toEqual(3);
  expect(items[0]).toEqual('a');
});

test('List should remove item when click on delete button', () => {
  let items = [
    { name: 'point 1' },
    { name: 'point 2' },
    { name: 'Moscow' },
    { name: 'Izhevsk' }
  ];
  const component = shallow(
    <RouteList
      routePoints={items}
      onRemoveItem={name => items.splice(items.findIndex(item => item.name === name), 1)}
      onListChange={newList => items = newList}
    />,
  );

  component.props().commonProps.onDelete('point 2');
  expect(items.length).toEqual(3);
  expect(items[1].name).toEqual('Moscow');
});

test('List should rerender when new point added', () => {
  let items = [
    { name: 'point 1' },
    { name: 'point 2' },
    { name: 'Moscow' },
    { name: 'Izhevsk' }
  ];
  const component = shallow(
    <RouteList
      routePoints={items}
      onRemoveItem={name => items.splice(items.findIndex(item => item.name === name), 1)}
      onListChange={newList => items = newList}
    />,
  );

  expect(component.props().list.length).toEqual(4);
  component.setProps({routePoints: ['a', 'b']});
  expect(component.props().list.length).toEqual(2);
});
