/* =====================================================================
   24H EN SAVANE — script du site (vanilla JS, aucune dépendance)
   Les données éditables sont tout en haut : SITE, CREW, MISSIONS.
   ===================================================================== */
(function () {
  'use strict';

  /* ---------- siteConfig : départ des 24 heures (fuseau Europe/Paris) ---------- */
  var SITE = { tz: 'Europe/Paris', year: 2026, month: 10, day: 21, hour: 0, minute: 0 };

  /* ---------- crew : photo = chemin d'une image (optionnel, sinon avatar illustré) ---------- */
  var CREW = [
    { name: 'Tristan',   totem: 'Toucan',     avatar: 'av-toucan.svg',     photo: '' },
    { name: 'Vincent',   totem: 'Gorille',    avatar: 'av-gorille.svg',    photo: '' },
    { name: 'Andy',      totem: 'Caméléon',   avatar: 'av-cameleon.svg',   photo: '' },
    { name: 'Melvin',    totem: 'Panthère',   avatar: 'av-panthere.svg',   photo: '' },
    { name: 'Simon',     totem: 'Crocodile',  avatar: 'av-crocodile.svg',  photo: '' },
    { name: 'Kendy',     totem: 'Perroquet',  avatar: 'av-perroquet.svg',  photo: '' },
    { name: 'Mael',      totem: 'Lémurien',   avatar: 'av-lemurien.svg',   photo: '' },
    { name: 'Guillaume', totem: 'Hibou',      avatar: 'av-hibou.svg',      photo: '' },
    { name: 'Yacine',    totem: 'Éléphant',   avatar: 'av-elephant.svg',   photo: '' },
    { name: 'Enzo',      totem: 'Grenouille', avatar: 'av-grenouille.svg', photo: '' },
    { name: 'Léo',       totem: 'Python',     avatar: 'av-python.svg',     photo: '' },
    { name: 'Amandine',  totem: 'Papillon',   avatar: 'av-papillon.svg',   photo: '' },
    { name: 'Morgan',    totem: 'Lion',       avatar: 'av-lion.svg',       photo: '' }
  ];

  /* ---------- titres / stats / descriptions, tirés au sort ---------- */
  var TITLES = ['Dompteur de segfaults', 'Chasseur de bugs nocturne', 'Survivant de Norminette', 'Explorateur de malloc', 'Prédateur du tronc commun', 'Murmureur de pointeurs', 'Gardien de la libft', 'Sorcier du ft_printf', 'Éclaireur de la Moulinette', 'Maître des free()', 'Pisteur de leaks', 'Alchimiste du Makefile', 'Chaman de Valgrind', 'Roi du get_next_line'];
  var STATS = [['Segfaults domptés', '404'], ['Heures de sommeil', 'NULL'], ['Canettes / nuit', '2,4'], ['Leaks détectés', '0 (soi-disant)'], ['Commits à 4 h', '42'], ['Niveau de tryhard', '9 000'], ['Fonctions > 25 lignes', '0, promis'], ['Rugissements / jour', '3'], ['Onglets man ouverts', '17'], ['Indentation', 'tabs, évidemment'], ['Temps passé sur gdb', 'trop'], ['Cafés compilés', '∞'], ['Rugissements de victoire', '13']];
  var DESCS = ['Parle couramment le C, le Makefile et le soupir.', 'Compile d’abord, réfléchit ensuite. Parfois l’inverse.', 'A vu des segfaults que vous ne croiriez pas.', 'Son clavier connaît la Norminette par cœur.', 'Ne dort pas : passe en mode veille.', 'Transforme le café en libft.', 'Trouve les leaks avant même qu’ils existent.', 'Rugit en silence quand la Moulinette passe.', 'Lit les pages man pour se détendre.', 'Range ses pointeurs par ordre alphabétique.', 'A survécu à la Piscine avec le sourire (et des cernes).', 'Débugue à la lampe frontale, façon expédition.', 'Règne sur la savane du terminal, crinière au vent.'];

  /* ---------- missions ---------- */
  var MISSIONS = [
    { num: '01', title: 'Red Bull non-stop', theme: 't-energy', img: 'mission-energy.svg', alt: 'Trois canettes stylisées entourées d’éclairs dorés',
      short: 'Boissons énergisantes, sessions à rallonge et ambiance gaming survoltée.',
      long: 'Le carburant officieux des survivants : des packs de canettes, des sessions qui s’étirent et une ambiance de salle d’arcade. À consommer avec modération — la Norminette ne valide pas les palpitations.',
      loot: ['Packs à partager', 'Sessions code + jeux', 'Rappel : l’eau hydrate aussi'] },
    { num: '02', title: 'Horror night', theme: 't-horror', img: 'mission-horror.svg', alt: 'Écran de cinéma sous une lune violette, silhouettes de spectateurs',
      short: 'Une soirée film d’horreur après une session de code.',
      long: 'On éteint les terminaux… sauf un. Film d’horreur sous la lune violette de la jungle. Le vrai jump scare reste un segfault à 23 h 59.',
      loot: ['Film choisi ensemble', 'Plaids et pop-corn', 'Interdiction de spoiler'] },
    { num: '03', title: 'LAN party', theme: 't-lan', img: 'mission-lan.svg', alt: 'Trois écrans reliés par des câbles en forme de lianes',
      short: 'Jeux multijoueur, rivalité amicale et setups qui clignotent.',
      long: 'Machines branchées, câbles qui poussent comme des lianes et rivalité amicale. Les jeux et le format seront choisis par l’équipage.',
      loot: ['Jeux multijoueur', 'Tournois amicaux', 'Revanches illimitées'] },
    { num: '04', title: 'Full tryhard', theme: 't-tryhard', img: 'mission-tryhard.svg', alt: 'Terminal orange affichant norminette OK et make re',
      short: 'Le vrai début du tronc commun de 42.',
      long: 'Terminal ouvert, Norminette aux aguets, premières briques de libft. On code, on se relit, on recommence — jusqu’à ce que ce soit propre.',
      loot: ['Sessions de code en groupe', 'Relectures croisées', 'Objectif : rendre propre'] },
    { num: '05', title: 'Survive together', theme: 't-together', img: 'mission-together.svg', alt: 'Postes de développeurs reliés sous la canopée',
      short: 'Entraide, collaboration et défis partagés.',
      long: 'Personne ne reste seul dans la jungle : entraide, peer-learning et défis de programmation. Un bug chez l’un, c’est une chasse pour tous.',
      loot: ['Entraide entre survivants', 'Défis de programmation', 'Victoires partagées'] }
  ];

  /* ---------- terminal ---------- */
  var TERM_CMDS = ['help', 'crew', 'countdown', 'missions', 'whoami', 'piscine', 'norminette', 'segfault', 'tiger', 'clear', 'exit'];
  var HELP = 'Commandes disponibles :\n  help        cette aide\n  crew        l’équipage de la savane\n  countdown   temps avant les 24 heures\n  missions    les missions prévues\n  whoami      qui es-tu, vraiment ?\n  piscine     hommage à la Piscine d’août 2026\n  norminette  passer le site à la Norminette\n  segfault    à tes risques et périls\n  tiger       réveiller le tigre\n  clear       nettoyer le terminal\n  exit        fermer le terminal';
  var WHOAMI = ['visiteur@savane — rang : survivant en devenir. Café : critique. Sommeil : NULL.', 'Un processus orphelin adopté par la meute. Bienvenue dans la jungle.', 'uid=42(stud) gid=42(savane) groupes=42(tronc-commun)'];
  var PISCINE_ART = '+--------------------------------------+\n|  PISCINE 42 ANGOULÊME — AOÛT 2026    |\n|  statut ........... VALIDÉE ✓        |\n|  debug ............ beaucoup         |\n|  abandon .......... jamais           |\n+--------------------------------------+\nRespect à toutes celles et ceux qui ont plongé.\nBadge caché débloqué : PISCINE COMPLETED.';

  /* =====================================================================
     utilitaires
     ===================================================================== */
  function tzOffset(tz, ts) {
    try {
      var parts = new Intl.DateTimeFormat('en-US', { timeZone: tz, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).formatToParts(new Date(ts));
      var g = function (t) { var p = parts.find(function (x) { return x.type === t; }); return Number(p ? p.value : 0); };
      return Date.UTC(g('year'), g('month') - 1, g('day'), g('hour'), g('minute'), g('second')) - ts;
    } catch (e) { return 2 * 3600e3; }
  }
  function zoned(c) {
    var guess = Date.UTC(c.year, c.month - 1, c.day, c.hour, c.minute, 0);
    var t = guess - tzOffset(c.tz, guess);
    var off2 = tzOffset(c.tz, t);
    if (guess - off2 !== t) t = guess - off2;
    return t;
  }
  var TARGET = zoned(SITE); /* mercredi 21/10/2026 00:00 à Paris = 20/10/2026 22:00 UTC */
  var DAY = 86400000;
  function shuffle(a) { var r = a.slice(); for (var i = r.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = r[i]; r[i] = r[j]; r[j] = t; } return r; }
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  function p2(n) { return String(n).padStart(2, '0'); }
  function split(ms) { var s = Math.floor(Math.abs(ms) / 1000); return { d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60 }; }
  function esc(t) { return String(t).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function lsGet(k) { try { return window.localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { window.localStorage.setItem(k, v); } catch (e) {} }
  function show(name, on) { var el = $('[data-if="' + name + '"]'); if (el) el.hidden = !on; }
  var timers = [];
  function later(fn, ms) { var t = setTimeout(fn, ms); timers.push(t); return t; }

  var root = $('#sv');
  var reduced = false;
  try { reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}

  /* aperçu caché pour tester : ?apercu=zero (passage à zéro) ou ?apercu=apres */
  var preview = (location.search.match(/apercu=(zero|apres)/) || [])[1] || '';
  var t0 = Date.now();
  function nowEff() {
    var el = Date.now() - t0;
    if (preview === 'zero') return TARGET - 8000 + el;
    if (preview === 'apres') return TARGET + ((2 * 24 + 5) * 3600 + 12 * 60) * 1000 + el;
    return Date.now();
  }

  /* =====================================================================
     intro cinématique
     ===================================================================== */
  var intro = $('#intro');
  var stage = reduced ? 'reduced' : 'term';
  var ORDER = ['term', 'walls', 'open', 'tiger'];
  function renderIntro() {
    var cls = '';
    if (stage === 'reduced') cls = 'st-walls st-open st-tiger st-reduced';
    else if (stage === 'out') cls = 'st-walls st-open st-tiger st-out';
    else { var i = ORDER.indexOf(stage); cls = ORDER.slice(1, i + 1).map(function (s) { return 'st-' + s; }).join(' '); }
    var on = stage !== 'off';
    intro.className = 'intro ' + cls;
    show('introOn', on);
    show('introTiger', ['tiger', 'out', 'reduced'].indexOf(stage) !== -1);
    root.classList.toggle('locked', on && stage !== 'out');
  }
  function setStage(s) { if (ORDER.indexOf(stage) === -1) return; stage = s; renderIntro(); }
  function enter() {
    if (stage === 'out' || stage === 'off') return;
    stage = 'out'; renderIntro();
    later(function () { stage = 'off'; renderIntro(); try { window.scrollTo(0, 0); } catch (e) {} }, 950);
  }
  renderIntro();
  if (stage === 'term') {
    later(function () { setStage('walls'); }, 5000);
    later(function () { setStage('open'); }, 6400);
    later(function () { setStage('tiger'); focusEnter(3200); }, 7300);
  } else {
    focusEnter(300);
  }
  function focusEnter(ms) { later(function () { var b = $('.in-cta button'); if (b) { try { b.focus({ preventScroll: true }); } catch (e) {} } }, ms); }

  /* =====================================================================
     compte à rebours
     ===================================================================== */
  var cdEls = { d: $('#cdu-d'), h: $('#cdu-h'), m: $('#cdu-m'), s: $('#cdu-s') };
  var lastEff = nowEff();
  var lastAria = '';
  function setDigits(el, n) {
    var str = String(n).padStart(2, '0');
    while (el.children.length < str.length) { var sp = document.createElement('span'); sp.className = 'dg'; el.appendChild(sp); }
    while (el.children.length > str.length) el.removeChild(el.lastChild);
    for (var i = 0; i < str.length; i++) {
      var c = el.children[i], v = str[i];
      if (c.textContent !== v) { c.textContent = v; c.className = 'dg r' + v; }
    }
  }
  function renderCountdown() {
    var now = nowEff(), diff = TARGET - now, after = diff <= 0, t = split(diff);
    setDigits(cdEls.d, t.d); setDigits(cdEls.h, t.h); setDigits(cdEls.m, t.m); setDigits(cdEls.s, t.s);
    $('#hud').textContent = after ? 'J+' + t.d + ' · TRONC COMMUN' : 'T-' + p2(t.d) + 'J ' + p2(t.h) + ':' + p2(t.m) + ':' + p2(t.s);
    $('#cd-h').textContent = after ? 'Les 24 heures ont commencé il y a…' : 'Le compte à rebours avant le grand saut';
    $('#cd-quote').textContent = after ? '« La savane est ouverte. Bienvenue au tronc commun ! »' : '« Chaque seconde nous rapproche du tronc commun. »';
    $('#cd-foot').textContent = after ? 'Statut : savane ouverte' : 'Statut : en approche';
    var aria = after ? 'Les 24 heures ont commencé il y a ' + t.d + ' jours et ' + t.h + ' heures.' : 'Il reste ' + t.d + ' jours, ' + t.h + ' heures et ' + t.m + ' minutes avant les 24 heures.';
    if (aria !== lastAria) { lastAria = aria; $('#cd-slab').setAttribute('aria-label', aria); }
  }
  function celebrate(force) {
    if (!force) { if (lsGet('savane-celebrated') === '1') return; lsSet('savane-celebrated', '1'); }
    show('celebrating', true);
    later(function () { show('celebrating', false); }, 9000);
  }
  function cdText() {
    var diff = TARGET - nowEff(), t = split(diff);
    if (diff > 0) return '24H EN SAVANE dans ' + t.d + ' j ' + p2(t.h) + ' h ' + p2(t.m) + ' min ' + p2(t.s) + ' s\n(repère : mercredi 21/10/2026 00:00, heure de Paris)';
    return 'Les 24 heures ont commencé il y a ' + t.d + ' j ' + p2(t.h) + ' h ' + p2(t.m) + ' min. Bienvenue dans la savane !';
  }
  renderCountdown();
  if (!preview && lastEff >= TARGET && lastEff - TARGET < DAY) celebrate(false);
  setInterval(function () {
    var now = nowEff();
    if (lastEff < TARGET && now >= TARGET) celebrate(!!preview);
    lastEff = now;
    renderCountdown();
  }, 1000);

  /* =====================================================================
     équipage
     ===================================================================== */
  var assign = null;
  function makeAssign() { var T = shuffle(TITLES), S = shuffle(STATS), D = shuffle(DESCS); return CREW.map(function (c, i) { return { title: T[i % T.length], stat: S[i % S.length], desc: D[i % D.length] }; }); }
  function renderCrew() {
    var h = CREW.map(function (c, i) {
      var a = assign[i];
      return '<li class="crew-li"><button class="card" type="button" data-i="' + i + '" aria-label="Ouvrir la fiche de ' + esc(c.name) + '">' +
        '<span class="c-glow" aria-hidden="true"></span>' +
        '<span class="c-leaf c-leaf-l" aria-hidden="true"><img src="monstera.svg" alt=""></span>' +
        '<span class="c-leaf c-leaf-r" aria-hidden="true"><img src="banana.svg" alt=""></span>' +
        '<span class="c-av"><img src="' + esc(c.photo || c.avatar) + '" alt=""></span>' +
        '<span class="c-totem">Totem : ' + esc(c.totem) + '</span>' +
        '<span class="c-name"><span class="c-name-in">' + esc(c.name) + '</span></span>' +
        '<span class="c-title">« ' + esc(a.title) + ' »</span>' +
        '<span class="c-desc">' + esc(a.desc) + '</span>' +
        '<span class="c-stat"><span>' + esc(a.stat[0]) + '</span><b>' + esc(a.stat[1]) + '</b></span>' +
        '</button></li>';
    }).join('');
    h += '<li class="crew-li"><button class="card card-x" type="button" data-i="' + CREW.length + '" aria-label="Carte mystère : prochain survivant ?">' +
      '<span class="c-glow" aria-hidden="true"></span><span class="c-tag" aria-hidden="true">SLOT LIBRE</span>' +
      '<span class="qm" aria-hidden="true">?</span><span class="x-t">Prochain survivant&nbsp;?</span>' +
      '<span class="x-s">0x2A · EN ATTENTE DE RECRUE</span></button></li>';
    var grid = $('#crew-grid');
    grid.innerHTML = h;
    $$('.card', grid).forEach(function (el) {
      el.addEventListener('mousemove', tilt);
      el.addEventListener('mouseleave', untilt);
      el.addEventListener('click', function () { openCard(Number(el.getAttribute('data-i'))); });
    });
  }
  function tilt(e) {
    if (reduced) return;
    var el = e.currentTarget, r = el.getBoundingClientRect();
    var x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty('--rx', (x * 14).toFixed(2) + 'deg'); el.style.setProperty('--ry', (-y * 14).toFixed(2) + 'deg');
    el.style.setProperty('--gx', ((x + 0.5) * 100).toFixed(1) + '%'); el.style.setProperty('--gy', ((y + 0.5) * 100).toFixed(1) + '%');
  }
  function untilt(e) { e.currentTarget.style.setProperty('--rx', '0deg'); e.currentTarget.style.setProperty('--ry', '0deg'); }
  assign = makeAssign();
  renderCrew();
  $('#panel-names').innerHTML = CREW.map(function (c) { return '<li>' + esc(c.name) + '</li>'; }).join('') + '<li>???</li>';

  /* fiche (modale) */
  var lastFocus = null;
  var modal = $('#modal');
  function openCard(i) {
    lastFocus = document.activeElement;
    var real = i < CREW.length;
    if (real) {
      var c = CREW[i], a = assign[i];
      var av = $('#m-av'); av.src = c.photo || c.avatar; av.alt = c.photo ? 'Photo de ' + c.name : 'Avatar illustré : ' + c.totem.toLowerCase();
      $('#m-totem').textContent = c.totem; $('#m-name').textContent = c.name; $('#m-title').textContent = a.title;
      $('#m-desc').textContent = a.desc; $('#m-sl').textContent = a.stat[0]; $('#m-sv').textContent = a.stat[1];
    }
    show('sel.real', real); show('sel.mystery', !real);
    modal.setAttribute('aria-labelledby', real ? 'm-name' : 'm-name-x');
    show('modalOpen', true);
    setTimeout(function () { var b = $('.m-x'); if (b) b.focus(); }, 40);
  }
  function closeModal() { show('modalOpen', false); var f = lastFocus; setTimeout(function () { if (f && f.focus) f.focus(); }, 30); }
  modal.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { e.preventDefault(); closeModal(); return; }
    if (e.key === 'Tab') {
      var f = $$('button, a[href], input', modal).filter(function (x) { return x.offsetParent !== null; }); if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* =====================================================================
     missions
     ===================================================================== */
  $('#ms-list').innerHTML = MISSIONS.map(function (m, i) {
    return '<li class="ms-item ' + (i % 2 ? 'right' : 'left') + ' ' + m.theme + '">' +
      '<div class="ms-node" aria-hidden="true">' + m.num + '</div>' +
      '<article class="ms-card" aria-labelledby="ms-t-' + m.num + '">' +
      '<div class="ms-art"><img src="' + m.img + '" alt="' + esc(m.alt) + '"></div>' +
      '<div class="ms-body">' +
      '<p class="ms-k"><span class="glitch" data-text="MISSION ' + m.num + '">MISSION ' + m.num + '</span></p>' +
      '<h3 id="ms-t-' + m.num + '" class="ms-t">' + esc(m.title) + '</h3>' +
      '<p class="ms-d">' + esc(m.short) + '</p>' +
      '<div class="ms-tags"><span class="tag tag-up"><i aria-hidden="true"></i>À venir</span></div>' +
      '<button class="ms-btn" type="button" data-m="' + i + '" aria-expanded="false" aria-controls="ms-more-' + m.num + '">Détails de la mission +</button>' +
      '<div class="ms-more" id="ms-more-' + m.num + '" hidden><p>' + esc(m.long) + '</p><ul class="ms-loot">' +
      m.loot.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul></div>' +
      '</div></article></li>';
  }).join('');
  $$('.ms-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') !== 'true';
      $$('.ms-btn').forEach(function (b) {
        var on = b === btn && open;
        b.setAttribute('aria-expanded', on ? 'true' : 'false');
        b.textContent = on ? 'Replier la mission −' : 'Détails de la mission +';
        $('#' + b.getAttribute('aria-controls')).hidden = !on;
      });
    });
  });

  /* =====================================================================
     effets : tigre, toast, segfault, badge
     ===================================================================== */
  var toastT = null, roaring = false, tigerHits = 0;
  function showToast(text) {
    clearTimeout(toastT);
    $('#toast').textContent = text; show('toastOn', false);
    requestAnimationFrame(function () { show('toastOn', true); });
    toastT = setTimeout(function () { show('toastOn', false); }, 4200);
  }
  function roarNow() {
    if (roaring) return;
    roaring = true; root.classList.add('roaring'); show('roaring', true);
    later(function () { roaring = false; root.classList.remove('roaring'); show('roaring', false); }, 1400);
  }
  function unlockBadge() { show('badge', true); }
  function segfault() {
    root.classList.add('crashing'); show('crash', true);
    later(function () { root.classList.remove('crashing'); show('crash', false); }, 2400);
  }
  function pokeTiger() {
    tigerHits += 1; roarNow();
    if (tigerHits >= 5) { tigerHits = 0; unlockBadge(); showToast('Message caché : tu as réveillé le tigre. Le tronc commun n’a qu’à bien se tenir.'); }
  }

  /* parallaxe souris du hero + boutons magnétiques */
  var hero = $('#accueil');
  hero.addEventListener('mousemove', function (e) {
    var r = hero.getBoundingClientRect();
    hero.style.setProperty('--mx', (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
    hero.style.setProperty('--my', (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
  });
  hero.addEventListener('mouseleave', function () { hero.style.setProperty('--mx', '0'); hero.style.setProperty('--my', '0'); });
  $$('.btn').forEach(function (el) {
    el.addEventListener('mousemove', function (e) {
      var r = el.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
      el.style.setProperty('--x', x.toFixed(0) + 'px'); el.style.setProperty('--y', y.toFixed(0) + 'px');
      if (!reduced) { el.style.setProperty('--tx', ((x / r.width - 0.5) * 10).toFixed(1) + 'px'); el.style.setProperty('--ty', ((y / r.height - 0.5) * 8).toFixed(1) + 'px'); }
    });
    el.addEventListener('mouseleave', function () { el.style.setProperty('--tx', '0px'); el.style.setProperty('--ty', '0px'); });
  });

  /* code Konami */
  var KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  var keys = [];
  document.addEventListener('keydown', function (e) {
    var tag = (e.target && e.target.tagName) || '';
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;
    keys.push(e.key && e.key.length === 1 ? e.key.toLowerCase() : e.key); keys = keys.slice(-10);
    if (keys.join() === KONAMI.join()) { keys = []; unlockBadge(); roarNow(); showToast('Code Konami accepté — le tigre te reconnaît comme l’un des siens.'); }
  });

  /* =====================================================================
     menu mobile
     ===================================================================== */
  var menuBtn = $('.menu-btn');
  function setMenu(on) {
    show('menu', on); menuBtn.setAttribute('aria-expanded', on ? 'true' : 'false');
    if (on) setTimeout(function () { var b = $('.mm-x'); if (b) b.focus(); }, 50);
  }
  $('#mmenu').addEventListener('keydown', function (e) { if (e.key === 'Escape') { setMenu(false); menuBtn.focus(); } });

  /* =====================================================================
     terminal 42 (commandes prédéfinies uniquement, rien n'est exécuté)
     ===================================================================== */
  var tw = $('#terminal-42'), log = $('#tw-log'), body = $('.tw-body'), input = $('#tw-input'), fab = $('.term-fab');
  var hist = [], hIdx = 0, termOpen = false;
  function addLines(lines) {
    lines.forEach(function (l) { var p = document.createElement('p'); p.className = 'tw-l ' + l[0]; p.textContent = l[1]; log.appendChild(p); });
    while (log.children.length > 160) log.removeChild(log.firstChild);
    body.scrollTop = body.scrollHeight;
  }
  addLines([['sys', 'SAVANE OS v42 — terminal de l’expédition'], ['sys', 'Tape « help » pour voir les commandes. Échap pour fermer.']]);
  function openTerm() { termOpen = true; show('term', true); fab.setAttribute('aria-expanded', 'true'); setTimeout(function () { input.focus(); body.scrollTop = body.scrollHeight; }, 50); }
  function closeTerm() { termOpen = false; show('term', false); fab.setAttribute('aria-expanded', 'false'); setTimeout(function () { fab.focus(); }, 30); }
  tw.addEventListener('keydown', function (e) { if (e.key === 'Escape') { e.stopPropagation(); closeTerm(); } });
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') { e.preventDefault(); var v = input.value; input.value = ''; runCmd(v); hIdx = hist.length; }
    else if (e.key === 'ArrowUp') { if (!hist.length) return; e.preventDefault(); hIdx = Math.max(0, hIdx - 1); input.value = hist[hIdx] || ''; }
    else if (e.key === 'ArrowDown') { if (!hist.length) return; e.preventDefault(); hIdx = Math.min(hist.length, hIdx + 1); input.value = hist[hIdx] || ''; }
    else if (e.key === 'Tab' && input.value.trim()) { var v2 = input.value.trim().toLowerCase(); var m = TERM_CMDS.filter(function (c) { return c.indexOf(v2) === 0; }); if (m.length === 1) { e.preventDefault(); input.value = m[0]; } }
    else if (e.ctrlKey && (e.key === 'l' || e.key === 'L')) { e.preventDefault(); log.innerHTML = ''; }
  });
  function runCmd(raw) {
    var inp = String(raw || '').slice(0, 200), cmd = inp.trim();
    var out = [['cmd', 'savane@42:~$ ' + inp]];
    if (cmd) { hist.push(cmd); if (hist.length > 50) hist.shift(); }
    var parts = cmd.split(/\s+/), c = (parts[0] || '').toLowerCase(), args = parts.slice(1), close = false;
    switch (c) {
      case '': break;
      case 'help': out.push(['ok', HELP]); break;
      case 'crew': out.push(['ok', 'L’équipage — ' + CREW.length + ' survivants + 1 place mystère :\n  ' + CREW.map(function (m) { return m.name; }).concat(['???']).join(' · ')]); break;
      case 'countdown': out.push(['ok', cdText()]); break;
      case 'missions': out.push(['ok', MISSIONS.map(function (m) { return m.num + '  ' + m.title.toUpperCase(); }).join('\n')]); break;
      case 'whoami': out.push(['ok', pick(WHOAMI)]); break;
      case 'piscine': out.push(['big', PISCINE_ART]); unlockBadge(); break;
      case 'norminette':
        out.push(['sys', '$ norminette savane.c'], ['err', 'savane.c: Error!\nError: TOO_MANY_TIGERS   (line:  42, col:   1):  Trop de tigres dans une seule fonction\nError: SLEEP_NOT_FOUND   (line:  24, col:   7):  Variable « sommeil » jamais utilisée'], ['ok', '… bon, on refactorise.\nsavane.c: OK!']);
        break;
      case 'segfault': out.push(['err', 'Segmentation fault (core dumped)'], ['sys', 'Le tigre a redémarré la jungle. Pense à free() tes rêves.']); segfault(); break;
      case 'tiger': out.push(['big', 'RAWRRR !']); roarNow(); break;
      case 'clear': log.innerHTML = ''; return;
      case 'exit': out.push(['sys', 'logout — à bientôt dans la savane.']); close = true; break;
      case 'sudo': out.push(['err', '[sudo] mot de passe pour stud : ********\nBien essayé. Ici, même root demande la permission au tigre.']); break;
      case 'ls': out.push(['ok', 'equipage/  missions/  libft/  piscine_aout_2026.log  secret_du_tigre.txt']); break;
      case 'cat': out.push(args[0] && args[0].indexOf('secret') === 0 ? ['big', 'Le secret du tigre : ↑ ↑ ↓ ↓ ← → ← → B A'] : ['err', 'cat : précise un fichier (ex. : cat secret_du_tigre.txt)']); break;
      case 'make': out.push(['err', 'make: *** Aucune règle pour fabriquer « sommeil ». Arrêt.']); break;
      case 'rm': out.push(['err', 'rm : opération refusée — le tigre protège la jungle.']); break;
      case '42': out.push(['ok', 'La réponse. Reste à trouver la question.']); break;
      case 'date': out.push(['ok', new Date().toLocaleString('fr-FR', { timeZone: SITE.tz, dateStyle: 'full', timeStyle: 'medium' }) + ' (heure de Paris)']); break;
      case 'echo': out.push(['ok', args.join(' ')]); break;
      case 'vim': case 'emacs': case 'nano': out.push(['sys', 'Tu ne sortiras jamais de ' + c + '. Le tigre non plus.']); break;
      default: out.push(['err', parts[0] + ' : commande introuvable. Tape « help ».']);
    }
    addLines(out);
    if (close) later(closeTerm, 300);
  }

  /* =====================================================================
     actions des boutons (data-act)
     ===================================================================== */
  var ACTIONS = {
    enter: enter,
    toggleMenu: function () { setMenu($('[data-if="menu"]').hidden); },
    closeMenu: function () { setMenu(false); },
    pokeTiger: pokeTiger,
    reroll: function () { assign = makeAssign(); renderCrew(); },
    toggleTerm: function () { if (termOpen) closeTerm(); else openTerm(); },
    closeTerm: closeTerm,
    closeModal: closeModal,
    closeCelebrate: function () { show('celebrating', false); }
  };
  document.addEventListener('click', function (e) {
    var t = e.target.closest ? e.target.closest('[data-act]') : null;
    if (!t) return;
    var fn = ACTIONS[t.getAttribute('data-act')];
    if (fn) fn(e);
  });
})();
