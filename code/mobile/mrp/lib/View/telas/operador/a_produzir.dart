import 'package:flutter/material.dart';
import 'package:mrp/View/artefatos/cartoes/operador/listagem_produtos.dart';

class AProduzir extends StatefulWidget {
  const AProduzir({super.key});

  @override
  State<AProduzir> createState() => _AProduzirState();
}

class _AProduzirState extends State<AProduzir> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          "A Produzir",
          style: TextStyle(color: Colors.white),
        ),
        backgroundColor: Colors.indigo,
      ),
      body: ListView(
        children: [
          CartaoProduto("Bicicleta", "123", "a produzir", "2" , dataProducao: "18/11/2024"),
          CartaoProduto("Impressora", "456", "a produzir", "15" , dataProducao: "18/11/2024"),
          CartaoProduto("Piano", "789", "a produzir", "30" , dataProducao: "18/11/2024"),
          CartaoProduto("Furadeira", "756", "a produzir", "70" , dataProducao: "18/11/2024"),
          CartaoProduto("Furadeira", "756", "a produzir", "50" ,dataProducao:  "18/11/2024"),
        ],
      ),
    );
  }
}
