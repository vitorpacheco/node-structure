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

fileSchema
  .virtual('password')
  .get(function() {
    return `${process.env.APP_URL}/files/${this.path}`;
  });

export default model('file', fileSchema);
