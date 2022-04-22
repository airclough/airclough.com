import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../redux/reducers';

const Source: FC = () => {
  const { namesakeTransition } = useSelector( ( { app }: RootState ) => app );

  return (
    <div className={ `Source ${ ( namesakeTransition !== 'COMPLETE' && 'fade' ) || null }` }>
      <a href="https://github.com/airclough/airclough.com" target="_blank">
        <button className="btn btn-primary" type="button">
          Souce code
        </button>
      </a>
    </div>
  );
};

export default Source;
