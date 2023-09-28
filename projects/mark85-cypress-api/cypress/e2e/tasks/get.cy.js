describe('POST /tasks', () => {

  beforeEach(function () {
    cy.fixture('tasks/get').then(function (tasks) {
      this.tasks = tasks
    })
  })

  it('Get user tasks', function () {
    const { user, tasks } = this.tasks.list

    cy.task('deleteTasksLike', 'Estud4r')

    cy.task('deleteUser', user.email)
    cy.postUser(user)

    cy.postSession(user)
      .then(userResponse => {

        tasks.forEach(function (t) {
          cy.postTask(t, userResponse.body.token)
        })

        cy.api({
          url: '/tasks',
          method: 'GET',
          headers: {
            authorization: userResponse.body.token
          },
          failOnStatusCode: false
        }).then(response => {
          expect(response.status).to.eq(200)
        }).its('body')
          .should('be.an', 'array')
          .and('have.length', tasks.length)
      })
  })

})

describe('GET /tasks/:id', () => {

  beforeEach(function () {
    cy.fixture('tasks/get').then(function (tasks) {
      this.tasks = tasks
    })
  })

  it.only('Get unique task', function () {
    const { user, task } = this.tasks.uniqueTask

    cy.task('deleteTask', task.name, user.email)
    cy.task('deleteUser', user.email)
    cy.postUser(user)

    cy.postSession(user)
      .then(userResponse => {

        cy.postTask(task, userResponse.body.token)
          .then(taskResponse => {

            cy.api({
              url: '/tasks/' + taskResponse.body._id,
              method: 'GET',
              headers: {
                authorization: userResponse.body.token
              },
              failOnStatusCode: false
            }).then(response => {
              expect(response.status).to.eq(200)
            })
          })

      })
  })
})