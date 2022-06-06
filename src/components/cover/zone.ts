import { Container, Graphics } from 'pixi.js';

import eventBus from '../../utils/events';

const height = 320;
const width = 320;

const outOfBounds = ( { x, y }: { x: number; y: number; } ) => {
  if ( x < 160 || x > 480 ) return true;
  if ( y < 160 || y > 480 ) return true;
  return false;
};

export default class BasePath extends Container {
  circle: Graphics;

  pitch: Graphics;

  constructor() {
    super();
    this.height = height;
    this.width = width;
    const graphics = new Graphics();
    graphics.beginFill( 0x132448, 1 );
    graphics.lineStyle( 4, 0xFFFFFF );
    graphics.drawRect( 0, 0, width, height );
    this.addChild( graphics );

    this.on( 'pointermove', this.onPointerMove.bind( this ) );
    this.on( 'pointerdown', this.onPointerDown.bind( this ) );
    eventBus.on( 'swing', this.onSwing.bind( this ) );
    eventBus.on( 'pitch', this.onPitch.bind( this ) );
  }

  private onSwing() {
    this.drawHitBox();
    this.interactive = true;

    eventBus.emit( 'playInProgress', true );
  }

  private onPointerMove( e ) {
    const { x, y } = e.data.global;
    const oob = outOfBounds( { x, y } );
    if ( oob ) return;

    this.circle.x = x - 320;
    this.circle.y = y - 320;
  }

  private onPointerDown( e ) {
    const { x, y } = e.data.global;
    const oob = outOfBounds( { x, y } );
    if ( oob ) return;
    this.interactive = false;

    eventBus.emit( 'swingComplete', { x: Math.round( x - 160 ), y: Math.round( 320 - ( y - 160 ) ) } );
  }

  drawHitBox() {
    if ( this.circle ) { this.circle.destroy(); this.circle = null; }
    if ( this.pitch ) { this.pitch.destroy(); this.pitch = null; }
    this.circle = new Graphics();
    this.circle.lineStyle( 4, 0xba0c35 );
    this.circle.drawCircle( 160, 160, 120 );
    this.addChild( this.circle );
  }

  onPitch( { x, y } ) {
    this.pitch = new Graphics();
    this.pitch.beginFill( 0xffffff );
    this.pitch.drawCircle( x, 320 - y, 16 );
    this.addChild( this.pitch );
  }
}
