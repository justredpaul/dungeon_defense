import creatures from '../data/creatures.json';

export const getGhostFromEntity = entity => {
  if (!entity) return;

  const creature = creatures[entity.name];

  if (!creature) return;

  return { ...creature, row: 0, direction: 1, };
};

