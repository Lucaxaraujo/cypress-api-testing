describe('POST /tasks', () => {

  beforeEach(function () {
    cy.fixture('tasks/post').then(function (tasks) {
      this.tasks = tasks
    })
  })

  context('Create a new task', function () {

    before(function () {
      cy.purgeQueueMessages()
        .then(response => {
          expect(response.status).to.eq(204)
        })
    }) 

    it.only('post task', function () {
      const { user, task } = this.tasks.create

      cy.task('removeUser', user.email)
      cy.postUser(user)

      cy.postSession(user)
        .then(userResponse => {
          cy.task('removeTask', task.name, user.email)

          cy.postTask(task, userResponse.body.token)
            .then(response => {
              expect(response.status).to.eq(201)
              expect(response.body.name).to.eq(task.name)
              expect(response.body.tags).to.eql(task.tags)
              expect(response.body.is_done).to.be.false
              expect(response.body.user).to.eq(userResponse.body.user._id)
              expect(response.body._id.length).to.eq(24)
            })
        })
    })    

    after(function () {
      const { user, task } = this.tasks.create

      cy.wait(3000)
      cy.getQueueMessages()
        .then(response => {
          expect(response.status).to.eq(200)
          expect(response.body[0].payload).to.include(user.name.split(' ')[0])
          expect(response.body[0].payload).to.include(task.name)
          expect(response.body[0].payload).to.include(user.email)
        })
    })
  })

  it('Duplicated task', function () {
    const { user, task } = this.tasks.duplicated_task

    cy.task('removeUser', user.email)
    cy.postUser(user)

    cy.postSession(user)
      .then(userResponse => {
        cy.task('removeTask', task.name, user.email)

        cy.postTask(task, userResponse.body.token)
        cy.postTask(task, userResponse.body.token)
          .then(response => {
            expect(response.status).to.eq(409)
            expect(response.body.message).to.eq('Duplicated task!')
          })
      })
  })
})