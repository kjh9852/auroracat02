(() => {
  const ufo = document.querySelector('.ufo');
  const rocket = document.querySelector('.rocket');
  const rocketView = document.querySelector('.rocket_view');
  const firstScene = document.querySelector('.first_scene');
  const cursor = document.querySelector('.cursor');
  const saturns = document.querySelector('.planet-stroy02 .saturns > a');
  const saturnsView = document.querySelector('.item_preview .saturns');
  const blue = document.querySelector('.planet-stroy02 .blue > a');
  const blueView = document.querySelector('.item_preview .blue');
  const preViewWrap = document.querySelector('.item_preview');
  const close = document.querySelectorAll('.close');
  const planetCat = document.querySelector('.planet_cat');
  const start = document.querySelector('.start_bgm');
  const mSaturnsPreview = document.querySelector('.planet-stroy02 > .saturns > .mobile_view');
  const mSaturnsClose = document.querySelector('.planet-stroy02 > .saturns > .mobile_view .close');
  const mBluePreview = document.querySelector('.planet-stroy02 > .blue > .mobile_view');
  const mBlueClose = document.querySelector('.planet-stroy02 > .blue > .mobile_view .close');
  const gallery = document.querySelector(".gallery_planet > a");
  const galleryView = document.querySelector(".gallery_view");
  const galleryClose = document.querySelector('.gallery_view .close');

  var mobile = (/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera);

  ufo.addEventListener('click', () => {
    ufo.classList.add('blur');
      console.log('click');
      setTimeout(() => {
        ufo.classList.add('blurout');
        ufo.classList.remove('blur');
      }, 3000);
      if (ufo.classList.contains('blurout')) {
        ufo.classList.remove('blurout');
      }
  })
  
  // rocket.addEventListener('click', () => {
  //     rocket.classList.add('rocket_on');
  //     rocketView.classList.add('active');
  // });

  $(document).ready(function () {
    var menuMotion = true;
    $(".planet-stroy02 > div").hover(function () {
      $(this).find(".view").slideDown(300, function () {
        menuMotion = true;
      });
    },
      function () {
        menuMotion = false;
        $(this).find(".view").slideUp(300, function () {
        });
      }
    );
    $(".planet-stroy > div").hover(function (e) {
      e.preventDefault();
      $(this).find(".view").slideDown(300, function () {
        menuMotion = true;
      });
    },
      function () {
        menuMotion = false;
        $(this).find(".view").slideUp(300, function () {
        });
      }
    );
  });

  $(".planet_cat").on('click',() => {
    let mode = false
    if($(this).parent.hasClass = 'active'){
      mode = true;
      $('.text_box').slideDown();
    }else {
      $('.text_box').slideUp();
    }
  });

  function preview(index, indexView, viewWrap, close) {
    if(!mobile) {
      index.addEventListener('click', (e) => {
        e.preventDefault();
        indexView.classList.add('active');
        viewWrap.classList.add('active');
      });
      for (let i = 0; i < close.length; i++) {
        close[i].addEventListener('click', (e) => {
          e.preventDefault();
          indexView.classList.remove('active');
          viewWrap.classList.remove('active');
        });
      }
    }
  }

  function mainScroll() {
    $('.start_bgm').stop().on("touchstart click", function (e) {
      var chk = $('.first_scene').attr("data-stop");
      if (chk == "0") {
        $('.first_scene').attr("data-stop", "1");
        $('body').addClass('on');
        setTimeout(function () {
          scrollStart()
        }, 500);
      }
    });
    function scrollStart() {
      setTimeout(function () {
        $('html').addClass('scroll');
      }, 2000);
      if (!mobile) {
        $("html").niceScroll({
          horizrailenabled: false,
          scrollspeed: 70,
          mousescrollstep: 100,
        });
      }
    }
  }

  start.addEventListener('click',() => {
    $('body').addClass('start');
  });

  // $(document).ready(function(){
  //   gsap.to($(this).find(".title img"), 0.8, { scale: 1, y: 0, stagger: { from: "start", each: 0.08 }, opacity: 1, ease: Power4.out });
  // });

  window.addEventListener("mousemove", trackMovement);

  function trackMovement(e) {
    cursor.style.left = e.pageX + "px";
    cursor.style.top = e.pageY + "px";
  }

  function galleryOpen() {
    gallery.addEventListener('click', (e) => {
      e.preventDefault();
      galleryView.classList.add('on');
    });
    galleryClose.addEventListener('click', (e) => {
      e.preventDefault();
      galleryView.classList.remove('on');
    });
  }

  if(mobile) {
    saturns.addEventListener('click', (e) => {
      e.preventDefault();
      mSaturnsPreview.classList.add('on');
    });
    mSaturnsClose.addEventListener('click', (e) => {
      e.preventDefault();
      mSaturnsPreview.classList.remove('on');
    });
    blue.addEventListener('click', (e) => {
      e.preventDefault();
      mBluePreview.classList.add('on');
    });
    mBlueClose.addEventListener('click', (e) => {
      e.preventDefault();
      mBluePreview.classList.remove('on');
    });
  } 
  window.addEventListener('load', () => {
    mainScroll();
    preview(saturns, saturnsView, preViewWrap, close);
    preview(blue, blueView, preViewWrap, close);
    galleryOpen();
  });

})();