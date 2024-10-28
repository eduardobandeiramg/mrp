import 'package:http/http.dart' as http;

class Auth {
  static Future<Map<String, dynamic>> login(
      String username, String senha) async {
    String urlLogin = "http://10.0.2.2:3000/auth/login";
    String urlPerfil = "http://10.0.2.2:3000/users/profile";
    var retornoLogin = await http.post(Uri.parse(urlLogin),
        body: {"username": username, "password": senha});
    if (retornoLogin.statusCode == 201) {
      var token = retornoLogin.body.substring(10);
      token = token.substring(0, token.length - 2);
      token = "Bearer " + token;
      print(
          "tipo do status code do papel: ${retornoLogin.statusCode.runtimeType}");
      var retornoPerfil = await http
          .get(Uri.parse(urlPerfil), headers: {"Authorization": token});
      print("TIPO DO RETORNO DO GET DO PERFIL: ${retornoPerfil.body.runtimeType}");
      return {"codigo":retornoPerfil.statusCode};
    } else {
      return {"codigo": "400"};
    }
  }
}
