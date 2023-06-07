describe('POST /users', () => {

  it('register a new user', () => {

    const user = {
      name: 'Cypress request',
	    email: 'cyrequest@gmail.com',
	    password: 'teste123'
    }

    cy.task('deleteUser', user.email)
    
    cy.request({
      url: '/users',
      method: 'POST',
      body: user
    }).then(response => {
      expect(response.status).to.eq(200) 
    })
  })
});