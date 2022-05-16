import { useRouter } from 'next/router';
import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Eth from '../src/components/Index/Eth';
import Namesake from '../src/components/Index/Namesake';
import QuoteAndLinks from '../src/components/Index/QuoteAndLinks';
import Spotify from '../src/components/Index/Spotify';
import { SET_ACCESS_TOKEN } from '../src/redux/actions/spotify';

const Index: FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { asPath } = router;

  useEffect( () => {
    console.log( { asPath } );
    const paramsArray = asPath.slice( 2 )
      .split( '&' );
    console.log( { paramsArray } );
    const paramsMap = {};

    paramsArray.forEach( ( param ) => {
      const [ key, value ] = param.split( '=' );

      paramsMap[ key ] = value;
    } );

    dispatch( { payload: { accessToken: paramsMap[ 'access_token' ] }, type: SET_ACCESS_TOKEN } );
  }, [ asPath ] );

  return (
    <div className="Index">
      <Eth />
      <div className="indexContainer">
        <Namesake />
        <QuoteAndLinks />
      </div>
      <Spotify />
    </div>
  );
};

export default Index;
