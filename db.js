const ObjectId = require('mongodb').ObjectId;

function findById(collection, id, callback) {
  global.conn.collection(collection).find(new ObjectId(id)).toArray(callback)
}

function findByName(collection, query, callback) {
  global.conn.collection(collection).find({ nome: { $regex: '' + query + '', $options: 'i' } }).toArray(callback)
}

function findAll(collection, callback) {
  global.conn.collection(collection).find({}).toArray(callback)
}

function insertOne(collection, customer, callback) {
  global.conn.collection(collection).insertOne(customer, callback)
}

function updateOne(collection, id, customer, callback) {
  global.conn.collection(collection).updateOne({ _id: new ObjectId(id) }, { $set: customer }, callback)
}

function deleteOne(collection, id, callback) {
  global.conn.collection(collection).deleteOne({ _id: ObjectId(id) }, callback)
}

module.exports = { findById, findByName, findAll, insertOne, updateOne, deleteOne }