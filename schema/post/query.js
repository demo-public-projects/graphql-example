import { GraphQLList, GraphQLID, GraphQLNonNull } from "graphql";

import { PostType } from "./type.js";
import { posts } from "../../fake-db.js";

export default {
  posts: {
    type: new GraphQLList(PostType),
    resolve: () => posts,
  },
  post: {
    type: PostType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve: (parent, args) => posts.find((item) => item.id === args.id),
  },
};
