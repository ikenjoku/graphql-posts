import bcrypt from "bcryptjs";
import getUserId from "../utils/getUserId";
import generateToken from "../utils/generateToken";
import hashPassword from "../utils/hashPassword";

export default {
  async createUser(parent, args, { prisma }, info) {
    const emailTaken = await prisma.exists.User({ email: args.data.email });
    if (emailTaken) {
      throw new Error('Email Taken');
    }
    const password = await hashPassword(args.data.password);
    const user = await prisma.mutation.createUser({ data: {
      ...args.data,
      password
    }
  });

    return {
      user,
      token: generateToken(user.id)
    };
  },

  async loginUser(parent, args, { prisma }, info){
    const user = await prisma.query.user({ where: { email: args.data.email } });
    if (!user) {
      throw new Error('Email not found');
    }
    const isMatchPassword = await bcrypt.compare(args.data.password, user.password)

    if(isMatchPassword){
      return {
        user,
        token: generateToken(user.id)
      }
    } else {
      throw new Error("Wrong username/password combination");
    }
  },

  createPost(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    return prisma.mutation.createPost({
      data: {
        title: args.data.title,
        body: args.data.body,
        published: args.data.published,
        author: {
          connect: {
            id: userId,
          }
        }
      }
    }, info);
  },

  async createComment(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);
    const post = await prisma.query.post({ where: { id: args.data.post }});

    if(!post){
      throw new Error("Post not found");
    } else if (!post.published){
      throw new Error("Post is not published")
    }

      return prisma.mutation.createComment({
        data: {
          text: args.data.text,
          author: {
            connect: {
              id: userId
            }
          },
          post: {
            connect: {
              id: args.data.post
            }
          }
        }
      }, info);
  },

  async updateUser(parent, args, { prisma, request }, info){
    const userId = getUserId(request);
    const userExists = await prisma.exists.User({ id: userId});

    if(!userExists){
      throw new Error("User not found");
    }

    if(typeof args.data.password === 'string'){
      args.data.password = await hashPassword(args.data.password);
    }
    return prisma.mutation.updateUser({ data: args.data, where: { id: userId }});
  },

  async updatePost(parent, args, { prisma, request }, info){
    const userId = getUserId(request);
    const postsExists = await prisma.exists.Post({
      id: args.id,
      author: {
        id: userId
      }
    });
    const isPublished = await prisma.exists.Post({ id: args.id, published: true });
    if (!postsExists){
      throw new Error("Unable to update this post");
    }
    if(isPublished && args.data.published === false){
      await prisma.mutation.deleteManyComments({ where: { post: { id: args.id } } });
    }
    return prisma.mutation.updatePost({ data: args.data, where: { id: args.id } }, info);
  },

  async updateComment(parent, args, { prisma, request }, info){
    const userId = getUserId(request);

    const commentExists = await prisma.exists.Comment({
      id: args.id,
      author: {
        id: userId
      }
    });
    if (!commentExists){
      throw new Error("Unable to update this comment");
    }

    return prisma.mutation.updateComment({ data: args.data, where: { id: args.id } });
  },

  async deleteUser(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);
    const userExists = await prisma.exists.User({ id: userId });

    if(!userExists){
      throw new Error("User not found");
    }
    return prisma.mutation.deleteUser({ where: { id: userId }}, info);
  },

  async deletePost (parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    const postExists = await prisma.exists.Post({
      id: args.id,
      author: {
        id: userId
      }
    });

    if(!postExists){
      throw new Error("Unable to delete this post");
    }
    return prisma.mutation.deletePost({ where: { id: args.id }}, info);
  },

  async deleteComment(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);
    const commentExists = await prisma.exists.Comment({
      id: args.id,
      author: {
        id: userId
      }
    });

    if(!commentExists){
      throw new Error("Unable to delete this comment");
    }
    return prisma.mutation.deleteComment({ where: { id: args.id }}, info);
  }
}