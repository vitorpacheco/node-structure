import { model, Schema } from 'mongoose';

export const equipmentSchema = new Schema(
  {
    name: {
      type: 'string',
      required: true,
    },
    brand: {
      type: 'string',
      required: true,
    },
    type: {
      type: 'string',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model('equipment', equipmentSchema);
