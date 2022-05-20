import {
  faGithub,
  faInstagram,
  faLinkedin,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react';

import { useAppSelector } from '../../redux/hooks';

interface Link {
  href: string;
  icon: any;
}

const links: Array<Link> = [
  {
    href: 'https://twitter.com/airclough',
    icon: faTwitter,
  },
  {
    href: 'https://www.instagram.com/robby.fairclough',
    icon: faInstagram,
  },
  {
    href: 'https://www.linkedin.com/in/robby-fairclough',
    icon: faLinkedin,
  },
  {
    href: 'https://github.com/airclough',
    icon: faGithub,
  },
];

const LinkListItem: FC<Link> = ( { href, icon } ) => (
  <li>
    <a href={ href } target="_blank">
      <FontAwesomeIcon icon={ icon } />
    </a>
  </li>
);

const Links: FC = () => {
  const { jordanTransition } = useAppSelector( ( { app } ) => app );

  return (
    <div className={ `Links ${ ( jordanTransition === 'COMPLETE' && 'show' ) || '' }` }>
      <a href="https://github.com/airclough/airclough.com" target="_blank">
        <button className="btn btn-outline-primary" type="button">
          Source code
        </button>
      </a>
      <ul>
        { links.map( ( { href, icon } ) => <LinkListItem href={ href } icon={ icon } key={ href } /> ) }
        <li className="peffercorn">
          <a href={ 'https://peffercorn.com' } target="_blank">
            <img className="default" src="/logos/peffercorn-p-333.svg" />
            <img className="active" src="/logos/peffercorn-p-bulls-red.svg" />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Links;
