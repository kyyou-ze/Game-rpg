# "Lumina" — Dokumen Desain: Hidup Sebagai Petualang Biasa

## 1. Pergeseran arah

Project sebelumnya (visual novel romance sekolah "Senja yang Tak Terucap")
**diganti total**. Game baru ini genre-nya beda jauh: bukan VN linear
berbasis dialog-pilihan-ending, tapi **life-sim eksplorasi fantasi**
open-ended, mirip nuansa *Tondemo Skill*, *Frieren*, *Delicious in Dungeon*,
*Kino's Journey*.

## 2. Tema inti

> **"Hidup sebagai petualang biasa di dunia fantasi."**

Tidak ada Chosen One, tidak ada Raja Iblis, tidak ada ancaman kiamat.
Pemain adalah petualang biasa yang cari nafkah, kenal orang, jelajah dunia,
dan membangun kehidupan — bukan menyelamatkan dunia.

## 3. Setting awal

- Kota kecil **Lumina**, titik mula pemain
- Fasilitas awal: Guild (papan quest), pasar, tavern, penginapan
- Pemain mulai dengan: tas kecil, pedang biasa, tidur di penginapan

## 4. Pilar gameplay (4 loop utama)

1. **Guild & Quest** — daftar guild, ambil quest kecil (bukan selamatkan dunia)
2. **Eksplorasi & Combat ringan** — hutan/gunung/pantai/vulkanik, monster sebagai ekosistem bukan musuh utama
3. **Cooking & Crafting** — bahan dari monster/dungeon jadi makanan dengan efek (buff sementara), resep, reputasi
4. **Kehidupan kota (life-sim)** — NPC dengan rutinitas harian, hubungan, romance perlahan, membangun rumah/kebun/dapur

## 5. Dunia hidup meski pemain diam

- NPC (target awal: skala kecil dulu, misal 10-15 NPC untuk MVP, bukan 100) punya jadwal harian:
  - Pagi: petani ke ladang, anak sekolah, pedagang buka toko
  - Siang: pasar ramai, adventurer pulang dari dungeon
  - Sore: orang pulang, tavern mulai ramai
  - Malam: toko tutup, monster lebih kuat muncul di luar kota
- Cuaca memengaruhi monster, hasil panen, aktivitas kota
- Festival musiman berubah tiap beberapa hari in-game
- Quest baru bisa muncul dari peristiwa dunia, bukan cuma dari level pemain

## 6. Contoh quest (skala kecil, bukan epik)

- Bantu petani usir slime dari ladang
- Cari jamur langka di hutan
- Antar surat ke kota tetangga
- Tangkap ayam yang kabur
- Buru rusa hutan untuk daging
- Kumpulkan madu monster
- Masak untuk festival kota
- Bantu toko bikin stok makanan

## 7. Monster sebagai ekosistem (bukan musuh utama cerita)

| Area | Monster |
|---|---|
| Hutan | Slime, Goblin, Wolf, Boar |
| Gunung | Rock Golem, Wyvern, Mountain Bear |
| Pantai | Crab Monster, Sea Serpent |
| Vulkanik | Salamander, Fire Lizard |

## 8. Dungeon = sumber daya, bukan tempat boss final

- Bijih langka, tanaman obat, monster untuk bahan masakan, kristal sihir
- Makin dalam makin berbahaya, tapi tidak wajib ditaklukkan untuk "menang"

## 9. Sistem memasak (pilar penting, terinspirasi Tondemo Skill)

Rantai contoh:
```
Dire Wolf → Daging Dire Wolf → Steak → +HP, +Attack sementara
Slime → Slime Jelly → Dessert → efek lain
```

- Bahan didapat dari drop monster/dungeon/panen
- Resep bisa dibuka progresif
- Masakan bisa buka quest tertentu atau naikkan reputasi, bukan cuma heal

## 10. Progres pemain (bukan naik level power fantasy, tapi membangun hidup)

Awal: tas kecil, pedang biasa, tidur di penginapan
~20 jam kemudian: rumah, kebun, dapur, gudang, peliharaan, teman satu party

## 11. Romance (opsional, perlahan, lewat aktivitas bukan dialog choice semata)

Contoh trigger kedekatan: masak bareng, festival kota, mancing, camping,
berburu bareng, lihat meteor, bantu kerjaan sehari-hari.

## 12. Akhir game (opsional/terbuka, bukan final boss)

Pemain jadi petualang dikenal, punya rumah, opsional keluarga/pasangan,
teman-teman kumpul pesta panen, kamera pan ke kota yang terasa seperti
rumah sendiri, lalu kredit.

## 13. Aset

Pemain sudah punya asset pack pixel art bertema fantasy ("Mystic
[Woods/Sword]" — perlu dikonfirmasi nama & isi persisnya) yang rencananya
dipakai untuk tileset/karakter. Perlu diunggah/dicek isinya (tileset,
spritesheet karakter, monster, item) supaya AssetManager & animasi bisa
disesuaikan dengan frame/ukuran asli, bukan lagi placeholder warna.

---

## Skala masalah: ini JAUH lebih besar dari project VN sebelumnya

VN sebelumnya = jalur linear, satu arah, gampang diprediksi cakupannya.
Game ini = sistem simulasi terbuka (NPC schedule, cuaca, ekonomi kecil,
crafting chain, dungeon procedural/semi-procedural, kalender in-game).
Membangun semuanya sekaligus dalam satu prototype **tidak realistis**.

Supaya progresnya nyata dan bisa dimainkan cepat, disarankan membangun
bertahap lewat MVP kecil dulu, baru diperluas — bukan langsung semua pilar
sekaligus.
