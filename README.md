

# Aplicação Pet Walker App — Express + LocalStorage (sem banco)

Aplicação web para agendar passeios de pets e manter o histórico no LocalStorage do navegador. O servidor Express apenas serve arquivos estáticos.

## Requisitos
- Node.js 18+
- npm

## Como executar
```bash
npm install
npm start
# abra http://localhost:3000
```

## Estrutura
ProjetoPet/
- public/
  - index.html
  - styles.css
  - app.js
- server.js
- package.json
- README.md
- cypress/
  - e2e/
    - pet_walker_tests.cy.js
  - fixtures/
    - test_data.json
- k6/
  - performance_tests.js

## Funcionalidades
- Agendar passeio (data e hora)
- Iniciar e finalizar passeios
- Cronômetro para acompanhar duração do passeio
- Listar histórico com filtro por mês
- Excluir item e limpar histórico

## LocalStorage
- Chave: `passeio:rides`
- Item: `{ id, date, time, createdAt, status, endTime, duration }`

## Testes Automatizados
Para rodar o servidor  -npm run mock-server

npm run
### Cypress
Testes de interface para validar os principais fluxos do usuário:
```bash
# Instalar dependências de teste
npm install cypress --save-dev

# Executar testes Cypress via interface
npx cypress open

# Executar testes Cypress via e2e
npx cypress run
```

### K6
Testes de performance para validar a resposta da aplicação sob carga:
```bash
# Instalar k6
npm install k6 --save-dev

# Executar testes de performance
k6 run k6/performance_tests.js
K6 relatorio -start html-report.html$env:K6_WEB_DASHBOARD="true $env:
K6_WEB_DASHBOARD_EXPORT="html-report.html"k6 run "Script"
```

Cenários de teste incluem:
- Validação de agendamento de múltiplos passeios
- Teste de usabilidade do cronômetro
- Verificação da persistência de dados no LocalStorage
- Teste de performance 

## Referência
- https://gemini.google.com/app/a43e61e448fbd296
- https://www.cypress.io/
- https://k6.io/