import React, { FC } from 'react';

import Quote from './Quote';
import Links from './Links';
import { useAppSelector } from '../../redux/hooks';

const QuoteAndLinks: FC = () => {
  const { jordanTransition } = useAppSelector( ( { app } ) => app );

  return (
    <div className="QuoteAndLinks" style={ { opacity: +( jordanTransition === 'COMPLETE' ) } }>
      <Quote />
      <Links />
    </div>
  );
};

export default QuoteAndLinks;
