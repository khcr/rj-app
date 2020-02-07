import 'package:flutter/material.dart';
import 'settings/login.dart';

class SettingsPage extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[
        RaisedButton(
          child: Text("Se connecter"),
          onPressed: () => _showLogin(context),
        )
      ],
    );
  }

  void _showLogin(BuildContext context) {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => LoginPage()),
    );
  }

} 