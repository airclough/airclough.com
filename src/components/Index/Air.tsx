import React, { FC, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setAirIndex, setAirTransition } from '../../redux/reducers/app';

interface LetterProps {
  i: number;
  length: number;
  letter: string;
}

const interval = 500;

const Letter: FC<LetterProps> = ( { i, length, letter } ) => {
  const { airIndex, airTransition } = useAppSelector( ( { app } ) => app );
  const { track } = useAppSelector( ( { spotify } ) => spotify );
  const opacity = airTransition === 'COMPLETE'
    ? 1
    : +( airIndex !== null && i <= airIndex );
  const color = ( track && Math.ceil( length / 2 ) - 1 ) === i ? '#fff' : '#333';

  return (
    <div className="Letter" style={ { color, opacity } }>
      { letter }
    </div>
  );
};

const Air: FC = () => {
  const { air, airTransition } = useAppSelector( ( { app } ) => app );
  const dispatch = useAppDispatch();

  useEffect( () => {
    setTimeout( () => dispatch( setAirTransition( 'ACTIVE' ) ), interval );
  }, [] );

  useEffect( () => {
    if ( airTransition !== 'ACTIVE' ) return;

    air.forEach( ( _letter, i ) => {
      setTimeout( () => {
        dispatch( setAirIndex( i ) );
        if ( i === air.length - 1 ) {
          setTimeout( () => dispatch( setAirTransition( 'COMPLETE' ) ), interval * 2 );
        }
      }, i * interval );
    } );
  }, [ airTransition ] );

  return (
    <div className="Air">
      <h2>{ air.map( ( letter, i ) => <Letter i={ i } key={ i } length={ air.length } letter={ letter } /> ) }</h2>
    </div>
  );
};

export default Air;
