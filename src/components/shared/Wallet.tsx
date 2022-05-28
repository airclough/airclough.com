import { providers } from 'ethers';
import React, { FC, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setAddress, setProvider, setStatus } from '../../redux/reducers/wallet';

const Connect: FC = () => {
  const { provider } = useAppSelector( ( { wallet } ) => wallet );
  const onClick = async () => {
    if ( !provider ) return;
    const addresses = await provider.send( 'eth_requestAccounts', [] )
      .catch( ( error ) => console.error( error ) );
    if ( !addresses ) return;
    const [ address ] = addresses;

    setAddress( address || null );
  };

  return (
    <button className="btn btn-primary" onClick={ onClick } type="button">
      <img alt="Metamask" src="/logos/metamask-fox.svg" />
      <div>Connect wallet</div>
    </button>
  );
};

const Disconnect: FC = () => {
  const { displayAddress } = useAppSelector( ( { wallet } ) => wallet );
  const onClick = () => {};

  return (
    <button className="btn btn-primary" onClick={ onClick } type="button">
      <img alt="Metamask" src="/logos/metamask-fox.svg" />
      <div>{ displayAddress }</div>
    </button>
  );
};

const Install: FC = () => (
  <a className="install" href="https://metamask.io/" target="_blank">
    <button className="btn btn-primary" type="button">
      <img alt="Metamask" src="/logos/metamask-fox.svg" />
      <div>Install wallet</div>
    </button>
  </a>
);

const Wallet: FC = () => {
  const { provider, status } = useAppSelector( ( { wallet } ) => wallet );
  const dispatch = useAppDispatch();

  useEffect( () => {
    if ( typeof window !== 'undefined' && 'ethereum' in window ) {
      const { ethereum } = window as any;
      const { isMetaMask } = ethereum;
      if ( !isMetaMask ) { dispatch( setStatus( 'NOT_INSTALLED' ) ); return; }
      const web3Provider = new providers.Web3Provider( ethereum );

      ethereum.on( 'accountsChanged', ( accounts: Array<string> ) => {
        console.log( 'accountsChanged', { accounts } );
        const [ firstAddress ] = accounts;

        dispatch( setAddress( firstAddress || null ) );
        dispatch( setStatus( firstAddress ? 'CONNECTED' : 'NOT_CONNECTED' ) );
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
        const [ firstAddress ] = accounts;

        dispatch( setAddress( firstAddress || null ) );
        dispatch( setStatus( firstAddress ? 'CONNECTED' : 'NOT_CONNECTED' ) );
      } );
  }, [ provider ] );

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
