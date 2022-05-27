// SPDX-License-Identifier: MIT

pragma solidity ^0.8.14;

import 'hardhat/console.sol';

contract MonumentPark {
  address public owner;

  mapping ( uint => address ) public winners;

  uint public lotteryId;

  event Entry( address entryAddress, uint distance, uint angle, bool winner );

  constructor() {
    owner = msg.sender;
    lotteryId = 1;
  }

  function getWinnerByLotteryId( uint lottery ) public view returns ( address ) {
    return winners[ lottery ];
  }

  function getBalance() public view returns ( uint ) {
    return address( this ).balance;
  }

  function getLotteryId() public view returns ( uint ) {
    return lotteryId;
  }

  function getRandomNumber() public view returns ( uint ) {
    return uint( keccak256( abi.encodePacked( owner, block.timestamp ) ) );
  }

  function enter() public payable returns ( address, uint, uint, bool ) {
    require( msg.value >= .01 ether );
    uint num = getRandomNumber();
    uint distance = num % 500;
    uint angle = num % 360;
    bool winner = distance > 408 && ( angle >= 350 || angle <= 10 );
    console.log( distance, angle, winner );

    if ( winner ) {
      payable( msg.sender ).transfer( address( this ).balance );
      winners[ lotteryId ] = msg.sender;
      lotteryId++;
    }

    emit Entry( msg.sender, distance, angle, winner );

    return ( msg.sender, distance, angle, winner );
  }

  modifier ownerOnly() {
    require( msg.sender == owner );
    _;
  }
}
