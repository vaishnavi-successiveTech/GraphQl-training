// standalone is sufficient for express.js

import { connect } from "mongoose";
import { createApolloServer } from "./src/server/express.js";
import { connectDB } from "./src/config/db.js";

const httpServer = await createApolloServer(8001);
// connectDB();
httpServer.listen(8001, () => {
  console.log(`🚀 Query/Mutation endpoint: http://localhost:8001/graphql`);
  console.log(`🚀 Subscription endpoint: ws://localhost:8001/graphql`);
});
// import { ApolloServer } from "@apollo/server";
// import { startStandaloneServer } from "@apollo/server/standalone";
// import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
// import { typeDefs } from "./src/schema/typeDefs.js";
// import { resolvers } from "./src/schema/resolvers.js";

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   plugins: [ApolloServerPluginLandingPageLocalDefault()],
// });

// const { url } = await startStandaloneServer(server, {
//   listen: { port: 4000 },
// });

// console.log(`🚀 Server ready at ${url}`);