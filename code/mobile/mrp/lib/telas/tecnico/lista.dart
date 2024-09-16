import 'package:flutter/material.dart';
import 'package:mrp/artefatos/cartoes/tecnico/listagem_estoque.dart';

class ListagemEstoque extends StatefulWidget {
  const ListagemEstoque({super.key});

  @override
  State<ListagemEstoque> createState() => _ListagemEstoqueState();
}

class _ListagemEstoqueState extends State<ListagemEstoque> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          "Estoque",
          style: TextStyle(color: Colors.white),
        ),
        backgroundColor: Colors.indigo,
      ),
      body: ListView(
        children: [
          CartaoItemEstoque(),
          CartaoItemEstoque(),
          CartaoItemEstoque(),
        ],
      ),
    );
  }
}
