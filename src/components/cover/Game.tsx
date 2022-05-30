import { Application, Loader } from 'pixi.js';
import React, { FC, useEffect, useRef } from 'react';

import { Scene } from './main';

const Game: FC = () => {
  const ref = useRef( null );

  useEffect( () => {
    const height = 640;
    const width = 640;
    const app = new Application( {
      autoDensity: true,
      backgroundAlpha: 0,
      height,
      resolution: window.devicePixelRatio || 1,
      width,
    } );

    ref.current.appendChild( app.view );

    Loader.shared.add( [
      { name: 'ball', url: '/sprites/ball.png' },
      { name: 'bomb', url: '/icons/bomb.svg' },
      { name: 'field', url: '/sprites/field.png' },
      { name: 'moundSpriteSheet', url: '/sprites/mound.png' },
      { name: 'zone', url: '/sprites/zone.png' },
      { name: 'xmark', url: '/icons/xmark.svg' },
    ] );

    Loader.shared.load( () => {
      const scene: Scene = new Scene( { height, width } );

      app.stage.addChild( scene );
    } );

    return () => app.destroy( true, true );
  }, [] );

  return <div className="Game" ref={ ref } />;
};

export default Game;
