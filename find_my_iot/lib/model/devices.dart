// class ListDevices {
//   final List<Device> devices;

//   ListDevices({this.devices});

//   factory ListDevices.fromJson(Map<String, dynamic> parsedJson) {
//     var list = parsedJson['devices'] as List;
//     print('type: ' + list.runtimeType.toString()); //returns List<dynamic>
//     List<Device> deviceList = list.map((i) => Device.fromJson(i)).toList();
//     print(deviceList.toString());
//     return ListDevices(
//       devices: deviceList
//     );
//   }
// }

class Device {
  String name;
  String device;
  String url;

  Device({this.name, this.device, this.url});

  factory Device.fromJson(Map<String, dynamic> parsedJson) {
    return Device(
        name: parsedJson['name'],
        device: parsedJson['device'],
        url: parsedJson['url']);
  }
}
