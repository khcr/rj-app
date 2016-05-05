import { Session } from 'meteor/session';

import { Images } from '../../../api/images.js'

import './profile.html';
import '../../components/picture-upload.js';

Template.Profile.events({
  'submit .profile-picture'(event) {

    event.preventDefault();

    const target = event.target;
    const image = target.image.files[0];
    const userId = Meteor.userId();

    const pictureUpload = Blaze.getView($('.picture-upload')[0]).templateInstance();
    const cameraImage = pictureUpload.upload.get('image');

    let fileObject;

    if (cameraImage) {
      fileObject = Images.insert(cameraImage);
    } else if (image) {
      fileObject = Images.insert(image);
    } else {
      return
    }

    Meteor.users.update(userId, { $set: { "profile.imageId": fileObject._id } })

    pictureUpload.$('.camera-preview').attr('src', '');
    target.reset();
  },
  'click .log-out'() {
    Meteor.logout();
    //Router.go("/");
  }
});
