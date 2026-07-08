import Phaser from 'phaser';
import { GameConfig } from './core/Config.js';

import BootScene from './scenes/BootScene.js';
import PreloadScene from './scenes/PreloadScene.js';
import MainMenuScene from './scenes/MainMenuScene.js';
import Town from './scenes/Town.js';
import GuildHall from './scenes/GuildHall.js';
import Kitchen from './scenes/Kitchen.js';
import Forest from './scenes/Forest.js';
import Combat from './scenes/Combat.js';

const config = {
  ...GameConfig,
  scene: [BootScene, PreloadScene, MainMenuScene, Town, GuildHall, Kitchen, Forest, Combat]
};

// eslint-disable-next-line no-unused-vars
const game = new Phaser.Game(config);
