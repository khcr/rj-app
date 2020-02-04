import 'package:flutter/material.dart';

class MainMenu extends StatefulWidget {

  @override
  _MainMenuState createState() => _MainMenuState();

}

class _MainMenuState extends State<MainMenu> {
  int _selectedIndex = 0;

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return BottomNavigationBar(
      items: [
        BottomNavigationBarItem(
          icon: Icon(Icons.public),
          title: Text("Home")
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.announcement),
          title: Text("News")
        )
      ],
    currentIndex: _selectedIndex,
    onTap: _onItemTapped,
    );
  }

}