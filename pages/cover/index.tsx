import React, { FC } from 'react';

import Swing from '../../src/components/cover/Swing';
import Wallet from '../../src/components/shared/Wallet';

const Cover: FC = () => {
  return (
    <div className="Cover">
      <Wallet />
      <Swing />
    </div>
  );
};

export default Cover;
