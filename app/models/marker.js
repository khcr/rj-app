var config = require("../config");

var http = require("http");

var Marker = {

  all: function() {
    return http.getJSON(config.apiUrl + "markers.json").then(function(res) {
      return res;
    }, function(e) {
      console.log(e);
    });
  }

}

/* /*/

module.exports = Marker;
