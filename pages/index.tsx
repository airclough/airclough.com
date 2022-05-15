import React, { FC } from 'react';

import Eth from '../src/components/Index/Eth';
import Namesake from '../src/components/Index/Namesake';
import QuoteAndLinks from '../src/components/Index/QuoteAndLinks';

const Index: FC = () => (
  <div className="Index">
    <Eth />
    <div className="indexContainer">
      <Namesake />
      <QuoteAndLinks />
    </div>
  </div>
);

export default Index;
