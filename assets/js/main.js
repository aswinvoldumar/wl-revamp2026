(function ($) {
  'use strict';

  /*
  |--------------------------------------------------------------------------
  | 
  | 
  | 
  |--------------------------------------------------------------------------
  |--------------------------------------------------------------------------
  | TABLE OF CONTENTS:
  |--------------------------------------------------------------------------
  |
  | 1. Preloader
  | 2. Mobile Menu
  | 3. Sticky Header
  | 4. Dynamic Background
  | 5. Slick Slider
  | 6. Modal Video
  | 7. Accordian
  | 8. Light Gallery
  | 9. Hover To Active
  | 10. Isotop
  | 11. Dynamic contact form
  |
  */

  /*--------------------------------------------------------------
    Scripts initialization
  --------------------------------------------------------------*/

  $.exists = function (selector) {
    return $(selector).length > 0;
  };

  $(window).on('load', function () {
    preloader();
    isotopInit();
  });

  $(function () {
    mainNav();
    stickyHeader();
    dynamicBackground();
    slickInit();
    modalVideo();
    accordian();
    lightGallery();
    hoverActive();
    isotopInit();
    serviceShowcase();
    whatsappButton();
    buildCards();
    processSteps();
    if ($.exists('.wow')) {
      new WOW().init();
    }
  });

  $(window).on('scroll', function () {
    stickyHeader();
  });

  /*--------------------------------------------------------------
    1. Preloader
  --------------------------------------------------------------*/
  function preloader() {
    $('.cs_preloader').fadeOut();
    $('cs_preloader_in').delay(150).fadeOut('slow');
  }

  /*--------------------------------------------------------------
    2. Mobile Menu
  --------------------------------------------------------------*/
  function mainNav() {
    $('.cs_nav').append('<span class="cs_menu_toggle"><span></span></span>');
    $('.menu-item-has-children').append(
      '<span class="cs_munu_dropdown_toggle"><span></span></span>',
    );
    $('.cs_menu_toggle').on('click', function () {
      $(this)
        .toggleClass('cs_toggle_active')
        .siblings('.cs_nav_list_wrap')
        .toggleClass('cs_active');
    });
    $('.cs_munu_dropdown_toggle').on('click', function () {
      $(this).toggleClass('active').siblings('ul').slideToggle();
      $(this).parent().toggleClass('active');
    });
    // Search Toggle
    $('.cs_search_tobble_btn').on('click', function () {
      $('.cs_header_form_wrap').toggleClass('active');
    });
    $('.cs_header_form_overlay').on('click', function () {
      $('.cs_header_form_wrap').removeClass('active');
    });
  }

  /*--------------------------------------------------------------
    3. Sticky Header
  --------------------------------------------------------------*/
  function stickyHeader() {
    var scroll = $(window).scrollTop();
    if (scroll >= 10) {
      $('.cs_sticky_header').addClass('cs_sticky_active');
    } else {
      $('.cs_sticky_header').removeClass('cs_sticky_active');
    }
  }

  /*--------------------------------------------------------------
    4. Dynamic Background
  --------------------------------------------------------------*/
  function dynamicBackground() {
    $('[data-src]').each(function () {
      var src = $(this).attr('data-src');
      $(this).css({
        'background-image': 'url(' + src + ')',
      });
    });
  }

  /*--------------------------------------------------------------
    5. Slick Slider
  --------------------------------------------------------------*/
  function slickInit() {
    if ($.exists('.cs_slider')) {
      $('.cs_slider').each(function () {
        // Slick Variable
        var $ts = $(this).find('.cs_slider_container');
        var $slickActive = $(this).find('.cs_slider_wrapper');
        var $status = $(this).find('.cs_slider_number');
        // Auto Play
        var autoPlayVar = parseInt($ts.attr('data-autoplay'), 10);
        // Auto Play Time Out
        var autoplaySpdVar = 3000;
        if (autoPlayVar > 1) {
          autoplaySpdVar = autoPlayVar;
          autoPlayVar = 1;
        }
        // Slide Change Speed
        var speedVar = parseInt($ts.attr('data-speed'), 10);
        // Slider Loop
        var loopVar = Boolean(parseInt($ts.attr('data-loop'), 10));
        // Slider Center
        var centerVar = Boolean(parseInt($ts.attr('data-center'), 10));
        // Variable Width
        var variableWidthVar = Boolean(
          parseInt($ts.attr('data-variable-width'), 10),
        );
        // Pagination
        var paginaiton = $(this)
          .find('.cs_pagination')
          .hasClass('cs_pagination');
        // Slide Per View
        var slidesPerViewAttr = $ts.attr('data-slides-per-view');
        var slidesPerView = slidesPerViewAttr == 1 ? 1 : slidesPerViewAttr;
        var lgPoint;
        var mdPoint;
        var smPoint;
        var xsPoing;
        if (slidesPerViewAttr == 'responsive') {
          slidesPerView = parseInt($ts.attr('data-add-slides'), 10);
          lgPoint = parseInt($ts.attr('data-lg-slides'), 10);
          mdPoint = parseInt($ts.attr('data-md-slides'), 10);
          smPoint = parseInt($ts.attr('data-sm-slides'), 10);
          xsPoing = parseInt($ts.attr('data-xs-slides'), 10);
        }
        // Fade Slider
        var fadeVar = parseInt($($ts).attr('data-fade-slide'));
        fadeVar === 1 ? (fadeVar = true) : (fadeVar = false);
        /* Start Count Slide Number */
        $slickActive.on(
          'init reInit afterChange',
          function (event, slick, currentSlide, nextSlide) {
            var i = (currentSlide ? currentSlide : 0) + 1;
            $status.html(
              `<span class="cs_current_number" data-number="${i}"><span>${i}</span></span> <span class="cs_slider_number_seperator"></span> <span class="cs_total_numbers"  data-number="${slick.slideCount}"><span>${slick.slideCount}</span></span>`,
            );
          },
        );
        /* End Count Slide Number */
        // Slick Active Code
        var slickConfig = {
          autoplay: autoPlayVar,
          dots: paginaiton,
          centerPadding: $ts.attr('data-center-padding') || '28%',
          speed: speedVar,
          infinite: loopVar,
          autoplaySpeed: autoplaySpdVar,
          centerMode: centerVar,
          fade: fadeVar,
          prevArrow: $(this).find('.cs_left_arrow').add($(this).closest('section').find('.cs_work_nav .cs_left_arrow')),
          nextArrow: $(this).find('.cs_right_arrow').add($(this).closest('section').find('.cs_work_nav .cs_right_arrow')),
          appendDots: $(this).find('.cs_pagination'),
          slidesToShow: slidesPerView,
          variableWidth: variableWidthVar,
          swipeToSlide: true,
        };

        var mobileCenterPad = $ts.attr('data-center-padding-mobile');
        if (mobileCenterPad) {
          slickConfig.responsive = [
            {
              breakpoint: 768,
              settings: {
                centerPadding: mobileCenterPad,
                slidesToShow: 1,
              },
            },
          ];
        }

        if (slidesPerViewAttr == 'responsive') {
          slickConfig.responsive = [
            {
              breakpoint: 1600,
              settings: {
                slidesToShow: lgPoint,
              },
            },
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: mdPoint,
              },
            },
            {
              breakpoint: 992,
              settings: {
                slidesToShow: smPoint,
              },
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: xsPoing,
              },
            },
          ];
        }

        $slickActive.slick(slickConfig);
      });
    }
  }

  /*--------------------------------------------------------------
    6. Modal Video
  --------------------------------------------------------------*/
  function modalVideo() {
    if ($.exists('.cs_video_open')) {
      $('body').append(`
        <div class="cs_video_popup">
          <div class="cs_video_popup-overlay"></div>
          <div class="cs_video_popup-content">
            <div class="cs_video_popup-layer"></div>
            <div class="cs_video_popup-container">
              <div class="cs_video_popup-align">
                <div class="embed-responsive embed-responsive-16by9">
                  <iframe class="embed-responsive-item" src="about:blank"></iframe>
                </div>
              </div>
              <div class="cs_video_popup-close"></div>
            </div>
          </div>
        </div>
      `);
      $(document).on('click', '.cs_video_open', function (e) {
        e.preventDefault();
        var video = $(this).attr('href');

        $('.cs_video_popup-container iframe').attr('src', `${video}`);

        $('.cs_video_popup').addClass('active');
      });
      $('.cs_video_popup-close, .cs_video_popup-layer').on(
        'click',
        function (e) {
          $('.cs_video_popup').removeClass('active');
          $('html').removeClass('overflow-hidden');
          $('.cs_video_popup-container iframe').attr('src', 'about:blank');
          e.preventDefault();
        },
      );
    }
  }

  /*--------------------------------------------------------------
    7. Accordian
  --------------------------------------------------------------*/
  function accordian() {
    $('.cs_accordian').children('.cs_accordian_body').hide();
    $('.cs_accordian.active').children('.cs_accordian_body').show();
    $('.cs_accordian_head').on('click', function () {
      $(this)
        .parent('.cs_accordian')
        .siblings()
        .children('.cs_accordian_body')
        .slideUp(250);
      $(this).siblings().slideDown(250);
      $(this)
        .parent()
        .parent()
        .siblings()
        .find('.cs_accordian_body')
        .slideUp(250);
      /* Accordian Active Class */
      $(this).parents('.cs_accordian').addClass('active');
      $(this).parent('.cs_accordian').siblings().removeClass('active');
    });
  }

  /*--------------------------------------------------------------
    8. Light Gallery
  --------------------------------------------------------------*/
  function lightGallery() {
    $('.cs_lightgallery').each(function () {
      $(this).lightGallery({
        selector: '.cs_gallery_item',
        subHtmlSelectorRelative: false,
        thumbnail: false,
        mousewheel: true,
      });
    });
  }

  /*--------------------------------------------------------------
    9. Hover To Active
  --------------------------------------------------------------*/
  function hoverActive() {
    $('.cs_hover_active').hover(function () {
      $(this).addClass('active').siblings().removeClass('active');
    });
  }

  /*--------------------------------------------------------------
    10. Isotop
  --------------------------------------------------------------*/
  function isotopInit() {
    if ($.exists('.cs_isotop')) {
      $('.cs_isotop').isotope({
        itemSelector: '.cs_isotop_item',
        transitionDuration: '0.60s',
        percentPosition: true,
        masonry: {
          columnWidth: '.cs_grid_sizer',
        },
      });
      /* Active Class of Portfolio*/
      $('.cs_isotop_filter ul li').on('click', function (event) {
        $(this).siblings('.active').removeClass('active');
        $(this).addClass('active');
        event.preventDefault();
      });
      /*=== Portfolio filtering ===*/
      $('.cs_isotop_filter ul').on('click', 'a', function () {
        var filterElement = $(this).attr('data-filter');
        $('.cs_isotop').isotope({
          filter: filterElement,
        });
      });
    }
  }

  /*--------------------------------------------------------------
    11. Dynamic contact form
  --------------------------------------------------------------*/
  if ($.exists('#cs_form')) {
    const form = document.getElementById('cs_form');
    const result = document.getElementById('cs_result');

    form.addEventListener('submit', function (e) {
      const formData = new FormData(form);
      e.preventDefault();
      var object = {};
      formData.forEach((value, key) => {
        object[key] = value;
      });
      var json = JSON.stringify(object);
      result.innerHTML = 'Please wait...';

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: json,
      })
        .then(async response => {
          let json = await response.json();
          if (response.status == 200) {
            result.innerHTML = json.message;
          } else {
            console.log(response);
            result.innerHTML = json.message;
          }
        })
        .catch(error => {
          console.log(error);
          result.innerHTML = 'Something went wrong!';
        })
        .then(function () {
          form.reset();
          setTimeout(() => {
            result.style.display = 'none';
          }, 5000);
        });
    });
  }


  const wrapper = document.querySelector(".wrapper");
  const carousel = document.querySelector(".carousel");
  if (carousel && wrapper) {
    const cardElement = carousel.querySelector(".card");
    if (cardElement) {
      const firstCardWidth = cardElement.offsetWidth;
      const arrowBtns = document.querySelectorAll("#left, #right");
      const carouselChildrens = [...carousel.children];

      let isDragging = false,
        isAutoPlay = true,
        startX,
        startScrollLeft,
        timeoutId;

      // Get the number of cards that can fit in the carousel at once
      let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

      // Insert copies of the last few cards to beginning of carousel for infinite scrolling
      carouselChildrens
        .slice(-cardPerView)
        .reverse()
        .forEach((card) => {
          carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
        });

      // Insert copies of the first few cards to end of carousel for infinite scrolling
      carouselChildrens.slice(0, cardPerView).forEach((card) => {
        carousel.insertAdjacentHTML("beforeend", card.outerHTML);
      });

      // Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
      carousel.classList.add("no-transition");
      carousel.scrollLeft = carousel.offsetWidth;
      carousel.classList.remove("no-transition");

      // Add event listeners for the arrow buttons to scroll the carousel left and right
      arrowBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
        });
      });

      const dragStart = (e) => {
        isDragging = true;
        carousel.classList.add("dragging");
        // Records the initial cursor and scroll position of the carousel
        startX = e.pageX;
        startScrollLeft = carousel.scrollLeft;
      };

      const dragging = (e) => {
        if (!isDragging) return; // if isDragging is false return from here
        // Updates the scroll position of the carousel based on the cursor movement
        carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
      };

      const dragStop = () => {
        isDragging = false;
        carousel.classList.remove("dragging");
      };

      const infiniteScroll = () => {
        // If the carousel is at the beginning, scroll to the end
        if (carousel.scrollLeft === 0) {
          carousel.classList.add("no-transition");
          carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
          carousel.classList.remove("no-transition");
        }
        // If the carousel is at the end, scroll to the beginning
        else if (
          Math.ceil(carousel.scrollLeft) ===
          carousel.scrollWidth - carousel.offsetWidth
        ) {
          carousel.classList.add("no-transition");
          carousel.scrollLeft = carousel.offsetWidth;
          carousel.classList.remove("no-transition");
        }

        // Clear existing timeout & start autoplay if mouse is not hovering over carousel
        clearTimeout(timeoutId);
        if (!wrapper.matches(":hover")) autoPlay();
      };

      const autoPlay = () => {
        if (window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
        // Autoplay the carousel after every 2500 ms
        timeoutId = setTimeout(() => (carousel.scrollLeft += firstCardWidth), 2500);
      };
      autoPlay();

      carousel.addEventListener("mousedown", dragStart);
      carousel.addEventListener("mousemove", dragging);
      document.addEventListener("mouseup", dragStop);
      carousel.addEventListener("scroll", infiniteScroll);
      wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
      wrapper.addEventListener("mouseleave", autoPlay);
    }
  }

  /*--------------------------------------------------------------
    12. Tabs
  --------------------------------------------------------------*/
  function isotopInit() {
    if ($.exists('.cs-isotop')) {
      $('.cs-isotop').isotope({
        itemSelector: '.cs-isotop_item',
        transitionDuration: '0.60s',
        percentPosition: true,
        masonry: {
          columnWidth: '.cs-grid_sizer',
        },
      });
      /* Active Class of Portfolio*/
      $('.cs-isotop_filter ul li').on('click', function (event) {
        $(this).siblings('.active').removeClass('active');
        $(this).addClass('active');
        event.preventDefault();
      });
      /*=== Portfolio filtering ===*/
      $('.cs-isotop_filter ul').on('click', 'a', function () {
        var filterElement = $(this).attr('data-filter');
        $('.cs-isotop').isotope({
          filter: filterElement,
        });
      });
    }
  }

  /*--------------------------------------------------------------
    13. Service showcase
  --------------------------------------------------------------*/
  function serviceShowcase() {
    var root = document.querySelector('.cs_service_showcase');
    if (!root) return;

    var track = root.querySelector('.cs_service_track');
    var list = root.querySelector('.cs_service_list');
    var items = Array.prototype.slice.call(root.querySelectorAll('.cs_service_item'));
    if (!track || !items.length) return;

    var desktopQuery = window.matchMedia('(min-width: 992px)');
    var reduceQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    var pointerInside = false;
    var current = -1;
    var frame = 0;

    function canStep() {
      return desktopQuery.matches && !reduceQuery.matches;
    }

    function setActive(index) {
      if (index < 0 || index >= items.length || index === current) return;
      var previous = current;
      var forward = previous < 0 || index > previous;
      current = index;
      if (previous >= 0) root.classList.toggle('is-reverse', !forward);

      items.forEach(function (item, i) {
        var active = i === index;
        var image = item.querySelector('img');
        var title = item.querySelector('.cs_card_title');
        item.classList.toggle('is-active', active);
        if (title) {
          if (active) title.setAttribute('aria-current', 'true');
          else title.removeAttribute('aria-current');
        }
        if (!image) return;
        if (previous < 0) {
          image.classList.add('is-silent');
          image.classList.toggle('is-active', active);
          window.requestAnimationFrame(function () {
            image.classList.remove('is-silent');
          });
          return;
        }
        if (i !== previous && !active) {
          image.classList.add('is-silent');
          image.classList.remove('is-active', 'is-leaving');
          window.requestAnimationFrame(function () {
            image.classList.remove('is-silent');
          });
          return;
        }
        if (i === previous) {
          image.classList.remove('is-active');
          image.classList.add('is-leaving');
        }
        if (active) {
          image.classList.add('is-silent');
          image.classList.remove('is-active', 'is-leaving');
          window.requestAnimationFrame(function () {
            image.classList.remove('is-silent');
            window.requestAnimationFrame(function () {
              image.classList.add('is-active');
            });
          });
        }
      });
    }

    function scrollIndex() {
      if (!canStep() || pointerInside) return;
      var distance = track.offsetHeight - window.innerHeight;
      if (distance <= 0) {
        setActive(0);
        return;
      }
      var scrolled = Math.min(Math.max(96 - track.getBoundingClientRect().top, 0), distance);
      var progress = scrolled / distance;
      var index = progress >= 0.98
        ? items.length - 1
        : Math.min(items.length - 1, Math.floor(progress * items.length));
      setActive(index);
    }

    function onScroll() {
      if (frame) return;
      frame = window.requestAnimationFrame(function () {
        frame = 0;
        scrollIndex();
      });
    }

    function syncMode() {
      if (canStep()) track.classList.add('is-stepping');
      else track.classList.remove('is-stepping');
      if (!desktopQuery.matches) setActive(0);
      scrollIndex();
    }

    items.forEach(function (item, index) {
      item.addEventListener('mouseenter', function () {
        if (!desktopQuery.matches) return;
        pointerInside = true;
        setActive(index);
      });
      item.addEventListener('click', function (event) {
        if (!desktopQuery.matches || event.target.closest('a')) return;
        setActive(index);
      });
      item.addEventListener('focusin', function () {
        if (!desktopQuery.matches) return;
        pointerInside = true;
        setActive(index);
      });
      var title = item.querySelector('.cs_card_title');
      if (title) {
        title.addEventListener('keydown', function (event) {
          if (event.key !== 'Enter' && event.key !== ' ') return;
          event.preventDefault();
          setActive(index);
        });
      }
    });

    if (list) {
      list.addEventListener('mouseleave', function () {
        pointerInside = false;
        scrollIndex();
      });
      list.addEventListener('focusout', function (event) {
        if (list.contains(event.relatedTarget)) return;
        pointerInside = false;
        scrollIndex();
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', syncMode);
    if (desktopQuery.addEventListener) {
      desktopQuery.addEventListener('change', syncMode);
      reduceQuery.addEventListener('change', syncMode);
    }
    syncMode();
  }

  function processSteps() {
    var section = document.querySelector('.cs_process');
    if (!section) return;
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      section.classList.add('is-in');
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        section.classList.add('is-in');
        observer.disconnect();
      });
    }, { threshold: 0.3 });
    observer.observe(section);
  }

  function buildCards() {
    var cards = document.querySelectorAll('.cs_modern_difference .cs_modern_card');
    if (!cards.length || !window.matchMedia('(hover: none)').matches) return;
    cards.forEach(function (card) {
      card.addEventListener('click', function () {
        var open = card.classList.contains('is-open');
        cards.forEach(function (other) { other.classList.remove('is-open'); });
        if (!open) card.classList.add('is-open');
      });
    });
  }

  function whatsappButton() {
    if (document.querySelector('.cs_whatsapp')) return;
    var link = document.createElement('a');
    link.className = 'cs_whatsapp';
    link.href = 'https://wa.me/19723555440';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.setAttribute('aria-label', 'Message Wilson Landscape on WhatsApp');
    link.innerHTML = '<i class="fab fa-whatsapp" aria-hidden="true"></i>';
    document.body.appendChild(link);
  }

})(jQuery); // End of use strict
