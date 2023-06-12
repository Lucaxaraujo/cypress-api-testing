describe('POST /sessions', () => {

  it('user session', () => {
    const userData = {
      name: 'Chris Bumstead',
      email: 'cbum@gmail.com',
      password: 'teste123'
    }

    cy.task('deleteUser', userData.email)
    cy.postUser(userData)

    cy.postSession(userData)
      .then(response => {
        expect(response.status).to.eq(200)
        
        const { user, token } = response.body

        expect(user.name).to.eq(userData.name)
        expect(user.email).to.eq(userData.email)
        expect(token).not.to.be.empty
      })
  })

  it('invalid password', () => {
    const user = {
      email: 'teste@gmail.com',
      password: 'invalidpass'
    }

    cy.postSession(user)
      .then(response => {
        expect(response.status).to.eq(401)
      })
  })

  it('email not found', () => {
    const user = {
      email: '401@gmail.com',
      password: 'teste123'
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
    body: { email: user.email, password: user.password },
    failOnStatusCode: false
  }).then(response => { return response })
})