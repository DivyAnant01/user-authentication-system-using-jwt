const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('user authentication system using jwt!');
});


app.listen(3000, () => {
  console.log('Server running on port 4000');
});

const path = require('path');


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));  

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index');  
});

app.listen(4000, () => {
  console.log('Server is running on http://localhost:4000');
});
