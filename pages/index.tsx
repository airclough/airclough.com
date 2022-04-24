import React, { FC } from 'react';

import Namesake from '../src/components/Index/Namesake';
import QuoteAndLinks from '../src/components/Index/QuoteAndLinks';

const Index: FC = () => (
  <div className="Index">
    <div className="indexContainer">
      <Namesake />
      <QuoteAndLinks />
    </div>
  </div>
);

export default Index;
