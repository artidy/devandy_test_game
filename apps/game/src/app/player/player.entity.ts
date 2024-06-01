import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import { Player } from '@devandy-test-game/shared';

@Entity()
export class PlayerEntity implements Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  telegramId: number;

  @Column()
  name: string;

  @Column()
  health: number;

  @Column()
  level: number;

  @Column("simple-array")
  inventory: string[];
}
