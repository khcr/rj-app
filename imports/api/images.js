import { FS } from 'meteor/cfs:base-package';
import { Meteor } from 'meteor/meteor';

const resize = function(fileObj, readStream, writeStream) {
  gm(readStream, fileObj.name()).resize('250>').stream().pipe(writeStream);
};

export const Images = new FS.Collection("images", {
  stores: [
    new FS.Store.FileSystem("images", { path: "~/uploads", transformWrite: resize })
  ],
  filter: {
    allow: {
      contentTypes: ['image/*']
    }
  }
});

if (Meteor.isServer) {
  Images.allow({
    insert(userId) {
      return userId !== null;
    },
    update() {
      return true;
    },
    download:function(){
      return true;
    }
  });
}
