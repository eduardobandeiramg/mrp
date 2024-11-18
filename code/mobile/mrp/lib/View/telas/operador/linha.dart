import 'package:flutter/material.dart';
import 'package:mrp/View/artefatos/cartoes/operador/listagem_produtos.dart';

class LinhaProducao extends StatefulWidget {
  const LinhaProducao({super.key});

  @override
  State<LinhaProducao> createState() => _LinhaProducaoState();
}

class _LinhaProducaoState extends State<LinhaProducao> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          "Linha de produção",
          style: TextStyle(color: Colors.white),
        ),
        backgroundColor: Colors.indigo,
      ),
      body: ListView(
        children: [
          CartaoProduto("Bicicleta", "123", "a produzir", "2"),
          CartaoProduto("Impressora", "456", "aguardando peças", "15"),
          CartaoProduto("Piano", "789", "produzindo", "30"),
          CartaoProduto("Furadeira", "756", "produção finalizada", "70"),
          CartaoProduto("Furadeira", "756", "produção pausada", "50"),
        ],
      ),
    );
  }
}
