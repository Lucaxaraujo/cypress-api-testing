describe('PUT /tasks/:id/done', () => {

  beforeEach(function () {
    cy.fixture('tasks/put').then(function (tasks) {
      this.tasks = tasks
    })
  })

  it('Update task to done', function () {
    const { user, task } = this.tasks.update

    cy.task('removeTask', task.name, user.email)
    cy.task('removeUser', user.email)
    cy.postUser(user)

    cy.postSession(user)
      .then(userResponse => {
        cy.postTask(task, userResponse.body.token)
          .then(taskResponse => {

            cy.putTaskDone(taskResponse.body._id, userResponse.body.token)
              .then(response => {
                expect(response.status).to.eq(204)
              })

            cy.getUniqueTask(taskResponse.body._id, userResponse.body.token)
              .then(response => {
                expect(response.body.is_done).to.be.true
              })
          })

      })
  })

  it('Update task not found', function () {
    const { user, task } = this.tasks.update_not_found

    cy.task('removeTask', task.name, user.email)
    cy.task('removeUser', user.email)
    cy.postUser(user)

    cy.postSession(user)
      .then(userResponse => {
        cy.postTask(task, userResponse.body.token)
          .then(taskResponse => {
            cy.deleteTask(taskResponse.body._id, userResponse.body.token)
              .then(response => {
                expect(response.status).to.eq(204)
              })

            cy.putTaskDone(taskResponse.body._id, userResponse.body.token)
              .then(response => {
                expect(response.status).to.eq(404)
              })
          })

      })
  })
})

