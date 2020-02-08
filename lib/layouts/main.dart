import 'package:flutter/material.dart';
import '../feed.dart';
import '../settings.dart';

class MainLayout extends StatefulWidget {

  final int startPage;

  MainLayout({this.startPage = 0});

  @override
  _MainLayoutState createState() => _MainLayoutState(startPage);

}

class _MainLayoutState extends State<MainLayout> {

  _MainLayoutState(this.selectedIndex);

  static List<Widget> _pages = [
    FeedPage(),
    Text("News"),
    Text("Programme"),
    SettingsPage()
  ];

  int selectedIndex = 0;

  void _onItemTapped(int index) {
    setState(() {
      selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("RJ20"), centerTitle: true),
      body: _pages.elementAt(selectedIndex),
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
        currentIndex: selectedIndex,
        onTap: _onItemTapped,
      )
    );
  }

}