import monsterData from '../data/monsters.json';

/**
 * CombatSystem
 * Combat ringan turn-based: pemain menyerang, monster balas menyerang,
 * ulang sampai salah satu HP habis atau pemain kabur. Tidak ada
 * skill/mana untuk MVP — cukup Attack vs Flee, sesuai nuansa "combat
 * ringan" yang diminta.
 */
export default class CombatSystem {
  constructor(playerStats, monsterKey) {
    this.player = { ...playerStats };
    const template = monsterData[monsterKey];
    this.monsterKey = monsterKey;
    this.monster = { name: template.name, hp: template.hp, maxHp: template.hp, attack: template.attack };
    this.template = template;
    this.log = [];
  }

  playerAttack() {
    const buff = this.player.attackBuff && this.player.attackBuff.usesLeft > 0 ? this.player.attackBuff.amount : 0;
    const dmg = Math.max(1, this.player.attack + buff + this._variance());
    this.monster.hp = Math.max(0, this.monster.hp - dmg);

    if (buff > 0) {
      this.player.attackBuff.usesLeft -= 1;
      this.log.push(`Kamu menyerang ${this.monster.name} sebesar ${dmg} damage (termasuk bonus masakan).`);
    } else {
      this.log.push(`Kamu menyerang ${this.monster.name} sebesar ${dmg} damage.`);
    }

    if (this.monster.hp <= 0) {
      this.log.push(`${this.monster.name} dikalahkan!`);
      return this._resolveVictory();
    }

    return this._monsterTurn();
  }

  flee() {
    const success = Math.random() < 0.6;
    this.log.push(success ? 'Kamu berhasil kabur.' : 'Gagal kabur!');
    if (!success) return this._monsterTurn();
    return { fled: true, victory: false, defeated: false, log: this.log };
  }

  _monsterTurn() {
    const dmg = Math.max(1, this.monster.attack + this._variance());
    this.player.hp = Math.max(0, this.player.hp - dmg);
    this.log.push(`${this.monster.name} membalas menyerang sebesar ${dmg} damage.`);

    if (this.player.hp <= 0) {
      this.log.push('Kamu terjatuh... untung ada adventurer lain yang menolong.');
      return { fled: false, victory: false, defeated: true, log: this.log };
    }

    return { fled: false, victory: false, defeated: false, log: this.log, playerHp: this.player.hp, monsterHp: this.monster.hp };
  }

  _resolveVictory() {
    const [minGold, maxGold] = this.template.goldDrop;
    const gold = minGold + Math.floor(Math.random() * (maxGold - minGold + 1));

    const loot = this.template.loot
      .filter((entry) => Math.random() < entry.chance)
      .map((entry) => entry.item);

    return {
      fled: false,
      victory: true,
      defeated: false,
      log: this.log,
      gold,
      loot,
      monsterKey: this.monsterKey
    };
  }

  _variance() {
    return Math.floor(Math.random() * 3) - 1; // -1..+1
  }
}
