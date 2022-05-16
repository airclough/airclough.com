import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Air from './Air';
import JordanLogo from './JordanLogo';
import { SET_JORDAN, SET_JORDAN_TRANSITION } from '../../redux/actions/app';
import { RootState } from '../../redux/reducers';

interface LettersProps {
  multiplier: number;
  jordanLetter: string;
}

const alphabetSansQ = 'ABCDEFGHIJKLMNOPRSTUVWXYZ '.split( '' );
const clough = 'CLOUGH'.split( '' );
const interval = 2000;

const Letters: FC<LettersProps> = ( { multiplier, jordanLetter } ) => {
  const y = alphabetSansQ.indexOf( jordanLetter ) * multiplier;

  return (
    <div className="Letters">
      {
        alphabetSansQ.map( ( letter ) => <div
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
  const { airTransition, jordan } = useSelector( ( { app }: RootState ) => app );
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
    dispatch( { payload: { jordanTransition: 'ACTIVE' }, type: SET_JORDAN_TRANSITION } );

    setTimeout( () => {
      dispatch( { payload: { jordan: clough }, type: SET_JORDAN } );
    }, interval );

    setTimeout( () => dispatch( {
      payload: { jordanTransition: 'COMPLETE' },
      type: SET_JORDAN_TRANSITION,
    } ), interval + 1000 );
  }, [ airTransition ] );

  return (
    <div className="Namesake">
      <Air />
      <h1 style={ { opacity: +( airTransition === 'COMPLETE' ) } }>
        {
          jordan.map( ( jordanLetter, i ) => <Letters
            key={ i }
            multiplier={ multiplier }
            jordanLetter={ jordanLetter }
          /> )
        }
      </h1>
      <JordanLogo />
    </div>
  );
};

export default Namesake;
