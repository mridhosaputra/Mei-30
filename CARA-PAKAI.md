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
| `marioQuiz` | **3 pertanyaan** di blok tanda tanya (pilihan ganda) |
| `win` | Pop-up teks saat **menang** |

### Jawaban login (sudah diset)
- Nama: **Firanindyta Hade** (huruf besar/kecil & spasi bebas)
- Umur: **26**

### Pertanyaan di game Mario
Lihat `marioQuiz` di `config.js`. Tiap blok punya:
```js
{ pertanyaan: '...?', opsi: ['A','B','C'], benar: 0 }
```
`benar` = nomor opsi yang benar, **mulai dari 0** (jadi 0 = opsi pertama).

---

## 🖼️ Mengganti FOTO  →  folder `assets/photos/`

Timpa file **`1.jpg` … `12.jpg`** dengan foto kamu (nama harus sama).
Grid-nya 3×4 = 12 foto. Jawaban benar sub-game = **pilih SEMUA foto** lalu Submit.
(Detail di `assets/photos/README.txt`)

---

## 🎮 Kontrol Mario
- Gerak: ← → atau A / D
- Lompat: ↑ / W / Spasi
- Lompati blok **?** dari bawah → game berhenti & muncul pertanyaan.
  Jawab benar untuk lanjut. Sampai bendera finish = **menang**.

---

## 📁 Struktur penting
- `config.js` — semua teks & jawaban (paling sering kamu edit)
- `assets/photos/` — 12 foto sub-game
- `app.js` — alur layar (login, menu, grid, pop-up)
- `lib/` — kode game Mario (3 blok quiz di `lib/map/level_1-1.js` → `quizBlocks`)
- `assets/javascripts/bundle.js` — hasil build dari `lib/` (jangan diedit manual)
