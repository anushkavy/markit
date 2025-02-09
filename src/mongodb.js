import { MongoClient } from "mongodb";

const db_username = import.meta.env.VITE_DATABASE_USERNAME;
const db_password = import.meta.env.VITE_DATABASE_PASSWORD;
const db_clusterName = import.meta.env.VITE_DATABSE_CLUSTERNAME;

const connectionLink = `mongodb+srv://${db_username}:${db_password}@${db_clusterName}.wr0fz.mongodb.net/?retryWrites=true&w=majority&appName=${db_clusterName}`;
const uri = connectionLink;
const client = new MongoClient(uri);

const database = client.db("bookmark-manager");
const bookmarks = database.collection("bookmark");
const users = database.collection("user");

async function addBookmark(userID, url, bookmarkInfo) {
  const mydoc = {
    userId: 2,
    name: "Rajat",
    emailId: "abcsdjrv",
    password: "vnervnevmn",
  };

  // const insertOut = await users.insertOne(mydoc);
  // const queryDelete = { userId: 2 };
  // const deleteOut = await users.deleteMany(queryDelete);

  const query = { userId: { $lt: 10 } };
  const option = { projection: { _id: 1, userId: 1, name: 1, emailId: 1 } };

  const userData = users.find(query, option);
  console.log(users);

  if ((await users.countDocuments(query)) === 0) {
    console.log("No documents found!");
  }
  // Print returned documents
  else {
    for await (const doc of userData) {
      console.log(doc);
    }
  }

  await client.close();
}
