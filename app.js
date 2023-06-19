import express from "express";
import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} from "graphql";
import { createHandler } from "graphql-http/lib/use/express";

const users = ["Tom", "Ann", "Violet", "John"];

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      users: {
        type: new GraphQLList(GraphQLString),
        resolve: () => users,
      },
      user: {
        type: GraphQLString,
        args: {
          name: { type: GraphQLString },
        },
        resolve: (parent, args) => users.find((item) => item === args.name),
      },
    },
  }),
  mutation: new GraphQLObjectType({
    name: "Mutation",
    fields: {
      updateUser: {
        type: GraphQLString,
        args: {
          oldName: { type: GraphQLString },
          newName: { type: GraphQLString },
        },
        resolve: (parent, args) => {
          const index = users.indexOf(args.oldName);
          if (index === -1) return null;
          users[index] = args.newName;
          return args.newName;
        },
      },
    },
  }),
});

const app = express();

app.all("/graphql", createHandler({ schema }));

app.listen(3000);
