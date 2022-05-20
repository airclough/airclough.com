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
import { setAirJordan, setModal } from '../../redux/reducers/app';
import {
  fireCommand,
  getDevices,
  getTrack,
  setAccessToken,
} from '../../redux/reducers/spotify';
import { getAirJordanViaTrack } from '../../utils/spotify';

const Track = () => {
  const { track } = useAppSelector( ( { spotify } ) => spotify );
  const { albumCover, artistName, songName } = track;
  const { url } = albumCover;

  return (
    <div className="Track">
      <div className="albumCoverContainer" style={ { backgroundImage: `url(${ url })` } } />
      <div className="artistAndSong">
        <div className="artist">{ artistName }</div>
        <div className="song">{ songName }</div>
      </div>
    </div>
  );
};

const TrackAndControls = () => {
  const { playing, track } = useAppSelector( ( { spotify } ) => spotify );
  const dispatch = useAppDispatch();
  const onClick = ( command: string ) => {
    dispatch( fireCommand( command ) );
  }

  return (
    <div className="TrackAndControls">
      { track && <Track /> }
      <div className="controls">
        <div onClick={ () => onClick( 'previous' ) }><FontAwesomeIcon icon={ faBackwardStep } /></div>
        <div>
          {
            playing
              ? <FontAwesomeIcon icon={ faPause } onClick={ () => onClick( 'pause' ) } />
              : <FontAwesomeIcon icon={ faPlay } onClick={ () => onClick( 'play' ) } />
          }
        </div>
        <div onClick={ () => onClick( 'next' ) }><FontAwesomeIcon icon={ faForwardStep } /></div>
      </div>
      <div className="nsfw"></div>
    </div>
  );
};

const Auth = () => {
  const dispatch = useAppDispatch();
  const onClick = () => {
    dispatch( setModal( 'AUTH' ) );
  };

  return (
    <div className="Auth">
      <div onClick={ onClick }>
        <FontAwesomeIcon icon={ faPlay } />
      </div>
    </div>
  );
};

const Player = () =>  {
  const { jumpmanTransition } = useAppSelector( ( { app } ) => app );
  const {
    accessToken,
    deviceId,
    track,
    trackUri,
  } = useAppSelector( ( { spotify } ) => spotify );
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
    if ( !deviceId || jumpmanTransition !== 'COMPLETE' ) return;
    const interval = setInterval( () => {
      dispatch( getTrack() );
    }, 1000 );

    dispatch( setModal( 'PLAYLIST' ) );

    return () => clearInterval( interval );
  }, [ deviceId, jumpmanTransition ] );

  useEffect( () => {
    if ( !track ) return;
    const { air, jordan } = getAirJordanViaTrack( track );

    dispatch( setAirJordan( { air, jordan } ) );
  }, [ track ] );

  return (
    <div className="Player" style={ { opacity: +( jumpmanTransition === 'COMPLETE' ) } }>
      { deviceId ? <TrackAndControls /> : <Auth /> }
    </div>
  );
};

export default Player;
