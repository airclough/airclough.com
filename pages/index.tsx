import Head from 'next/head';
import React, { FC } from 'react';

import Eth from '../src/components/Index/Eth';
import Jordan from '../src/components/Index/Jordan';
import Modal from '../src/components/Index/Modal';
import Player from '../src/components/Index/Player';
import QuoteAndLinks from '../src/components/Index/QuoteAndLinks';

const Index: FC = () => (
  <div className="Index">
    <Head>
      <title>airclough.com | Robby Fairclough</title>
      <meta content="airclough.com | Robby Fairclough" key="title" property="og:title" />
    </Head>
    <Eth />
    <div className="indexContainer">
      <Jordan />
      <QuoteAndLinks />
    </div>
    <Player />
    <Modal />
  </div>
);

export default Index;
