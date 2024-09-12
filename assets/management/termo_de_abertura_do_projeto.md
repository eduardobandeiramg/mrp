# Termo de Abertura de Projeto (TAP) no.: 9999

**Nome da empresa: MRP**

**Data: 05/08/2024**

**Integrantes:**

* Daniel Estevam Pacheco de Souza, 1381298@sga.pucminas.br

* Eduardo Bandeira de Melo Guimarães, 1336504@sga.pucminas.br

* Eric Rodrigues Diniz, 1283264@sga.pucminas.br

* Lucas Machado de Oliveira Andrade, 1377053@sga.pucminas.br

* Mariana Eliza Alves Costa, 1078276@sga.pucminas.br

* Vítor Lion Guimarães Rodrigues, 1323991@sga.pucminas.br

---

**Professores:**

* Hugo Bastos de Paula
* Cleiton Silva Tavares
* Ramon Lacerda Marques

---

_Curso de Engenharia de Software, Unidade Praça da Liberdade_

_Instituto de Informática e Ciências Exatas – Pontifícia Universidade de Minas Gerais (PUC MINAS), Belo Horizonte – MG – Brasil_

---

## 1. IDENTIFICAÇÃO DO PROJETO

**1.1 Nome do Projeto: MRP**

**1.2 Gerente do Projeto: Lucas Machado de Oliveira Andrade**

**1.3 Cliente do Projeto: Não se aplica**

**1.4 Tipo de Projeto:**

[ ] Manutenção em produto existente
[x] Desenvolvimento de novo produto
[ ] Outro: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

**1.5 Objetivo do projeto:**
O objetivo deste projeto é desenvolver um sistema de Planejamento de Recursos de Manufatura (MRP) que automatize e integre de forma eficiente a gestão de estoque, a coordenação de ordens de produção e a previsão de demanda em uma linha de produção. O sistema centralizará essas funções e melhorará a comunicação entre as áreas de produção, estoque e compras por meio de serviços de mensageria em tempo real utilizando Kafka. Adicionalmente, o projeto visa implementar estratégias de segurança, incluindo autenticação via JWT e armazenamento de senhas com hashing seguro, além de assegurar a qualidade do software através de um conjunto abrangente de testes, utilizando ferramentas como JEST para testes unitários e PLAYWRIGHT para testes de ponta a ponta.

**1.6 Benefícios que justificam o projeto:**
A implementação do sistema MRP é justificada pelos significativos benefícios que oferece à empresa. O sistema reduz custos operacionais ao automatizar o planejamento de recursos e a gestão de inventário, evitando tanto excessos quanto faltas de materiais. Ele também aumenta a eficiência operacional ao sincronizar as operações de produção, estoque e compras, melhorando a comunicação entre setores e proporcionando uma visão centralizada e em tempo real para decisões mais informadas. A segurança da informação é aprimorada com a autenticação via JWT e o armazenamento seguro de senhas com hashing. A escalabilidade proporcionada pela hospedagem na nuvem permite que o sistema acompanhe o crescimento da empresa. Além disso, a qualidade é garantida por meio de testes automatizados, assegurando a confiabilidade do sistema. Esses benefícios combinados elevam a competitividade da empresa, tornando o projeto crucial para seu sucesso contínuo.

**1.7 Qualidade esperada do produto final (requisitos de qualidade):**

* Confiabilidade: O sistema deve manter uma disponibilidade de 99.95%, de acordo com as diretrizes de SLA da AWS para uma máquina virtual. A meta é que o sistema tenha, no máximo, 21,9 minutos de indisponibilidade por mês, garantindo o menor impacto possível nas operações.

* Segurança: Garantir a proteção dos dados através de criptografia Hash (bcrypt) no armazenamento de senhas e autenticação baseada em JWT (JSON Web Tokens) com claims, assegurando que cada usuário tenha o mínimo acesso necessário para desempenhar suas funções. Além disso, o sistema deve cumprir com as regulamentações de segurança padrão do setor.

* Eficiência: O sistema deverá suportar até 60 usuários simultâneos (tanto em tablets quanto na web), com dependência de internet para o consumo e envio de informações em tempo real. O objetivo é garantir uma experiência consistente, sem perda de dados, com tempo de resposta de até 2 segundos em operações principais, mesmo com essa carga de usuários.

* Usabilidade: A interface deve ser intuitiva e de fácil navegação, seguindo as heurísticas de Nielsen para garantir a qualidade no design e a eficiência do usuário ao realizar tarefas. O sistema deve permitir que usuários completem suas tarefas em no máximo 5 cliques ou ações, minimizando erros e necessidade de suporte.

* Escalabilidade: O sistema deve ser escalável horizontalmente para suportar o aumento de usuários em uma única localidade. Além disso, a implementação em nuvem deve possibilitar a escalabilidade para múltiplas localidades, com adaptação automática às necessidades de expansão, garantindo que o sistema possa crescer conforme o negócio se expanda, sem comprometer o desempenho.

## **2. ESCOPO PRELIMINAR E PREMISSAS** |

**2.1 O que será feito (escopo do projeto)**
* Desenvolvimento de um sistema MRP (Planejamento de Recursos de Manufatura) para automatizar o planejamento e gestão de recursos em uma linha de produção.
* Implementação de funcionalidades para cadastro e gestão de produtos, materiais, e controle de estoque.
* Integração de serviços de mensageria em tempo real utilizando Kafka para garantir a comunicação eficiente entre os setores de produção e estoque.
* Desenvolvimento de uma interface de usuário responsiva para tablets, utilizando Vue.js para a web e Flutter para dispositivos móveis.
* Implementação de mecanismos de segurança, incluindo autenticação via JWT e armazenamento seguro de senhas com hash.
* Realização de testes unitários e de ponta a ponta para assegurar a qualidade e confiabilidade do sistema.
* Hospedagem do sistema na nuvem (AWS) para garantir escalabilidade e disponibilidade de acordo com a SLA da prestadora de serviços públicos cloud.


**2.2 O que não será feito no projeto (contra-escopo)**
* Integração com sistemas externos ou legados específicos que não sejam parte do escopo atual.
* Desenvolvimento de funcionalidades personalizadas ou específicas para determinados setores que não sejam comuns à maioria das empresas de manufatura.
* Implementação de funcionalidades avançadas de inteligência artificial ou aprendizado de máquina para previsões complexas de demanda.
* Criação de módulos financeiros ou contábeis detalhados, como controle de fluxo de caixa ou gestão de folha de pagamento.
* Desenvolvimento de uma aplicação desktop nativa, visto que o foco é em soluções web e móveis.

**2.3 Resultados / serviços / produtos a serem entregues**

| **1.** | Sistema MRP, incluindo módulos de cadastro e gestão de produtos, materiais, e controle de estoque. |
| --- | --- |
| **2.** | Interface de usuário responsiva para web e dispositivos móveis, desenvolvida em Vue.js e Flutter, respectivamente. |
| **3.** | Implementação de serviços de mensageria em tempo real com Kafka, integração via APIs RESTful, e segurança com autenticação JWT. |


**2.4 Condições para início do projeto**

1. Requisitos Bem-Definidos:

* As especificações detalhadas do sistema devem ser claramente documentadas e acordadas por todos os stakeholders envolvidos.

2. Recursos Disponíveis:
* A equipe de projeto deve estar montada e pronta para iniciar, com todos os membros alocados e os ambientes de desenvolvimento configurados.

3. Orçamento Aprovado:
* O financiamento necessário para a execução do projeto, incluindo custos com tecnologia, infraestrutura e equipe, deve ser aprovado e alocado.

4. Cronograma Estabelecido:
* Um cronograma detalhado, com marcos e prazos definidos para cada etapa do projeto, deve ser elaborado e aprovado.

5. Estrutura de Riscos Preparada:
* Um plano de gerenciamento de riscos, identificando possíveis problemas e como lidar com eles, deve estar em vigor antes do início das atividades.

## 3. ESTIMATIVA DE PRAZO


**3.1 Prazo previsto (horas):** 1.064

**3.2 Data prevista de início: 05/08/2024**
**3.3 Data prevista de término: 16/12/2024**

## 4. ESTIMATIVA DE CUSTO

| **Item de custo** | **Qtd. horas** | **Valor / hora** | **Valor total** |
| --- | --- | --- | --- |
| **4.1 Recursos Humanos** *(Desenvolvedores, Designers, Gerente de Projeto)* | 1.064 | R$ 22,00 | R$ 23.408,00 |
| - Desenvolvedores (Node.js, Flutter, Vue.js) | 900 horas | R$ 22,00 | R$ 19.800,00 |
| - Gerente de Projeto | 164 horas | R$ 22,00 | R$ 3.608,00 |
| **4.2 Hardware** *(Servidores, Equipamentos de Desenvolvimento)* | N/A | N/A | R$ 5.000,00 |
| - Servidores locais para desenvolvimento | N/A | N/A | R$ 3.500,00 |
| - Equipamentos de desenvolvimento (laptops, monitores) | N/A | N/A | R$ 1.500,00 |
| **4.3 Rede e serviços de hospedagem** *(AWS, Domínio, Certificados SSL)* | N/A | N/A | R$ 1.500,00 |
| - AWS (nuvem para hospedagem, storage) | N/A | N/A | R$ 1.000,00 |
| - Registro de domínio e certificados SSL | N/A | N/A | R$ 500,00 |
| **4.4 Software de terceiros** *(Licenças de Software, APIs, Ferramentas de Desenvolvimento)* | N/A | N/A | R$ 2.000,00 |
| - Licenças (APIs de pagamento, analítica, etc.) | N/A | N/A | R$ 2.000,00 |
| **4.5 Serviços e treinamento** *(Treinamento de Equipe, Consultorias)* | N/A | N/A | R$ 2.000,00 |
| - Treinamento em novas ferramentas e frameworks | N/A | N/A | R$ 2.000,00 |
| **4.6 Total Geral:** | 1.064 horas | | **R$ 33.908,00** |



## 5. PARTES INTERESSADAS

| Nome           | Papel no projeto | Assinatura |
| -------------- | ---------------- | ---------- |
| Não se aplica  | Gestor           |            |
| Não se aplica  | Operador         |            |
| Não se aplica  | Estoque          |            |



**Observações:**

- As estimativas de prazo e custo são aproximadas e podem variar ao longo do projeto, devendo ser revistas após o detalhamento dos requisitos.

- Este documento, após ser completamente preenchido, deve ser assinado pelos responsáveis do projeto (gestores envolvidos).

- Este documento, se aprovado na **reunião de** _ **kickoff** _, autoriza o início do projeto de acordo com a especificação supra e as normas da empresa.
