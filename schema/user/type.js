import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
  GraphQLInputObjectType,
} from "graphql";

import { PostType } from "../post/type.js";
import { posts, likes } from "../../fake-db.js";

const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    postsCreated: {
      type: new GraphQLList(PostType),
      resolve: (parent) => posts.filter((post) => post.userId === parent.id),
    },
    postsLiked: {
      type: new GraphQLList(PostType),
      resolve: (parent) =>
        posts.filter((post) =>
          likes
            .filter((like) => like.userId === parent.id)
            .map((like) => like.postId)
            .includes(post.id)
        ),
    },
  }),
});

const UserInputType = new GraphQLInputObjectType({
  name: "UserInputType",
  fields: {
    name: { type: GraphQLString },
    email: { type: GraphQLString },
  },
});

export { UserType, UserInputType };
