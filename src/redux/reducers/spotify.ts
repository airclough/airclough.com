import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import type { RootState } from '../store';

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
    const id = await axios.get( `${ url }/me/player/devices`, { headers: { Authorization: `Bearer ${ accessToken }` } } )
      .then( ( { data } ) => {
        if ( !data ) return;
        const { devices } = data;
        const [ device ] = devices.filter( ( { is_active } ) => is_active );
        if ( !device ) return null;
        const { id } = device;

        return id;
      } )
      .catch( ( error ) => console.error( { error } ) );

    return id;
  }
);

const getTrack = createAsyncThunk<any, void, { state: any }>(
  'getTrack',
  async ( _, { dispatch, getState } ) => {
    const { spotify } = getState();
    const { accessToken } = spotify;
    const track = await axios.get( 'https://api.spotify.com/v1/me/player', { headers: { Authorization: `Bearer ${ accessToken }` } } )
      .then( ( { data } ) => {
        // console.log( { data } );
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
        const progress = progress_ms / duration_ms * 100;

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
  }
);

export const startPlaylist = createAsyncThunk<any, void, { state: any }>(
  'startPlaylist',
  async ( { offset, uri }, { getState } ) => {
    const { spotify } = getState();
    const { accessToken } = spotify;

    await axios.put(
      'https://api.spotify.com/v1/me/player/play',
      { context_uri: uri, offset: { position: offset } },
      { headers: { Authorization: `Bearer ${ accessToken }` } }
    ).catch( ( error ) => console.error( { error } ) );

    return true;
  }
);

export const fireCommand = createAsyncThunk<any, void, { state: any }>(
  'fireCommand',
  async ( command, { dispatch, getState } ) => {
    const { spotify } = getState();
    const { accessToken } = spotify;
    const pausePlay = [ 'pause', 'play' ].indexOf( command ) >= 0;

    await axios[ pausePlay ? 'put' : 'post' ](
      `https://api.spotify.com/v1/me/player/${ command }`,
      {},
      { headers: { Authorization: `Bearer ${ accessToken }` } }
    ).catch( ( error ) => console.error( { error } ) );
    if ( command === 'pause' ) dispatch( { type: 'resetState' } );

    return true;
  }
);

const initialState: Spotify = {
  accessToken: null,
  interval: null,
  track: null,
  trackUri: null,
  deviceId: null,
  playing: false,
};

export const spotifySlice = createSlice( {
  extraReducers: {
    [ getDevices.pending ]: () => {
      console.log( 'pending' );
    },
    [ getDevices.fulfilled ]: ( state, { payload } ) => {
      console.log( 'devices/fulfilled', { payload } );
      state.deviceId = payload;
    },
    [ getDevices.rejected ]: () => {
      console.log( 'rejected' );
    },
    [ fireCommand.pending ]: () => {
      console.log( 'pending' );
    },
    [ fireCommand.fulfilled ]: () => {
      console.log( 'fireCommand/fulfilled' );
    },
    [ fireCommand.rejected ]: () => {
      console.log( 'rejected' );
    },
    [ ping.fulfilled ]: ( state, { payload } ) => {
      console.log( 'ping/fulfilled' );
      state.interval = payload;
    },
    [ startPlaylist.pending ]: () => {
      console.log( 'pending' );
    },
    [ startPlaylist.fulfilled ]: ( state, { payload } ) => {
      console.log( 'startPlaylist/fulfilled', { payload } );
    },
    [ startPlaylist.rejected ]: () => {
      console.log( 'rejected' );
    },
    [ getTrack.pending ]: () => {
      console.log( 'pending' );
    },
    [ getTrack.fulfilled ]: ( state, { payload } ) => {
      if ( !payload ) return;
      const { isPlaying, uri } = payload;

      state.playing = isPlaying;
      state.track = payload;
      state.trackUri = uri;
    },
    [ getTrack.rejected ]: () => {
      console.log( 'rejected' );
    },
  },
  initialState,
  name: 'spotify',
  reducers: {
    resetState: ( state ) => {
      clearInterval( state.interval );
      state.deviceId = null;
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
