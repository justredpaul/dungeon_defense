export const createUi = () => {
  const ui = document.querySelector('.ui');
  const uiScore = ui.querySelector('.ui__points > .ui__score-value');
  const uiGold = ui.querySelector('.ui__gold > .ui__score-value');
  const uiShop = ui.querySelector('.ui__shop');
  const uiPause = ui.querySelector('.ui__buttons > .ui__button_pause');
  const uiAbout = ui.querySelector('.ui__buttons > .ui__button_about');
  const uiWaves = document.querySelector('.wave');

  const aboutPopup = document.querySelector('.popup_about');
  const aboutClose = aboutPopup.querySelector('.popup__button');

  const winPopup = document.querySelector('.popup_win');
  const losePopup = document.querySelector('.popup_lose');

  uiPause.addEventListener('click', () => {
    window.dungeon_defense_game.onPause = !window.dungeon_defense_game.onPause;

    if (!window.dungeon_defense_game.onPause) {
      uiPause.textContent = 'Pause';
      window.dungeon_defense_game.animate();
      window.dungeon_defense_game.mainTheme.play();
    } else {
      window.dungeon_defense_game.mainTheme.pause();
      uiPause.textContent = 'Play';
    }
  });

  uiAbout.addEventListener('click', () => {
    aboutPopup.style.visibility = 'visible';
  });
  aboutClose.addEventListener('click', () => {
    aboutPopup.style.visibility = 'hidden';
  });

  const debug = document.querySelector('.debug');

  return {
    ui,
    uiScore,
    uiGold,
    uiShop,
    uiWaves,
    winPopup,
    losePopup,
    debug,
  }
};
