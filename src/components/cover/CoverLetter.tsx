/* eslint-disable max-len */
import React, { FC, useEffect } from 'react';

import { useAppSelector } from '../../redux/hooks';

const CoverLetter: FC = () => {
  const { company } = useAppSelector( ( { cover } ) => cover );
  const { fields } = company;
  const { Cover, Logo, Name } = fields;
  const [ image ] = Logo;
  const { url } = image;

  return (
    <div className="CoverLetter">
      <div className="logo">
        <img src={ url } />
      </div>
      <p>Welcome { Name }, and thanks for stopping by my site. The purpose of this page is to act as extension of my cover letter in order to show off my past projects and my current interests in software development.</p>
      { Cover && <p /> }
      <p>As noted on my resume, my previous position was as the CTO of Neyborly. I wrote code that ran everywhere from the AWS cloud to Nvidia hardware devices. <a href="">Here</a> is just a small sample of projects I worked on during my time at Neyborly.</p>
      <p>Since leaving Neyborly in April, I have spent time upping my code game and adding a few new skills to my repertoire. One such skill being blockchain development. The Ethereum blockchain and the Solidity programming language to be exact. Below is a game I coded called Monument Park, an homage to the greatest baseball players to ever lace up their spikes. It combines my new found blockchain abilities and my love for the New York Yankees. All the code is up on <a href="https://github.com/airclough/airclough.com">Github</a>.</p>
      <div className="buttonContainer">
        <a href="/work/neyborly">
          <button className="btn btn-primary" type="button">
            <div>Neyborly projects</div>
          </button>
        </a>
        <a href="#monument-park">
          <button className="btn btn-outline-primary" type="button">
            <div>Play Monument Park</div>
          </button>
        </a>
      </div>
    </div>
  );
};

export default CoverLetter;
