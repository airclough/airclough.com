import React, { FC } from 'react';

import Swing from './Swing';
import Wallet from '../shared/Wallet';

const MonumentPark: FC = () => {
  return (
    <div className="MonumentPark">
      <header>
        <div className="container">
          <div className="logo">
            <div className="pinstripes">
              <ul>
                { Array.from( { length: 4 } ).map( () => <li/> ) }
              </ul>
            </div>
            <h1><span>Monument</span>Park</h1>
          </div>
          <Wallet />
        </div>
      </header>
      <main className="container">
        <Swing />
      </main>
    </div>
  );
};

export default MonumentPark;
