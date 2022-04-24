import { config, dom } from '@fortawesome/fontawesome-svg-core';
import NextHead from 'next/head';
import React, { FC } from 'react';

config.autoAddCss = false;

const Head: FC = () => (
  <NextHead>
    <title>airclough | Engineered to the exact specifications of championship athletes</title>
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <style>{ dom.css() }</style>
  </NextHead>
);

export default Head;
