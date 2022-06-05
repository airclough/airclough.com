import axios from 'axios';

const aircloughApiUrl = 'https://airclough-express-api-zaczf3hzha-uc.a.run.app';

export const getCompany = ( slug: string ) => axios.get( `${ aircloughApiUrl }/companies/${ slug }` );

export const getMonumentParkLeaderboard = () => axios.get( `${ aircloughApiUrl }/monument-park/leaderboard` );

export const addToMonumentParkLeaderboard = (
  {
    address,
    hash,
    distance
  }: {
    address: string;
    hash: string;
    distance: number;
  }
) => axios.post( `${ aircloughApiUrl }/monument-park/leaderboard`, { address, hash, distance } );
