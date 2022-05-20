import React, { FC } from 'react';

import Eth from '../src/components/Index/Eth';
import Jordan from '../src/components/Index/Jordan';
import QuoteAndLinks from '../src/components/Index/QuoteAndLinks';
import Player from '../src/components/Index/Player';

const Index: FC = () => (
  <div className="Index">
    <Eth />
    <div className="indexContainer">
      <Jordan />
      <QuoteAndLinks />
    </div>
    <Player />
  </div>
);

export default Index;
