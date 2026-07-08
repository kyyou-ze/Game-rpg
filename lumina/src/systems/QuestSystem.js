import questData from '../data/quests.json';
import { QUEST_STATE } from '../core/Constants.js';

/**
 * QuestSystem
 * Melacak status tiap quest (belum diambil / aktif / selesai / sudah
 * ditukar) dan progres hitungan (mis. sudah bunuh berapa slime).
 * State disimpan di objek `quests` yang datang dari SaveManager.
 */
export default class QuestSystem {
  constructor(questState = {}) {
    this.state = questState; // { [questId]: { status, progress } }
  }

  accept(questId) {
    if (!questData[questId]) return false;
    if (this.state[questId] && this.state[questId].status !== QUEST_STATE.NOT_STARTED) return false;

    this.state[questId] = { status: QUEST_STATE.ACTIVE, progress: 0 };
    return true;
  }

  getStatus(questId) {
    return this.state[questId]?.status || QUEST_STATE.NOT_STARTED;
  }

  getProgress(questId) {
    return this.state[questId]?.progress || 0;
  }

  /** Dipanggil saat pemain membunuh monster atau dapat item, untuk
   * mengecek apakah ada quest aktif yang progress-nya harus naik. */
  notifyKill(monsterKey) {
    Object.entries(questData).forEach(([id, quest]) => {
      const entry = this.state[id];
      if (!entry || entry.status !== QUEST_STATE.ACTIVE) return;
      if (quest.type !== 'hunt' || quest.target !== monsterKey) return;

      entry.progress = Math.min(quest.count, entry.progress + 1);
      if (entry.progress >= quest.count) {
        entry.status = QUEST_STATE.COMPLETE;
      }
    });
  }

  notifyItemCollected(itemKey, inventory) {
    Object.entries(questData).forEach(([id, quest]) => {
      const entry = this.state[id];
      if (!entry || entry.status !== QUEST_STATE.ACTIVE) return;
      if (quest.type !== 'collect' || quest.target !== itemKey) return;

      const owned = inventory.filter((i) => i === itemKey).length;
      entry.progress = Math.min(quest.count, owned);
      if (entry.progress >= quest.count) {
        entry.status = QUEST_STATE.COMPLETE;
      }
    });
  }

  turnIn(questId) {
    const entry = this.state[questId];
    const quest = questData[questId];
    if (!entry || entry.status !== QUEST_STATE.COMPLETE || !quest) return null;

    entry.status = QUEST_STATE.TURNED_IN;
    return quest.reward;
  }

  static all() {
    return questData;
  }

  static get(questId) {
    return questData[questId];
  }
}
