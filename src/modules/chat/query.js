import { chats, senders } from "./dataSource.js";

export const chatQueryResolvers = {
  senders: () => senders,

  chats: () =>
    chats.map((msg) => ({
      ...msg,
      user: senders.find((u) => u.id === msg.userId) || { id: "unknown", username: "unknown" },
    })),

  messageHistory: () =>
    chats.map((c) => ({
      ...c,
      user: senders.find((u) => u.id === c.userId) || { id: "unknown", username: "unknown" },
    })),
};

// import { chats, senders } from "./dataSource.js";

// export const chatQueryResolvers = {
//   senders: () => senders,
//   chats: () => {
//     console.log("debed")
//     // Always return an array, even if empty
//     return chats.map((msg) => {
//       const sender = senders.find((u) => u.id === msg.userId);

//       if (!sender) {
//         // Instead of letting GraphQL return null, throw error early
//         throw new Error(`No sender found for chat with id ${msg.id}`);
//       }
      

//       return {
//         id: msg.id,
//         text: msg.text,
//         user: sender,
//       };
//     });
//   },
// };