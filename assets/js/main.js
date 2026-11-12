(function () {
  'use strict';

  /* dark / light toggle */
  var root = document.documentElement;
  var btn = document.getElementById('theme-toggle');
  function paint() { if (btn) btn.textContent = root.getAttribute('data-theme') === 'dark' ? '☀' : '☾'; }
  paint();
  if (btn) btn.addEventListener('click', function () {
    var dark = root.getAttribute('data-theme') !== 'dark';
    if (dark) root.setAttribute('data-theme', 'dark'); else root.removeAttribute('data-theme');
    try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch (e) {}
    paint();
  });

  /* mobile menu */
  var nav = document.querySelector('.mainnav');
  var tgl = document.querySelector('.nav-toggle');
  if (nav && tgl) tgl.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    tgl.setAttribute('aria-expanded', open);
  });

  /* YouTube: swap thumbnail for the player on click */
  document.addEventListener('click', function (e) {
    var box = e.target.closest && e.target.closest('.yt');
    if (!box || box.querySelector('iframe')) return;
    e.preventDefault();
    var f = document.createElement('iframe');
    f.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(box.dataset.id) + '?autoplay=1&rel=0';
    f.allow = 'accelerometer; autoplay; encrypted-media; picture-in-picture; fullscreen';
    f.allowFullscreen = true;
    f.title = 'YouTube video';
    box.innerHTML = '';
    box.appendChild(f);
  });

  /* header search: icon expands into an input, second click submits */
  var sf = document.querySelector('.search');
  if (sf) {
    var si = sf.querySelector('input');
    sf.addEventListener('submit', function (e) {
      if (!sf.classList.contains('open')) { e.preventDefault(); sf.classList.add('open'); si.focus(); }
      else if (!si.value.trim()) { e.preventDefault(); sf.classList.remove('open'); }
    });
  }

  /* rotate helper used by ticker + sliders */
  function rotator(items, interval) {
    if (items.length < 2) return { go: function () {} };
    var i = 0, timer;
    function show(n) {
      items[i].classList.remove('active');
      i = (n + items.length) % items.length;
      items[i].classList.add('active');
    }
    function start() { stop(); timer = setInterval(function () { show(i + 1); }, interval); }
    function stop() { if (timer) clearInterval(timer); }
    start();
    return { go: function (d) { show(i + d); start(); } };
  }

  var ticker = document.querySelector('.ticker');
  if (ticker) {
    var tr = rotator(Array.prototype.slice.call(ticker.querySelectorAll('.ticker-list li')), 4000);
    ticker.querySelectorAll('.ticker-nav button').forEach(function (b) {
      b.addEventListener('click', function () { tr.go(parseInt(b.dataset.dir, 10)); });
    });
  }

  document.querySelectorAll('[data-slider]').forEach(function (s) {
    var r = rotator(Array.prototype.slice.call(s.querySelectorAll('.slide')), 5500);
    var p = s.querySelector('.s-prev'), n = s.querySelector('.s-next');
    if (p) p.addEventListener('click', function () { r.go(-1); });
    if (n) n.addEventListener('click', function () { r.go(1); });
  });

  /* client-side search (plain substring match, works for Tamil) */
  var out = document.getElementById('search-results');
  if (out) {
    var input = document.getElementById('search-input');
    var status = document.getElementById('search-status');
    var q = (new URLSearchParams(location.search).get('q') || '').trim();
    input.value = q;
    if (!q) return;
    fetch(out.dataset.index).then(function (r) { return r.json(); }).then(function (all) {
      var needle = q.toLowerCase();
      var hits = all.filter(function (p) {
        return (p.title + ' ' + p.content).toLowerCase().indexOf(needle) !== -1;
      });
      status.textContent = hits.length + ' முடிவுகள் — "' + q + '"';
      hits.forEach(function (p) {
        var art = document.createElement('article'); art.className = 'card';
        var body = document.createElement('div'); body.className = 'card-body';
        var h = document.createElement('h3'); var a = document.createElement('a');
        a.href = p.url; a.textContent = p.title; h.appendChild(a);
        var m = document.createElement('div'); m.className = 'meta'; m.textContent = p.date;
        var ex = document.createElement('p'); ex.className = 'excerpt';
        var idx = p.content.toLowerCase().indexOf(needle);
        var from = Math.max(0, idx - 60);
        ex.textContent = (idx > -1 ? p.content.substr(from, 200) : p.summary);
        body.appendChild(h); body.appendChild(m); body.appendChild(ex);
        art.appendChild(body); out.appendChild(art);
      });
    }).catch(function () { status.textContent = 'தேடல் குறியீட்டை ஏற்ற முடியவில்லை.'; });
  }
})();
