export interface Player {
  id: number;
  telegramId: string;
  name: string;
  health: number;
  level: number;
  inventory: string[];
}

export interface PlayerUpdate {
  id: number;
  name?: string;
  health?: string;
  level?: number;
}
