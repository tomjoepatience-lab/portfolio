/* =========================================================
   tomjo portfolio — 動き & 画像フォールバック（素の JS）
   すべて要素存在チェック入り。記事ページで読み込んでもエラーにならない。
   ========================================================= */
(function () {
  'use strict';

  // JS 有効: no-js を外す（.no-js の初期非表示解除ルールが無効になる）
  document.documentElement.classList.remove('no-js');

  var reduceMotion =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var forEach = function (list, fn) {
    Array.prototype.forEach.call(list, fn);
  };

  // ---------- 1. メディア（実画像 ＋ 絵文字フォールバック） ----------
  function initMedia() {
    var imgs = document.querySelectorAll('.media__img');
    if (!imgs.length) return;
    forEach(imgs, function (img) {
      // すでに読み込み済み（キャッシュ）
      if (img.complete && img.naturalWidth > 0) {
        img.classList.add('is-loaded');
        return;
      }
      img.addEventListener('load', function () {
        img.classList.add('is-loaded');
      });
      img.addEventListener('error', function () {
        // 画像が無い/壊れている → img を消してフォールバックを見せる
        if (img.parentNode) img.parentNode.removeChild(img);
      });
    });
  }

  // ---------- 2. スクロールリビール ----------
  function initReveal() {
    var els = document.querySelectorAll('.reveal');
    if (!els.length) return;

    // モーション低減 or IO 非対応 → 即表示
    if (reduceMotion || !('IntersectionObserver' in window)) {
      forEach(els, function (el) { el.classList.add('is-in'); });
      return;
    }

    // カード群のスタッガー
    forEach(document.querySelectorAll('.card.reveal'), function (el, i) {
      el.style.transitionDelay = (i % 6) * 70 + 'ms';
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });

    forEach(els, function (el) { io.observe(el); });
  }

  // ---------- 3. ヒーロー入場 ----------
  function initHeroEntrance() {
    // opacity:0 の初期状態を確実に描画させてから is-ready を付け、遷移を再生
    if (reduceMotion) {
      document.body.classList.add('is-ready');
      return;
    }
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        document.body.classList.add('is-ready');
      });
    });
  }

  // ---------- 4. パララックス（ヒーローのアート） ----------
  function initParallax() {
    if (reduceMotion) return;
    var art = document.querySelector('.hero__art');
    if (!art) return;
    var ticking = false;
    function update() {
      var y = window.pageYOffset || document.documentElement.scrollTop || 0;
      var offset = Math.min(y * 0.08, 40);
      art.style.transform = 'translateY(' + offset + 'px)';
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });
  }

  // ---------- 5a. ナビ: スクロールで背景を濃く ----------
  function initNavScrolled() {
    var nav = document.querySelector('.nav');
    if (!nav) return;
    function onScroll() {
      var y = window.pageYOffset || document.documentElement.scrollTop || 0;
      nav.classList.toggle('nav--scrolled', y > 10);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ---------- 5b. ナビ: 現在地ハイライト ----------
  function initNavActive() {
    if (!('IntersectionObserver' in window)) return;
    var ids = ['products', 'works', 'about'];
    var links = {};
    var ratios = {};
    var sections = [];
    ids.forEach(function (id) {
      var sec = document.getElementById(id);
      var link = document.querySelector('.nav__links a[href="#' + id + '"]');
      if (sec && link) {
        links[id] = link;
        ratios[id] = 0;
        sections.push(sec);
      }
    });
    if (!sections.length) return;

    function apply() {
      var bestId = null;
      var best = 0;
      for (var id in ratios) {
        if (ratios.hasOwnProperty(id) && ratios[id] > best) {
          best = ratios[id];
          bestId = id;
        }
      }
      for (var id2 in links) {
        if (links.hasOwnProperty(id2)) {
          links[id2].classList.toggle('is-active', best > 0 && id2 === bestId);
        }
      }
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        ratios[e.target.id] = e.isIntersecting ? e.intersectionRatio : 0;
      });
      apply();
    }, { threshold: [0, 0.25, 0.5, 0.75, 1] });

    sections.forEach(function (s) { io.observe(s); });
  }

  // ---------- 6. 作品フィルタ（Web / iOS） ----------
  function initFilter() {
    var filters = document.querySelectorAll('.filter');
    var grid = document.getElementById('grid');
    if (!filters.length || !grid) return;
    var cards = grid.querySelectorAll('.card');
    forEach(filters, function (btn) {
      btn.addEventListener('click', function () {
        forEach(filters, function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');
        var f = btn.dataset.filter;
        forEach(cards, function (c) {
          var show = f === 'all' || c.dataset.cat === f;
          c.classList.toggle('is-hidden', !show);
        });
        // 切替時のポップイン
        grid.classList.add('grid--pop');
        setTimeout(function () { grid.classList.remove('grid--pop'); }, 500);
      });
    });
  }

  // ---------- 起動 ----------
  function init() {
    initMedia();
    initReveal();
    initParallax();
    initNavScrolled();
    initNavActive();
    initFilter();
    initHeroEntrance();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
