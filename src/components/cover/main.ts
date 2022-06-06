import {
  AnimatedSprite,
  BaseTexture,
  Container,
  Loader,
  Rectangle,
  Sprite,
  Texture,
  Ticker,
} from 'pixi.js';
import Tween from '@tweenjs/tween.js';

import Zone from './zone';
import eventBus from '../../utils/events';

interface Coords {
  x: number;
  y: number;
}

const trajectoryMap = {
  0: 'STRIKE_OUT',
  1: 'GROUND_BALL',
  2: 'FLY_BALL',
};

const angleToRadians = ( angle: number ) => angle * ( Math.PI / 180 );

const aas = ( { angle, distance }: { angle: number; distance: number; } ) => {
  const x = ( distance * Math.sin( angleToRadians( angle ) ) ) / Math.sin( angleToRadians( 90 ) );
  const y = ( x * Math.sin( angleToRadians( 90 - angle ) ) ) / Math.sin( angleToRadians( angle ) );

  return { x, y };
};

class ExtendedAnimatedSprite extends AnimatedSprite {
  frames: Array<Texture>;

  constructor( {
    baseTexture,
    frameHeight: h,
    frameWidth: w,
    numFrames,
    reverse = false,
    startFrame = 0,
  }: {
    baseTexture: BaseTexture;
    frameHeight: number;
    frameWidth: number;
    numFrames: number;
    reverse?: boolean;
    startFrame?: number;
  } ) {
    const l = startFrame + numFrames;
    const frames = [];

    for ( let i = startFrame; i < l; i++ ) {
      frames.push( new Texture( baseTexture, new Rectangle( i * w, 0, w, h ) ) );
    }

    super( !reverse ? frames : frames.reverse() );
    this.frames = frames;
  }
}

export class Scene extends Container {
  private ball: ExtendedAnimatedSprite | null;

  private field: Sprite;

  private homePlateCoords: Coords;

  private icon: Sprite | null;

  private play: any;

  private rubber: ExtendedAnimatedSprite | null;

  private swingType: string;

  private zone: Zone | null;

  constructor( { height, width }: { height: number; width: number; } ) {
    super();
    this.width = width;
    this.height = height;
    this.field = this.createField();
    this.rubber = this.createRubber();
    this.zone = this.createZone();
    this.homePlateCoords = { x: width / 2, y: 520 };

    this.addChild( this.field );
    this.addChild( this.rubber );
    this.addChild( this.zone );

    this.rubber.play();

    eventBus.on( 'swing', this.onSwing.bind( this ) );
    eventBus.on( 'swingComplete', this.onSwingComplete.bind( this ) );
    eventBus.on( 'entry', this.onEntry.bind( this ) );
  }

  createField() {
    const field = Sprite.from( Loader.shared.resources.field.url );
    field.anchor.set( 0.5 );
    field.x = this._width / 2;
    field.y = this._height / 2;

    return field;
  }

  createZone() {
    const zone = new Zone();
    zone.scale.set( 0.4, 0.4 );
    zone.x = 80;
    zone.y = 502;
    zone.pivot.x = 160;
    zone.pivot.y = 160;

    return zone;
  }

  createRubber() {
    const baseTexture = BaseTexture.from( Loader.shared.resources.ball.url );
    baseTexture.height = 4;
    baseTexture.width = 60;
    const rubber = new ExtendedAnimatedSprite( {
      baseTexture,
      frameHeight: 4,
      frameWidth: 12,
      numFrames: 5,
      reverse: true,
    } );
    rubber.anchor.set( 0.5 );
    rubber.animationSpeed = 1 / 3;
    rubber.loop = false;
    rubber.x = this._width / 2;
    rubber.y = 460;

    return rubber;
  }

  createBall() {
    const baseTexture = BaseTexture.from( Loader.shared.resources.ball.url );
    baseTexture.height = 4;
    baseTexture.width = 60;
    const ball = new ExtendedAnimatedSprite( {
      baseTexture,
      frameHeight: 4,
      frameWidth: 12,
      numFrames: 5,
    } );
    ball.anchor.set( 0.5 );
    ball.animationSpeed = 1 / 3;
    ball.loop = false;
    ball.x = this._width / 2;
    ball.y = 460;

    this.addChild( ball );

    return ball;
  }

  onSwing( swingType: string ) {
    if ( this.icon ) { this.icon.destroy(); this.icon = null; }
    this.swingType = swingType;
    this.field.destroy();
    this.field = null;
    this.rubber.destroy();
    this.rubber = null;
    this.zone.scale.set( 1, 1 );
    this.zone.x = this._width / 2;
    this.zone.y = this._height / 2;
  }

  onSwingComplete( { x, y } ) {
    this.field = this.createField();
    this.rubber = this.createRubber();
    this.zone.scale.set( 0.4, 0.4 );
    this.zone.x = 80;
    this.zone.y = 502;

    this.addChild( this.field );
    this.addChild( this.rubber );

    this.rubber.play();

    if ( this.swingType === 'live' ) eventBus.emit( 'liveSwing', [ x, y ] );
    if ( this.swingType === 'practice' ) this.onPracticeSwing( [ x, y ] );
  }

  onPracticeSwing( [ x, y ] ) {
    const pitchX = Math.floor( Math.random() * 321 );
    const pitchY = Math.floor( Math.random() * 321 );
    const contactX = x - pitchX;
    const contactY = y - pitchY;
    if ( Math.abs( contactX ) > 120 || Math.abs( contactY ) > 120 ) {
      return this.onEntry( {
        angle: 0,
        distance: 0,
        pitchX,
        pitchY,
        trajectory: 0,
      } );
    }
    const trajectory = contactY <= 0 ? 2 : 1;
    const distanceMultiplier = 500 * ( 1 - ( ( Math.abs( contactX ) + Math.abs( contactY ) ) / 160 ) );
    const distance = trajectory === 2 ? distanceMultiplier : distanceMultiplier / 2;
    const angleX = ( contactX / 120 ) * 45;
    const absAngle = angleX <= 0 ? 360 - Math.abs( angleX ) : angleX;
    const angle = contactY < 60 ? absAngle : absAngle > 180 ? absAngle - 180 : absAngle + 180;

    this.onEntry( {
      angle,
      distance,
      pitchX,
      pitchY,
      trajectory,
    } );
  }

  onEntry( entry: any ) {
    const { angle, trajectory } = entry;
    this.play = { ...entry, angle: angle || 360, trajectory: trajectoryMap[ trajectory ] };
    if ( this.rubber ) {
      this.rubber.destroy();
      this.rubber = null;
    }
    this.ball = this.createBall();
    this.ball.onComplete = () => this.pitch();
    this.ball.play();
  }

  pitch() {
    const ballInPlay = true;
    const coords = { x: this.ball.x, y: this.ball.y };
    const tweenUpdate = () => Tween.update();
    const tween = new Tween.Tween( coords )
      .to( this.homePlateCoords, 460 )
      .onUpdate( ( newCoords ) => {
        if ( this.ball.y >= this._height / 2 - 16 && !this.rubber ) {
          this.rubber = this.createRubber();
          this.addChild( this.rubber );
          this.rubber.play();
        }
        const { x, y } = newCoords;

        this.ball.x = x;
        this.ball.y = y;
      } )
      .onComplete( () => ( ballInPlay ? this.ballInPlay() : this.ballInGlove() ) );

    Ticker.shared.add( tweenUpdate );

    tween.start();
  }

  ballInPlay() {
    Ticker.shared.remove( this.pitch, this );
    const {
      angle,
      distance,
      pitchX,
      pitchY,
      trajectory,
    } = this.play;
    eventBus.emit( 'pitch', { x: pitchX, y: pitchY } );
    if ( !angle || !distance || !trajectory ) return this.ballInGlove();
    const { x, y } = aas( { angle, distance } );
    const endCoords = { x: this.homePlateCoords.x - x, y: this.homePlateCoords.y - y };
    const coords = { x: this.ball.x, y: this.ball.y };
    const time = distance * 10;
    const tweenUpdate = () => Tween.update();
    const tween = new Tween.Tween( coords )
      .to( endCoords, time > 2000 ? time : 2000 )
      .easing( trajectory === 'FLY_BALL' ? Tween.Easing.Linear.None : Tween.Easing.Quadratic.Out )
      .onUpdate( ( newCoords, elapsed ) => {
        if ( !this.ball ) return;
        if ( trajectory !== 'GROUND_BALL' ) {
          const ascending = elapsed < 0.5;
          this.ball.height = ascending ? 4 * ( 1 + ( elapsed * 8 ) ) : 4 * ( 9 - ( elapsed * 8 ) );
          this.ball.width = ascending ? 12 * ( 1 + ( elapsed * 8 ) ) : 12 * ( 9 - ( elapsed * 8 ) );
        }
        this.ball.x = newCoords.x;
        this.ball.y = newCoords.y;
      } )
      .onComplete( this.playComplete.bind( this, tweenUpdate ) );

    Ticker.shared.add( tweenUpdate );

    tween.start();

    return true;
  }

  ballInGlove() {
    Ticker.shared.remove( this.pitch, this );
    this.playComplete();
  }

  playComplete( tweenUpdate?: any ) {
    if ( tweenUpdate ) Ticker.shared.remove( tweenUpdate );
    const { x, y } = this.ball;
    this.ball.destroy();
    this.ball = null;
    const iconAttrs = this.setIconAttrs();
    if ( iconAttrs ) {
      const { height, name, width } = iconAttrs;
      this.icon = Sprite.from( Loader.shared.resources[ name ].url );
      this.icon.anchor.set( 0.5 );
      this.icon.height = height;
      this.icon.width = width;
      this.icon.x = x;
      this.icon.y = y;

      this.addChild( this.icon );

      eventBus.emit( 'playInProgress', false );
      eventBus.emit( 'playResult', this.play );
    }
  }

  setIconAttrs(): any {
    const { winner } = this.play;

    return winner
      ? { height: 24, name: 'bomb', width: 24 }
      : { height: 12, name: 'xmark', width: 12 };
  }
}
