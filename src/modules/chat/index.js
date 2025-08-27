import { chatMutationResolvers } from "./mutation.js";
import { chatQueryResolvers } from "./query.js";
import { chatSubscriptionResolvers } from "./subscription.js";

// these are resolvers
export const chatModule ={
    Query:chatQueryResolvers,
    Mutation:chatMutationResolvers,
    Subscription:chatSubscriptionResolvers
}

