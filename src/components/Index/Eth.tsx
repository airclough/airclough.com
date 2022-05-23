import React, { FC } from 'react';

import { useAppSelector } from '../../redux/hooks';

const address = '0xb3c771ea6066609f5386b1e4ee893a14d830511b';
const generateDisplayAddress = ( a: string ) => {
  const { length } = a;
  const firstFour = a.slice( 0, 6 );
  const lastFour = a.slice( length - 4, length );
  const displayAddress = `${ firstFour }...${ lastFour }`;

  return displayAddress;
};

const Eth: FC = () => {
  const { jordanTransition } = useAppSelector( ( { app } ) => app );

  return (
    <div className="Eth" style={ { opacity: +( jordanTransition === 'COMPLETE' ) } }>
      <a href={ `https://etherscan.io/tokenholdings?a=${ address }` } target="_blank">
        { generateDisplayAddress( address ) }
      </a>
    </div>
  );
};

export default Eth;
