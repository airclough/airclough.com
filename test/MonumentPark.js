const { expect } = require( 'chai' );
const { ethers } = require( 'hardhat' );

describe( 'MonumentPark contract', () => {
  let MonumentPark;
  let contract;
  let owner;
  let mainAddress;
  let additionalAddresses;

  beforeEach( async () => {
    MonumentPark = await ethers.getContractFactory( 'MonumentPark' );
    [ owner, mainAddress, ...additionalAddresses ] = await ethers.getSigners();
    contract = await MonumentPark.deploy();
  } );

  it( 'Deployment should set the owner', async () => {
    expect( await contract.owner() ).to.equal( owner.address );
  } );

  it( 'Deployment should assign the lottery ID', async () => {
    const lotteryId = await contract.getLotteryId();

    expect( await lotteryId ).to.equal( 1 );
  } );

  it( 'Enter should return entry results', async () => {
    const options = { value: ethers.utils.parseEther( '0.01' ) };
    const entry = await contract.connect( mainAddress ).callStatic.enter( options );
    const [ address, distance, angle, winner ] = entry;
    console.log( { address, distance, angle, winner } );

    expect( JSON.parse( distance ) ).to.be.within( 0, 500 );
    expect( JSON.parse( angle ) ).to.be.within( 0, 360 );
    expect( JSON.parse( winner ) ).to.be.oneOf( [ true, false ] );
  } );
} );
