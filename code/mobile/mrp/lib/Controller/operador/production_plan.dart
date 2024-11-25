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

  static Future<String> iniciarProducao(String id) async {
    String urlIniciarProducao = "http://10.0.2.2:3000/production/$id/start";
    var resposta = await http.patch(Uri.parse(urlIniciarProducao), headers: {
      "Authorization": TokenApp.tokenApp!,
      "Content-Type": "application/json"
    });
    await Future.delayed(
      Duration(seconds: 1),
    );
    if (resposta.statusCode == 200) {
      print("producao iniciada!");
      return "ok";
    } else {
      throw new Exception("erro");
    }
  }

  static Future<String> finalizarProducao(String id) async {
    String urlIniciarProducao = "http://10.0.2.2:3000/production/$id/end";
    var resposta = await http.patch(Uri.parse(urlIniciarProducao), headers: {
      "Authorization": TokenApp.tokenApp!,
      "Content-Type": "application/json"
    });
    await Future.delayed(
      Duration(seconds: 1),
    );

    if (resposta.statusCode == 200) {
      print("producao finalizada!");
      return "ok";
    } else {
      throw new Exception("erro");
    }
  }

  static solicitarPecas(String idDaProducao) async {
    String urlPausarProducao =
        "http://10.0.2.2:3000/production/stop-production";
    http.Response resposta = await http.patch(Uri.parse(urlPausarProducao));
  }

  static retornaPecasProduto(String idProduto) async {
    String urlMateriaisProduto =
        "http://10.0.2.2:3000/build-of-materials/product/$idProduto";
    http.Response resposta = await http.get(Uri.parse(urlMateriaisProduto),
        headers: {"Authorization": TokenApp.tokenApp!});
    if (resposta.statusCode == 200) {
      print("materiais necessarios para construir o produto:");
      return List<Map<String, dynamic>>.from(jsonDecode(resposta.body));
    } else {
      throw new Exception("erro");
    }
  }

  static pausarProducao(String idProducao) async {
    String urlPausarProducao =
        "http://10.0.2.2:3000/production/stop-production";
    http.Response resposta = await http.patch(Uri.parse(urlPausarProducao),
        headers: {"Authorization": TokenApp.tokenApp!});
    print("Resposta: ${resposta.body}");
  }
}
