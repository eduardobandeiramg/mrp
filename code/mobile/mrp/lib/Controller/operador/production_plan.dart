import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:mrp/Controller/token_app.dart';

class ProductionPlan {
  static dynamic getProductionPlan() async {
    String ulrGetProductionPlan = "http://10.0.2.2:3000/production/null-dates";
    http.Response resposta = await http.get(Uri.parse(ulrGetProductionPlan),
        headers: {"Authorization": TokenApp.tokenApp!});
    List<Map<String, dynamic>> productionPlan =
        List<Map<String, dynamic>>.from(jsonDecode(resposta.body));
    if (resposta.statusCode == 200) {
      return productionPlan;
    } else {
      throw new Exception("erro");
    }
  }

  static dynamic iniciarProducao(String id) async {
    String urlIniciarProducao = "http://10.0.2.2:3000/production/$id/start";
    var resposta = await http.patch(Uri.parse(urlIniciarProducao), headers: {
      "Authorization": TokenApp.tokenApp!,
      "Content-Type": "application/json"
    });
    if (resposta.statusCode == 200) {
      print("producao iniciada!");
      return "ok";
    } else {
      throw new Exception("erro");
    }
  }
}
