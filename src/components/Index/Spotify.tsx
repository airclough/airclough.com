import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

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

const Spotify = () => {
  const href = `${ authEndpoint }?${ queryStringParams.join( '&' ) }`;

  return (
    <div className="Spotify">
      <a href={ href }>
        <FontAwesomeIcon icon={ faPlay } />
      </a>
    </div>
  );
};

export default Spotify;
