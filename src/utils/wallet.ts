export const createDisplayAddress = ( address: string ) => {
  const { length } = address;
  const firstFour = address.slice( 0, 6 );
  const lastFour = address.slice( length - 4, length );
  const displayAddress = `${ firstFour }...${ lastFour }`;

  return displayAddress;
};
