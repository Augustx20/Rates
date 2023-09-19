import { connect, Schema, model } from 'mongoose';
//import faker from 'faker';
//import { UserModel } from './DAO/models/users.model.js';
//import { OrderModel } from './DAO/models/order.model.js';
export async function connectMongo() {
  try {
    await connect('mongodb+srv://augus1726:95vcBa5oidA0kJMx@ratessca0.aro7d1q.mongodb.net/');
    console.log('plug to mongo');
  } catch (e) {
    console.log(e);
    throw 'can not connect to the db';
  }
}