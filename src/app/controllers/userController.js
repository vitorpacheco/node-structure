import * as Yup from 'yup';

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

  // todo: verify if the user already exists then add user to the database

  return res.json({
    id: 1,
    name: 'Vitor Pacheco',
    email: 'vpacheco.costa@gmail.com',
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
        oldPassword ? field.required() : field,
      ),
    confirmPassword: Yup.string()
      .when('password', (password, field) => password ? field.required().oneOf([Yup.ref('password')]) : field),
  });

  if (!(await schema.isValid(req.body))) {
    return res.status(400).json({ error: 'Validation fails' });
  }

  const { email, oldPassword } = req.body;

  // todo: get the user from request

  const reqUser = {
    id: 1,
    name: 'Vitor Pacheco',
    email: 'vpacheco.costa@gmail.com',
    password: '123456'
  };

  if (email && email !== reqUser.email) {

  }

  // todo: compare with encrypted password

  if (oldPassword && (oldPassword !== reqUser.password)) {
    return res.status(401).json({ error: 'Password does not match' });
  }

  const { id, name } = reqUser;

  return res.json({
    id,
    name,
    email
  });
};

export default { storeUser, updateUser };