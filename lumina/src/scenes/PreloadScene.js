import Phaser from 'phaser';
import { preloadAll } from '../core/AssetManifest.js';
import { SCENE_KEYS } from '../core/Constants.js';

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENE_KEYS.PRELOAD });
  }

  preload() {
    const { width, height } = this.scale;
    const label = this.add.text(width / 2, height / 2, 'Memuat aset...', {
      fontSize: '16px', color: '#ffffff'
    }).setOrigin(0.5);

    this.load.on('progress', (value) => {
      label.setText(`Memuat aset... ${Math.floor(value * 100)}%`);
    });

    preloadAll(this);
  }

  create() {
    // Animasi idle sederhana per arah (frame diam, bukan cycle penuh,
    // karena baris animasi persis di spritesheet belum divalidasi visual
    // frame-per-frame — aman dipakai dulu, disempurnakan belakangan)
    this.scene.start(SCENE_KEYS.MAIN_MENU);
  }
}
