Cypress.Commands.add('purgeQueueMessages', () => {
  cy.api({
    url: 'https://moose.rmq.cloudamqp.com/api/queues/zffamofg/tasks/contents',
    method: 'DELETE',
    body: {
      vhost: 'zffamofg',
      name: 'tasks',
      mode: 'purge'
    },
    headers: {
      authorization: 'Basic emZmYW1vZmc6YkxFMlZHTkFoXzNNRm5pTGNRTjllTnpmY0lyLTFhZ0U='
    },
    failOnStatusCode: false
  }).then(response => { return response })
});

Cypress.Commands.add('getQueueMessages', () => {
  cy.api({
    url: 'https://moose.rmq.cloudamqp.com/api/queues/zffamofg/tasks/get',
    method: 'POST',
    body: {
      vhost: 'zffamofg',
      name: 'tasks',
      truncate: '50000',
      ackmode: 'ack_requeue_true',
      encoding: 'auto',
      count: '1'
    },
    headers: {
      authorization: 'Basic emZmYW1vZmc6YkxFMlZHTkFoXzNNRm5pTGNRTjllTnpmY0lyLTFhZ0U='
    },
    failOnStatusCode: false
  }).then(response => { return response })
});
