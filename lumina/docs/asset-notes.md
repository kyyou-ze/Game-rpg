# Catatan Asset — Mystic Woods (Free Version)

## Sumber & lisensi
- Pack: Mystic Woods Free Version (2.1), oleh Sithtio / Game Endeavor
- **Lisensi: non-komersial saja.** Boleh dimodifikasi, TIDAK boleh
  didistribusikan ulang atau dijual (meski sudah dimodifikasi).
  Lihat `public/assets/mystic_woods/LICENSE-mystic-woods.txt`
- Kamu sebutkan juga punya versi 2.2 (belum diupload) — kalau nanti
  diupload, cek dulu apakah struktur foldernya sama sebelum menimpa
  yang 2.1 ini, karena frame/susunan sheet bisa berbeda antar versi.

## Ukuran frame yang sudah dikonfirmasi
Dikonfirmasi lewat inspeksi grid manual (bukan tebakan):
- `player.png`, `skeleton.png`, `slime.png` — frame **32x32px**
  (dikonfirmasi karena ini satu-satunya ukuran yang membagi rata
  ketiga dimensi sheet: 288x480, 384x320, 224x160)
- Tileset alam (grass, plains, decor, dsb) — tile **16x16px**
- `decor_8x8.png` — tile 8x8px (dekorasi kecil)

## Yang BELUM divalidasi (perlu kerja lanjutan)
Baris/kolom animasi di tiap spritesheet karakter (mana yang idle,
walk, attack per arah) **belum dipetakan frame-per-frame**. Saat ini
game memakai frame statis (frame index 0) untuk player, dan monster
juga masih frame tunggal — cukup untuk MVP guild+combat karena
gerakannya tetap jalan (posisi berubah), cuma visualnya belum
"berjalan" beneran.

### Cara lanjutin (kalau mau dikerjakan manual)
1. Buka `public/assets/mystic_woods/sprites/characters/player.png` di
   image editor, aktifkan grid 32x32px
2. Catat baris mana untuk idle-down, walk-down, walk-up, walk-left,
   walk-right, attack, dst — biasanya Mystic Woods menyusun per baris
   per kombinasi aksi+arah
3. Update `src/managers/AnimationManager` (belum dibuat di project
   ini — bisa dicontoh dari project VN sebelumnya) dengan
   `scene.anims.create({ key, frames: generateFrameNumbers(...), frameRate, repeat })`
   sesuai baris yang sudah dicatat

## File yang tersedia di pack ini
- `characters/`: player, skeleton, slime
- `tilesets/`: grass, plains, decor (16x16 & 8x8), fences, walls,
  wooden door, floors (wooden/carpet/flooring), water (6 varian),
  water lilies & dekorasi air
- `objects/`: 2 varian chest, objects.png (sheet berisi banyak objek
  kecil, belum di-slice), beberapa varian rock-in-water
- `particles/`: dust particle sheet

Belum ada file .tmx/.json Tiled map di dalam pack — jadi peta town/
forest saat ini dibangun manual pakai tileSprite + shape placeholder,
bukan tilemap Tiled asli. Kalau mau map yang lebih detail dan presisi
(bangunan, jalan, dekorasi tertata), perlu disusun manual pakai Tiled
Map Editor (gratis) dengan tileset dari pack ini, lalu diekspor ke
JSON dan dimuat lewat `this.load.tilemapTiledJSON()`.

## Update: Peta tile & sistem masak (iterasi ke-2)

- Town & Forest sekarang dibangun dari tile asli (walls, fences,
  floors, decor16, water1) lewat `src/utils/MapBuilder.js`, bukan lagi
  kotak warna polos.
- **Penting**: indeks tile (`TILE_INDEX` di MapBuilder.js) dipilih
  berdasarkan posisi grid, bukan pencocokan visual presisi tiap
  sudut/sisi. Kalau ada tile yang keliatan janggal (misal sudut pagar
  gak nyambung), cukup ganti angkanya di satu tempat itu — gak perlu
  bongkar Town.js/Forest.js.
- Monster **"Wolf"** ditambahkan ke `monsters.json` untuk kebutuhan
  bahan masakan (`raw_meat`), tapi **sprite asli serigala belum ada**
  di pack Mystic Woods free 2.1 — sementara dipinjam sprite skeleton
  sebagai placeholder visual. Ganti `sprite: "wolf"` begitu ada aset
  asli (cek juga apakah 2.2 punya sprite wolf).
