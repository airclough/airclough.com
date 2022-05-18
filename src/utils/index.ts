export const getAirJordanViaTrack = ( track ) => {
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
    .forEach( ( letter, i ) => { jordan[ i ] = letter || ' '; } );

  return { air, jordan };
};
