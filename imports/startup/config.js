// Lock orientation
Meteor.startup(() => {
  if (Meteor.isCordova) {
    //window.screen.lockOrientation('portrait');
  }
});
