import 'package:flutter/material.dart';
import 'models/post.dart';
import 'layouts/main_menu.dart';
import 'feed/post.dart';
import 'forms/post.dart';

class FeedPage extends StatefulWidget {

  @override
  _FeedPageState createState() => _FeedPageState();
}

class _FeedPageState extends State<FeedPage> {

  List<Post> posts = [];
  final Future<List<Post>> future = Post.all();

  void addPost(Post post) {
    setState(() {
      posts.add(post);
    });
  }

  @override
  Widget build(BuildContext context) {

    return Scaffold(
      appBar: AppBar(),
      body: Column(children: [
        PostForm(onSaved: addPost),
        Flexible(child:
          FutureBuilder<List<Post>>(
            future: future,
            builder: (context, snapshot) {
              if (snapshot.hasError) {
                return Text(snapshot.error);
              } else if (snapshot.hasData) {
                posts = snapshot.data;
                return _listView(context);
              }
              return CircularProgressIndicator();
            }
          )
        )
      ]),
      bottomNavigationBar: MainMenu(),
    );

  }

  Widget _listView(context) {
    return new ListView.builder(
      itemCount: posts.length,
      itemBuilder: (context, index) {
        return new Column(
          children: [
            Column(
              children: [
                Text(posts[index].author),
                Text(posts[index].message),
                FlatButton(
                  child: Text("Voir les commentaires"),
                  onPressed: () => _showComments(context, posts[index].id))
              ]
            ),
            Divider(height: 30)
          ]
        );
      }
    );
  }

  void _showComments(BuildContext context, int id) {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => PostPage(id)),
    );
  }

}