import { DayModel } from "../DAO/models/days.model.js";


export class DayService {
    validatePostUser(type, describe) {
      if (!type || !describe) {
        console.log('validation error: please complete type.');
        throw 'VALDIATION ERROR';
      }
    }
  
    validatePutUser(id, type, describe) {
      if ((!id, !type || !describe)) {
        console.log('validation error: please complete type.');
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
      const users = await DayModel.find({});
      return users;
    }
  
    async createUser(type, describe) {
      this.validatePostUser(type, describe);
      const userCreated = await DayModel.create({ type, describe });
      return userCreated;
    }
    async updateUser(id, type, describe) {
      this.validatePostUser(id, type, describe);
      const userUptaded = await DayModel.updateOne({ _id: id }, { type, describe });
      return userUptaded;
    }
  
    async deleteUser(id) {
      this.validateId(id);
      const deleted = await DayModel.deleteOne({ _id: id });
      return deleted;
    }
  }