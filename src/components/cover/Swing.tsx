import React, { FC } from 'react';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { enter } from '../../redux/reducers/wallet';

const Swing: FC = () => {
  const dispatch = useAppDispatch();
  const onClick = async () => {
    dispatch( enter() );
  };

  return (
    <div className="Swing">
      <button className="btn btn-primary" onClick={ onClick } type="button">
        <div>Enter</div>
      </button>
    </div>
  );
};

export default Swing;
