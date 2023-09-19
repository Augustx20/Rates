import express from 'express';
import { controller } from '../controllers/error.controller.js';
const error = express.Router()

error.get('/*', controller.error );

export default error