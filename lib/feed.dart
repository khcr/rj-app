import 'package:flutter/material.dart';
import 'models/post.dart';

class FeedPage extends StatefulWidget {

  @override
  _FeedPageState createState() => _FeedPageState();
}

class _FeedPageState extends State<FeedPage> {

  @override
  Widget build(BuildContext context) {

    return Scaffold(
      appBar: AppBar(
        title: Text("Shoutbox !")
      ),
      body: FutureBuilder<List<Post>>(
        future: Post.all(),
        builder: (context, snapshot) {
          if (snapshot.hasError) {
            return Text(snapshot.error);
          } else if (snapshot.hasData) {
            return _listView(context, snapshot);
          }
          return CircularProgressIndicator();
        }
      )
    );

  }

  Widget _listView(context, snapshot) {
    final values = snapshot.data;
    return new ListView.builder(
      itemCount: values.length,
      itemBuilder: (context, index) {
        return new Column(
          children: [
            new ListTile(title: new Text(values[index].message)),
            new Divider(height: 2)
          ]
        );
      }
    );
  }

}