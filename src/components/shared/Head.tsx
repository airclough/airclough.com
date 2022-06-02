// @ts-nocheck
import { config, dom } from '@fortawesome/fontawesome-svg-core';
import NextHead from 'next/head';
import Script from 'next/script'
import React, { FC } from 'react';

config.autoAddCss = false;

const googleAnalyticsId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

const Head: FC = () => (
  <NextHead>
    <title>airclough.com | Robby Fairclough</title>
    <meta name="description" content="Engineered to the exact specifications of championship athletes." />
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <meta property="og:title" content="airclough.com" />
    <meta property="og:description" content="Engineered to the exact specifications of championship athletes." />
    <meta property="og:url" content="https://airclough.com" />
    <meta property="og:type" content="website" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <style>{ dom.css() }</style>
    <Script
      id="googleTagManager"
      onLoad={ () => {
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push( arguments ); }
        gtag( 'js', new Date() );
        gtag( 'config', `${ googleAnalyticsId }` );
      } }
      src={ `https://www.googletagmanager.com/gtag/js?id=${ googleAnalyticsId }` }
      strategy="afterInteractive"
    />
  </NextHead>
);

export default Head;
