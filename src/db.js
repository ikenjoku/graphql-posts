const posts = [{
  id: "1",
  title: 'Holiday',
  body: 'the bull',
  published: false,
  author: "1"
},
{
  id: "2",
  title: 'Greve',
  body: 'the bull',
  published: true,
  author: "3"
},
{
  id: "3",
  title: 'Asami',
  body: 'the bull',
  published: false,
  author: "2"
},
{
  id: "4",
  title: 'Visitors',
  body: 'the bull',
  published: true,
  author: "1"
},
{
  id: "5",
  title: 'Chocolate',
  body: 'the bull',
  published: false,
  author: "2"
},
];

const users = [{
  id: "1",
  name: 'Ikechuku Njoku',
  email: 'ik@gmail.com',
  age: 28
},
{
  id: "2",
  name: 'Sarah Dras',
  email: 'sarah@gmail.com',
  age: 31
},
{
  id: "3",
  name: 'Dan Abby',
  email: 'dan@gmail.com',
  age: 26
},
];

const comments = [{
  id: "1",
  text: 'Nice post',
  author: "1",
  post: "4"
},
{
  id: "2",
  text: 'bullshit',
  author: "2",
  post: "3"
},
{
  id: "3",
  text: 'load of crap',
  author: "3",
  post: "2"
},
{
  id: "4",
  text: 'Interesting read',
  author: "1",
  post: "1"
},
];

const db = { users, posts, comments };

export default db;