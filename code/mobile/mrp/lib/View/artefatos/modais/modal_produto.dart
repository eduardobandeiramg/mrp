import 'package:flutter/material.dart';
import 'package:mrp/View/telas/tecnico/baixa.dart';
import 'package:mrp/View/telas/tecnico/entrada.dart';

class ModalProduto extends StatefulWidget {
  const ModalProduto({super.key});

  @override
  State<ModalProduto> createState() => _ModalProdutoState();
}

class _ModalProdutoState extends State<ModalProduto> {
  String valor = "Selecione o produto";
  Widget botao = Row(
    children: [],
  );
  List lista = [];

  @override
  Widget build(BuildContext context) {
    double altura = MediaQuery.of(context).size.height;
    double largura = MediaQuery.of(context).size.width;
    return Center(
      child: Container(
        decoration: BoxDecoration(
          color: Colors.grey,
          borderRadius: BorderRadius.all(Radius.circular(50)),
        ),
        height: altura * 0.7,
        width: largura * 0.8,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            SizedBox(
              height: altura * 0.05,
            ),
            ListTile(
              title: Text(valor),
              trailing: PopupMenuButton(onSelected: (selecionado) {
                setState(() {
                  valor = selecionado;
                });
              }, itemBuilder: (BuildContext context) {
                return [
                  PopupMenuItem(
                    child: Text("produto 1"),
                    value: "produto 1",
                  ),
                  PopupMenuItem(
                    child: Text("produto 2"),
                    value: "produto 2",
                  ),
                  PopupMenuItem(
                    child: Text("produto 3"),
                    value: "produto 3",
                  ),
                  PopupMenuItem(
                    child: Text("produto 4"),
                    value: "produto 4",
                  ),
                  PopupMenuItem(
                    child: Text("produto 5"),
                    value: "produto 5",
                  ),
                ];
              }),
            ),
            SizedBox(
              height: altura * 0.25,
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                ElevatedButton(
                  onPressed: () {

                  },
                  child: Icon(
                    Icons.check,
                    color: Colors.black,
                  ),
                  style: ButtonStyle(
                    backgroundColor: WidgetStatePropertyAll(Colors.green),
                  ),
                ),
                ElevatedButton(
                  onPressed: () {},
                  child: Icon(
                    Icons.cancel,
                    color: Colors.black,
                  ),
                  style: ButtonStyle(
                    backgroundColor: WidgetStatePropertyAll(Colors.red),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
