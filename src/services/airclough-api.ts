import axios from 'axios';

const aircloughApiUrl = 'https://airclough-express-api-zaczf3hzha-uc.a.run.app';

export const getCompany = ( slug: string ) => axios.get( `${ aircloughApiUrl }/companies/${ slug }` );
