// entry point for query and mutation

import { blogMutation } from './mutation.js';
import {blogQueryResolvers} from './query.js';
import { blogSubscriptionResolvers } from './subscription.js';
export const blogModule =  {
    Query : blogQueryResolvers,
    Mutation : blogMutation,
    Subscription:blogSubscriptionResolvers
}






































// import { blogQueries } from "./query.js";
// import { blogMutations } from "./mutation.js";

// export const blogModule = {
//   Query: blogQueries,
//   Mutation: blogMutations,
// };
