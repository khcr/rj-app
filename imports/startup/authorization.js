import { Push } from 'meteor/raix:push'

Push.debug = true;

Push.allow({
  send: function(userId, notification) {
    return userId !== null;
  }
});
