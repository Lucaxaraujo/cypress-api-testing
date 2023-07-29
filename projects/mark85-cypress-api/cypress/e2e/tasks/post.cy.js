describe('POST /tasks', () => {

  beforeEach(function () {
    cy.fixture('tasks/post').then(function (tasks) {
      this.tasks = tasks
    })
  })

  it('Create a new task', function () {
    const { user, task } = this.tasks.create

    cy.task('deleteUser', user.email)
    cy.postUser(user)

    cy.postSession(user)
      .then(userResponse => {
        cy.task('deleteTask', task.name, user.email)

        cy.postTask(task, userResponse.body.token)
          .then(response => {
            expect(response.status).to.eq(200)
            expect(response.body.name).to.eq(task.name)
            expect(response.body.tags).to.eql(task.tags)
            expect(response.body.is_done).to.be.false
            expect(response.body.user).to.eq(userResponse.body.user._id)
            expect(response.body._id.length).to.eq(24)
          })
      })
  })

  it('Duplicated task', function () {
    const { user, task } = this.tasks.duplicated_task

    cy.task('deleteUser', user.email)
    cy.postUser(user)

    cy.postSession(user)
      .then(userResponse => {
        cy.task('deleteTask', task.name, user.email)

        cy.postTask(task, userResponse.body.token)
        cy.postTask(task, userResponse.body.token)
          .then(response => {
            expect(response.status).to.eq(409)
            expect(response.body.message).to.eq('Duplicated task!')
          })
      })
  })
})