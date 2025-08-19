// entry point for query and mutation

import { messageMutationResolvers } from "./mutation.js";
import { messageQueryResolvers } from "./query.js";
import { messageSubscriptionResolvers } from "./subscription.js";
// these are resolvers
export const messageModule ={
    Query:messageQueryResolvers,
    Mutation:messageMutationResolvers,
    Subscription:messageSubscriptionResolvers
}

