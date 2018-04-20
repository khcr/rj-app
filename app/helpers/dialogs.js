var dialogsModule = require("ui/dialogs");

var Dialogs = {

  no_internet: function() {
    return dialogsModule.alert({
      message: "Pas de connexion internet",
      okButtonText: "Compris"
    });
  },

  delete: function(text) {
    return dialogsModule.confirm({
      title: "Confirmation",
      message: "Supprimer " + text + " ?",
      cancelButtonText: "Annuler",
      okButtonText: "Confirmer"
    });
  },

  update: function(text) {
    return dialogsModule.prompt({
      title: "Modifier",
      okButtonText: "Enregistrer",
      cancelButtonText: "Annuler",
      defaultText: text,
      inputType: dialogsModule.inputType.text
    });
  },

  error: function(text) {
    return dialogsModule.alert({
      message: text,
      okButtonText: "Compris"
    });
  }

};

module.exports = Dialogs;
