import axios from 'axios';
import { useRouter } from 'next/router';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface Track {
  artistName: string;
  explicit: boolean;
  songName: string;
  uri: string;
}

interface Spotify {
  accessToken: string | null;
  activeDevice: string | null;
  activeTrack: Track | null;
  activeTrackUri: string | null;
  playlist: string | null;
}

interface Props {
  children: ReactNode;
}

const playlistId = process.env.NEXT_PUBLIC_SPOTIFY_PLAYLIST_ID;

const SpotifyContext = createContext<Spotify | undefined>( undefined );

export const SpotifyProvider = ( { children }: Props ) => {
  const [ accessToken, setAccessToken ] = useState<Spotify[ 'accessToken' ]>( null );
  const [ activeDevice, setActiveDevice ] = useState<Spotify[ 'activeDevice' ]>( null );
  const [ activeTrack, setActiveTrack ] = useState<Spotify[ 'activeTrack' ]>( null );
  const [ activeTrackUri, setActiveTrackUri ] = useState<Spotify[ 'activeTrackUri' ]>( null );
  const [ playlist, setPlaylist ] = useState<Spotify[ 'playlist' ]>( null );
  const router = useRouter();
  const { asPath } = router;
  const headers = {
    Authorization: `Bearer ${ accessToken }`,
    'Content-Type': 'application/json',
  };

  useEffect( () => {
    const paramsArray = asPath.slice( 2 )
      .split( '&' );
    const paramsMap = {};

    paramsArray.forEach( ( param ) => {
      const [ key, value ] = param.split( '=' );

      paramsMap[ key ] = value;
    } );

    setAccessToken( paramsMap[ 'access_token' ] );
  }, [ asPath ] );

  useEffect( () => {
    if ( !accessToken ) return;

    axios.get( `https://api.spotify.com/v1/playlists/${ playlistId }`, { headers } )
      .then( ( { data } ) => {
        if ( !data ) return;
        const { uri } = data;

        setPlaylist( uri );
      } )
      .catch( ( error ) => console.error( { error } ) );

    axios.get( 'https://api.spotify.com/v1/me/player/devices', { headers } )
      .then( ( { data } ) => {
        if ( !data ) return;
        const { devices } = data
        const [ device ] = devices.filter( ( { is_active } ) => is_active );
        if ( !device ) return;
        const { id } = device;

        setActiveDevice( id );
      } )
      .catch( ( error ) => console.error( { error } ) );
  }, [ accessToken ] );

  useEffect( () => {
    if ( !activeDevice || !playlist ) return;
    const interval = setInterval( () => {
      axios.get( 'https://api.spotify.com/v1/me/player', { headers } )
        .then( ( { data } ) => {
          console.log( { data } );
          if ( !data ) return;
          const { item } = data;
          const { artists, explicit, name: songName, uri } = item;
          const [ artist ] = artists;
          const { name: artistName } = artist;

          setActiveTrack( {
            artistName,
            explicit,
            songName,
            uri
          } );
          setActiveTrackUri( uri );
        } )
        .catch( ( error ) => console.error( { error } ) );
    }, 1000 );

    axios.put( `https://api.spotify.com/v1/me/player/play`, { context_uri: playlist }, { headers } )
      .catch( ( error ) => console.error( { error } ) );

    return () => clearInterval( interval );
  }, [ activeDevice, playlist ] );

  useEffect( () => {
    console.log( { activeTrackUri } );
  }, [ activeTrackUri ] );

  return (
    <SpotifyContext.Provider
      value={ {
        accessToken,
        activeDevice,
        activeTrack,
        activeTrackUri,
        playlist,
      } }
    >
      { children }
    </SpotifyContext.Provider>
  );
};

export const useSpotify = () => useContext( SpotifyContext );
