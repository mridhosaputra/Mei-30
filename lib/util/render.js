const render = {
  init(data) {
    data.entities.scenery = [];
    data.mapBuilder.create(data);
  },

  // Clear canvas and redraw entities
  update(data) {
    data.canvas.ctx.clearRect(0, 0, 760, 600);
    data.canvas.ctx.fillStyle = '#63adff';
    data.canvas.ctx.fillRect(0, 0, 760, 600);

    data.mapBuilder.renderMap(data);

    data.entities.coins.forEach((coin) => {
      this.drawIceCream(coin, data);
    });

    data.entities.mushrooms.forEach((mushroom) => {
      this.drawEntity(mushroom, data);
    });

    data.entities.goombas.forEach((goomba) => {
      this.drawEntity(goomba, data);
    });

    data.entities.koopas.forEach((koopa) => {
      this.drawEntity(koopa, data);
    });

    this.drawText(data);
    this.drawEntity(data.entities.mario, data);
  },

  // Only draw entities that fall in viewport
  drawEntity(entity, data) {
    if (((entity.xPos + entity.width >= data.viewport.vX &&
          entity.xPos + entity.width <= data.viewport.vX + data.viewport.width)) &&
        ((entity.yPos + entity.height >= data.viewport.vY &&
          entity.yPos + entity.height <= data.viewport.vY + data.viewport.height))) {
      data.canvas.ctx.drawImage(
        entity.sprite.img,
        entity.sprite.srcX, entity.sprite.srcY,
        entity.sprite.srcW, entity.sprite.srcH,
        entity.xPos - data.viewport.vX, entity.yPos - data.viewport.vY,
        entity.width, entity.height,
      );
    }
  },

  // Gambar koin sebagai ikon eskrim (emoji) — pengganti sprite koin
  drawIceCream(entity, data) {
    const vp = data.viewport;
    if (!(entity.xPos + entity.width >= vp.vX &&
          entity.xPos <= vp.vX + vp.width)) return;
    const ctx = data.canvas.ctx;
    const ikon = (typeof window !== 'undefined' && window.CONFIG &&
      window.CONFIG.eskrim && window.CONFIG.eskrim.ikon) || '🍦';
    ctx.font = `${entity.height + 2}px sans-serif`;
    ctx.textBaseline = 'top';
    ctx.fillText(ikon, entity.xPos - vp.vX, entity.yPos - vp.vY);
    ctx.textBaseline = 'alphabetic';
  },

  // Render hud
  drawText(data) {
    const text = data.entities.score;
    const ctx = data.canvas.ctx;
    const baseX = text.xPos - (data.viewport.width / 3);

    // Score (poin)
    ctx.font = `${text.size} ${text.font}`;
    ctx.fillStyle = text.color;
    ctx.fillText(`Score: ${text.value}`, baseX, text.yPos);

    // Voucher eskrim (eks-koin) di sebelah kanan Score
    const cfg = (typeof window !== 'undefined' && window.CONFIG && window.CONFIG.eskrim) || {};
    const ikon = cfg.ikon || '🍦';
    const label = cfg.label || 'Voucher Eskrim';
    const vX = baseX + 92;
    ctx.font = '9px sans-serif'; // pixel font tak punya emoji -> pakai font sistem utk ikon
    ctx.fillText(ikon, vX, text.yPos);
    ctx.font = `8px ${text.font}`; // font lebih kecil agar muat di HUD
    ctx.fillText(`${label}: ${text.coinCount}`, vX + 11, text.yPos);
  },
};

export { render as default };
