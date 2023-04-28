// ? Imports Depedencies
const express = require("express");
const mysql = require("mysql2");
// const inquirer = require("inquirer");
// const path = require("path");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "asdfghjkl;\'",
    database: "movie_db",
  },
  console.log(`Connected to the movies_db database.`)
);

app.post('/api/add-movie', (req, res) => {
    console.log(req.body.movieName);
    db.query(
`INSERT INTO movies (movie_name)
VALUES ('${req.body.movieName}')`,
        function (err, results) {
            console.log(results);
        })

    res.json(req.body);
})

app.get('/api/movies', (req, res) => {
    db.query("SELECT * FROM movies",
    function (err, results) {
        console.log(results);
    })
    res.json('');
})

app.get('/api/movie-reviews', (req, res) => {
    db.query(
    `SELECT movies.movie_name, reviews.review
    FROM movies
    INNER JOIN reviews ON movies.id = reviews.movie_id;`,
    function (err, results) {
        console.log(results);
    })
    res.json('');
})



// db.query(
//   "SELECT COUNT(id) AS total_count FROM favorite_books GROUP BY in_stock",
//   function (err, results) {
//     console.log(results);
//   }
// );

// db.query(
//   "SELECT SUM(quantity) AS total_in_section, MAX(quantity) AS max_quantity, MIN(quantity) AS min_quantity, AVG(quantity) AS avg_quantity FROM favorite_books GROUP BY section",
//   function (err, results) {
//     console.log(results);
//   }
// );

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
