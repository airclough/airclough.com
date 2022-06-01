/* eslint-disable max-len */
import React, { FC } from 'react';

const tech = [
  'React',
  'Node',
  'Apollo',
  'Nvidia DeepStream',
  'GCP',
];

const ShopifyApp: FC = () => (
  <div className="ShopifyApp">
    <div className="container">
      <div className="details">
        <h2>Shopify App</h2>
        <ul className="links">
          <li><a href="https://apps.shopify.com/neyborly-pop-up" target="_blank">Web App</a></li>
        </ul>
        <div className="description">
          <p>The Neyborly Shopify App, also know as <a href="https://www.youtube.com/watch?v=AJezY7GBUVs" target="_blank">Neyborly Performance Real Estate</a>, is an app for connecting Shopify merchants to commercial real estate opportunities. Through the app merchants are able to browse and apply to commercial real estate store fronts that are currently controlled under the Neyborly umbrella.</p>
          <p>After a rev-share deal is agreed upon, a contract is signed, and the merchant is live in store, the app transforms into a hub to monitor retail performance.</p>
        </div>
        <div className="tech">
          <h3>Tech:</h3>
          <ul>
            { tech.map( ( item ) => <li key={ item }>{ item }</li> ) }
          </ul>
        </div>
      </div>
      <div className="image">
        <img src="/images/neyborly-shopify-app.gif" />
      </div>
    </div>
  </div>
);

export default ShopifyApp;
