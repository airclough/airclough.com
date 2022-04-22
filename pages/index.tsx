import React, { FC } from 'react';

import Air from '../src/components/Index/Air';
import JordanLogo from '../src/components/Index/JordanLogo';
import Namesake from '../src/components/Index/Namesake';
import Source from '../src/components/Index/Source';

const Index: FC = () => (
  <div className="Index">
    <div className="indexContainer">
      <Air />
      <Namesake />
      <Source />
      <JordanLogo />
    </div>
  </div>
);

export default Index;
