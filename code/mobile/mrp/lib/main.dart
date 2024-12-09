import 'package:dart_amqp/dart_amqp.dart';
import 'package:flutter/material.dart';
import 'package:mrp/View/telas/login.dart';

void main() async {

  var settings = ConnectionSettings(
    host: '10.0.2.2',
    port: 5672,
    authProvider: PlainAuthenticator('guest', 'guest'),
  );

  Client client = Client(settings: settings);

  Channel channel = await client
      .channel(); // auto-connect to localhost:5672 using guest credentials
  Queue queue = await channel.queue("hello");
  Consumer consumer = await queue.consume();
  consumer.listen((AmqpMessage message) {
    // Get the payload as a string
    print(" [x] Received string: ${message.payloadAsString}");

    // Or unserialize to json
    print(" [x] Received json: ${message.payloadAsJson}");

    // Or just get the raw data as a Uint8List
    print(" [x] Received raw: ${message.payload}");

    // The message object contains helper methods for
    // replying, ack-ing and rejecting
    message.reply("world");
  });

  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'TIS 5 - MRP',
      theme: ThemeData(
        //colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      home: Login(),
      debugShowCheckedModeBanner: false,
    );
  }
}
