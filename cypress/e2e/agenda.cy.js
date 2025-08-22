import { faker } from '@faker-js/faker/locale/pt_BR'

describe('Gerenciador de Passeio Pet', () => {
  beforeEach(() => 
  cy.visit('http://localhost:3004'))

  // Helper para gerar data e hora
  const gerarData = (min = 30) => {
    const d = new Date()
    d.setMinutes(d.getMinutes() + min)
    return {
      data: d.toISOString().split('T')[0],
      hora: `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
    }
  }

  it('TC01 - Agendar passeio', () => {
    const { data, hora } = gerarData(60)
    cy.get('#walk-date').type(data)
    cy.get('#walk-time').type(hora)
    cy.get('#schedule-btn').click()
    cy.get('#message-box').should('contain', 'agendado')
  })

  it('TC02 - Rejeitar agendamento < 10min', () => {
    const { data, hora } = gerarData(5)
    cy.get('#walk-date').type(data)
    cy.get('#walk-time').type(hora)
    cy.get('#schedule-btn').click()
    cy.get('#message-box').should('contain', 'menos de 10 minutos')
  })

  it('TC03 - Gerenciar passeio', () => {
    cy.get('#start-btn').click()
    cy.get('#message-box').should('contain', 'iniciado')
    cy.get('#finalizar-btn').click()
    cy.get('#message-box').should('contain', 'concluído')
  })

  it('TC04 - Gerenciar histórico', () => {
    // Agendar e remover
    cy.get('#walk-date').type(faker.date.future().toISOString().split('T')[0])
    cy.get('#walk-time').type('14:00')
    cy.get('#schedule-btn').click()
    cy.get('.delete-btn').first().click({ force: true })
    cy.get('#message-box').should('contain', 'removido')
  })

  it('TC05 - Registrar múltiplos passeios', () => {
    // Agendar 3 passeios
    for (let i = 0; i < 3; i++) {
      cy.get('#walk-date').clear().type(faker.date.future().toISOString().split('T')[0])
      cy.get('#walk-time').clear().type(`${faker.number.int({ min: 8, max: 18 })}:00`)
      cy.get('#schedule-btn').click()
    }
    cy.get('#scheduled-list li').should('have.length.at.least', 3)
  })
  
  it('TC06 - Limpar histórico', () => {
    const { data, hora } = gerarData(60)
    cy.get('#walk-date').type(data)
    cy.get('#walk-time').type(hora)
    cy.get('#schedule-btn').click()
    cy.get('#clear-history-btn').click()
    cy.get('#scheduled-list').should('be.empty')
  })
})