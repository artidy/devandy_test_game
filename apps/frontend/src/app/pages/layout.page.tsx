import { Outlet } from 'react-router-dom';
import { ReactElement, useEffect } from 'react';

import LoaderComponent from '../components/loader/loader.component';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getIsPlayerLoading } from '../store/players/selectors';
import { getPlayerApi } from '../store/players/actions';
import { isBossesLoading } from '../store/bosses/selectors';
import { getBossesApi } from '../store/bosses/actions';

function LayoutPage(): ReactElement {
  const dispatch = useAppDispatch();
  const playerIsLoading = useAppSelector(getIsPlayerLoading);
  const bossesIsLoading = useAppSelector(isBossesLoading);

  useEffect(() => {
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
      }

      dispatch(getBossesApi());

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

  if (playerIsLoading || bossesIsLoading) {
    return <LoaderComponent />
  }

  // const handleClick = (event: any) => {
  //   const damage = getRandomNumber(100, 200);
  //   // Получаем координаты клика
  //   const clickX = event.data.global.x;
  //   const clickY = event.data.global.y;
  //   const newDamageText = {
  //     text: `-${damage}`,
  //     x: clickX,
  //     y: clickY,
  //     id: Date.now(),
  //     style: defaultTextStyle,
  //     alpha: 1,
  //   };
  //
  //   setDamageTexts((prevState) => [...prevState, newDamageText]);
  //   setHealth((prev) => Math.max(prev - damage, 0)); // уменьшаем здоровье, не меньше 0
  //
  //   // Анимация реакции на урон для спрайта
  //   gsap.to(spriteRef.current, { pixi: { x: "+=10" }, yoyo: true, repeat: 1, duration: 0.1 });
  //
  //   // Анимация плавного появления текста урона
  //   gsap.fromTo(
  //     newDamageText,
  //     { alpha: 0, y: newDamageText.y },
  //     {
  //       alpha: 1,
  //       y: newDamageText.y - 20,
  //       duration: 1,
  //       onUpdate: function() {
  //         setDamageTexts((prev) =>
  //           prev.map((d) => (d.id === newDamageText.id ? { ...d, y: newDamageText.y, alpha: newDamageText.alpha } : d))
  //         );
  //       },
  //       onComplete: () => {
  //         // Анимация плавного исчезновения текста урона
  //         gsap.to(newDamageText, {
  //           alpha: 0,
  //           y: newDamageText.y - 40,
  //           scale: 0.5,
  //           duration: 0.5,
  //           delay: 0.5,
  //           onUpdate: function() {
  //             setDamageTexts((prev) =>
  //               prev.map((d) => (d.id === newDamageText.id ? { ...d, y: newDamageText.y, alpha: newDamageText.alpha } : d))
  //             );
  //           },
  //           onComplete: () => {
  //             setDamageTexts((prev) => prev.filter((d) => d.id !== newDamageText.id));
  //           },
  //         });
  //       },
  //     }
  //   );
  // };

  return <Outlet />
}

export default LayoutPage;
