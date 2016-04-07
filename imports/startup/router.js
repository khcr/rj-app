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

Router.route('/signup', function () {
  this.render('Signup');
});

Router.route('/profile', function () {
  this.render('Profile');
});

Router.route('/tips', function () {
  this.render('Tips');
});

Router.route('/map', function () {
  this.render('Map');
});
