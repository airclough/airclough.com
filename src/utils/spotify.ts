export const alphabetSansQ = 'ABCDEFGHIJKLMNOPRSTUVWXYZ '.split( '' );

export const getAirJordan = ( track ) => {
  const { songName } = track;
  const [ first, second ] = songName.split( ' ' );
  const air = second
    ? first.toUpperCase().slice( 0, 7 ).split( '' )
    : [];
  if ( !( air.length % 2 ) ) { air.push( '' ); }
  const jordan = Array.from( { length: 6 }, () => ' ' );

  ( second || first )
    .toUpperCase()
    .slice( 0, 6 )
    .split( '' )
    .forEach( ( letter: string, i: number ) => {
      jordan[ i ] = alphabetSansQ.indexOf( letter ) >= 0 ? letter : ' ';
    } );

  return { air, jordan };
};

export const aircloughPlaylist = {
  offset: 0,
  uri: 'spotify:playlist:2wOKZU1WSY7SqFa1Jat5wU',
};

const nintiesAlbums = [
  {
    name: 'Dookie',
    offset: 3,
    uri: 'spotify:album:4uG8q3GPuWHQlRbswMIRS6',
  },
  {
    name: 'Evil Empire',
    offset: 1,
    uri: 'spotify:album:24E6rDvGDuYFjlGewp4ntF',
  },
  {
    name: 'Ill Communication',
    offset: 0,
    uri: 'spotify:album:6lfjbwFGzQ6aSNP1N3JlT8',
  },
  {
    name: 'Nevermind',
    offset: 11,
    uri: 'spotify:album:2guirTSEqLizK7j9i1MTTZ',
  },
  {
    name: 'Ten',
    offset: 4,
    uri: 'spotify:album:5B4PYA7wNN4WdEXdIJu58a',
  },
  {
    name: 'The Colour And The Shape',
    offset: 10,
    uri: 'spotify:album:30ly6F6Xl0TKmyBCU50Khv',
  },
  {
    name: 'The Downward Spiral',
    offset: 13,
    uri: 'spotify:album:5I7lLu8xXJfGRdFUqHaLQU',
  },
  {
    name: 'Third Eye Blind',
    offset: 0,
    uri: 'spotify:album:2gToC0XAblE9h3UZD6aAaQ',
  },
  {
    name: 'Weezer',
    offset: 4,
    uri: 'spotify:album:1xpGyKyV26uPstk1Elgp9Q',
  },
];
const { length } = nintiesAlbums;

export const getRandomNintiesAlbum = () => nintiesAlbums[ Math.floor( Math.random() * length ) ];
