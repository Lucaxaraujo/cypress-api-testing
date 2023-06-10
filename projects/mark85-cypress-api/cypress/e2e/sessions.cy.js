describe('POST /sessions' , () => {

  it('user session', () => {
    const user = {
      email: "teste@gmail.com",
      password: "teste123"
    }

    cy.postSession(user)
      .then(response => {
        expect(response.status).to.eq(200)
      })
  })

  it('invalid password', () => {
    const user = {
      email: "teste@gmail.com",
      password: "invalidpass"
    }

    cy.postSession(user)
      .then(response => {
        expect(response.status).to.eq(401)
      })
  })

  it('email not found', () => {
    const user = {
      email: "401@gmail.com",
      password: "teste123"
    }

    cy.postSession(user)
      .then(response => {
        expect(response.status).to.eq(401)
      })
  })
})

Cypress.Commands.add('postSession', (user) => {
  cy.api({
    url: '/sessions',
    method: 'POST',
    body: user,
    failOnStatusCode: false
  }).then(response => {return response})
})