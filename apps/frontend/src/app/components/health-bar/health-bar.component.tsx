import { memo, ReactElement, useEffect, useRef, useState } from 'react';
import { Graphics as GraphicsComponent } from '@pixi/react';
import { Graphics } from '@pixi/graphics';
import { gsap } from 'gsap';

type HealthBarComponentProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  health: number;
  maxHealth: number;
}

function HealthBarComponent({ x, y, width, height, health, maxHealth }: HealthBarComponentProps): ReactElement {
  const [currentWidth, setCurrentWidth] = useState<number>(health * width / maxHealth);
  const [currentHealth, setCurrentHealth] = useState(health);
  const barRef = useRef(null);

  useEffect(() => {
    setCurrentWidth(width * currentHealth / maxHealth);
  }, [width, currentHealth, maxHealth]);

  useEffect(() => {
    gsap.to({ value: currentHealth }, {
      value: health,
      duration: 0.5,
      onUpdate: function () {
        setCurrentHealth(this.targets()[0].value);
      },
    });
  }, [health, currentHealth]);

  const draw = (g: Graphics) => {
    g.clear();

    // Рисуем рамку
    g.lineStyle(2, 0x000000); // Черная рамка
    g.drawRect(x, y, width, height);

    // Рисуем полоску здоровья
    g.beginFill(0xff0000); // Красная полоска для отображения урона
    g.drawRect(x, y, currentWidth, height);
    g.endFill();
  };

  return <GraphicsComponent ref={barRef} draw={draw} />;
}

export default memo(HealthBarComponent);
