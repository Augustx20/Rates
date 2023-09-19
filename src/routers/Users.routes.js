import express from 'express';
import { UserService } from '../service/Users.service.js';

export const usersRouter = express.Router();

const Service = new UserService();

usersRouter.get('/', async (req, res) => {
  try {
    const users = await Service.getAllUsers();
    return res.status(200).json({
      status: 'success',
      msg: 'listado de usuarios',
      data: users,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 'error',
      msg: 'something went wrong :(',
      data: {},
    });
  }
});

usersRouter.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    const userCreated = await Service.createUser(firstName, lastName, email);

    return res.status(201).json({
      status: 'success',
      msg: 'user created',
      data: userCreated,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 'error',
      msg: 'something went wrong :(',
      data: {},
    });
  }
});

usersRouter.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email } = req.body;

    const userUptaded = await Service.updateUser(id, firstName, lastName, email);
    return res.status(201).json({
      status: 'success',
      msg: 'user uptaded',
      data: userUptaded,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 'error',
      msg: 'something went wrong :(',
      data: {},
    });
  }
});

//BIEN!!! RUTEAR!!!
usersRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Service.deleteUser(id);
    return res.status(200).json({
      status: 'success',
      msg: 'user deleted',
      data: {},
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 'error',
      msg: 'something went wrong :(',
      data: {},
    });
  }
});