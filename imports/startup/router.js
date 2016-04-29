Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

Router.route('/', function () {
  this.render('Feed');
});

Router.route('/login', function () {
  this.render('Login');
});

Router.route('/signup', function () {
  if (Meteor.userId()) {
    this.render('Signup');
  } else {
    this.render('Login')
  }
});

Router.route('/profile', function () {
  if (! Meteor.userId()) {
    this.render('Login');
  } else {
    this.render('Profile');
  }
});
