import 'package:flutter/material.dart';

class CartaoItemEstoque extends StatelessWidget {
  const CartaoItemEstoque({super.key});

  printa() {
    print("apertou");
  }

  @override
  Widget build(BuildContext context) {
    double altura = MediaQuery.of(context).size.height;
    double largura = MediaQuery.of(context).size.width;
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: InkWell(
        onTap: printa(),
        child: Container(
          height: altura * 0.1,
          decoration: BoxDecoration(
            color: Colors.grey,
            borderRadius: BorderRadius.all(
              Radius.circular(20),
            ),
          ),
          child: Row(
            children: [
              SizedBox(
                width: largura * 0.03,
              ),
              Expanded(
                flex: 5,
                child: Text("item:"),
              ),
              Expanded(
                flex: 1,
                child: Text("qtd: "),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
