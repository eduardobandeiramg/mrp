import 'package:flutter/material.dart';
import 'package:mrp/telas/cadastro.dart';
import 'package:mrp/telas/esqueci_senha.dart';
import 'package:mrp/telas/tecnico/tela_principal_tecnico.dart';

class Login extends StatefulWidget {
  const Login({super.key});

  @override
  State<Login> createState() => _LoginState();
}

class _LoginState extends State<Login> {
  final chave = GlobalKey<FormState>();
  TextEditingController controladorEmail = TextEditingController();
  TextEditingController controladorSenha = TextEditingController();

  @override
  Widget build(BuildContext context) {
    double altura = MediaQuery.of(context).size.height;
    double largura = MediaQuery.of(context).size.width;

    return Scaffold(
      body: SingleChildScrollView(
        child: Form(
          key: chave,
          child: Column(
            children: [
              SizedBox(
                height: altura * 0.1,
              ),
              Text(
                "Entrar no app",
                style: TextStyle(fontSize: altura * 0.03),
              ),
              SizedBox(
                height: altura * 0.15,
              ),
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: TextFormField(
                  textAlign: TextAlign.center,
                  decoration: InputDecoration(
                    border: OutlineInputBorder(),
                    hintText: "e-mail",
                  ),
                  controller: controladorEmail,
                  validator: (valor) {
                    if (valor == null) {
                      return "Valor inválido!";
                    } else if (valor.isEmpty) {
                      return "valor inválido!";
                    } else {
                      return null;
                    }
                  },
                ),
              ),
              SizedBox(
                height: altura * 0.05,
              ),
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: TextFormField(
                  obscureText: true,
                  textAlign: TextAlign.center,
                  controller: controladorSenha,
                  validator: (valor) {
                    if (valor == null) {
                      return "valor inválido!";
                    } else if (valor.isEmpty) {
                      return "valor inválido!";
                    } else {
                      return null;
                    }
                  },
                  decoration: InputDecoration(
                    border: OutlineInputBorder(),
                    hintText: "senha",
                  ),
                ),
              ),
              TextButton(
                onPressed: () {
                  Navigator.of(context).push(
                    MaterialPageRoute(
                      builder: (context) => EsqueciSenha(),
                    ),
                  );
                },
                child: Text("Esqueci minha senha"),
              ),
              TextButton(
                onPressed: () {
                  Navigator.of(context).push(
                      MaterialPageRoute(builder: (context) => Cadastro()));
                },
                child: Text("Criar conta"),
              ),
              SizedBox(
                height: altura * 0.2,
              ),
              ElevatedButton(
                onPressed: () {
                  if (chave.currentState!.validate()) {
                    Navigator.of(context).pushReplacement(
                      MaterialPageRoute(
                        builder: (context) => TelaPrincipalTecnico(),
                      ),
                    );
                  }
                },
                child: Text(
                  "entrar",
                  style: TextStyle(
                    color: Colors.white,
                  ),
                ),
                style: ButtonStyle(
                  backgroundColor: WidgetStateProperty.all(Colors.indigo),
                  minimumSize: WidgetStateProperty.all(
                    Size(largura * 0.4, altura * 0.047),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
