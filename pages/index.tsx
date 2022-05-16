import React, { FC } from 'react';

import Eth from '../src/components/Index/Eth';
import Jordan from '../src/components/Index/Jordan';
import QuoteAndLinks from '../src/components/Index/QuoteAndLinks';
import Spotify from '../src/components/Index/Spotify';

const Index: FC = () => (
  <div className="Index">
    <Eth />
    <div className="indexContainer">
      <Jordan />
      <QuoteAndLinks />
    </div>
    <Spotify />
  </div>
);

export default Index;
