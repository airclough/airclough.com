// SPDX-License-Identifier: MIT

pragma solidity ^0.8.14;

import 'hardhat/console.sol';

contract MonumentPark {
  address public owner;

  enum trajectories {
    FLY_BALL,
    GROUND_BALL,
    STRIKE_OUT
  }

  int constant precision = 100;

  int constant fullRotation = 360 * precision;

  int constant halfRotation = 180 * precision;

  mapping ( uint => address ) public winners;

  struct ContactData {
    int angle;
    int distance;
    uint pitchX;
    uint pitchY;
    trajectories trajectory;
  }

  uint public lotteryId;

  event Entry( address entryAddress, ContactData contactData, bool winner );

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

  function abs( int x ) private pure returns ( int ) {
    return x >= 0 ? x : -x;
  }

  function getRandomNumber( address ownerOrSender ) private view returns ( uint ) {
    return uint( keccak256( abi.encodePacked( ownerOrSender, block.timestamp ) ) );
  }

  function getPitchLocation() private view returns ( uint, uint ) {
    uint pitchX = getRandomNumber( owner ) % 320;
    uint pitchY = getRandomNumber( msg.sender ) % 320;

    return ( pitchX, pitchY );
  }

  function getContactPoint( int x, int y, int pitchX, int pitchY ) private pure returns ( int, int ) {
    int contactX = x - pitchX;
    int contactY = y - pitchY;

    return ( contactX, contactY );
  }

  function getDistance( int contactX, int contactY, trajectories trajectory ) private view returns ( int ) {
    int contactSum = abs( contactX ) + abs( contactY );
    console.log( 'contactSum' );
    console.logInt( contactSum );
    /* Inverse percentage. The lower the contact sum the better the contact. */
    int contactPercentage = precision - ( contactSum * precision / 240 );
    console.log( 'contactPercentage' );
    console.logInt( contactPercentage );
    int distanceMultiplier = 5 * contactPercentage;
    console.log( 'distanceMultiplier' );
    console.logInt( distanceMultiplier );
    int distance = trajectory == trajectories.FLY_BALL ? distanceMultiplier : distanceMultiplier / 2;

    return distance;
  }

  function getAngle( int contactX, int contactY ) private view returns ( int ) {
    int angleX = ( contactX * precision ) / 120 * 45;
    console.log( 'angleX' );
    console.logInt( angleX );
    int absAngle = angleX <= 0 ? fullRotation - abs( angleX ) : angleX;
    console.log( 'absAngle' );
    console.logInt( absAngle );
    int angle = contactY < 60 ? absAngle : ( absAngle > halfRotation ? absAngle - halfRotation : absAngle + halfRotation );

    return angle;
  }

  function enter( int x, int y ) public payable returns ( address, bool ) {
    require( msg.value >= .01 ether );
    ContactData memory contactData;
    trajectories trajectory;
    ( uint pitchX, uint pitchY ) = getPitchLocation();
    console.log( 'pitch', pitchX, pitchY );
    contactData.pitchX = pitchX;
    contactData.pitchY = pitchY;
    ( int contactX, int contactY ) = getContactPoint( x, y, int( pitchX ), int( pitchY ) );
    console.logInt( contactX );
    console.logInt( contactY );
    if ( abs( contactX ) > 120 || abs( contactY ) > 120 ) {
      console.log( 'STRIKE_OUT' );
      contactData.angle = 0;
      contactData.distance = 0;
      contactData.trajectory = trajectories.STRIKE_OUT;

      emit Entry( msg.sender, contactData, false );
      return ( msg.sender, false );
    }
    trajectory = contactY <= 0 ? trajectories.FLY_BALL : trajectories.GROUND_BALL;
    int distance = getDistance( contactX, contactY, trajectory );
    int angle = getAngle( contactX, contactY );
    bool winner = distance > 408 && ( angle >= ( 350 * precision ) || angle <= ( 10 * precision ) );
    contactData.angle = angle;
    contactData.distance = distance;
    contactData.trajectory = trajectory;
    console.log( 'angle' );
    console.logInt( angle );
    console.log( 'distance' );
    console.logInt( distance );
    console.log( 'winner' );
    console.logBool( winner );

    if ( winner ) {
      payable( msg.sender ).transfer( address( this ).balance );
      winners[ lotteryId ] = msg.sender;
      lotteryId++;
    }

    emit Entry( msg.sender, contactData, winner );
    return ( msg.sender, winner );
  }

  modifier ownerOnly() {
    require( msg.sender == owner );
    _;
  }
}
