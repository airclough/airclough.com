import React, { FC, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { enter } from '../../redux/reducers/wallet';
import eventBus from '../../utils/events';

const Swing: FC = () => {
  const dispatch = useAppDispatch();
  const onClickPractice = () => {
    eventBus.emit( 'swing', 'practice' );
  }
  const onClickLive = async () => {
    eventBus.emit( 'swing', 'live' );
  };

  useEffect( () => {
    eventBus.on( 'liveSwing', ( coords ) => dispatch( enter( coords ) ) );
  }, [] );

  return (
    <div className="Swing">
      <button className="btn btn-primary" onClick={ onClickLive } type="button">
        <div>Live swing</div>
      </button>
      <button className="btn btn-outline-secondary" onClick={ onClickPractice } type="button">
        <div>Practice swing</div>
      </button>
    </div>
  );
};

export default Swing;
