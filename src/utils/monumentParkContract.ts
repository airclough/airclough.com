import { Contract as EthersContract } from 'ethers';

import eventBus from './events';
import { addToMonumentParkLeaderboard } from '../services/airclough-api';
import MonumentPark from '../../artifacts/contracts/MonumentPark.sol/MonumentPark.json';

const { abi } = MonumentPark;
const contractAddress = '0x76f3F26C0251dC71274052C8FC05710B20c09183';

const fairBall = ( distance: number, angle: number ) => distance && ( angle <= 45 || angle >= 315 );

export default class Contract {
  address: string;

  contract: any;

  constructor( { address, signer }: { address: string; signer: any; } ) {
    this.address = address;
    this.contract = new EthersContract(
      contractAddress,
      abi,
      signer,
    );

    this.subscribe();
  }

  subscribe() {
    this.contract.on( 'Entry', (
      entryAddress: string,
      contactData: any,
      winner: boolean,
      blockData: any,
    ) => {
      if ( entryAddress !== this.address ) return;
      const {
        angle,
        distance,
        pitchX,
        pitchY,
        trajectory,
      } = contactData;
      const entry = {
        angle: angle.toNumber() / 100,
        distance: distance.toNumber(),
        pitchX: pitchX.toNumber(),
        pitchY: pitchY.toNumber(),
        trajectory,
        winner,
      };
      const { transactionHash: hash } = blockData;
      console.log( { entry, hash } );

      if ( fairBall( entry.distance, entry.angle ) ) {
        addToMonumentParkLeaderboard( { address: this.address, hash, distance: entry.distance } )
          .catch( ( error ) => console.error( { error } ) );
      }

      eventBus.emit( 'entry', entry );
    } );
  }
}
