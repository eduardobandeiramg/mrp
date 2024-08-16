# MRP


* Daniel Estevam Pacheco de Souza, 1381298@sga.pucminas.br
* Eduardo Bandeira de Melo Guimarães, 	1336504@sga.pucminas.br
* Eric Rodrigues Diniz, 1283264@sga.pucminas.br

* Lucas Machado de Oliveira Andrade, 1377053@sga.pucminas.br
* Mariana Eliza Alves Costa, 1078276@sga.pucminas.br
* Vítor Lion Guimarães Rodrigues, 1323991@sga.pucminas.br
---

Professores:

* Hugo Bastos de Paula
* Cleiton Silva Tavares
* Ramon Lacerda Marques


---

_Curso de Engenharia de Software, Unidade Praça da Liberdade_

_Instituto de Informática e Ciências Exatas – Pontifícia Universidade de Minas Gerais (PUC MINAS), Belo Horizonte – MG – Brasil_

---

_**Resumo**. Este projeto visa o desenvolvimento de um sistema de Manufacturing Resource Planning (MRP) focado na otimização e automação dos processos de planejamento de recursos em uma linha de produção. O sistema oferece funcionalidades essenciais, como cadastro e gestão de produtos, materiais, e hierarquias, bem como controle de estoque e gestão de operadores, acessíveis tanto via web quanto dispositivos móveis. A solução incorpora serviços de mensageria utilizando Kafka, autenticação segura com JWT, e testes automatizados para garantir a robustez e confiabilidade do sistema. Como resultado, o sistema promete melhorar a eficiência operacional, reduzir custos e garantir a disponibilidade de materiais, proporcionando uma visão centralizada e estratégica das operações de manufatura._

---

## Histórico de Revisões

| **Data** | **Autor** | **Descrição** | **Versão** |
| --- | --- | --- | --- |
| **[dd/mm/aaaa]** | [Nome do autor] | [Descrever as principais alterações realizadas no documento, evidenciando as seções ou capítulos alterados] | [X] |
| **[15/08/2024]** | [Eric Rodrigues Diniz] | [Alteração do nome do projeto, nome dos alunos, sumário. Criação do resumo, histórico de versões, requisitos funcionais e não funcionais.] | [1.0] |
| **[15/08/2024]** | [Eric Rodrigues Diniz] | [Alteração da seção 1: apresentação, problema, objetivos do trabalho. Em seguida, seção 2.3: Restrições Arquiteturais, e seção 2.4: Mecanismos Arquiteturais] | [1.1] |
| **[16/08/2024]** | [Mariana ELiza Alves Costa] | [Adição de detalhes sobre o uso de Flutter para mobile] | [1.2]      |

| | | | |
| | | | |

## SUMÁRIO

1. [Apresentação](#apresentacao "Apresentação") <br />
	1.1. Problema <br />
	1.2. Objetivos do trabalho <br />
	1.3. Definições e Abreviaturas <br />

2. [Requisitos](#requisitos "Requisitos") <br />
	2.1. Requisitos Funcionais <br />
	2.2. Requisitos Não-Funcionais <br />
	2.3. Restrições Arquiteturais <br />
	2.4. Mecanismos Arquiteturais <br />

3. [Modelagem](#modelagem "Modelagem e projeto arquitetural") <br />
	3.1. Visão de Negócio <br />
	3.2. Visão Lógica <br />
	3.3. Modelo de dados (opcional) <br />

4. [Solução](#solucao "Projeto da Solução") <br />

5. [Avaliação](#avaliacao "Avaliação da Arquitetura") <br />
	5.1. Cenários <br />
	5.2. Avaliação <br />

6. [Referências](#referencias "REFERÊNCIAS")<br />

7. [Apêndices](#apendices "APÊNDICES")<br />


<a name="apresentacao"></a>
# 1. Apresentação

O projeto de desenvolvimento de um sistema Manufacturing Resource Planning (MRP) surge como uma resposta às crescentes demandas das indústrias por eficiência operacional e otimização de recursos. Em um contexto onde a gestão de estoques e a sincronização das operações de produção são cruciais, muitas empresas enfrentam desafios significativos, como o risco de rupturas de estoque ou, inversamente, a acumulação excessiva de materiais. Estes problemas não apenas afetam a produtividade, mas também impactam diretamente os custos operacionais.

Estudos mostram que até 65% dos consumidores procuram alternativas em outras lojas quando não encontram um produto disponível, evidenciando a importância de uma gestão de estoques precisa e eficiente. O modelo tradicional de produção, como o Just in Time (JIT) e o Sistema Toyota de Produção (STP), embora eficazes, dependem fortemente de uma comunicação ágil e precisa entre diferentes setores da empresa, algo que muitas vezes falta nas operações modernas.

Neste cenário, o sistema MRP proposto visa não apenas a centralização e otimização do controle de inventário, mas também a melhoria na comunicação entre as áreas de produção, estoque, e compras. Com uma abordagem orientada a dados e uma integração em tempo real, o sistema promete reduzir custos, evitar perdas por rupturas e aprimorar a eficiência operacional das empresas, tornando-se uma ferramenta essencial para a gestão moderna de cadeias de suprimentos.


## 1.1. Problema

A falta de visibilidade em tempo real sobre o inventário e a comunicação ineficiente entre os setores de produção, estoque e compras nas indústrias resultam em dois problemas principais: rupturas de estoque, que interrompem o fluxo de produção e impactam a satisfação do cliente, e o acúmulo excessivo de materiais, que aumenta os custos operacionais e causa desperdício. Esses desafios são exacerbados pela ausência de sistemas integrados que prevejam com precisão as necessidades de materiais, levando a ineficiências operacionais que comprometem a competitividade das empresas no mercado.

## 1.2. Objetivos do trabalho

O objetivo geral deste trabalho é apresentar a descrição detalhada do projeto arquitetural de um sistema de Manufacturing Resource Planning (MRP), projetado para otimizar e automatizar o planejamento de recursos em uma linha de produção. Este sistema visa proporcionar uma solução eficiente para os desafios de gestão de estoque e sincronização de operações, abordando problemas críticos como rupturas de estoque e acúmulo excessivo de materiais.

Os objetivos específicos deste projeto incluem:

* Desenvolver uma arquitetura que integre de forma eficaz as funções de controle de inventário, gestão de ordens de produção e previsão de demanda, garantindo uma visão centralizada das operações de manufatura.
* Detalhar a implementação de serviços de mensageria em tempo real utilizando Kafka, para assegurar a comunicação dinâmica e eficiente entre os setores de produção, estoque e compras.
* Apresentar as estratégias de autenticação e segurança da aplicação, com foco no uso de senhas hash e login via JWT, para proteger as informações críticas do sistema.
* Explorar as abordagens para testes automatizados, incluindo testes unitários com JEST e testes de ponta a ponta utilizando PLAYWRIGHT, com o intuito de garantir a confiabilidade e robustez do sistema em diferentes cenários de uso.

## 1.3. Definições e Abreviaturas

Coloque aqui as definições, siglas e abreviaturas utilizadas no trabalho._

<a name="requisitos"></a>
# 2. Requisitos

_Esta seção descreve os requisitos comtemplados nesta descrição arquitetural, divididos em dois grupos: funcionais e não funcionais._

## 2.1. Requisitos Funcionais

_Enumere os requisitos funcionais previstos para a sua aplicação. Concentre-se nos requisitos funcionais que sejam críticos para a definição arquitetural. Lembre-se de listar todos os requisitos que são necessários para garantir cobertura arquitetural. Esta seção deve conter uma lista de requisitos ainda sem modelagem. Na coluna Prioridade utilize uma escala (do mais prioritário para o menos): Essencial, Desejável, Opcional._

| **ID** | **Descrição** | **Prioridade** | **Plataforma** | **Tipo Usuário**
| --- | --- | --- | --- | --- |
| RF001 | Cadastro dos produtos | Obrigatório | _web_ | Gestor |
| RF002 | Cadastro dos materiais | Obrigatório | _web_ | Gestor |
| RF003 | Cadastro de hierarquia | Obrigatório | _web_ | Gestor |
| RF004 | Adição de estoque | Obrigatório | _mobile_ | Estoque |
| RF005 | Saída de peças | Obrigatório | _mobile_ | Estoque |
| RF006 | Apontamento do fim da construção | Obrigatório | _mobile_ | Operador |
| RF007 | Serviço de alerta | Obrigatório | _web e mobile_ | Todos |
| RF008 | Solicitação de peças | Obrigatório | _mobile_ | Operador |
| RF009 | Planejamento da operação | Desejável | _web_ | Gestor |
| RF010 | Gestão do operadores | Desejável | _web_ | Gestor |
| RF011 | Gestão de peças críticas | Desejável | _web_ | Gestor |
| RF012 | Apontamento do início da construção | Desejável | _mobile_ | Operador |
| RF013 | Solicitação de peça extra | Opcional | _mobile_ | Operador |
| RF014 | Sinalização de defeitos | Opcional | _mobile_ | Estoque |
| RF015 | Cadastro de linha de montagem | Opcional | _web_ | Gestor |
| RF016 | Cadastro de posto de montagem | Opcional | _web_ | Gestor |
| | | | |
| | | | |

Obs: acrescente mais linhas, se necessário.

## 2.2. Requisitos Não-Funcionais

_Enumere os requisitos não-funcionais previstos para a sua aplicação. Entre os requisitos não funcionais, inclua todos os requisitos que julgar importante do ponto de vista arquitetural ou seja os requisitos que terão impacto na definição da arquitetura. Os requisitos devem ser descritos de forma completa e preferencialmente quantitativa._

| **ID** | **Descrição** |
| --- | --- |
| RNF001 | Serviços de mensageria utilizando kafka |
| RNF002 | Senhas utilizando via hash |
| RNF003 | Login utilizando JWT |
| RNF004 | Testes unitários utilizando JEST |
| RNF005 | Testes de ponta a ponta utilizando PLAYWRIGHT |


Obs: acrescente mais linhas, se necessário.

## 2.3. Restrições Arquiteturais

As restrições arquiteturais impostas ao projeto, que limitam as soluções candidatas e devem ser consideradas no desenvolvimento do sistema MRP, são as seguintes:

- O software deverá ser desenvolvido em NodeJS para o backend, que oferece suporte robusto para criação de serviços web escaláveis.
- A interface do usuário para a web deverá ser implementada em Vue.js, garantindo uma experiência de usuário interativa e responsiva.
- A interface para dispositivos móveis deverá ser desenvolvida utilizando Flutter, permitindo a criação de uma aplicação multiplataforma com desempenho próximo ao nativo.
- A comunicação da API entre frontend e backend deve seguir o padrão RESTful, facilitando a integração e a interoperabilidade entre os diferentes componentes do sistema.
- O sistema de mensageria deve ser implementado utilizando Apache Kafka, para assegurar a entrega de mensagens em tempo real e a alta disponibilidade do sistema.
- As credenciais dos usuários devem ser armazenadas utilizando hashing seguro, preferencialmente com bcrypt, garantindo a proteção dos dados sensíveis.
- O mecanismo de autenticação e autorização deve ser baseado em JSON Web Tokens (JWT), proporcionando uma maneira segura e escalável de gerenciar sessões de usuários.
- A solução deve ser hospedada em serviços de nuvem, utilizando AWS, aproveitando seus recursos para escalabilidade, segurança e disponibilidade contínua.
- Os testes automatizados devem ser conduzidos utilizando JEST para testes unitários e PLAYWRIGHT para testes de ponta a ponta, assegurando a qualidade e a funcionalidade do sistema em diferentes ambientes de uso.

## 2.4. Mecanismos Arquiteturais

| **Análise**           | **Design**                          | **Implementação**                     |
|:------------------|:--------------------------------|:----------------------------------|
| Persistência      | ORM                             | Hibernate                         |
| Front end         | Single Page Application (SPA)   | Vue.js                            |
| Mobile            | Dispositivo móvel               | Flutter                           |
| Back end          | Framework Web para APIs RESTful | Node.js                           |
| Integração        | APIs RESTful                    | Axios        		         	  |
| Log do sistema    | Logging Framework               | Logback                           |
| Teste de Software | Test-Driven Development (TDD)   | Jest e Playwright 				  |
| Deploy            | CI/CD Pipelines                 | AWS                     		  |



<a name="modelagem"></a>
# 3. Modelagem e Projeto Arquitetural

_Apresente uma visão geral da solução proposta para o projeto e explique brevemente esse diagrama de visão geral, de forma textual. Esse diagrama não precisa seguir os padrões da UML, e deve ser completo e tão simples quanto possível, apresentando a macroarquitetura da solução._

![Visão Geral da Solução](imagens/visao.png "Visão Geral da Solução")

**Figura 1 - Visão Geral da Solução (fonte: https://medium.com)**

Obs: substitua esta imagem por outra, adequada ao seu projeto (cada arquitetura é única).

## 3.1. Visão de Negócio (Funcionalidades)

_Apresente uma lista simples com as funcionalidades previstas no projeto (escopo do produto)._

1. O sistema deve...
2. O sistema deve...
3. ...

Obs: a quantidade e o escopo das funcionalidades deve ser negociado com os professores/orientadores do trabalho.

### Histórias de Usuário

_Nesta seção, você deve descrever estórias de usuários seguindo os métodos ágeis. Lembre-se das características de qualidade das estórias de usuários, ou seja, o que é preciso para descrever boas histórias de usuários._

Exemplos de Histórias de Usuário:

- Como Fulano eu quero poder convidar meus amigos para que a gente possa se reunir...

- Como Cicrano eu quero poder organizar minhas tarefas diárias, para que...

- Como gerente eu quero conseguir entender o progresso do trabalho do meu time, para que eu possa ter relatórios periódicos dos nossos acertos e falhas.

## 3.2. Visão Lógica

_Apresente os artefatos que serão utilizados descrevendo em linhas gerais as motivações que levaram a equipe a utilizar estes diagramas._

### Diagrama de Classes

![Diagrama de classes](imagens/classes.gif "Diagrama de classes")


**Figura 2 – Diagrama de classes (exemplo). Fonte: o próprio autor.**

Obs: Acrescente uma breve descrição sobre o diagrama apresentado na Figura 3.

### Diagrama de componentes

_Apresente o diagrama de componentes da aplicação, indicando, os elementos da arquitetura e as interfaces entre eles. Liste os estilos/padrões arquiteturais utilizados e faça uma descrição sucinta dos componentes indicando o papel de cada um deles dentro da arquitetura/estilo/padrão arquitetural. Indique também quais componentes serão reutilizados (navegadores, SGBDs, middlewares, etc), quais componentes serão adquiridos por serem proprietários e quais componentes precisam ser desenvolvidos._

![Diagrama de componentes](imagens/componentes.png "Diagrama de componentes")

**Figura 3 – Diagrama de Componentes (exemplo). Fonte: o próprio autor.**

_Apresente uma descrição detalhada dos artefatos que constituem o diagrama de implantação._

Ex: conforme diagrama apresentado na Figura X, as entidades participantes da solução são:

- **Componente 1** - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nunc magna, accumsan eget porta a, tincidunt sed mauris. Suspendisse orci nulla, sagittis a lorem laoreet, tincidunt imperdiet ipsum. Morbi malesuada pretium suscipit.
- **Componente 2** - Praesent nec nisi hendrerit, ullamcorper tortor non, rutrum sem. In non lectus tortor. Nulla vel tincidunt eros.

## 3.3. Modelo de dados (opcional)

_Caso julgue necessário para explicar a arquitetura, apresente o diagrama de classes ou diagrama de Entidade/Relacionamentos ou tabelas do banco de dados. Este modelo pode ser essencial caso a arquitetura utilize uma solução de banco de dados distribuídos ou um banco NoSQL._

![Diagrama de Entidade Relacionamento (ER) ](imagens/der.png "Diagrama de Entidade Relacionamento (ER) ")

**Figura 4 – Diagrama de Entidade Relacionamento (ER) - exemplo. Fonte: o próprio autor.**

Obs: Acrescente uma breve descrição sobre o diagrama apresentado na Figura 3.

<a name="solucao"></a>
# 4. Projeto da Solução

_Apresente as telas dos sistema construído com uma descrição sucinta de cada uma das interfaces._

<a name="avaliacao"></a>
# 5. Avaliação da Arquitetura

_Esta seção descreve a avaliação da arquitetura apresentada, baseada no método ATAM._

## 5.1. Cenários

_Apresente os cenários de testes utilizados na realização dos testes da sua aplicação. Escolha cenários de testes que demonstrem os requisitos não funcionais sendo satisfeitos. Os requisitos a seguir são apenas exemplos de possíveis requisitos, devendo ser revistos, adequados a cada projeto e complementados de forma a terem uma especificação completa e auto-explicativa._

**Cenário 1 - Acessibilidade:** Suspendisse consequat consectetur velit. Sed sem risus, dictum dictum facilisis vitae, commodo quis leo. Vivamus nulla sem, cursus a mollis quis, interdum at nulla. Nullam dictum congue mauris. Praesent nec nisi hendrerit, ullamcorper tortor non, rutrum sem. In non lectus tortor. Nulla vel tincidunt eros.

**Cenário 2 - Interoperabilidade:** Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce ut accumsan erat. Pellentesque in enim tempus, iaculis sem in, semper arcu.

**Cenário 3 - Manutenibilidade:** Phasellus magna tellus, consectetur quis scelerisque eget, ultricies eu ligula. Sed rhoncus fermentum nisi, a ullamcorper leo fringilla id. Nulla lacinia sem vel magna ornare, non tincidunt ipsum rhoncus. Nam euismod semper ante id tristique. Mauris vel elit augue.

**Cenário 4 - Segurança:** Suspendisse consectetur porta tortor non convallis. Sed lobortis erat sed dignissim dignissim. Nunc eleifend elit et aliquet imperdiet. Ut eu quam at lacus tincidunt fringilla eget maximus metus. Praesent finibus, sapien eget molestie porta, neque turpis congue risus, vel porttitor sapien tortor ac nulla. Aliquam erat volutpat.

## 5.2. Avaliação

_Apresente as medidas registradas na coleta de dados. O que não for possível quantificar apresente uma justificativa baseada em evidências qualitativas que suportam o atendimento do requisito não-funcional. Apresente uma avaliação geral da arquitetura indicando os pontos fortes e as limitações da arquitetura proposta._

| **Atributo de Qualidade:** | Segurança |
| --- | --- |
| **Requisito de Qualidade** | Acesso aos recursos restritos deve ser controlado |
| **Preocupação:** | Os acessos de usuários devem ser controlados de forma que cada um tenha acesso apenas aos recursos condizentes as suas credenciais. |
| **Cenários(s):** | Cenário 4 |
| **Ambiente:** | Sistema em operação normal |
| **Estímulo:** | Acesso do administrador do sistema as funcionalidades de cadastro de novos produtos e exclusão de produtos. |
| **Mecanismo:** | O servidor de aplicação (Rails) gera um _token_ de acesso para o usuário que se autentica no sistema. Este _token_ é transferido para a camada de visualização (Angular) após a autenticação e o tratamento visual das funcionalidades podem ser tratados neste nível. |
| **Medida de Resposta:** | As áreas restritas do sistema devem ser disponibilizadas apenas quando há o acesso de usuários credenciados. |

**Considerações sobre a arquitetura:**

| **Riscos:** | Não existe |
| --- | --- |
| **Pontos de Sensibilidade:** | Não existe |
| _ **Tradeoff** _ **:** | Não existe |

Evidências dos testes realizados

_Apresente imagens, descreva os testes de tal forma que se comprove a realização da avaliação._

<a name="referencias"></a>
# 6. REFERÊNCIAS

_Como um projeto da arquitetura de uma aplicação não requer revisão bibliográfica, a inclusão das referências não é obrigatória. No entanto, caso você deseje incluir referências relacionadas às tecnologias, padrões, ou metodologias que serão usadas no seu trabalho, relacione-as de acordo com a ABNT._

Verifique no link abaixo como devem ser as referências no padrão ABNT:

http://www.pucminas.br/imagedb/documento/DOC\_DSC\_NOME\_ARQUI20160217102425.pdf


**[1]** - _ELMASRI, Ramez; NAVATHE, Sham. **Sistemas de banco de dados**. 7. ed. São Paulo: Pearson, c2019. E-book. ISBN 9788543025001._

**[2]** - _COPPIN, Ben. **Inteligência artificial**. Rio de Janeiro, RJ: LTC, c2010. E-book. ISBN 978-85-216-2936-8._

**[3]** - _CORMEN, Thomas H. et al. **Algoritmos: teoria e prática**. Rio de Janeiro, RJ: Elsevier, Campus, c2012. xvi, 926 p. ISBN 9788535236996._

**[4]** - _SUTHERLAND, Jeffrey Victor. **Scrum: a arte de fazer o dobro do trabalho na metade do tempo**. 2. ed. rev. São Paulo, SP: Leya, 2016. 236, [4] p. ISBN 9788544104514._

**[5]** - _RUSSELL, Stuart J.; NORVIG, Peter. **Inteligência artificial**. Rio de Janeiro: Elsevier, c2013. xxi, 988 p. ISBN 9788535237016._


<a name="apendices"></a>
# 7. APÊNDICES

_Inclua o URL do repositório (Github, Bitbucket, etc) onde você armazenou o código da sua prova de conceito/protótipo arquitetural da aplicação como anexos. A inclusão da URL desse repositório de código servirá como base para garantir a autenticidade dos trabalhos._
