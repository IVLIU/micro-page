import * as React from "react";
import useSingleHistory from '../src/useSingleHistory';

const Comp = props => {
  const h = useSingleHistory('BrowserHistory');
  return (
    <h1 onClick={() => h.push('/doctorlist')}>Custom Component</h1>
  )
}

export default Comp;