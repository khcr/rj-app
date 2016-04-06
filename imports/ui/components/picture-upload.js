import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { MeteorCamera } from 'meteor/mdg:camera';

import './picture-upload.html';

Template.pictureUpload.helpers({
  isCordova() {
    return Meteor.isCordova;
  }
});

Template.pictureUpload.events({
  'click .take-picture'(event, template) {

    event.preventDefault();

    const cameraOptions = {
      width: 800,
      height: 800,
      quality: 100
    };

    MeteorCamera.getPicture(cameraOptions, function (error, data) {
      if (!error) {
        template.$('.image').attr('src', data);
      }
    });
  },
});
