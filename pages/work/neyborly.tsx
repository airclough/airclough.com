import Head from 'next/head';
import React, { FC } from 'react';

import Footer from '../../src/components/shared/Footer';
import Cover from '../../src/components/work/Cover';
import LandlordDashboard from '../../src/components/work/LandlordDashboard';
import NeyborlyCom from '../../src/components/work/NeyborlyCom';
import Nvidia from '../../src/components/work/Nvidia';
import ShopifyApp from '../../src/components/work/ShopifyApp';

const Work: FC = () => (
  <div className="Work">
    <Head>
      <title>airclough.com | Work - Neyborly</title>
      <meta content="airclough.com | Work - Neyborly" key="title" property="og:title" />
    </Head>
    <Cover />
    <div className="projects">
      <NeyborlyCom />
      <LandlordDashboard />
      <ShopifyApp />
    </div>
    <Nvidia />
    <Footer />
  </div>
);

export default Work;
