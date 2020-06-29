import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history'
import MicroPage from '../src';

const h = createBrowserHistory()

describe('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MicroPage portalId="#portal" routes={[]} history={h} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
