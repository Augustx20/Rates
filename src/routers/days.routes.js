import express from 'express';
import { DayService } from '../service/days.service.js';

export const DayRouter = express.Router();

const Service = new DayService();

DayRouter.get('/', async (req, res) => {
    try {
      const days = await Service.getAllUsers();
      return res.status(200).json({
        status: 'success',
        msg: 'listado de dias',
        data: days,
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

  DayRouter.post('/', async (req, res) => {
    try {
      const { type, describe } = req.body;
      const dayCreated = await Service.createUser(type, describe);
  
      return res.status(201).json({
        status: 'success',
        msg: 'Days created',
        data: dayCreated,
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
  
  DayRouter.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { type, describe } = req.body;
  
      const dayUptaded = await Service.updateUser(id, type, describe);
      return res.status(201).json({
        status: 'success',
        msg: 'Days uptaded',
        data: dayUptaded,
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
  DayRouter.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await Service.deleteUser(id);
      return res.status(200).json({
        status: 'success',
        msg: 'days deleted',
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