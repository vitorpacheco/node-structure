import { model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

import { file } from './file';

export const user = new Schema(
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
    avatar: file,
  },
  {
    timestamps: true,
  }
);

user
  .virtual('password')
  .get(function() {
    return this.__password;
  })
  .set(function(value) {
    this.__password = value;
  });

user.methods.checkPassword = function(password) {
  return bcrypt.compare(password, this.password_hash);
};

user.pre('save', function() {
  if (this.password) {
    this.password_hash = bcrypt.hashSync(this.password, 8);
  }
});

export default model('user', user);
