import axios from 'axios';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../redux/reducers';

const authEndpoint = 'https://accounts.spotify.com/authorize';
const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
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
  const { accessToken } = useSelector( ( { spotify }: RootState ) => spotify );
  const dispatch = useDispatch();
  const href = `${ authEndpoint }?${ queryStringParams.join( '&' ) }`
  const onClick = () => {};

  useEffect( () => {
    console.log( { accessToken } );
    if ( !accessToken ) return;
    const playlistId = '1QghL2L61S2TUF6fDUCuIu';
    const headers = {
      Authorization: `Bearer ${ accessToken }`,
      'Content-Type': 'application/json',
    };

    axios.get( `https://api.spotify.com/v1/playlists/${ playlistId }`, { headers } )
      .then( ( { data } ) => {
        const { tracks } = data;
        const { items } = tracks;
        const [ first, second, third ] = items;
        const { track } = second;
        const { uri: context_uri } = track;
        console.log( { context_uri } );

        axios.put( `https://api.spotify.com/v1/me/player/play`, {
          uris: [ context_uri ]
        }, { headers } ).catch( ( error ) => console.error( { error } ) );
      } )
      .catch( ( error ) => console.error( { error } ) );
  }, [ accessToken ] );

  return (
    <div className="Spotify">
      <a href={ href }>
        <FontAwesomeIcon icon={ faPlay } />
      </a>
    </div>
  );
};

export default Spotify;
