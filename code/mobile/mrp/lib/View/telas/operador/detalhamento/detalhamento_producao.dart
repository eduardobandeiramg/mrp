import 'package:flutter/material.dart';
import 'package:mrp/Controller/operador/production_plan.dart';
import 'package:mrp/View/telas/operador/detalhamento/detalhamento_pecas_produto.dart';

import '../tela_principal_operador.dart';

class TelaDetalhamentoProducao extends StatefulWidget {
  String nome;
  String idProduto;
  String codigo;
  String status;
  int quantidade;
  String idProducao;

  TelaDetalhamentoProducao(this.nome, this.idProduto, this.codigo, this.status,
      this.quantidade, this.idProducao);

  @override
  State<TelaDetalhamentoProducao> createState() =>
      _TelaDetalhamentoProducaoState();
}

class _TelaDetalhamentoProducaoState extends State<TelaDetalhamentoProducao> {
  bool carregando = false;

  @override
  Widget build(BuildContext context) {
    double altura = MediaQuery.of(context).size.height;
    double largura = MediaQuery.of(context).size.width;
    return Scaffold(
      appBar: AppBar(
        title: Text(
          "Detalhamento da produção",
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
                semanticsLabel: "Carregando",
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
                        child: SizedBox(
                          width: largura * 0.9,
                          child: ElevatedButton(
                            onPressed: () {
                              Navigator.of(context).push(
                                MaterialPageRoute(
                                  builder: (context) =>
                                      TelaDetalhamentoPecasProduto(
                                          widget.idProduto, widget.idProducao),
                                ),
                              );
                            },
                            child: Text(
                              "Visualizar peças",
                              style: TextStyle(color: Colors.white),
                            ),
                            style: ButtonStyle(
                              backgroundColor:
                                  WidgetStatePropertyAll(Colors.indigo),
                              shape: MaterialStateProperty.all(
                                RoundedRectangleBorder(
                                    borderRadius: BorderRadius.zero),
                              ),
                            ),
                          ),
                        ),
                      ),
                    if (widget.status == "a produzir")
                      SizedBox(
                        height: altura * 0.06,
                      ),
                    if (widget.status == "a produzir")
                      Center(
                        child: SizedBox(
                          width: largura * 0.9,
                          child: ElevatedButton(
                            onPressed: () async {
                              setState(() {
                                carregando = true;
                              });
                              try {
                                await ProductionPlan.iniciarProducao(
                                    widget.idProducao);
                                ScaffoldMessenger.of(context).showSnackBar(
                                  SnackBar(
                                    content:
                                        Text("Produção iniciada com sucesso!"),
                                  ),
                                );
                                Navigator.of(context).pushReplacement(
                                  MaterialPageRoute(
                                    builder: (context) => TelaPrincipalOperador(),
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
                              shape: MaterialStateProperty.all(
                                RoundedRectangleBorder(
                                    borderRadius: BorderRadius.zero),
                              ),
                            ),
                          ),
                        ),
                      ),
/*                    if (widget.status == "a produzir")
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
                      ),*/
                    if (widget.status == "aguardando peças")
                      Center(
                        child: SizedBox(
                          width: largura * 0.9,
                          child: ElevatedButton(
                            onPressed: () {},
                            child: Text(
                              "Visualizar pedido",
                              style: TextStyle(color: Colors.white),
                            ),
                            style: ButtonStyle(
                              backgroundColor:
                                  WidgetStatePropertyAll(Colors.indigo),
                              shape: MaterialStateProperty.all(
                                RoundedRectangleBorder(
                                    borderRadius: BorderRadius.zero),
                              ),
                            ),
                          ),
                        ),
                      ),
                    if (widget.status == "aguardando peças")
                      SizedBox(
                        height: altura * 0.02,
                      ),
                    if (widget.status == "aguardando peças")
                      Center(
                        child: SizedBox(
                          width: largura * 0.9,
                          child: ElevatedButton(
                            onPressed: () {},
                            child: Text(
                              "Cancelar pedido",
                              style: TextStyle(color: Colors.white),
                            ),
                            style: ButtonStyle(
                              backgroundColor:
                                  WidgetStatePropertyAll(Colors.indigo),
                              shape: MaterialStateProperty.all(
                                RoundedRectangleBorder(
                                    borderRadius: BorderRadius.zero),
                              ),
                            ),
                          ),
                        ),
                      ),
                    if (widget.status == "aguardando peças")
                      SizedBox(
                        height: altura * 0.02,
                      ),
                    if (widget.status == "aguardando peças")
                      Center(
                        child: SizedBox(
                          width: largura * 0.9,
                          child: ElevatedButton(
                            onPressed: () {},
                            child: Text(
                              "Confirmar recebimento das peças",
                              style: TextStyle(color: Colors.white),
                            ),
                            style: ButtonStyle(
                              backgroundColor:
                                  WidgetStatePropertyAll(Colors.indigo),
                              shape: MaterialStateProperty.all(
                                RoundedRectangleBorder(
                                    borderRadius: BorderRadius.zero),
                              ),
                            ),
                          ),
                        ),
                      ),
                    if (widget.status == "aguardando peças")
                      SizedBox(
                        height: altura * 0.08,
                      ),
                    if (widget.status == "aguardando peças")
                      Center(
                        child: SizedBox(
                          width: largura * 0.9,
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
                                        Text("Produção retomada com sucesso!"),
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
                              "Retomar Produção",
                              style: TextStyle(color: Colors.white),
                            ),
                            style: ButtonStyle(
                              backgroundColor:
                                  WidgetStatePropertyAll(Colors.indigo),
                              shape: MaterialStateProperty.all(
                                RoundedRectangleBorder(
                                    borderRadius: BorderRadius.zero),
                              ),
                            ),
                          ),
                        ),
                      ),
                    if (widget.status == "em produção")
                      Center(
                        child: SizedBox(
                          width: largura * 0.9,
                          child: ElevatedButton(
                            onPressed: () {
                              ProductionPlan.pausarProducao(widget.idProducao);
                            },
                            child: Text(
                              "Pausar produção",
                              style: TextStyle(color: Colors.white),
                            ),
                            style: ButtonStyle(
                              backgroundColor:
                                  WidgetStatePropertyAll(Colors.indigo),
                              shape: MaterialStateProperty.all(
                                RoundedRectangleBorder(
                                    borderRadius: BorderRadius.zero),
                              ),
                            ),
                          ),
                        ),
                      ),
                    if (widget.status == "em produção")
                      SizedBox(
                        height: altura * 0.02,
                      ),
                    if (widget.status == "em produção")
                      Center(
                        child: SizedBox(
                          width: largura * 0.9,
                          child: ElevatedButton(
                            onPressed: () {},
                            child: Text(
                              "Cancelar produção",
                              style: TextStyle(color: Colors.white),
                            ),
                            style: ButtonStyle(
                              backgroundColor:
                                  WidgetStatePropertyAll(Colors.indigo),
                              shape: MaterialStateProperty.all(
                                RoundedRectangleBorder(
                                    borderRadius: BorderRadius.zero),
                              ),
                            ),
                          ),
                        ),
                      ),
                    if (widget.status == "em produção")
                      SizedBox(
                        height: altura * 0.06,
                      ),
                    if (widget.status == "em produção")
                      Center(
                        child: SizedBox(
                          width: largura * 0.9,
                          child: ElevatedButton(
                            onPressed: () async {
                              setState(() {
                                carregando = true;
                              });
                              try {
                                await ProductionPlan.finalizarProducao(
                                    widget.idProducao);
                                Navigator.of(context).pop();
                                ScaffoldMessenger.of(context).showSnackBar(
                                  SnackBar(
                                    content: Text(
                                        "Produção finalizada com sucesso!"),
                                  ),
                                );
                              } catch (e) {
                                setState(() {
                                  carregando = false;
                                });
                                ScaffoldMessenger.of(context).showSnackBar(
                                  SnackBar(
                                    content: Text("Erro ao finalizar produção"),
                                  ),
                                );
                              }
                            },
                            child: Text(
                              "Finalizar produção",
                              style: TextStyle(color: Colors.white),
                            ),
                            style: ButtonStyle(
                              backgroundColor:
                                  WidgetStatePropertyAll(Colors.indigo),
                              shape: MaterialStateProperty.all(
                                RoundedRectangleBorder(
                                    borderRadius: BorderRadius.zero),
                              ),
                            ),
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
