var HelperFunctions = {

  findByIdInArray: function(array, id) {
    array.forEach(function(record, index) {
      if (record.id == id) { return index };
    });
  }

};

module.exports = HelperFunctions;
