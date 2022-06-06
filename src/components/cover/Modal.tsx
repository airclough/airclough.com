/* eslint-disable max-len */
import React, { FC, useEffect, useState } from 'react';

import eventBus from '../../utils/events';

const playResultMap = {
  FAIR_BALL: {
    header: '',
    description: 'Nice try. But you didn\'t quite get enough of it.',
    src: '/images/robbed.webp',
  },
  STRIKE_OUT: {
    header: '',
    description: 'Grab some pine, meat!',
    src: '/images/strike-out.webp',
  },
  WINNER: {
    header: '',
    description: 'Today- You should consider yourself the luckiest person on the face of the earth.',
    src: '/images/luckiest.webp',
  },
}

const PlayResult = ( { playResult } ) => (
  <div className="PlayResult">
    <img src={ playResult.src } />
    <p className="description">{ playResult.description }</p>
  </div>
)

const Modal: FC = () => {
  const [ playResult, setPlayResult ] = useState<string>( null );

  useEffect( () => {
    eventBus.on( 'playResult', ( p ) => {
      setTimeout( () => {
        const { angle, distance, winner } = p;
        if ( winner ) return setPlayResult( 'WINNER' );
        if ( distance && ( angle <= 45 || angle >= 315 ) ) return setPlayResult( 'FAIR_BALL' );

        setPlayResult( 'STRIKE_OUT' );
      }, 1000 );
    } );
  } )

  return (
    <div className="Modal" style={ { opacity: +( !!playResult ), zIndex: !!playResult ? 1000 : -1 } }>
      <div className="overlay">
        <div className="content">
          { playResult && <PlayResult playResult={ playResultMap[ playResult ] } /> }

          <div className="buttonContainer">
            <div>
              <button className="btn btn-primary" onClick={ () => setPlayResult( null ) } type="button">
                Play again
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
