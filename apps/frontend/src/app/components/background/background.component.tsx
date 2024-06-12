import React, { memo, RefObject } from 'react';
import { Sprite } from '@pixi/react';
import { Sprite as PixiSprite } from 'pixi.js';

type BackgroundComponentProps = {
  spriteRef: RefObject<PixiSprite>;
  imageUrl: string;
  width: number;
  height: number;
}

const BackgroundComponent = ({ spriteRef, imageUrl, width, height }: BackgroundComponentProps) => {
  return (
    <Sprite
      ref={spriteRef}
      image={imageUrl}
      anchor={0.5}
      x={width / 2}
      y={height / 2}
      width={width}
      height={height}
    />
  );
};

export default memo(BackgroundComponent);
