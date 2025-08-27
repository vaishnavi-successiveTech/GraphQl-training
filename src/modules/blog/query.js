import { posts, users, comments } from "./dataSource.js";

// helper to simulate loading delay
const simulateDelay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const blogQueryResolvers = {
   getUsers: async () => {
    await simulateDelay(1000); 
   

    return users;
  },
  //  getUsers: () => users,
     getUserById: async (_, { id }) => {
    await simulateDelay(1000);
    const user = users.find((u) => u.id === id);
    if (!user) {
      throw new Error(`User  ${id} not found`);
    }
    return user;
  },
  // getUserById: async (_, { id }) => {
  //   await simulateDelay(1000);
  //   return users.find((user) => user.id === id);
  // },

  getPosts: async () => {
    await simulateDelay(1500); 
    return posts;
  },

  getPostById: async (_, { id }) => {
    await simulateDelay(1500); // delay has been added
    const post = posts.find(p => p.id === id);
      if (!post) {
        return {
          code: "POST_NOT_FOUND",
          message: `Post with ID ${id} not found`
        };
      }
    return posts.find((post) => post.id === id);
  },

  getPostsByUserId: async (_, { userId }) => {
    await simulateDelay(1200);
    return posts.filter((post) => post.authorId === userId);
  },

  getComments: async () => {
    await simulateDelay(1000);
       const comment = comments.find(c => c.id === id);
      if (!comment) {
        return {
          code: "COMMENT_NOT_FOUND",
          message: `Comment with ID ${id} not found`
        };
      }
    return comments;
  },

 getCommentsByPostId: (_,{postId}) =>
  comments.filter((comment) => comment.postId === postId),

  getUserByComment: async (_, { comment }) => {
    await simulateDelay(1000);
    return users.find((user) => user.id === comment.userId);
  },

   getAuthorOfPost: (_,{post}) => users.find((user) => user.id === post.authorId),
 paginatedPosts: async (_, { page, limit, sortBy, order }) => {
  await simulateDelay(1200);

  let sortedPosts = [...posts];

  // ✅ Apply sorting if requested
  if (sortBy) {
    sortedPosts.sort((a, b) => {
      let fieldA = a[sortBy];
      let fieldB = b[sortBy];

      if (typeof fieldA === "string") fieldA = fieldA.toLowerCase();
      if (typeof fieldB === "string") fieldB = fieldB.toLowerCase();

      if (fieldA < fieldB) return order === "desc" ? 1 : -1;
      if (fieldA > fieldB) return order === "desc" ? -1 : 1;
      return 0;
    });
  }

  const totalPosts = sortedPosts.length;
  const totalPages = Math.ceil(totalPosts / limit);

  if (page < 1 || page > totalPages) {
    throw new Error("Invalid page number");
  }

  const start = (page - 1) * limit;
  const end = start + limit;

  return {
    posts: sortedPosts.slice(start, end), 
    totalPosts,
    totalPages,
    currentPage: page,
  };
},

};

// import { posts, users } from "./dataSource.js";

// export const blogQueryResolvers = {
//   getUsers: () => users,

//   getUserById: (_,{id}) => users.find((user) => user.id === id),

//   getPosts: () => posts,

//   getPostById: (_,{id}) => posts.find((post) => post.id === id),

//   getPostsByUserId: (_,{userId}) =>
//     posts.filter((post) => post.authorId === userId),

//   getComments: () => comments,

//   getCommentsByPostId: (_,{postId}) =>
//     comments.filter((comment) => comment.postId === postId),

//   getUserByComment: (_,{comment}) =>
//     users.find((user) => user.id === comment.userId),

//   getAuthorOfPost: (_,{post}) => users.find((user) => user.id === post.authorId),
// };