import * as Yup from 'yup';

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

const userController = async (req, res) => {
  if (!(await schema.isValid(req.body))) {
    return res.status(400).json({ error: 'Validation fails' });
  }

  return res.json({
    id: '1',
    name: 'Vitor Pacheco',
    email: 'vpacheco.costa@gmail.com'
  });
};

export default userController;
