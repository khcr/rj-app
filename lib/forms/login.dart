import 'package:flutter/material.dart';
import '../models/user.dart';

class LoginForm extends StatefulWidget {

  final void Function(User) onSaved;

  LoginForm({this.onSaved});

  @override
  _LoginFormState createState() => _LoginFormState();

}

class _LoginFormState extends State<LoginForm> {

  final _formKey = GlobalKey<FormState>();
  String email, password;

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: Column(
        children: [
          TextFormField(
            decoration: const InputDecoration(
              labelText: "Email"
            ),
            validator: (value) => _validateEmail(value),
            onSaved: (value) {
              this.email = value;
            }
          ),
          TextFormField(
            decoration: const InputDecoration(
              labelText: "Mot de passe"
            ),
            validator: (value) => _validatePassword(value),
            onSaved: (value) {
              this.password = value;
            }
          ),
          RaisedButton(
            child: Text("Se connecter"),
            onPressed: () {
              if (_formKey.currentState.validate()) {
                _formKey.currentState.save();
                User.login(email: this.email, password: this.password).then((user) {
                  widget.onSaved(user);
                });
              }
            },
          )
        ]
      )
    );
  }

  _validateEmail(String value) {
    if (value.isEmpty) { 
      return "Le message est vide."; 
    }
    return null;
  }

  _validatePassword(String value) {
    if (value.isEmpty) { 
      return "Le message est vide."; 
    }
    return null;
  }

}