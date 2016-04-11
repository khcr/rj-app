import { FS } from 'meteor/cfs:base-package';
import { Meteor } from 'meteor/meteor';

export const Images = new FS.Collection("images", {
  stores: [
    new FS.Store.GridFS("images", { transformWrite: function(fileObj, readStream, writeStream) {
      gm(readStream, fileObj.name()).resize('200>').stream().pipe(writeStream);
    }}),
    new FS.Store.GridFS("thumbs", { transformWrite: function(fileObj, readStream, writeStream) {
      gm(readStream, fileObj.name()).resize('50>').stream().pipe(writeStream);
    }}),
  ],
  filter: {
    allow: {
      extensions: ['png', 'jpg', 'jpeg', 'bmp', 'gif', '']
    },
  }
});

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
