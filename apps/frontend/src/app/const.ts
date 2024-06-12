enum Backgrounds {
  Main = 'assets/images/backgrounds/main_background.png',
}

enum Message {
  UnknownMessage = 'Неизвестная ошибка, обратитесь к администратору',
  AddNewElement = 'Данные успешно добавлены',
  UpdateElement = 'Данные успешно обновлены',
  DeleteElement = 'Данные успешно удалены',
}

enum NameSpace {
  Players = 'PLAYERS',
  Bosses = 'BOSSES',
}

const DAMAGE_TEXT = {
  fill: 'red',
  fontSize: 24,
  fontFamily: 'Arial',
}

const REQUEST_TIMEOUT = 5000;

export {
  Backgrounds,
  Message,
  NameSpace,
  DAMAGE_TEXT,
  REQUEST_TIMEOUT,
}
