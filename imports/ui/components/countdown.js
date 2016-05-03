import './countdown.html';

Template.countdown.onRendered(function countdownOnRendered() {
  JBCountDown({
    secondsColor : "#332DBD",
    secondsGlow  : "#fff",
    startDate   : 1461427200,
    endDate     : 1494009000,
    now         : moment().unix()
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
  var glob = settings;

  function deg(deg) {
    return (Math.PI/180)*deg - (Math.PI/180)*90;
  }

  glob.total   = Math.floor((glob.endDate - glob.startdate) / 86400);
  glob.days    = Math.floor((glob.endDate - glob.now) / 86400);
  glob.hours   = 24 - Math.floor((glob.endDate - glob.now) % 86400 / 3600);
  glob.minutes = 60 - Math.floor((glob.endDate - glob.now) % 86400 % 3600 / 60);
  glob.seconds = 60 - Math.floor((glob.endDate - glob.now) % 86400 % 3600 % 60);
  glob.secLeft = Math.floor(glob.endDate - glob.now);

  if (glob.now >= glob.endDate) {
    return;
  }

  var clock = {
    set: {
      seconds: function() {
        glob.secLeft--;
        var cSec = template.$("#canvas").get(0);
        var ctx = cSec.getContext("2d");
        ctx.clearRect(0, 0, cSec.width, cSec.height);
        ctx.beginPath();
        ctx.strokeStyle = glob.secondsColor;

        ctx.shadowBlur    = 10;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowColor = glob.secondsGlow;

        var degs = (360 / Math.floor(glob.endDate - glob.startDate)) * (Math.floor(glob.endDate - glob.startDate) - glob.secLeft)
        // void ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
        ctx.arc(400/2,400/2,390/2-3.5, deg(0), deg(degs));
        ctx.lineWidth = 7;
        ctx.stroke();
        template.$(".timer .secs").text(60 - glob.seconds);
        template.$(".timer .mins").text(60 - glob.minutes);
        template.$(".timer .hrs").text(24 - glob.hours);
        template.$(".timer .days").text(glob.days)
      }
    },
    start: function(){
      /* Seconds */
      var cdown = setInterval(function(){
        if ( glob.seconds > 59 ) {
          if (60 - glob.minutes === 0 && 24 - glob.hours === 0 && glob.days === 0) {
            clearInterval(cdown);
            /* Countdown is complete */
            return;
          }
          glob.seconds = 1;

          if (glob.minutes > 59) {
            glob.minutes = 1;

              if (glob.hours > 23) {
                glob.hours = 1;
                if (glob.days > 0) {
                  glob.days--;
                }
              } else {
                glob.hours++;
              }
          } else {
            glob.minutes++;
          }
        } else {
          glob.seconds++;
        }
        clock.set.seconds();
      }, 1000);
    }
  };
  clock.set.seconds();
  clock.start();
}
