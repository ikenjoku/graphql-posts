import "cross-fetch/polyfill";
import ApolloBoost, { gql } from "apollo-boost";
import prisma from "../src/prisma";
import bcrypt from 'bcryptjs';

const client = new ApolloBoost({
  uri: "http://localhost:4000/"
});

beforeAll(async () => {
  await prisma.mutation.deleteManyUsers();
  await prisma.mutation.createUser({
    data: {
      name: "Jane",
      email: 'jane@gmail.com',
      password: bcrypt.hashSync("password123")
    }
  });
});

test("Should create a new user", async () => {
  const createUser = gql`
    mutation {
      createUser (data: {
        name: "Ike",
        email: "ike@gmail.com",
        password: "12345678"
      }){
        token
        user {
          id
          name
          email
        }
      }
    }
  `

  const response = await client.mutate({
    mutation: createUser
  });

  const exists = await prisma.exists.User({id: response.data.createUser.user.id});
  expect(exists).toBe(true);
})