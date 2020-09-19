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
      const links = await context.Link.find({});
      return links;
    },
    link: (parent, args) => {
      return links.find((l) => l.id === args.id);
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
    updateLink: (parent, args) => {
      let link = links.find((l) => l.id === args.id);
      link.url = args.url;
      link.description = args.description;
      return link;
    },
    deleteLink: (parent, args) => {
      let idx = links.findIndex((link) => link.id === args.id);
      let link = links[idx];
      links.splice(idx, 1);
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
  const links = await Link.find({});
  console.log(links);
}

//tst();
