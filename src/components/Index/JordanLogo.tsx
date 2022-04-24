import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../redux/reducers';

const JordanLogo: FC = () => {
  const { airTransition, namesakeTransition } = useSelector( ( { app }: RootState ) => app );
  const [ fall, setFall ] = useState( false );
  const classList = [
    ( airTransition === 'COMPLETE' && 'show' ) || '',
    ( fall && 'fall' ) || '',
  ];

  useEffect( () => {
    if ( namesakeTransition === 'COMPLETE' ) setFall( true );
  }, [ namesakeTransition ] );

  return (
    <div className="JordanLogo">
      <img alt="Jordan logo" className={ classList.join( ' ' ) } src="/logos/jordan.svg" />
    </div>
  );
};

export default JordanLogo;
