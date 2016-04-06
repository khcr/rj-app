import { Meteor } from 'meteor/meteor';

import '../imports/api/posts.js';
import '../imports/api/images.js';
import '../imports/api/users.js';

Meteor.startup(() => {

  // create admin account
  if (Meteor.users.find().count() === 0) {
    Accounts.createUser({
      username: 'admin',
      password: '12341',
      profile: {}
    });
  }
});
