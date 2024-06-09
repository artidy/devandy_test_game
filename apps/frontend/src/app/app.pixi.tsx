import { useEffect, useMemo, useState } from 'react';
import { BlurFilter, TextStyle } from 'pixi.js';
import { Stage, Container, Sprite, Text } from '@pixi/react';

export const AppPixi = () => {
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });
  const blurFilter = useMemo(() => new BlurFilter(2), []);
  const bunnyUrl = 'https://pixijs.io/pixi-react/img/bunny.png';

  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });

    console.log(window.innerWidth, window.innerHeight);
  }, []);

  return (
    <Stage width={dimensions.width} height={dimensions.height} options={{ background: 0x1099bb }}>
      <Sprite image={bunnyUrl} x={300} y={150} />
      <Sprite image={bunnyUrl} x={500} y={150} />
      <Sprite image={bunnyUrl} x={400} y={200} />

      <Container x={200} y={200}>
        <Text
          text="Hello World"
          anchor={0.5}
          x={220}
          y={150}
          filters={[blurFilter]}
          style={
            new TextStyle({
              align: 'center',
              fill: '0xffffff',
              fontSize: 50,
              letterSpacing: 20,
              dropShadow: true,
              dropShadowColor: '#E72264',
              dropShadowDistance: 6,
            })
          }
        />
      </Container>
    </Stage>
  );
};
