import { messages } from "./dataSource.js";

export const messageMutationResolvers = {
  postMessage: (_, { content, author, title }, { pubsub }) => {
    // parent
    const newMessage = {
      id: String(messages.length + 1),
      content,
      author,
      createdAt: new Date().toISOString(),
      title: title,
    };
    messages.push(newMessage);
    pubsub.publish("MESSAGE_POSTED", {
      messagePosted: newMessage,
    });
    return newMessage;
  },
};
