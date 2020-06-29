import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MicroPage from '../.';
import useSingleHistory from '../src/useSingleHistory';
import Comp from './Comp';

const App = () => {
  const h = useSingleHistory('BrowserHistory');
  return (
    <div>
      <button onClick={() => h.push('/comp')}>push</button>
      <MicroPage 
        portalId="#portal"
        routes={[
          { title: '百度', path: '/baidu', url: 'https://www.baidu.com' },
          { title: '新浪', path: '/sina', url: 'https://www.sina.com' },
          { title: '自定义组件', path: '/comp', component: Comp }
        ]}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
