# micro-page

micro-page是一款基于history package实现的类spa工具，配合postmessage可以轻松实现多页面之间的数据通信。
micro-page同时支持iframe形式和react component组件形式嵌入，且内置缓存，保证页面的切换流畅

> 我们平时开发中多页面如果有数据通信，需要借助localstorage或者sessionstorage，并且需要做多端兼容处理，比如微信返回缓存问题，借助micro-page你可以在多页面之间实现类spa的体验

## 安装

```bash
yarn add micro-page
```

#### 使用

This is the folder structure we set up for you:

```typescript
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
```

#### api

```json
{
  portalId: string; // 挂载到的容器，如果不存在会新建
  routes: TRoute[]; // 声明式路由
  onDestroyClose?: () => void; // 暂未实现，可能废弃
}
```
