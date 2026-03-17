// NAVBAR
var navbar = document.getElementById('navbar');
window.addEventListener('scroll', function(){
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// HAMBURGER
var hamburger = document.getElementById('hamburger');
var navMenu = document.querySelector('.nav-menu');
if(hamburger){
  hamburger.addEventListener('click', function(){
    navMenu.classList.toggle('open');
  });
}
document.querySelectorAll('.nav-item.has-drop .nav-link').forEach(function(link){
  link.addEventListener('click', function(e){
    if(window.innerWidth <= 900){
      e.preventDefault();
      this.closest('.nav-item').classList.toggle('open');
    }
  });
});

// ANIMATIONS
// We add class "ready" first to set opacity:0
// then "show" to animate in. This way content is
// never permanently hidden if JS is slow.
window.addEventListener('load', function(){
  var els = document.querySelectorAll('.anim');
  els.forEach(function(el){
    el.classList.add('ready');
  });
  // Small delay then run first check
  setTimeout(runAnims, 100);
});

function runAnims(){
  var els = document.querySelectorAll('.anim.ready');
  var wh = window.innerHeight;
  els.forEach(function(el){
    var rect = el.getBoundingClientRect();
    var delay = parseFloat(el.getAttribute('data-delay') || 0);
    if(rect.top < wh * 0.92 && rect.bottom > 0){
      setTimeout(function(){ el.classList.add('show'); }, delay * 1000);
    } else {
      el.classList.remove('show');
    }
  });
}
window.addEventListener('scroll', runAnims);

// COUNTER
function animCounters(){
  document.querySelectorAll('.hstat-n[data-count]').forEach(function(el){
    var target = parseInt(el.getAttribute('data-count'));
    var current = 0;
    var step = Math.ceil(target / 40);
    var timer = setInterval(function(){
      current += step;
      if(current >= target){ current = target; clearInterval(timer); }
      el.textContent = current;
    }, 40);
  });
}
var statsBar = document.querySelector('.hero-stats-bar');
if(statsBar){
  var counted = false;
  var obs = new IntersectionObserver(function(entries){
    if(entries[0].isIntersecting && !counted){ counted=true; animCounters(); }
  },{threshold:0.5});
  obs.observe(statsBar);
}

// SERVICES SUBNAV
var subLinks = document.querySelectorAll('.svc-subnav-inner a');
if(subLinks.length > 0){
  var ids = ['civil','hvac','fire','plumbing','electrical','elv','elec-consult','arch-consult'];
  window.addEventListener('scroll', function(){
    var pos = window.scrollY + 180;
    ids.forEach(function(id){
      var sec = document.getElementById(id);
      var lnk = document.querySelector('.svc-subnav-inner a[href="#'+id+'"]');
      if(sec && lnk){
        if(pos >= sec.offsetTop && pos < sec.offsetTop + sec.offsetHeight){
          lnk.classList.add('active');
        } else {
          lnk.classList.remove('active');
        }
      }
    });
  });
}

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(function(link){
  link.addEventListener('click', function(e){
    e.preventDefault();
    var t = document.querySelector(this.getAttribute('href'));
    if(t) t.scrollIntoView({behavior:'smooth'});
  });
});

// CONTACT FORM
var submitBtn = document.getElementById('submit-btn');
if(submitBtn){
  submitBtn.addEventListener('click', function(){
    var btn = this;
    btn.textContent = 'Message Sent';
    btn.style.background = '#1a4a2e';
    btn.style.borderColor = '#1a4a2e';
    setTimeout(function(){ btn.textContent='Send Message'; btn.style.background=''; btn.style.borderColor=''; }, 3000);
  });
}