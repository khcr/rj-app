import 'package:flutter/material.dart';
import '../forms/login.dart';
import '../layouts/main.dart';

class LoginPage extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: LoginForm(onSaved: (user) {
        Navigator.push(
          context,
          MaterialPageRoute(builder: (context) => MainLayout(startPage: 3))
        );
      })
    );
  } 

}