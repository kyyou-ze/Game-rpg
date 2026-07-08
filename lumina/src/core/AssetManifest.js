/**
 * AssetManifest
 * Semua path aset Mystic Woods (free version) didaftarkan di sini.
 * Frame karakter dikonfirmasi 32x32px lewat inspeksi grid manual.
 * Tileset alam (grass, plains, dsb) berukuran tile 16x16px.
 */
const BASE = '/assets/mystic_woods/sprites';

export const CHARACTER_SHEETS = {
  player: { path: `${BASE}/characters/player.png`, frameWidth: 32, frameHeight: 32 },
  skeleton: { path: `${BASE}/characters/skeleton.png`, frameWidth: 32, frameHeight: 32 },
  slime: { path: `${BASE}/characters/slime.png`, frameWidth: 32, frameHeight: 32 }
};

export const TILESETS = {
  grass: { path: `${BASE}/tilesets/grass.png`, tileSize: 16 },
  plains: { path: `${BASE}/tilesets/plains.png`, tileSize: 16 },
  decor16: { path: `${BASE}/tilesets/decor_16x16.png`, tileSize: 16 },
  decor8: { path: `${BASE}/tilesets/decor_8x8.png`, tileSize: 8 },
  fences: { path: `${BASE}/tilesets/fences.png`, tileSize: 16 },
  walls: { path: `${BASE}/tilesets/walls/walls.png`, tileSize: 16 },
  woodenDoor: { path: `${BASE}/tilesets/walls/wooden_door.png`, tileSize: 16 },
  floorWooden: { path: `${BASE}/tilesets/floors/wooden.png`, tileSize: 16 },
  floorCarpet: { path: `${BASE}/tilesets/floors/carpet.png`, tileSize: 16 },
  water1: { path: `${BASE}/tilesets/water1.png`, tileSize: 16 }
};

export const OBJECTS = {
  chest01: `${BASE}/objects/chest_01.png`,
  chest02: `${BASE}/objects/chest_02.png`,
  objectsSheet: `${BASE}/objects/objects.png`
};

export function preloadAll(scene) {
  Object.entries(CHARACTER_SHEETS).forEach(([key, cfg]) => {
    scene.load.spritesheet(key, cfg.path, {
      frameWidth: cfg.frameWidth,
      frameHeight: cfg.frameHeight
    });
  });

  // Tileset dengan banyak tile (perlu dipilih per-index) dimuat sebagai
  // spritesheet 16x16; tileset satu-tile (grass, floor kayu polos)
  // cukup dimuat sebagai image biasa.
  const MULTI_TILE = ['plains', 'decor16', 'fences', 'walls', 'woodenDoor', 'water1'];
  const SINGLE_TILE = ['grass', 'floorWooden', 'floorCarpet', 'decor8'];

  Object.entries(TILESETS).forEach(([key, cfg]) => {
    if (MULTI_TILE.includes(key)) {
      scene.load.spritesheet(key, cfg.path, { frameWidth: 16, frameHeight: 16 });
    } else if (SINGLE_TILE.includes(key)) {
      scene.load.image(key, cfg.path);
    } else {
      scene.load.image(key, cfg.path);
    }
  });

  Object.entries(OBJECTS).forEach(([key, path]) => {
    scene.load.image(key, path);
  });
}
