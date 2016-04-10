import { FS } from 'meteor/cfs:base-package';
import { Meteor } from 'meteor/meteor';

export const Images = new FS.Collection("images", {
  stores: [
    new FS.Store.FileSystem("images", { path: "~/uploads", transformWrite: function(fileObj, readStream, writeStream) {
      gm(readStream, fileObj.name()).resize('200>').stream().pipe(writeStream);
    }}),
    new FS.Store.FileSystem("thumbs", { path: "~/uploads/thumbs", transformWrite: function(fileObj, readStream, writeStream) {
      gm(readStream, fileObj.name()).resize('50>').stream().pipe(writeStream);
    }}),
  ],
  filter: {
    allow: {
      contentTypes: ['image/*']
    }
  }
});

if (Meteor.isServer) {
  Meteor.publish('userImage', function userImagePublication() {
    const user = Meteor.users.findOne({ _id: this.userId })
    return Images.find({ _id: user.profile.imageId });
  });
}

if (Meteor.isServer) {
  Images.allow({
    insert(userId) {
      return userId !== null;
    },
    update(userId) {
      return userId !== null;
    },
    download:function(){
      return true;
    }
  });
}
