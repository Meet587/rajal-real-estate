import * as migration_20260625_080310_initial from './20260625_080310_initial';

export const migrations = [
  {
    up: migration_20260625_080310_initial.up,
    down: migration_20260625_080310_initial.down,
    name: '20260625_080310_initial'
  },
];
