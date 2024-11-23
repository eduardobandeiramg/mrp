import 'package:flutter/material.dart';
import 'package:mrp/View/telas/operador/detalhamento_produto.dart';

class CartaoProduto extends StatelessWidget {
  String idProducao;
  String dateInit;
  String dateEnd;
  String status;
  String idProduto;
  String nomeProduto;
  String codeProduto;
  var isActiveProduto;
  int qtdProduto;

  CartaoProduto(
      this.idProducao,
      this.dateInit,
      this.dateEnd,
      this.status,
      this.idProduto,
      this.nomeProduto,
      this.codeProduto,
      this.isActiveProduto,
      this.qtdProduto);

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
              builder: (context) => DetalhamentoProduto(
                  nomeProduto, codeProduto, status, qtdProduto, idProducao),
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
                  child: Text("item: $nomeProduto"),
                ),
                Expanded(
                  flex: 1,
                  child: Text("código: $codeProduto"),
                ),
/*                Expanded(
                  flex: 1,
                  child: Text("status: $status"),
                ),*/
                if (dateInit != null)
                  Expanded(
                    flex: 1,
                    child: Text("Data da produção: $dateInit"),
                  ),
                Expanded(
                  flex: 1,
                  child: Text("quantidade: $qtdProduto"),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
