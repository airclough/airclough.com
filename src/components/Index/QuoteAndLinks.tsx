import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import Quote from './Quote';
import Links from './Links';
import { RootState } from '../../redux/reducers';

const QuoteAndLinks: FC = () => {
  const { namesakeTransition } = useSelector( ( { app }: RootState ) => app );

  return (
    <div className={ `QuoteAndLinks ${ ( namesakeTransition === 'COMPLETE' && 'show' ) || '' }` }>
      <Quote />
      <Links />
    </div>
  );
};

export default QuoteAndLinks;
