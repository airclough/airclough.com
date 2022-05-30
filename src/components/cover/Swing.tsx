import React, { FC } from 'react';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { enter } from '../../redux/reducers/wallet';
import eventBus from '../../utils/events';

const Swing: FC = () => {
  const dispatch = useAppDispatch();
  const onClick = () => {
    eventBus.emit( 'swing' );
  }
  const onClickEnter = async () => {
    dispatch( enter() );
  };

  return (
    <div className="Swing">
      <button className="btn btn-primary" onClick={ onClick } type="button">
        <div>Live swing</div>
      </button>
      <button className="btn btn-outline-secondary" onClick={ onClick } type="button">
        <div>Practice swing</div>
      </button>
    </div>
  );
};

export default Swing;
