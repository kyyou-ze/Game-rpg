import { SAVE_KEY } from './Constants.js';

export default class SaveManager {
  static save(state) {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(state));
      return true;
    } catch (err) {
      console.warn('SaveManager: gagal menyimpan', err);
      return false;
    }
  }

  static load() {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (err) {
      console.warn('SaveManager: gagal memuat', err);
      return null;
    }
  }

  static clear() {
    try {
      localStorage.removeItem(SAVE_KEY);
    } catch (err) {
      console.warn('SaveManager: gagal menghapus', err);
    }
  }

  static defaultState() {
    return {
      player: { hp: 20, maxHp: 20, attack: 4, gold: 10, level: 1 },
      inventory: [],
      quests: {}
    };
  }
}
