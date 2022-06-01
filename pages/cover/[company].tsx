import { useRouter } from 'next/router';
import React, { FC, useEffect } from 'react';

import Cover from '../../src/components/cover/Cover';
import MonumentPark from '../../src/components/cover/MonumentPark';
import MonumentParkRulesAndLeaderboard from '../../src/components/cover/MonumentParkRulesAndLeaderboard';
import Footer from '../../src/components/shared/Footer';
import { useAppDispatch, useAppSelector } from '../../src/redux/hooks';
import { getCompany, setSlug } from '../../src/redux/reducers/cover';

const CompanyCover: FC = () => {
  const { slug } = useAppSelector( ( { cover } ) => cover );
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { query } = router;
  const { company } = query;

  useEffect( () => {
    if ( !company ) return;
    dispatch( setSlug( company as string ) );
  }, [ company ] );

  useEffect( () => {
    if ( !slug ) return;
    dispatch( getCompany( slug ) );
  }, [ slug ] );

  return (
    <div className="CompanyCover">
      <Cover />
      <MonumentPark />
      <MonumentParkRulesAndLeaderboard />
      <Footer />
    </div>
  );
};

export default CompanyCover;
