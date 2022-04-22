import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SET_NAMESAKE } from '../../redux/actions/app';
import { RootState } from '../../redux/reducers';

interface LettersProps {
  namesakeLetter: string;
}

const alphabetMinusQ = 'ABCDEFGHIJKLMNOPRSTUVWXYZ'.split( '' );
const clough = 'CLOUGH'.split( '' );

const Letters: FC<LettersProps> = ( { namesakeLetter } ) => {
  const y = alphabetMinusQ.indexOf( namesakeLetter ) * 8;

  return (
    <div className="Letters">
      { alphabetMinusQ.map( ( letter ) => <div
            style={ { transform: `translate3d( 0, -${ y }rem, 0 )` } }
          >
            { letter }
          </div> )
      }
    </div>
  );
};

const Namesake: FC = () => {
  const { namesake } = useSelector( ( { app }: RootState ) => app );
  const dispatch = useDispatch();

  useEffect( () => {
    clough.forEach( ( letter, i ) => {
      setTimeout( () => {
        namesake[ i ] = letter;
        dispatch( { payload: { namesake }, type: SET_NAMESAKE } );
      }, i * 250 );
    } );
  }, [] );

  return (
    <div className="Namesake">
      <h1>{ namesake.map( ( namesakeLetter ) => <Letters namesakeLetter={ namesakeLetter } /> ) }</h1>
    </div>
  );
};

export default Namesake;
