interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
}

interface TelegramWebApp {
  initData: string;
  initDataUnsafe: {
    user: TelegramUser;
  };
  ready: () => void;
  expand: () => void;
  themeParams: {
    bg_color?: string;
  };
  onEvent: (event: string, callback: () => void) => void;
}

interface TelegramGameProxy {
  receiveEvent: (event: string, callback: (data: any) => void) => void;
}

interface Window {
  Telegram?: {
    WebApp: TelegramWebApp;
  };
  TelegramGameProxy?: TelegramGameProxy;
}
