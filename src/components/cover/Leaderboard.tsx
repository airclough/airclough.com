import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getLeaderboard } from '../../redux/reducers/monumentPark';
import { createDisplayAddress } from '../../utils/wallet';

const Entry = ( { address, distance, i } ) => (
  <li>
    <div className="place">{ i + 1 }</div>
    <div className="address">{ createDisplayAddress( address ) }</div>
    <div className="distance">{ distance } Ft.</div>
  </li>
);

const Leaderboard = () => {
  const { leaderboard } = useAppSelector( ( { monumentPark } ) => monumentPark );
  const dispatch = useAppDispatch();

  useEffect( () => {
    dispatch( getLeaderboard() );
  }, [] );

  return (
    <div className="Leaderboard">
      <h2>Leaderboard</h2>
      <ul>
        {
          leaderboard.map( ( { address, distance }, i ) => <Entry
            address={ address }
            distance={ distance }
            i={ i }
            key={ i }
          /> )
        }
      </ul>
    </div>
  );
}

export default Leaderboard;
