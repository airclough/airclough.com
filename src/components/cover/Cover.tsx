import React, { FC } from 'react';

import CoverLetter from './CoverLetter';
import ProgressiveCoverLetter from './ProgressiveCoverLetter';
import { useAppSelector } from '../../redux/hooks';

const Cover: FC = () => {
  const { company } = useAppSelector( ( { cover } ) => cover );

  return (
    <div className="Cover">
      <div className="container">
        { company ? <CoverLetter /> : <ProgressiveCoverLetter /> }
      </div>
    </div>
  );
};

export default Cover;
