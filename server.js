const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

//Import typeDefs and resolvers
const filePath = path.join(__dirname, "typeDefs.gql");
const typeDefs = fs.readFileSync(filePath, "utf-8");
const resolvers = require("./resolvers");

//Import environment variables and mongoose models
require("dotenv").config({ path: "variables.env" });
const User = require("./models/User");
const Post = require("./models/Post");

//Connect to Mongo Atlas Database
mongoose
  .connect(process.env.MONGO_URI, { autoIndex: false, useNewUrlParser: true })
  .then(() => console.log("DB connected"))
  .catch(err => console.error(err));

// Create Apollo/GraphQl Server using typeDefs, resolvers and contect object
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    User,
    Post
  }
});

//Listen on port localhost:4000
server.listen().then(({ url }) => {
  console.log(`Server Listening ${url}`);
});

