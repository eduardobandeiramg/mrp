import 'package:flutter/material.dart';
import 'package:mrp/View/artefatos/cartoes/operador/cartao_listagem_produtos.dart';

class PerfilOperador extends StatefulWidget {
  const PerfilOperador({super.key});

  @override
  State<PerfilOperador> createState() => _PerfilOperadorState();
}

class _PerfilOperadorState extends State<PerfilOperador> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          "Perfil",
          style: TextStyle(color: Colors.white),
        ),
        backgroundColor: Colors.indigo,
        automaticallyImplyLeading: false,
      ),
      body: ListView(
        children: [

        ],
      ),
    );
  }
}
