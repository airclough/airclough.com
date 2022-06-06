import { faEthereum } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react';

import Game from './Game';
import Swing from './Swing';
import Wallet from '../shared/Wallet';
import { useAppSelector } from '../../redux/hooks';

const MonumentPark: FC = () => {
  const { balance } = useAppSelector( ( { wallet } ) => wallet );

  return (
    <div className="MonumentPark" id="monument-park">
      <header>
        <div className="container">
          <div className="pool">
            <FontAwesomeIcon icon={ faEthereum } />
            <div className="balance">{ balance }</div>
          </div>
          <div className="logo">
            <div className="pinstripes">
              <ul>
                { Array.from( { length: 3 } ).map( ( _, i ) => <li key={ i } /> ) }
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
}

export default MonumentPark;
