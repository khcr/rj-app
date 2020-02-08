import 'package:flutter/material.dart';
import 'settings/login.dart';
import 'lib/session.dart';

class SettingsPage extends StatefulWidget {

  @override
  _SettingsPageState createState() => _SettingsPageState();

}

class _SettingsPageState extends State<SettingsPage> {

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
      future: _logInOrOut(),
      builder: (context, snapshot) {
        if (snapshot.hasData) {
          return snapshot.data;
        }
        return CircularProgressIndicator();
      }
    );
  }

  Future<Widget> _logInOrOut() async {
    final isSignedIn = await Session.isSignedIn();
    if (isSignedIn) {
      return RaisedButton(
        child: Text("Se déconnecter"),
        onPressed: () => _logout(),
      );
    } else {
      return RaisedButton(
        child: Text("Se connecter"),
        onPressed: () => _showLogin(context),
      );
    }
  }

  void _logout() {
    setState(() {
      Session.logout();
    });
  }

  void _showLogin(BuildContext context) {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => LoginPage()),
    );
  }

} 