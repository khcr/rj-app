import 'package:flutter/material.dart';
import '../models/post.dart';

class PostForm extends StatefulWidget {

  final void Function(Post) onSaved;

  PostForm({this.onSaved});

  @override
  _PostFormState createState() => _PostFormState();

}

class _PostFormState extends State<PostForm> {

  final TextEditingController _textController = TextEditingController();

  final _formKey = GlobalKey<FormState>();
  String message;

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: Column(
        children: [
          TextFormField(
            controller: _textController,
            decoration: const InputDecoration(
              hintText: "A quoi penses-tu ?"
            ),
            validator: (value) => _validateMessage(value),
            onSaved: (value) {
              this.message = value;
              _textController.clear();
            }
          ),
          RaisedButton(
            child: Text("Poster"),
            onPressed: () {
              if (_formKey.currentState.validate()) {
                _formKey.currentState.save();
                Post.save(message: this.message).then((post) {
                  widget.onSaved(post);
                });
              }
            },
          )
        ]
      )
    );
  }

  _validateMessage(String value) {
    if (value.isEmpty) { 
      return "Le message est vide."; 
    }
    return null;
  }

}