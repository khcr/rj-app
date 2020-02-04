import 'package:http/http.dart' as http;

class Comment {

  int id;
  String author;
  String message;
  
  Comment({this.id, this.author, this.message});

  factory Comment.fromJson(Map<String, dynamic> json) {
    return Comment(
      id: json['id'],
      author: json['author'],
      message: json['message']
    );
  }

}