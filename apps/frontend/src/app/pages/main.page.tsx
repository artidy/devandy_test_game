import { ReactElement, useEffect, useRef, useState } from 'react';
import { Container, Stage } from '@pixi/react';
import { Sprite as PixiSprite } from 'pixi.js';

import BackgroundComponent from '../components/background/background.component';
import { Backgrounds } from '../const';

function MainPage(): ReactElement {
  const [dimensions, setDimensions] =
    useState({ width: window.innerWidth, height: window.innerHeight });
  const spriteRef = useRef<PixiSprite>(null);

  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });

    window.addEventListener('resize', resizeBackground);

    // Initial resize to fit the background on mount
    resizeBackground();

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', resizeBackground);
    };
  }, []);

  const resizeBackground = () => {
    const sprite = spriteRef.current;

    if (!sprite) return;

    const scale = Math.max(
      window.innerWidth / sprite.texture.width,
      window.innerHeight / sprite.texture.height
    );

    sprite.width = sprite.texture.width * scale;
    sprite.height = sprite.texture.height * scale;

    sprite.x = (window.innerWidth - sprite.width) / 2;
    sprite.y = (window.innerHeight - sprite.height) / 2;
  };

  return (
    <Stage
      width={dimensions.width}
      height={dimensions.height}
      options={{
        autoDensity: true,
        resolution: window.devicePixelRatio || 1,
      }}>
      <Container>
        <BackgroundComponent
          spriteRef={spriteRef}
          imageUrl={Backgrounds.Main}
          width={dimensions.width}
          height={dimensions.height}
        />
      </Container>
    </Stage>
  )
}

export default MainPage;
