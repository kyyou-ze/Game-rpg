import Phaser from 'phaser';
import { SCENE_KEYS, CHAR_FRAME } from '../core/Constants.js';
import { buildBuilding, buildFencePerimeter, scatterDecor } from '../utils/MapBuilder.js';

/**
 * Town
 * Kota Lumina, hub utama. Peta disusun dari tile Mystic Woods lewat
 * MapBuilder (bukan lagi kotak warna polos): Guild Hall dan Dapur
 * digambar sebagai bangunan (dinding+pintu+lantai), ada pagar keliling
 * taman kecil, dan sebaran dekorasi.
 */
export default class Town extends Phaser.Scene {
  constructor() {
    super({ key: SCENE_KEYS.TOWN });
  }

  create() {
    const { width, height } = this.scale;

    this.add.tileSprite(0, 0, width, height, 'grass').setOrigin(0);

    // Guild Hall: bangunan 7x5 tile di kiri atas
    const guildOrigin = { originCol: 5, originRow: 4, widthTiles: 7, heightTiles: 5 };
    buildBuilding(this, guildOrigin);
    this.add.text(5 * 16 + 56, 4 * 16 - 14, 'Guild Hall', {
      fontSize: '10px', color: '#ffffff', backgroundColor: '#00000099', padding: { x: 3, y: 1 }
    }).setOrigin(0.5);

    // Dapur: bangunan 5x4 tile di kanan atas
    const kitchenOrigin = { originCol: 26, originRow: 4, widthTiles: 5, heightTiles: 4, floorTexture: 'floorCarpet' };
    buildBuilding(this, kitchenOrigin);
    this.add.text(26 * 16 + 40, 4 * 16 - 14, 'Dapur', {
      fontSize: '10px', color: '#ffffff', backgroundColor: '#00000099', padding: { x: 3, y: 1 }
    }).setOrigin(0.5);

    // Pagar taman kecil di tengah bawah
    buildFencePerimeter(this, { originCol: 15, originRow: 14, widthTiles: 8, heightTiles: 5 });

    // Sebaran dekorasi
    scatterDecor(this, [[3, 18], [34, 10], [10, 20], [30, 18], [18, 8]], 'decorA');
    scatterDecor(this, [[6, 20], [32, 14]], 'decorB');

    // Gerbang hutan di kanan bawah
    this.add.rectangle(width - 70, height - 40, 90, 60, 0x2f5a2f, 0.85).setStrokeStyle(2, 0xffffff, 0.6);
    this.add.text(width - 70, height - 40, 'Gerbang Hutan', {
      fontSize: '10px', color: '#ffffff', align: 'center', wordWrap: { width: 80 }
    }).setOrigin(0.5);

    // Player
    this.player = this.physics.add.sprite(width / 2, height / 2 + 40, 'player', 0);
    this.player.setCollideWorldBounds(true);
    this.player.body.setSize(CHAR_FRAME * 0.6, CHAR_FRAME * 0.5);
    this.player.setDepth(10);

    this._addZone(guildOrigin, SCENE_KEYS.GUILD_HALL);
    this._addZone(kitchenOrigin, SCENE_KEYS.KITCHEN);

    const forestZone = this.add.zone(width - 70, height - 40, 90, 60);
    this.physics.add.existing(forestZone, true);
    this.physics.add.overlap(this.player, forestZone, () => this.scene.start(SCENE_KEYS.FOREST));

    this.cursors = this.input.keyboard.createCursorKeys();

    this.add.text(10, 10, 'Kota Lumina — jalan dengan panah, masuk bangunan/gerbang', {
      fontSize: '11px', color: '#ffffff', backgroundColor: '#00000088', padding: { x: 4, y: 2 }
    });

    const player = this.registry.get('player');
    this.goldText = this.add.text(width - 10, 10, `Gold: ${player.gold}`, {
      fontSize: '12px', color: '#ffe08a'
    }).setOrigin(1, 0);
  }

  _addZone({ originCol, originRow, widthTiles, heightTiles }, targetSceneKey) {
    const x = (originCol + widthTiles / 2) * 16;
    const y = (originRow + heightTiles) * 16;
    const zone = this.add.zone(x, y, widthTiles * 16, 16);
    this.physics.add.existing(zone, true);
    this.physics.add.overlap(this.player, zone, () => this.scene.start(targetSceneKey));
  }

  update() {
    if (!this.player || !this.player.body) return;
    const speed = 110;
    this.player.body.setVelocity(0);

    if (this.cursors.left.isDown) this.player.body.setVelocityX(-speed);
    else if (this.cursors.right.isDown) this.player.body.setVelocityX(speed);

    if (this.cursors.up.isDown) this.player.body.setVelocityY(-speed);
    else if (this.cursors.down.isDown) this.player.body.setVelocityY(speed);
  }
}
