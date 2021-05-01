import { DEFENDERS } from './army';
import { getBase64ImgFromTile } from './canvas';
import { Ghost } from './ghost';

export const setupShop = () => {
  const heroes = window.dungeon_defense_game.ui.uiShop.querySelectorAll('.hero');

  heroes.forEach((hero, index) => {
    const heroData = DEFENDERS[index];

    if (!heroData) {
      hero.style.visibility = 'hidden';
      return;
    }

    const preview = hero.querySelector('.hero__preview');
    const imgData = getBase64ImgFromTile(heroData.tiles);
    preview.src = imgData.src;
    preview.width = imgData.width;
    preview.height = imgData.height;
    preview.style.transform = `translateY(-${imgData.height - 48}px)`;

    const attackValue = hero.querySelector('.hero__attack');
    attackValue.textContent = heroData.power;
    const weapon = hero.querySelector('.hero__weapon');
    weapon.src = heroData.weapon;
    const healthValue = hero.querySelector('.hero__health');
    healthValue.textContent = heroData.health;
    const buyButton = hero.querySelector('.hero__buy');
    buyButton.textContent = heroData.price;

    buyButton.addEventListener('click', () => {
      hero.classList.toggle('hero_selected');

      if (window.dungeon_defense_game.resources.value >= heroData.price) {
        window.dungeon_defense_game.army.ghost = new Ghost({
          ...heroData,
          tile: heroData.tiles[0],
          x: 64,
          y: 64,
          width: 40,
          height: 40,
          row: 1,
        });
      }
    });
  });
}
