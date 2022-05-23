import React, { FC } from 'react';

import { useAppSelector } from '../../redux/hooks';

const Quote: FC = () => {
  const { track } = useAppSelector( ( { spotify } ) => spotify );

  return (
    <div className="Quote" style={ { opacity: track ? 0 : 1 } }>
      <p>No bird soars too high,</p>
      <p>if he soars with his own wings</p>
    </div>
  );
};

export default Quote;
