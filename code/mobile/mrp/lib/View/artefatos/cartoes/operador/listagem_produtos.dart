import 'package:flutter/material.dart';
import 'package:mrp/View/telas/operador/detalhamento_produto.dart';

class CartaoProduto extends StatelessWidget {
  String nome;
  String codigo;
  String status;
  String quantidade;
  String? dataProducao;

  CartaoProduto(
      this.nome, this.codigo, this.status, this.quantidade, {this.dataProducao});

  @override
  Widget build(BuildContext context) {
    double altura = MediaQuery.of(context).size.height;
    double largura = MediaQuery.of(context).size.width;
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: InkWell(
        onTap: () {
          Navigator.of(context).push(
            MaterialPageRoute(
              builder: (context) =>
                  DetalhamentoProduto(nome, codigo, status, quantidade),
            ),
          );
        },
        child: Container(
          height: altura * 0.18,
          decoration: BoxDecoration(
            color: Colors.grey,
            borderRadius: BorderRadius.all(
              Radius.circular(20),
            ),
          ),
          child: Padding(
            padding: const EdgeInsets.all(8.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                SizedBox(
                  width: largura * 0.03,
                ),
                Expanded(
                  flex: 1,
                  child: Text("item: $nome"),
                ),
                Expanded(
                  flex: 1,
                  child: Text("código: $codigo"),
                ),
/*                Expanded(
                  flex: 1,
                  child: Text("status: $status"),
                ),*/
              if(dataProducao != null)
                Expanded(
                  flex: 1,
                  child: Text("Data da produção: $dataProducao"),
                ),
                Expanded(
                  flex: 1,
                  child: Text("quantidade: $quantidade"),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
