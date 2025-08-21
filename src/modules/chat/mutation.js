import { User } from "../../model/userModel.js";
import { pubsub } from "../../server/pubsub.js";
import { generateToken } from "../../utils/auth.js";


export const chatMutationResolvers = {
   register: async (_, { name, email, role, password }) => {
    const existing = await User.findOne({ email });
    if (existing) {
      throw new Error("User already exists");
    }
    const newUser = new User({ name, email, password, role,  isOnline: false });
    await newUser.save();

    return newUser;
  },

  login: async (_, { email, password }) => {
    const user = await User.findOne({ email, password });
    if (!user) throw new Error("Invalid credentials");
    const token = generateToken(user);
    user.isOnline = true; 
    await user.save();
    return { user, token };
  },
  deleteUser: async (_, { id ,ID2}) => {
    const user = await User.findById(id);
    if (!user) throw new Error("User not found");
    
    const adminUSer = await User.findById(ID2);
    if (!adminUSer || adminUSer.role !== "ADMIN") {
      throw new Error("Only admin can delete users");
    } 
    await User.findByIdAndDelete(id);
    return true; 
  },
 
}





















// import { allChat } from "../../config/serverConfig.js";
// import { chats, senders } from "./dataSource.js";
// import jwt from "jsonwebtoken";

// const SECRET = "supersecret";
// const onlineUsers = new Set(); // Track online users

// export const chatMutationResolvers = {
// login: (_, { username, password },{pubsub}) => {
//   const user = senders.find(u => u.username === username && u.password === password);
//   if (!user) throw new Error("Invalid credentials");

 

//   const token = jwt.sign({ userId: user.id }, SECRET, { expiresIn: "1h" });
//   // Mark user online
//     onlineUsers.add(user.username);

//   pubsub.publish("USER_PRESENCE", {
//     userPresenceChanged: { username: user.username, status: "ONLINE" }
//   });

//   return token; // just the string
// },
//   sendMessage: (_, { text ,userId}, { userExist,pubsub }) => {
//     if (!userExist) throw new Error("Not authenticated");
    
//     const decodedId=userExist.userId;
//     if(decodedId!==userId){
//       throw new Error("user not logged In");
//     }
//     console.log("decodeId",decodedId);
//     const newMsg = {
//       id: `m${chats.length + 1}`,
//       text,
//       userId
//     };
//     chats.push(newMsg);
//     allChat.push(newMsg);

//     // const msgWithUser = { ...newMsg, user: senders.find(u => u.id === userExist.id) };
//     pubsub.publish("MESSAGE_ADDED", { messageAdded: newMsg });
//     return newMsg;
//   },

//   logout: (_, __, {userExist,pubsub}) => {
//     if (!userExist) throw new Error("Not authenticated");

//     onlineUsers.delete(userExist.username);

//     // Publish presence event
//     pubsub.publish("USER_PRESENCE", {
//       userPresenceChanged: { username: userExist.username, status: "OFFLINE" },
//     });

//     return true;
//   },

 
// };


// // import { pubsub } from "../../server/pubsub.js";
// // import { chats, senders } from "./dataSource.js";
// // import jwt from "jsonwebtoken";

// // const SECRET = "supersecret"; 


// // export const chatMutationResolvers = {
// //   login: (_, { username, password }) => {
// //     const user = senders.find(
// //       (u) => u.username === username && u.password === password
// //     );


// //     if (!user) throw new Error("Invalid credentials");

// //     // create JWT token
// //     const token =  jwt.sign({ userId: user.id }, SECRET, { expiresIn: "1h" });
// //     console.log('calling user',user,token);
// //     // pubsub.publish("USER_PRESENCE", {userJoined: `user is logged in` });
// //     pubsub.publish("USER_PRESENCE", {
// //       userPresenceChanged: { username: user.username, status: "ONLINE" }
// //     });

// //     return token
// //   },


// //   sendMessage: (_, { text }, { userExist}) => {
// //     console.log("userExist is",userExist);
// //     if (!userExist) throw new Error("Not authenticated");

// //     const newMsg = {
// //       id: `m${chats.length + 1}`,
// //       text,
// //       userId:userExist.id
// //     };
// //     chats.push(newMsg);
// //     const msgWithUser= { ...newMsg, user: senders.find((u) => u.id === userExist.id) };
// //     pubsub.publish("MESSAGE_ADDED",{messageAdded:msgWithUser});
// //     return msgWithUser;
// //   },
// //     userJoin: (_, { userId }) => {
// //       const user = senders.find((u) => u.id === userId);
// //       if (!user) throw new Error("User not found");

// //       onlineUsers.add(userId);

// //       // const presence = { ...user, status: "ONLINE" };
// //       pubsub.publish("USER_PRESENCE", { userPresenceChanged: `$(user.username) is logged in` });

// //       return presence;
// //     },

// //     userLeave: (_, { userId }) => {
// //       const user = senders.find((u) => u.id === userId);
// //       if (!user) throw new Error("User not found");

// //       onlineUsers.delete(userId);

// //       const presence = { ...user, status: "OFFLINE" };
// //       pubsub.publish(USER_PRESENCE, { userPresenceChanged: presence });

// //       return presence;
// //     },

// // };
