import * as PIXI from 'pixi.js';

export interface DamageText {
  text: string;
  x: number;
  y: number;
  id: number;
  style: PIXI.TextStyle;
  alpha: number,
}
