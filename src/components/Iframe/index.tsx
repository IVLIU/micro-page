import React, { FC, ReactElement, useMemo, useState, useEffect } from "react";
import { IProps } from './type';
import styles from './index.less';

const Iframe: FC<IProps> = props => {
  // props
  const { pageSrc } = props;
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
        {isPending && <div className={styles['iframe-loading']} />}
        <iframe 
          frameBorder="0" 
          src={pageSrc} 
          onLoad={() => setIsPending(false)} 
          onError={() => setIsPending(false)} 
        />
      </>
    );
  }, [isPending]);
  return rEle;
}

export default Iframe;