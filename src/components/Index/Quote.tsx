import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../redux/reducers';

const Quote: FC = () => {
  const { namesakeTransition } = useSelector( ( { app }: RootState ) => app );

  return (
    <div className="Quote">
      <p>No bird soars too high,</p>
      <p>if he soars with his own wings</p>
    </div>
  );
};

export default Quote;
