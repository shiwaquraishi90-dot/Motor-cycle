
(function(){
  'use strict';

  /* ============================================================
     1) REVEAL ON SCROLL
     ============================================================ */
  try {
    var revealEls = document.querySelectorAll('.reveal');
    var supportsIO = ('IntersectionObserver' in window);

    if (supportsIO && revealEls.length){
      document.body.classList.add('js-ready');

      var io = new IntersectionObserver(function(entries){
        entries.forEach(function(e){
          if(e.isIntersecting){
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      }, {threshold: 0.05, rootMargin: '0px 0px -40px 0px'});
 revealEls.forEach(function(el){ io.observe(el); });

      // Safety net — force-show anything in viewport after 1.5s
      setTimeout(function(){
        document.querySelectorAll('.reveal:not(.in)').forEach(function(el){
          var rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight + 100) el.classList.add('in');
        });
      }, 1500);
    } else {
      revealEls.forEach(function(el){ el.classList.add('in'); });
    }
  } catch(err){ console.warn('reveal failed', err); }

  /* ============================================================
     2) THEME TOGGLE
     ============================================================ */
  try {
    var themeToggle = document.getElementById('themeToggle');
    var savedTheme = null;
    try { savedTheme = localStorage.getItem('ridex-theme'); } catch(e){}

    if(savedTheme === 'light'){
      document.body.setAttribute('data-theme','light');
      if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    if (themeToggle){
      themeToggle.addEventListener('click', function(){
        var isLight = document.body.getAttribute('data-theme') === 'light';
        var next = isLight ? 'dark' : 'light';
        document.body.setAttribute('data-theme', next);
        this.innerHTML = (next === 'light')
          ? '<i class="fas fa-sun"></i>'
          : '<i class="fas fa-moon"></i>';
        try { localStorage.setItem('ridex-theme', next); } catch(e){}
      });
    }
  } catch(err){ console.warn('theme toggle skipped', err); }

  /* ============================================================
     3) SCROLL PROGRESS + NAVBAR + BACK TOP
     ============================================================ */
  try {
    var progress = document.getElementById('scrollProgress');
    var navbar   = document.getElementById('navbar');
    var backTop  = document.getElementById('backTop');

    var onScroll = function(){
      var h = document.documentElement;
      var scrolled = h.scrollTop;
      var height = h.scrollHeight - h.clientHeight || 1;
      if (progress) progress.style.width = (scrolled / height * 100) + '%';
      if (navbar) navbar.classList.toggle('scrolled', scrolled > 30);
      if (backTop) backTop.classList.toggle('show', scrolled > 400);
    };
    window.addEventListener('scroll', onScroll, {passive:true});
    onScroll();

    if (backTop){
      backTop.addEventListener('click', function(){
        window.scrollTo({top:0, behavior:'smooth'});
      });
    }
  } catch(err){ console.warn('scroll fx skipped', err); }

  /* ============================================================
     4) FILTERS
     ============================================================ */
  try {
    var filterBtns = document.querySelectorAll('.filter-btn');
    Array.prototype.forEach.call(filterBtns, function(btn){
      btn.addEventListener('click', function(){
        Array.prototype.forEach.call(filterBtns, function(b){ b.classList.remove('active'); });
        this.classList.add('active');
        var f = this.dataset.filter;
        var cards = document.querySelectorAll('#postsGrid [data-cat]');
        Array.prototype.forEach.call(cards, function(card, i){
          var show = (f === 'all' || card.dataset.cat === f);
          if(show){
            card.style.display = '';
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(function(){
              card.style.transition = 'opacity .5s cubic-bezier(.22,1,.36,1), transform .5s cubic-bezier(.22,1,.36,1)';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, i * 60);
          } else {
            card.style.transition = 'opacity .3s, transform .3s';
            card.style.opacity = '0';
            card.style.transform = 'scale(.95)';
            setTimeout(function(){ card.style.display = 'none'; }, 300);
          }
        });
      });
    });
  } catch(err){ console.warn('filters skipped', err); }
 /* ============================================================
     5) LIVE SEARCH
     ============================================================ */
  try {
    var searchInput = document.getElementById('searchInput');
    if (searchInput){
      searchInput.addEventListener('input', function(e){
        var q = e.target.value.trim().toLowerCase();
        var cards = document.querySelectorAll('#postsGrid [data-cat]');
        Array.prototype.forEach.call(cards, function(card){
          var text = card.innerText.toLowerCase();
          card.style.display = (!q || text.indexOf(q) !== -1) ? '' : 'none';
        });
      });
    }
  } catch(err){ console.warn('search skipped', err); }

  /* ============================================================
     6) SORT
     ============================================================ */
  try {
    var sortSelect = document.getElementById('sortSelect');
    if (sortSelect){
      sortSelect.addEventListener('change', function(){
        var val = sortSelect.value;
        var grid = document.getElementById('postsGrid');
        var cards = Array.prototype.slice.call(grid.querySelectorAll('[data-cat]'));
        cards.sort(function(a,b){
          if(val === 'newest')  return b.dataset.date  - a.dataset.date;
          if(val === 'oldest')  return a.dataset.date  - b.dataset.date;
          if(val === 'popular') return b.dataset.views - a.dataset.views;
          return 0;
        });
        cards.forEach(function(c){ grid.appendChild(c); });
      });
    }
  } catch(err){ console.warn('sort skipped', err); }

  /* ============================================================
     7) PAGINATION DEMO
     ============================================================ */
  try {
    Array.prototype.forEach.call(document.querySelectorAll('.page-btn'), function(btn){
      btn.addEventListener('click', function(){
        var t = this.innerText.trim();
        if(!t || t === '…') return;
        Array.prototype.forEach.call(document.querySelectorAll('.page-btn'), function(b){ b.classList.remove('active'); });
        this.classList.add('active');
        var tb = document.querySelector('.toolbar');
        if (tb) window.scrollTo({top: tb.offsetTop - 100, behavior:'smooth'});
      });
    });
  } catch(err){ console.warn('pagination skipped', err); }

  /* ============================================================
     8) NEWSLETTER FORM DEMO
     ============================================================ */
  try {
    var nlForm = document.getElementById('nlForm');
    if (nlForm){
      nlForm.addEventListener('submit', function(e){
        e.preventDefault();
        var btn = this.querySelector('button');
        var original = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Subscribed';
        this.reset();
        setTimeout(function(){ btn.innerHTML = original; }, 2500);
      });
    }
  } catch(err){ console.warn('newsletter skipped', err); }

})();