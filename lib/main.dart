import 'package:flutter/material.dart';
import 'layouts/main.dart';

void main() => runApp(RJ());

class RJ extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'RJ',
      theme: ThemeData(
        primarySwatch: Colors.deepOrange
      ),
      home: MainLayout(),
    );
  }
}
