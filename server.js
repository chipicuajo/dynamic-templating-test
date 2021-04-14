require('dotenv').config();

const express = require('express');
const hbs = require('hbs');
const students = require('./exam-info');

const app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(express.static('public'));

app.get('/', (req,res) =>{
  res.render('full-list.hbs', {students: students})
})

app.get('/results', (req,res) =>{
  let cloned = JSON.parse(JSON.stringify(students))
  let filtered = cloned.filter((passed)=>{
    return passed.hasPassed == true;
  }).sort((a,b)=>b-a)

  res.render('results.hbs', {students: filtered})
})
// 2: in the '/results' list all the students who passed the test and their score.
// Also, students should be in descending order based on their score.

// ... Your code here

app.listen(process.env.PORT, () =>
  console.log(`App running on ${process.env.PORT}.`)
);
