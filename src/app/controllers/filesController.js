import fileModel from '../schemas/file';

export const storeFile = async (req, res) => {
  const { originalname: name, filename: path } = req.file;

  const file = await fileModel.create({ name, path });

  return res.json(file);
};

export default { storeFile };
