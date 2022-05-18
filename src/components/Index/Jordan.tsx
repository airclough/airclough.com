import React, { FC, useEffect, useState } from 'react';

import Air from './Air';
import AlbumCover from './AlbumCover';
import Jumpman from './Jumpman';
import { setJordan, setJordanTransition } from '../../redux/reducers/app';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

interface LettersProps {
  i: number;
  multiplier: number;
  jordanLetter: string;
}

const alphabetSansQ = 'ABCDEFGHIJKLMNOPRSTUVWXYZ '.split( '' );
const interval = 2000;

const Letters: FC<LettersProps> = ( { i, jordanLetter, multiplier } ) => {
  const y = alphabetSansQ.indexOf( jordanLetter ) * multiplier;
  const { track } = useAppSelector( ( { spotify } ) => spotify );
  const color = ( track && ( i === 2 || i === 3 ) ) ? '#fff' : '#333'

  return (
    <div className="Letters">
      {
        alphabetSansQ.map( ( letter ) => <div
          key={ letter }
          style={ { color, transform: `translate3d( 0, -${ y }rem, 0 )` } }
        >
          { letter }
        </div> )
      }
    </div>
  );
};

const Jordan: FC = () => {
  const { airTransition, jordan } = useAppSelector( ( { app } ) => app );
  const [ multiplier, setMultiplier ] = useState<number>( 8 );
  const dispatch = useAppDispatch();

  useEffect( () => {
    if ( typeof window === 'undefined' ) return;
    setMultiplier( window.innerWidth > 1024 ? 8 : 2 );

    window.addEventListener( 'resize', () => {
      setMultiplier( window.innerWidth > 1024 ? 8 : 2 );
    } );
  }, [] );

  useEffect( () => {
    if ( airTransition !== 'COMPLETE' ) return;
    dispatch( setJordanTransition( 'ACTIVE' ) );

    setTimeout( () => {
      dispatch( setJordan( 'CLOUGH'.split( '' ) ) );
    }, interval );

    setTimeout( () => dispatch( setJordanTransition( 'COMPLETE' ) ), interval + 1000 );
  }, [ airTransition ] );

  console.log( { jordan } );

  return (
    <div className="Jordan">
      <Air />
      <h1 style={ { opacity: +( airTransition === 'COMPLETE' ) } }>
        {
          jordan.map( ( jordanLetter, i ) => <Letters
            i={ i }
            jordanLetter={ jordanLetter }
            key={ i }
            multiplier={ multiplier }
          /> )
        }
      </h1>
      <AlbumCover />
      <Jumpman />
    </div>
  );
};

export default Jordan;
