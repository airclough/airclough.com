import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../redux/reducers';

const Eth: FC = () => {
  const { namesakeTransition } = useSelector( ( { app }: RootState ) => app );

  return (
    <div className={ `Eth ${ ( namesakeTransition === 'COMPLETE' && 'show' ) || '' }` }>
      <a href="https://etherscan.io/tokenholdings?a=0xb3c771ea6066609f5386b1e4ee893a14d830511b" target="_blank">
        0xb3c771ea6066609f5386b1e4ee893a14d830511b
      </a>
    </div>
  );
};

export default Eth;
