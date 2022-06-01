import React, { FC } from  'react';

const tech = [
  'React',
  'Node',
  'Express',
  'AWS',
];

const NeyborlyCom: FC = () => (
  <div className="NeyborlyCom">
    <div className="container">
      <div className="image">
        <img src="/images/neyborly-landlord-dashboard.png" />
      </div>
      <div className="details">
        <h2>Landlord Dashboard</h2>
        <ul className="links">
          <li><a href="https://landlord.neyborly.com" target="_blank">Web App</a></li>
        </ul>
        <div className="description">
          <p>The Neyborly Landlord Dashboard is the main hub for landlords to track monitary performance and AI traffic metrics for each of their locations in the Neyborly system.</p>
        </div>
        <div className="tech">
          <h3>Tech:</h3>
          <ul>
            { tech.map( ( tech ) => <li key={ tech }>{ tech }</li> ) }
          </ul>
        </div>
      </div>
    </div>
  </div>
);

export default NeyborlyCom;
