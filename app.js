const express = require('express');
const queryString = require('query-string');

const app = express();

const USERS = [
  {id: 1,
   firstName: 'Joe',
   lastName: 'Schmoe',
   userName: 'joeschmoe@business.com',
   position: 'Sr. Engineer',
   isAdmin: true,
   // NEVER EVER EVER store passwords in plain text in real life. NEVER!!!!!!!!!!!
   password: 'password'
  },
  {id: 2,
   firstName: 'Sally',
   lastName: 'Student',
   userName: 'sallystudent@business.com',
   position: 'Jr. Engineer',
   isAdmin: true,
   // NEVER EVER EVER store passwords in plain text in real life. NEVER!!!!!!!!!!!
   password: 'password'
  },
  // ...other users
];

function gateKeeper(req, res, next) {
  // your code should replace the line below
  const user = queryString.parse(req.get('x-username-and-password'));
  const matchUser = USERS.find(u => u.userName == user.user && u.password == user.pass);
  if (matchUser) {
    req.user = matchUser;
  }
  next();
}

app.use(gateKeeper);

app.get("/api/users/me", (req, res) => {
  if (req.user === undefined) {
    return res.status(403).json({message: 'Must supply valid user credentials'});
  }
  const {firstName, lastName, id, userName, position} = req.user;
  return res.json({firstName, lastName, id, userName, position});
});

// ... start the app
let port = 1337;
app.listen(port, ()=> console.log(`We on localhost:${port}`));