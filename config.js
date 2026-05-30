/* ============================================================
   CONFIG.js  —  Semua teks & jawaban ada DI SINI.
   Edit bebas di file ini, lalu refresh browser.
   (Tidak perlu build ulang untuk mengubah teks di file ini.)
   ============================================================ */

window.CONFIG = {

  /* ---------- 1. HALAMAN LOGIN ---------- */
  login: {
    title: 'Selamat Datang 🎂',
    subtitle: 'Isi dulu ya sebelum mulai',

    namaLabel: 'Siapa namamu?',
    namaPlaceholder: 'Tulis nama lengkap...',
    // Jawaban nama yang benar (huruf besar/kecil & spasi berlebih diabaikan)
    namaJawaban: 'Firanindyta Hade',

    umurLabel: 'Ulang tahun ke berapa sekarang?',
    umurPlaceholder: 'Tulis angka...',
    // Jawaban yang benar
    umurJawaban: '26',

    tombol: 'Masuk',
    errorNama: 'Hmm, nama belum tepat. Coba lagi ya 😊',
    errorUmur: 'Ulang tahun ke berapa sekarang? Jawabannya belum tepat, coba lagi 😉',
  },

  /* ---------- 2. MENU UTAMA ---------- */
  menu: {
    title: 'Happy Birthday! 🎉',
    subtitle: 'Firanindyta Hade',
    tombol: "Let's Go!",
  },

  /* ---------- 3. KOTAK TEKS SEBELUM SUB-GAME 1 ---------- */
  // Tulis bebas. Pakai \n untuk baris baru.
  introSubgame1: {
    title: 'Pesan Untukmu 💌',
    teks:
      'Tulis pesan pembuka kamu di sini...\n\n' +
      '(Ganti teks ini di file config.js bagian introSubgame1)',
    tombol: 'Lanjut',
  },

  /* ---------- 4. SUB-GAME 1: PILIH FOTO ---------- */
  subgame1: {
    pertanyaan: 'Pilih SEMUA foto kenangan kita 💕',
    petunjuk: 'Klik semua foto, lalu tekan Submit.',
    tombol: 'Submit',
    // Salah / belum semua terpilih:
    errorSalah: 'Jawabannya salah, coba lagi ya!',
    // Daftar foto (timpa file di folder assets/photos/). Harus tetap 12 foto utk grid 3x4.
    photos: [
      'assets/photos/1.jpg', 'assets/photos/2.jpg', 'assets/photos/3.jpg',
      'assets/photos/4.jpg', 'assets/photos/5.jpg', 'assets/photos/6.jpg',
      'assets/photos/7.jpg', 'assets/photos/8.jpg', 'assets/photos/9.jpg',
      'assets/photos/10.jpg', 'assets/photos/11.jpg', 'assets/photos/12.jpg',
    ],
  },

  /* ---------- 5. POP-UP TEKS SETELAH SUB-GAME 1 ---------- */
  afterSubgame1: {
    title: 'Yeay, Benar! ✨',
    teks:
      'Tulis pesan setelah sub-game 1 di sini...\n\n' +
      'Sekarang lanjut ke petualangan Mario!',
    tombol: 'Mulai Game Mario',
  },

  /* ---------- 6. QUIZ DI GAME MARIO (3 BLOK TANDA TANYA) ---------- */
  // Saat kepala Mario kena blok tanda tanya, game freeze & muncul soal ini.
  // Jawaban pilihan ganda. "benar" = index opsi yang benar (mulai dari 0).
  marioQuiz: [
    { // Blok ke-1
      pertanyaan: 'Tulis pertanyaan blok 1 di sini?',
      opsi: ['Pilihan A', 'Pilihan B', 'Pilihan C'],
      benar: 0,
    },
    { // Blok ke-2
      pertanyaan: 'Tulis pertanyaan blok 2 di sini?',
      opsi: ['Pilihan A', 'Pilihan B', 'Pilihan C'],
      benar: 0,
    },
    { // Blok ke-3
      pertanyaan: 'Tulis pertanyaan blok 3 di sini?',
      opsi: ['Pilihan A', 'Pilihan B', 'Pilihan C'],
      benar: 0,
    },
  ],
  marioQuizError: 'Coba lagi dengan syarat',

  /* ---------- 7. POP-UP SAAT MENANG (SAMPAI FINISH) ---------- */
  win: {
    title: 'Kamu Menang! 🏆',
    teks:
      'Tulis pesan kemenangan / penutup di sini...\n\n' +
      'Selamat ulang tahun, sayang! 🎂🎉',
    tombol: 'Kembali ke Menu',
  },
};
