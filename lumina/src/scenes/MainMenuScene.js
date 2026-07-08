import Phaser from 'phaser';
import { SCENE_KEYS } from '../core/Constants.js';

export default class MainMenuScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENE_KEYS.MAIN_MENU });
  }

  create() {
    const { width, height } = this.scale;
    this.add.rectangle(0, 0, width, height, 0x1c2b1c).setOrigin(0);

    this.add.text(width / 2, height / 2 - 60, 'LUMINA', {
      fontSize: '32px', color: '#e8d9a0', fontStyle: 'bold'
    }).setOrigin(0.5);
    this.add.text(width / 2, height / 2 - 25, 'Hidup Sebagai Petualang Biasa', {
      fontSize: '13px', color: '#cccccc'
    }).setOrigin(0.5);

    const startBtn = this.add.text(width / 2, height / 2 + 30, '[ Mulai Petualangan ]', {
      fontSize: '16px', color: '#ffffff'
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    startBtn.on('pointerover', () => startBtn.setColor('#e8d9a0'));
    startBtn.on('pointerout', () => startBtn.setColor('#ffffff'));
    startBtn.on('pointerdown', () => this.scene.start(SCENE_KEYS.TOWN));
  }
}
