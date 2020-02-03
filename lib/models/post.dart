import 'package:http/http.dart' as http;
import 'dart:convert';

class Post {

  final String author;
  final String message;

  Post({this.author, this.message});

  factory Post.fromJson(Map<String, dynamic> json) {
    return Post(
      author: json['author'],
      message: json['message'],
    );
  }

  static Future<List<Post>> all() async {
    final response = await http.get('https://rencontredejeunesse.ch/api/posts.json');
    if (response.statusCode == 200) {
      final posts = json.decode(response.body) as List;
      final res = posts.map((post) => Post.fromJson(post)).toList();
      return res;
    } else {
      throw Exception('Les posts sont indisponibles.');
    }
  }

}