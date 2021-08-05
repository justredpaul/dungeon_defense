export const getHealthBarTile = (health, maxHealth) => {
  const percentage = Math.round(health / maxHealth * 100);

  if (percentage > 90) {
    return [0, 0];
  } else if (percentage > 75) {
    return [0, 10];
  } else if (percentage > 50) {
    return [0, 20];
  } else if (percentage > 25) {
    return [0, 30];
  }

  return [0, 40];
};
