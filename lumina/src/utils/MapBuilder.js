/**
 * MapBuilder
 * Helper menyusun "peta" berbasis grid tile 16x16 dari beberapa
 * texture terpisah (walls, fences, decor16, floors, water1), tanpa
 * perlu file Tiled (.tmx/.json) — karena pack Mystic Woods yang
 * diupload tidak menyertakan file map siap pakai.
 *
 * Setiap texture dianggap sheet grid seragam 16px; TILE_INDEX di
 * bawah memetakan "peran" (dinding, pintu, pagar, lantai, dekor) ke
 * indeks frame di dalam texture masing-masing. Indeks ini dipilih
 * berdasarkan posisi grid, BUKAN hasil pencocokan visual presisi —
 * kalau ada tile yang keliatan janggal setelah dirender, cukup ganti
 * angkanya di TILE_INDEX ini tanpa bongkar kode scene.
 */
export const TILE_COLS = {
  walls: 8,     // walls.png = 128x128 / 16
  fences: 4,    // fences.png = 64x64 / 16
  decor16: 4,   // decor_16x16.png = 64x80 / 16
  plains: 6,    // plains.png = 96x192 / 16
  water1: 6,    // water1.png = 96x64 / 16
  wooden_door: 2 // wooden_door.png = 32x16 / 16
};

export const TILE_INDEX = {
  wallGeneric: 0,
  doorGeneric: 0,
  fenceGeneric: 0,
  decorA: 0,
  decorB: 1,
  decorC: 2,
  plainsGeneric: 0,
  waterGeneric: 0
};

/** Tempatkan satu tile dari texture tertentu di koordinat grid (col,row).
 * frameIndex boleh null untuk texture single-frame (dimuat via load.image). */
export function placeTile(scene, textureKey, cols, frameIndex, col, row, tileSize = 16) {
  const x = col * tileSize + tileSize / 2;
  const y = row * tileSize + tileSize / 2;
  return frameIndex === null || frameIndex === undefined
    ? scene.add.image(x, y, textureKey)
    : scene.add.image(x, y, textureKey, frameIndex);
}

/**
 * Gambar outline bangunan persegi (dinding di tepi, lantai di dalam,
 * satu tile pintu di tengah sisi bawah).
 */
export function buildBuilding(scene, { originCol, originRow, widthTiles, heightTiles, floorTexture = 'floorWooden' }) {
  for (let r = 0; r < heightTiles; r += 1) {
    for (let c = 0; c < widthTiles; c += 1) {
      const col = originCol + c;
      const row = originRow + r;
      const isEdge = r === 0 || r === heightTiles - 1 || c === 0 || c === widthTiles - 1;
      const isDoor = r === heightTiles - 1 && c === Math.floor(widthTiles / 2);

      if (isDoor) {
        placeTile(scene, 'woodenDoor', TILE_COLS.wooden_door, TILE_INDEX.doorGeneric, col, row);
      } else if (isEdge) {
        placeTile(scene, 'walls', TILE_COLS.walls, TILE_INDEX.wallGeneric, col, row);
      } else {
        placeTile(scene, floorTexture, 1, null, col, row);
      }
    }
  }
}

/** Pagar keliling area persegi (cuma tepi, bukan diisi penuh). */
export function buildFencePerimeter(scene, { originCol, originRow, widthTiles, heightTiles }) {
  for (let r = 0; r < heightTiles; r += 1) {
    for (let c = 0; c < widthTiles; c += 1) {
      const isEdge = r === 0 || r === heightTiles - 1 || c === 0 || c === widthTiles - 1;
      if (!isEdge) continue;
      placeTile(scene, 'fences', TILE_COLS.fences, TILE_INDEX.fenceGeneric, originCol + c, originRow + r);
    }
  }
}

/** Kolam air persegi penuh. */
export function buildWaterPond(scene, { originCol, originRow, widthTiles, heightTiles }) {
  for (let r = 0; r < heightTiles; r += 1) {
    for (let c = 0; c < widthTiles; c += 1) {
      placeTile(scene, 'water1', TILE_COLS.water1, TILE_INDEX.waterGeneric, originCol + c, originRow + r);
    }
  }
}

/** Sebar beberapa tile dekorasi di daftar koordinat grid tertentu. */
export function scatterDecor(scene, positions, decorKey = 'decorA') {
  const idx = TILE_INDEX[decorKey] ?? 0;
  positions.forEach(([col, row]) => {
    placeTile(scene, 'decor16', TILE_COLS.decor16, idx, col, row);
  });
}
