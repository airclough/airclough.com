import { faEthereum } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react';

import Game from './Game';
import Swing from './Swing';
import Wallet from '../shared/Wallet';

const MonumentPark: FC = () => {
  return (
    <div className="MonumentPark">
      <header>
        <div className="container">
          <div className="pool">
            <FontAwesomeIcon icon={ faEthereum } />
          </div>
          <div className="logo">
            <div className="pinstripes">
              <ul>
                { Array.from( { length: 3 } ).map( () => <li/> ) }
              </ul>
            </div>
            <h1><span>Monument</span>Park</h1>
          </div>
          <Wallet />
        </div>
      </header>
      <main className="container">
        <Game />
        <Swing />
      </main>
    </div>
  );
};

export default MonumentPark;
