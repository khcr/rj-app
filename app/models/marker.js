var config = require("../config");

var http = require("http");

var Marker = {

  all: function() {
    return http.getJSON(config.apiUrl + "markers.json").then(function(res) {
      return res.markers;
    }, function(e) {
      console.log(e);
    });
  }

}

/* /*/

module.exports = Maker;
