const { ethers } = require( 'hardhat' );

const main = async () => {
  const [ deployer ] = await ethers.getSigners();
  const { address } = deployer;
  const balance = ( await deployer.getBalance() ).toString();
  console.log( { address, balance } );

  const MonumentPark = await ethers.getContractFactory( 'MonumentPark' );
  const contract = await MonumentPark.deploy();
  console.log( 'MonumentPark contract address:', contract.address );
}

main()
  .then( () => process.exit( 0 ) )
  .catch( ( error ) => {
    console.error( { error } );
    process.exit( 1 );
  } );
