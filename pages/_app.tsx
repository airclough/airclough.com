import { AppProps } from 'next/app';
import React, { ReactNode } from 'react';
import { Provider as ReduxProvider } from 'react-redux';

import Head from '../src/components/shared/Head';
import { SpotifyProvider } from '../src/contexts/Spotify';
import { store } from '../src/redux/store';

import '../styles/main.scss';

const App = (
  { Component, pageProps }: AppProps,
): ReactNode => (
  <ReduxProvider store={ store }>
    <SpotifyProvider>
      <Head />
      <Component { ...pageProps } />
    </SpotifyProvider>
  </ReduxProvider>
);

export default App;
