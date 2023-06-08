describe('POST /users', () => {
  it('register a new user', () => {
    const user = {
      name: 'Cypress request',
      email: 'cyrequest@gmail.com',
      password: 'teste123'
    }

    cy.task('deleteUser', user.email)

    cy.postUser(user)
      .then(response => {
        expect(response.status).to.eq(200)
      })
  })

  it.only('Check duplicated email', () => {
    const user = {
      name: 'Teste',
      email: 'teste@gmail.com',
      password: 'teste123'
    }

    cy.task('deleteUser', user.email)

    cy.postUser(user)

    cy.postUser(user)
      .then(response => {
        expect(response.status).to.eq(409)
        expect(response.body.message).to.eq('Duplicated email!')        
      })
  })
})

