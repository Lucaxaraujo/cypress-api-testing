const { MongoClient } = require('mongodb')

const MongoUri = 'mongodb+srv://qax:xperience@cluster0.dw9hwan.mongodb.net/markdb?retryWrites=true&w=majority'

const client = new MongoClient(MongoUri)

async function connect() {
  await client.connect()
  return client.db('markdb')
}

async function disconnect() {
  await client.disconnect()
}

module.exports = { connect, disconnect }