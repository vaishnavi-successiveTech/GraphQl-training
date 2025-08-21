import { pubsub } from '../../server/pubsub.js';
import { comments, posts, users } from './dataSource.js';

export const blogMutation = {
  // Create Post
  createPost: async (_, { title, content, authorId }) => {
     await new Promise((resolve) => setTimeout(resolve, 2000));
    const newPost = {
      id: String(posts.length + 1),
      title,
      content,
      authorId,
    };
    posts.push(newPost);
    return newPost;
  },

  // Create Comment
  createComment: (_, { content, authorId, postId }) => {
   
    const user = users.find((u) => u.id === authorId);
    if (!user) throw new Error("Author not found");

    const post = posts.find((p) => p.id === postId);
    if (!post) throw new Error("Post not found");

    const newComment = {
      id: String(comments.length + 1),
      content,  
      userId: authorId,
      postId,
    };

    comments.push(newComment);
    pubsub.publish("COMMENT_POSTED",{
      commentPosted:newComment,
    })
    return newComment;
  },

  // Update User
  updateUser: async (_, { id, name }) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const user = users.find((u) => u.id === id);
    if (!user) throw new Error("User not found");
    user.name = name;
    return user;
  },

  // Delete Comment
  deleteComment: (_, { id }) => {
    const index = comments.findIndex((c) => c.id === id);
    if (index === -1) throw new Error("Comment not found");

    const deleted = comments.splice(index, 1)[0];
    return deleted;
  },
};



// import {comments, posts,users} from './dataSource.js'
// export const blogMutation = {
//   createPost: (_, { title, content, authorId }) => {
//     const newPost = {
//       id: String(posts.length + 1),
//       title,
//       content,
//       authorId,
//     };
//     posts.push(newPost);
//     return newPost;
//   },
//   updateUser:(_,{id,name})=>{
//     const user=users.find((u)=>u.id === id);
//     if(!user) throw new Error("User not found");
//     user.name=name;
//     return user;
//   },
//   deleteComment:(_,{id})=>{
//     const index=comments.findIndex((c)=>c.id === id);
//     if(index=== -1) throw new Error("Comment not found");

//     const deleted=comments.splice(index,1)[0];
//     return deleted;
//   }
//   };