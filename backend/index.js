const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();

// connect to the db
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "07010164268Beejay*",
  database: "booka_schema",
});

// express middleware allowing us to send json files from postman/client
app.use(express.json());
// middleware for fetching data from client side
app.use(cors());


app.get("/", (req, res) => {
  res.json("this is the backend");
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/books", (req, res) => {
  const q =
    "INSERT INTO books (`title`,`desc`, `price`, `cover`) VALUES (?,?,?,?)";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, values, (err, data) => {
    if (err) return res.json(err);
    return res.json("book has been created successfully");
  });
});

app.delete('/books:id', (req, res)=>{
  const bookId= req.params.id
  const q = `DELETE FROM books WHERE id = ${bookId}`

  db.query(q, bookId, (err, data)=>{
    if(err) return res.json(err);
    return res.json('Book deleted')
  })
})

const PORT = process.env.PORT || 8800;

app.listen(PORT, () => {
  console.log("connected to backend");
});
