import { model, Schema } from 'mongoose';

export const fileSchema = new Schema(
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

export default model('file', fileSchema);
