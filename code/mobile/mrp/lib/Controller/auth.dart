import 'package:http/http.dart' as http;

class Auth {
  static Future<Map<String, dynamic>> login(
      String username, String senha) async {
    String url = "http://10.0.2.2:3000/auth/login";
    var retorno = await http
        .post(Uri.parse(url), body: {"username": username, "password": senha});
    print("retorno da requisição: ${retorno.statusCode}");
    print("body da requisicao: ${retorno.body}");
    return {"codigo": retorno.statusCode, "body": retorno.body};
  }
}
