import mongoose from 'mongoose';

const mongo = () =>
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
  });

const database = () => {
  const mongoConnection = mongo();

  return [mongoConnection];
};

export default database;
