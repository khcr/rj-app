import './countdown.html';

Template.countdown.onRendered(function countdownOnRendered() {
  var clockSize = 400;
  if ($(window).width() < 400) {
    clockSize = 300;
  }

  JBCountDown({
    secondsColor : "#332DBD",
    secondsGlow  : "#fff",
    startDate   : 1461427200,
    endDate     : 1494009000,
    now         : moment().unix(),
    width       : clockSize,
    height      : clockSize,
    radius      : clockSize - 10
  }, this);
  animateBeat();
});

function animateBeat() {
  $('.glow').delay(9000).animate({
    opacity: '.5'
  }, 700).animate({
    opacity: '0'
  }, 700).animate({
    opacity: '.5'
  }, 700).animate({
    opacity: '0'
  }, 700, animateBeat);
}

function JBCountDown(settings, template) {
  var global = settings;
  var canvas = template.$("#canvas")[0];

  global.total   = Math.floor((global.endDate - global.startdate) / 86400);
  global.days    = Math.floor((global.endDate - global.now) / 86400);
  global.hours   = 24 - Math.floor((global.endDate - global.now) % 86400 / 3600);
  global.minutes = 60 - Math.floor((global.endDate - global.now) % 86400 % 3600 / 60);
  global.seconds = 60 - Math.floor((global.endDate - global.now) % 86400 % 3600 % 60);
  global.secLeft = Math.floor(global.endDate - global.now);

  if (global.now >= global.endDate) {
    return;
  }

  var clock = {
    set: {
      seconds: function(width, height, radius) {
        global.secLeft--;
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.strokeStyle = global.secondsColor;

        ctx.shadowBlur    = 10;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowColor = global.secondsGlow;

        var degs = (360 / Math.floor(global.endDate - global.startDate)) * (Math.floor(global.endDate - global.startDate) - global.secLeft)
        // void ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
        ctx.arc(global.width/2, global.height/2, global.radius/2-3.5, deg(0), deg(degs));
        ctx.lineWidth = 7;
        ctx.stroke();

        template.$(".timer .secs").text(60 - global.seconds);
        template.$(".timer .mins").text(60 - global.minutes);
        template.$(".timer .hrs").text(24 - global.hours);
        template.$(".timer .days").text(global.days)
      }
    },
    start: function(){
      /* Seconds */
      var cdown = setInterval(function() {

        if (canvas === 'undefined') {
          clearInterval(cdown);
          return;
        }

        if (global.seconds > 59) {
          if (60 - global.minutes === 0 && 24 - global.hours === 0 && global.days === 0) {
            clearInterval(cdown);
            /* Countdown is complete */
            return;
          }
          global.seconds = 1;

          if (global.minutes > 59) {
            global.minutes = 1;

              if (global.hours > 23) {
                global.hours = 1;
                if (global.days > 0) {
                  global.days--;
                }
              } else {
                global.hours++;
              }
          } else {
            global.minutes++;
          }
        } else {
          global.seconds++;
        }
        clock.set.seconds();
      }, 1000);
    }
  };
  clock.set.seconds();
  clock.start();

  function deg(deg) {
    return (Math.PI/180) * deg - (Math.PI/180) * 90;
  }
}
