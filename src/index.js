const { GraphQLServer } = require("graphql-yoga");
require("./db/mongoose");
const Link = require("./models/link");

let links = [
  {
    id: "link-0",
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL",
  },
];

let idCount = links.length;

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews clone`,
    feed: async (parent, args, context) => {
      return context.Link.find({});
    },
    link: async (parent, args, context) => {
      return context.Link.findOne({ _id: args.id });
    },
  },
  // Link: {
  //   // id: (parent) => parent.id,
  //   // description: (parent) => parent.description,
  //   // url: (parent) => parent.url,
  // },
  Mutation: {
    post: async (parent, args, context, info) => {
      const link = new context.Link({
        description: args.description,
        url: args.url,
      });
      await link.save();

      return link;
    },
    updateLink: async (parent, args, context) => {
      let res = await context.Link.updateOne(
        { _id: args.id },
        { url: args.url, description: args.description }
      );
      let link = await context.Link.findOne({ _id: args.id });
      return link;
    },
    deleteLink: async (parent, args, context) => {
      let link = await context.Link.findOne({ _id: args.id });
      let res = await context.Link.deleteOne({ _id: args.id });
      return link;
    },
  },
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: {
    Link,
  },
});

server.start(() => console.log(`Server is running on http://localhost:4000`));

async function tst() {
  const args = {
    url: "asdf",
    description: "adsf",
    id: "5f663564865af9db43fef757",
  };
  let res = await Link.deleteOne({ _id: args.id });
  console.log(res);
}

//tst();
