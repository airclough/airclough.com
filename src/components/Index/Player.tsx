import {
  faBackwardStep,
  faForwardStep,
  faPause,
  faPlay,
  faShuffle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setAirJordan, setModal } from '../../redux/reducers/app';
import {
  fireCommand,
  getDevices,
  ping,
  setAccessToken,
  startPlaylist,
} from '../../redux/reducers/spotify';
import { getAirJordan, getRandomNintiesAlbum } from '../../utils/spotify';

const Progress = () => {
  const { track } = useAppSelector( ( { spotify } ) => spotify );
  const { progress } = track || {};

  return (
    <div className="Progress">
      <div style={ { width: `${ progress || 0 }%` } }></div>
    </div>
  );
};

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
  const onClickCommand = ( command: string ) => dispatch( fireCommand( command ) );
  const onClickShuffle = () => dispatch( startPlaylist( getRandomNintiesAlbum() ) );

  return (
    <div className="TrackAndControls">
      <div className="track">
        { track && <Track /> }
      </div>
      <div className="controls">
        <div onClick={ () => onClickCommand( 'previous' ) }><FontAwesomeIcon icon={ faBackwardStep } /></div>
        <div>
          {
            playing
              ? <FontAwesomeIcon icon={ faPause } onClick={ () => onClickCommand( 'pause' ) } />
              : <FontAwesomeIcon icon={ faPlay } onClick={ () => onClickCommand( 'play' ) } />
          }
        </div>
        <div onClick={ () => onClickCommand( 'next' ) }><FontAwesomeIcon icon={ faForwardStep } /></div>
      </div>
      <div className="shuffle">
        <div>
          <FontAwesomeIcon icon={ faShuffle } onClick={ () => onClickShuffle() } />
        </div>
      </div>
      <Progress />
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
    if ( jumpmanTransition !== 'COMPLETE' ) return;

    if ( deviceId ) {
      dispatch( ping() );
      dispatch( setModal( 'PLAYLIST' ) );
    } else {
      if ( !accessToken ) return;
      dispatch( setModal( 'DEVICE' ) );
    }
  }, [ deviceId, jumpmanTransition ] );

  useEffect( () => {
    if ( !track ) return;
    const { air, jordan } = getAirJordan( track );

    dispatch( setAirJordan( { air, jordan } ) );
  }, [ track ] );

  return (
    <div className="Player" style={ { opacity: +( jumpmanTransition === 'COMPLETE' ) } }>
      { deviceId ? <TrackAndControls /> : <Auth /> }
    </div>
  );
};

export default Player;
