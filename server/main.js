import { Meteor } from 'meteor/meteor';

import '../imports/api/posts.js';
import '../imports/api/images.js';
import '../imports/api/users.js';
import '../imports/api/testimonies.js';

import '../imports/startup/authorization.js';

Meteor.startup(() => {

  // create admin account
  if (Meteor.users.find().count() === 0) {
    Accounts.onCreateUser(function(options, user) {
      user.isAdmin = options.isAdmin
      user.profile = options.profile
      return user
    });

    Accounts.createUser({
      username: 'admin',
      password: '12341',
      isAdmin: true,
      profile: {}
    });
  }
});
