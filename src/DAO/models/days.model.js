//@ts-check
import { Schema, model } from 'mongoose';
import monsoosePaginate from 'mongoose-paginate-v2';

const schema = new Schema({
    type: {
        type: String,
        required: true,
      },
    describe: [{
        day: {
            type: String,
            required: true,
          },
          cantidad: {
            type: Number,
            required: true,
          },
      }],
    });
schema.plugin(monsoosePaginate);
export const DayModel = model('days', schema);