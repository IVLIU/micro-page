import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MicroPage from '../src';
import useSingleHistory from '../src/useSingleHistory';
import Comp from './Comp';

const App = () => {
  const h = useSingleHistory('BrowserHistory');
  return (
    <div>
      <div>
        <h1>Main Page</h1>
        <button onClick={() => h.push('/consult')}>病情描述</button>
        <br />
        <button onClick={() => h.push('/doctorlist')}>医生列表</button>
        <br />
        <button onClick={() => h.push('/comp/123')}>自定义组件</button>
      </div>
      <MicroPage 
        portalId="#portal"
        routes={[
          { title: '病情描述', path: '/consult', url: 'http://dev1.m.myweimai.com/new/fastconsult/index.html?businessId=undefined&activityId=&isPrice0=0&skuId=64&doctorId=117013&businessType=1000&doctorUserId=910700000055295599' },
          { title: '医生列表', path: '/doctorlist', url: 'http://dev1.m.myweimai.com/new/dpr/doctorlist.html' },
          { title: '自定义组件', path: '/comp/:id', component: Comp }
        ]}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
