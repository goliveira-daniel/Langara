import 'package:flutter/material.dart';

import 'dart:async';

import 'package:flutter_webview_plugin/flutter_webview_plugin.dart';

const kAndroidUserAgent =
    "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Mobile Safari/537.36";

String selectedUrl = "http://greeny.surge.sh/";

void main() => runApp(new MyApp());

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: 'Flutter Demo',
      theme: new ThemeData(
        // This is the theme of your application.
        //
        // Try running your application with "flutter run". You'll see the
        // application has a blue toolbar. Then, without quitting the app, try
        // changing the primarySwatch below to Colors.green and then invoke
        // "hot reload" (press "r" in the console where you ran "flutter run",
        // or press Run > Flutter Hot Reload in IntelliJ). Notice that the
        // counter didn't reset back to zero; the application is not restarted.
        primarySwatch: Colors.green,
      ),
      routes: {
        // "/": (_) => new MyHomePage(title: "Greeny"),
        "/": (_) => new WebviewScaffold(
          url: selectedUrl,
          appBar: new AppBar(
            title: new Text("Greeny"),
          ),
        )
        },
      
      // home: new MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);

  // This widget is the home page of your application. It is stateful, meaning
  // that it has a State object (defined below) that contains fields that affect
  // how it looks.

  // This class is the configuration for the state. It holds the values (in this
  // case the title) provided by the parent (in this case the App widget) and
  // used by the build method of the State. Fields in a Widget subclass are
  // always marked "final".

  final String title;

  @override
  _MyHomePageState createState() => new _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
   // Instance of WebView plugin
  final flutterWebviewPlugin = new FlutterWebviewPlugin();

  // On destroy stream
  StreamSubscription _onDestroy;

  // On urlChanged stream
  StreamSubscription<String> _onUrlChanged;

  // On urlChanged stream
  StreamSubscription<WebViewStateChanged> _onStateChanged;

  TextEditingController _urlCtrl = new TextEditingController(text: selectedUrl);

  TextEditingController _codeCtrl =
      new TextEditingController(text: "window.navigator.userAgent");

  GlobalKey<ScaffoldState> _scaffoldKey = new GlobalKey();

  final _history = [];

  @override
  initState() {
    super.initState();

    flutterWebviewPlugin.close();

    _urlCtrl.addListener(() {
      selectedUrl = _urlCtrl.text;
    });

    // Add a listener to on destroy WebView, so you can make came actions.
    _onDestroy = flutterWebviewPlugin.onDestroy.listen((_) {
      if (mounted) {
        // Actions like show a info toast.
        _scaffoldKey.currentState
            .showSnackBar(new SnackBar(content: new Text("Webview Destroyed")));
      }
    });

    // Add a listener to on url changed
    _onUrlChanged = flutterWebviewPlugin.onUrlChanged.listen((String url) {
      if (mounted) {
        setState(() {
          _history.add("onUrlChanged: $url");
        });
      }
    });

    _onStateChanged =
        flutterWebviewPlugin.onStateChanged.listen((WebViewStateChanged state) {
      if (mounted) {
        setState(() {
          _history.add("onStateChanged: ${state.type} ${state.url}");
        });
      }
    });
  }

  @override
  void dispose() {
    // Every listener should be canceled, the same should be done with this stream.
    _onDestroy.cancel();
    _onUrlChanged.cancel();
    _onStateChanged.cancel();

    flutterWebviewPlugin.dispose();

    super.dispose();
  }

   @override
  Widget build(BuildContext context) {
    return new Scaffold(
      key: _scaffoldKey,
      appBar: new AppBar(
        title: new Text('Plugin example app'),
      ),
      body: new Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          new Container(
            padding: const EdgeInsets.all(24.0),
            child: new TextField(controller: _urlCtrl),
          ),
          new RaisedButton(
            onPressed: () {
              flutterWebviewPlugin.launch(selectedUrl,
                  rect: new Rect.fromLTWH(
                      0.0, 0.0, MediaQuery.of(context).size.width, 300.0),
                  userAgent: kAndroidUserAgent);
            },
            child: new Text("Open Webview (rect)"),
          ),
          new RaisedButton(
            onPressed: () {
              flutterWebviewPlugin.launch(selectedUrl, hidden: true);
            },
            child: new Text("Open 'hidden' Webview"),
          ),
          new RaisedButton(
            onPressed: () {
              flutterWebviewPlugin.launch(selectedUrl);
            },
            child: new Text("Open Fullscreen Webview"),
          ),
          new RaisedButton(
            onPressed: () {
              Navigator.of(context).pushNamed("/widget");
            },
            child: new Text("Open widget webview"),
          ),
          new Container(
            padding: const EdgeInsets.all(24.0),
            child: new TextField(controller: _codeCtrl),
          ),
          new RaisedButton(
            onPressed: () {
              Future<String> future =
                  flutterWebviewPlugin.evalJavascript(_codeCtrl.text);
              future.then((String result) {
                setState(() {
                  _history.add("eval: $result");
                });
              });
            },
            child: new Text("Eval some javascript"),
          ),
          new RaisedButton(
            onPressed: () {
              setState(() {
                _history.clear();
              });
              flutterWebviewPlugin.close();
            },
            child: new Text("Close"),
          ),
          new RaisedButton(
            onPressed: () {
              flutterWebviewPlugin.getCookies().then((m) {
                setState(() {
                  _history.add("cookies: $m");
                });
              });
            },
            child: new Text("Cookies"),
          ),
          new Text(_history.join("\n"))
        ],
      ),
    );
  }
}
