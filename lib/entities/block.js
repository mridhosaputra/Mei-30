import Entity from './entity';
import Sprite from './sprite';
import Coin from './coin';
import Mushroom from './mushroom';

export default class Block extends Entity {
  constructor(contents, tileset, xPos, yPos, width, height, quizId = null) {
    const sprite = new Sprite(tileset, 433, 1, 17, 17);
    super('block', sprite, xPos, yPos, width, height);

    this.contents = contents;
    this.quizId = quizId;     // null kecuali blok quiz
    this.quizDone = false;    // true setelah quiz blok ini terjawab benar
    this.coinSound = new Audio('./assets/audio/sounds/coin.wav');
    this.powerupSpawnSound = new Audio('./assets/audio/sounds/powerup_spawn.wav');
    this.used = new Sprite(tileset, 486, 0, 18, 18);
    this.tileset = tileset;
  }

  createMushroom(data) {
    const mushroom = new Mushroom(data.spriteSheet, this.xPos, this.yPos - 18, 16, 16);
    data.entities.mushrooms.push(mushroom);
    this.powerupSpawnSound.play();
    this.contents = 'empty';
  }

  collectCoin(data) {
    const coin = new Coin(this.tileset, this.xPos - 2, this.yPos - 18, 18, 18);

    data.entities.score.value += 50;
    data.entities.score.coinCount += 1;
    this.contents = 'empty';
    this.coinSound.play();

    coin.currentState = coin.states.blockCoin;
    data.entities.coins.push(coin);

    setTimeout(() => {
      const index = data.entities.coins.indexOf(coin);
      delete data.entities.coins[index];
    }, 50);
  }
}
