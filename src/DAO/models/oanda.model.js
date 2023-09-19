//@ts-check
import { Schema, model } from 'mongoose';
import monsoosePaginate from 'mongoose-paginate-v2';

const schema = new Schema({
    day: {
        type: String,
        required: true,
      },
      currencies: [{
        currency: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      }],
    });
schema.plugin(monsoosePaginate);
export const OandaModel = model('oanda', schema);