import { MongoClient } from "mongodb";

export const connectDatabase = async () => {
  const url = `mongodb+srv://${process.env.dbUser}:${process.env.dbPassword}@cluster0.7xhwr.mongodb.net/${process.env.dbName}?retryWrites=true&w=majority`;

  const client = await MongoClient.connect(url);
  return client;
};
