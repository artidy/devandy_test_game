import axios from 'axios';

export const createAPI = (url: string, timeout: number) => {
  return axios.create({
    baseURL: url,
    timeout: timeout,
  });
};


export const startGame = async (chatId: number, playerName: string) => {
  const response = await fetch('/api/game/start', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chatId, playerName }),
  });

  return response.json();
};

export const getPlayers = async () => {
  const response = await fetch('/api/game/players');

  return response.json();
};

export const startFight = async (chatId: number) => {
  const response = await fetch('/api/game/fight', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chatId }),
  });

  return response.json();
};

export const hit = async (chatId: number) => {
  const response = await fetch('/api/game/hit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chatId }),
  });

  return response.json();
};
