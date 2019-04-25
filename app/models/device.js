var config = require("../config");

var http = require("tns-core-modules/http");
var observableModule = require("tns-core-modules/data/observable");

function Device(token, platform) {

  var viewModel = new observableModule.fromObject({
      token: token,
      platform: platform
  });

  viewModel.save = function() {
    return http.request({
      url: config.apiUrl + "devices.json",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      content: JSON.stringify({ token: this.get("token"), platform: this.get("platform") })
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
