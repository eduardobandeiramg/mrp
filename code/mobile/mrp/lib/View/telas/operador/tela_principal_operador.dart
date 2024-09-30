import 'package:flutter/material.dart';
import 'package:mrp/View/telas/tecnico/lista.dart';

class TelaPrincipalOperador extends StatefulWidget {
  TelaPrincipalOperador({super.key});

  @override
  State<TelaPrincipalOperador> createState() => _TelaPrincipalOperadorState();
}

class _TelaPrincipalOperadorState extends State<TelaPrincipalOperador> {
  int indexBarraNavegacao = 0;

  void aoSelecionarOIndex(int index) {
    setState(() {
      indexBarraNavegacao = index;
    });
  }

  telaAMoatrar(int indice) {
    if (indice == 0) {
      return ListagemEstoque();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: telaAMoatrar(indexBarraNavegacao),
      bottomNavigationBar: BottomNavigationBar(
        type: BottomNavigationBarType.fixed,
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.production_quantity_limits), label: "lista"),
/*          BottomNavigationBarItem(
              icon: Icon(Icons.fire_truck), label: "dar entrada"),
          BottomNavigationBarItem(
              icon: Icon(Icons.send_sharp), label: "dar baixa"),*/
          BottomNavigationBarItem(
              icon: Icon(Icons.person_2_rounded), label: "perfil"),
        ],
        currentIndex: indexBarraNavegacao,
        onTap: aoSelecionarOIndex,
        backgroundColor: Colors.black,
        unselectedItemColor: Colors.white,
        selectedItemColor: Colors.red,
      ),
    );
  }
}
