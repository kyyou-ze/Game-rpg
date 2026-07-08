import recipeData from '../data/recipes.json';

/**
 * CookingSystem
 * Mengecek apakah inventory punya bahan cukup untuk resep tertentu,
 * mengonsumsi bahan, dan mengembalikan hasil masakan (dish item +
 * efeknya) untuk diterapkan ke player oleh scene pemanggil.
 */
export default class CookingSystem {
  static canCook(recipeId, inventory) {
    const recipe = recipeData[recipeId];
    if (!recipe) return false;

    return Object.entries(recipe.ingredients).every(([itemId, needed]) => {
      const owned = inventory.filter((i) => i === itemId).length;
      return owned >= needed;
    });
  }

  static cook(recipeId, inventory) {
    const recipe = recipeData[recipeId];
    if (!recipe || !CookingSystem.canCook(recipeId, inventory)) return null;

    Object.entries(recipe.ingredients).forEach(([itemId, needed]) => {
      let removed = 0;
      for (let i = inventory.length - 1; i >= 0 && removed < needed; i -= 1) {
        if (inventory[i] === itemId) {
          inventory.splice(i, 1);
          removed += 1;
        }
      }
    });

    inventory.push(recipe.result);

    return { dish: recipe.result, effect: recipe.effect, name: recipe.name };
  }

  static applyEffect(effect, player) {
    if (effect.type === 'heal') {
      player.hp = Math.min(player.maxHp, player.hp + effect.amount);
      return `HP pulih +${effect.amount}`;
    }

    if (effect.type === 'attack_buff') {
      player.attackBuff = { amount: effect.amount, usesLeft: effect.uses };
      return `Serangan +${effect.amount} untuk ${effect.uses} pertarungan berikutnya`;
    }

    return '';
  }

  static all() {
    return recipeData;
  }
}
