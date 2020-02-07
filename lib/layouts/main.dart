import 'package:flutter/material.dart';
import '../feed.dart';
import '../settings.dart';

class MainLayout extends StatefulWidget {

  @override
  _MainLayoutState createState() => _MainLayoutState();

}

class _MainLayoutState extends State<MainLayout> {

  static List<Widget> _pages = [
    FeedPage(),
    Text("News"),
    Text("Programme"),
    SettingsPage()
  ];

  int _selectedIndex = 0;

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("RJ20"), centerTitle: true),
      body: _pages.elementAt(_selectedIndex),
      bottomNavigationBar: BottomNavigationBar(
        type: BottomNavigationBarType.fixed,
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(
            icon: Icon(Icons.public),
            title: Text("Home")
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.announcement),
            title: Text("News")
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.schedule),
            title: Text("Agenda")
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.tag_faces),
            title: Text("Compte"),
          )
        ],
        currentIndex: _selectedIndex,
        onTap: _onItemTapped,
      )
    );
  }

}