# Lumina — Hidup Sebagai Petualang Biasa

Life-sim fantasy adventure game. Genre: bukan "selamatkan dunia", tapi
menjalani kehidupan sebagai petualang biasa — guild, quest kecil,
eksplorasi, combat ringan, dan (rencana lanjutan) cooking + kehidupan
kota dengan NPC berjadwal.

Dibangun dengan **Phaser 3** + **Vite**, aset dari **Mystic Woods**
(free version, non-komersial — lihat `docs/asset-notes.md`).

## Status: MVP pertama — Guild + Quest + Combat ringan

Sesuai prioritas yang dipilih, MVP ini fokus ke loop:
`Town (kota) → Guild Hall (ambil quest) → Forest (jelajah + random
encounter) → Combat (turn-based ringan) → dapat loot/gold → kembali
ke Guild Hall untuk tukar hadiah quest`

Yang SUDAH jalan penuh:
- Pergerakan bebas di Town dan Forest (arrow key)
- 3 quest awal (usir slime, bersihkan reruntuhan, kumpulkan jeli)
- Random encounter di hutan (slime lebih sering, skeleton lebih jarang)
- Combat turn-based: Serang / Kabur, HP, damage bervariasi
- Loot & gold drop, quest progress otomatis terupdate saat monster
  dikalahkan atau item terkumpul
- Auto-save ke localStorage

Yang BELUM ada (pilar selanjutnya sesuai dokumen desain,
`docs/game-design.md`):
- Sistem NPC dengan jadwal harian & kota yang hidup
- Cooking/crafting chain dari bahan monster
- Rumah, kebun, dapur, kepemilikan properti
- Romance
- Dungeon sebagai sumber daya
- Cuaca & festival musiman
- Animasi karakter penuh (lihat `docs/asset-notes.md` — frame size
  sudah dikonfirmasi 32x32px, tapi pemetaan baris animasi per
  arah/aksi belum divalidasi manual)

## Menjalankan

```bash
npm install
npm run dev
```

## Cara main (MVP saat ini)

1. Dari menu utama, klik "Mulai Petualangan"
2. Di Town, jalan ke kotak "Guild Hall" untuk lihat papan quest
3. Klik "[ Ambil ]" di salah satu quest
4. Kembali ke Town, jalan ke "Gerbang Hutan"
5. Jalan-jalan di hutan — encounter monster muncul otomatis
6. Di combat, pilih Serang atau Kabur
7. Setelah menang beberapa kali dan quest selesai, kembali ke Guild
   Hall dan klik "[ Tukar Hadiah ]"

## Struktur

```
src/
├── core/       Config Phaser, Constants, SaveManager, AssetManifest
├── data/       quests.json, monsters.json, items.json
├── systems/    QuestSystem, CombatSystem
├── ui/         TextBox, Button (reusable)
└── scenes/     Boot, Preload, MainMenu, Town, GuildHall, Forest, Combat
```

## Keterbatasan verifikasi

Sandbox pembuatan project ini tidak ada akses internet, jadi
`npm install`/`npm run build` belum dijalankan langsung di sini.
Yang sudah diverifikasi: seluruh `.js` lolos `node --check`, seluruh
`.json` valid. Jalankan `npm install && npm run dev` di komputermu
untuk cek render sungguhan di browser.

## Update iterasi ke-2

Ditambahkan:
- **Peta tile nyata** untuk Town (Guild Hall & Dapur sebagai bangunan
  dinding+pintu+lantai, pagar taman, dekorasi) dan Forest (kolam,
  dekorasi, titik forage)
- **Bangunan baru: Dapur** — scene `Kitchen.js`
- **Sistem memasak**: resep `sup_jeli` (heal) dan `steak_serigala`
  (buff attack sementara), bahan didapat dari drop monster + forage
  herb di hutan
- Monster baru **Wolf** (drop `raw_meat`) — sprite masih placeholder
  (pinjam skeleton), lihat `docs/asset-notes.md`
- `CombatSystem` sekarang membaca `attackBuff` dari masakan
