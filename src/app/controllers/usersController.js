import * as Yup from 'yup';

import userModel from '../schemas/user';

export const storeUser = async (req, res) => {
  const schema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string()
      .email()
      .required(),
    password: Yup.string()
      .required()
      .min(6),
    confirmPassword: Yup.string()
      .required()
      .oneOf([Yup.ref('password')]),
  });

  if (!(await schema.isValid(req.body))) {
    return res.status(400).json({ error: 'Validation fails' });
  }

  const usersExists = await userModel.findOne({ email: req.body.email });

  if (usersExists) {
    return res.status(400).json({ error: 'User already exists' });
  }

  const { id, name, email } = await userModel.create(req.body);

  return res.json({
    id,
    name,
    email,
  });
};

export const updateUser = async (req, res) => {
  const schema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string()
      .email()
      .required(),
    oldPassword: Yup.string().min(6),
    password: Yup.string()
      .min(6)
      .when('oldPassword', (oldPassword, field) =>
        oldPassword ? field.required() : field
      ),
    confirmPassword: Yup.string().when('password', (password, field) =>
      password ? field.required().oneOf([Yup.ref('password')]) : field
    ),
  });

  if (!(await schema.isValid(req.body))) {
    return res.status(400).json({ error: 'Validation fails' });
  }

  const { email, oldPassword } = req.body;

  const user = await userModel.findOne({ email });

  if (email && email !== user.email) {
    const userExists = await userModel.findOne({ email });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }
  }

  if (oldPassword && !(await user.checkPassword(oldPassword))) {
    return res.status(401).json({error: 'Password does not match'});
  }

  console.log(user);
  console.log(req.body);
  Object.assign(user, req.body);
  console.log(user);

  const { id, name } = await user.save();

  return res.json({
    id,
    name,
    email,
  });
};

export default { storeUser, updateUser };
