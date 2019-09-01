import { model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

import { fileSchema } from './file';

export const userSchema = new Schema(
  {
    name: {
      type: 'string',
      required: true,
    },
    email: {
      type: 'string',
      required: true,
    },
    password_hash: {
      type: 'string',
      required: false,
    },
    avatar: fileSchema,
  },
  {
    timestamps: true,
  }
);

userSchema
  .virtual('password')
  .get(function() {
    return this.__password;
  })
  .set(function(value) {
    this.__password = value;
  });

userSchema.methods.checkPassword = function(password) {
  return bcrypt.compare(password, this.password_hash);
};

userSchema.pre('save', function() {
  if (this.password) {
    this.password_hash = bcrypt.hashSync(this.password, 8);
  }
});

export default model('user', userSchema);
