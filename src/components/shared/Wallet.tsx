import { Contract, providers } from 'ethers';
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

const contractAddress = '0x76f3F26C0251dC71274052C8FC05710B20c09183';
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
        const [ account ] = accounts;

        dispatch( setAddress( account || null ) );
        dispatch( setStatus( account ? 'CONNECTED' : 'NOT_CONNECTED' ) );
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
        const [ account ] = accounts;

        dispatch( setAddress( account || '' ) );
        dispatch( setStatus( account ? 'CONNECTED' : 'NOT_CONNECTED' ) );
      } );
  }, [ provider ] );

  useEffect( () => {
    if ( !provider || status !== 'CONNECTED' ) return;
    const c = new Contract(
      contractAddress,
      abi,
      provider.getSigner( 0 ),
    );

    dispatch( setContract( c ) );
  }, [ provider, status ] );

  useEffect( () => {
    if ( !contract ) return;

    contract.on( 'Entry', (
      entryAddress: string,
      contactData: any,
      winner: boolean,
      blockData: any,
    ) => {
      if ( entryAddress !== address ) return;
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
      };
      console.log( { entry } );

      eventBus.emit( 'entry', entry );
    } );
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
