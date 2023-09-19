import { OandaModel } from "../DAO/models/oanda.model.js";


export class OandaService {
    validatePostUser(day, currencies) {
      if (!day || !currencies) {
        console.log('validation error: please complete day, currencies and url.');
        throw 'VALDIATION ERROR';
      }
    }
  
    validatePutUser(id, day, currencies) {
      if ((!id, !day || !currencies)) {
        console.log('validation error: please complete day, currencies and url.');
        throw 'VALDIATION ERROR';
      }
    }
  
    validateId(id) {
      if (!id) {
        console.log('validation error: please complete ID');
        throw 'VALDIATION ERROR';
      }
    }
    async getAllUsers() {
      const users = await OandaModel.find({});
      return users;
    }
  
    async createUser(day, currencies) {
      this.validatePostUser(day, currencies);
      const userCreated = await OandaModel.create({ day, currencies });
      return userCreated;
    }
    async updateUser(id, day, currencies) {
      this.validatePostUser(id, day, currencies);
      const userUptaded = await OandaModel.updateOne({ _id: id }, { day, currencies });
      return userUptaded;
    }
  
    async deleteUser(id) {
      this.validateId(id);
      const deleted = await OandaModel.deleteOne({ _id: id });
      return deleted;
    }
  }