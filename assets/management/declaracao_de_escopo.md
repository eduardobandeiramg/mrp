# Declaração de Escopo - PROJETO


**Gerentes de Projeto:**

* Daniel Estevam Pacheco de Souza, 1381298@sga.pucminas.br
* Eduardo Bandeira de Melo Guimarães, 1336504@sga.pucminas.br
* Eric Rodrigues Diniz, 1283264@sga.pucminas.br
* Lucas Machado de Oliveira Andrade, 1377053@sga.pucminas.br
* Mariana Eliza Alves Costa, 1078276@sga.pucminas.br
* Vítor Lion Guimarães Rodrigues, 1323991@sga.pucminas.br

---

**Professores:**

* Prof. Hugo Bastos de Paula
* Prof. Cleiton Silva Tavares
* Prof. Ramon Lacerda Marques

---

_Curso de Engenharia de Software, Unidade Praça da Liberdade_

_Instituto de Informática e Ciências Exatas – Pontifícia Universidade de Minas Gerais (PUC MINAS), Belo Horizonte – MG – Brasil_

---


### Descrição do Escopo
O projeto tem como objetivo desenvolver um sistema MRP (Manufacturing Resource Planning) para gerenciar de forma eficiente o planejamento de recursos em uma linha de produção, abrangendo desde o cadastro de produtos e materiais até o controle de estoque e comunicação em tempo real entre setores.

### Requisitos (do produto e/ou do projeto)
- Cadastro de produtos, materiais e hierarquias via interface web.
- Adição e remoção de peças no estoque através de aplicativo móvel.
- Apontamento do início e fim da construção de produtos pelos operadores.
- Envio de alertas automáticos para usuários via web e mobile.
- Solicitação de peças pelos operadores diretamente do chão de fábrica.
- Planejamento de operações e gestão de operadores via interface web.
- Gestão de peças críticas com ações corretivas.
- Sinalização de defeitos e solicitação de peças extras pelos operadores.
- Cadastro de linhas e postos de montagem por gestores.
- Comunicação em tempo real utilizando serviços de mensageria (Kafka).

### Entregáveis
- Sistema MRP funcional com todas as funcionalidades descritas nos requisitos.
- Aplicativo móvel para o pessoal do estoque e operadores.
- Interface web para gestores.
- Documentação completa do sistema, incluindo manual de uso e guia de instalação.

### Limites
- O sistema será desenvolvido apenas para ambientes web e mobile.
- Integração com sistemas externos ou legados está fora do escopo atual.
- Não inclui funcionalidades de inteligência artificial para previsões avançadas.

### Restrições
- O desenvolvimento será realizado em tecnologias específicas: Front-end em Vue.js, Back-end em Spring Boot, Mobile em Flutter, e banco de dados MariaDB.
- O projeto deve ser concluído dentro do prazo estabelecido, sem extensões de prazo.
- Orçamento limitado, com foco em soluções de baixo custo.

### Premissas
- A equipe de desenvolvimento terá acesso contínuo aos recursos necessários, incluindo ferramentas de desenvolvimento e ambiente de testes.
- Os requisitos não sofrerão mudanças significativas durante o período de desenvolvimento.
- Haverá comunicação contínua e clara entre todos os stakeholders para garantir o alinhamento do projeto.

### Marcos agendados

| Nome do Marco                       | Entregáveis Previstos |
|-------------------------------------|-----------------------|
| **Início do Desenvolvimento**       | Configuração do ambiente, primeiras implementações do back-end e front-end |
| **Primeira Entrega Parcial**        | Cadastro de produtos e materiais, funcionalidades básicas de estoque |
| **Entrega Final**                   | Sistema completo e testado, incluindo todas as funcionalidades, documentação e treinamento de usuários |
