import express from 'express';
import { OandaService } from '../service/oanda.service.js';

export const oandaRouter = express.Router();

const Service = new OandaService();

oandaRouter.get('/', async (req, res) => {
    try {
      const users = await Service.getAllUsers();
      return res.status(200).json({
        status: 'success',
        msg: 'listado de bancos',
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

  oandaRouter.post('/', async (req, res) => {
    try {
      const { day, currencies, } = req.body;
      const userCreated = await Service.createUser(day, currencies,);
  
      return res.status(201).json({
        status: 'success',
        msg: 'bank created',
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
  
  oandaRouter.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { day, currencies, } = req.body;
  
      const userUptaded = await Service.updateUser(id, day, currencies);
      return res.status(201).json({
        status: 'success',
        msg: 'bank uptaded',
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
  oandaRouter.delete('/:id', async (req, res) => {
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