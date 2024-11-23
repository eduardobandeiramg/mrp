import 'package:flutter/material.dart';
import 'package:mrp/View/artefatos/cartoes/operador/listagem_produtos.dart';

class Finalizado extends StatefulWidget {
  const Finalizado({super.key});

  @override
  State<Finalizado> createState() => _FinalizadoState();
}

class _FinalizadoState extends State<Finalizado> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          "Finalizado",
          style: TextStyle(color: Colors.white),
        ),
        backgroundColor: Colors.indigo,
      ),
      body: ListView(
        children: [
        ],
      ),
    );
  }
}
