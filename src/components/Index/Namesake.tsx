import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SET_NAMESAKE, SET_NAMESAKE_TRANSITION } from '../../redux/actions/app';
import { RootState } from '../../redux/reducers';

interface LettersProps {
  namesakeLetter: string;
}

const alphabetMinusQ = 'ABCDEFGHIJKLMNOPRSTUVWXYZ'.split( '' );
const clough = 'CLOUGH'.split( '' );
const interval = 250;

const Letters: FC<LettersProps> = ( { namesakeLetter } ) => {
  const y = alphabetMinusQ.indexOf( namesakeLetter ) * 8;

  return (
    <div className="Letters">
      { alphabetMinusQ.map( ( letter ) => <div
            key={ letter }
            style={ { transform: `translate3d( 0, -${ y }rem, 0 )` } }
          >
            { letter }
          </div> )
      }
    </div>
  );
};

const Namesake: FC = () => {
  const { airTransition, namesake } = useSelector( ( { app }: RootState ) => app );
  const dispatch = useDispatch();

  useEffect( () => {
    if ( airTransition !== 'COMPLETE' ) return;
    dispatch( { payload: { namesakeTransition: 'ACTIVE' }, type: SET_NAMESAKE_TRANSITION } );

    clough.forEach( ( letter, i ) => {
      setTimeout( () => {
        namesake[ i ] = letter;
        dispatch( { payload: { namesake }, type: SET_NAMESAKE } );
        if ( i === clough.length - 1 ) {
          setTimeout( () => dispatch( {
            payload: { namesakeTransition: 'COMPLETE' },
            type: SET_NAMESAKE_TRANSITION,
          } ), interval * 2 );
        }
      }, ( i + 8 ) * interval );
    } );
  }, [ airTransition ] );

  return (
    <div className="Namesake">
      <h1 className={ ( airTransition !== 'COMPLETE' && 'fade' ) || null }>
        { namesake.map( ( namesakeLetter, i ) => <Letters key={ i } namesakeLetter={ namesakeLetter } /> ) }
      </h1>
    </div>
  );
};

export default Namesake;
