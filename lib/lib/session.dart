import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';

import '../models/user.dart';

abstract class Session {

  static Future login(User user) async {
    final prefs = await SharedPreferences.getInstance();
    prefs.setString("currentUser", json.encode(user.toJson()));
  }

  static Future<User> current() async {
    final prefs = await SharedPreferences.getInstance();
    return json.decode(prefs.getString("currentUser"));
  }

  static Future logout() async {
    final prefs = await SharedPreferences.getInstance();
    prefs.remove("currentUser");
  }

  static Future<bool> isSignedIn() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.containsKey("currentUser");
  }

}