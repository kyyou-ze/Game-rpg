import Phaser from 'phaser';
import CookingSystem from '../systems/CookingSystem.js';
import itemData from '../data/items.json';
import Button from '../ui/Button.js';
import TextBox from '../ui/TextBox.js';
import SaveManager from '../core/SaveManager.js';
import { SCENE_KEYS } from '../core/Constants.js';

/**
 * Kitchen
 * Dapur kota: masak resep dari bahan yang ada di inventory, dan
 * pakai (konsumsi) masakan yang sudah jadi untuk efek heal/buff.
 */
export default class Kitchen extends Phaser.Scene {
  constructor() {
    super({ key: SCENE_KEYS.KITCHEN });
  }

  create() {
    const { width, height } = this.scale;
    this.add.rectangle(0, 0, width, height, 0x4a3a2a).setOrigin(0);
    this.add.text(width / 2, 16, 'Dapur — Masak & Inventory', {
      fontSize: '16px', color: '#ffe0a0', fontStyle: 'bold'
    }).setOrigin(0.5, 0);

    this.textBox = new TextBox(this, { height: 60 });
    this.buttons = [];

    this._renderInventory();
    this._renderRecipes();

    const backBtn = new Button(this, 10, height - 30, '< Kembali ke Kota', () => {
      SaveManager.save({
        player: this.registry.get('player'),
        inventory: this.registry.get('inventory'),
        quests: this.registry.get('quests').state
      });
      this.scene.start(SCENE_KEYS.TOWN);
    });
    this.buttons.push(backBtn);
  }

  _renderInventory() {
    const inventory = this.registry.get('inventory');
    const counts = {};
    inventory.forEach((id) => { counts[id] = (counts[id] || 0) + 1; });

    this.add.text(20, 40, 'Bahan & Masakan yang kamu punya:', { fontSize: '12px', color: '#ffffff' });

    let y = 58;
    Object.entries(counts).forEach(([id, count]) => {
      const item = itemData[id];
      if (!item) return;
      const label = `${item.name} x${count}`;

      if (item.type === 'dish') {
        const btn = new Button(this, 20, y, `${label} — [ Makan ]`, () => this._useDish(id), { fontSize: '11px' });
        btn.isDynamic = true;
        this.buttons.push(btn);
      } else {
        this.add.text(20, y, label, { fontSize: '11px', color: '#dddddd' });
      }
      y += 20;
    });
  }

  _renderRecipes() {
    const recipes = CookingSystem.all();
    const { width } = this.scale;
    let y = 40;

    this.add.text(width / 2 + 20, y, 'Resep tersedia:', { fontSize: '12px', color: '#ffffff' });
    y += 18;

    Object.entries(recipes).forEach(([id, recipe]) => {
      const ingredientList = Object.entries(recipe.ingredients)
        .map(([itemId, qty]) => `${itemData[itemId]?.name || itemId} x${qty}`)
        .join(', ');

      this.add.text(width / 2 + 20, y, `${recipe.name}\n(${ingredientList})`, {
        fontSize: '10px', color: '#dddddd', wordWrap: { width: width / 2 - 40 }
      });

      const inventory = this.registry.get('inventory');
      const canCook = CookingSystem.canCook(id, inventory);
      const btn = new Button(this, width - 90, y + 8, canCook ? '[ Masak ]' : '(bahan kurang)', () => {
        if (!canCook) return;
        this._cook(id);
      }, { fontSize: '11px', color: canCook ? '#ffffff' : '#888888' });
      btn.isDynamic = true;
      this.buttons.push(btn);

      y += 46;
    });
  }

  _cook(recipeId) {
    const inventory = this.registry.get('inventory');
    const result = CookingSystem.cook(recipeId, inventory);
    if (!result) return;

    this.textBox.show(`Berhasil memasak ${result.name}!`);
    this._refresh();
  }

  _useDish(dishId) {
    const inventory = this.registry.get('inventory');
    const idx = inventory.indexOf(dishId);
    if (idx === -1) return;

    const recipeEntry = Object.values(CookingSystem.all()).find((r) => r.result === dishId);
    if (!recipeEntry) return;

    inventory.splice(idx, 1);
    const player = this.registry.get('player');
    const effectMessage = CookingSystem.applyEffect(recipeEntry.effect, player);
    this.textBox.show(`Makan ${itemData[dishId].name}. ${effectMessage}`);
    this._refresh();
  }

  _refresh() {
    this.scene.restart();
  }
}
