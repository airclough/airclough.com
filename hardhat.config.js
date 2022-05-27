require( '@nomiclabs/hardhat-waffle' );
require( 'dotenv' ).config( { path: './.env.local' } );

const { ALCHEMY_API_KEY, RINKBY_PRIVATE_KEY } = process.env;

module.exports = {
  networks: {
    rinkby: {
      accounts: [ `${ RINKBY_PRIVATE_KEY }` ],
      url: `https://eth-rinkeby.alchemyapi.io/v2/${ ALCHEMY_API_KEY }`,
    },
  },
  paths: {
    tests: './tests',
  },
  solidity: '0.8.14',
};
