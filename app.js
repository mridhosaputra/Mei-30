/* ============================================================
   app.js — Pengatur alur layar (overlay) di luar game Mario.
   Login -> Menu -> Teks -> Sub-game foto -> Teks -> Mario -> Menang
   Semua TEKS diambil dari config.js (window.CONFIG).
   ============================================================ */
(function () {
  const C = window.CONFIG;
  const $ = (id) => document.getElementById(id);

  /* ---------- util layar & pop-up ---------- */
  function showScreen(id) {
    document.querySelectorAll('.screen').forEach((s) => s.classList.remove('active'));
    $(id).classList.add('active');
  }

  function showPopup({ title, teks, tombol }, onClose) {
    $('popup-title').textContent = title;
    $('popup-text').textContent = teks;
    const btn = $('popup-btn');
    btn.textContent = tombol;
    btn.onclick = () => {
      $('popup').classList.remove('active');
      if (onClose) onClose();
    };
    $('popup').classList.add('active');
  }

  function norm(s) {
    return (s || '').trim().toLowerCase().replace(/\s+/g, ' ');
  }

  /* ============================================================
     1. LOGIN
     ============================================================ */
  function initLogin() {
    $('login-title').textContent = C.login.title;
    $('login-subtitle').textContent = C.login.subtitle;
    $('login-nama-label').textContent = C.login.namaLabel;
    $('login-nama').placeholder = C.login.namaPlaceholder;
    $('login-umur-label').textContent = C.login.umurLabel;
    $('login-umur').placeholder = C.login.umurPlaceholder;
    $('login-btn').textContent = C.login.tombol;

    function submit() {
      const nama = $('login-nama').value;
      const umur = $('login-umur').value;
      const err = $('login-error');

      if (norm(nama) !== norm(C.login.namaJawaban)) {
        err.textContent = C.login.errorNama;
        return;
      }
      if (norm(umur) !== norm(String(C.login.umurJawaban))) {
        err.textContent = C.login.errorUmur;
        return;
      }
      err.textContent = '';
      showScreen('screen-menu');
    }

    $('login-btn').onclick = submit;
    document.querySelectorAll('#screen-login .field').forEach((f) => {
      f.addEventListener('keydown', (e) => { if (e.key === 'Enter') submit(); });
    });
  }

  /* ============================================================
     2. MENU
     ============================================================ */
  function initMenu() {
    $('menu-title').textContent = C.menu.title;
    $('menu-subtitle').textContent = C.menu.subtitle;
    $('menu-btn').textContent = C.menu.tombol;

    $('menu-btn').onclick = () => {
      // Pop-up teks sebelum sub-game 1
      showPopup(
        { title: C.introSubgame1.title, teks: C.introSubgame1.teks, tombol: C.introSubgame1.tombol },
        startSubgame1,
      );
    };
  }

  /* ============================================================
     3. SUB-GAME 1: PILIH SEMUA FOTO
     ============================================================ */
  let selected = new Set();

  function buildGrid() {
    const grid = $('sg1-grid');
    grid.innerHTML = '';
    selected = new Set();
    C.subgame1.photos.forEach((src, i) => {
      const cell = document.createElement('div');
      cell.className = 'photo-cell';
      cell.dataset.index = i;
      const img = document.createElement('img');
      img.src = src;
      img.alt = 'foto ' + (i + 1);
      cell.appendChild(img);
      cell.addEventListener('click', () => {
        if (selected.has(i)) {
          selected.delete(i);
          cell.classList.remove('selected');
        } else {
          selected.add(i);
          cell.classList.add('selected');
        }
        $('sg1-error').textContent = '';
      });
      grid.appendChild(cell);
    });
  }

  function startSubgame1() {
    $('sg1-pertanyaan').textContent = C.subgame1.pertanyaan;
    $('sg1-petunjuk').textContent = C.subgame1.petunjuk;
    $('sg1-btn').textContent = C.subgame1.tombol;
    $('sg1-error').textContent = '';
    buildGrid();
    showScreen('screen-subgame1');

    $('sg1-btn').onclick = () => {
      const total = C.subgame1.photos.length;
      if (selected.size === total) {
        // Benar -> pop-up teks lalu mulai Mario
        showPopup(
          { title: C.afterSubgame1.title, teks: C.afterSubgame1.teks, tombol: C.afterSubgame1.tombol },
          startMario,
        );
      } else {
        $('sg1-error').textContent = C.subgame1.errorSalah;
      }
    };
  }

  /* ============================================================
     4. GAME MARIO
     ============================================================ */
  // Jawaban quiz yang dipilih pemain (per blok). Direset tiap mulai game.
  let quizAnswers = [];

  function startMario() {
    quizAnswers = (C.marioQuiz || []).map(() => null);
    showScreen('screen-game');
    // Beri waktu layar tampil sebelum game mulai (canvas perlu terlihat).
    setTimeout(() => {
      if (typeof window.startMarioGame === 'function') {
        window.startMarioGame();
      } else {
        console.error('startMarioGame belum tersedia (bundle.js belum dimuat?)');
      }
    }, 50);
  }

  /* ----- Quiz saat blok tanda tanya kena kepala (game di-freeze) -----
     Tidak ada jawaban salah: pilih opsi -> konfirmasi -> rekam -> lanjut. */
  function showQuiz(quizId) {
    const q = C.marioQuiz[quizId];
    if (!q) { // tidak ada soal -> langsung lanjut
      if (window.__marioResume) window.__marioResume();
      return;
    }
    const opsiBox = $('quiz-opsi');
    const konfBox = $('quiz-konfirmasi');

    function tampilOpsi() {
      konfBox.style.display = 'none';
      opsiBox.style.display = '';
      opsiBox.innerHTML = '';
      q.opsi.forEach((teks, i) => {
        const b = document.createElement('button');
        b.className = 'quiz-opt';
        b.textContent = teks;
        b.onclick = () => tampilKonfirmasi(i);
        opsiBox.appendChild(b);
      });
    }

    function tampilKonfirmasi(i) {
      const k = C.quizKonfirmasi || {};
      opsiBox.style.display = 'none';
      konfBox.style.display = '';
      $('quiz-konfirmasi-teks').textContent = k.teks || 'Yakin pilih jawaban ini?';
      $('quiz-pilihan').textContent = '“' + q.opsi[i] + '”';
      $('quiz-batal').textContent = k.batal || 'Ganti';
      $('quiz-ya').textContent = k.ya || 'Ya';
      $('quiz-batal').onclick = tampilOpsi; // balik milih lagi
      $('quiz-ya').onclick = () => {
        quizAnswers[quizId] = q.opsi[i];   // rekam jawaban
        $('quiz').classList.remove('active');
        if (window.__marioResume) window.__marioResume(); // lanjut main
      };
    }

    $('quiz-pertanyaan').textContent = q.pertanyaan;
    tampilOpsi();
    $('quiz').classList.add('active');
  }

  window.addEventListener('mario-quiz', (e) => {
    showQuiz(e.detail.quizId);
  });

  /* ----- Kotak Review akhir: jumlah eskrim + jawaban 3 pertanyaan ----- */
  function showReview() {
    const r = C.review || {};
    const eskrimCfg = C.eskrim || {};
    const score = window.__marioData && window.__marioData.entities &&
      window.__marioData.entities.score;
    const jumlahEskrim = score ? score.coinCount : 0;

    $('review-title').textContent = r.title || 'Hasil';
    $('review-eskrim').textContent =
      (eskrimCfg.ikon || '🍦') + ' ' + (r.eskrimLabel || 'Voucher eskrim:') + ' ' + jumlahEskrim;
    $('review-jawaban-label').textContent = r.jawabanLabel || 'Jawaban kamu:';

    const list = $('review-list');
    list.innerHTML = '';
    (C.marioQuiz || []).forEach((q, i) => {
      const li = document.createElement('li');
      const jwb = quizAnswers[i] || (r.belumDijawab || '(belum dijawab)');
      li.innerHTML = '<span class="rev-q">' + q.pertanyaan + '</span><span class="rev-a">' +
        jwb + '</span>';
      list.appendChild(li);
    });

    const btn = $('review-btn');
    btn.textContent = r.tombol || 'Submit';
    btn.onclick = () => {
      $('review').classList.remove('active');
      // kotak teks penutup -> baru kembali ke menu
      showPopup(
        { title: C.afterReview.title, teks: C.afterReview.teks, tombol: C.afterReview.tombol },
        () => showScreen('screen-menu'),
      );
    };
    $('review').classList.add('active');
  }

  /* ----- Menang sampai finish ----- */
  window.addEventListener('mario-win', () => {
    // 1) popup menang -> 2) review -> 3) teks penutup -> 4) menu
    showPopup(
      { title: C.win.title, teks: C.win.teks, tombol: C.win.tombol },
      showReview,
    );
  });

  /* ============================================================
     INIT
     ============================================================ */
  initLogin();
  initMenu();
  showScreen('screen-login');
})();
