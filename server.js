const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const database = {
	users: [
       {
          id: '123',
          name: 'John',
          password: 'cookies',
          email: 'john@gmail.com',
          entries: 0,
          joined: new Date()
       } ,
       {
       	  id: '124',
          name: 'Sally',
          password: 'bananas',
          email: 'sally@gmail.com',
          entries: 0,
          joined: new Date()
       }
	],
    login: [
       {
       	  id: '987',
       	  hash: '',
       	  email: 'john@gmail.com'
       }
    ]
};

app.get('/', (req,res) => {
	//res.send('This is working!');
	res.send(database.users);
})

app.post('/signin', (req,res) => {
	/*
	bcrypt.compare("apples", '$2a$10$3mHN2CC2tWW96o2ZuR06i.dCDALUQh5xx6DNRcl45vE2PPrOnu5ee', function(err, res) {
       console.log('first guess', res);
    });

    bcrypt.compare("veggies", '$2a$10$3mHN2CC2tWW96o2ZuR06i.dCDALUQh5xx6DNRcl45vE2PPrOnu5ee'
,   function(err, res) {
       console.log('second guess', res); 
    });
    */

	if (req.body.email === database.users[0].email && 
		req.body.password === database.users[0].password) {
		//res.json('Success Signing In');
	    res.json(database.users[0]);
	}
	else if (req.body.email === database.users[1].email && 
		req.body.password === database.users[1].password) {
		//res.json('Success Signing In');
	    res.json(database.users[1]);
	}
	else {
	    res.status(400).json('Error Signing In');
    }
})

app.post('/register', (req,res) => {
    const { email, name, password } = req.body;
    bcrypt.hash(password, null, null, function(err, hash) {
    // Store hash in your password DB.
       console.log(hash);
    });
    database.users.push({
          id: '125',
          name: name,
          email: email,
          password: password,
          entries: 0,
          joined: new Date()
       })
    res.json(database.users[database.users.length-1]);
})

app.get('/profile/:id', (req,res) => {
	const { id } = req.params;
	let found = false;
	database.users.forEach(user => {
		if (user.id === id) {
			found = true;
			return res.json(user);
		}
	})
	if(!found) {
		return res.status(404).json('No such User');
	}
})

app.put('/image', (req,res) => {
	const { id } = req.body;
	let found = false;
	database.users.forEach(user => {
		if (user.id === id) {
			found = true;
			user.entries++;
			return res.json(user.entries);
		}
	})
	if(!found) {
		return res.status(404).json('No such User');
	}
})



// Load hash from your password DB.
//bcrypt.compare("bacon", hash, function(err, res) {
    // res == true
//});

//bcrypt.compare("veggies", hash, function(err, res) {
    // res = false
//});

app.listen(3001, () => {
	console.log('App is running on port 3001');
})