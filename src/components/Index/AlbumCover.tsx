import React, { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';

const AlbumCover = () => {
  const { track, trackUri } = useAppSelector( ( { spotify } ) => spotify );
  const [ albumCovers, setAlbumCovers ] = useState( [] );
  const [ transition, setTransition ] = useState<boolean>( false );

  useEffect( () => {
    if ( !track ) return;
    const { albumCover } = track;
    const { url } = albumCover;

    setAlbumCovers( [ ...albumCovers, { trackUri, url, x: 100 } ] );
    setTimeout( () => {
      setTransition( true );
    }, 100 );
  }, [ trackUri ] );

  useEffect( () => {
    if ( !transition ) return;
    const albumCoversMap = albumCovers.map( ( t ) => ( { ...t, x: t.x - 100 } ) );
    const [ _, albumCover ] = albumCoversMap;

    setAlbumCovers( albumCoversMap );
    setTimeout( () => {
      setAlbumCovers( [ ( albumCover || _ ) ] );
      setTransition( false );
    }, 500 );
  }, [ transition ] );

  return (
    <div className="AlbumCover" style={ { opacity: track ? 1 : 0 } }>
      {
        albumCovers.map( ( { trackUri: uri, url, x } ) => <div
          className="albumCover"
          key={ uri }
          style={ { backgroundImage: `url( ${ url } )`, transform: `translate3d( ${ x }%, 0, 0 )` } }/> )
      }
    </div>
  );
};

export default AlbumCover;
