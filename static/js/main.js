/*jshint browser:true, indent:2, laxcomma:true, loopfunc: true */
/*global MobileDetect, smoothScroll */

(function () {

  'use strict';

  var md = new MobileDetect(window.navigator.userAgent);
  if (!md.mobile() && !md.tablet()) {
    var vid = document.querySelector('#video-background');
    vid.setAttribute('src', vid.getAttribute('data-src'));
  }

  var introHeading = document.querySelector('#intro h1.fading');
  if (introHeading) {
    var spanTimer = 4500;

    var spanFader = function () {
      var spanActive = introHeading.querySelector('span.fade');
      spanActive.classList.remove('fade');
      if (spanActive.nextSibling) {
        //console.log('NEXT', spanActive.nextSibling);
        spanActive.nextSibling.classList.add('fade');
        //console.log('DONE');
      } else {
        introHeading.querySelectorAll('span')[0].classList.add('fade');
      }

      window.setTimeout(spanFader, spanTimer);
    };

    window.setTimeout(spanFader, spanTimer);
  }

  smoothScroll.init({
    offset: 74,
  });

  window.addEventListener('scroll', function () {

    var doc = document.documentElement;
    var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);

    if (top > 20) {
      document.getElementById('header').classList.add('fixed');
    } else {
      document.getElementById('header').classList.remove('fixed');
    }

  });



  // User Language selector - Run this only once each session
  // Check the browser language and redirect the user to the correct page

  if (window.sessionStorage) {
    var first = window.sessionStorage.getItem('firstLogin');

    if (!first) {
      window.sessionStorage.setItem('firstLogin', 'done');

      switch (ul().substr(0, 2)) {
        case 'it':
          window.location.href = '/';
          break;
        case 'en':
          window.location.href = '/en';
          break;
      }
    }
  }

})();
