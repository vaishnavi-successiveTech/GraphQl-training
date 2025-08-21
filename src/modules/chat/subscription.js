import { pubsub } from "../../server/pubsub.js";

export const chatSubscriptionResolvers = {
  messageAdded: {
    subscribe: () => pubsub.asyncIterableIterator(["MESSAGE_ADDED"]),
  },
  userPresenceChanged: {
    subscribe: () => pubsub.asyncIterableIterator(["USER_PRESENCE"]),
  },
};
