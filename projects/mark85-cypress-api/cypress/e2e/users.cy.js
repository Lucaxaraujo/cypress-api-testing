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

  it('Check duplicated email', () => {
    const user = {
      name: 'Teste',
      email: 'teste@gmail.com',
      password: 'teste123'
    }

    cy.task('deleteUser', user.email)

    cy.postUser(user)

    cy.postUser(user)
      .then(response => {
        const { message } = response.body

        expect(response.status).to.eq(409)
        expect(message).to.eq('Duplicated email!')
      })
  })

  context.only('required fields', () => {
    const user = {
      name: 'Lucas Araujo',
      email: 'teste2@gmail.com',
      password: 'teste123'
    }

    it('name is required', () => {
      delete user.name

      cy.postUser(user)
        .then(response => {
          expect(response.status).to.eq(400)
        })
    })   
  })
})

