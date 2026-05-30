import render from './util/render';
import input from './util/input';
import animation from './util/animation';
import movement from './util/movement';
import physics from './util/physics';

import { levelOne } from './map/level_1-1';
import MapBuilder from './map/map_builder';

import Mario from './entities/mario';
import Goomba from './entities/goomba';
import Koopa from './entities/koopa';
import Score from './entities/score';

// todos: animate blocks. mario duck/run. enemy collisions

class Game {
  init() {
    if (this.initialized) {
      // Sudah pernah init: cukup muat ulang level (mis. setelah menang/keluar).
      this.loadLevel();
      return;
    }
    this.initialized = true;

    const canvasEl = document.getElementById('game-canvas');
    const ctx = canvasEl.getContext('2d');
    ctx.setTransform(1, 0, 0, 1, 0, 0); // hindari scale menumpuk saat re-init
    ctx.scale(3, 3);

    const canvas = {
      canvas: canvasEl,
      ctx,
    };

    const viewport = {
      width: 760,
      height: 600,
      vX: 0,
      vY: 0,
    };

    const backgroundMusic = document.getElementById('background_music');

    // Add mute button
    this.muted = false;

    document.getElementById('mute-button').addEventListener('click', (e) => {
      backgroundMusic.muted = !backgroundMusic.muted;
      if (this.muted) {
        this.muted = false;
        e.target.className = '';
      } else {
        this.muted = true;
        e.target.className += 'muted';
      }
      e.preventDefault();
    }, false);

    const spriteSheet = new Image();
    spriteSheet.src = './assets/sprites/spritesheet.png';

    const tileset = new Image();
    tileset.src = './assets/sprites/tileset_gutter.png';

    this.spriteSheet = spriteSheet;
    this.tileset = tileset;

    const data = {
      spriteSheet,
      canvas,
      viewport,
      animationFrame: 0,
      mapBuilder: null,
      entities: {},
      sounds: {
        backgroundMusic,
        breakSound: new Audio('./assets/audio/sounds/break_block.wav'),
        levelFinish: new Audio('./assets/audio/music/level_complete.mp3'),
      },
      userControl: true,
      paused: false,
      finished: false,
      reset: () => this.loadLevel(),
    };
    this.data = data;

    // Resume dari quiz: dipanggil oleh app.js setelah jawaban benar.
    window.__marioResume = () => {
      data.paused = false;
    };

    input.init(data);

    window.__marioData = data; // untuk debugging (lihat data.paused, data.entities.mario, dll)

    spriteSheet.addEventListener('load', () => {
      this.loadLevel();
      this.run(data);
    });
  }

  // (Re)membangun seluruh level: dipakai saat mulai & saat restart (mati/jatuh).
  loadLevel() {
    const data = this.data;
    const { spriteSheet, tileset } = this;

    data.mapBuilder = new MapBuilder(levelOne, tileset, spriteSheet);
    data.entities = {};
    data.entities.mario = new Mario(spriteSheet, 175, 0, 16, 16);
    data.entities.score = new Score(270, 15);
    data.entities.coins = [];
    data.entities.mushrooms = [];
    data.entities.goombas = [];
    data.entities.koopas = [];

    levelOne.koopas.forEach((koopa) => {
      data.entities.koopas.push(
        new Koopa(spriteSheet, koopa[0], koopa[1], koopa[2], koopa[3]));
    });

    levelOne.goombas.forEach((goomba) => {
      data.entities.goombas.push(
        new Goomba(spriteSheet, goomba[0], goomba[1], goomba[2], goomba[3]));
    });

    data.viewport.vX = 0;
    data.viewport.vY = 0;
    data.animationFrame = 0;
    data.userControl = true;
    data.paused = false;
    data.finished = false;

    render.init(data);

    // Mulai/ulangi musik latar.
    const music = data.sounds.backgroundMusic;
    if (music) {
      music.currentTime = 0;
      const playPromise = music.play();
      if (playPromise && playPromise.catch) playPromise.catch(() => {});
    }
  }

  run(data) {
    const loop = () => {
      if (!data.paused) {
        input.update(data);
        animation.update(data);
        movement.update(data);
        physics.update(data);
        Game.updateView(data);
      }
      render.update(data);

      data.animationFrame += 1;
      window.requestAnimationFrame(loop);
    };

    loop();
  }

  // Update viewport to follow Mario
  static updateView(data) {
    const viewport = data.viewport;
    const margin = viewport.width / 6;
    const center = {
      x: data.entities.mario.xPos + (data.entities.mario.width * 0.5),
      y: data.entities.mario.yPos + (data.entities.mario.height * 0.5),
    };

    if (center.x < viewport.vX + (margin * 2)) {
      viewport.vX = Math.max(center.x - margin, 0);
    } else if (center.x > (viewport.vX + viewport.width) - (margin * 2)) {
      viewport.vX = Math.min((center.x + margin) - viewport.width, 3400 - viewport.width);
    }
  }
}

// Jangan auto-start. app.js akan memanggil window.startMarioGame() saat masuk layar Mario.
const game = new Game();
window.startMarioGame = () => game.init();
