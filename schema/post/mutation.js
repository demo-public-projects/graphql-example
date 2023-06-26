import { GraphQLID, GraphQLNonNull } from "graphql";

import { v4 as uuid } from "uuid";

import { PostType, PostCreateType } from "./type.js";
import { posts } from "../../fake-db.js";

export default {
  deletePost: {
    type: PostType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve: (parent, args) => {
      const index = posts.findIndex((item) => item.id === args.id);
      if (index === -1) return null;
      const postToDelete = posts[index];
      posts.splice(index, 1);
      return postToDelete;
    },
  },
  createPost: {
    type: PostType,
    args: {
      postData: { type: new GraphQLNonNull(PostCreateType) },
    },
    resolve: (parent, args) => {
      args.postData.id = uuid();
      posts.push(args.postData);
      return args.postData;
    },
  },
};
