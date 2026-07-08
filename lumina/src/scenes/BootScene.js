import Phaser from 'phaser';
import SaveManager from '../core/SaveManager.js';
import { SCENE_KEYS } from '../core/Constants.js';
import QuestSystem from '../systems/QuestSystem.js';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENE_KEYS.BOOT });
  }

  create() {
    const saved = SaveManager.load() || SaveManager.defaultState();
    this.registry.set('player', saved.player);
    this.registry.set('inventory', saved.inventory || []);
    this.registry.set('quests', new QuestSystem(saved.quests || {}));

    this.scene.start(SCENE_KEYS.PRELOAD);
  }
}
