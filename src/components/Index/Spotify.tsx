import {
  faBackwardStep,
  faForwardStep,
  faPause,
  faPlay
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setAirJordan } from '../../redux/reducers/app';
import { getDevices, getPlaylists, getTrack, setAccessToken } from '../../redux/reducers/spotify';
import { getAirJordanViaTrack } from '../../utils';

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

const TrackAndControls = () => {
  const dispatch = useAppDispatch();
  const onClickPrevious = () => {

  };
  const onClickNext = () => {

  };

  return (
    <div className="TrackAndControls">
      <div className="track"></div>
      <div className="controls">
        <div onClick={ onClickPrevious }><FontAwesomeIcon icon={ faBackwardStep } /></div>
        <div>{ <FontAwesomeIcon icon={ faPlay } /> }</div>
        <div onClick={ onClickNext }><FontAwesomeIcon icon={ faForwardStep } /></div>
      </div>
      <div className="nsfw"></div>
    </div>
  );
};

const Auth = () => {
  const href = `${ authEndpoint }?${ queryStringParams.join( '&' ) }`;

  return (
    <div className="Auth">
      <a href={ href }>
        <FontAwesomeIcon icon={ faPlay } />
      </a>
    </div>
  );
};

const Player = () =>  {
  const { jumpmanTransition } = useAppSelector( ( { app } ) => app );
  const { accessToken, deviceId, mainPlaylistUri, track, trackUri } = useAppSelector( ( { spotify } ) => spotify );
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { asPath } = router;

  useEffect( () => {
    const paramsArray = asPath.slice( 2 )
      .split( '&' );
    const paramsMap: any = {};

    paramsArray.forEach( ( param ) => {
      const [ key, value ] = param.split( '=' );

      paramsMap[ key ] = value;
    } );

    dispatch( setAccessToken( paramsMap.access_token ) );
  }, [ asPath ] );

  useEffect( () => {
    if ( !accessToken ) return;
    dispatch( getDevices() );
  }, [ accessToken ] );

  useEffect( () => {
    if ( !deviceId ) return;
    dispatch( getPlaylists() );
  }, [ deviceId ] );

  useEffect( () => {
    if ( jumpmanTransition !== 'COMPLETE' || !mainPlaylistUri ) return;

    const interval = setInterval( () => {
      // if ( !track ) clearInterval( interval );
      dispatch( getTrack() );
    }, 1000 );

    return () => clearInterval( interval );
  }, [ jumpmanTransition, mainPlaylistUri ] );

  useEffect( () => {
    if ( !track ) return;
    const { air, jordan } = getAirJordanViaTrack( track );

    dispatch( setAirJordan( { air, jordan } ) );
  }, [ track ] );

  return (
    <div className="Player" style={ { opacity: +( jumpmanTransition === 'COMPLETE' ) } }>
      { track ? <TrackAndControls /> : <Auth /> }
    </div>
  );
};

export default Player;
