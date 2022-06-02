import Head from 'next/head';
import React, { FC } from 'react';

const NotFound: FC = () => (
  <div className="NotFound">
    <Head>
      <title>airclough.com | 404</title>
      <meta content="airclough.com | 404" key="title" property="og:title" />
    </Head>
    <div className="NotFoundContainer">
      <img alt="Jordan crying" src="/images/jordan-crying.png" />
      <a href="/">Home</a>
    </div>
  </div>
);

export default NotFound;
