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

const REQUEST_TIMEOUT = 5000;

export {
  Message,
  NameSpace,
  REQUEST_TIMEOUT,
}
