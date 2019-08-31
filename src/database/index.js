import mongoose from 'mongoose';

const mongo = () =>
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
    })
    .then(() => console.info('Connected to database.'))
    .catch(() => console.error('Failed to connect to the database.'));

const database = () => mongo();

export default database();
