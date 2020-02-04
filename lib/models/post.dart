import 'package:http/http.dart' as http;
import 'dart:convert';
import '../models/comment.dart';

class Post {

  final int id;
  final String author;
  final String message;
  final List<Comment> comments;

  Post({this.id, this.author, this.message, this.comments =  const []});

  factory Post.fromJson(Map<String, dynamic> json) {
    final comments = (json['comments'] as List)?.map((comment) => Comment.fromJson(comment))?.toList() ?? [];
    return Post(
      id: json['id'],
      author: json['author'],
      message: json['message'],
      comments: comments
    );
  }

  static Future<List<Post>> all() async {
    final response = await http.get('http://192.168.1.154:3000/api/posts.json');
    if (response.statusCode == 200) {
      final posts = json.decode(response.body) as List;
      return posts.map((post) => Post.fromJson(post)).toList();
    } else {
      throw Exception('Les posts sont indisponibles.');
    }
  }

  static Future<Post> find(int id) async {
    final response = await http.get('http://192.168.1.154:3000/api/posts/$id.json');
    if (response.statusCode == 200) {
      return Post.fromJson(json.decode(response.body));
    } else {
      throw Exception("Le post n'existe pas.");
    }
  }

  static Future<Post> save({message}) async {
    final response = await http.post('http://192.168.1.154:3000/api/posts.json', body: json.encode({ 
      'post' : { 'message': message },
      'remember_token' : '_QgwzYpQFRDeSWf43msXDg'
    }), headers: { "Content-Type": "application/json" });
    if (response.statusCode == 200) {
      return Post.fromJson(json.decode(response.body));
    } else {
      throw Exception("Le post n'a pas pu être sauvegardé.");
    }
  }

}