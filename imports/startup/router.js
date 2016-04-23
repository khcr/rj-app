Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

Router.route('/', function () {
  this.render('Feed');
});

Router.route('/agenda', function () {
  this.render('Agenda');
});

Router.route('/login', function () {
  this.render('Login');
});

Router.route('/tips', function () {
  this.render('Tips');
});

Router.route('/map', function () {
  this.render('Map');
});

Router.route('/testimonies', function () {
  this.render('Testimonies');
});

Router.route('/signup', function () {
  if (Meteor.userId() && Meteor.user().isAdmin) {
    this.render('Signup');
  } else {
    this.render('Home')
  }
});

Router.route('/profile', function () {
  if (! Meteor.userId()) {
    this.render('Login');
  } else {
    this.render('Profile');
  }
});

Router.route('/users/testimonies', function () {
  if (! Meteor.userId()) {
    this.render('Login');
  } else {
    this.render('UsersTestimonies');
  }
});
