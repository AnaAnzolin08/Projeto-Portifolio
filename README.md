

###Gerenciador de pet -  Express + LocalStorage (sem banco)

Aplicação web para agendar passeios de pets e manter o histórico no LocalStorage do navegador. O servidor Express apenas serve arquivos estáticos.

## Requisitos
- Node.js 18+
- npm

## Como executar
```bash
npm install
npm start
# abra http://localhost:3000




## Estrutura do Projeto

```
ProjetoPet/
├── public/
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── server.js
├── package.json
├── README.md
├── cypress/
│   ├── e2e/
│   │   └── pet_walker_tests.cy.js
│   ├── fixtures/
│   │   └── test_data.json
│   └── support/
│       ├── commands.js
│       └── e2e.js
└── k6/
    └── performance_tests.js

```

## Funcionalidades

- Agendar passeio (data e hora)
- Iniciar e finalizar passeios
- Cronômetro para acompanhar duração do passeio
- Listar histórico com filtro por mês
- Excluir item e limpar histórico

## LocalStorage

Os dados dos passeios são armazenados localmente no navegador:

- Chave: `passeio:rides`
- Estrutura do item: `{ id, date, time, createdAt, status, endTime, duration }`

## Testes Automatizados

### Cypress

Framework de teste end-to-end para validar os principais fluxos do usuário:

```bash
# Instalar Cypress e dependências
npm install cypress @faker-js/faker --save-dev

# Executar testes via interface gráfica
npx cypress open

# Executar testes via linha de comando
npx cypress run

# Executar testes específicos
npx cypress run --spec "cypress/e2e/pet_walker_tests.cy.js"

```

### Estrutura dos Testes Cypress

- Verificação de agendamento de passeios
- Validação da rejeição para agendamentos com menos de 10 minutos
- Teste do fluxo completo de iniciar e finalizar passeios
- Validação da remoção de agendamentos
- Verificação da funcionalidade de limpar histórico

### Uso da Biblioteca Faker

A biblioteca @faker-js/faker é utilizada para gerar dados de teste dinâmicos:

```jsx

```

### K6 - Testes de Performance

Ferramenta para validar a resposta da aplicação sob carga:

### Cenários de Teste K6

- Validação de agendamento de múltiplos passeios
- Teste de usabilidade
- Verificação da persistência de dados no LocalStorage
-

## Bugs Conhecidos

- Bug #1: Permite iniciar passeio com apenas horário sem data
- Bug #2: Falha na validação de tempo mínimo (10 min)
- Bug #3: Botão "Limpar Histórico" sempre visível mesmo sem dados
- Bug #4: Problemas com botão de exclusão (requer uso de {force: true} nos testes)
- Bug #5: Problemas ocorrem após o agendamento de horário e data
- Bug #6: Ao atualizar a página, o histórico é automaticamente apagado

## Referências

- [Cypress](https://www.cypress.io/) - Framework de teste E2E
- [Faker](https://fakerjs.dev/) - Biblioteca para geração de dados de teste
- [K6](https://k6.io/) - Ferramenta de teste de performance
- [Express](https://expressjs.com/) - Framework web para Node.js
