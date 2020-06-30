import React, { FC, ReactElement, useMemo, useState, useEffect } from 'react';
import { IProps } from './type';
import './index.less';

const Iframe: FC<IProps> = props => {
  // props
  const { title, pageSrc } = props;
  // state
  const [isPending, setIsPending] = useState<boolean>(true);
  // effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPending(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);
  // react element
  const rEle: ReactElement | null = useMemo(() => {
    return (
      <>
        {isPending && <div className="iframe-loading" />}
        <iframe
          title={title}
          frameBorder="0"
          src={pageSrc}
          onLoad={() => setIsPending(false)}
          onError={() => setIsPending(false)}
        />
      </>
    );
  }, [isPending]);
  return rEle;
};

export default Iframe;
