import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import authConfig from '../../config/auth';

export const storeSession = async (req, res) => {
  const schema = Yup.object().shape({
    email: Yup.string().required().email(),
    password: Yup.string().required(),
  });

  if (!(await schema.isValid(req.body))) {
    return res.status(400).json({ error: 'Validation fails' });
  }

  const { email, password } = req.body;

  // todo: get the user from the database by the email, return an error if not found

  // todo: compare with encrypted password

  return res.json({
    id: 1,
    name: 'Vitor Pacheco',
    email: 'vpacheco.costa@gmail.com',
    token: jwt.sign({ id: 1 }, authConfig.secret, {
      expiresIn: authConfig.expiresIn
    }),
  });
};

export default { storeSession };
