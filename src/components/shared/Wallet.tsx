import { BigNumber, Contract, providers, utils } from 'ethers';
import React, { FC, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  setAddress,
  setContract,
  setProvider,
  setStatus,
} from '../../redux/reducers/wallet';
import eventBus from '../../utils/events';
import MonumentPark from '../../../artifacts/contracts/MonumentPark.sol/MonumentPark.json';

const contractAddress = '0xbbd9262F29Ee6F6a9a2d4d73adcc01fA8b169522';
const { abi } = MonumentPark;

const Connect: FC = () => {
  const { provider } = useAppSelector( ( { wallet } ) => wallet );
  const dispatch = useAppDispatch();
  const onClick = async () => {
    if ( !provider ) return;
    const addresses = await provider.send( 'eth_requestAccounts', [] )
      .catch( ( error ) => console.error( { error } ) );
    if ( !addresses ) return;
    const [ address ] = addresses;

    dispatch( setAddress( address || '' ) );
  };

  return (
    <button className="btn btn-outline-secondary" onClick={ onClick } type="button">
      <img alt="Metamask" src="/logos/metamask-fox.svg" />
      <div>Connect wallet</div>
    </button>
  );
};

const Disconnect: FC = () => {
  const { displayAddress } = useAppSelector( ( { wallet } ) => wallet );
  const onClick = () => {};

  return (
    <button className="btn btn-outline-secondary" onClick={ onClick } type="button">
      <img alt="Metamask" src="/logos/metamask-fox.svg" />
      <div>{ displayAddress }</div>
    </button>
  );
};

const Install: FC = () => (
  <a className="install" href="https://metamask.io/" target="_blank">
    <button className="btn btn-outline-secondary" type="button">
      <img alt="Metamask" src="/logos/metamask-fox.svg" />
      <div>Install wallet</div>
    </button>
  </a>
);

const Wallet: FC = () => {
  const {
    address,
    contract,
    provider,
    status,
  } = useAppSelector( ( { wallet } ) => wallet );
  const dispatch = useAppDispatch();

  useEffect( () => {
    if ( typeof window !== 'undefined' && 'ethereum' in window ) {
      const { ethereum } = window as any;
      const { isMetaMask } = ethereum;
      if ( !isMetaMask ) { dispatch( setStatus( 'NOT_INSTALLED' ) ); return; }
      const web3Provider = new providers.Web3Provider( ethereum );

      ethereum.on( 'accountsChanged', ( accounts: Array<string> ) => {
        console.log( 'accountsChanged', { accounts } );
        const [ address ] = accounts;

        dispatch( setAddress( address || null ) );
        dispatch( setStatus( address ? 'CONNECTED' : 'NOT_CONNECTED' ) );
      } );

      ethereum.on( 'chainChanged', ( chainId: string ) => {
        console.log( 'chainChanged', { chainId } );
        window.location.reload();
      } );

      dispatch( setProvider( web3Provider ) );
    } else {
      dispatch( setStatus( 'NOT_INSTALLED' ) );
    }
  }, [] );

  useEffect( () => {
    if ( !provider ) return;

    provider.listAccounts()
      .then( ( accounts: Array<string> ) => {
        const [ address ] = accounts;

        dispatch( setAddress( address || '' ) );
        dispatch( setStatus( address ? 'CONNECTED' : 'NOT_CONNECTED' ) );
      } );
  }, [ provider ] );

  useEffect( () => {
    if ( !provider || status !== 'CONNECTED' ) return;
    const contract = new Contract(
      contractAddress,
      abi,
      provider.getSigner( 0 )
    );

    dispatch( setContract( contract ) );
  }, [ provider, status ] );

  useEffect( () => {
    if ( !contract ) return;

    contract.on( 'Entry', (
      entryAddress: string,
      distance: BigNumber,
      angle: BigNumber,
      winner: boolean,
      block: any
    ) => {
      if ( entryAddress !== address ) return;
      const entry = {
        distance: distance.toNumber(),
        angle: angle.toNumber(),
        winner,
        block,
      };
      console.log( { entry } );

      eventBus.emit( 'entry', entry );
    } );

    return () => {
      // contract.off( 'entry' );
    }
  }, [ contract ] );

  return (
    <div className="Wallet">
      {
        {
          CONNECTING: <></>,
          CONNECTED: <Disconnect />,
          NOT_CONNECTED: <Connect />,
          NOT_INSTALLED: <Install />,
        }[ status ]
      }
    </div>
  );
};

export default Wallet;
