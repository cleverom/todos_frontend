/// <reference types="cypress" />


describe('EukaPay to-do app', () => {
  context("EukaPay todo", () => {
    beforeEach(() => {
   
    cy.visit('http://localhost:4000/privateSection')
  })


  it('displays two todo items by default', () => {
    
    cy.get("[data-cy=list]").should('have.length', 3)
    cy.get("[data-cy=list]").first().should('have.text', 'ify')
    cy.get("[data-cy=list]").last().should('have.text', 'beans')
    // cy.get(".css-1qvr50w-MuiTypography-root").contains("Login to your account");
  })

  it('can add new todo items', () => {
    // We'll store our item text in a variable so we can reuse it
    const newItem = 'Feed the cat'

    
    cy.get('[data-cy="todo"]').type(`${newItem}{enter}`)

   
    cy.get("[data-cy=list]")
      .should('have.length', 4)
      .last()
      .should('have.text', newItem)
  })

  it('can check off an item as completed', () => {
    
    cy.contains('ify')
      .parent()
      .find("[data-cy=check]")
      .check()

    cy.contains('ify')
      .parents('li')
      .should('have.class', 'items')
  })

  context('with a checked task', () => {
    beforeEach(() => {
      cy.contains('ify')
        .parent()
        .find("[data-cy=check]")
        .check()
    })


      })
})
})
