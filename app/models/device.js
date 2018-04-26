var config = require("../config");

var http = require("http");
var observableModule = require("data/observable");

function Device(token) {

  var viewModel = new observableModule.fromObject({
      token: token
  });

  viewModel.save = function() {
    return http.request({
      url: config.apiUrl + "devices.json",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      content: JSON.stringify({ token: this.get("token") })
    }).then(function(res) {
      var result = res.content.toJSON();
      if(res.statusCode !== 200) { throw result.errors; }
      return result;
    }, function(e) {
      console.log(e);
    });
  };

  return viewModel;

}

module.exports = Device;
