import Phaser from 'phaser';
import QuestSystem from '../systems/QuestSystem.js';
import Button from '../ui/Button.js';
import TextBox from '../ui/TextBox.js';
import SaveManager from '../core/SaveManager.js';
import { SCENE_KEYS, QUEST_STATE } from '../core/Constants.js';

export default class GuildHall extends Phaser.Scene {
  constructor() {
    super({ key: SCENE_KEYS.GUILD_HALL });
  }

  create() {
    const { width, height } = this.scale;
    this.add.rectangle(0, 0, width, height, 0x3a2f22).setOrigin(0);
    this.add.text(width / 2, 20, 'Papan Quest — Guild Hall', {
      fontSize: '16px', color: '#ffe08a', fontStyle: 'bold'
    }).setOrigin(0.5, 0);

    this.questSystem = this.registry.get('quests');
    this.textBox = new TextBox(this, { height: 60 });

    this.buttons = [];
    this._renderQuestList();

    const backBtn = new Button(this, 10, height - 30, '< Kembali ke Kota', () => {
      SaveManager.save({
        player: this.registry.get('player'),
        inventory: this.registry.get('inventory'),
        quests: this.questSystem.state
      });
      this.scene.start(SCENE_KEYS.TOWN);
    });
    this.buttons.push(backBtn);
  }

  _renderQuestList() {
    this.buttons.filter((b) => b.isQuestRow).forEach((b) => b.destroy());
    this.buttons = this.buttons.filter((b) => !b.isQuestRow);

    const quests = QuestSystem.all();
    let y = 60;

    Object.entries(quests).forEach(([id, quest]) => {
      const status = this.questSystem.getStatus(id);
      const progress = this.questSystem.getProgress(id);

      let actionLabel = '';
      let onClick = () => {};

      if (status === QUEST_STATE.NOT_STARTED) {
        actionLabel = '[ Ambil ]';
        onClick = () => { this.questSystem.accept(id); this._renderQuestList(); };
      } else if (status === QUEST_STATE.ACTIVE) {
        actionLabel = `Progres: ${progress}/${quest.count}`;
        onClick = () => {};
      } else if (status === QUEST_STATE.COMPLETE) {
        actionLabel = '[ Tukar Hadiah ]';
        onClick = () => {
          const reward = this.questSystem.turnIn(id);
          if (reward) {
            const player = this.registry.get('player');
            player.gold += reward.gold;
            this.textBox.show(`Quest selesai! +${reward.gold} gold, +${reward.exp} exp.`);
          }
          this._renderQuestList();
        };
      } else {
        actionLabel = '(selesai ditukar)';
      }

      this.add.text(20, y, `${quest.title} — dari ${quest.giver}`, {
        fontSize: '12px', color: '#ffffff'
      });
      this.add.text(20, y + 16, quest.description, {
        fontSize: '10px', color: '#cccccc', wordWrap: { width: 400 }
      });

      const btn = new Button(this, this.scale.width - 150, y, actionLabel, onClick, { fontSize: '11px' });
      btn.isQuestRow = true;
      this.buttons.push(btn);

      y += 60;
    });
  }
}
