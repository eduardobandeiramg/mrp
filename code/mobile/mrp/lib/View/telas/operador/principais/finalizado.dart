import 'package:flutter/material.dart';
import 'package:mrp/View/artefatos/cartoes/operador/cartao_listagem_produtos.dart';
import '../../../../Controller/operador/production_plan.dart';

encheLista() async {
  try {
    List<Map<String, dynamic>> productionPlan =
    await ProductionPlan.getProductionPlan();
    List<Widget> listaCartoes = [];
    if (productionPlan.isNotEmpty) {
      for (var a = 0; a < productionPlan.length; a++) {
        if(productionPlan[a]["status"] == "finalizado"){
          listaCartoes.add(CartaoListagemProducao(
              productionPlan[a]["id"],
              productionPlan[a]["dateInit"],
              productionPlan[a]["dateEnd"],
              productionPlan[a]["status"],
              productionPlan[a]["product"]["id"],
              productionPlan[a]["product"]["description"],
              productionPlan[a]["product"]["code"],
              productionPlan[a]["product"]["isActive"],
              productionPlan[a]["productionPlan"]["qtd"]));
        }
      }
      return listaCartoes;
    }
  } catch (e) {
    print("excecao: ${e.toString()}");
    return null;
  }
}

class Finalizado extends StatefulWidget {
  const Finalizado({super.key});

  @override
  State<Finalizado> createState() => _FinalizadoState();
}

class _FinalizadoState extends State<Finalizado> {
  List<Widget> listaCartoes = [];

  @override
  void initState() {
    encheLista().then((valor){
      setState(() {
        listaCartoes = valor;
      });
    });
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          "Finalizado",
          style: TextStyle(color: Colors.white),
        ),
        backgroundColor: Colors.indigo,
        automaticallyImplyLeading: false,
      ),
      body: ListView(
        children: listaCartoes,
      ),
    );
  }
}
