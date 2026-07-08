import Phaser from 'phaser';
import { SCENE_KEYS, CHAR_FRAME } from '../core/Constants.js';
import { buildWaterPond, scatterDecor, placeTile, TILE_COLS, TILE_INDEX } from '../utils/MapBuilder.js';

/**
 * Forest
 * Area eksplorasi dengan kolam, dekorasi pohon/semak, satu titik
 * "forage" (kumpulkan herb, bahan masakan) yang bisa diklik, dan
 * random encounter monster saat berjalan.
 */
export default class Forest extends Phaser.Scene {
  constructor() {
    super({ key: SCENE_KEYS.FOREST });
  }

  create() {
    const { width, height } = this.scale;
    this.add.tileSprite(0, 0, width, height, 'grass').setOrigin(0);

    buildWaterPond(this, { originCol: 22, originRow: 12, widthTiles: 6, heightTiles: 4 });
    scatterDecor(this, [[3, 4], [6, 10], [12, 3], [30, 6], [35, 16], [8, 18]], 'decorA');
    scatterDecor(this, [[15, 6], [28, 18], [5, 14]], 'decorC');

    this.player = this.physics.add.sprite(width / 2, height - 60, 'player', 0);
    this.player.setCollideWorldBounds(true);
    this.player.body.setSize(CHAR_FRAME * 0.6, CHAR_FRAME * 0.5);
    this.player.setDepth(10);

    this._addForageNode(10, 8);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.add.text(10, 10, 'Hutan — jelajahi, waspada monster liar. Panah atas untuk kembali ke kota.', {
      fontSize: '11px', color: '#ffffff', backgroundColor: '#00000088', padding: { x: 4, y: 2 }
    });

    this.encounterCooldown = 0;
  }

  _addForageNode(col, row) {
    const x = col * 16 + 8;
    const y = row * 16 + 8;
    const sprite = placeTile(this, 'decor16', TILE_COLS.decor16, TILE_INDEX.decorB, col, row);
    sprite.setInteractive({ useHandCursor: true });
    sprite.setScale(1.4);

    const label = this.add.text(x, y - 16, 'Semak Herb', {
      fontSize: '9px', color: '#c8ffc8', backgroundColor: '#00000099', padding: { x: 2, y: 1 }
    }).setOrigin(0.5);

    sprite.on('pointerdown', () => {
      if (sprite.harvested) return;
      sprite.harvested = true;
      sprite.setAlpha(0.35);
      label.setText('(sudah dipetik)');

      const inventory = this.registry.get('inventory');
      inventory.push('herb');

      const questSystem = this.registry.get('quests');
      questSystem.notifyItemCollected('herb', inventory);

      this.add.text(x, y - 30, '+1 Herb', { fontSize: '10px', color: '#ffff88' })
        .setOrigin(0.5)
        .setDepth(20);

      this.time.delayedCall(20000, () => {
        sprite.harvested = false;
        sprite.setAlpha(1);
        label.setText('Semak Herb');
      });
    });
  }

  update(time, delta) {
    if (!this.player.body) return;

    const speed = 100;
    this.player.body.setVelocity(0);

    if (this.cursors.left.isDown) this.player.body.setVelocityX(-speed);
    else if (this.cursors.right.isDown) this.player.body.setVelocityX(speed);

    if (this.cursors.up.isDown) this.player.body.setVelocityY(-speed);
    else if (this.cursors.down.isDown) this.player.body.setVelocityY(speed);

    if (this.player.y < 20) {
      this.scene.start(SCENE_KEYS.TOWN);
      return;
    }

    const moving = this.player.body.velocity.length() > 0;
    if (moving) {
      this.encounterCooldown -= delta;
      if (this.encounterCooldown <= 0) {
        this.encounterCooldown = 1500;
        if (Math.random() < 0.18) {
          const monsterKey = Math.random() < 0.6 ? 'slime' : (Math.random() < 0.5 ? 'skeleton' : 'wolf');
          this.scene.start(SCENE_KEYS.COMBAT, { monsterKey, returnScene: SCENE_KEYS.FOREST });
        }
      }
    }
  }
}
