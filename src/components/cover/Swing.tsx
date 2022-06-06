import React, { FC, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { enter } from '../../redux/reducers/wallet';
import eventBus from '../../utils/events';

const Swing: FC = () => {
  const { network } = useAppSelector( ( { wallet } ) => wallet );
  const dispatch = useAppDispatch();
  const [ playInProgress, setPlayInProgress ] = useState( false );
  const onClickPractice = () => eventBus.emit( 'swing', 'practice' );
  const onClickLive = async () => eventBus.emit( 'swing', 'live' );

  useEffect( () => {
    eventBus.on( 'liveSwing', ( coords ) => dispatch( enter( coords ) ) );
    eventBus.on( 'playInProgress', ( p: boolean ) => setPlayInProgress( p ) );
  }, [] );

  return (
    <div className="Swing">
      <button
        className="btn btn-primary"
        disabled={ network !== 'rinkeby' || playInProgress }
        onClick={ onClickLive }
        type="button"
      >
        <div>Live swing</div>
      </button>
      <button
        className="btn btn-outline-secondary"
        disabled={ playInProgress }
        onClick={ onClickPractice }
        type="button"
      >
        <div>Practice swing</div>
      </button>
    </div>
  );
};

export default Swing;
