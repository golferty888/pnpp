import 'package:find_my_iot/model/devices.dart';
import 'package:flutter/material.dart';
import 'dart:convert';
import 'dart:async' show Future;
// import 'package:flutter/services.dart' show rootBundle;
import 'package:http/http.dart' as http;

import 'package:find_my_iot/config.dart';

class FindDevice extends StatefulWidget {
  @override
  _FindDeviceState createState() => _FindDeviceState();
}

class _FindDeviceState extends State<FindDevice> {
  @override
  initState() {
    super.initState();
    loadDevice();
    // print(loadAssetDevice.toString);
  }

  List devices = new List<Device>();

  Future<Null> loadDevice() async {
    final response = await http.get(ngrokUrl + '/find/findRas');

    if (response.statusCode == 200) {
      print(response.body);
      this.setState(() {
        List list = json.decode(response.body)["devices"];
        devices = list.map((model) => Device.fromJson(model)).toList();
      });
    } else {
      throw Exception('Failed to load post');
    }
  }

  // Future<String> loadAssetDevice() async {
  //   return await rootBundle.loadString('assets/devices.json');
  // }

  Future<Null> connectDevice(urlConnect) async {
    final response =
        await http.post(ngrokUrl + '/find/connect', body: {'url': urlConnect});
    if (response.statusCode == 200) {
      print(response.body);
      Navigator.pop(context, devices);
    } else {
      throw Exception('Failed to load post');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text('Finding devices'),
        ),
        body: ListView.builder(
          scrollDirection: Axis.vertical,
          shrinkWrap: true,
          itemCount: devices.length,
          itemBuilder: (BuildContext context, int index) {
            return ListTile(
              leading: Icon(IconData(59663, fontFamily: 'MaterialIcons')),
              title: Text(devices[index].name.toString()),
              subtitle: Text(devices[index].device.toString()),
              trailing: RaisedButton(
                child: Text('Connect'),
                color: Colors.green,
                onPressed: () => connectDevice(devices[index].url),
              ),
            );
          },
        ));
  }
}
