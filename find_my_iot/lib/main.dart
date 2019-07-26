import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

import 'components/findDevice.dart';

import 'config.dart';
import 'model/devices.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(home: MyHome());
  }
}

class MyHome extends StatefulWidget {
  @override
  _MyHomeState createState() => _MyHomeState();
}

class _MyHomeState extends State<MyHome> {
  List devices = new List<Device>();

  Future<Null> checkNgrok() async {
    final response = await http.get(ngrokUrl);

    if (response.statusCode == 200) {
      print(response.body);
    } else {
      throw Exception('Failed to load post');
    }
  }

  Future<Null> disconnectAllDevices() async {
    final response = await http.post(ngrokUrl + '/find/disconnect',
        body: {'url': deviceIp + ':8080/connect'});
    if (response.statusCode == 200) {
      print(response.body);
      this.setState(() {
        this.devices = [];
      });
    } else {
      throw Exception('Failed to load post');
    }
  }

  FloatingActionButton findDeviceButton() {
    return FloatingActionButton(
      onPressed: () {
        navigateToFindDevice(context);
      },
      child: Icon(Icons.add),
    );
  }

  navigateToFindDevice(BuildContext context) async {
    final result = await Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => FindDevice()),
    );
    this.setState(() {
      this.devices = result;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text('Welcome to Find My IOT'),
        ),
        body: Column(
          children: <Widget>[
            ListTile(
              title: Padding(
                padding: const EdgeInsets.only(top: 0.0),
                child: RaisedButton(
                  child: Text('Check Ngrok request get'),
                  color: Colors.orangeAccent,
                  onPressed: checkNgrok,
                ),
              ),
            ),
            ListTile(
              title: Padding(
                padding: const EdgeInsets.only(top: 0.0),
                child: RaisedButton(
                  child: Text('Disconnected all devices'),
                  color: Colors.redAccent,
                  onPressed: disconnectAllDevices,
                ),
              ),
            ),
            Divider(
              color: Colors.black,
              height: 0,
            ),
            ListView.builder(
              scrollDirection: Axis.vertical,
              shrinkWrap: true,
              itemCount: devices.length,
              itemBuilder: (BuildContext context, int index) {
                return Container(
                  margin: const EdgeInsets.fromLTRB(40, 16, 40, 0),
                  padding: const EdgeInsets.all(8.0),
                  decoration: new BoxDecoration(
                      border: new Border.all(color: Colors.black)),
                  child: Column(
                    children: <Widget>[
                      Container(
                        child:
                            Icon(IconData(59663, fontFamily: 'MaterialIcons')),
                      ),
                      Container(
                        child: Text(devices[index].name.toString()),
                      ),
                      Container(
                        child: Text(devices[index].device.toString()),
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                        children: <Widget>[
                          RaisedButton(
                              child: Text('Turn off'),
                              onPressed: () => turnOnOffDevice('off'),
                              color: Colors.grey,
                              shape: new RoundedRectangleBorder(
                                  borderRadius:
                                      new BorderRadius.circular(30.0))),
                          RaisedButton(
                            child: Text('Turn on'),
                            onPressed: () => turnOnOffDevice('on'),
                            color: Colors.lightGreen,
                            shape: new RoundedRectangleBorder(
                                  borderRadius:
                                      new BorderRadius.circular(30.0))
                          ),
                        ],
                      )
                    ],
                  ),
                );
              },
            )
          ],
        ),
        floatingActionButton: findDeviceButton());
  }

  Future<String> turnOnOffDevice(String message) async {
    final body = {"url": deviceIp + ":8080?action=", "action": message};
    final response =
        await http.post(ngrokUrl + '/send/sendMessage', body: body);

    if (response.statusCode == 200) {
      print(response.body);
      return response.body;
    } else {
      throw Exception('Failed to load post');
    }
  }
}
