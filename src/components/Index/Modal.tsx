import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setModal } from '../../redux/reducers/app';
import { startPlaylist } from '../../redux/reducers/spotify';
import { aircloughPlaylist, getRandomNintiesAlbum } from '../../utils/spotify';

const authEndpoint = 'https://accounts.spotify.com/authorize';
const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const redirectUri = process.env.NEXT_PUBLIC_ENV === 'production'
  ? 'https://airclough.com'
  : 'http://localhost:3000';
const scopes = [
  'streaming',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'user-read-playback-state',
  'user-top-read',
];
const queryStringParams = [
  `client_id=${ clientId }`,
  `redirect_uri=${ redirectUri }`,
  'response_type=token',
  `scope=${ scopes.join( ',' ) }`,
  'show_dialog=true',
];

const SpotifyAuth = () => {
  const dispatch = useAppDispatch();
  const href = `${ authEndpoint }?${ queryStringParams.join( '&' ) }`;

  return (
    <div className="SpotifyAuth">
      <h2>Connect your Spotify account for the full airclough.com experience.</h2>
      <p>You will be redirected to spotify.com to authenticate your account. No data or personal information is stored. Proof is in the <a href="">pudding</a>.</p>
      <div className="buttonContainer">
        <div>
          <a href={ href }>
            <button className="btn btn-primary" type="button">
              <FontAwesomeIcon icon={ faSpotify } /> Connect Spotify
            </button>
          </a>
        </div>
        <div onClick={ () => dispatch( setModal( 'HIDDEN' ) ) }>
          <button className="btn btn-outline-primary" type="button">
            No thanks
          </button>
        </div>
      </div>
    </div>
  );
};

const SpotifyPlaylist = () => {
  const dispatch = useAppDispatch();
  const onClickRandom = ( e ) => {
    e.preventDefault();

    dispatch( startPlaylist( getRandomNintiesAlbum() ) );
    dispatch( setModal( 'HIDDEN' ) );
  };

  return (
    <div className="SpotifyPlaylist">
      <h2>NSFW Warning</h2>
      <p>You are about to spin a custom playlist that is curated with tracks rocked during my gym sessions. The lyrics are NSFW even <strong>with</strong> a pair of noise-canceling headphones that trap all sound.</p>
      <p>If you are my employer, a recruiter, or a potential future employer, can I suggest a <a href="#" onClick={ onClickRandom }>random rock album from the 90's</a>?</p>
      <div className="buttonContainer">
        <div onClick={ () => { dispatch( startPlaylist( aircloughPlaylist ) ); dispatch( setModal( 'HIDDEN' ) ); } }>
          <button className="btn btn-primary" type="button">
            I understand
          </button>
        </div>
        <div onClick={ () => dispatch( setModal( 'HIDDEN' ) ) }>
          <button className="btn btn-outline-primary" type="button">
            No thanks, I'll chose my own
          </button>
        </div>
      </div>
    </div>
  );
};

const Modal = () => {
  const { modal } = useAppSelector( ( { app } ) => app );

  return (
    <div className="Modal" style={ { opacity: +( modal !== 'HIDDEN' ), zIndex: modal !== 'HIDDEN' ? 1000 : -1 } }>
      <div className="overlay">
        <div className="content">
          { { 'AUTH': <SpotifyAuth />, 'PLAYLIST': <SpotifyPlaylist /> }[ modal ] || <></> }
        </div>
      </div>
    </div>
  );
};

export default Modal;
