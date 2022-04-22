import { faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../redux/reducers';

const Source: FC = () => {
  const { namesakeTransition } = useSelector( ( { app }: RootState ) => app );

  return (
    <div className={ `Source ${ ( namesakeTransition !== 'COMPLETE' && 'fade' ) || null }` }>
      <a href="https://github.com/airclough/airclough.com" target="_blank">
        <button className="btn btn-primary" type="button">
          Souce code
        </button>
      </a>
      <ul>
        <li>
          <a href="https://twitter.com/airclough" target="_blank">
            <FontAwesomeIcon icon={ faTwitter } />
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/robby.fairclough/" target="_blank">
            <FontAwesomeIcon icon={ faInstagram } />
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/robby-fairclough/" target="_blank">
            <FontAwesomeIcon icon={ faLinkedin } />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Source;
