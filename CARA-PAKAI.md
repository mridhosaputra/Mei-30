# 🎂 Game Ulang Tahun Firanindyta — Panduan

Game ini = lapisan ulang tahun di atas clone **Super Mario Bros JS**.
Alur: **Login → Menu → Pesan → Sub-game Pilih Foto → Pesan → Game Mario (ada quiz) → Menang → Menu**

---

## ▶️ Cara menjalankan

Buka **cmd** di folder ini, lalu:

```cmd
npm install        :: sekali saja (pasang esbuild)
npm start          :: jalankan server di http://127.0.0.1:8080
```

Buka browser ke **http://127.0.0.1:8080**

> Kalau habis mengubah file di folder `lib/` (kode game Mario), `npm start`/`npm run build`
> otomatis membangun ulang. Kalau cuma mengubah **config.js / foto**, cukup refresh browser.

Untuk membangun sekali tanpa server: `npm run build`

---

## ✏️ Mengubah semua TEKS  →  file `config.js`

Semua tulisan ada di **`config.js`** (buka pakai Notepad / VS Code). Bagiannya:

| Bagian di config.js | Untuk apa |
|---|---|
| `login` | Judul login + **jawaban nama & umur** + pesan error |
| `menu` | Judul menu + tombol Let's Go |
| `introSubgame1` | Kotak teks **sebelum** sub-game foto |
| `subgame1` | Pertanyaan foto + daftar nama file foto + pesan salah |
| `afterSubgame1` | Pop-up teks **setelah** sub-game foto |
| `marioQuiz` | **3 pertanyaan** di blok tanda tanya |
| `quizKonfirmasi` | Teks kotak konfirmasi "Yakin?" + tombol Ya / Ganti |
| `eskrim` | Label & ikon **Voucher Eskrim** di HUD |
| `win` | Pop-up teks saat **menang** (tombol → buka Review) |
| `review` | Kotak **Review** akhir: jumlah eskrim + daftar jawaban + tombol Submit |
| `afterReview` | Kotak teks **penutup** (setelah Submit) sebelum kembali ke menu |

### Jawaban login (sudah diset)
- Nama: **Firanindyta Hade** (huruf besar/kecil & spasi bebas)
- Umur: **26**

### Pertanyaan di game Mario
Lihat `marioQuiz` di `config.js`. **Tidak ada jawaban salah** — semua opsi boleh dipilih,
nanti muncul konfirmasi dulu, dan pilihannya direkam untuk ditampilkan di kotak Review akhir.
Tiap blok cuma butuh:
```js
{ pertanyaan: '...?', opsi: ['Pilihan A', 'Pilihan B', 'Pilihan C'] }
```
(Boleh tambah/kurangi jumlah opsi.)

---

## 🖼️ Mengganti FOTO  →  folder `assets/photos/`

Timpa file **`1.jpg` … `12.jpg`** dengan foto kamu (nama harus sama).
Grid-nya 3×4 = 12 foto. Jawaban benar sub-game = **pilih SEMUA foto** lalu Submit.
(Detail di `assets/photos/README.txt`)

---

## 🎮 Kontrol & cara main Mario
- Gerak: ← → atau A / D
- Lompat: ↑ / W / Spasi
- Lompati **blok ?** dari bawah → game berhenti & muncul pertanyaan.
  Pilih jawaban (bebas, tak ada yang salah) → konfirmasi → lanjut.
- **🍦 Eskrim** (dulu koin): pukul blok koin → dapat eskrim. Jumlahnya dihitung
  di HUD pojok kiri atas, di sebelah kanan Score (**Voucher Eskrim**).
- Sampai **bendera finish** = menang → muncul **Review** (jumlah eskrim + jawabanmu)
  → Submit → kotak teks penutup → kembali ke menu.

### Mengubah letak 3 blok pertanyaan
Di `lib/map/level_1-1.js`, array `quizBlocks` berisi 3 koordinat `[x, y, lebar, tinggi]`.
Urutannya = pertanyaan ke-1, 2, 3 di `config.js > marioQuiz`. (Kalau mengubah `lib/`,
jalankan `npm start` lagi supaya di-build ulang.)

---

## 📁 Struktur penting
- `config.js` — semua teks & jawaban (paling sering kamu edit)
- `assets/photos/` — 12 foto sub-game
- `app.js` — alur layar (login, menu, grid, pop-up)
- `lib/` — kode game Mario (3 blok quiz di `lib/map/level_1-1.js` → `quizBlocks`)
- `assets/javascripts/bundle.js` — hasil build dari `lib/` (jangan diedit manual)
