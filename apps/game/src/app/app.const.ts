enum EnvValidationMessage {
  TelegramBotApiTokenNotRequired = 'Telegram bot api token is not required',
  TelegramChanelIdNotRequired = 'Telegram chanel id is not required',
}

const ENV_FILE_PATH = 'environments/.game.env';

export {
  EnvValidationMessage,
  ENV_FILE_PATH,
}
