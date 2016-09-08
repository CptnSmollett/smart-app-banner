/* _optimizely_evaluate=force */
window.atinternetTestCreative = '[Smart app banner]-1-2[banner]';
if (typeof window.at_internet_tag != 'undefined') {
  window.at_internet_tag.emit('Optimizely:success', '[Smart app banner]-1-2[banner]');
}

$('head').append('<meta name="apple-itunes-app" content="app-id=561082205">');
$('head').append('<meta name="google-play-app" content="app-id=com.dartit.RTcabinet">');

$('head').append('<link rel="stylesheet" href="http://www.rtm.rt.ru/css2/app-banners/jquery.smartbanner.css" type="text/css" media="screen">');
$('head').append('<link rel="apple-touch-icon" href="http://a3.mzstatic.com/us/r30/Purple30/v4/1c/85/c3/1c85c37f-dc03-5c68-2a5b-72a660855398/icon175x175.jpeg">');
$('head').append('<link rel="android-touch-icon" href="https://lh3.googleusercontent.com/2RSSaTBlVfxIPa0eZLJ7-eJdZY_CLXacEIGBq05G6vHxvN6JLhCtKlC9bvC9Bkm8L5zR=w300-rw">');
/* _optimizely_evaluate=safe */

// load and init smart banner
var loadScript = function(location, callback){
  var fileRef = document.createElement('script');
  fileRef.setAttribute('type','text/javascript');

  if (callback) {
    if (fileRef.readyState) {  // IE
      fileRef.onreadystatechange = function() {
        if (fileRef.readyState == 'loaded' || fileRef.readyState == 'complete') {
          fileRef.onreadystatechange = null;
          callback();
        }
      };
    } else {  // Non-IE
      fileRef.onload = function(){
        callback();
      };
    }
  }
  fileRef.setAttribute('src', location);
  document.head.appendChild(fileRef);
};

loadScript('//www.rtm.rt.ru/js2/app_banners/jquery.smartbanner.js', function() {
  initBanner();
  trackBannerClicks();
});

function initBanner() {
  var appPublisher = "Ростелеком";
  
  if (navigator.userAgent.indexOf("iPhone") >= 0 || navigator.userAgent.indexOf("iPad") >= 0) {
    appPublisher = 'OAO "Rostelecom"';
  }
  
  new SmartBanner({
    title: "Мой Ростелеком",
    author: appPublisher,
    button: "СКАЧАТЬ",
    store: {
      ios: "<br>в App Store",
      android: "<br>в Google Play"
    },
    price: {
      ios: "БЕСПЛАТНО",
      android: "БЕСПЛАТНО"
    }
  });
}

// track banner clicks: close or downnload   
function trackBannerClicks() {
  $('.smartbanner-close').each(function (index) {
    appendOnclickFunc(this, 'before', function() {
      window.at_internet_tag.click.send({
        elem:this,
        name:'Закрыть баннер',
        chapter1:'banner',
        chapter2:document.location.hostname,
        type:'action'
      });
    });
  });

  $('.smartbanner-button-text').each(function (index) {
    appendOnclickFunc(this, 'before', function() {
      window.at_internet_tag.click.send({
        elem:this,
        name:'Скачать приложение',
        chapter1:'banner',
        chapter2:document.location.hostname,
        type:'action'
      });
    });
  });
}

// aux
var appendOnclickFunc = function(element, mode, func) {
  var oldHandler = element.onclick;
  element.onclick = (function (onclick) {
    return function(oEvent) {
      if (mode == 'before' && func)
        func();

      oEvent  = oEvent || event;
      if (onclick)
        onclick(oEvent);

      if (mode == 'after' && func)
        func();
    };
  })(element.onclick);
};
