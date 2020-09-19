require("./db/mongoose");

const Link = require("./models/link");

// const testLink = new Link({
//   url: "example3333.com",
//   description: "url 3",
//   wut: "bruv",
// });

// testLink
//   .save()
//   .then(() => {
//     console.log(testLink);
//   })
//   .catch((e) => {
//     console.log(e);
//   });
async function main() {
  const links = await Link.find({});
  console.log(links);
}

main();
