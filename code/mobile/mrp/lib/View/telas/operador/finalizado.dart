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
          CartaoProduto("Bicicleta", "123", "produção finalizada", "2"),
          CartaoProduto("Impressora", "456", "produção finalizada", "15"),
          CartaoProduto("Piano", "789", "produção finalizada", "30"),
          CartaoProduto("Furadeira", "756", "produção finalizada", "70"),
          CartaoProduto("Furadeira", "756", "produção pausada", "50"),
        ],
      ),
    );
  }
}
