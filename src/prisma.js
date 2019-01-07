import { Prisma } from "prisma-binding";
import { fragmentReplacements } from "./resolvers";

const prisma = new Prisma({
  typeDefs: "src/generated/prisma.graphql",
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: process.env.PRISMA_SECRET,
  fragmentReplacements,
});

export default prisma;
// const createPostForUser = async (authorId, data) => {
//   const userExists = await prisma.exists.User({ id: authorId });

//   if(!userExists){
//     throw new Error("User not found!")
//   }
//   const post = await prisma.mutation.createPost({
//     data: {
//       ...data,
//       author: {
//         connect: {
//           id: authorId
//         }
//       }
//   }}, "{ author { id name email posts { id title published } } }");
//   return post.author;
// };

// createPostForUser("cjqfg79d9001q0847yqueva99", {
//   title: "The Newbies are here",
//   body: "How to set up yourself for success",
//   published: true
// }).then(user => {
//   console.log(JSON.stringify(user, undefined, 2));
// }).catch(error => {
//   console.log(error.message)
// });

// const updatePostForUser = async (postId, data) => {
//   const postExists = await prisma.exists.Post({ id: postId });
//   if(!postExists){
//     throw new Error("Post not found")
//   }
//   const post = await prisma.mutation.updatePost({
//     data: {
//       ...data,
//     },
//     where: {
//       id: postId
//     }
//   }, "{ author { id name email posts { id title published }} }");

//   return post.author;
// };

// updatePostForUser("cjqfgi983001w0847m7clnln4", {
//   title: "The coming King",
//   body: "How to setup for a beautiful",
//   published: true
// }).then(user => {
//   console.log(JSON.stringify(user, undefined, 2));
// }).catch(error => {
//   console.log(error.message);
// })



// prisma.query.users(null, "{ id name posts { id title } }").then(data => {
//   console.log(JSON.stringify(data, undefined, 2));
// });

// prisma.query.comments(null, "{ id text author { id name } }").then(data => {
//   console.log(JSON.stringify(data, undefined, 2));
// });

// prisma.mutation.createPost({
//   data: {
//     title: "Binge learning",
//     body: "Put in the effort",
//     published: true,
//     author: {
//       connect: {
//         id: "cjqfyh4sa003k0847cyykddqo"
//       }
//     }
//   }
// }, "{ id title body published }").then(data => {

//   return prisma.query.users(null, "{ id name posts { id title } }")
//   }).then(data => {
//     console.log(JSON.stringify(data, undefined, 2));
// });



// prisma.mutation.updatePost({
//   data: {
//     title: "The Binge Learner",
//     body: "",
//     published: false,
//     author: {
//       connect: {
//         id: "cjqfyh4sa003k0847cyykddqo"
//       }
//     }
//   },
//   where: {
//     id: "cjqgam8di00570847yoba5bwu"
//   }
// }, '{ id title body published }')
// .then(data => {
//   return prisma.query.posts(null, "{ id title body published }")
// }).then(data => {
//   console.log(JSON.stringify(data, undefined, 2));
// }).catch(error => {
//   console.log(error);
// });

