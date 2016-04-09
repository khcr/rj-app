import { Images } from '../../../api/images.js'

import './profile.html';
import '../../components/picture-upload.js';

Template.Profile.events({
  'submit .profile-picture'(event) {

    event.preventDefault();

    const target = event.target;
    const image = target.image.files[0];
    const userId = Meteor.userId();

    if (!image) {
      return
    }

    const fileObject = Images.insert(image);

    Meteor.users.update(userId, { $set: { "profile.imageId": fileObject._id } })

    target.reset();
  },
});
