import { Navigate } from 'react-router-dom';
import { ReactElement, useEffect, useRef, useState } from 'react';
import { Stage, Sprite, Container, Text } from '@pixi/react';
import * as PIXI from 'pixi.js';
import { gsap } from 'gsap';
import { PixiPlugin } from 'gsap/PixiPlugin';
import '@gsap/react';

import { UrlPaths } from '@devandy-test-game/shared';
import LoaderComponent from '../components/loader/loader.component';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getIsPlayerLoading, getPlayer } from '../store/players/selectors';
import { getPlayerApi } from '../store/players/actions';
import { setBoss } from '../store/bosses/data';
import { getBoss } from '../store/bosses/selectors';
import { DamageText } from '../types/damage';
import HealthBar from '../components/health-bar/health-bar.component';

// Регистрация PixiPlugin
gsap.registerPlugin(PixiPlugin);
PixiPlugin.registerPIXI(PIXI);

function LayoutPage(): ReactElement {
  const dispatch = useAppDispatch();
  const player = useAppSelector(getPlayer);
  const playerIsLoading = useAppSelector(getIsPlayerLoading);
  const boss = useAppSelector(getBoss);
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [damageTexts, setDamageTexts] = useState<DamageText[]>([]);
  const [health, setHealth] = useState(2000);
  const spriteRef = useRef(null);

  const defaultTextStyle = new PIXI.TextStyle({
    fill: 'red',
    fontSize: 24,
    fontFamily: 'Arial',
  });

  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });

    // Проверка доступности API
    if (window.Telegram?.WebApp) {
      const webApp = window.Telegram.WebApp;
      webApp.expand(); // Разворачивает приложение на весь экран

      webApp.ready(); // Сообщает, что приложение готово к использованию

      const initDataUnsafe = webApp.initDataUnsafe;
      const user = initDataUnsafe?.user;
      const userId = String(user?.id);

      if (userId) {
        dispatch(getPlayerApi(userId));
        dispatch(setBoss({
          id: 1,
          telegramId: '',
          name: 'Гоблин предатель',
          health: 2000,
          level: 10,
          imgUrl: 'assets/images/bosses/goblin.png',
          defence: 50,
          attackSpeed: 200,
          damage: [150, 200],
          resistance: 40,
          drop: [
            'Простой меч',
            'Копье',
            'Броня'
          ],
          skills: [
            {
              id: 1,
              name: 'Обычный удар',
              cooldown: 0,
            },
            {
              id:2,
              name: 'Мощный удар',
              cooldown: 3,
            },
            {
              id: 3,
              name: 'Крик боевого ужаса',
              cooldown: 4,
            },
            {
              id:4,
              name: 'Щит возмездия',
              cooldown: 5,
            },
          ],
        }));
      }

      // Проверка доступности receiveEvent
      if (window.TelegramGameProxy && typeof window.TelegramGameProxy.receiveEvent === 'function') {
        // Здесь можно использовать TelegramGameProxy
        window.TelegramGameProxy.receiveEvent('someEvent', (data) => {
          console.log('Received event:', data);
        });
      } else {
        console.error('TelegramGameProxy.receiveEvent не определен или не является функцией');
      }
    } else {
      console.error('Telegram Web App API не доступен');
    }
  }, []);

  if (playerIsLoading) {
    return <LoaderComponent />
  }

  if (!player || !boss) {
    return <Navigate to={UrlPaths.NotFound} />;
  }

  const getRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const handleClick = (event: any) => {
    const damage = getRandomNumber(100, 200);
    // Получаем координаты клика
    const clickX = event.data.global.x;
    const clickY = event.data.global.y;
    const newDamageText = {
      text: `-${damage}`,
      x: clickX,
      y: clickY,
      id: Date.now(),
      style: defaultTextStyle,
      alpha: 1,
    };

    setDamageTexts((prevState) => [...prevState, newDamageText]);
    setHealth((prev) => Math.max(prev - damage, 0)); // уменьшаем здоровье, не меньше 0

    // Анимация реакции на урон для спрайта
    gsap.to(spriteRef.current, { pixi: { x: "+=10" }, yoyo: true, repeat: 1, duration: 0.1 });

    // Анимация плавного появления текста урона
    gsap.fromTo(
      newDamageText,
      { alpha: 0, y: newDamageText.y },
      {
        alpha: 1,
        y: newDamageText.y - 20,
        duration: 1,
        onUpdate: function() {
          setDamageTexts((prev) =>
            prev.map((d) => (d.id === newDamageText.id ? { ...d, y: newDamageText.y, alpha: newDamageText.alpha } : d))
          );
        },
        onComplete: () => {
          // Анимация плавного исчезновения текста урона
          gsap.to(newDamageText, {
            alpha: 0,
            y: newDamageText.y - 40,
            scale: 0.5,
            duration: 0.5,
            delay: 0.5,
            onUpdate: function() {
              setDamageTexts((prev) =>
                prev.map((d) => (d.id === newDamageText.id ? { ...d, y: newDamageText.y, alpha: newDamageText.alpha } : d))
              );
            },
            onComplete: () => {
              setDamageTexts((prev) => prev.filter((d) => d.id !== newDamageText.id));
            },
          });
        },
      }
    );
  };

  return (
    <Stage width={dimensions.width} height={dimensions.height} options={{ background: 0x1099bb }}>
      <Container>
        <Sprite
          ref={spriteRef}
          image={boss.imgUrl}
          x={dimensions.width / 2 - 100}
          y={20}
          width={200}
          height={200}
          interactive={true}
          pointerdown={handleClick}
        />
        <HealthBar
          x={dimensions.width / 2 - 100}
          y={10}
          width={200}
          height={10}
          health={health}
          maxHealth={boss.health}
        />
        {damageTexts.map((damageText) => (
          <Text
            key={damageText.id}
            text={damageText.text}
            x={damageText.x}
            y={damageText.y}
            anchor={0.5}
            style={damageText.style}
            alpha={damageText.alpha}
          />
        ))}
      </Container>
    </Stage>
  )
}

export default LayoutPage;
