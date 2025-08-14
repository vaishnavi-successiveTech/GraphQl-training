export const users = [
  { id: '1', name: 'Alice' },
  { id: '2', name: 'Bob' },
];

export const posts = [
  { id: '1', title: 'First Post', content: 'Hello world!', authorId: '1' },
  { id: '2', title: 'Second Post', content: 'GraphQL is great!', authorId: '2' },
];

export const comments = [
  { id: '1', text: 'Nice post!', postId: '1', userId: '2' },
  { id: '2', text: 'Very helpful.', postId: '2', userId: '1' },
];

// export let users = [
//   {
//     id: "u1",
//     name: "Alice Johnson",
//     email: "alice@example.com",
//   },
//   {
//     id: "u2",
//     name: "Bob Smith",
//     email: "bob@example.com",
//   },
// ];
// export let posts = [
//   {
//     id: "p1",
//     title: "Getting Started with GraphQL",
//     content: "GraphQL is a query language for your API...",
//     author: users[0], // nested user object
//     comments: [
//       {
//         id: "c1",
//         text: "Great introduction! Very helpful.",
//         author: users[1], // nested user object
//         post: { id: "p1", title: "Getting Started with GraphQL" },
//       },
//     ],
//   },
//   {
//     id: "p2",
//     title: "Advanced GraphQL Queries",
//     content: "Let's explore fragments, variables, and more...",
//     author: users[0],
//     comments: [
//       {
//         id: "c2",
//         text: "Loved the advanced tips!",
//         author: users[1],
//         post: { id: "p2", title: "Advanced GraphQL Queries" },
//       },
//       {
//         id: "c3",
//         text: "Can't wait to try this in my project.",
//         author: users[0],
//         post: { id: "p2", title: "Advanced GraphQL Queries" },
//       },
//     ],
//   },
//   {
//     id: "p3",
//     title: "REST vs GraphQL",
//     content: "A deep dive into the differences...",
//     author: users[1],
//     comments: [],
//   },
// ];


// export let comments = [
//   {
//     id: "c1",
//     text: "Great introduction! Very helpful.",
//     author: users[1],
//     post: posts[0],
//   },
//   {
//     id: "c2",
//     text: "Loved the advanced tips!",
//     author: users[1],
//     post: posts[1],
//   },
//   {
//     id: "c3",
//     text: "Can't wait to try this in my project.",
//     author: users[0],
//     post: posts[1],
//   },
// ];
