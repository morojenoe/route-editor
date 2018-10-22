import React from 'react';
import ReactDOM from 'react-dom';
import RouteEditor from './route-editor';

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RouteEditor />, div);
  ReactDOM.unmountComponentAtNode(div);
});
