import 'package:http/http.dart' as http;

class Auth {

  static void login(String username, String senha) async {
    String url = "https://localhost:3000/auth/login";
    var retorno = await http
        .post(Uri.parse(url), body: {"username": username, "password": senha});
    print("retorno da requisição: $retorno");
  }
}
