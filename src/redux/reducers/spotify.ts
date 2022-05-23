import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Track {
  albumCover: any;
  artistName: string;
  explicit: boolean;
  isPlaying: boolean;
  progress: number;
  songName: string;
  uri: string;
}

interface Spotify {
  accessToken: string | null;
  interval: any | null;
  track: Track | null;
  trackUri: string | null;
  deviceId: string | null;
  playing: boolean;
}

const url = process.env.NEXT_PUBLIC_SPOTIFY_URL;

export const getDevices = createAsyncThunk<any, void, { state: any }>(
  'getDevices',
  async ( _, { getState } ) => {
    const { spotify } = getState();
    const { accessToken } = spotify;
    const options = { headers: { Authorization: `Bearer ${ accessToken }` } };
    const id = await axios.get( `${ url }/me/player/devices`, options )
      .then( ( { data } ) => {
        if ( !data ) return;
        const { devices } = data;
        const [ device ] = devices.filter( ( { is_active } ) => is_active );
        if ( !device ) return null;
        const { id: deviceId } = device;

        return deviceId;
      } )
      .catch( ( error ) => console.error( { error } ) );

    return id;
  },
);

const getTrack = createAsyncThunk<any, void, { state: any }>(
  'getTrack',
  async ( _, { dispatch, getState } ) => {
    const { spotify } = getState();
    const { accessToken } = spotify;
    const options = { headers: { Authorization: `Bearer ${ accessToken }` } };
    const track = await axios.get( 'https://api.spotify.com/v1/me/player', options )
      .then( ( { data } ) => {
        if ( !data ) return null;
        const { is_playing: isPlaying, item, progress_ms } = data;
        if ( !item ) return {};
        const {
          album,
          artists,
          duration_ms,
          explicit,
          name: songName,
          uri,
        } = item;
        const { images } = album;
        const [ albumCover ] = images
          .sort( ( { height: heightA }, { height: heightB } ) => heightA - heightB )
          .reverse();
        const [ artist ] = artists;
        const { name: artistName } = artist;
        const progress = ( progress_ms / duration_ms ) * 100;

        return {
          albumCover,
          artistName,
          explicit,
          isPlaying,
          progress,
          songName,
          uri,
        };
      } )
      .catch( ( error ) => console.error( { error } ) );
    if ( !track ) dispatch( { type: 'resetState' } );

    return track && track.isPlaying ? track : null;
  },
  {
    condition: ( _, { getState } ) => {
      const { spotify } = getState();
      const { deviceId } = spotify;
      if ( !deviceId ) return false;
    },
  },
);

export const ping = createAsyncThunk<any, void, { state: any }>(
  'ping',
  async ( _, { dispatch } ) => {
    const interval = setInterval( () => {
      dispatch( getTrack() );
    }, 1000 );

    return interval;
  },
);

export const startPlaylist = createAsyncThunk<boolean, any, { state: any }>(
  'startPlaylist',
  async ( { offset, uri }, { getState } ) => {
    const { spotify } = getState();
    const { accessToken } = spotify;

    await axios.put(
      'https://api.spotify.com/v1/me/player/play',
      { context_uri: uri, offset: { position: offset } },
      { headers: { Authorization: `Bearer ${ accessToken }` } },
    ).catch( ( error ) => console.error( { error } ) );

    return true;
  },
);

export const fireCommand = createAsyncThunk<boolean, any, { state: any }>(
  'fireCommand',
  async ( command, { dispatch, getState } ) => {
    const { spotify } = getState();
    const { accessToken } = spotify;
    const pausePlay = [ 'pause', 'play' ].indexOf( command ) >= 0;

    await axios[ pausePlay ? 'put' : 'post' ](
      `https://api.spotify.com/v1/me/player/${ command }`,
      {},
      { headers: { Authorization: `Bearer ${ accessToken }` } },
    ).catch( ( error ) => console.error( { error } ) );
    if ( command === 'pause' ) dispatch( { type: 'resetState' } );

    return true;
  },
);

const initialState: Spotify = {
  accessToken: null,
  deviceId: null,
  interval: null,
  playing: false,
  track: null,
  trackUri: null,
};

export const spotifySlice = createSlice( {
  extraReducers: {
    'getDevices/fulfilled': ( state, { payload } ) => {
      state.deviceId = payload;
    },
    'getDevices/rejected': () => {
      console.log( 'getDevices.rejected' );
    },
    'fireCommand/rejected': () => {
      console.log( 'fireCommand.rejected' );
    },
    'ping/fulfilled': ( state, { payload } ) => {
      state.interval = payload;
    },
    'startPlaylist/rejected': () => {
      console.log( 'startPlaylist.rejected' );
    },
    'getTrack/fulfilled': ( state, { payload } ) => {
      if ( !payload ) return;
      const { isPlaying, uri } = payload;

      state.playing = isPlaying;
      state.track = payload;
      state.trackUri = uri;
    },
    'getTrack/rejected': () => {
      console.log( 'getTrack.rejected' );
    },
  },
  initialState,
  name: 'spotify',
  reducers: {
    resetState: ( state ) => {
      clearInterval( state.interval );
      state.accessToken = null;
      state.deviceId = null;
      state.interval = null;
      state.playing = false;
      state.track = null;
      state.trackUri = null;
    },
    setAccessToken: ( state, action: PayloadAction<Spotify[ 'accessToken' ]> ) => {
      const { payload } = action;

      state.accessToken = payload;
    },
  },
} );

export const { resetState, setAccessToken } = spotifySlice.actions;

export default spotifySlice.reducer;
