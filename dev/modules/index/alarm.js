define('modules/index/alarm', function(require, exports, module) {

  
  var $view = $('#alarm'),
      $audio = $("#alarm_audio").get(0),
      $alertAudio = $("#alarm_alert_audio").get(0),
      $switch = $('.alarm_switch');
  
  exports.show = function() {
      $view.show();
      $audio.load();
      $audio.play();
      _alertTitle();
      $switch.text('关闭声音');
  };
  
  exports.alert = function () {
      $view.show();
      $alertAudio.load();
      $alertAudio.play();
      _alertTitle();
      $switch.text('关闭声音');
  }; 
  
  exports.hide = function() {
      $view.hide();
      $audio.pause();
      $alertAudio.pause();
      _cancleAlertTitle();
      $switch.text('试听声音');
  };
  
  function _switch() {
      if ($view.css('display') == 'block') {
          exports.hide();
      } else {
          exports.show();
      }
  }
  
  var _titleBack = document.title,
      _alertTitleInterval = null;
  
  function _alertTitle() {
      var title = ''; 
      _alertTitleInterval = setInterval(function() {
          title = title.indexOf('*') === -1
              ? '****'
              : ''; 
          title = title + Math.random().toString().substr(2);
          document.title = title; 
      }, 150);
  }
  
  function _cancleAlertTitle() {
      if (_alertTitleInterval) {
          clearInterval(_alertTitleInterval);
          _alertTitleInterval = null;
          document.title = _titleBack;
      }
  }
  
  exports.init = function() {
      $(document).on('click', '.alarm_show', exports.show);
      $(document).on('click', '.alarm_hide', exports.hide);
      $(document).on('click', '.alarm_switch', _switch);
  };
  
  

});
