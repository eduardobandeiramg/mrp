import 'package:flutter/material.dart';
import 'package:mrp/Controller/operador/production_plan.dart';
import 'package:mrp/View/artefatos/cartoes/operador/cartao_listagem_produtos.dart';

encheLista() async {
  try {
    List<Map<String, dynamic>> productionPlan =
        await ProductionPlan.getProductionPlan();
    List<Widget> listaCartoes = [];
    if (productionPlan.isNotEmpty) {
      for (var a = 0; a < productionPlan.length; a++) {
        if (productionPlan[a]["status"] == "a produzir" || productionPlan[a]["status"] == "aguardando peças") {
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
    return null;
  }
}

class AProduzir extends StatefulWidget {
  AProduzir({super.key});

  @override
  State<AProduzir> createState() => _AProduzirState();
}

class _AProduzirState extends State<AProduzir> {
  List<Widget> listaCartoes = [];

  @override
  void initState() {
    encheLista().then((valor) {
      setState(() {
        listaCartoes = valor;
      });
    });
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    ProductionPlan.getProductionPlan();
    return Scaffold(
      appBar: AppBar(
        title: Text(
          "A Produzir",
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
