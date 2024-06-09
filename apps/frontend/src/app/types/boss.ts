export interface BossSkill {
  id: number,
  name: string,
  cooldown: number,
}

export interface Boss {
  id: number;
  telegramId: string;
  name: string;
  health: number;
  level: number;
  imgUrl: string;
  defence: number;
  attackSpeed: number;
  damage: number[];
  resistance: number;
  drop: string[];
  skills: BossSkill[];
}
