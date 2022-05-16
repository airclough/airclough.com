import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../redux/reducers';

const JordanLogo: FC = () => {
  const { airTransition, jordanTransition } = useSelector( ( { app }: RootState ) => app );
  const [ fall, setFall ] = useState( false );

  useEffect( () => {
    if ( jordanTransition === 'COMPLETE' ) setFall( true );
  }, [ jordanTransition ] );

  return (
    <div className="JordanLogo">
      <img
        alt="Jordan logo"
        className={ ( fall && 'fall' ) || '' }
        src="/logos/jordan.svg"
        style={ { opacity: +( airTransition === 'COMPLETE' ) * 0.05 } }
      />
    </div>
  );
};

export default JordanLogo;
