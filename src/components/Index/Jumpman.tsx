import React, { FC, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setJumpmanTransition } from '../../redux/reducers/app';

const Jumpman: FC = () => {
  const { airTransition, jordanTransition } = useAppSelector( ( { app } ) => app );
  const [ fall, setFall ] = useState( false );
  const dispatch = useAppDispatch();

  useEffect( () => {
    if ( jordanTransition !== 'COMPLETE' ) return;

    setFall( true );
    setJumpmanTransition( 'ACTIVE' );
    setTimeout( () => {
      dispatch( setJumpmanTransition( 'COMPLETE' ) );
    }, 4000 );
  }, [ jordanTransition ] );

  return (
    <div className="Jumpman">
      <img
        alt="Jordan logo"
        className={ ( fall && 'fall' ) || '' }
        src="/logos/jordan.svg"
        style={ { opacity: +( airTransition === 'COMPLETE' ) * 0.05 } }
      />
    </div>
  );
};

export default Jumpman;
