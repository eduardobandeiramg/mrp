import 'package:flutter/material.dart';
import 'package:mrp/Controller/operador/production_plan.dart';

class DetalhamentoProduto extends StatefulWidget {
  String nome;
  String codigo;
  String status;
  int quantidade;
  String idProducao;

  DetalhamentoProduto(
      this.nome, this.codigo, this.status, this.quantidade, this.idProducao);

  @override
  State<DetalhamentoProduto> createState() => _DetalhamentoProdutoState();
}

class _DetalhamentoProdutoState extends State<DetalhamentoProduto> {
  bool carregando = false;

  @override
  Widget build(BuildContext context) {
    double altura = MediaQuery.of(context).size.height;
    return Scaffold(
      appBar: AppBar(
        title: Text(
          "Detalhamento do produto",
          style: TextStyle(color: Colors.white),
        ),
        iconTheme: IconThemeData(color: Colors.white),
        backgroundColor: Colors.indigo,
      ),
      body: Stack(
        children: [
          if (carregando)
            ModalBarrier(
              color: Colors.black.withOpacity(0.5),
            ),
          if (carregando)
            Center(
              child: CircularProgressIndicator(
                color: Colors.orange,
                semanticsLabel: "Iniciando produção",
              ),
            ),
          if (!carregando)
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: SingleChildScrollView(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text("Produto: ${widget.nome}"),
                    SizedBox(
                      height: altura * 0.01,
                    ),
                    Text("Código: ${widget.codigo}"),
                    SizedBox(
                      height: altura * 0.01,
                    ),
                    Text("Quantidade: ${widget.quantidade}"),
                    SizedBox(
                      height: altura * 0.01,
                    ),
                    Text("Status: ${widget.status}"),
                    SizedBox(
                      height: altura * 0.1,
                    ),
                    if (widget.status == "a produzir")
                      Center(
                        child: ElevatedButton(
                          onPressed: () async {
                            setState(() {
                              carregando = true;
                            });
                            try {
                              await ProductionPlan.iniciarProducao(
                                  widget.idProducao);
                              Navigator.of(context).pop();
                              ScaffoldMessenger.of(context).showSnackBar(
                                SnackBar(
                                  content:
                                      Text("Produção iniciada com sucesso!"),
                                ),
                              );
                            } catch (e) {
                              setState(() {
                                carregando = false;
                              });
                              ScaffoldMessenger.of(context).showSnackBar(
                                SnackBar(
                                  content: Text("Erro ao iniciar produção"),
                                ),
                              );
                            }
                          },
                          child: Text(
                            "iniciar produção",
                            style: TextStyle(color: Colors.white),
                          ),
                          style: ButtonStyle(
                            backgroundColor:
                                WidgetStatePropertyAll(Colors.indigo),
                          ),
                        ),
                      ),
                    if (widget.status == "a produzir")
                      Center(
                        child: ElevatedButton(
                          onPressed: () {},
                          child: Text(
                            "Visualizar peças",
                            style: TextStyle(color: Colors.white),
                          ),
                          style: ButtonStyle(
                            backgroundColor:
                                WidgetStatePropertyAll(Colors.indigo),
                          ),
                        ),
                      ),
                    if (widget.status == "a produzir")
                      Center(
                        child: ElevatedButton(
                          onPressed: () {},
                          child: Text(
                            "Solicitar peças",
                            style: TextStyle(color: Colors.white),
                          ),
                          style: ButtonStyle(
                            backgroundColor:
                                WidgetStatePropertyAll(Colors.indigo),
                          ),
                        ),
                      ),
                    if (widget.status == "aguardando peças")
                      Center(
                        child: ElevatedButton(
                          onPressed: () {},
                          child: Text(
                            "Visualizar pedido",
                            style: TextStyle(color: Colors.white),
                          ),
                          style: ButtonStyle(
                            backgroundColor:
                                WidgetStatePropertyAll(Colors.indigo),
                          ),
                        ),
                      ),
                    if (widget.status == "aguardando peças")
                      Center(
                        child: ElevatedButton(
                          onPressed: () {},
                          child: Text(
                            "Cancelar pedido",
                            style: TextStyle(color: Colors.white),
                          ),
                          style: ButtonStyle(
                            backgroundColor:
                                WidgetStatePropertyAll(Colors.indigo),
                          ),
                        ),
                      ),
                    if (widget.status == "aguardando peças")
                      Center(
                        child: ElevatedButton(
                          onPressed: () {},
                          child: Text(
                            "Confirmar recebimento",
                            style: TextStyle(color: Colors.white),
                          ),
                          style: ButtonStyle(
                            backgroundColor:
                                WidgetStatePropertyAll(Colors.indigo),
                          ),
                        ),
                      ),
                    if (widget.status == "em produção")
                      Center(
                        child: ElevatedButton(
                          onPressed: () {},
                          child: Text(
                            "Pausar produção",
                            style: TextStyle(color: Colors.white),
                          ),
                          style: ButtonStyle(
                            backgroundColor:
                                WidgetStatePropertyAll(Colors.indigo),
                          ),
                        ),
                      ),
                    if (widget.status == "em produção")
                      Center(
                        child: ElevatedButton(
                          onPressed: () {},
                          child: Text(
                            "Cancelar produção",
                            style: TextStyle(color: Colors.white),
                          ),
                          style: ButtonStyle(
                            backgroundColor:
                                WidgetStatePropertyAll(Colors.indigo),
                          ),
                        ),
                      ),
                    if (widget.status == "em produção")
                      Center(
                        child: ElevatedButton(
                          onPressed: () {},
                          child: Text(
                            "Finalizar produção",
                            style: TextStyle(color: Colors.white),
                          ),
                          style: ButtonStyle(
                            backgroundColor:
                                WidgetStatePropertyAll(Colors.indigo),
                          ),
                        ),
                      ),
                    if (widget.status == "produção pausada")
                      Center(
                        child: ElevatedButton(
                          onPressed: () {},
                          child: Text(
                            "Solicitar peças",
                            style: TextStyle(color: Colors.white),
                          ),
                          style: ButtonStyle(
                            backgroundColor:
                                WidgetStatePropertyAll(Colors.indigo),
                          ),
                        ),
                      ),
                    if (widget.status == "produção pausada")
                      Center(
                        child: ElevatedButton(
                          onPressed: () {},
                          child: Text(
                            "Continuar produção",
                            style: TextStyle(color: Colors.white),
                          ),
                          style: ButtonStyle(
                            backgroundColor:
                                WidgetStatePropertyAll(Colors.indigo),
                          ),
                        ),
                      ),
                  ],
                ),
              ),
            ),
        ],
      ),
    );
  }
}
