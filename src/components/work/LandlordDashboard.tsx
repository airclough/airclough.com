/* eslint-disable max-len */
import Image from 'next/image';
import React, { FC } from 'react';

const tech = [
  'React',
  'Node',
  'Express',
  'Nvidia DeepStream',
  'AWS',
];

const NeyborlyCom: FC = () => (
  <div className="NeyborlyCom">
    <div className="container">
      <div className="image">
        <Image
          alt="Neyborly Landlord Dashboard"
          height="1254"
          layout="responsive"
          placeholder="empty"
          sizes="50vw"
          src="/images/neyborly-landlord-dashboard.png"
          width="1853"
        />
      </div>
      <div className="details">
        <h2>Landlord Dashboard</h2>
        <ul className="links">
          <li><a href="https://landlord.neyborly.com" target="_blank">Web App</a></li>
        </ul>
        <div className="description">
          <p>The Neyborly Landlord Dashboard is the main hub for landlords to track monetary performance and AI traffic metrics across each of their locations on the Neyborly platform.</p>
          <p>Built in React, the dashboard leverages Twilio for login and notifications, Stripe Connect for monthly payouts, and Nvidia DeepStream for AI metrics (person and vehicle counts).</p>
        </div>
        <div className="tech">
          <h3>Tech:</h3>
          <ul>
            { tech.map( ( item ) => <li key={ item }>{ item }</li> ) }
          </ul>
        </div>
      </div>
    </div>
  </div>
);

export default NeyborlyCom;
