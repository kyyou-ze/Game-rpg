import Phaser from 'phaser';

export const GameConfig = {
  type: Phaser.AUTO,
  parent: 'game-container',
  width: 640,
  height: 400,
  pixelArt: true,
  backgroundColor: '#1c2b1c',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  physics: {
    default: 'arcade',
    arcade: { gravity: { y: 0 }, debug: false }
  },
  scene: []
};
