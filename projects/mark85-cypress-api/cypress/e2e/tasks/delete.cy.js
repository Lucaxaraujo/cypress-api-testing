describe('DELETE /tasks/:id', () => {

  beforeEach(function () {
    cy.fixture('tasks/delete').then(function (tasks) {
      this.tasks = tasks
    })
  })

  it('Delete a task', function () {
    const { user, task } = this.tasks.remove

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
          })

      })
  })

  it('Task not found', function () {
    const { user, task } = this.tasks.remove_not_found

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

            cy.deleteTask(taskResponse.body._id, userResponse.body.token)
              .then(response => {
                expect(response.status).to.eq(404)
              })
          })

      })
  })
})

