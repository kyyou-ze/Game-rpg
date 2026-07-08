import Phaser from 'phaser';
import CombatSystem from '../systems/CombatSystem.js';
import Button from '../ui/Button.js';
import TextBox from '../ui/TextBox.js';
import SaveManager from '../core/SaveManager.js';
import { SCENE_KEYS } from '../core/Constants.js';

export default class Combat extends Phaser.Scene {
  constructor() {
    super({ key: SCENE_KEYS.COMBAT });
  }

  init(data) {
    this.monsterKey = data.monsterKey || 'slime';
    this.returnScene = data.returnScene || SCENE_KEYS.FOREST;
  }

  create() {
    const { width, height } = this.scale;
    this.add.rectangle(0, 0, width, height, 0x22201c).setOrigin(0);
    this.add.text(width / 2, 16, 'Pertarungan!', {
      fontSize: '16px', color: '#ffcc66', fontStyle: 'bold'
    }).setOrigin(0.5, 0);

    const player = this.registry.get('player');
    this.combat = new CombatSystem(player, this.monsterKey);

    this.monsterSprite = this.add.sprite(width / 2, 130, this.monsterKey, 0).setScale(2.5);
    this.playerHpText = this.add.text(20, 60, '', { fontSize: '12px', color: '#a0e0a0' });
    this.monsterHpText = this.add.text(width - 20, 60, '', { fontSize: '12px', color: '#e0a0a0' }).setOrigin(1, 0);

    this.textBox = new TextBox(this, { height: 100 });
    this._updateHpText();
    this.textBox.show(`Seekor ${this.combat.monster.name} muncul!`);

    this.attackBtn = new Button(this, width / 2 - 110, height - 40, '[ Serang ]', () => this._doAction('attack'));
    this.fleeBtn = new Button(this, width / 2 + 20, height - 40, '[ Kabur ]', () => this._doAction('flee'));
  }

  _updateHpText() {
    this.playerHpText.setText(`HP Kamu: ${this.combat.player.hp}/${this.combat.player.maxHp}`);
    this.monsterHpText.setText(`${this.combat.monster.name} HP: ${this.combat.monster.hp}/${this.combat.monster.maxHp}`);
  }

  _doAction(action) {
    if (this._locked) return;
    this._locked = true;

    const result = action === 'attack' ? this.combat.playerAttack() : this.combat.flee();
    this._updateHpText();
    this.textBox.show(this.combat.log.slice(-2).join('\n'));

    if (result.victory) {
      this._onVictory(result);
    } else if (result.defeated) {
      this._onDefeat();
    } else if (result.fled) {
      this._onFlee();
    } else {
      this._locked = false;
    }
  }

  _onVictory(result) {
    const player = this.registry.get('player');
    player.hp = this.combat.player.hp;
    player.gold += result.gold;

    const inventory = this.registry.get('inventory');
    result.loot.forEach((item) => inventory.push(item));

    const questSystem = this.registry.get('quests');
    questSystem.notifyKill(result.monsterKey);
    result.loot.forEach((item) => questSystem.notifyItemCollected(item, inventory));

    this.textBox.show(`Menang! +${result.gold} gold${result.loot.length ? `, dapat: ${result.loot.join(', ')}` : ''}.`);
    this._exitAfterDelay();
  }

  _onDefeat() {
    const player = this.registry.get('player');
    player.hp = Math.max(1, Math.floor(player.maxHp * 0.3)); // tidak ada game over permanen, dibawa pulang
    this.textBox.show('Kamu terluka parah dan dibawa kembali ke kota untuk beristirahat.');
    this._exitAfterDelay(SCENE_KEYS.TOWN);
  }

  _onFlee() {
    const player = this.registry.get('player');
    player.hp = this.combat.player.hp;
    this._exitAfterDelay();
  }

  _exitAfterDelay(forceScene = null) {
    this.time.delayedCall(1200, () => {
      SaveManager.save({
        player: this.registry.get('player'),
        inventory: this.registry.get('inventory'),
        quests: this.registry.get('quests').state
      });
      this.scene.start(forceScene || this.returnScene);
    });
  }
}
