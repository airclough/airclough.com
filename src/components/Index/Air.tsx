import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SET_AIR_INDEX, SET_AIR_TRANSITION } from '../../redux/actions/app';
import { RootState } from '../../redux/reducers';

interface LetterProps {
  i: number;
  letter: string;
}

const air = 'AIR'.split( '' );
const interval = 500;

const Letter: FC<LetterProps> = ( { i, letter } ) => {
  const { airIndex } = useSelector( ( { app }: RootState ) => app );

  return (
    <div className={ `Letter ${ airIndex !== null && airIndex >= i ? '' : 'fade' }` }>
      { letter }
    </div>
  );
};

const Air: FC = () => {
  const { airTransition } = useSelector( ( { app }: RootState ) => app );
  const dispatch = useDispatch();

  useEffect( () => {
    setTimeout( () => dispatch( { payload: { airTransition: 'ACTIVE' }, type: SET_AIR_TRANSITION } ), interval );
  }, [] );

  useEffect( () => {
    if ( airTransition !== 'ACTIVE' ) return;

    air.forEach( ( letter, i ) => {
      setTimeout( () => {
        dispatch( { payload: { airIndex: i }, type: SET_AIR_INDEX } );
        if ( i === air.length - 1 ) {
          setTimeout( () => dispatch( {
            payload: { airTransition: 'COMPLETE' },
            type: SET_AIR_TRANSITION,
          } ), interval * 2 );
        }
      }, i * interval );
    } );
  }, [ airTransition ] );

  return (
    <div className="Air">
      <h2>{ air.map( ( letter, i ) => <Letter i={ i } key={ i } letter={ letter } /> ) }</h2>
    </div>
  );
};

export default Air;
