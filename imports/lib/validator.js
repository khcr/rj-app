export const Validator = {
  isNotEmptyString(string) {
    if (typeof string !== 'string' || string === '') {
      throw Meteor.Error('Unvalid data');
    }
  },
};
