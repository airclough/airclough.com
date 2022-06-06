/* eslint-disable max-len */
import React from 'react';

import Leaderboard from './Leaderboard';

const MonumentParkRulesAndLeaderboard = () => (
  <div className="MonumentParkRulesAndLeaderboard">
    <div className="container">
      <div className="rules">
        <h2>Monument Park Rules</h2>
        <ul>
          <li>The goal of the game is in its name. Hit a home run into Monument Park at Yankee Stadium and win the ETH pot.</li>
          <li>To get started, connect your <a href="https://metamask.io/" target="_blank">MetaMask wallet</a> and join the Rinkeby Test Network. <a href="https://rinkebyfaucet.com/" target="_blank">Here</a> is a link to a faucet for access to test ETH.</li>
          <li>Click the <span>live swing</span> button and guess the pitch location. The closer the pitch to the center of the red circle the better the launch angle and contact.</li>
          <li>MetaMask will pop up asking to confirm the transaction. For greater transaction success rates, edit the gas priority to <span>high</span>. We are running on a test net, so it's fake money.</li>
          <li>Can't an argument be made that all crypto is fake money, regardless of network? See, the thing about tha-- As there's a drive into deep left field by Castellanos and that'll be a home run.</li>
          <li>Once the transaction is confirmed on the block, the pitch will be thrown. Good luck.</li>
        </ul>
        <p>For a look at the inner workings of Monument Park, <a href="https://github.com/airclough/airclough.com/blob/main/contracts/MonumentPark.sol" target="_blank">here</a> is where you can find the code to the smart contract that has been deployed to the Rinkeby Test Network.</p>
      </div>
      <Leaderboard />
    </div>
  </div>
);

export default MonumentParkRulesAndLeaderboard;
