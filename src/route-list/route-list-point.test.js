import React from 'react';
import RouteListPoint from './route-list-point';
import renderer from 'react-test-renderer';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { IconButton } from '@material-ui/core';

configure({ adapter: new Adapter() });
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

test('RouteListPoint snapshot', () => {
  let item = {
    name: 'point 1'
  };

  const component = renderer.create(
    <RouteListPoint item={item} dragHandle={a => a} />,
  );
  
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('RouteListPoint should call onDelete', () => {
  let item = {
    name: 'point 1'
  };
  const removedItemName = 'point removed';
  const component = shallow(
    <RouteListPoint
      item={item}
      dragHandle={a => a}
      commonProps={{
          onDelete: () => item = { name: removedItemName }
      }}
    />,
  );

  expect(component.props().item.name).toEqual(item.name);
  component.props().commonProps.onDelete();
  expect(item.name).toEqual(removedItemName);
});
