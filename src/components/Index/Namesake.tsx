import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Air from './Air';
import JordanLogo from './JordanLogo';
import { SET_NAMESAKE, SET_NAMESAKE_TRANSITION } from '../../redux/actions/app';
import { RootState } from '../../redux/reducers';

interface LettersProps {
  multiplier: number;
  namesakeLetter: string;
}

const alphabetMinusQ = 'ABCDEFGHIJKLMNOPRSTUVWXYZ'.split( '' );
const clough = 'CLOUGH'.split( '' );
const interval = 250;

const Letters: FC<LettersProps> = ( { multiplier, namesakeLetter } ) => {
  const y = alphabetMinusQ.indexOf( namesakeLetter ) * multiplier;

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
  const [ multiplier, setMultiplier ] = useState<number>( 8 );
  const dispatch = useDispatch();

  useEffect( () => {
    if ( typeof window === 'undefined' ) return;
    setMultiplier( window.innerWidth > 1024 ? 8 : 2 );

    window.addEventListener( 'resize', () => {
      setMultiplier( window.innerWidth > 1024 ? 8 : 2 );
    } );
  }, [] );

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
      <Air />
      <h1 className={ ( airTransition === 'COMPLETE' && 'show' ) || '' }>
        { namesake.map( ( namesakeLetter, i ) => <Letters key={ i } multiplier={ multiplier } namesakeLetter={ namesakeLetter } /> ) }
      </h1>
      <JordanLogo />
    </div>
  );
};

export default Namesake;
