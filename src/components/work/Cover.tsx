import React, { FC } from  'react';

const Cover: FC = () => (
  <div className="Cover">
    <div className="container">
      <div className="logo">
        <div className="imageContainer">
          <img alt="Neyborly logo" src="/logos/neyborly-white.svg" />
        </div>
      </div>
      <p>Originally an events management startup, Neyborly transformed into an omnichannel retail platform over the course of 2020 and 2021. <a href="https://www.youtube.com/watch?v=AJezY7GBUVs" target="_blank">Our goal</a> was to pair online-only retailers that were interested in opening a physical location with landlords that had vacant storefronts. Deals were executed on a revenue share model rather than flat rent. No upfront costs or long-term leases.</p>
      <p>My job as CTO was to build software to broker and manage these deals. Below is a sample of some of the major projects I worked on during my time at Neyborly.</p>
      <div className="buttonContainer">
        <a href="https://neyborly.com" target="_blank">
          <button className="btn btn-outline-primary" type="button">
            <div>Neyborly.com</div>
          </button>
        </a>
      </div>
    </div>
  </div>
);

export default Cover;
