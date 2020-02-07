import 'package:http/http.dart' as http;
import 'dart:convert';

class User {

  final int id;
  final String name;
  final String email;
  final String rememberToken;

  User({this.id, this.name, this.email, this.rememberToken});

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'],
      name: json['name'],
      email: json['email'],
      rememberToken: json['rememberToken']
    );
  }

  static Future<User> login({email, password}) async {
    final response = await http.post('http://192.168.1.154:3000/api/users/signin.json', body: json.encode({ 
      'user' : { 'email': email, 'password': password }
    }), headers: { "Content-Type": "application/json" });
    if (response.statusCode == 200) {
      return User.fromJson(json.decode(response.body));
    } else {
      throw Exception("L'authentification a échouée.");
    }
  }

}