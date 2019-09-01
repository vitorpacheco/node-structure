import { model, Schema } from 'mongoose';

export const file = new Schema(
  {
    name: {
      type: 'string',
      required: true,
    },
    path: {
      type: 'string',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model('file', file);
