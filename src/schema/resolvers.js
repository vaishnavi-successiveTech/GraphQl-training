import { comments, posts, users } from '../modules/blog/dataSource.js';
import { blogModule } from '../modules/blog/index.js';
import { senders } from '../modules/chat/dataSource.js';
import { chatModule } from '../modules/chat/index.js';
import { chatQueryResolvers } from '../modules/chat/query.js';
import { messageModule } from '../modules/message/index.js';

export const resolvers = {
  Query: {
    ...blogModule.Query,
    ...messageModule.Query,
    ...chatModule.Query
  },
  Mutation: {
    ...blogModule.Mutation,
    ...messageModule.Mutation,
    ...chatModule.Mutation
  },
  Subscription :{
    ...messageModule.Subscription,
    ...blogModule.Subscription,
    ...chatModule.Subscription
  },
   User: {
    posts: (parent) => {
      return posts.filter(post => post.authorId === parent.id);
    },
    comments: (parent) => {
      return comments.filter(comment => comment.userId === parent.id);
    },
  },

  Post: {
    author: (parent) => users.find(user => user.id === parent.authorId),
    comments: (parent) => comments.filter(comment => comment.postId === parent.id),
  },

  Comment: {
    user: (parent) => users.find(user => user.id === parent.userId),
    post: (parent) => posts.find(post => post.id === parent.postId),
  },
  Chat: {
  user: (parent) => senders.find(u => u.id === parent.userId) || { id: "unknown", username: "unknown" }
},

  
   UserResult: {
    __resolveType(obj) {
      if (obj.code) return "Error";
      return "User";
    }
  },
  PostResult: {
    __resolveType(obj) {
      if (obj.code) return "Error";
      return "Post";
    }
  },
  CommentResult: {
    __resolveType(obj) {
      if (obj.code) return "Error";
      return "Comment";
    }
  }
};