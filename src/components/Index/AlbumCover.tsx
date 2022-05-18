import React from 'react';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';

const AlbumCover = () => {
  const { track } = useAppSelector( ( { spotify } ) => spotify );
  if ( !track ) return <></>;
  const { albumCover } = track;
  const { url } = albumCover;

  return (
    <div className="AlbumCover" style={ { opacity: track ? 1 : 0 } }>
      <img src={ url } />
    </div>
  );
};

export default AlbumCover;
