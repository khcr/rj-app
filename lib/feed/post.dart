import 'package:flutter/material.dart';
import '../models/post.dart';

class PostPage extends StatelessWidget {

  final int id;
  PostPage(this.id);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: FutureBuilder(
        future: Post.find(this.id),
        builder: (context, snapshot) {
          if (snapshot.hasError) {
            return Text(snapshot.error);
          } else if (snapshot.hasData) {
            return _showPost(snapshot);
          }
          return CircularProgressIndicator();
        }
      )
    );
  }

  Widget _showPost(AsyncSnapshot snapshot) {
    final post = snapshot.data;
    final comments = post.comments;
    return Column(
      children: [
        Text(post.author),
        Text(post.message),
        ListView.builder(
          shrinkWrap: true,
          itemCount: comments.length,
          itemBuilder: (context, index) {
            return Column(children: [
              Text(comments[index].author),
              Text(comments[index].message)
            ]);
          }
        )
      ]
    );
  }

}