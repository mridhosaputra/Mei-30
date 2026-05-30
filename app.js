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
  function startMario() {
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

  /* ----- Quiz saat blok tanda tanya kena kepala (game di-freeze) ----- */
  function showQuiz(quizId) {
    const q = C.marioQuiz[quizId];
    if (!q) { // tidak ada soal -> langsung lanjut
      if (window.__marioResume) window.__marioResume();
      return;
    }
    $('quiz-pertanyaan').textContent = q.pertanyaan;
    $('quiz-error').textContent = '';
    const box = $('quiz-opsi');
    box.innerHTML = '';
    q.opsi.forEach((teks, i) => {
      const b = document.createElement('button');
      b.className = 'quiz-opt';
      b.textContent = teks;
      b.onclick = () => {
        if (i === q.benar) {
          $('quiz').classList.remove('active');
          if (window.__marioResume) window.__marioResume(); // lanjut main
        } else {
          $('quiz-error').textContent = C.marioQuizError;
        }
      };
      box.appendChild(b);
    });
    $('quiz').classList.add('active');
  }

  window.addEventListener('mario-quiz', (e) => {
    showQuiz(e.detail.quizId);
  });

  /* ----- Menang sampai finish ----- */
  window.addEventListener('mario-win', () => {
    showPopup(
      { title: C.win.title, teks: C.win.teks, tombol: C.win.tombol },
      () => showScreen('screen-menu'), // kembali ke menu utama
    );
  });

  /* ============================================================
     INIT
     ============================================================ */
  initLogin();
  initMenu();
  showScreen('screen-login');
})();
