import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../redux/reducers';

const Namesake: FC = () => {
  const { namesake } = useSelector( ( { app }: RootState ) => app );

  return (
    <div className="Namesake">
      <h1>{ namesake }</h1>
    </div>
  );
};

export default Namesake;
