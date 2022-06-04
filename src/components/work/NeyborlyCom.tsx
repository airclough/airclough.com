/* eslint-disable max-len */
import Image from 'next/image';
import React, { FC } from 'react';

const tech = [
  'React',
  'React Native',
  'Node',
  'Express',
  'AWS',
];

const NeyborlyCom: FC = () => (
  <div className="NeyborlyCom">
    <div className="container">
      <div className="details">
        <h2>Neyborly.com</h2>
        <ul className="links">
          <li><a href="https://neyborly.com" target="_blank">Web App</a></li>
          <li><a href="https://apps.apple.com/us/app/neyborly-access-app/id1583485055" target="_blank">iOS App</a></li>
        </ul>
        <div className="description">
          <p>Built in React and React Native respectively, the Neyborly Web App and Neyborly iOS App powered the event management side of the business.</p>
        </div>
        <div className="tech">
          <h3>Tech:</h3>
          <ul>
            { tech.map( ( item ) => <li key={ item }>{ item }</li> ) }
          </ul>
        </div>
      </div>
      <div className="image">
        <Image
          alt="Neyborly.com"
          height="1380"
          layout="responsive"
          placeholder="empty"
          sizes="50vw"
          src="/images/neyborly-devices.png"
          width="2887"
        />
      </div>
    </div>
  </div>
);

export default NeyborlyCom;
