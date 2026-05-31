/* ============================================================
   CONFIG.js  —  Semua teks & jawaban ada DI SINI.
   Edit bebas di file ini, lalu refresh browser.
   (Tidak perlu build ulang untuk mengubah teks di file ini.)
   ============================================================ */

window.CONFIG = {

  /* ---------- 1. HALAMAN LOGIN ---------- */
  login: {
    title: 'Haloo Ayang Cantikk 🎂',
    subtitle: 'Isi dulu bole kali ya',

    namaLabel: 'Isi nama dulu?',
    namaPlaceholder: 'Tulis nama lengkap...',
    // Jawaban nama yang benar (huruf besar/kecil & spasi berlebih diabaikan)
    namaJawaban: 'Firanindyta Hade',

    umurLabel: 'Cie ulang tahun ke berapa ni?',
    umurPlaceholder: 'Tulis angka...',
    // Jawaban yang benar
    umurJawaban: '26',

    tombol: 'Masuk',
    errorNama: 'Hmm, nama belum tepat. Coba lagi ya 😊',
    errorUmur: 'Cie ulang tahun ke berapa ni? belum tepat, coba lagi 😉',
  },

  /* ---------- 2. MENU UTAMA ---------- */
  menu: {
    title: 'Once Again, Happy Birthday! 🎉',
    subtitle: 'Ayang',
    tombol: "Let's Go Kita Main Duluw!",
  },

  /* ---------- 3. KOTAK TEKS SEBELUM SUB-GAME 1 ---------- */
  // Tulis bebas. Pakai \n untuk baris baru.
  introSubgame1: {
    title: 'Pesan Untuk ayang 💌',
    teks:
      'di Umur yang 26 tahun ini, semogaaa\n\n semua yang di doakan oleh ayang segera terwujud \n\n semogaa kita sama sama terus yaa \n\n Bismillah 2027 \n\n kita main game dulu buat dapet hadiahnya' +
      '(Ganti teks ini di file config.js bagian introSubgame1)',
    tombol: 'Lanjut',
  },

  /* ---------- 4. SUB-GAME 1: PILIH FOTO ---------- */
  subgame1: {
    pertanyaan: 'Pilih foto ayang yang paling cantik 💕',
    petunjuk: 'Pilih foto, lalu tekan Submit.',
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
    title: 'Yeay, Bener! ✨',
    teks:
      'Mantap, ayang dah nyelesaiin game pertamanya,\n\n hadiah menunggu setelah ini ihiw' +
      'Sekarang lanjut ke petualangan Mario!',
    tombol: 'Mulai Game Mario',
  },

  /* ---------- 6. QUIZ DI GAME MARIO (3 BLOK TANDA TANYA) ---------- */
  // Saat kepala Mario kena blok tanda tanya, game freeze & muncul soal ini.
  // TIDAK ADA jawaban salah: semua opsi bisa dipilih. Setelah klik opsi,
  // muncul konfirmasi dulu. Pilihan direkam & ditampilkan di review akhir.
  marioQuiz: [
    { // Blok ke-1
      pertanyaan: 'Pilih sarapannya mo apaa?',
      opsi: ['Kuah kuah', 'Dimsum', 'Pilihan lainnya, bilang langsung'],
    },
    { // Blok ke-2
      pertanyaan: 'Pilih Hadiahh?',
      opsi: ['Shopping Fashion', 'Bukuu CPNS', 'Sepatuu roda'],
    },
    { // Blok ke-3
      pertanyaan: 'Rekreasii pilihan?',
      opsi: ['Lukis lukis', 'Gondola', 'Bilang langsung'],
    },
  ],
  // Kotak konfirmasi setelah memilih jawaban quiz.
  quizKonfirmasi: {
    teks: 'Yakin pilih jawaban ini?',
    ya: 'Ya, lanjut',
    batal: 'Ganti',
  },

  /* ---------- 7. ESKRIM (eks-koin) ---------- */
  eskrim: {
    label: 'Voucher Eskrim',   // tulisan di HUD samping Score
    ikon: '🍦',                // ikon di HUD & di dalam game
  },

  /* ---------- 8. POP-UP SAAT MENANG (SAMPAI FINISH) ---------- */
  win: {
    title: 'Yeay dah Menang! 🏆',
    teks:
      'Once Again\n\n' +
      'Selamat ulang tahun, sayang! 🎂🎉',
    tombol: 'Lihat Hasil',
  },

  /* ---------- 9. KOTAK REVIEW (jumlah eskrim + jawaban) ---------- */
  review: {
    title: 'Hasil Petualangan Ayang 🎀',
    eskrimLabel: 'Voucher eskrim terkumpul:',
    jawabanLabel: 'Jawaban Ayang:',
    belumDijawab: '(belum dijawab)',
    tombol: 'Submit',
  },

  /* ---------- 10. KOTAK TEKS PENUTUP (setelah Submit review) ---------- */
  afterReview: {
    title: 'Happy 26 th 💝',
    teks:
      '\n\n' +
      'Sampai jumpa di menu utama!',
    tombol: 'Kembali ke Menu',
  },
};
